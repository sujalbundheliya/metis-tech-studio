"use client";

import { m, useReducedMotion } from "motion/react";
import { MARK_PATH, MARK_VIEWBOX } from "./mark-path";
import { cn } from "@/lib/utils";

/**
 * The loading moment: the M draws itself, fills with the brand gradient, and
 * breathes. Nothing else on the site is asked to carry the brand this hard, so
 * it uses the real traced mark rather than a spinner.
 */
export function LogoLoader({
  size = 84,
  label = "Loading",
  className,
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center gap-5", className)}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* glow behind the mark */}
        <m.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-brand-blue) 0%, var(--color-brand-violet) 45%, transparent 70%)",
          }}
          animate={reduced ? { opacity: 0.3 } : { opacity: [0.18, 0.42, 0.18], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg viewBox={MARK_VIEWBOX} fill="none" className="relative h-full w-full overflow-visible">
          <defs>
            <linearGradient id="metis-loader-grad" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-brand-blue)" />
              <stop offset="1" stopColor="var(--color-brand-violet)" />
            </linearGradient>
          </defs>

          {/* the outline draws itself */}
          <m.path
            d={MARK_PATH}
            stroke="url(#metis-loader-grad)"
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 0 : 1 }}
            animate={reduced ? { pathLength: 1, opacity: 0 } : { pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{
              duration: 2.2,
              times: [0, 0.55, 1],
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* then the fill arrives behind it */}
          <m.path
            d={MARK_PATH}
            fill="url(#metis-loader-grad)"
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
            transition={{
              duration: 2.2,
              times: [0, 0.45, 0.72, 0.88, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      <span className="t-label text-venice-300/45">{label}</span>
    </div>
  );
}
