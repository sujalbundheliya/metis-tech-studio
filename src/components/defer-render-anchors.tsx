"use client";

import { useEffect } from "react";

/**
 * Keeps in-page links accurate across `defer-render` sections.
 *
 * A skipped section is laid out at its placeholder height until it nears the
 * viewport. The hero's "See how we work" smooth-scrolls to #process past four
 * of them; as each came into view mid-scroll and took its real, much taller
 * phone height, the target moved further down and the scroll ended ~2,900px
 * short of it. Rendering every deferred section up to the target before the
 * scroll begins makes the destination the real one.
 *
 * Capture phase, so this runs before Next's <Link> or the browser starts the
 * scroll. Direct loads of a `/#hash` URL don't need it: an instant jump never
 * passes through the sections, so none of them change size on the way.
 */
export function DeferRenderAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element).closest?.('a[href^="#"]')?.getAttribute("href");
      const target = href && href.length > 1 && document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;
      for (const el of document.querySelectorAll<HTMLElement>(".defer-render")) {
        // Before the target, or containing it.
        if (el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) {
          el.style.contentVisibility = "visible";
        }
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
