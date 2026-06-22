import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import Hero from "@/components/ui/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";
import TestimonialsGrid from "@/components/ui/TestimonialsGrid";
import CTASection from "@/components/ui/CTASection";
import TrustBadges from "@/components/ui/TrustBadges";
import { getServiceBySlug, formatPrice, whatsappLink } from "@/lib/constants";
import { TESTIMONIALS } from "@/lib/testimonials";
import { getFaqsByCategories } from "@/lib/faqs";
import { breadcrumbSchema, faqPageSchema, jsonLd, serviceSchema } from "@/lib/schema";

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const related = TESTIMONIALS.filter((t) => t.serviceSlug === slug).slice(0, 3);
  const shown = related.length > 0 ? related : TESTIMONIALS.slice(0, 3);
  const faqs = getFaqsByCategories([service.category, "booking", "payments"], 3);
  const waMsg = `Hello Astrologer Nishchal, I'm interested in the ${service.title} (${formatPrice(service.price)}). Could you share more details?`;

  return (
    <>
      <Hero
        compact
        eyebrow={service.tagline}
        title={service.title}
        subtitle={service.heroSubtitle}
        ctas={[
          { label: `Book Now · ${formatPrice(service.price)}`, href: `/booking?service=${service.slug}`, variant: "primary" },
          { label: "Ask on WhatsApp", href: whatsappLink(waMsg), variant: "whatsapp" },
        ]}
        trustIndicators={[formatPrice(service.price), service.duration]}
      />
      <div className="bg-royal-700 pb-8">
        <div className="container-px mx-auto max-w-7xl">
          <TrustBadges light />
        </div>
      </div>

      {/* Benefits + sticky booking card */}
      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">What You Get</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-royal-600 dark:text-white">Why Clients Book This</h2>
            <ul className="mt-6 space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-ink/70 dark:text-white/70 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal-500 dark:text-gold-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="card p-6 lg:sticky lg:top-28">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink/55 dark:text-white/55">Price</span>
              <p className="font-heading text-3xl font-bold text-royal-600 dark:text-white">{formatPrice(service.price)}</p>
              <p className="mt-1 text-sm text-ink/55 dark:text-white/55">{service.duration}</p>
              <Link href={`/booking?service=${service.slug}`} className="btn-primary mt-5 w-full">Book Now</Link>
              <a href={whatsappLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-2 w-full">
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section surface-cream">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="How It Works" title={`Booking Your ${service.shortTitle}`} />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={step.title}>
                <span className="font-heading text-4xl font-bold text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-heading text-base font-semibold text-royal-600 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-white/65">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Client Stories" title={`Results From ${service.shortTitle}`} />
          <div className="mt-12"><TestimonialsGrid testimonials={shown} /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section surface-muted">
        <div className="container-px mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.shortTitle} — Questions`} />
          <div className="mt-10"><FAQAccordion faqs={faqs} /></div>
        </div>
      </section>

      <CTASection title={`Ready to Book Your ${service.shortTitle}?`} subtitle={`${formatPrice(service.price)} · ${service.duration}`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema(service))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqPageSchema(faqs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.title, url: `/services/${service.slug}` },
      ]))} />
    </>
  );
}
