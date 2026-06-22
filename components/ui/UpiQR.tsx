"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a UPI payment QR **dynamically** from the exact `value` string passed in
 * (the same string used for the "Pay on this device" deep link). Because the QR
 * and the deep link are generated from one source, the QR, the displayed amount
 * and the UPI request can never drift apart.
 *
 * Uses the well-tested `qrcode` package (added to dependencies). It renders to a
 * canvas at high resolution for crisp scanning on any device.
 */
export default function UpiQR({
  value,
  size = 220,
  className = "",
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        // Dynamic import keeps this out of the initial bundle.
        const QRCode = (await import("qrcode")).default;
        if (cancelled || !canvasRef.current) return;
        await QRCode.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 2,
          errorCorrectionLevel: "M",
          color: { dark: "#0A1130", light: "#FFFFFF" },
        });
        setError(false);
      } catch {
        if (!cancelled) setError(true);
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-lg bg-mist p-4 text-center dark:bg-royal-900/60"
        style={{ width: size, height: size }}
      >
        <span className="text-xs text-ink/50 dark:text-white/50">
          QR unavailable — use the “Pay on this device” button below.
        </span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      aria-label="UPI payment QR code with amount pre-filled"
      role="img"
    />
  );
}
