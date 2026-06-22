import { FeedbackScreenshot } from "@/types";

/**
 * ── CLIENT FEEDBACK SCREENSHOT GALLERY (free, no backend) ──
 * To add a screenshot (WhatsApp feedback, Astrotalk review, testimonial image):
 * 1. Save the image into /public/feedback/ (e.g. /public/feedback/review-01.jpg).
 * 2. IMPORTANT: crop out phone numbers, emails, order IDs and full names first —
 *    show only first name + initial and the review text.
 * 3. Add an entry below pointing to it.
 * The gallery lazy-loads images and opens them in a lightbox on click.
 *
 * The placeholder entries below render as styled placeholder tiles until you
 * drop real images in. Delete them once you add your own.
 */
export const FEEDBACK_SCREENSHOTS: FeedbackScreenshot[] = [
  { id: "g1", src: "", alt: "WhatsApp feedback from a Kundli consultation client", source: "whatsapp" },
  { id: "g2", src: "", alt: "Astrotalk review screenshot", source: "astrotalk" },
  { id: "g3", src: "", alt: "WhatsApp feedback about a tarot reading", source: "whatsapp" },
  { id: "g4", src: "", alt: "Client testimonial image", source: "testimonial" },
  { id: "g5", src: "", alt: "WhatsApp feedback from a numerology report client", source: "whatsapp" },
  { id: "g6", src: "", alt: "Astrotalk review screenshot", source: "astrotalk" },
  { id: "g7", src: "", alt: "WhatsApp feedback from a gemstone consultation client", source: "whatsapp" },
  { id: "g8", src: "", alt: "Client testimonial image", source: "testimonial" },
];

export const SOURCE_LABELS: Record<FeedbackScreenshot["source"], string> = {
  whatsapp: "WhatsApp",
  astrotalk: "Verified Review",
  testimonial: "Testimonial",
};
