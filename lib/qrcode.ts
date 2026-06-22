/**
 * Minimal, dependency-free QR Code generator (byte mode, supports versions 1–10
 * with automatic version selection). Returns a boolean matrix (true = dark module).
 *
 * This is used to render the UPI payment QR dynamically in the browser so the QR,
 * the displayed amount and the UPI deep link always come from the same string and
 * can never drift apart. No external packages, no network — works on static hosting.
 *
 * Implementation adapted to TypeScript from the well-known QR algorithm
 * (Reed–Solomon error correction, byte mode). Error-correction level M.
 */

// ---- Galois field tables for Reed–Solomon ----
const EXP = new Array<number>(512);
const LOG = new Array<number>(256);
(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[LOG[a] + LOG[b]];
}

function rsGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array<number>(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], EXP[i]);
      next[j + 1] ^= poly[j];
    }
    poly = next;
  }
  return poly;
}

function rsEncode(data: number[], ecLen: number): number[] {
  const gen = rsGeneratorPoly(ecLen);
  const res = new Array<number>(ecLen).fill(0);
  for (const byte of data) {
    const factor = byte ^ res[0];
    res.shift();
    res.push(0);
    for (let j = 0; j < ecLen; j++) res[j] ^= gfMul(gen[j], factor);
  }
  return res;
}

// ---- Capacity / EC tables (level M) for versions 1..10, byte mode ----
// [version]: { totalCodewords, ecPerBlock, group1Blocks, group1Data, group2Blocks, group2Data, byteCapacity }
interface VerInfo {
  v: number;
  ecPerBlock: number;
  g1: number; g1d: number;
  g2: number; g2d: number;
  cap: number; // byte-mode character capacity at level M
}
const VERSIONS: VerInfo[] = [
  { v: 1, ecPerBlock: 10, g1: 1, g1d: 16, g2: 0, g2d: 0, cap: 14 },
  { v: 2, ecPerBlock: 16, g1: 1, g1d: 28, g2: 0, g2d: 0, cap: 26 },
  { v: 3, ecPerBlock: 26, g1: 1, g1d: 44, g2: 0, g2d: 0, cap: 42 },
  { v: 4, ecPerBlock: 18, g1: 2, g1d: 32, g2: 0, g2d: 0, cap: 62 },
  { v: 5, ecPerBlock: 24, g1: 2, g1d: 43, g2: 0, g2d: 0, cap: 84 },
  { v: 6, ecPerBlock: 16, g1: 4, g1d: 27, g2: 0, g2d: 0, cap: 106 },
  { v: 7, ecPerBlock: 18, g1: 4, g1d: 31, g2: 0, g2d: 0, cap: 122 },
  { v: 8, ecPerBlock: 22, g1: 2, g1d: 38, g2: 2, g2d: 39, cap: 152 },
  { v: 9, ecPerBlock: 22, g1: 3, g1d: 36, g2: 2, g2d: 37, cap: 180 },
  { v: 10, ecPerBlock: 26, g1: 4, g1d: 43, g2: 1, g2d: 44, cap: 213 },
];

function alignmentPositions(version: number): number[] {
  if (version === 1) return [];
  const tableRow: Record<number, number[]> = {
    2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34],
    7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
  };
  return tableRow[version] ?? [];
}

export function generateQR(text: string): boolean[][] {
  const bytes: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c < 128) bytes.push(c);
    else {
      // UTF-8 encode (UPI strings are ASCII, but be safe)
      const enc = unescape(encodeURIComponent(text[i]));
      for (let k = 0; k < enc.length; k++) bytes.push(enc.charCodeAt(k));
    }
  }

  const ver = VERSIONS.find((v) => bytes.length <= v.cap);
  if (!ver) throw new Error("QR data too long for supported versions");

  const size = 17 + ver.v * 4;
  const lenBits = ver.v >= 10 ? 16 : 8;

  // ---- Build bit stream ----
  const bits: number[] = [];
  const pushBits = (val: number, n: number) => {
    for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };
  pushBits(0b0100, 4); // byte mode
  pushBits(bytes.length, lenBits);
  for (const b of bytes) pushBits(b, 8);

  const totalDataCodewords = ver.g1 * ver.g1d + ver.g2 * ver.g2d;
  const capacityBits = totalDataCodewords * 8;
  // terminator
  for (let i = 0; i < 4 && bits.length < capacityBits; i++) bits.push(0);
  // pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);
  // pad bytes
  const padBytes = [0xec, 0x11];
  let pi = 0;
  while (bits.length < capacityBits) {
    pushBits(padBytes[pi % 2], 8);
    pi++;
  }

  // bytes array
  const dataCodewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let v = 0;
    for (let j = 0; j < 8; j++) v = (v << 1) | bits[i + j];
    dataCodewords.push(v);
  }

  // ---- Split into blocks, compute EC ----
  const blocks: { data: number[]; ec: number[] }[] = [];
  let offset = 0;
  for (let i = 0; i < ver.g1; i++) {
    const d = dataCodewords.slice(offset, offset + ver.g1d);
    offset += ver.g1d;
    blocks.push({ data: d, ec: rsEncode(d, ver.ecPerBlock) });
  }
  for (let i = 0; i < ver.g2; i++) {
    const d = dataCodewords.slice(offset, offset + ver.g2d);
    offset += ver.g2d;
    blocks.push({ data: d, ec: rsEncode(d, ver.ecPerBlock) });
  }

  // interleave data
  const finalCodewords: number[] = [];
  const maxData = Math.max(...blocks.map((b) => b.data.length));
  for (let i = 0; i < maxData; i++)
    for (const b of blocks) if (i < b.data.length) finalCodewords.push(b.data[i]);
  const maxEc = Math.max(...blocks.map((b) => b.ec.length));
  for (let i = 0; i < maxEc; i++)
    for (const b of blocks) if (i < b.ec.length) finalCodewords.push(b.ec[i]);

  // ---- Build matrix ----
  const modules: (boolean | null)[][] = Array.from({ length: size }, () =>
    new Array<boolean | null>(size).fill(null)
  );
  const reserved: boolean[][] = Array.from({ length: size }, () =>
    new Array<boolean>(size).fill(false)
  );

  const setFn = (r: number, c: number, val: boolean) => {
    modules[r][c] = val;
    reserved[r][c] = true;
  };

  // finder pattern
  const placeFinder = (r: number, c: number) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const rr = r + dr, cc = c + dc;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        const inRing =
          (dr >= 0 && dr <= 6 && (dc === 0 || dc === 6)) ||
          (dc >= 0 && dc <= 6 && (dr === 0 || dr === 6));
        const inCenter = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        setFn(rr, cc, inRing || inCenter);
      }
    }
  };
  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // timing patterns
  for (let i = 8; i < size - 8; i++) {
    setFn(6, i, i % 2 === 0);
    setFn(i, 6, i % 2 === 0);
  }

  // alignment patterns
  const aligns = alignmentPositions(ver.v);
  for (const ar of aligns) {
    for (const ac of aligns) {
      if (reserved[ar][ac]) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const rr = ar + dr, cc = ac + dc;
          const ring = Math.max(Math.abs(dr), Math.abs(dc));
          setFn(rr, cc, ring !== 1);
        }
      }
    }
  }

  // dark module
  setFn(size - 8, 8, true);

  // reserve format info areas
  for (let i = 0; i < 9; i++) {
    if (!reserved[8][i]) reserved[8][i] = true;
    if (!reserved[i][8]) reserved[i][8] = true;
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }

  // ---- Place data with zig-zag ----
  let bitIdx = 0;
  const dataBits: number[] = [];
  for (const cw of finalCodewords) for (let i = 7; i >= 0; i--) dataBits.push((cw >> i) & 1);

  let upward = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col = 5; // skip timing column
    for (let i = 0; i < size; i++) {
      const row = upward ? size - 1 - i : i;
      for (let c = 0; c < 2; c++) {
        const cc = col - c;
        if (reserved[row][cc]) continue;
        let dark = bitIdx < dataBits.length ? dataBits[bitIdx] === 1 : false;
        bitIdx++;
        // mask 0: (row + col) % 2 === 0
        if ((row + cc) % 2 === 0) dark = !dark;
        modules[row][cc] = dark;
      }
    }
    upward = !upward;
  }

  // ---- Format info (level M = 0b00, mask 0 = 0b000) ----
  const formatBits = computeFormatBits(0b00, 0);
  // place format bits
  for (let i = 0; i <= 5; i++) modules[8][i] = formatBits[i] === 1;
  modules[8][7] = formatBits[6] === 1;
  modules[8][8] = formatBits[7] === 1;
  modules[7][8] = formatBits[8] === 1;
  for (let i = 9; i < 15; i++) modules[14 - i][8] = formatBits[i] === 1;
  for (let i = 0; i < 8; i++) modules[size - 1 - i][8] = formatBits[i] === 1;
  for (let i = 8; i < 15; i++) modules[8][size - 15 + i] = formatBits[i] === 1;

  return modules.map((row) => row.map((m) => m === true));
}

function computeFormatBits(ecLevel: number, mask: number): number[] {
  const data = (ecLevel << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >> 9) & 1 ? 0x537 : 0);
  const bits = ((data << 10) | rem) ^ 0x5412;
  const out: number[] = [];
  for (let i = 14; i >= 0; i--) out.push((bits >> i) & 1);
  return out;
}
