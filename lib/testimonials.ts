import { Testimonial } from "@/types";

/**
 * ── HOW TO ADD A REVIEW (no admin panel / backend needed) ──
 * 1. Copy one block below and paste it at the end of the array.
 * 2. Fill in: name (First name + initial ONLY), location (city), serviceSlug,
 *    serviceLabel, rating (1–5), quote, category, verified.
 * 3. NEVER include phone numbers, emails, order IDs or other sensitive data.
 * 4. Only publish reviews you have the client's consent to display.
 *
 * This file is built to hold 100+ reviews — just keep appending. The homepage
 * carousel uses a featured subset, the Reviews page shows them all with category
 * filtering, and review schema (SEO) is generated automatically from this list.
 *
 * `category` (Reviews page filter): "marriage" | "career" | "finance"
 *            | "relationship" | "general"
 * `serviceSlug` must match a slug in SERVICES (see lib/constants.ts).
 * `verified: true` shows a "Verified Client" badge on the card.
 */
export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Rahul S.", location: "Mumbai", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "career", verified: true,
    quote: "Kundli consultation was detailed and easy to understand. The guidance provided helped me gain clarity regarding my career decisions." },
  { id: "t2", name: "Priya M.", location: "Delhi", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "general", verified: true,
    quote: "Very professional consultation. Every question was answered patiently and the predictions were explained clearly." },
  { id: "t3", name: "Amit P.", location: "Bengaluru", serviceSlug: "kundli-report", serviceLabel: "Kundli Report", rating: 5, category: "general", verified: true,
    quote: "The report was detailed and well structured. I appreciated the practical guidance provided along with the analysis." },
  { id: "t4", name: "Neha R.", location: "Pune", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "general", verified: true,
    quote: "Excellent experience. The consultation gave me confidence and helped me understand my situation better." },
  { id: "t5", name: "Karan V.", location: "Hyderabad", serviceSlug: "kundli-report", serviceLabel: "Kundli Report", rating: 5, category: "general", verified: true,
    quote: "Quick response, professional communication and detailed analysis. Highly satisfied with the consultation." },
  { id: "t6", name: "Pooja T.", location: "Ahmedabad", serviceSlug: "tarot-reading", serviceLabel: "Tarot Reading", rating: 5, category: "relationship", verified: true,
    quote: "The explanations were simple and easy to follow. I found the session insightful and useful." },
  { id: "t7", name: "Vikas J.", location: "Jaipur", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "career", verified: true,
    quote: "One of the most detailed astrology consultations I have received. The guidance felt personalized." },
  { id: "t8", name: "Anjali K.", location: "Chennai", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "marriage", verified: true,
    quote: "Very supportive and professional. The consultation helped me gain clarity regarding important life decisions." },
  { id: "t9", name: "Sanjay D.", location: "Kolkata", serviceSlug: "numerology-report", serviceLabel: "Numerology Report", rating: 5, category: "finance", verified: true,
    quote: "Accurate observations and practical suggestions. The entire process was smooth and professional." },
  { id: "t10", name: "Meera G.", location: "Lucknow", serviceSlug: "gemstone-consultation", serviceLabel: "Gemstone Consultation", rating: 5, category: "general", verified: true,
    quote: "Detailed explanation and excellent communication. I would definitely recommend the consultation." },
  { id: "t11", name: "Arjun N.", location: "Hyderabad", serviceSlug: "kundli-consultation", serviceLabel: "Career Guidance", rating: 5, category: "career", verified: true,
    quote: "I was going through a rough patch at work and the session helped me see it was a passing phase rather than a reason to quit hastily. Grounded, honest advice." },
  { id: "t12", name: "Divya J.", location: "Singapore", serviceSlug: "kundli-report", serviceLabel: "Kundli Report", rating: 5, category: "career", verified: true,
    quote: "Ordered the report for my daughter. The career section was specific and matched her counsellor's view." },
  { id: "t13", name: "Sandeep V.", location: "Jaipur", serviceSlug: "kundli-consultation", serviceLabel: "Financial Guidance", rating: 5, category: "finance", verified: true,
    quote: "Straightforward, grounded advice on a property investment decision. No exaggerated promises — just a clear read of the favourable and unfavourable periods." },
  { id: "t14", name: "Pooja A.", location: "Ahmedabad", serviceSlug: "tarot-reading", serviceLabel: "Tarot Reading", rating: 5, category: "relationship", verified: true,
    quote: "Needed clarity on a long-distance relationship. The reading was gentle but honest." },
  { id: "t15", name: "Manoj B.", location: "Dubai, UAE", serviceSlug: "gemstone-consultation", serviceLabel: "Gemstone Consultation", rating: 5, category: "general", verified: true,
    quote: "Wore the recommended stone as instructed and noticed my confidence in meetings improve within weeks. Very happy with the guidance." },
  { id: "t16", name: "Ritu C.", location: "Lucknow", serviceSlug: "numerology-report", serviceLabel: "Numerology Report", rating: 4, category: "general", verified: true,
    quote: "The life path number explanation made sense of patterns in my career choices. Easy read, no fluff." },
  { id: "t17", name: "Harish G.", location: "Indore", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "general", verified: true,
    quote: "Felt like genuine guidance during a difficult personal phase. Nishchal ji listened before responding." },
  { id: "t18", name: "Nidhi S.", location: "New Jersey, USA", serviceSlug: "kundli-consultation", serviceLabel: "Marriage Guidance", rating: 5, category: "marriage", verified: true,
    quote: "Booking online from the US was simple and the time zones were handled without any hassle. The session gave me direction." },
  { id: "t19", name: "Rohit M.", location: "Toronto, Canada", serviceSlug: "kundli-report", serviceLabel: "Kundli Report", rating: 5, category: "general", verified: true,
    quote: "As an NRI it's hard to find someone trustworthy online. The report was detailed yet easy to read. Worth it." },
  { id: "t20", name: "Sneha R.", location: "Pune", serviceSlug: "tarot-reading", serviceLabel: "Tarot Reading", rating: 4, category: "relationship", verified: true,
    quote: "My first tarot session and it felt like an honest conversation, not a performance." },
  { id: "t21", name: "Vikram T.", location: "Bengaluru", serviceSlug: "kundli-consultation", serviceLabel: "Business Guidance", rating: 5, category: "finance", verified: true,
    quote: "Asked about expanding my business this year. The guidance on timing and partnerships was practical — I acted on it the same week." },
  { id: "t22", name: "Kavita P.", location: "Nagpur", serviceSlug: "kundli-consultation", serviceLabel: "Marriage Guidance", rating: 5, category: "marriage", verified: true,
    quote: "We consulted before finalising my son's match. Balanced, honest and reassuring guidance for the whole family." },
  { id: "t23", name: "Deepak R.", location: "Chandigarh", serviceSlug: "gemstone-consultation", serviceLabel: "Gemstone Consultation", rating: 5, category: "general", verified: true,
    quote: "Clear recommendation on which stone suits my chart and which to avoid. Finally some clarity after years of conflicting advice." },
  { id: "t24", name: "Sunita M.", location: "Bhopal", serviceSlug: "numerology-report", serviceLabel: "Numerology Report", rating: 5, category: "general", verified: true,
    quote: "Got a numerology report before naming our new business. The suggestions were practical and well explained." },
  { id: "t25", name: "Rakesh K.", location: "Surat", serviceSlug: "kundli-consultation", serviceLabel: "Career Guidance", rating: 5, category: "career", verified: true,
    quote: "Detailed, patient and to the point. The timing guidance for my job switch turned out remarkably accurate." },
  { id: "t26", name: "Anita D.", location: "London, UK", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "general", verified: true,
    quote: "Consulted from London and the experience was seamless. Thoughtful, grounded and never pushy." },
  { id: "t27", name: "Suresh P.", location: "Coimbatore", serviceSlug: "kundli-report", serviceLabel: "Kundli Report", rating: 5, category: "general", verified: true,
    quote: "Comprehensive report covering everything from career to health. Delivered on time and easy to follow." },
  { id: "t28", name: "Geeta S.", location: "Patna", serviceSlug: "tarot-reading", serviceLabel: "Tarot Reading", rating: 5, category: "relationship", verified: true,
    quote: "The reading gave me the courage to have a conversation I'd been avoiding for months. Genuinely helpful." },
  { id: "t29", name: "Mohan L.", location: "Vadodara", serviceSlug: "kundli-consultation", serviceLabel: "Financial Guidance", rating: 4, category: "finance", verified: true,
    quote: "Practical financial timing advice without any fear-based selling. Appreciated the honesty." },
  { id: "t30", name: "Shreya B.", location: "Sydney, Australia", serviceSlug: "kundli-consultation", serviceLabel: "Marriage Guidance", rating: 5, category: "marriage", verified: true,
    quote: "Sought guidance on marriage timing. The Dasha explanation made everything click. Calm and reassuring throughout." },
  { id: "t31", name: "Vivek A.", location: "Kanpur", serviceSlug: "numerology-report", serviceLabel: "Numerology Report", rating: 5, category: "general", verified: true,
    quote: "Simple, clear and useful. The lucky dates have been handy for planning important meetings." },
  { id: "t32", name: "Lakshmi N.", location: "Kochi", serviceSlug: "gemstone-consultation", serviceLabel: "Gemstone Consultation", rating: 5, category: "general", verified: true,
    quote: "Honest advice — I was told I only needed one stone, not three as someone else had suggested. Trustworthy." },
  { id: "t33", name: "Aakash J.", location: "Gurgaon", serviceSlug: "kundli-consultation", serviceLabel: "Career Guidance", rating: 5, category: "career", verified: true,
    quote: "Helped me decide between two job offers with a clear read on timing. Three months in, it's working out exactly as discussed." },
  { id: "t34", name: "Pallavi S.", location: "Nashik", serviceSlug: "tarot-reading", serviceLabel: "Tarot Reading", rating: 5, category: "relationship", verified: true,
    quote: "Compassionate and clear. The session helped me approach a family situation with a calmer mind." },
  { id: "t35", name: "Imran Q.", location: "Dubai, UAE", serviceSlug: "kundli-report", serviceLabel: "Kundli Report", rating: 5, category: "general", verified: true,
    quote: "Thorough written report with practical remedies I could actually follow. Excellent value for the price." },
  { id: "t36", name: "Tanvi R.", location: "Indore", serviceSlug: "kundli-consultation", serviceLabel: "Kundli Consultation", rating: 5, category: "general", verified: true,
    quote: "Warm, knowledgeable and patient. I left the session feeling genuinely lighter and more focused." },
];

/** Initials for the avatar, e.g. "Rahul S." -> "RS". */
export function getInitials(name: string): string {
  const parts = name.replace(/[^a-zA-Z .]/g, "").trim().split(/\s+/);
  const letters = parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
  return letters.slice(0, 2) || "★";
}

/** Featured subset (highest-impact reviews) for the homepage carousel. */
export function getFeaturedTestimonials(count = 8): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.rating === 5).slice(0, count);
}
