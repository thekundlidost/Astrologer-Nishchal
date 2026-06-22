import { Faq, Service, Testimonial, BlogPost } from "@/types";
import { SITE, TRUST_STATS } from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    alternateName: SITE.handle,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
    areaServed: ["IN", "Worldwide"],
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: TRUST_STATS.rating,
      bestRating: TRUST_STATS.ratingOutOf,
      ratingCount: "5000",
    },
    sameAs: [SITE.instagramUrl],
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: ["IN", "Worldwide"],
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(service.price),
      availability: "https://schema.org/InStock",
    },
  };
}

export function reviewSchema(testimonials: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.name} — Astrology Consultations`,
    description: SITE.description,
    brand: { "@type": "Brand", name: SITE.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: TRUST_STATS.rating,
      bestRating: TRUST_STATS.ratingOutOf,
      ratingCount: "5000",
    },
    review: testimonials.slice(0, 10).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
      reviewBody: t.quote,
    })),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}

/** Renders a JSON-LD <script> tag safely as a string for dangerouslySetInnerHTML. */
export function blogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: { "@type": "Person", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${post.slug}` },
  };
}

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
