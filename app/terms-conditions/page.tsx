import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for using ${SITE.name}'s website and consultation services.`,
  alternates: { canonical: "/terms-conditions" },
};

export default function Page() {
  return (
    <LegalPage title="Terms & Conditions" updated="June 2026">
      <p>By accessing this website or booking a consultation with {SITE.name}, you agree to the following terms. Please read them carefully.</p>
      <div><h2>1. Services</h2><p className="mt-2">We provide Kundli consultations and reports, tarot readings, numerology reports and gemstone consultations for general guidance and self-reflective purposes. Sessions are conducted online by call or video.</p></div>
      <div><h2>2. Bookings &amp; Payment</h2><p className="mt-2">Consultations and reports are paid in advance via UPI or PayPal to confirm a booking. Prices shown are subject to change, but the price confirmed at booking will be honoured.</p></div>
      <div><h2>3. Rescheduling</h2><p className="mt-2">You may request to reschedule with reasonable advance notice via WhatsApp. See the Refund Policy for cancellation terms.</p></div>
      <div><h2>4. Accuracy of Information Provided</h2><p className="mt-2">The accuracy of your reading depends on the birth details you provide. We are not responsible for inaccuracies resulting from incorrect date, time or place of birth submitted by the client.</p></div>
      <div><h2>5. Nature of Guidance</h2><p className="mt-2">All services are for general guidance only and are not a substitute for professional medical, legal or financial advice. Decisions made based on a consultation remain the client's responsibility.</p></div>
      <div><h2>6. Limitation of Liability</h2><p className="mt-2">{SITE.name} shall not be liable for any direct or indirect loss arising from decisions made based on guidance provided.</p></div>
      <div><h2>7. Changes to These Terms</h2><p className="mt-2">These terms may be updated from time to time. Continued use after changes are posted constitutes acceptance.</p></div>
      <div><h2>8. Contact</h2><p className="mt-2">Questions about these terms: {SITE.email} or {SITE.phoneDisplay}.</p></div>
    </LegalPage>
  );
}
