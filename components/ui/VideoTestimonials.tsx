import { Play } from "lucide-react";
import SectionHeading from "./SectionHeading";

/**
 * Placeholder slots for client video testimonials.
 * To go live: replace each placeholder tile with a real embed
 * (YouTube/Instagram Reel iframe or a <video> element) and the poster image.
 */
const SLOTS = [
  { id: "v1", label: "Career guidance success story" },
  { id: "v2", label: "Marriage consultation experience" },
  { id: "v3", label: "Kundli report feedback" },
];

export default function VideoTestimonials() {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="In Their Words"
          title="Video Testimonials"
          subtitle="Real clients sharing their experience. Video stories coming soon — follow on Instagram for the latest."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SLOTS.map((slot) => (
            <div
              key={slot.id}
              className="group relative flex aspect-[9/12] items-center justify-center overflow-hidden rounded-2xl border border-royal-100 bg-royal-gradient sm:aspect-video dark:border-white/10"
            >
              <div className="absolute inset-0 bg-royal-950/30" />
              <div className="relative flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 translate-x-0.5 fill-white" />
                </span>
                <p className="mt-4 max-w-[80%] text-xs font-medium text-white/80">{slot.label}</p>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-gold-300">
                  Coming soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
