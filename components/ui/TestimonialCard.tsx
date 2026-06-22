import { Star, Quote, BadgeCheck } from "lucide-react";
import { Testimonial } from "@/types";
import { getInitials } from "@/lib/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-gold-400 text-gold-400" : "text-royal-100 dark:text-white/20"}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-royal-100/70 bg-white/80 p-6 shadow-premium backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg dark:border-white/10 dark:bg-white/[0.06]">
      {/* subtle gold glow on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold-400/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <Stars rating={testimonial.rating} />
        <Quote className="h-7 w-7 text-gold-400/60" />
      </div>

      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-ink/75 dark:text-white/80">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-5 flex items-center gap-3 border-t border-royal-100/60 pt-4 dark:border-white/10">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-gradient text-xs font-bold text-gold-300 ring-1 ring-gold-400/40">
          {getInitials(testimonial.name)}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-heading text-sm font-semibold text-royal-600 dark:text-white">
              {testimonial.name}
            </p>
            {testimonial.verified !== false && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-gold-500" aria-label="Verified Client" />
            )}
          </div>
          <p className="truncate text-xs text-ink/50 dark:text-white/50">
            {testimonial.location} · {testimonial.serviceLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
