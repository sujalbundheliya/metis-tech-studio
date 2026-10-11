"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";

/* Set once the first page has hydrated. Module scope so it outlives the
   template, which remounts on every navigation; never set on the server,
   where effects don't run. */
let hydrated = false;

/**
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), which is
 * what lets each route animate in. Deliberately short and subtle — a page
 * transition should feel like the site is responsive, not like it's putting on
 * a show before you can read anything.
 *
 * Not on the first page, though. The entrance used to run on the initial load
 * as well, which meant the server sent every page at `opacity: 0` and nothing
 * — not the header, not the headline — could appear until React had
 * downloaded, hydrated and started the fade. On a mid-range phone that held
 * the first readable frame back by about four seconds. The first page now
 * arrives visible; the fade plays on client-side navigations, where the
 * JavaScript is already running and costs nothing to wait for.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  // Read once per mount: false for the server render and the hydration pass
  // that has to match it, true for every page navigated to afterwards.
  const [enter] = useState(() => hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <m.div
      initial={enter ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
