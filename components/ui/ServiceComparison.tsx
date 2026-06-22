import Link from "next/link";
import { Check } from "lucide-react";
import { SERVICES, formatPrice } from "@/lib/constants";

const ROWS = [
  { key: "format", label: "Format" },
  { key: "duration", label: "Turnaround / Duration" },
  { key: "bestFor", label: "Best For" },
  { key: "delivery", label: "Delivery" },
];

// Per-service comparison attributes (kept here since they're presentation-only).
const ATTRS: Record<string, { format: string; bestFor: string; delivery: string }> = {
  "kundli-consultation": { format: "Live 1:1 call/video", bestFor: "Specific life questions", delivery: "Live session" },
  "kundli-report": { format: "Written PDF", bestFor: "Full chart overview", delivery: "Email + WhatsApp" },
  "tarot-reading": { format: "Live 1:1 call/video", bestFor: "Near-term decisions", delivery: "Live session" },
  "numerology-report": { format: "Written PDF", bestFor: "Names & numbers", delivery: "Email + WhatsApp" },
  "gemstone-consultation": { format: "Chart-based advice", bestFor: "Choosing a stone", delivery: "Email + WhatsApp" },
};

export default function ServiceComparison() {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Compare</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-royal-600 dark:text-white sm:text-4xl">
            Which Service Is Right for You?
          </h2>
          <div className="gold-divider mx-auto mt-4" />
          <p className="mt-4 text-base text-ink/65 dark:text-white/65">
            A quick side-by-side to help you pick the consultation that fits your question.
          </p>
        </div>

        {/* Desktop / tablet table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-royal-100 dark:border-white/10 md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-royal-gradient text-white">
                <th className="p-4 font-heading font-semibold">Service</th>
                {ROWS.map((r) => (
                  <th key={r.key} className="p-4 font-heading font-semibold">{r.label}</th>
                ))}
                <th className="p-4 font-heading font-semibold">Price</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s, i) => {
                const a = ATTRS[s.slug];
                return (
                  <tr
                    key={s.slug}
                    className={`${i % 2 === 0 ? "bg-white dark:bg-royal-800/40" : "bg-mist dark:bg-royal-900/40"}`}
                  >
                    <td className="p-4 font-semibold text-royal-600 dark:text-white">{s.title}</td>
                    <td className="p-4 text-ink/70 dark:text-white/70">{a.format}</td>
                    <td className="p-4 text-ink/70 dark:text-white/70">{s.duration}</td>
                    <td className="p-4 text-ink/70 dark:text-white/70">{a.bestFor}</td>
                    <td className="p-4 text-ink/70 dark:text-white/70">{a.delivery}</td>
                    <td className="p-4 font-bold text-gold-600 dark:text-gold-300">{formatPrice(s.price)}</td>
                    <td className="p-4">
                      <Link
                        href={`/booking?service=${s.slug}`}
                        className="inline-flex items-center rounded-full bg-gold-400 px-4 py-2 text-xs font-semibold text-royal-900 hover:bg-gold-300"
                      >
                        Book
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-10 space-y-4 md:hidden">
          {SERVICES.map((s) => {
            const a = ATTRS[s.slug];
            return (
              <div key={s.slug} className="card p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-semibold text-royal-600 dark:text-white">{s.title}</h3>
                  <span className="font-bold text-gold-600 dark:text-gold-300">{formatPrice(s.price)}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-ink/65 dark:text-white/65">
                  <li className="flex gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-gold-400" />{a.format}</li>
                  <li className="flex gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-gold-400" />{s.duration}</li>
                  <li className="flex gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-gold-400" />Best for: {a.bestFor}</li>
                </ul>
                <Link href={`/booking?service=${s.slug}`} className="btn-primary mt-4 w-full">Book Now</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
