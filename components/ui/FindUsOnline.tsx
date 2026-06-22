import { Globe, MessageCircle, Instagram, MapPin } from "lucide-react";
import { SITE, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

/**
 * "Find Astrologer Nishchal Online" — consolidates every place a client can
 * find the brand, and is ready for a Google Business Profile link once the
 * profile is verified. Set NEXT_PUBLIC_GOOGLE_BUSINESS_URL to activate that card.
 */
const GOOGLE_BUSINESS_URL = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || "";

export default function FindUsOnline() {
  const channels = [
    {
      icon: Globe,
      label: "Website",
      value: "thekundlidost.com",
      href: SITE.url,
      track: undefined as string | undefined,
      ready: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: SITE.phoneDisplay,
      href: whatsappLink(DEFAULT_WHATSAPP_MESSAGE),
      track: "whatsapp_click",
      ready: true,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: SITE.instagramHandle,
      href: SITE.instagramUrl,
      track: "instagram_click",
      ready: true,
    },
    {
      icon: MapPin,
      label: "Google Business Profile",
      value: GOOGLE_BUSINESS_URL ? "View on Google" : "Coming soon",
      href: GOOGLE_BUSINESS_URL || undefined,
      track: undefined,
      ready: Boolean(GOOGLE_BUSINESS_URL),
    },
  ];

  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Stay Connected"
          title="Find Astrologer Nishchal Online"
          subtitle="One trusted brand across every channel. Verified and consistent, wherever you find us."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {channels.map(({ icon: Icon, label, value, href, track, ready }) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-royal-500 dark:bg-white/10 dark:text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-sm font-semibold text-royal-600 dark:text-white">
                  {label}
                </h3>
                <p className="mt-1 text-xs text-ink/55 dark:text-white/55">{value}</p>
                {!ready && (
                  <span className="mt-2 inline-block rounded-full bg-gold-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-600 dark:bg-gold-400/15 dark:text-gold-300">
                    Verification pending
                  </span>
                )}
              </>
            );
            const cls =
              "card card-hover flex flex-col items-center p-6 text-center";
            return ready && href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-track={track}
                data-track-source="find_us_online"
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <div key={label} className={`${cls} opacity-90`}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
