import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsRow from "@/components/ui/StatsRow";
import ReviewCarousel from "@/components/ui/ReviewCarousel";
import FeaturedReview from "@/components/ui/FeaturedReview";
import ReviewsFilter from "./ReviewsFilter";
import CTASection from "@/components/ui/CTASection";
import { TESTIMONIALS, getFeaturedTestimonials } from "@/lib/testimonials";
import { TRUST_STATS } from "@/lib/constants";
import { jsonLd, reviewSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Client Reviews & Success Stories",
  description:
    "Read 4.94★ verified client reviews and success stories for Astrologer Nishchal across marriage, career, finance, relationship and general guidance. Clients across India & worldwide.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const featured = getFeaturedTestimonials(10);

  return (
    <>
      <Hero
        compact
        eyebrow="Client Success Stories"
        title="Reviews & Success Stories"
        subtitle={`Real experiences from ${TRUST_STATS.verifiedReviews} verified clients across India and worldwide — a ${TRUST_STATS.rating}★ average rating.`}
      />

      {/* Trust stats above reviews */}
      <section className="bg-royal-gradient py-12">
        <div className="container-px mx-auto max-w-7xl">
          <StatsRow variant="reviews" />
        </div>
      </section>

      {/* Auto-scrolling featured carousel */}
      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="In Their Words"
            title="Featured Client Stories"
            subtitle="A rotating selection of recent five-star experiences."
          />
          <div className="mt-12">
            <ReviewCarousel testimonials={featured} />
          </div>
        </div>
      </section>

      {/* Featured single spotlight */}
      <FeaturedReview testimonial={TESTIMONIALS[0]} />

      {/* Filterable review wall */}
      <section className="section surface-cream">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Review Wall"
            title="Browse Reviews by Service"
            subtitle="Every review below is from a verified client. Filter by the kind of guidance they came for."
          />
          <div className="mt-12">
            <ReviewsFilter testimonials={TESTIMONIALS} />
          </div>
          <p className="mt-10 text-center text-xs text-ink/45 dark:text-white/40">
            For privacy, we never display phone numbers, emails or order IDs — only first name,
            rating and review text, shared with client consent.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to Write Your Own Story?"
        subtitle="Book a consultation and find the clarity these clients found."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(reviewSchema(TESTIMONIALS))} />
    </>
  );
}
