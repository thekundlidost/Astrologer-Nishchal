interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-3 font-heading text-3xl font-bold sm:text-4xl ${
          light ? "text-white" : "text-royal-600 dark:text-white"
        }`}
      >
        {title}
      </h2>
      <div className={`gold-divider mt-4 ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/70" : "text-ink/65 dark:text-white/70"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
