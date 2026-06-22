import { Sparkles, CreditCard, ClipboardList, MessageCircle, LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STEPS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Sparkles, title: "Choose Service", desc: "Pick the consultation or report that fits your question." },
  { icon: CreditCard, title: "Make Payment", desc: "Pay securely via UPI with the amount pre-filled for your service." },
  { icon: ClipboardList, title: "Submit Details", desc: "Share your birth details and preferred slot through the booking form." },
  { icon: MessageCircle, title: "Receive Consultation", desc: "Confirm on WhatsApp and get your live session or report." },
];

export default function ProcessTimeline({ light = false }: { light?: boolean }) {
  return (
    <section className={`section ${light ? "" : "surface-cream"}`}>
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How It Works"
          title="Your Consultation in 4 Simple Steps"
          subtitle="From booking to guidance — most clients complete the whole process within a day."
        />

        <div className="relative mt-14">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent lg:block" />

          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative text-center">
                  <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royal-600 text-gold-400 shadow-premium ring-4 ring-white dark:ring-royal-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="mt-4 block font-heading text-sm font-bold text-gold-500">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-heading text-base font-semibold text-royal-600 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-white/60">
                    {step.desc}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
