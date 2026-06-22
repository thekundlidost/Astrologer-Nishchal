export interface NavLink {
  label: string;
  href: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: "Sparkles" | "ScrollText" | "Layers" | "Hash" | "Gem";
  category: FaqCategory;
  price: number;
  tagline: string;
  summary: string;
  heroSubtitle: string;
  duration: string;
  benefits: string[];
  process: ProcessStep[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export type FaqCategory =
  | "consultation"
  | "tarot"
  | "numerology"
  | "gemstones"
  | "reports"
  | "payments"
  | "booking"
  | "online"
  | "privacy"
  | "accuracy";

export interface Faq {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  serviceSlug: string;
  serviceLabel: string;
  rating: number;
  quote: string;
  category: ReviewCategory;
  verified?: boolean;
}

export type ReviewCategory =
  | "marriage"
  | "career"
  | "finance"
  | "relationship"
  | "general";

export interface FeedbackScreenshot {
  id: string;
  src: string;
  alt: string;
  source: "whatsapp" | "astrotalk" | "testimonial";
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;        // ISO date
  readMinutes: number;
  serviceSlug?: string; // related service for CTA
  intro: string;
  sections: BlogSection[];
}
