import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Globe } from "lucide-react";
import Hero from "@/components/ui/Hero";
import ContactForm from "@/components/forms/ContactForm";
import { DEFAULT_WHATSAPP_MESSAGE, SITE, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Astrologer Nishchal — WhatsApp, Instagram (@thekundlidost), email or the contact form. Online consultations available.",
  alternates: { canonical: "/contact" },
};

const CARDS = [
  { icon: MessageCircle, title: "WhatsApp", value: SITE.phoneDisplay, href: whatsappLink(DEFAULT_WHATSAPP_MESSAGE), cta: "Chat Now", ext: true },
  { icon: Phone, title: "Call", value: SITE.phoneDisplay, href: `tel:${SITE.phoneDisplay.replace(/\s/g, "")}`, cta: "Call Now", ext: false },
  { icon: Instagram, title: "Instagram", value: SITE.instagramHandle, href: SITE.instagramUrl, cta: "Follow", ext: true },
  { icon: Mail, title: "Email", value: SITE.email, href: `mailto:${SITE.email}`, cta: "Send Email", ext: false },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Get in Touch"
        title="We'd Love to Hear From You"
        subtitle="Reach out on WhatsApp for the fastest response, follow along on Instagram, or send a message below."
        ctas={[
          { label: "Chat on WhatsApp", href: whatsappLink(DEFAULT_WHATSAPP_MESSAGE), variant: "whatsapp" },
          { label: "Book Consultation", href: "/booking", variant: "primary" },
        ]}
      />

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {CARDS.map(({ icon: Icon, title, value, href, cta, ext }) => (
              <a
                key={title}
                href={href}
                data-track={title === "WhatsApp" ? "whatsapp_click" : title === "Instagram" ? "instagram_click" : title === "Call" ? "call_click" : undefined}
                data-track-source="contact_cards"
                target={ext ? "_blank" : undefined}
                rel={ext ? "noopener noreferrer" : undefined}
                className="card card-hover flex flex-col items-center p-7 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-royal-500 dark:bg-white/10 dark:text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-royal-600 dark:text-white">{title}</h3>
                <p className="mt-1 text-sm text-ink/60 dark:text-white/60">{value}</p>
                <span className="mt-4 text-sm font-semibold text-gold-500">{cta}</span>
              </a>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-bold text-royal-600 dark:text-white">Send a Message</h2>
              <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
                Share a few details and we'll get back to you, usually within a few hours.
              </p>
              <div className="mt-6"><ContactForm /></div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-royal-600 dark:text-white">Online Consultations, Everywhere</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink/60 dark:text-white/60">
                <MapPin className="h-4 w-4 text-gold-500" />
                Based in {SITE.address}
              </p>
              <div className="mt-6 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-royal-gradient text-center">
                <div className="relative px-8">
                  <Globe className="mx-auto h-10 w-10 text-gold-400" />
                  <p className="mt-4 font-heading text-lg font-semibold text-white">
                    Online Consultation Available Across India &amp; Worldwide
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    Connect by call or video from anywhere — same trusted guidance, wherever you are.
                  </p>
                </div>
              </div>

              <div className="mt-8 card p-5">
                <h3 className="font-heading text-sm font-semibold text-royal-600 dark:text-white">Quick Contact</h3>
                <div className="mt-3 space-y-2.5 text-sm">
                  <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-ink/70 hover:text-royal-600 dark:text-white/70">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" /> {SITE.phoneDisplay}
                  </a>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-ink/70 hover:text-royal-600 dark:text-white/70">
                    <Mail className="h-4 w-4 text-gold-500" /> {SITE.email}
                  </a>
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-ink/70 hover:text-royal-600 dark:text-white/70">
                    <Instagram className="h-4 w-4 text-gold-500" /> {SITE.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
