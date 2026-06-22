"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/types";
import { getInitials } from "@/lib/testimonials";

export default function ReviewCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;
  const t = testimonials[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-3xl border border-royal-100/70 bg-white/80 p-8 text-center shadow-premium backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] sm:p-12">
        {/* gold ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />

        <Quote className="mx-auto h-9 w-9 text-gold-400" />
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < t.rating ? "fill-gold-400 text-gold-400" : "text-royal-100 dark:text-white/20"}`} />
          ))}
        </div>

        <blockquote
          key={t.id}
          className="animate-fade-in relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/80 dark:text-white/85 sm:text-lg"
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-royal-gradient text-sm font-bold text-gold-300 ring-1 ring-gold-400/40">
            {getInitials(t.name)}
          </span>
          <div className="text-left">
            <p className="font-heading text-sm font-semibold text-royal-600 dark:text-white">{t.name}</p>
            <p className="text-xs text-gold-500">{t.location} · {t.serviceLabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-100 text-royal-600 transition-colors hover:bg-mist dark:border-white/15 dark:text-white dark:hover:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((tt, i) => (
            <button
              key={tt.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold-400" : "w-2 bg-royal-100 dark:bg-white/20"}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-100 text-royal-600 transition-colors hover:bg-mist dark:border-white/15 dark:text-white dark:hover:bg-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
