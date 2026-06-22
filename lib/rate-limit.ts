/**
 * ──────────────────────────────────────────────────────────────────────────
 * CLIENT-SIDE RATE LIMITING (best-effort)
 * ──────────────────────────────────────────────────────────────────────────
 * Throttles repeated submissions from the same browser using sessionStorage.
 *
 * HONEST LIMITATION: this is a UX/abuse-friction measure, not a security
 * boundary. A determined attacker can clear storage or message WhatsApp
 * directly. For enforceable rate limiting, proxy submissions through a
 * serverless function (see SECURITY.md) that limits by IP. This still stops
 * casual double-submits, accidental spam, and naive bots.
 */

interface RateState {
  timestamps: number[];
}

const WINDOW_MS = 60_000; // 1 minute
const MAX_IN_WINDOW = 3; // max submissions per window
const MIN_GAP_MS = 4_000; // minimum gap between two submissions

export interface RateResult {
  allowed: boolean;
  reason?: string;
  retryAfterMs?: number;
}

export function checkRateLimit(key: string): RateResult {
  if (typeof window === "undefined") return { allowed: true };
  const storageKey = `rl_${key}`;
  const now = Date.now();

  let state: RateState = { timestamps: [] };
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (raw) state = JSON.parse(raw) as RateState;
  } catch {
    state = { timestamps: [] };
  }

  // keep only timestamps within the window
  const recent = state.timestamps.filter((t) => now - t < WINDOW_MS);

  // enforce minimum gap
  if (recent.length > 0) {
    const last = recent[recent.length - 1];
    const gap = now - last;
    if (gap < MIN_GAP_MS) {
      return { allowed: false, reason: "Please wait a moment before trying again.", retryAfterMs: MIN_GAP_MS - gap };
    }
  }

  // enforce max per window
  if (recent.length >= MAX_IN_WINDOW) {
    const oldest = recent[0];
    return {
      allowed: false,
      reason: "Too many attempts. Please wait a minute and try again.",
      retryAfterMs: WINDOW_MS - (now - oldest),
    };
  }

  return { allowed: true };
}

/** Record a successful submission against the rate limit. */
export function recordSubmission(key: string): void {
  if (typeof window === "undefined") return;
  const storageKey = `rl_${key}`;
  const now = Date.now();
  let state: RateState = { timestamps: [] };
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (raw) state = JSON.parse(raw) as RateState;
  } catch {
    state = { timestamps: [] };
  }
  const recent = state.timestamps.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  try {
    sessionStorage.setItem(storageKey, JSON.stringify({ timestamps: recent }));
  } catch {
    /* storage full / disabled — ignore */
  }
}
