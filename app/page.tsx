import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Hero from "@/components/ui/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import TrustBadges, { WhyChooseGrid } from "@/components/ui/TrustBadges";
import StatsRow from "@/components/ui/StatsRow";
import ReviewCarousel from "@/components/ui/ReviewCarousel";
import FeaturedReview from "@/components/ui/FeaturedReview";
import VideoTestimonials from "@/components/ui/VideoTestimonials";
import RecentActivity from "@/components/ui/RecentActivity";
import ServiceComparison from "@/components/ui/ServiceComparison";
import Availability from "@/components/ui/Availability";
import ProcessTimeline from "@/components/ui/ProcessTimeline";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTASection from "@/components/ui/CTASection";
import ZodiacWheel from "@/components/ui/ZodiacWheel";
import CelestialEmblem from "@/components/ui/CelestialEmblem";
import LatestArticles from "@/components/ui/LatestArticles";
import FindUsOnline from "@/components/ui/FindUsOnline";
import Newsletter from "@/components/ui/Newsletter";
import { SERVICES, SITE, TRUST_STATS, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";
import { TESTIMONIALS, getFeaturedTestimonials } from "@/lib/testimonials";
import { FAQS } from "@/lib/faqs";
import { faqPageSchema, jsonLd, reviewSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${SITE.name} — Personalized Astrology Guidance`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

const ABOUT_POINTS = [
  "Personalized analysis built around your actual birth chart",
  "Practical, honest guidance — never fear-based selling",
  "Confidential consultations, online by call or video",
  "Clients across India and abroad, with a 4.94★ average",
];

const homeFaqs = FAQS.filter((f) =>
  ["consultation", "booking", "payments", "online", "privacy", "accuracy"].includes(f.category)
).slice(0, 8);

export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <Hero
        eyebrow={SITE.trustTagline}
        title="Get Clarity, Guidance & Confidence Through Personalized Astrology"
        subtitle={`Trusted by ${TRUST_STATS.consultations} clients with a ${TRUST_STATS.rating}★ rating. Personal guidance from Astrologer Nishchal for career, marriage, finance and life decisions.`}
        ctas={[
          { label: "Book Consultation", href: "/booking", variant: "primary" },
          { label: "Chat on WhatsApp", href: whatsappLink(DEFAULT_WHATSAPP_MESSAGE), variant: "whatsapp" },
          { label: "View Services", href: "/services", variant: "secondary" },
        ]}
      />
      <div className="bg-royal-700 pb-8">
        <div className="container-px mx-auto max-w-7xl">
          <TrustBadges light />
        </div>
      </div>

      {/* SECTION 2 — About */}
      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <CelestialEmblem />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">About Astrologer Nishchal</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-royal-600 dark:text-white sm:text-4xl">
              Ancient Wisdom, Explained in Plain Language
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65 dark:text-white/65">
              Known online as {SITE.handle}, Astrologer Nishchal blends traditional Vedic
              astrology with a modern, practical approach. Every session is built around your
              actual chart and your actual question — not generic, one-size-fits-all predictions.
            </p>
            <ul className="mt-6 space-y-3">
              {ABOUT_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink/70 dark:text-white/70">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal-500 dark:text-gold-400" />
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-outline mt-7 inline-flex">More About Nishchal</Link>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Statistics */}
      <section className="relative overflow-hidden bg-royal-gradient py-16 sm:py-20">
        <ZodiacWheel className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 text-royal-300 opacity-20" />
        <div className="container-px relative mx-auto max-w-7xl">
          <StatsRow />
        </div>
      </section>

      {/* SECTION 4 — Services */}
      <section className="section surface-cream">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What We Offer"
            title="Premium Astrology Services"
            subtitle="Five focused services, each designed around a specific kind of question."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Why Choose */}
      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Choose Nishchal" title="Guidance You Can Actually Trust" />
          <div className="mt-12">
            <WhyChooseGrid />
          </div>
        </div>
      </section>

      {/* SECTION 6 — Process */}
      <ProcessTimeline />

      {/* SECTION 7 — Reviews preview (carousel) */}
      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Client Stories"
            title="What Clients Are Saying"
            subtitle={`A ${TRUST_STATS.rating}★ average across thousands of consultations.`}
          />
          <div className="mt-12">
            <ReviewCarousel testimonials={getFeaturedTestimonials(8)} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/reviews" className="btn-outline">View All Reviews</Link>
          </div>
        </div>
      </section>

      {/* Featured review spotlight */}
      <FeaturedReview testimonial={TESTIMONIALS[0]} />

      {/* Video testimonials */}
      <VideoTestimonials />

      {/* Recent activity / reach */}
      <RecentActivity />

      {/* Service comparison table */}
      <ServiceComparison />

      {/* Availability */}
      <Availability />

      {/* SECTION 8 — FAQ */}
      <section className="section">
        <div className="container-px mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common Questions" />
          <div className="mt-10">
            <FAQAccordion faqs={homeFaqs} />
          </div>
        </div>
      </section>

      {/* SECTION 9 — Final CTA */}
      <LatestArticles />


      <FindUsOnline />


      <Newsletter />


      <CTASection />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqPageSchema(homeFaqs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(reviewSchema(TESTIMONIALS))} />
    </>
  );
}
