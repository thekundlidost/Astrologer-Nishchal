import AnimatedCounter from "./AnimatedCounter";
import { TRUST_STATS } from "@/lib/constants";

const DEFAULT_STATS = [
  { value: TRUST_STATS.consultations, label: "Consultations Completed" },
  { value: `${TRUST_STATS.rating}★`, label: "Average Rating" },
  { value: TRUST_STATS.experiences, label: "Positive Experiences" },
  { value: TRUST_STATS.confidential, label: "Confidential" },
];

// Review-focused stat strip for the Reviews & Success Stories page.
const REVIEW_STATS = [
  { value: `${TRUST_STATS.rating}★`, label: "Average Rating" },
  { value: TRUST_STATS.consultations, label: "Consultations Completed" },
  { value: TRUST_STATS.verifiedReviews, label: "Verified Client Reviews" },
  { value: TRUST_STATS.reach, label: "Clients Worldwide" },
];

export default function StatsRow({ variant = "default" }: { variant?: "default" | "reviews" }) {
  const stats = variant === "reviews" ? REVIEW_STATS : DEFAULT_STATS;
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <AnimatedCounter
            value={stat.value}
            className="block font-heading text-3xl font-bold text-gold-400 sm:text-4xl"
          />
          <p className="mt-1 text-xs uppercase tracking-wide text-white/60 sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
