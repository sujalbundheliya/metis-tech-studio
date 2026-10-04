"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Btn, Label } from "@/components/ui/kit";
import { hero, placeholders, trustSignals } from "@/content/site";
import { practiceHref, practices } from "@/content/services";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.001 : 0.85, delay: reduced ? 0 : delay, ease },
  });

  return (
    <section className="relative border-b border-white/10">
      <Atmosphere />

      {/* ---- editorial split ---- */}
      <div className="relative mx-auto grid max-w-[1400px] lg:grid-cols-12">
        <div className="px-gutter pt-12 pb-10 sm:px-10 sm:pt-20 sm:pb-12 lg:col-span-8 lg:border-r lg:border-white/10 lg:px-14 lg:pt-28 lg:pb-20">
          <m.div {...rise(0)}>
            <Label>{hero.eyebrow}</Label>
          </m.div>

          <h1 className="t-display mt-7 text-white">
            {["We design, build, and ship", "software that works", "in the real world."].map((line, i) => (
              <m.span key={line} className="inline sm:block" {...rise(0.1 + i * 0.11)}>
                {i === 2 ? (
                  <>
                    in the <em className="text-gradient-aurora not-italic">real world.</em>
                  </>
                ) : (
                  <>
                    {line}
                    <span className="sm:hidden"> </span>
                  </>
                )}
              </m.span>
            ))}
          </h1>

          <m.div className="mt-11 flex flex-col gap-3 sm:flex-row" {...rise(0.52)}>
            <Btn href={placeholders.bookingUrl} size="lg">
              {hero.primaryCta}
            </Btn>
            <Btn href="#process" variant="outline" size="lg">
              {hero.secondaryCta}
            </Btn>
          </m.div>
        </div>

        <div className="flex flex-col justify-between border-t border-white/10 px-gutter py-8 sm:px-10 sm:py-10 lg:col-span-4 lg:border-t-0 lg:px-10 lg:py-28">
          <m.p className="t-lead max-w-md text-venice-200/80" {...rise(0.3)}>
            {hero.subhead}
          </m.p>

          <m.dl className="mt-10" {...rise(0.62)}>
            {trustSignals.map((signal) => (
              <div key={signal} className="flex items-baseline gap-3 border-t border-white/10 py-3 last:border-b">
                <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] bg-ember-500" />
                <dt className="t-small text-venice-200/72">{signal}</dt>
              </div>
            ))}
          </m.dl>
        </div>
      </div>

      {/* ---- practice index ---- */}
      <div className="mx-auto grid max-w-[1400px] border-t border-white/10 sm:grid-cols-3">
        {practices.map((practice, i) => (
          <Link
            key={practice.slug}
            href={practiceHref(practice)}
            className={`group relative px-gutter py-7 transition-colors duration-200 hover:bg-white/[0.05] active:bg-white/[0.07] sm:px-8 ${
              i > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <Label className="text-ember-400">{practice.number}</Label>
            <p className="t-h3 mt-3 text-white">{practice.name}</p>
            <p className="t-small mt-1.5 text-venice-300/60">{practice.services.length} services</p>
            {/* The rule sweeps in on hover. On touch there is no hover, so each
                card rests with a short aurora tick marking it as a target —
                otherwise these three read as static headings, not links. */}
            <span className="absolute bottom-0 left-0 h-px w-10 bg-aurora-500 transition-[width] duration-400 ease-[var(--ease-out-expo)] can-hover:w-0 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </section>
  );
}
