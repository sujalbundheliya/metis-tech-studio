"use client";

import { m, useReducedMotion } from "motion/react";
import { DraggableLattice } from "@/components/ui/draggable-lattice";
import { Btn } from "@/components/ui/kit";
import { closingCta, placeholders } from "@/content/site";

/**
 * The one composition carried over from the first design, because it was the
 * part that worked: centred, oversized, a radial bloom behind the headline and
 * the node graph drifting through it. Everything else on the page is a grid;
 * this deliberately isn't.
 */
export function ClosingCta({
  heading,
  body,
  cta,
}: {
  heading?: React.ReactNode;
  body?: string;
  cta?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-white/10 bg-ink-1000">
      <div aria-hidden="true" className="absolute inset-0 opacity-70">
        <DraggableLattice />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[560px] w-[980px] max-w-[135vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,var(--color-venice-700)_0%,color-mix(in_oklab,var(--color-venice-700)_50%,transparent)_32%,transparent_72%)] opacity-55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[560px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,var(--color-beam-500)_0%,color-mix(in_oklab,var(--color-beam-500)_50%,transparent)_34%,transparent_76%)] opacity-30"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-28 sm:px-10 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <m.h2
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0.001 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="t-display text-balance text-white"
          >
            {heading ?? (
              <>
                Tell us what you&apos;re{" "}
                <em className="text-gradient-aurora not-italic">trying to build.</em>
              </>
            )}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0.001 : 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="t-lead mx-auto mt-7 max-w-2xl text-venice-200/75"
          >
            {body ?? closingCta.body}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0.001 : 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Btn href={placeholders.bookingUrl} size="lg" shape="pill" className="w-full sm:w-auto">
              {cta ?? closingCta.cta}
            </Btn>
            <a
              href={`mailto:${placeholders.email}`}
              className="group font-mono text-[15px] text-venice-200/70 transition-colors duration-300 hover:text-aurora-400"
            >
              <span className="border-b border-venice-200/20 pb-0.5 transition-colors duration-300 group-hover:border-aurora-400/60">
                {placeholders.email}
              </span>
            </a>
          </m.div>

          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.001 : 0.9, delay: 0.28 }}
            className="t-label mt-9 text-venice-300/45"
          >
            30 minutes · No charge · No deck
          </m.p>
        </div>
      </div>
    </section>
  );
}
