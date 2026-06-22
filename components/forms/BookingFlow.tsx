"use client";

import { useState, useEffect, FormEvent, ReactNode } from "react";
import { Check, CreditCard, MessageCircle, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import UpiQR from "@/components/ui/UpiQR";
import TurnstileWidget, { Honeypot } from "@/components/ui/TurnstileWidget";
import {
  SERVICES,
  SITE,
  formatPrice,
  whatsappLink,
  getServiceBySlug,
} from "@/lib/constants";
import {
  resolvePayment,
  buildSecureUpiLink,
} from "@/lib/payment-security";
import {
  sanitizeText,
  validateName,
  validateMobile,
  validateEmail,
  validateRequiredText,
  validateDate,
  validateOptionalTime,
  validateNotes,
  validateServiceSlug,
} from "@/lib/validation";
import { checkRateLimit, recordSubmission } from "@/lib/rate-limit";
import { trackEvent } from "@/lib/analytics";

interface FormState {
  name: string;
  mobile: string;
  email: string;
  dob: string;
  tob: string;
  pob: string;
  serviceSlug: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  transactionId: string;
}

const EMPTY: FormState = {
  name: "",
  mobile: "",
  email: "",
  dob: "",
  tob: "",
  pob: "",
  serviceSlug: SERVICES[0].slug,
  preferredDate: "",
  preferredTime: "",
  notes: "",
  transactionId: "",
};

type Step = 1 | 2 | 3 | 4;
const STEP_LABELS = ["Service", "Your Details", "Payment", "Confirm"];

export default function BookingFlow({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY,
    serviceSlug: initialService && getServiceBySlug(initialService) ? initialService : SERVICES[0].slug,
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (initialService && getServiceBySlug(initialService)) {
      setForm((f) => ({ ...f, serviceSlug: initialService }));
    }
  }, [initialService]);

  // Track that the booking flow was opened (once on mount).
  useEffect(() => {
    trackEvent("booking_open");
  }, []);

  // Track reaching the payment step.
  useEffect(() => {
    if (step === 3) trackEvent("payment_view", { service: form.serviceSlug });
  }, [step, form.serviceSlug]);

  const service = getServiceBySlug(form.serviceSlug) ?? SERVICES[0];

  // SECURE PAYMENT: amount is resolved from the frozen price table by slug only,
  // never from user input. Payee is locked. The QR and the pay button both use
  // this single validated string, so they can never diverge or be tampered.
  const payment = resolvePayment(service.slug);
  const payUrl = buildSecureUpiLink(payment);

  // Open the UPI app without ever rendering the raw upi:// string in the UI.
  function openUpiApp() {
    window.location.href = payUrl;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateDetails(): boolean {
    setFormError(null);

    // Honeypot: if filled, it's a bot. Reject silently (generic message).
    if (honeypot.trim() !== "") {
      setFormError("Submission could not be processed. Please try again.");
      return false;
    }

    // Turnstile: if a site key is configured, require a token.
    const turnstileConfigured = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
    if (turnstileConfigured && !turnstileToken) {
      setFormError("Please complete the verification challenge.");
      return false;
    }

    const next: Partial<Record<keyof FormState, string>> = {};
    next.name = validateName(form.name) ?? undefined;
    next.mobile = validateMobile(form.mobile) ?? undefined;
    next.email = validateEmail(form.email, false) ?? undefined;
    next.dob = validateDate(form.dob, "date of birth") ?? undefined;
    next.tob = validateOptionalTime(form.tob) ?? undefined;
    next.pob = validateRequiredText(form.pob, "place of birth") ?? undefined;
    next.preferredDate = validateDate(form.preferredDate, "preferred date") ?? undefined;
    next.preferredTime = validateOptionalTime(form.preferredTime) ?? undefined;
    next.notes = validateNotes(form.notes) ?? undefined;
    next.serviceSlug = validateServiceSlug(form.serviceSlug, SERVICES.map((s) => s.slug)) ?? undefined;

    // drop undefined entries
    (Object.keys(next) as (keyof FormState)[]).forEach((k) => {
      if (!next[k]) delete next[k];
    });
    setErrors(next);
    if (Object.keys(next).length > 0) return false;

    // Rate limit the transition into payment (counts as a submission attempt).
    const rl = checkRateLimit("booking");
    if (!rl.allowed) {
      setFormError(rl.reason ?? "Please wait before trying again.");
      return false;
    }
    recordSubmission("booking");
    return true;
  }

  function buildWhatsAppMessage(includePayment: boolean) {
    // Every value is sanitized before being placed into the message.
    const s = (v: string) => sanitizeText(v);
    const lines = [
      `Hello Astrologer Nishchal, I would like to book a consultation.`,
      ``,
      `Service: ${payment.title} (${formatPrice(payment.amount)})`,
      `Name: ${s(form.name)}`,
      `Mobile: ${s(form.mobile)}`,
      form.email ? `Email: ${s(form.email)}` : null,
      `Date of Birth: ${s(form.dob)}`,
      form.tob ? `Time of Birth: ${s(form.tob)}` : `Time of Birth: (not provided)`,
      `Place of Birth: ${s(form.pob)}`,
      `Preferred Date: ${s(form.preferredDate)}`,
      form.preferredTime ? `Preferred Time: ${s(form.preferredTime)}` : null,
      form.notes ? `Notes: ${s(form.notes)}` : null,
    ];
    if (includePayment) {
      lines.push(
        ``,
        `Amount Paid: ${formatPrice(payment.amount)}`,
        form.transactionId ? `Transaction ID: ${s(form.transactionId)}` : `Transaction ID: (will share screenshot)`,
        `Payment Completed ✓ (screenshot attached)`
      );
    }
    return lines.filter((l) => l !== null).join("\n");
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Step indicator */}
      <ol className="mb-10 flex items-center">
        {STEP_LABELS.map((label, i) => {
          const n = (i + 1) as Step;
          const done = step > n;
          const active = step === n;
          return (
            <li key={label} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {i > 0 && (
                  <div className={`h-0.5 flex-1 ${step >= n ? "bg-gold-400" : "bg-royal-100 dark:bg-white/15"}`} />
                )}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    done || active
                      ? "bg-gold-400 text-royal-900"
                      : "bg-royal-100 text-royal-400 dark:bg-white/10 dark:text-white/50"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : n}
                </span>
                {i < STEP_LABELS.length - 1 && (
                  <div className={`h-0.5 flex-1 ${step > n ? "bg-gold-400" : "bg-royal-100 dark:bg-white/15"}`} />
                )}
              </div>
              <span
                className={`mt-2 text-center text-[11px] font-medium ${
                  active ? "text-royal-600 dark:text-white" : "text-ink/45 dark:text-white/40"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* STEP 1 — Service selection */}
      {step === 1 && (
        <div className="card p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-royal-600 dark:text-white">Choose Your Service</h2>
          <p className="mt-1 text-sm text-ink/60 dark:text-white/60">Select the consultation or report you'd like to book.</p>
          <div className="mt-6 space-y-3">
            {SERVICES.map((s) => {
              const selected = s.slug === form.serviceSlug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => update("serviceSlug", s.slug)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-gold-400 bg-gold-50 dark:bg-gold-400/10"
                      : "border-royal-100 hover:border-royal-300 dark:border-white/10 dark:hover:border-white/30"
                  }`}
                >
                  <div className="pr-3">
                    <span className="font-heading text-sm font-semibold text-royal-600 dark:text-white">{s.title}</span>
                    <span className="mt-0.5 block text-xs text-ink/55 dark:text-white/55">{s.tagline}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gold-600 dark:text-gold-300">{formatPrice(s.price)}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        selected ? "border-gold-400 bg-gold-400 text-royal-900" : "border-royal-200 dark:border-white/30"
                      }`}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setStep(2)} className="btn-primary mt-6 w-full">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* STEP 2 — Details */}
      {step === 2 && (
        <form
          className="card p-6 sm:p-8"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (validateDetails()) setStep(3);
          }}
        >
          <h2 className="font-heading text-xl font-bold text-royal-600 dark:text-white">Your Details</h2>
          <p className="mt-1 text-sm text-ink/60 dark:text-white/60">
            Accurate birth details make for a more accurate reading.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.name}>
              <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
            </Field>
            <Field label="Mobile Number" error={errors.mobile}>
              <input className="input" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 70165 01873" />
            </Field>
            <Field label="Email (optional)" error={errors.email}>
              <input className="input" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="Place of Birth" error={errors.pob}>
              <input className="input" value={form.pob} onChange={(e) => update("pob", e.target.value)} placeholder="City, State" />
            </Field>
            <Field label="Date of Birth" error={errors.dob}>
              <input type="date" className="input" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
            </Field>
            <Field label="Time of Birth (optional)">
              <input type="time" className="input" value={form.tob} onChange={(e) => update("tob", e.target.value)} />
            </Field>
            <Field label="Preferred Date" error={errors.preferredDate}>
              <input type="date" className="input" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
            </Field>
            <Field label="Preferred Time (optional)">
              <input type="time" className="input" value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Additional Notes (optional)">
                <textarea className="input resize-none" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Anything specific you'd like to focus on?" />
              </Field>
            </div>
          </div>

          {/* Spam protection: honeypot (hidden) + Turnstile (if configured) */}
          <Honeypot value={honeypot} onChange={setHoneypot} />
          <div className="mt-6">
            <TurnstileWidget onVerify={setTurnstileToken} />
          </div>

          {formError && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
              {formError}
            </p>
          )}

          <p className="mt-4 flex items-center gap-2 text-xs text-ink/50 dark:text-white/45">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
            Your details are validated and kept confidential. Nothing is sent until you confirm on WhatsApp.
          </p>

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="submit" className="btn-primary flex-[2]">
              Continue to Payment <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3 — Payment */}
      {step === 3 && (
        <div className="card p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-royal-600 dark:text-white">Complete Payment</h2>
          <p className="mt-1 text-sm text-ink/60 dark:text-white/60">
            Pay securely via UPI. The amount is pre-filled for your selected service.
          </p>

          <div className="mt-6 rounded-xl bg-mist p-5 text-center dark:bg-royal-900/50">
            <p className="text-sm text-ink/60 dark:text-white/60">{payment.title}</p>
            <p className="font-heading text-3xl font-bold text-royal-600 dark:text-white">{formatPrice(payment.amount)}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* QR — generated dynamically from the SAME upi link used by the button below */}
            <div className="flex flex-col items-center">
              <div className="rounded-2xl border border-royal-100 bg-white p-4 dark:border-white/10">
                <UpiQR value={payUrl} size={200} className="h-44 w-44" />
              </div>
              <p className="mt-3 text-xs text-ink/55 dark:text-white/55">
                Scan to pay {formatPrice(payment.amount)} · amount pre-filled
              </p>
            </div>

            {/* Pay action — amount pre-filled, no UPI ID shown publicly */}
            <div className="flex flex-col justify-center">
              <p className="text-sm leading-relaxed text-ink/65 dark:text-white/65">
                Scan the QR code with Google Pay, PhonePe, Paytm, BHIM or Amazon Pay. The amount
                of <span className="font-semibold text-royal-600 dark:text-white">{formatPrice(payment.amount)}</span> is
                already filled in — just approve and enter your UPI PIN.
              </p>
              <button type="button" onClick={openUpiApp} className="btn-primary mt-4">
                <CreditCard className="h-4 w-4" /> Pay {formatPrice(payment.amount)} on this device
              </button>
              <p className="mt-2 text-[11px] text-ink/45 dark:text-white/40">
                On mobile, this opens your UPI app with the amount pre-filled.
              </p>
            </div>
          </div>

          {/* International */}
          <div className="mt-6 rounded-xl border border-dashed border-royal-200 p-4 text-center dark:border-white/15">
            <p className="text-xs text-ink/60 dark:text-white/60">
              International client?{" "}
              <a href={SITE.paypalUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-royal-600 underline dark:text-gold-300">
                Pay via PayPal
              </a>
            </p>
          </div>

          {/* Transaction id (optional) */}
          <div className="mt-6">
            <Field label="Transaction ID / Reference (optional)">
              <input className="input" value={form.transactionId} onChange={(e) => update("transactionId", e.target.value)} placeholder="e.g. UPI reference number" />
            </Field>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(4)} className="btn-primary flex-[2]">
              I Have Completed Payment <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — Confirm via WhatsApp */}
      {step === 4 && (
        <div className="card p-6 text-center sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle className="h-8 w-8" />
          </span>
          <h2 className="mt-5 font-heading text-xl font-bold text-royal-600 dark:text-white">
            Final Step — Confirm on WhatsApp
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/65 dark:text-white/65">
            Tap below to send your booking details to Astrologer Nishchal on WhatsApp. Your
            details are pre-filled — just attach your payment screenshot and hit send.
          </p>

          <div className="mt-6 rounded-xl bg-mist p-5 text-left text-sm dark:bg-royal-900/50">
            <Summary label="Service" value={`${payment.title} (${formatPrice(payment.amount)})`} />
            <Summary label="Name" value={form.name || "—"} />
            <Summary label="Preferred Date" value={form.preferredDate || "—"} />
            <Summary label="Payment" value={`${formatPrice(payment.amount)} · ${form.transactionId ? "Txn " + form.transactionId : "screenshot to attach"}`} />
          </div>

          <a
            href={whatsappLink(buildWhatsAppMessage(true))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { trackEvent("booking_submit", { service: form.serviceSlug, amount: payment.amount }); trackEvent("whatsapp_click", { source: "booking_confirm" }); }}
            className="btn-whatsapp mt-6 w-full"
          >
            <MessageCircle className="h-4 w-4" /> Send Booking on WhatsApp
          </a>
          <p className="mt-3 text-xs text-ink/45 dark:text-white/40">
            Nothing is sent until you tap send inside WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => { setForm(EMPTY); setStep(1); }}
            className="mt-4 text-xs font-medium text-royal-500 hover:underline dark:text-gold-300"
          >
            Start a new booking
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60 dark:text-white/55">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-royal-100/70 py-2 last:border-0 dark:border-white/10">
      <span className="text-ink/55 dark:text-white/50">{label}</span>
      <span className="text-right font-medium text-royal-600 dark:text-white">{value}</span>
    </div>
  );
}
