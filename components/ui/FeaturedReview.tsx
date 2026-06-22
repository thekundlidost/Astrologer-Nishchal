import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";
import { TRUST_STATS } from "@/lib/constants";

export default function FeaturedReview({ testimonial }: { testimonial: Testimonial }) {
  return (
    <section className="section surface-cream">
      <div className="container-px mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-royal-gradient p-8 text-center text-white sm:p-14">
          <Quote className="mx-auto h-10 w-10 text-gold-400" />
          <div className="mt-4 flex justify-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
            ))}
          </div>
          <blockquote className="mx-auto mt-6 max-w-2xl font-heading text-xl font-medium leading-relaxed text-white sm:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-gold-300">
            {testimonial.name}
            <span className="font-normal text-white/60"> · {testimonial.location} · {testimonial.serviceLabel}</span>
          </p>
          <p className="mt-2 text-xs text-white/50">
            Part of a {TRUST_STATS.rating}★ average across thousands of client experiences
          </p>
        </div>
      </div>
    </section>
  );
}
