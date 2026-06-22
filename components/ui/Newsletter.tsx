"use client";

import { useState, FormEvent } from "react";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { sanitizeText, validateName, validateEmail } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";

/**
 * "Get Free Astrology Tips" newsletter signup.
 *
 * Zero-backend approach: on submit we (a) fire an analytics event, and (b) hand
 * the details off via WhatsApp pre-filled message so the owner can collect them
 * with zero infrastructure. The collected fields (name, email) are in a simple,
 * consistent format that can later be wired to Mailchimp/Brevo/etc. by swapping
 * the submit handler for an API call — no UI changes needed.
 */
export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const nameErr = validateName(name);
    const emailErr = validateEmail(email, true);
    if (nameErr || emailErr) {
      setError(nameErr || emailErr);
      return;
    }
    trackEvent("newsletter_signup");
    const msg = [
      "Hello Astrologer Nishchal, I'd like to subscribe to free astrology tips.",
      `Name: ${sanitizeText(name)}`,
      `Email: ${sanitizeText(email)}`,
    ].join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setDone(true);
  }

  return (
    <section className="section surface-muted">
      <div className="container-px mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-royal-gradient p-8 sm:p-12">
          <div className="absolute inset-0 bg-celestial-radial" aria-hidden="true" />
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold-300">
                <Sparkles className="h-3.5 w-3.5" /> Free Astrology Tips
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">
                Get Free Astrology Tips
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Occasional, practical guidance on timing, remedies and self-understanding —
                straight to you. No spam, unsubscribe anytime.
              </p>
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
                <CheckCircle2 className="h-9 w-9 text-gold-300" />
                <p className="text-sm font-medium text-white">
                  Almost there — just send the WhatsApp message we opened to confirm your spot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={80}
                  autoComplete="name"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur focus:border-gold-400 focus:outline-none"
                />
                <div className="flex items-stretch gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    maxLength={120}
                    autoComplete="email"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur focus:border-gold-400 focus:outline-none"
                  />
                  <button type="submit" className="btn-primary shrink-0" aria-label="Subscribe">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
                {error && <p className="text-xs text-red-300">{error}</p>}
                <p className="text-[11px] text-white/45">
                  We respect your privacy. Your details are never sold or shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
