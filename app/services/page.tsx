import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import ServiceCard from "@/components/ui/ServiceCard";
import ServiceComparison from "@/components/ui/ServiceComparison";
import ProcessTimeline from "@/components/ui/ProcessTimeline";
import CTASection from "@/components/ui/CTASection";
import TrustBadges from "@/components/ui/TrustBadges";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Astrology Services & Pricing",
  description:
    "Explore Kundli consultation, Kundli report, tarot reading, numerology report and gemstone consultation — premium astrology services by Astrologer Nishchal.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Our Services"
        title="Premium Astrology Services"
        subtitle="Five focused services, each designed around a specific kind of question — choose the one that fits what's on your mind."
      />
      <div className="bg-royal-700 pb-8">
        <div className="container-px mx-auto max-w-7xl">
          <TrustBadges light />
        </div>
      </div>

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <ServiceComparison />
      <ProcessTimeline />
      <CTASection />
    </>
  );
}
