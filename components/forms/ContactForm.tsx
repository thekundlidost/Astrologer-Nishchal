"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import TurnstileWidget, { Honeypot } from "@/components/ui/TurnstileWidget";
import {
  sanitizeText,
  validateName,
  validateMobile,
  validateEmail,
  validateRequiredText,
} from "@/lib/validation";
import { checkRateLimit, recordSubmission } from "@/lib/rate-limit";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    setFormError(null);

    if (honeypot.trim() !== "") {
      setFormError("Submission could not be processed. Please try again.");
      return false;
    }

    const turnstileConfigured = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
    if (turnstileConfigured && !turnstileToken) {
      setFormError("Please complete the verification challenge.");
      return false;
    }

    const next: Partial<Record<keyof FormState, string>> = {};
    const nameErr = validateName(form.name);
    if (nameErr) next.name = nameErr;
    const phoneErr = validateMobile(form.phone);
    if (phoneErr) next.phone = phoneErr;
    const emailErr = validateEmail(form.email, false);
    if (emailErr) next.email = emailErr;
    const msgErr = validateRequiredText(form.message, "message", 800);
    if (msgErr) next.message = msgErr;
    setErrors(next);
    if (Object.keys(next).length > 0) return false;

    const rl = checkRateLimit("contact");
    if (!rl.allowed) {
      setFormError(rl.reason ?? "Please wait before trying again.");
      return false;
    }
    recordSubmission("contact");
    return true;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const s = (v: string) => sanitizeText(v);
    const message = [
      `Hello Astrologer Nishchal, I'd like to get in touch.`,
      `Name: ${s(form.name)}`,
      form.email ? `Email: ${s(form.email)}` : null,
      `Phone: ${s(form.phone)}`,
      `Message: ${s(form.message)}`,
    ].filter(Boolean).join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-royal-500 dark:text-gold-400" />
        <h3 className="font-heading text-lg font-semibold text-royal-600 dark:text-white">
          We&apos;ve opened WhatsApp for you
        </h3>
        <p className="max-w-sm text-sm text-ink/65 dark:text-white/65">
          Your message is ready to send — just hit send in WhatsApp and we&apos;ll reply shortly.
        </p>
        <button type="button" onClick={() => { setSubmitted(false); setForm(initialState); }} className="btn-outline mt-2">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid grid-cols-1 gap-4 p-6 sm:p-8">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60 dark:text-white/55">Full Name</span>
        <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="Your full name" maxLength={80} autoComplete="name" />
        {errors.name && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.name}</span>}
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60 dark:text-white/55">Email (optional)</span>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" placeholder="you@example.com" maxLength={120} autoComplete="email" />
          {errors.email && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.email}</span>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60 dark:text-white/55">Phone Number</span>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="+91 70165 01873" maxLength={20} autoComplete="tel" />
          {errors.phone && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.phone}</span>}
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60 dark:text-white/55">Message</span>
        <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} className="input resize-none" placeholder="Tell us a little about what you'd like guidance on..." maxLength={800} />
        {errors.message && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.message}</span>}
      </label>

      <Honeypot value={honeypot} onChange={setHoneypot} />
      <TurnstileWidget onVerify={setTurnstileToken} />

      {formError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {formError}
        </p>
      )}

      <p className="flex items-center gap-2 text-xs text-ink/50 dark:text-white/45">
        <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
        Your details are kept confidential and never shared.
      </p>

      <button type="submit" className="btn-primary w-full">Send Message</button>
    </form>
  );
}
