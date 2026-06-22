import { NavLink, Service } from "@/types";

export const SITE = {
  name: "Astrologer Nishchal",
  handle: "@thekundlidost",
  secondaryBrand: "The Kundli Dost",
  tagline: "Get Clarity, Guidance & Confidence Through Personalized Astrology",
  trustTagline: "Trusted by 50,000+ Clients • Rated 4.94★",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.thekundlidost.com",
  description:
    "Personalized Vedic astrology guidance from Astrologer Nishchal (@thekundlidost) — Kundli consultation & reports, tarot, numerology and gemstone guidance. Confidential online consultations for India and NRI clients.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917016501873",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 70165 01873",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "thekundlidost@gmail.com",
  address: "New Delhi, India",
  instagramHandle: "@thekundlidost",
  instagramUrl: "https://instagram.com/thekundlidost",
  // Payment — UPI ID confirmed by client. The payment QR is generated
  // dynamically in-app from this ID + the per-service amount (see UpiQR component).
  upiId: "9714338888@okbizaxis",
  upiPayeeName: "Astrologer Nishchal",
  paypalUrl: "https://paypal.me/thekundlidost",
};

// Trust/social-proof figures shown across the site (animated counters).
// EDIT THESE IN ONE PLACE. Only display numbers that are truthful — fabricated
// review/consultation counts can be treated as misleading advertising.
export const TRUST_STATS = {
  rating: "4.94",
  ratingOutOf: "5",
  consultations: "50,000+",
  experiences: "Thousands+",
  verifiedReviews: "40,000+",
  reach: "India & Worldwide",
  confidential: "100%",
};

// Compact trust badges reused across pages (hero strips, footers of sections).
export const TRUST_BADGES: { label: string; icon: "Star" | "Sparkles" | "ShieldCheck" | "Video" | "Lock" | "Zap" | "Users" }[] = [
  { label: "Trusted by 50,000+ Clients", icon: "Users" },
  { label: `${TRUST_STATS.rating} Rating`, icon: "Star" },
  { label: "Confidential Consultation", icon: "ShieldCheck" },
  { label: "Secure Payment", icon: "Lock" },
  { label: "Online Consultation", icon: "Video" },
  { label: "Fast Response", icon: "Zap" },
];

// Weekly availability shown on the booking/availability section.
// Edit to reflect your real working hours. `slots` is illustrative, not live.
export const AVAILABILITY = {
  note: "Online consultations available 6 days a week. Same-day and next-day slots are usually open.",
  timezone: "IST (GMT+5:30)",
  schedule: [
    { day: "Monday", hours: "10:00 AM – 8:00 PM" },
    { day: "Tuesday", hours: "10:00 AM – 8:00 PM" },
    { day: "Wednesday", hours: "10:00 AM – 8:00 PM" },
    { day: "Thursday", hours: "10:00 AM – 8:00 PM" },
    { day: "Friday", hours: "10:00 AM – 8:00 PM" },
    { day: "Saturday", hours: "11:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "By appointment" },
  ],
};

// Cities used for the honest "clients book from across India & abroad" section.
// This is a general statement of reach, NOT a live/fabricated booking ticker.
export const CLIENT_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Ahmedabad",
  "Jaipur", "Chennai", "Kolkata", "Lucknow", "Toronto", "London",
  "Dubai", "Singapore", "New Jersey", "Sydney",
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Astrologer Nishchal, I would like to book a consultation.";

/**
 * Build a UPI deep link with the amount pre-filled.
 * Opens the user's UPI app (GPay, PhonePe, Paytm, BHIM, etc.) ready to pay.
 */
export function upiLink(amount: number, note: string) {
  // UPI deep link with amount pre-filled. Encode spaces as %20 (UPI-spec safe)
  // rather than the "+" that URLSearchParams would emit.
  const enc = (s: string) => encodeURIComponent(s);
  return (
    `upi://pay?pa=${enc(SITE.upiId)}` +
    `&pn=${enc(SITE.upiPayeeName)}` +
    `&am=${enc(String(amount))}` +
    `&cu=INR` +
    `&tn=${enc(note)}`
  );
}

export const SERVICES: Service[] = [
  {
    slug: "kundli-consultation",
    title: "Kundli Consultation",
    shortTitle: "Kundli Consultation",
    icon: "Sparkles",
    category: "consultation",
    price: 1000,
    tagline: "A live, personal reading of your birth chart",
    summary:
      "A one-on-one live consultation covering career, marriage, finance and the specific questions on your mind — read directly from your Kundli.",
    heroSubtitle:
      "Sit down with Astrologer Nishchal for a focused, live reading of your birth chart and get practical, judgement-free guidance on the decision in front of you.",
    duration: "30–45 minutes",
    benefits: [
      "Complete birth chart (Kundli) analysis using Vedic principles",
      "Clear answers on career, marriage, finance and family matters",
      "Insight into your current planetary period (Dasha)",
      "Practical remedies you can realistically follow",
      "Private, judgement-free space for difficult questions",
    ],
    process: [
      { title: "Choose this service", description: "Select Kundli Consultation and continue to the booking form." },
      { title: "Share your details", description: "Fill in your birth details and preferred slot — these prepare your chart." },
      { title: "Complete payment", description: "Pay securely via UPI with the amount pre-filled, then confirm on WhatsApp." },
      { title: "Receive your consultation", description: "Have your live session, with a follow-up summary sent on WhatsApp." },
    ],
    metaTitle: "Kundli Consultation Online | Astrologer Nishchal",
    metaDescription:
      "Book a live Kundli consultation with Astrologer Nishchal (@thekundlidost) for career, marriage, finance and life guidance. ₹1000, online & confidential.",
    keywords: ["kundli consultation online", "best astrologer online india", "vedic astrology consultation", "birth chart reading"],
  },
  {
    slug: "kundli-report",
    title: "Kundli Report",
    shortTitle: "Kundli Report",
    icon: "ScrollText",
    category: "reports",
    price: 499,
    tagline: "Your entire chart, written in plain language",
    summary:
      "A comprehensive written Kundli report covering personality, career, marriage timing, finance, health and remedies — delivered as a PDF you can keep.",
    heroSubtitle:
      "A complete, easy-to-read breakdown of your birth chart — career, marriage, finance, health and remedies — delivered straight to your inbox.",
    duration: "Delivered within 24–48 hours",
    benefits: [
      "Full birth chart (Lagna, Rashi & divisional charts) explained simply",
      "Career direction and best-suited fields of work",
      "Marriage timing indicators and compatibility factors",
      "Financial outlook and wealth-related yogas in your chart",
      "Health-sensitive periods and practical remedies",
    ],
    process: [
      { title: "Choose this service", description: "Select Kundli Report and continue to the booking form." },
      { title: "Submit birth details", description: "Accurate date, time and place of birth — this determines report quality." },
      { title: "Complete payment", description: "Pay ₹499 via UPI with the amount pre-filled, then confirm on WhatsApp." },
      { title: "Receive your PDF", description: "Your detailed report is emailed within 24–48 hours, with a WhatsApp follow-up." },
    ],
    metaTitle: "Detailed Kundli Report PDF | Astrologer Nishchal",
    metaDescription:
      "Order a detailed Kundli report covering career, marriage, finance and health — plain-language PDF delivered in 24–48 hours. ₹499, by Astrologer Nishchal.",
    keywords: ["kundli report online", "detailed janam kundli pdf", "birth chart report india", "kundli analysis for marriage"],
  },
  {
    slug: "tarot-reading",
    title: "Tarot Reading",
    shortTitle: "Tarot Reading",
    icon: "Layers",
    category: "tarot",
    price: 500,
    tagline: "Listen to what the cards already know",
    summary:
      "An intuitive tarot session for love, career and decision-making — ideal when you need a fresh, honest perspective on a near-term situation.",
    heroSubtitle:
      "A focused tarot reading to help you see a current situation clearly — a relationship, a job offer, or a decision you've been sitting on.",
    duration: "20–30 minutes",
    benefits: [
      "Specific guidance on the exact question you bring",
      "Clarity on near-term timing — weeks and months, not decades",
      "Honest, balanced reading without unnecessary fear-mongering",
      "Useful for love, career, business and personal decisions",
      "Can be combined with a Kundli consultation for a fuller picture",
    ],
    process: [
      { title: "Choose this service", description: "Select Tarot Reading and continue to the booking form." },
      { title: "Tell us your question", description: "Share the specific situation you'd like the cards to address." },
      { title: "Complete payment", description: "Pay ₹500 via UPI with the amount pre-filled, then confirm on WhatsApp." },
      { title: "Live card reading", description: "Astrologer Nishchal draws and interprets your cards live during your session." },
    ],
    metaTitle: "Tarot Card Reading Online | Astrologer Nishchal",
    metaDescription:
      "Get an honest, focused tarot card reading online with Astrologer Nishchal for love, career and decision-making clarity. ₹500, confidential.",
    keywords: ["tarot card reading online", "tarot reading for love", "online tarot consultation india", "career tarot reading"],
  },
  {
    slug: "numerology-report",
    title: "Numerology Report",
    shortTitle: "Numerology Report",
    icon: "Hash",
    category: "numerology",
    price: 299,
    tagline: "The numbers behind your name and birth date",
    summary:
      "A personalized numerology report covering your life path, destiny and name number — with suggestions for favourable name spellings and lucky dates.",
    heroSubtitle:
      "Understand the life path, destiny and name numbers shaping your decisions, and get practical suggestions for names, dates and choices ahead.",
    duration: "Delivered within 24 hours",
    benefits: [
      "Life path and destiny number explained with practical meaning",
      "Name number analysis, with corrections if currently unfavourable",
      "Lucky numbers, colours and days suited to your profile",
      "Useful inputs before naming a child, brand or business",
      "Simple, no-jargon report you can refer back to anytime",
    ],
    process: [
      { title: "Choose this service", description: "Select Numerology Report and continue to the booking form." },
      { title: "Share your details", description: "Provide your full birth date and current name as on official documents." },
      { title: "Complete payment", description: "Pay ₹299 via UPI with the amount pre-filled, then confirm on WhatsApp." },
      { title: "Receive your report", description: "Your numerology report is emailed within 24 hours, with a WhatsApp follow-up." },
    ],
    metaTitle: "Numerology Report Online | Astrologer Nishchal",
    metaDescription:
      "Get a personalized numerology report — life path, destiny and name number analysis — from Astrologer Nishchal, delivered within 24 hours. ₹299.",
    keywords: ["numerology report online", "name numerology consultation", "life path number india", "numerology for business name"],
  },
  {
    slug: "gemstone-consultation",
    title: "Gemstone Consultation",
    shortTitle: "Gemstone Consultation",
    icon: "Gem",
    category: "gemstones",
    price: 199,
    tagline: "The right stone, worn the right way",
    summary:
      "A chart-based gemstone recommendation so you know exactly which stone, carat, metal and finger suits your planetary placements — and which to avoid.",
    heroSubtitle:
      "Before you buy a gemstone, find out from your birth chart whether it actually supports your planets — the wrong stone can do more harm than good.",
    duration: "Delivered within 24 hours",
    benefits: [
      "Recommendation based on your actual birth chart, not guesswork",
      "Guidance on carat weight, metal and the correct finger to wear",
      "Auspicious day and time for wearing the stone for the first time",
      "Clarity on stones to avoid given your planetary combinations",
      "Honest advice — you'll never be told to buy more than you need",
    ],
    process: [
      { title: "Choose this service", description: "Select Gemstone Consultation and continue to the booking form." },
      { title: "Share your details", description: "Provide accurate birth details so your chart can be reviewed." },
      { title: "Complete payment", description: "Pay ₹199 via UPI with the amount pre-filled, then confirm on WhatsApp." },
      { title: "Receive your guidance", description: "Get your recommended stone, carat, metal and wearing instructions." },
    ],
    metaTitle: "Gemstone Consultation Online | Astrologer Nishchal",
    metaDescription:
      "Find the right gemstone for your birth chart with Astrologer Nishchal — stone, carat, metal and wearing guidance. ₹199, chart-based and honest.",
    keywords: ["gemstone consultation online", "which gemstone should i wear", "astrology gemstone recommendation", "ruby emerald blue sapphire"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
