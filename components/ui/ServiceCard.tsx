import Link from "next/link";
import { Sparkles, ScrollText, Layers, Hash, Gem, ArrowRight, MessageCircle, LucideIcon } from "lucide-react";
import { Service } from "@/types";
import { formatPrice, whatsappLink } from "@/lib/constants";

const ICONS: Record<Service["icon"], LucideIcon> = {
  Sparkles,
  ScrollText,
  Layers,
  Hash,
  Gem,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];
  const waMessage = `Hello Astrologer Nishchal, I'm interested in the ${service.title} (${formatPrice(service.price)}). Could you share more details?`;

  return (
    <div className="card card-hover group flex h-full flex-col p-7">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-royal-500 dark:bg-white/10 dark:text-gold-400">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-gold-50 px-3 py-1 text-sm font-bold text-gold-600 dark:bg-gold-400/15 dark:text-gold-300">
          {formatPrice(service.price)}
        </span>
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold text-royal-600 dark:text-white">
        {service.title}
      </h3>
      <p className="mt-2 text-sm font-medium text-gold-500">{service.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/65 dark:text-white/65">{service.summary}</p>

      <ul className="mt-4 flex-1 space-y-2">
        {service.benefits.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-ink/60 dark:text-white/60">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2">
        <Link href={`/booking?service=${service.slug}`} className="btn-primary w-full">
          Book Now
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/services/${service.slug}`}
            data-track="service_view"
            data-track-source={service.slug}
            className="flex flex-1 items-center justify-center rounded-full border border-royal-100 py-2.5 text-xs font-semibold text-royal-600 hover:bg-mist dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            Details
          </Link>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask about ${service.title} on WhatsApp`}
            data-track="whatsapp_click"
            data-track-source="service_card"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#25D366]/40 py-2.5 text-xs font-semibold text-[#1ebe5a] hover:bg-[#25D366]/10"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
