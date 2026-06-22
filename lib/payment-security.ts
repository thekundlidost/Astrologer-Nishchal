import { SERVICES, SITE } from "./constants";

/**
 * ──────────────────────────────────────────────────────────────────────────
 * PAYMENT SECURITY MODULE
 * ──────────────────────────────────────────────────────────────────────────
 * Central, frozen source of truth for what a customer can ever be asked to pay.
 *
 * Why this exists:
 *  - The payment amount is NEVER taken from user input or a URL param. It is
 *    looked up from this frozen table by service slug only.
 *  - The payee UPI ID is locked to a single constant and validated on every
 *    payment build — it can never be swapped by tampering with other config.
 *  - Before any UPI string or QR is generated, the (slug, amount) pair is
 *    validated against this allowlist. A mismatch throws — no QR is produced.
 *
 * NOTE: This is a static site, so all code runs in the browser. This module
 * cannot make prices physically unreachable in memory, but it guarantees the
 * app's own logic can only ever generate a payment for a *known* service at its
 * *canonical* price to the *correct* payee. For server-enforced integrity you
 * would re-validate (slug → amount) in a serverless function before settlement.
 */

// The ONLY UPI ID money can ever be sent to. Locked here as a literal so it
// cannot be altered by changing unrelated config.
export const LOCKED_UPI_ID = "9714338888@okbizaxis" as const;
export const LOCKED_PAYEE_NAME = "Astrologer Nishchal" as const;

// Frozen canonical price table, derived once from SERVICES and deep-frozen so
// the app cannot mutate it at runtime.
export const PRICE_TABLE: Readonly<Record<string, number>> = Object.freeze(
  SERVICES.reduce<Record<string, number>>((acc, s) => {
    acc[s.slug] = s.price;
    return acc;
  }, {})
);

// Allowlist of valid amounts (defence in depth alongside the slug lookup).
const VALID_AMOUNTS: ReadonlySet<number> = new Set(Object.values(PRICE_TABLE));

export interface ValidatedPayment {
  slug: string;
  title: string;
  amount: number;
  payeeId: string;
  payeeName: string;
}

/**
 * Resolve and validate a payment from a service slug ALONE.
 * The amount is never accepted from the caller — it is looked up here.
 * Throws if the slug is unknown. Returns a fully validated payment object.
 */
export function resolvePayment(slug: string): ValidatedPayment {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    throw new Error(`Invalid service slug: ${String(slug)}`);
  }
  const amount = PRICE_TABLE[service.slug];
  assertValidAmount(amount);
  assertLockedPayee();
  return {
    slug: service.slug,
    title: service.title,
    amount,
    payeeId: LOCKED_UPI_ID,
    payeeName: LOCKED_PAYEE_NAME,
  };
}

/** Amount must be a positive integer that exists in the canonical allowlist. */
export function assertValidAmount(amount: number): void {
  if (
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0 ||
    !VALID_AMOUNTS.has(amount)
  ) {
    throw new Error(`Rejected non-allowlisted payment amount: ${String(amount)}`);
  }
}

/** Guard that the configured UPI ID still matches the locked constant. */
export function assertLockedPayee(): void {
  if (SITE.upiId !== LOCKED_UPI_ID) {
    throw new Error("Payee UPI ID mismatch — refusing to generate payment.");
  }
}

/**
 * Build the UPI deep link from a VALIDATED payment object only.
 * Payee + amount are taken from the validated object, never from free input.
 * The transaction note is sanitized to a strict character allowlist.
 * Finally, the assembled string is re-parsed and re-checked end-to-end so a
 * malformed or tampered link can never be returned.
 */
export function buildSecureUpiLink(payment: ValidatedPayment): string {
  assertValidAmount(payment.amount);
  if (payment.payeeId !== LOCKED_UPI_ID) {
    throw new Error("Refusing to build UPI link for non-locked payee.");
  }
  const note = sanitizeUpiNote(`${payment.title} booking`);
  const enc = (s: string) => encodeURIComponent(s);
  const url =
    `upi://pay?pa=${enc(LOCKED_UPI_ID)}` +
    `&pn=${enc(LOCKED_PAYEE_NAME)}` +
    `&am=${enc(String(payment.amount))}` +
    `&cu=INR` +
    `&tn=${enc(note)}`;
  assertUpiLinkIntegrity(url, payment.amount);
  return url;
}

/**
 * End-to-end integrity check on a finished UPI link: decode it and confirm the
 * payee is locked, the currency is INR, and the amount is an allowlisted value
 * matching what we intended. Throws on any mismatch.
 */
export function assertUpiLinkIntegrity(url: string, expectedAmount: number): void {
  const query = url.split("?")[1] ?? "";
  const params = new URLSearchParams(query);
  const pa = params.get("pa");
  const am = params.get("am");
  const cu = params.get("cu");
  if (pa !== LOCKED_UPI_ID) {
    throw new Error("UPI integrity check failed: payee is not the locked account.");
  }
  if (cu !== "INR") {
    throw new Error("UPI integrity check failed: currency is not INR.");
  }
  const amount = Number(am);
  assertValidAmount(amount);
  if (amount !== expectedAmount) {
    throw new Error("UPI integrity check failed: amount does not match the resolved price.");
  }
}

/** Strip anything that isn't a safe note character (defends the tn field). */
export function sanitizeUpiNote(input: string): string {
  return input.replace(/[^a-zA-Z0-9 .\-]/g, "").slice(0, 50).trim();
}
