import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE.name} — how your information is collected, used and protected.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>This Privacy Policy explains how {SITE.name} ({SITE.handle}) collects, uses and protects the personal information you share when you use this website or book a consultation.</p>
      <div><h2>1. Information We Collect</h2><p className="mt-2">When you book or submit a form, we may collect your name, contact number, email, date of birth, time of birth and place of birth. These are needed to prepare an accurate reading or report.</p></div>
      <div><h2>2. How We Use Your Information</h2><p className="mt-2">Your information is used solely to provide the consultation or report you've booked, to communicate about your booking, and to send relevant updates if you've opted in. We never sell your personal information.</p></div>
      <div><h2>3. Confidentiality of Sessions</h2><p className="mt-2">Details shared during a consultation are confidential. We never publish or share the specifics of any client's session without explicit consent.</p></div>
      <div><h2>4. Payment Information</h2><p className="mt-2">Payments are made via UPI (directly through your banking app) or PayPal. We do not collect or store your card or banking details on this website.</p></div>
      <div><h2>5. WhatsApp Communication</h2><p className="mt-2">Bookings and confirmations happen over WhatsApp click-to-chat. Messages you send are subject to WhatsApp's own privacy policy in addition to ours.</p></div>
      <div><h2>6. Cookies &amp; Analytics</h2><p className="mt-2">This website may use basic, anonymized analytics to understand traffic and improve the experience. It does not collect personally identifiable information beyond standard usage data.</p></div>
      <div><h2>7. Your Rights</h2><p className="mt-2">You may request a copy of, correction to, or deletion of the personal data we hold about you by contacting {SITE.email}.</p></div>
      <div><h2>8. Contact</h2><p className="mt-2">For any questions about this policy, reach out at {SITE.email} or {SITE.phoneDisplay}.</p></div>
    </LegalPage>
  );
}
