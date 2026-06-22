"use client";

import { useState } from "react";
import { MessageCircle, Instagram, Phone, Plus, X } from "lucide-react";
import { SITE, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/**
 * Premium floating action bar — WhatsApp, Instagram, Call.
 *
 * Desktop: a vertical glassmorphism stack at bottom-right, always visible.
 * Mobile: a single expandable FAB (tap to fan out the three actions) that sits
 * above the sticky bottom CTA bar so nothing overlaps. Royal-blue/gold themed,
 * dark-mode aware, with smooth transitions. Each action fires its GA/Pixel
 * event directly (this is a client component, so we call trackEvent inline).
 *
 * Link behavior:
 *  - WhatsApp uses wa.me with the prefilled consultation message. On mobile this
 *    opens the WhatsApp app; on desktop it opens WhatsApp Web/desktop.
 *  - Instagram uses the https profile URL, which deep-links into the installed
 *    app on mobile and falls back to the browser profile otherwise.
 *  - Call uses tel: for one-tap dialing on mobile.
 */

const telHref = `tel:${SITE.phoneDisplay.replace(/\s/g, "")}`;
const waHref = whatsappLink(DEFAULT_WHATSAPP_MESSAGE);

const ACTIONS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: waHref,
    external: true,
    event: "whatsapp_click" as const,
    className: "bg-[#25D366] text-white",
    Icon: MessageCircle,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: SITE.instagramUrl,
    external: true,
    event: "instagram_click" as const,
    className: "bg-gradient-to-br from-[#E1306C] to-[#C13584] text-white",
    Icon: Instagram,
  },
  {
    key: "call",
    label: "Call",
    href: telHref,
    external: false,
    event: "call_click" as const,
    className: "bg-royal-600 text-gold-300",
    Icon: Phone,
  },
];

export default function FloatingActionBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* DESKTOP: always-visible vertical glass stack */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
        {ACTIONS.map(({ key, label, href, external, event, className, Icon }) => (
          <a
            key={key}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => trackEvent(event, { source: "floating_bar_desktop" })}
            aria-label={label}
            className="group flex items-center gap-3"
          >
            <span className="pointer-events-none rounded-full border border-white/15 bg-royal-900/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-premium backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full shadow-premium ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-110 ${className}`}
            >
              <Icon className="h-5 w-5" />
            </span>
          </a>
        ))}
      </div>

      {/* MOBILE: expandable FAB (sits above the sticky bottom bar) */}
      <div className="fixed bottom-20 right-5 z-40 flex flex-col items-end gap-3 lg:hidden">
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ${
            open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          {ACTIONS.map(({ key, label, href, external, event, className, Icon }) => (
            <a
              key={key}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => { trackEvent(event, { source: "floating_bar_mobile" }); setOpen(false); }}
              aria-label={label}
              className="flex items-center gap-2.5"
            >
              <span className="rounded-full border border-white/15 bg-royal-900/85 px-3 py-1 text-xs font-semibold text-white shadow-premium backdrop-blur-md">
                {label}
              </span>
              <span className={`flex h-12 w-12 items-center justify-center rounded-full shadow-premium ring-1 ring-white/20 ${className}`}>
                <Icon className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close contact options" : "Open contact options"}
          aria-expanded={open}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-royal-900 shadow-gold ring-1 ring-white/30 transition-transform duration-200 active:scale-95"
        >
          {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
