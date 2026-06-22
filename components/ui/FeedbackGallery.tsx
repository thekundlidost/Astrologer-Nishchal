"use client";

import { useState } from "react";
import { X, ImageIcon, MessageCircle } from "lucide-react";
import { FeedbackScreenshot } from "@/types";
import { SOURCE_LABELS } from "@/lib/feedback";

export default function FeedbackGallery({ items }: { items: FeedbackScreenshot[] }) {
  const [active, setActive] = useState<FeedbackScreenshot | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const hasImage = Boolean(item.src);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => hasImage && setActive(item)}
              className={`group relative aspect-[3/4] overflow-hidden rounded-xl border border-royal-100 dark:border-white/10 ${
                hasImage ? "cursor-zoom-in" : "cursor-default"
              }`}
            >
              {hasImage ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                // Styled placeholder until a real screenshot is added.
                <div className="flex h-full w-full flex-col items-center justify-center bg-mist p-3 text-center dark:bg-royal-800/60">
                  {item.source === "whatsapp" ? (
                    <MessageCircle className="h-7 w-7 text-[#25D366]" />
                  ) : (
                    <ImageIcon className="h-7 w-7 text-royal-300 dark:text-white/30" />
                  )}
                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-ink/45 dark:text-white/40">
                    {SOURCE_LABELS[item.source]}
                  </span>
                  <span className="mt-1 text-[10px] text-ink/35 dark:text-white/30">
                    Screenshot slot
                  </span>
                </div>
              )}
              <span className="absolute left-2 top-2 rounded-full bg-royal-950/70 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                {SOURCE_LABELS[item.source]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 bg-royal-950/85 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative max-h-[90vh] max-w-2xl">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[90vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
