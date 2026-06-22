import type { Metadata } from "next";
import { ShieldCheck, BookOpenCheck, Users, Sparkles } from "lucide-react";
import Hero from "@/components/ui/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsRow from "@/components/ui/StatsRow";
import CTASection from "@/components/ui/CTASection";
import { SITE, TRUST_STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Astrologer Nishchal",
  description:
    "Learn about Astrologer Nishchal (@thekundlidost) — personalized Vedic astrology guidance with an honest, practical, client-first approach.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: BookOpenCheck, title: "Deep Knowledge", description: "Grounded in classical Vedic astrology and ongoing study of planetary cycles and remedies." },
  { icon: ShieldCheck, title: "Ethical Practice", description: "No fear-based selling, no exaggerated promises. Honest guidance, even when it isn't the easy answer." },
  { icon: Users, title: "Client-First", description: "Every session starts with listening. The chart supports the conversation — it doesn't replace it." },
  { icon: Sparkles, title: "Practical Remedies", description: "Remedies kept simple and realistic, so they actually get followed." },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="About"
        title="Who Is Astrologer Nishchal?"
        subtitle={`Known online as ${SITE.handle}, offering personalized Vedic astrology guidance to clients across India and abroad — with a ${TRUST_STATS.rating}★ average rating.`}
      />

      <section className="bg-royal-gradient py-12">
        <div className="container-px mx-auto max-w-7xl"><StatsRow /></div>
      </section>

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">The Approach</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-royal-600 dark:text-white">
              Listening First, Predicting Second
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/70 dark:text-white/70">
              <p>
                Astrologer Nishchal blends traditional Vedic astrology with a modern, practical
                approach. The focus is on giving you guidance you can actually use — about a real
                decision in front of you — rather than vague, one-size-fits-all predictions.
              </p>
              <p>
                Working under the handle {SITE.handle}, Nishchal has guided clients through career
                changes, marriage decisions, business questions and difficult personal phases — for
                both Hindi and English-speaking clients, in India and among the NRI community abroad.
              </p>
              <p>
                The method stays the same regardless of the question: study the chart carefully,
                listen to the actual situation, and give guidance that's honest and usable — never
                designed to create dependency on future sessions.
              </p>
            </div>
          </div>

          <div className="card h-fit p-7">
            <h3 className="font-heading text-base font-semibold text-royal-600 dark:text-white">At a Glance</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between border-b border-royal-100/60 pb-3 dark:border-white/10">
                <dt className="text-ink/60 dark:text-white/55">Rating</dt>
                <dd className="font-semibold text-royal-600 dark:text-white">{TRUST_STATS.rating}★</dd>
              </div>
              <div className="flex justify-between border-b border-royal-100/60 pb-3 dark:border-white/10">
                <dt className="text-ink/60 dark:text-white/55">Consultations</dt>
                <dd className="font-semibold text-royal-600 dark:text-white">{TRUST_STATS.consultations}</dd>
              </div>
              <div className="flex justify-between border-b border-royal-100/60 pb-3 dark:border-white/10">
                <dt className="text-ink/60 dark:text-white/55">Mode</dt>
                <dd className="font-semibold text-royal-600 dark:text-white">Online (Call / Video)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60 dark:text-white/55">Languages</dt>
                <dd className="font-semibold text-royal-600 dark:text-white">Hindi, English</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section surface-cream">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="What Guides This Practice" title="Knowledge, Honesty and Care" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card card-hover p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-royal-500 dark:bg-white/10 dark:text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-royal-600 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-white/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Have a Question You've Been Sitting On?" subtitle="Book a session and bring it to the table — no judgement, just guidance." />
    </>
  );
}
