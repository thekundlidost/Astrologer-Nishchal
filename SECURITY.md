# Security Audit Report — Astrologer Nishchal

**Date:** June 2026
**Architecture:** Static Next.js site (no backend / database) — free hosting, WhatsApp click-to-chat, UPI deep links.

This report covers the security hardening implemented and — importantly — is honest about what a static (serverless) architecture can and cannot enforce. Items marked **[Edge/Serverless]** require a small serverless function to be *fully* enforced; everything else is enforced in the shipped code.

---

## Summary table

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Cloudflare Turnstile on forms | ✅ Implemented | Widget on booking + contact. Verify token server-side to fully enforce **[Serverless]** |
| 2 | Rate limiting for bookings | ✅ Client-side | Per-browser throttle. IP-based limit needs **[Edge/Serverless]** |
| 3 | Input validation on every field | ✅ Implemented | `lib/validation.ts`, 14 tests passing |
| 4 | Sanitization against XSS | ✅ Implemented | `sanitizeText`/`escapeHtml`, 14 tests passing |
| 5 | Secure UPI payment generation | ✅ Implemented | `lib/payment-security.ts`, validated build |
| 6 | Prevent QR code manipulation | ✅ Implemented | QR derives from one validated string |
| 7 | Prevent client-side price editing | ✅ Mitigated | Frozen table + allowlist; see honest note |
| 8 | Central price configuration | ✅ Implemented | Frozen `PRICE_TABLE` from `constants.ts` |
| 9 | Content Security Policy | ✅ Implemented | `next.config.ts` |
| 10 | Security headers | ✅ Implemented | Full suite in `next.config.ts` |
| 11 | HTTPS-only deployment | ✅ Implemented | HSTS + middleware redirect |
| 12 | Spam protection | ✅ Implemented | Honeypot (enforced) + Turnstile |
| 13 | Validate amount before QR | ✅ Implemented | `assertValidAmount` allowlist |
| 14 | Payee UPI ID locked | ✅ Implemented | `LOCKED_UPI_ID = 9714338888@okbizaxis` |

---

## What is fully enforced in the shipped code

### Payments (#5, #6, #7, #8, #13, #14)
- **Central frozen config:** `PRICE_TABLE` is built once from `SERVICES` and `Object.freeze`-d. Runtime mutation is rejected (verified by test).
- **Amount never comes from input:** `resolvePayment(slug)` ignores any caller-supplied amount and looks it up by slug from the frozen table.
- **Allowlist validation:** `assertValidAmount()` rejects any amount not in `{1000, 499, 500, 299, 199}`, plus negatives, non-integers, and NaN — *before* a QR or link is built.
- **Locked payee:** `LOCKED_UPI_ID = "9714338888@okbizaxis"`. Every payment build asserts the configured UPI ID still matches this literal, else it throws and produces nothing.
- **One source for QR + button:** both render from the same validated `payUrl`, so the QR, the displayed amount, and the deep link can never diverge.
- **14/14 payment security tests pass** (`/tmp/sectest.ts` logic).

> **Honest note on #7:** This is a static site, so all JavaScript — including prices — necessarily runs in the browser. No static site can make a value physically unreachable in the client. What we guarantee is that *the application's own logic* can only ever generate a payment for a **known service** at its **canonical price** to the **correct payee**, and rejects anything else. For cryptographically enforced price integrity, re-validate `(slug → amount)` in a serverless function before you treat a payment as settled. In practice, since you manually confirm each UPI payment screenshot over WhatsApp before delivering the consultation, a tampered amount is also caught by you at that step.

### Input validation & XSS (#3, #4)
- Every field validated: name (unicode-aware, length, charset), mobile (digit count), email (format), dates, times, place, notes (length), service slug (allowlist).
- All values passed into WhatsApp messages are run through `sanitizeText()` which strips `<>"'\``, control chars, and over-long input.
- `maxLength` attributes on all inputs as a first barrier.
- **14/14 XSS/validation tests pass** (`/tmp/xsstest.ts` logic).

### Spam protection (#12) — honeypot fully enforced
- Hidden honeypot field; if filled (bots), submission is silently rejected. This needs no external service and works entirely in shipped code.
- Turnstile adds a second layer (below).

### Headers, CSP, HTTPS (#9, #10, #11)
Applied to every response via `next.config.ts`:
- **Content-Security-Policy** — `default-src 'self'`; scripts limited to self + Turnstile; styles/fonts to self + Google Fonts; `object-src 'none'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`.
- **Strict-Transport-Security** — `max-age=63072000; includeSubDomains; preload`.
- **X-Frame-Options: DENY**, **X-Content-Type-Options: nosniff**, **Referrer-Policy: strict-origin-when-cross-origin**, **Permissions-Policy** (camera/mic/geo/topics disabled), **Cross-Origin-Opener-Policy: same-origin**, **X-Permitted-Cross-Domain-Policies: none**.
- **`poweredByHeader: false`** — removes `X-Powered-By`.
- **HTTPS:** HSTS header + `middleware.ts` redirects any forwarded `http` → `https` (308).

---

## What needs a serverless function to be *fully* enforced

These are implemented as far as a static site allows; to make them tamper-proof, add one serverless function (Vercel/Netlify Functions — still free tier) that the forms POST to before opening WhatsApp:

1. **Turnstile token verification (#1):** the widget produces a token, but a token is only meaningful if verified server-side against `TURNSTILE_SECRET_KEY` at `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Until then, the widget raises the bar against casual bots but can be bypassed.
2. **IP-based rate limiting (#2):** the client throttle (3/min, 4s gap, per browser via sessionStorage) stops accidental double-submits and naive bots, but resets if storage is cleared. Real rate limiting must key on IP server-side.
3. **Server-side amount re-validation (#7):** as above.

A ready-to-use pattern is documented in `SECURITY.md` → "Optional serverless hardening" (see code comments in `lib/rate-limit.ts` and `components/ui/TurnstileWidget.tsx`).

---

## Setup checklist before launch

- [ ] Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (and `TURNSTILE_SECRET_KEY` if you add the verify function) — see `.env.example`.
- [ ] Confirm your host forces HTTPS (Vercel/Netlify do by default; the HSTS header + middleware reinforce it).
- [ ] Verify the live CSP doesn't block any third-party tool you add later (e.g. analytics) — extend the policy in `next.config.ts` if so.
- [ ] Scan-test each payment QR once with a real phone before going live.
- [ ] Keep confirming UPI payment screenshots over WhatsApp before delivering — your manual check is itself a strong anti-fraud control.

---

## Test evidence

- Payment security: 14/14 assertions pass (frozen table, locked payee, slug & amount allowlist, immutability, sanitized note).
- Validation/XSS: 14/14 assertions pass (script/quote/control-char stripping, field validation incl. unicode names).
- Full TypeScript type-check: **0 errors**.
