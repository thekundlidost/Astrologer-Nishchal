import ZodiacWheel from "./ZodiacWheel";

/**
 * A premium, self-contained astrology visual used in place of a photo.
 * Layered rotating zodiac rings + twinkling stars + the brand monogram,
 * all built from the existing brand palette (royal blue + gold). No external
 * image required — renders crisply at any size and animates subtly.
 */
export default function CelestialEmblem({ className = "" }: { className?: string }) {
  // Deterministic star field (no hydration mismatch).
  const stars = [
    { top: "12%", left: "20%", d: "0s", s: 4 },
    { top: "22%", left: "78%", d: "0.6s", s: 3 },
    { top: "38%", left: "12%", d: "1.2s", s: 5 },
    { top: "68%", left: "82%", d: "0.3s", s: 4 },
    { top: "82%", left: "28%", d: "0.9s", s: 3 },
    { top: "58%", left: "50%", d: "1.5s", s: 3 },
    { top: "30%", left: "60%", d: "0.4s", s: 4 },
    { top: "75%", left: "62%", d: "1.1s", s: 4 },
  ];

  return (
    <div
      className={`relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-3xl bg-royal-gradient ${className}`}
    >
      {/* radial gold glow */}
      <div className="absolute inset-0 bg-celestial-radial" aria-hidden="true" />

      {/* twinkling stars */}
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-gold-300"
          style={{ top: st.top, left: st.left, width: st.s, height: st.s, animationDelay: st.d }}
          aria-hidden="true"
        />
      ))}

      {/* outer slow-spinning ring */}
      <ZodiacWheel spin className="absolute h-[88%] w-[88%] text-gold-400 opacity-70" />
      {/* inner counter-feel ring (smaller, brighter) */}
      <ZodiacWheel className="absolute h-[58%] w-[58%] text-royal-200 opacity-40" />

      {/* central monogram medallion */}
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold-400/40 bg-royal-900/50 backdrop-blur-sm sm:h-32 sm:w-32">
        <div className="absolute inset-1.5 rounded-full border border-gold-400/20" />
        <span className="font-heading text-4xl font-bold text-gold-300 sm:text-5xl">N</span>
      </div>

      {/* base caption */}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur">
        Astrologer Nishchal · The Kundli Dost
      </span>
    </div>
  );
}
