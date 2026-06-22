import Link from "next/link";
import ZodiacWheel from "./ZodiacWheel";

interface CtaLink {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "whatsapp";
}

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctas?: CtaLink[];
  trustIndicators?: string[];
  compact?: boolean;
}

export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctas,
  trustIndicators,
  compact = false,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-royal-gradient text-white">
      <div className="absolute inset-0 bg-celestial-radial" aria-hidden="true" />
      <ZodiacWheel
        spin
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-gold-400 opacity-50 sm:h-[520px] sm:w-[520px]"
      />
      <ZodiacWheel className="pointer-events-none absolute -bottom-32 -left-20 h-[300px] w-[300px] text-royal-300 opacity-25" />

      <div
        className={`container-px relative mx-auto max-w-7xl ${
          compact ? "py-16 sm:py-20" : "py-20 sm:py-28 lg:py-32"
        }`}
      >
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow text-gold-400">{eyebrow}</p>
          <h1
            className={`mt-4 font-heading font-bold leading-[1.1] text-white ${
              compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {subtitle}
          </p>

          {ctas && ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {ctas.map((cta) => {
                const cls =
                  cta.variant === "secondary"
                    ? "btn-secondary"
                    : cta.variant === "whatsapp"
                      ? "btn-whatsapp"
                      : "btn-primary";
                return cta.href.startsWith("http") ? (
                  <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {cta.label}
                  </a>
                ) : (
                  <Link key={cta.label} href={cta.href} className={cls}>
                    {cta.label}
                  </Link>
                );
              })}
            </div>
          )}

          {trustIndicators && trustIndicators.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {trustIndicators.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
