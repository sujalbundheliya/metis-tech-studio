"use client";

import { m, useReducedMotion } from "motion/react";
import { PracticeGlyph } from "@/components/ui/glyphs";
import { Chip, Label, Opener, TextLink, Ticks } from "@/components/ui/kit";
import { services } from "@/content/site";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="border-b border-white/10 bg-ink-1000">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-16 sm:px-10 lg:px-14 lg:pt-32">
        <Opener
          label={services.eyebrow}
          title={
            <>
              Four practices. <em className="text-aurora-400 not-italic">One team.</em>
            </>
          }
          intro={services.intro}
        />
      </div>

      {/* full-bleed 2×2 of hairline cells */}
      <div className="mx-auto grid max-w-[1400px] border-t border-white/10 md:grid-cols-2">
        {services.practices.map((practice, i) => (
          <m.article
            key={practice.number}
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: reduced ? 0.001 : 0.7, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "group relative flex flex-col px-6 py-10 transition-colors duration-300 hover:bg-white/[0.045] sm:px-10 lg:px-14 lg:py-14",
              i % 2 === 1 && "md:border-l md:border-white/10",
              i >= 2 && "border-t border-white/10",
              i === 1 && "border-t border-white/10 md:border-t-0",
            )}
          >
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Ticks />
            </span>

            <div className="flex items-start justify-between gap-6">
              <div>
                <Label className="text-ember-400">{practice.number}</Label>
                <Label className="mt-2 block text-venice-300/60">{practice.name}</Label>
              </div>
              <div className="shrink-0 text-aurora-400">
                <PracticeGlyph name={practice.glyph} />
              </div>
            </div>

            <h3 className="t-h2 mt-7 max-w-md text-balance text-white" style={{ fontSize: "clamp(1.6rem,2.6vw,2.1rem)" }}>
              {practice.headline}
            </h3>

            <p className="t-body mt-5 max-w-xl text-venice-200/68">{practice.body}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {practice.tags.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-9">
              <TextLink href={practice.href}>{practice.cta}</TextLink>
            </div>
          </m.article>
        ))}
      </div>

      {/* nudge strip */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-5 border-t border-white/10 bg-ink-950 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
        <p className="t-body max-w-2xl text-venice-200/80">
          <span className="font-medium text-white">Most projects are two or three of these.</span>{" "}
          You don&apos;t have to know which category your problem lives in before you ask.
        </p>
        <TextLink href="/contact" className="shrink-0">
          Describe your problem
        </TextLink>
      </div>
    </section>
  );
}
