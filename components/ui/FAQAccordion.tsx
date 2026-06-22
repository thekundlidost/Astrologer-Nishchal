"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Faq } from "@/types";

export default function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="divide-y divide-royal-100/60 rounded-2xl border border-royal-100/60 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-royal-800/60">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="font-heading text-sm font-semibold text-royal-600 dark:text-white sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gold-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              id={`faq-panel-${faq.id}`}
              role="region"
              className={`grid overflow-hidden transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden px-5 pb-4 text-sm leading-relaxed text-ink/65 dark:text-white/65 sm:px-6">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
