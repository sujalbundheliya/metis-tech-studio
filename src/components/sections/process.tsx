"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Label, Opener, TextLink } from "@/components/ui/kit";
import { process } from "@/content/site";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 75%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const width = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" data-nav="dark" className="border-b border-white/10 bg-ink-1000">
      <div className="mx-auto max-w-[1400px] px-gutter pt-16 pb-10 sm:px-10 sm:pt-24 sm:pb-16 lg:px-14 lg:pt-32">
        <Opener
          dark
          label={process.eyebrow}
          title={
            <>
              A clear path from{" "}
              <em className="text-aurora-400 not-italic">problem to product.</em>
            </>
          }
          intro={process.intro}
        />
      </div>

      {/* scroll-driven rule across the top of the phase row */}
      <div className="relative mx-auto max-w-[1400px]">
        <div className="h-px w-full bg-white/12" />
        <m.div
          aria-hidden="true"
          style={{ width: reduced ? "100%" : width }}
          className="absolute top-0 left-0 h-px bg-aurora-500 shadow-[0_0_12px_1px_var(--color-aurora-500)]"
        />
      </div>

      <div ref={trackRef} className="mx-auto grid max-w-[1400px] md:grid-cols-2 lg:grid-cols-4">
        {process.phases.map((phase, i) => (
          <m.div
            key={phase.number}
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0.001 : 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative flex flex-col px-gutter py-8 transition-colors duration-300 hover:bg-white/[0.035] sm:px-8 sm:py-10 lg:px-10 lg:py-14 ${
              i > 0 ? "border-t border-white/10 md:border-t-0 md:border-l" : ""
            } ${i === 2 ? "md:border-t md:border-l-0 lg:border-t-0 lg:border-l" : ""} ${
              i === 3 ? "md:border-t lg:border-t-0" : ""
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="t-editorial text-[44px] leading-none text-aurora-400/85">
                {phase.number}
              </span>
              <Label dark className="text-venice-300/55">
                {phase.duration}
              </Label>
            </div>

            <h3 className="t-h3 mt-7 text-sand-50">{phase.name}</h3>
            <p className="mt-2 t-editorial text-[19px] leading-snug text-aurora-400/85 italic">
              {phase.subtitle}
            </p>
            <p className="t-small mt-5 text-venice-200/70">{phase.body}</p>
          </m.div>
        ))}
      </div>

      <div className="mx-auto max-w-[1400px] border-t border-white/10 px-gutter py-7 sm:px-10 sm:py-8 lg:px-14">
        <TextLink href="/how-we-work" dark>
          {process.cta}
        </TextLink>
      </div>
    </section>
  );
}
