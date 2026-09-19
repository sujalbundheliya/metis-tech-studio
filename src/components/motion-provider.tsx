"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Loads only Motion's DOM animation features instead of the full bundle.
 *
 * Every animated component uses `m.*` rather than `motion.*`; `strict` makes a
 * stray `motion.*` throw in development so the saving can't silently regress.
 * Hooks (useScroll, useSpring, useTransform) are unaffected by this split.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
