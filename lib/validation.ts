/**
 * ──────────────────────────────────────────────────────────────────────────
 * INPUT VALIDATION & SANITIZATION
 * ──────────────────────────────────────────────────────────────────────────
 * Pure, dependency-free validators and sanitizers used by every form on the
 * site (booking + contact). Two layers:
 *   1. validate*  — reject malformed input, return an error message or null.
 *   2. sanitize*  — strip/escape anything dangerous before the value is used
 *                   anywhere (WhatsApp message, display, etc.).
 *
 * Since the site has no backend, these run client-side. They prevent malformed
 * data and neutralize XSS payloads in the values we pass into links/messages.
 */

/** Remove control chars and HTML-significant characters that enable XSS. */
export function sanitizeText(input: string, maxLen = 500): string {
  if (typeof input !== "string") return "";
  return input
    // strip angle brackets / quotes / backtick / common injection chars
    .replace(/[<>"'`]/g, "")
    // strip control characters
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, "")
    // collapse excessive whitespace
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, maxLen);
}

/** Escape the 5 HTML-significant characters for safe rendering as text. */
export function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Field validators ──────────────────────────────────────────────────────

export function validateName(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please enter your name.";
  if (v.length < 2) return "Name is too short.";
  if (v.length > 80) return "Name is too long.";
  if (!/^[\p{L}\p{M} .'-]+$/u.test(v)) return "Name contains invalid characters.";
  return null;
}

export function validateMobile(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please enter your mobile number.";
  // allow +, spaces, hyphens; require 8–15 digits total
  const digits = v.replace(/[^0-9]/g, "");
  if (!/^[0-9+\s-]+$/.test(v)) return "Mobile number contains invalid characters.";
  if (digits.length < 8 || digits.length > 15) return "Enter a valid mobile number.";
  return null;
}

export function validateEmail(value: string, required = false): string | null {
  const v = value.trim();
  if (!v) return required ? "Please enter your email." : null;
  if (v.length > 120) return "Email is too long.";
  // pragmatic email pattern
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address.";
  return null;
}

export function validateRequiredText(value: string, label: string, max = 120): string | null {
  const v = value.trim();
  if (!v) return `Please enter your ${label}.`;
  if (v.length > max) return `${label} is too long.`;
  return null;
}

export function validateDate(value: string, label = "date"): string | null {
  if (!value) return `Please select a ${label}.`;
  // expects yyyy-mm-dd from <input type=date>
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Enter a valid ${label}.`;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return `Enter a valid ${label}.`;
  return null;
}

export function validateOptionalTime(value: string): string | null {
  if (!value) return null;
  if (!/^\d{2}:\d{2}$/.test(value)) return "Enter a valid time.";
  return null;
}

export function validateNotes(value: string): string | null {
  if (value && value.length > 800) return "Notes are too long (max 800 characters).";
  return null;
}

/** Validate that a service slug is one of the known services. */
export function validateServiceSlug(slug: string, validSlugs: string[]): string | null {
  if (!validSlugs.includes(slug)) return "Please select a valid service.";
  return null;
}
