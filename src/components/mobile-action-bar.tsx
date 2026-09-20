"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { placeholders } from "@/content/site";
import { useMounted } from "@/lib/use-mounted";

/**
 * The phone's standing call to action.
 *
 * On desktop the "Book a call" block is pinned to the header and never leaves
 * the screen. Below `sm` that block is hidden, which left a phone visitor with
 * no way to act without first opening the menu — the one surface where the
 * whole site's conversion path disappeared at exactly the width most visitors
 * arrive on.
 *
 * This is not the desktop CTA shrunk down. It is the pattern a phone actually
 * uses: pinned to the thumb, out of the way while you read the hero, and
 * standing down entirely once you reach the closing section, so the page never
 * shows two competing versions of the same action.
 */
export function MobileActionBar() {
  const mounted = useMounted();
  const [past, setPast] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const reduced = useReducedMotion();
  const raf = useRef(0);

  /* Show once the hero is behind you. Reading the scroll position inside rAF
     keeps this off the scroll handler's critical path — the site fought hard
     for 60fps and a layout read per scroll event would hand some of it back. */
  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        setPast(window.scrollY > 520);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  /* Stand down over the closing CTA and the footer — both already carry the
     same action, and stacking a third copy over them reads as a banner. */
  useEffect(() => {
    const targets = [document.getElementById("contact"), document.querySelector("footer")].filter(
      Boolean,
    ) as Element[];
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        // Any of the watched regions on screen is enough to retire the bar.
        setAtContact((prev) => {
          const hit = entries.some((e) => e.isIntersecting);
          const miss = entries.every((e) => !e.isIntersecting);
          return hit ? true : miss ? false : prev;
        });
      },
      { threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const visible = past && !atContact;

  const bar = (
    <AnimatePresence>
      {visible && (
        <m.div
          key="action-bar"
          initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
          transition={{ duration: reduced ? 0.001 : 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-white/12 bg-ink-1000/92 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-stretch gap-px px-safe pb-safe">
            <Link
              href={placeholders.bookingUrl}
              className="flex min-h-14 flex-1 items-center justify-center gap-2 bg-sand-100 text-[16px] font-medium text-ink-1000 transition-colors active:bg-white"
            >
              Book a call
              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </Link>
            <a
              href={`mailto:${placeholders.email}`}
              aria-label={`Email ${placeholders.email}`}
              className="flex min-h-14 w-16 shrink-0 items-center justify-center border-l border-white/12 text-venice-200 transition-colors active:bg-white/[0.08]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" stroke="currentColor" strokeWidth="1.6" />
                <path d="m3 6 9 6.5L21 6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  /* Portalled for the same reason the menu sheet is: any ancestor with a
     transform or a backdrop-filter would capture `position: fixed` and drop
     the bar into the middle of the page. */
  return mounted ? createPortal(bar, document.body) : null;
}
