interface ZodiacWheelProps {
  className?: string;
  spin?: boolean;
}

/**
 * The site's signature visual element: a 12-spoke celestial wheel referencing
 * the 12 houses of a birth chart. Used sparingly — as an ambient hero backdrop
 * and as a section divider — rather than literal photography.
 */
export default function ZodiacWheel({ className = "", spin = false }: ZodiacWheelProps) {
  const center = 100;
  const outerR = 92;
  const innerR = 60;

  const spokes = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x2 = center + outerR * Math.cos(angle);
    const y2 = center + outerR * Math.sin(angle);
    return { x1: center, y1: center, x2, y2 };
  });

  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    return {
      cx: center + outerR * Math.cos(angle),
      cy: center + outerR * Math.sin(angle),
    };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={`${spin ? "animate-slow-spin" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx={center} cy={center} r={outerR} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <circle cx={center} cy={center} r={innerR} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.3"
        />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="2" fill="currentColor" opacity="0.7" />
      ))}
      <circle cx={center} cy={center} r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
