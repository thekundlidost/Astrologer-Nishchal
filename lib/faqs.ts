import { Faq, FaqCategory } from "@/types";

export const FAQS: Faq[] = [
  // Consultation (Kundli Consultation)
  {
    id: "f1",
    category: "consultation",
    question: "What happens during a Kundli consultation?",
    answer:
      "It's a live one-on-one session where your birth chart is read in detail and your specific questions — career, marriage, finance, family — are addressed with practical guidance and realistic remedies.",
  },
  {
    id: "f2",
    category: "consultation",
    question: "What birth details do I need to provide?",
    answer:
      "Your exact date of birth, time of birth (as precise as possible) and place of birth. Birth time strongly affects accuracy, so it's worth confirming from your birth certificate or hospital records.",
  },
  {
    id: "f3",
    category: "consultation",
    question: "Can I ask about a specific problem I'm facing?",
    answer:
      "Yes — most clients come with a specific situation in mind. Bringing a focused question (a particular job, relationship or decision) usually makes the session far more useful than a broad 'tell me everything' request.",
  },
  // Reports (Kundli Report)
  {
    id: "f4",
    category: "reports",
    question: "How long does it take to receive my Kundli report?",
    answer:
      "Detailed Kundli reports are typically delivered within 24–48 hours as a PDF, sent to your email and WhatsApp.",
  },
  {
    id: "f5",
    category: "reports",
    question: "What's included in the Kundli report?",
    answer:
      "Your full birth chart with divisional charts, plus a plain-language explanation of personality, career direction, marriage timing indicators, financial outlook, health-sensitive periods and suggested remedies.",
  },
  {
    id: "f6",
    category: "reports",
    question: "Can I ask follow-up questions after receiving my report?",
    answer:
      "Yes — a short follow-up window over WhatsApp is included with every report so you can clarify anything that wasn't clear in the writeup.",
  },
  // Tarot
  {
    id: "f7",
    category: "tarot",
    question: "How does an online tarot reading work?",
    answer:
      "You share the question or situation you'd like clarity on, then Astrologer Nishchal draws and interprets cards live during your session, explaining what each card suggests for your specific question.",
  },
  {
    id: "f8",
    category: "tarot",
    question: "How far ahead can a tarot reading predict?",
    answer:
      "Tarot is generally most reliable for near-term guidance — weeks to a few months — rather than long-range predictions. For longer-term timing, a Kundli consultation is usually a better fit.",
  },
  // Numerology
  {
    id: "f9",
    category: "numerology",
    question: "What does a numerology report tell me?",
    answer:
      "It explains your life path, destiny and name numbers in practical terms, along with favourable numbers, colours and days — and any name adjustments worth considering.",
  },
  {
    id: "f10",
    category: "numerology",
    question: "Is numerology useful for naming a business or child?",
    answer:
      "Yes — this is one of the most common reasons clients order a report, since it gives a clear number-based comparison between a few name options you're already considering.",
  },
  // Gemstones
  {
    id: "f11",
    category: "gemstones",
    question: "How do I know which gemstone is right for me?",
    answer:
      "The right stone depends on your birth chart, not your zodiac sign alone. A consultation reviews your specific planetary placements before recommending a stone, carat and metal suited to you.",
  },
  {
    id: "f12",
    category: "gemstones",
    question: "Where should I buy the gemstone after the consultation?",
    answer:
      "From any certified jeweller you trust. The consultation tells you exactly what to look for — stone type, minimum carat and certification — so you can buy with confidence wherever you choose.",
  },
  // Payments
  {
    id: "f13",
    category: "payments",
    question: "How do I pay for my consultation?",
    answer:
      "Pay securely via UPI — scan the QR code or use the UPI ID, with the correct amount pre-filled for your chosen service. International clients can pay via PayPal. No card details are ever stored on this site.",
  },
  {
    id: "f14",
    category: "payments",
    question: "Which UPI apps are supported?",
    answer:
      "Any UPI app works — Google Pay, PhonePe, Paytm, BHIM, Amazon Pay and your bank's own app. After paying, you simply confirm on WhatsApp to complete your booking.",
  },
  // Booking
  {
    id: "f15",
    category: "booking",
    question: "How do I book a consultation?",
    answer:
      "Choose your service, fill in the booking form with your details and preferred slot, complete the UPI payment, and confirm on WhatsApp. You'll receive your appointment confirmation there.",
  },
  {
    id: "f16",
    category: "booking",
    question: "Can I reschedule my appointment?",
    answer:
      "Yes — rescheduling is possible if requested at least a few hours before your slot. Simply message on WhatsApp with your preferred new time.",
  },
  // Online
  {
    id: "f17",
    category: "online",
    question: "I live outside India — can I still book?",
    answer:
      "Yes, NRI clients are welcomed regularly and sessions are scheduled around your local time zone. International payments can be made via PayPal — just mention your country while booking.",
  },
  // Privacy & accuracy
  {
    id: "f18",
    category: "privacy",
    question: "Is my information kept confidential?",
    answer:
      "Yes — your birth details, conversation content and contact information are kept strictly confidential and never shared with third parties. Testimonials are only ever published with explicit consent.",
  },
  {
    id: "f19",
    category: "accuracy",
    question: "How accurate are the predictions?",
    answer:
      "Astrology works with tendencies and timing windows rather than guarantees. Readings are most useful as a structured way to think through possibilities — no consultant can honestly promise a specific outcome, so terms like '100% accurate' are intentionally avoided.",
  },
  {
    id: "f20",
    category: "accuracy",
    question: "Should astrology replace professional advice?",
    answer:
      "No. Guidance here is offered for general spiritual and self-reflective purposes only and is not a substitute for professional medical, legal or financial advice — please consult a qualified professional for those matters.",
  },
];

export function getFaqsByCategory(category: FaqCategory, limit?: number): Faq[] {
  const filtered = FAQS.filter((f) => f.category === category);
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export function getFaqsByCategories(categories: FaqCategory[], limitPerCategory?: number): Faq[] {
  return categories.flatMap((category) => getFaqsByCategory(category, limitPerCategory));
}
