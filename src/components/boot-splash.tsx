"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { LogoLoader } from "@/components/ui/logo-loader";

const SEEN_KEY = "metis:booted";
const MIN_MS = 620;  // long enough to read as a brand moment, short enough not to annoy
const MAX_MS = 1400; // hard ceiling — the splash must never hold the site up

/**
 * First-visit brand moment.
 *
 * Route changes are instant on this site (static pages, prefetched links), so a
 * route-level loading state would never be seen. This shows the mark once per
 * session, while fonts and the first paint settle, and gets out of the way as
 * soon as the page is ready — or after MAX_MS, whichever comes first.
 *
 * It renders only after mount, so it can never block first paint, and a visitor
 * without JS never sees it at all.
 */
export function BootSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // private mode / blocked storage — treat as seen, never risk a stuck splash
    }
    if (seen) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      return;
    }

    // Deferred by a frame: setting state synchronously inside an effect
    // triggers a cascading render, and one frame is imperceptible here.
    const raf = requestAnimationFrame(() => setShow(true));
    const startedAt = performance.now();
    let closed = false;
    const done = () => {
      if (closed) return;
      closed = true;
      setShow(false);
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    };
    // Wait for the page to actually be ready, but never flash by so fast that
    // the mark can't be read — and never hold things up past MAX_MS.
    const finish = () => {
      const left = Math.max(0, MIN_MS - (performance.now() - startedAt));
      setTimeout(done, left);
    };

    const hardStop = setTimeout(done, MAX_MS);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(finish);
    else finish();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hardStop);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-1000"
        >
          <LogoLoader size={96} label="" />
        </m.div>
      )}
    </AnimatePresence>
  );
}
