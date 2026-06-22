"use client";

import { useState } from "react";
import { Testimonial, ReviewCategory } from "@/types";
import TestimonialsGrid from "@/components/ui/TestimonialsGrid";

const FILTERS: { value: ReviewCategory | "all"; label: string }[] = [
  { value: "all", label: "All Reviews" },
  { value: "marriage", label: "Marriage" },
  { value: "career", label: "Career" },
  { value: "finance", label: "Finance" },
  { value: "relationship", label: "Relationship" },
  { value: "general", label: "General Guidance" },
];

export default function ReviewsFilter({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState<ReviewCategory | "all">("all");
  const filtered = active === "all" ? testimonials : testimonials.filter((t) => t.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === f.value
                ? "bg-gold-400 text-royal-900"
                : "border border-royal-100 text-ink/65 hover:bg-mist dark:border-white/15 dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <TestimonialsGrid testimonials={filtered} />
      ) : (
        <p className="text-center text-sm text-ink/50 dark:text-white/50">No reviews in this category yet.</p>
      )}
    </div>
  );
}
