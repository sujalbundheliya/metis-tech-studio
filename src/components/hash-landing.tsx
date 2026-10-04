"use client";

import { useEffect } from "react";

/**
 * Lands a redirected visitor on the section their old link was about.
 *
 * Retired service URLs 308 to a section of a practice page — e.g.
 * `/services/document-processing` → `/services/generative-ai-rag#intelligent-document-processing`
 * (see next.config.ts). Chrome keeps the fragment from the redirect's
 * `Location` and even matches `:target`, but was observed not to scroll to it,
 * so someone following an old search result landed on the hero instead.
 *
 * Only steps in when the page is still at the top: on a direct `#hash` load
 * the browser has already begun its own scroll, and this must not fight it.
 */
export function HashLanding() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => {
      if (window.scrollY > 0) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return null;
}
