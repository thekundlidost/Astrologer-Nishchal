/**
 * ──────────────────────────────────────────────────────────────────────────
 * ANALYTICS — single tracking API over GA4 + Meta Pixel
 * ──────────────────────────────────────────────────────────────────────────
 * Both providers stay DISABLED until their IDs are set via env vars:
 *   NEXT_PUBLIC_GA_ID         e.g. "G-XXXXXXXXXX"  (Google Analytics 4)
 *   NEXT_PUBLIC_META_PIXEL_ID e.g. "1234567890"    (Meta/Facebook Pixel)
 *
 * Nothing is loaded and no network calls happen if an ID is absent, so the
 * site ships privacy-clean and the owner flips analytics on later by adding
 * one env var — no code changes. All event calls below are safe no-ops until
 * then. This never touches booking/payment logic; it only observes.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export const analyticsEnabled = Boolean(GA_ID);
export const metaPixelEnabled = Boolean(META_PIXEL_ID);

// Canonical event names used across the site.
export type AnalyticsEvent =
  | "page_view"
  | "service_view"
  | "booking_open"
  | "booking_submit"
  | "payment_view"
  | "whatsapp_click"
  | "instagram_click"
  | "call_click"
  | "contact_view"
  | "newsletter_signup";

type Params = Record<string, string | number | boolean | undefined>;

// Map our canonical events to Meta's standard event vocabulary where sensible.
const META_MAP: Partial<Record<AnalyticsEvent, string>> = {
  booking_open: "InitiateCheckout",
  booking_submit: "Lead",
  payment_view: "AddPaymentInfo",
  whatsapp_click: "Contact",
  call_click: "Contact",
  contact_view: "Contact",
  newsletter_signup: "Subscribe",
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire an event to whichever providers are enabled. Safe no-op otherwise. */
export function trackEvent(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;

  // GA4
  if (analyticsEnabled && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  // Meta Pixel
  if (metaPixelEnabled && typeof window.fbq === "function") {
    const metaName = META_MAP[event];
    if (metaName) {
      window.fbq("track", metaName, params);
    } else {
      window.fbq("trackCustom", event, params);
    }
  }
}

/** Track a virtual page view (used on client-side route changes). */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  if (analyticsEnabled && typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path });
  }
  if (metaPixelEnabled && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}
