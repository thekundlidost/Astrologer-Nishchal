import { Clock, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { AVAILABILITY } from "@/lib/constants";

export default function Availability() {
  return (
    <section className="section surface-muted">
      <div className="container-px mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Availability</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-royal-600 dark:text-white sm:text-4xl">
            Book a Slot That Suits You
          </h2>
          <div className="gold-divider mt-4" />
          <p className="mt-4 text-base leading-relaxed text-ink/65 dark:text-white/65">
            {AVAILABILITY.note}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink/55 dark:text-white/55">
            <Clock className="h-4 w-4 text-gold-400" />
            All times in {AVAILABILITY.timezone}
          </p>
          <Link href="/booking" className="btn-primary mt-7 inline-flex">
            <CalendarCheck className="h-4 w-4" />
            Check Availability &amp; Book
          </Link>
        </div>

        <div className="card p-6 sm:p-8">
          <h3 className="font-heading text-base font-semibold text-royal-600 dark:text-white">
            Weekly Consultation Hours
          </h3>
          <ul className="mt-4 divide-y divide-royal-100/70 dark:divide-white/10">
            {AVAILABILITY.schedule.map((row) => (
              <li key={row.day} className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium text-ink/75 dark:text-white/75">{row.day}</span>
                <span className="text-ink/55 dark:text-white/55">{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
