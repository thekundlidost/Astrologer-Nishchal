"use client";

import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";

const SESSION_KEY = "exit_intent_shown";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let lastScrollY = window.scrollY;

    const trigger = () => {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      cleanup();
    };

    // Desktop: pointer leaves toward the top of the viewport (toward tabs/close).
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Mobile: a deliberate fast scroll back to the top often precedes leaving.
    const onScroll = () => {
      const y = window.scrollY;
      if (lastScrollY - y > 60 && y < 200) trigger();
      lastScrollY = y;
    };

    // Fallback: trigger on browser back navigation intent.
    const onPopState = () => trigger();

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);

    function cleanup() {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    }
    return cleanup;
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        className="absolute inset-0 bg-royal-950/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="animate-fade-up relative w-full max-w-md rounded-2xl border border-royal-100 bg-white p-7 text-center shadow-premium-lg dark:border-white/10 dark:bg-royal-800">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-ink/40 hover:text-ink dark:text-white/50 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
          <MessageCircle className="h-7 w-7" />
        </span>
        <h2
          id="exit-intent-title"
          className="mt-4 font-heading text-xl font-bold text-royal-600 dark:text-white"
        >
          Need guidance?
        </h2>
        <p className="mt-2 text-sm text-ink/65 dark:text-white/70">
          Have a question before you go? Chat with Astrologer Nishchal directly on WhatsApp —
          it only takes a moment.
        </p>
        <a
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="btn-whatsapp mt-6 w-full"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-3 text-xs text-ink/45 hover:text-ink/70 dark:text-white/40 dark:hover:text-white/70"
        >
          No thanks, I'll keep browsing
        </button>
      </div>
    </div>
  );
}
