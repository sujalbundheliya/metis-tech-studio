"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VENICE = [22, 88, 123] as const;
const AURORA = [40, 199, 232] as const;
const EMBER = [232, 143, 53] as const;
const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

type Node = {
  hx: number; hy: number;   // home
  x: number; y: number;     // current
  vx: number; vy: number;   // velocity
  r: number;
  seed: number;
};
type Pulse = { from: number; to: number; t: number; speed: number; warm: boolean };

const SPRING = 0.055;   // pull back toward home
const DAMPING = 0.9;    // velocity decay
/* Default grab radius, in CSS pixels. A cursor hotspot is a point; a fingertip
   contact patch is closer to 40px across, so `nearest()` widens this on coarse
   pointers — at 26px a tap had to land within a node's own dot to catch it,
   which on a phone read as the lattice simply not responding. */
const GRAB_RADIUS = 26;
const GRAB_RADIUS_TOUCH = 46;
const PUSH_RADIUS = 130;

/**
 * The substrate behind the closing call to action.
 *
 * Every node is tethered to a home position by a spring. You can grab one with
 * the pointer and drag it anywhere — its edges stretch with it — and when you
 * let go it snaps back, overshooting slightly before settling. Nodes you merely
 * sweep past are shoved aside and recover on their own.
 */
export function DraggableLattice({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    const grabRadius = coarse ? GRAB_RADIUS_TOUCH : GRAB_RADIUS;

    let w = 0, h = 0, raf = 0, time = 0, linkDist = 150;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    /* Edges are fixed: which nodes are neighbours depends on their home
       positions, not their current ones. Computing this once per resize instead
       of once per frame turns an O(n²) scan into a short list walk. */
    let edges: { i: number; j: number; base: number }[] = [];

    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };
    let dragIndex = -1;
    let hoverIndex = -1;

    /* ---------------------------------------------------------------- build */
    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      if (!w || !h) return;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(130, Math.max(44, (w * h) / 10500)));
      linkDist = Math.min(170, Math.max(110, w / 8.5));

      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { hx: x, hy: y, x, y, vx: 0, vy: 0, r: 1.8 + Math.random() * 2.2, seed: Math.random() * 6.28 };
      });
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].hx - nodes[j].hx, nodes[i].hy - nodes[j].hy);
          if (d <= linkDist) edges.push({ i, j, base: 1 - d / linkDist });
        }
      }

      pulses = Array.from({ length: Math.min(6, Math.floor(count / 10)) }, () => spawn());
    };

    const spawn = (): Pulse => {
      const from = Math.floor(Math.random() * nodes.length);
      let to = from, best = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const d = Math.hypot(nodes[i].hx - nodes[from].hx, nodes[i].hy - nodes[from].hy);
        if (d < best && d < linkDist && Math.random() > 0.5) { best = d; to = i; }
      }
      return { from, to, t: 0, speed: 0.004 + Math.random() * 0.006, warm: Math.random() > 0.8 };
    };

    const nearest = (x: number, y: number) => {
      let idx = -1, best = grabRadius;
      for (let i = 0; i < nodes.length; i++) {
        const d = Math.hypot(nodes[i].x - x, nodes[i].y - y);
        if (d < best) { best = d; idx = i; }
      }
      return idx;
    };

    /* ----------------------------------------------------------------- step */
    const step = () => {
      time += 0.006;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (i === dragIndex) {
          // held: follow the pointer exactly, and record throw velocity
          n.vx = pointer.x - n.x;
          n.vy = pointer.y - n.y;
          n.x = pointer.x;
          n.y = pointer.y;
          continue;
        }

        // shove away from a passing cursor
        if (pointer.active && dragIndex === -1) {
          const dx = n.x - pointer.x, dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_RADIUS && d > 0.01) {
            const force = ((PUSH_RADIUS - d) / PUSH_RADIUS) ** 2 * 2.4;
            n.vx += (dx / d) * force;
            n.vy += (dy / d) * force;
          }
        }

        // a dragged node drags its close neighbours a little
        if (dragIndex >= 0) {
          const d0 = nodes[dragIndex];
          const dx = d0.x - n.x, dy = d0.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist && d > 0.01) {
            const pull = (1 - d / linkDist) * 0.09;
            n.vx += (dx / d) * pull * d * 0.05;
            n.vy += (dy / d) * pull * d * 0.05;
          }
        }

        // spring home + damping
        n.vx += (n.hx - n.x) * SPRING;
        n.vy += (n.hy - n.y) * SPRING;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x += n.vx;
        n.y += n.vy;
      }

      for (let i = 0; i < pulses.length; i++) {
        pulses[i].t += pulses[i].speed;
        if (pulses[i].t >= 1) pulses[i] = spawn();
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    /* ----------------------------------------------------------------- draw */
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // edges — stretch as nodes are pulled apart
      for (const { i, j, base } of edges) {
        const a = nodes[i];
        const b = nodes[j];

        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const slack = Math.min(1, dist / (linkDist * 1.6));

        const involved = i === dragIndex || j === dragIndex;
        ctx.strokeStyle = involved
          ? rgba(AURORA, 0.55 * base + 0.2)
          : rgba(VENICE, base * 0.34 * (1 - slack * 0.5));
        ctx.lineWidth = involved ? 1.1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const held = i === dragIndex;
        const hovered = i === hoverIndex;
        const disp = Math.min(1, Math.hypot(n.x - n.hx, n.y - n.hy) / 90);
        const breathe = 0.85 + Math.sin(time * 2 + n.seed) * 0.15;

        if (held || hovered || disp > 0.06) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, held ? 30 : 18);
          glow.addColorStop(0, rgba(AURORA, held ? 0.34 : 0.16 * Math.max(disp, hovered ? 1 : 0)));
          glow.addColorStop(1, rgba(AURORA, 0));
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, held ? 30 : 18, 0, Math.PI * 2);
          ctx.fill();
        }

        // ghost of where it belongs, while it's away from home
        if (disp > 0.1) {
          ctx.strokeStyle = rgba(VENICE, 0.16 * disp);
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.arc(n.hx, n.hy, 3.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = held
          ? rgba(AURORA, 0.95)
          : hovered
            ? rgba(AURORA, 0.7)
            : rgba(VENICE, 0.34 * breathe + 0.26 + disp * 0.3);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (held ? 2.1 : hovered ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // signal pulses
      for (const p of pulses) {
        const a = nodes[p.from], b = nodes[p.to];
        if (!a || !b || p.from === p.to) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        const c = p.warm ? EMBER : AURORA;

        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, rgba(c, 0.45 * fade));
        g.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = rgba(c, 0.9 * fade);
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* ------------------------------------------------------------- pointers */
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onDown = (e: PointerEvent) => {
      const { x, y } = local(e);
      const idx = nearest(x, y);
      if (idx === -1) return;              // let the page scroll / select as normal
      dragIndex = idx;
      pointer.x = x; pointer.y = y; pointer.active = true;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      const { x, y } = local(e);
      pointer.px = pointer.x; pointer.py = pointer.y;
      pointer.x = x; pointer.y = y;
      pointer.active = true;
      if (dragIndex === -1 && !coarse) {
        hoverIndex = nearest(x, y);
        canvas.style.cursor = hoverIndex === -1 ? "default" : "grab";
      }
    };

    const onUp = (e: PointerEvent) => {
      if (dragIndex !== -1) {
        // hand the node its throw velocity, then let the spring take it home
        const n = nodes[dragIndex];
        n.vx = Math.max(-24, Math.min(24, n.vx));
        n.vy = Math.max(-24, Math.min(24, n.vy));
        dragIndex = -1;
        canvas.releasePointerCapture?.(e.pointerId);
      }
      canvas.style.cursor = "default";
    };

    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999; pointer.y = -9999;
      hoverIndex = -1;
      canvas.style.cursor = "default";
    };

    const ro = new ResizeObserver(() => { build(); if (reduced) draw(); });
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
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
      canvas.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(step);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("h-full w-full touch-pan-y select-none", className)}
    />
  );
}
