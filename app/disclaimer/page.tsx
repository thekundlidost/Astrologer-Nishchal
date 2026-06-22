import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for the astrology, tarot, numerology and gemstone guidance offered by ${SITE.name}.`,
  alternates: { canonical: "/disclaimer" },
};

export default function Page() {
  return (
    <LegalPage title="Disclaimer" updated="June 2026">
      <p>The content and services offered on this website — Kundli consultations and reports, tarot readings, numerology reports and gemstone consultations — are provided for general informational, spiritual and self-reflective purposes only.</p>
      <div><h2>No Guarantee of Outcomes</h2><p className="mt-2">Astrology, tarot and numerology work with tendencies, probabilities and timing windows rather than certainties. We do not guarantee specific outcomes, results or predictions, and no consultant can promise that a particular event will or will not occur.</p></div>
      <div><h2>Not a Substitute for Professional Advice</h2><p className="mt-2">Guidance offered here is not a substitute for professional medical, psychological, legal or financial advice. For those matters, please consult a qualified, licensed professional.</p></div>
      <div><h2>Personal Responsibility</h2><p className="mt-2">Any decisions made based on guidance received from {SITE.name} are made at the client's own discretion and responsibility. Use consultations as one input among several when making important decisions.</p></div>
      <div><h2>Gemstone &amp; Remedy Disclaimer</h2><p className="mt-2">Gemstone and remedy recommendations are based on traditional astrological principles. Clients with health conditions or allergies should use their own judgement and consult a professional where relevant before adopting any physical remedy.</p></div>
      <div><h2>Contact</h2><p className="mt-2">Questions about this disclaimer: {SITE.email}.</p></div>
    </LegalPage>
  );
}
