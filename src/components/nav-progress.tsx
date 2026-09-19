"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Only show the bar if navigation is genuinely slow.
 *
 * Measured navigation on this site is 136–323ms, so a lower threshold would
 * make the bar flash on nearly every click — which is exactly the "feels like
 * it's always loading" effect we're trying to avoid. At 400ms it stays silent
 * on a healthy connection and only speaks up when there's really a wait.
 */
const SHOW_AFTER_MS = 400;

/**
 * Top-edge navigation progress, in the brand gradient.
 *
 * Deliberately does nothing on a fast hop: pages here are static and prefetched
 * and land in ~150–300ms, so on a good connection this never appears. It exists
 * for the cases that are genuinely slow — poor mobile signal, cold cache, a link
 * clicked before prefetch finished.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settled = useRef<ReturnType<typeof setTimeout> | null>(null);

  // arm on any click that will cause a same-origin navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("/") || link.target === "_blank") return;
      if (href.split("#")[0] === pathname) return; // same page, or a hash jump

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("running"), SHOW_AFTER_MS);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  // the route changed — finish
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    // Deferred a frame: a synchronous setState here would cascade a re-render.
    const raf = requestAnimationFrame(() =>
      setState((s) => (s === "running" ? "done" : "idle")),
    );
    if (settled.current) clearTimeout(settled.current);
    settled.current = setTimeout(() => setState("idle"), 420);
    return () => {
      cancelAnimationFrame(raf);
      if (settled.current) clearTimeout(settled.current);
    };
  }, [pathname]);

  if (state === "idle") return null;

  return (
    <div
      aria-hidden="true"
      data-nav-progress=""
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] overflow-hidden"
    >
      <div
        className={
          state === "done"
            ? "h-full w-full origin-left bg-gradient-brand shadow-[0_0_10px_2px_rgba(90,110,255,0.55)] transition-[transform,opacity] duration-300 ease-out"
            : "h-full w-full origin-left bg-gradient-brand shadow-[0_0_10px_2px_rgba(90,110,255,0.55)]"
        }
        style={
          state === "done"
            ? { transform: "scaleX(1)", opacity: 0 }
            : { animation: "nav-progress 2.4s cubic-bezier(0.16,1,0.3,1) forwards" }
        }
      />
    </div>
  );
}
