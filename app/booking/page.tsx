import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/components/ui/Hero";
import TrustBadges from "@/components/ui/TrustBadges";
import BookingFlowWrapper from "./BookingFlowWrapper";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book your astrology consultation with Astrologer Nishchal — choose a service, share your details, pay securely via UPI and confirm on WhatsApp.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Book a Session"
        title="Let's Find Your Slot"
        subtitle="Four quick steps — choose your service, share your details, pay securely via UPI, and confirm on WhatsApp."
      />
      <div className="bg-royal-700 pb-8">
        <div className="container-px mx-auto max-w-7xl">
          <TrustBadges light />
        </div>
      </div>

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <Suspense fallback={<div className="mx-auto max-w-3xl text-center text-sm text-ink/50">Loading booking…</div>}>
            <BookingFlowWrapper />
          </Suspense>
        </div>
      </section>
    </>
  );
}
