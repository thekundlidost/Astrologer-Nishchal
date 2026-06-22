"use client";

import { useEffect } from "react";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

/**
 * Lets server-rendered links report analytics without becoming client
 * components. Any element with `data-track="event_name"` (optionally
 * `data-track-source="...")` fires trackEvent on click via one delegated
 * listener. Safe no-op when analytics is disabled.
 */
const VALID: AnalyticsEvent[] = [
  "whatsapp_click",
  "instagram_click",
  "call_click",
  "service_view",
  "booking_open",
  "payment_view",
  "contact_view",
  "newsletter_signup",
];

export default function ClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const name = el.getAttribute("data-track") as AnalyticsEvent | null;
      if (!name || !VALID.includes(name)) return;
      const source = el.getAttribute("data-track-source") || undefined;
      trackEvent(name, source ? { source } : {});
    }
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
