"use client";

import { m, useReducedMotion } from "motion/react";

/**
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), which is
 * what lets each route animate in. Deliberately short and subtle — a page
 * transition should feel like the site is responsive, not like it's putting on
 * a show before you can read anything.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
