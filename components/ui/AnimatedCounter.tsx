"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string; // e.g. "50,000+", "4.94", "100%", "Thousands+"
  className?: string;
  durationMs?: number;
}

/**
 * Counts up to a numeric target parsed from `value`, preserving any prefix/suffix
 * (commas, +, %, ★). Non-numeric values (e.g. "Thousands+") render as-is.
 * Animation only runs once, when the element scrolls into view.
 */
export default function AnimatedCounter({
  value,
  className = "",
  durationMs = 1600,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);
  const started = useRef(false);

  // Parse "50,000+" -> { target: 50000, decimals: 0, suffix: "+", prefix: "" }
  const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(\D*)$/);
  const hasNumber = match !== null;

  useEffect(() => {
    if (!hasNumber || !ref.current) {
      setDisplay(value);
      return;
    }

    const prefix = match![1] ?? "";
    const numStr = match![2].replace(/,/g, "");
    const suffix = match![3] ?? "";
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const withCommas = Number(fixed).toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      return `${prefix}${withCommas}${suffix}`;
    };

    // Show start state immediately.
    setDisplay(prefersReduced ? format(target) : format(0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            if (prefersReduced) {
              setDisplay(format(target));
              return;
            }
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / durationMs, 1);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(format(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplay(format(target));
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
