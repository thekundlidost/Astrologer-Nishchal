import { Star, Sparkles, ShieldCheck, Video, Lock, Zap, Users, LucideIcon } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Star,
  Sparkles,
  ShieldCheck,
  Video,
  Lock,
  Zap,
  Users,
};

// Compact inline trust badge strip (used under hero CTAs and in sections).
export default function TrustBadges({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {TRUST_BADGES.map((badge) => {
        const Icon = ICONS[badge.icon];
        return (
          <span
            key={badge.label}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              light
                ? "bg-white/10 text-white backdrop-blur"
                : "bg-mist text-royal-600 dark:bg-white/10 dark:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5 text-gold-400" />
            {badge.label}
          </span>
        );
      })}
    </div>
  );
}

// Larger icon-card grid version for "Why Choose" style sections.
const WHY_CARDS = [
  { icon: Sparkles, label: "Personalized Analysis", desc: "Every reading is built around your actual chart and your actual question." },
  { icon: ShieldCheck, label: "Confidential Guidance", desc: "Your details and conversations stay strictly private — always." },
  { icon: Video, label: "Online Convenience", desc: "Consult from anywhere by call or video, India or abroad." },
  { icon: Star, label: "Trusted by Thousands", desc: "A 4.94★ average across thousands of positive client experiences." },
];

export function WhyChooseGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {WHY_CARDS.map(({ icon: Icon, label, desc }) => (
        <div key={label} className="card card-hover p-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mist text-royal-500 dark:bg-white/10 dark:text-gold-400">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-4 font-heading text-base font-semibold text-royal-600 dark:text-white">{label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-white/60">{desc}</p>
        </div>
      ))}
    </div>
  );
}
