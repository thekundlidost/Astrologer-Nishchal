import { MapPin } from "lucide-react";
import { CLIENT_CITIES } from "@/lib/constants";

/**
 * Honest social-proof: communicates geographic reach without fabricating a
 * live "X booked 2 minutes ago" ticker (which would imply real-time data we
 * don't have). States a true general fact and lists cities clients come from.
 */
export default function RecentActivity() {
  return (
    <section className="section surface-muted">
      <div className="container-px mx-auto max-w-5xl text-center">
        <p className="eyebrow">Trusted Across Borders</p>
        <h2 className="mt-3 font-heading text-2xl font-bold text-royal-600 dark:text-white sm:text-3xl">
          Clients Book Consultations From Across India &amp; Abroad
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/65 dark:text-white/65">
          From metros to small towns, and from NRI clients across the globe — people regularly
          reach out for guidance on career, marriage, finance and life decisions.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {CLIENT_CITIES.map((city) => (
            <span
              key={city}
              className="inline-flex items-center gap-1.5 rounded-full border border-royal-100 bg-white px-3.5 py-1.5 text-xs font-medium text-ink/70 dark:border-white/10 dark:bg-royal-800/60 dark:text-white/70"
            >
              <MapPin className="h-3 w-3 text-gold-400" />
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
