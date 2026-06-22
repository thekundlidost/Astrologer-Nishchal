import Link from "next/link";
import { Instagram, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE, SERVICES, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-royal-700 text-white/75">
      <div className="container-px mx-auto grid max-w-7xl grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <span className="block font-heading text-lg font-semibold text-white">
            {SITE.name}
          </span>
          <span className="mb-4 mt-1 block text-xs uppercase tracking-[0.16em] text-gold-400">
            {SITE.secondaryBrand} · {SITE.handle}
          </span>
          <p className="text-sm leading-relaxed text-white/60">{SITE.trustTagline}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-track="instagram_click"
              data-track-source="footer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-gold-400 hover:text-gold-400"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              data-track="whatsapp_click"
              data-track-source="footer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-gold-400 hover:text-gold-400"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold text-white">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-gold-400">
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold text-white">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-gold-400">About</Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-gold-400">Booking</Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-gold-400">Reviews</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gold-400">Blog</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold-400">Contact</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-gold-400">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:text-gold-400">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-gold-400">Refund Policy</Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-gold-400">Disclaimer</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${SITE.phoneDisplay.replace(/\s/g, "")}`} data-track="call_click" data-track-source="footer" className="hover:text-gold-400">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold-400">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-5 text-xs leading-relaxed text-white/50">
          <p>
            Astrology, Vastu and gemstone guidance are offered for general spiritual and
            self-reflective purposes only and do not replace professional medical, legal or
            financial advice.
          </p>
          <p className="mt-2">
            © {year} {SITE.name} | {SITE.secondaryBrand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
