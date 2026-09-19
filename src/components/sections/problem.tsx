"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FabricField } from "@/components/ui/fabric-field";
import { Label } from "@/components/ui/kit";
import { problem } from "@/content/site";

/**
 * The gaps, rebuilt. No boxes: two columns of statements separated by a live
 * seam, sitting on a woven field that tears where the cursor passes and knits
 * itself back together behind it.
 */
export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const seamScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <section
      id="problem"
      data-nav="dark"
      ref={ref}
      className="relative overflow-hidden border-b border-white/10 bg-ink-1000"
    >
      {/* the weave */}
      <div className="absolute inset-0">
        <FabricField dark spacing={26} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,var(--color-venice-800),transparent_72%)] opacity-55"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="h-px w-full bg-white/22" />
            <Label dark className="mt-4 block">
              The gap problem
            </Label>
          </div>
          <div className="lg:col-span-9">
            <h2 className="t-h2 max-w-3xl text-balance text-sand-50">
              Most software projects fail in{" "}
              <em className="text-aurora-400 not-italic">the gaps.</em>
            </h2>
          </div>
        </div>

        {/* the three gaps */}
        <div className="mt-16 lg:mt-20">
          {problem.gaps.map((gap, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: reduced ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: reduced ? 0.001 : 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group grid items-center border-t border-white/18 py-8 last:border-b md:grid-cols-[1fr_auto_1fr] md:gap-6 md:py-10"
            >
              <p className="t-h3 text-venice-200/85 transition-colors duration-300 group-hover:text-sand-50">
                {gap.left}
              </p>

              {/* the seam */}
              <div className="relative my-5 flex h-6 items-center justify-center md:my-0 md:h-full md:w-28">
                <span className="absolute inset-x-0 h-px bg-[repeating-linear-gradient(to_right,rgba(232,143,53,0.75)_0_5px,transparent_5px_11px)] transition-opacity duration-300 group-hover:opacity-100 md:inset-x-0 md:opacity-60" />
                <span className="relative h-2 w-2 rotate-45 bg-ember-500 shadow-[0_0_18px_3px_rgba(232,143,53,0.55)] transition-transform duration-500 group-hover:scale-[1.7]" />
              </div>

              <p className="t-h3 text-venice-200/85 transition-colors duration-300 group-hover:text-sand-50 md:text-right">
                {gap.right}
              </p>
            </m.div>
          ))}
        </div>

        {/* resolution: the seam closes */}
        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <m.div
              className="h-px w-full origin-left bg-gradient-to-r from-aurora-500 to-aurora-500/0"
              style={reduced ? undefined : { scaleX: seamScale }}
            />
          </div>
          <p className="t-lead max-w-2xl text-venice-200/78 lg:col-span-9">{problem.body}</p>
        </div>
      </div>
    </section>
  );
}
