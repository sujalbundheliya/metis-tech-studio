"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A woven lattice of dots. Sweep the cursor through it and the weave tears open
 * along the direction you moved; stop, and it knits itself back together.
 *
 * The metaphor is the section it sits behind: a surface that looks continuous
 * until something passes through it and shows you where the gaps are.
 *
 * ON TOUCH the sweep is driven by scrolling rather than by a cursor. The
 * pointer listener alone left this canvas completely inert on a phone:
 * `pointermove` on `window` only fires while a finger is down, and the browser
 * cancels the stream the moment that movement is recognised as a scroll — so
 * the one gesture a phone actually performs here is also the one that
 * guarantees the effect never runs. Rather than ship a dead interaction, the
 * disturbance follows the middle of the viewport as it travels down the
 * section: the weave tears where you are reading, and knits closed behind you.
 */
export function FabricField({
  className,
  dark = true,
  spacing = 26,
}: {
  className?: string;
  dark?: boolean;
  spacing?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* `hover: none` rather than a width test: what matters is whether a
       pointer can hover this surface, not how wide the screen is. */
    const coarse = window.matchMedia("(hover: none)").matches;

    const BASE = dark ? [132, 179, 206] : [22, 88, 123];
    const HOT = [40, 199, 232];   // aurora — the same on either surface
    const WARM = [232, 143, 53];

    // A fingertip covers far more than a cursor hotspot, and the scroll-driven
    // sweep has to read at arm's length rather than under a precise pointer.
    const RADIUS = coarse ? 168 : 118;      // cursor influence
    const STRENGTH = 30;     // how far dots are shoved
    const SPRING = 0.075;
    const DAMPING = 0.86;

    type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

    let w = 0, h = 0, raf = 0, cols = 0, rows = 0;
    let settled = false;
    let dots: Dot[] = [];
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, vx: 0, vy: 0, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / spacing) + 1;
      rows = Math.ceil(h / spacing) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const step = () => {
      // cursor travel direction — the tear follows the sweep, not just the point
      pointer.vx = pointer.x - pointer.px;
      pointer.vy = pointer.y - pointer.py;
      pointer.px = pointer.x;
      pointer.py = pointer.y;
      const speed = Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 26);

      let moving = 0;
      for (const d of dots) {
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS && dist > 0.01) {
            const falloff = (1 - dist / RADIUS) ** 2;
            // radial shove …
            d.vx += (dx / dist) * falloff * STRENGTH * 0.12;
            d.vy += (dy / dist) * falloff * STRENGTH * 0.12;
            // … plus a drag along the direction of travel
            d.vx += pointer.vx * falloff * 0.16 * speed;
            d.vy += pointer.vy * falloff * 0.16 * speed;
          }
        }
        d.vx += (d.hx - d.x) * SPRING;
        d.vy += (d.hy - d.y) * SPRING;
        d.vx *= DAMPING;
        d.vy *= DAMPING;
        d.x += d.vx;
        d.y += d.vy;

        // still settling?
        if (Math.abs(d.x - d.hx) > 0.06 || Math.abs(d.y - d.hy) > 0.06) moving++;
      }

      /* The weave is a static image once everything has sprung home. Redrawing
         an unchanging picture 60×/s was the bulk of this canvas's scroll cost,
         so draw one final settled frame and then idle until the pointer
         returns. */
      const active = pointer.active || moving > 0;
      if (active || !settled) {
        draw();
        settled = !active;
      }
      raf = requestAnimationFrame(step);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // horizontal weave threads, bending with the displaced dots
      // all threads share a colour, so they can be one path and one stroke()
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = `rgba(${BASE[0]},${BASE[1]},${BASE[2]},${dark ? 0.1 : 0.14})`;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const d = dots[r * cols + c];
          if (c === 0) ctx.moveTo(d.x, d.y);
          else ctx.lineTo(d.x, d.y);
        }
      }
      ctx.stroke();

      // resting dots: one path, one fill
      ctx.fillStyle = `rgba(${BASE[0]},${BASE[1]},${BASE[2]},${dark ? 0.3 : 0.34})`;
      ctx.beginPath();
      for (const d of dots) {
        if (Math.hypot(d.x - d.hx, d.y - d.hy) / 34 >= 0.02) continue;
        ctx.moveTo(d.x + 1, d.y);
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
      }
      ctx.fill();

      // displaced dots still need individual colours
      for (const d of dots) {
        const disp = Math.hypot(d.x - d.hx, d.y - d.hy);
        const t = Math.min(1, disp / 34);
        if (t < 0.02) continue;
        // displaced dots heat up: base → aurora → ember at the extremes
        const c = t > 0.72
          ? WARM
          : [
              BASE[0] + (HOT[0] - BASE[0]) * t,
              BASE[1] + (HOT[1] - BASE[1]) * t,
              BASE[2] + (HOT[2] - BASE[2]) * t,
            ];
        ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${0.3 + t * 0.6})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1 + t * 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      if (!pointer.active) { pointer.px = pointer.x; pointer.py = pointer.y; }
      pointer.active = true;
      settled = false;
    };
    const onLeave = () => { pointer.active = false; pointer.x = -9999; pointer.y = -9999; };

    /* --- touch: the sweep rides the scroll ------------------------------- */
    let idle = 0;
    const onScroll = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // The disturbance sits where the viewport's middle crosses the canvas,
      // so it tracks the line the reader is actually looking at.
      pointer.y = window.innerHeight / 2 - rect.top;
      // …drifting sideways as you go, so the tear has a direction instead of
      // running dead straight down the middle.
      pointer.x = w * (0.5 + 0.34 * Math.sin(window.scrollY / 260));
      pointer.active = true;
      settled = false;
      // Let the weave close again once scrolling stops, which also lets the
      // rAF loop idle out exactly as it does when a cursor leaves.
      clearTimeout(idle);
      idle = window.setTimeout(() => { pointer.active = false; }, 360);
    };

    const ro = new ResizeObserver(() => { build(); settled = false; if (reduced) draw(); });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !raf) raf = requestAnimationFrame(step);
      if (!entry.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    io.observe(canvas);

    build();
    if (reduced) {
      draw();
    } else {
      if (coarse) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        // listen on the window so the tear tracks even over the text on top
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);
      }
      raf = requestAnimationFrame(step);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
    };
  }, [dark, spacing]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
