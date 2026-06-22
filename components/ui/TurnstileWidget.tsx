"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ──────────────────────────────────────────────────────────────────────────
 * CLOUDFLARE TURNSTILE WIDGET
 * ──────────────────────────────────────────────────────────────────────────
 * Renders the Turnstile challenge and reports the token to the parent form.
 *
 * Set NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable. If no key is configured the
 * widget renders nothing and reports a token of "" (forms can choose to allow
 * submission in dev). The token should be VERIFIED server-side (serverless
 * function) before any trusted action — see SECURITY.md. On a static site the
 * widget still raises the bar against casual bots.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function TurnstileWidget({
  onVerify,
}: {
  onVerify: (token: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) return; // not configured — skip
    if (document.getElementById("cf-turnstile-script")) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!SITE_KEY || !loaded || !ref.current || !window.turnstile) return;
    if (widgetId.current) return;
    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: SITE_KEY,
      callback: (token: string) => onVerify(token),
      "error-callback": () => onVerify(""),
      "expired-callback": () => onVerify(""),
      theme: "auto",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  if (!SITE_KEY) {
    // Not configured: render nothing. Form treats this as "no challenge".
    return null;
  }

  return <div ref={ref} className="mt-2" />;
}

/**
 * Hidden honeypot field. Real users never fill it; bots that auto-fill every
 * field will. If it has a value on submit, silently reject. Works without any
 * external service and adds zero friction for humans.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
