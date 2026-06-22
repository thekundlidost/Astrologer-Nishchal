import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Refund Policy for ${SITE.name} consultations and reports.`,
  alternates: { canonical: "/refund-policy" },
};

export default function Page() {
  return (
    <LegalPage title="Refund Policy" updated="June 2026">
      <p>We want every client to feel confident booking with {SITE.name}. This policy explains when refunds apply.</p>
      <div><h2>1. Before a Session or Report Begins</h2><p className="mt-2">If you cancel a consultation at least 24 hours before the scheduled slot, and the work on any report has not yet begun, you are eligible for a full refund of the amount paid.</p></div>
      <div><h2>2. After a Session or Report Is Delivered</h2><p className="mt-2">Once a live consultation has taken place, or a report has been started or delivered, the booking is considered fulfilled and is non-refundable.</p></div>
      <div><h2>3. Rescheduling Instead of Refund</h2><p className="mt-2">If you're unable to attend, rescheduling is usually the simplest option and can be arranged via WhatsApp with reasonable notice at no extra cost.</p></div>
      <div><h2>4. Payment Issues</h2><p className="mt-2">If you were charged but did not receive a confirmation, contact us immediately at {SITE.email} or on WhatsApp with your payment reference, and we'll resolve it promptly.</p></div>
      <div><h2>5. How to Request a Refund</h2><p className="mt-2">Send your refund request, along with your booking details and payment reference, to {SITE.email} or via WhatsApp at {SITE.phoneDisplay}. Approved refunds are processed to the original payment method.</p></div>
    </LegalPage>
  );
}
