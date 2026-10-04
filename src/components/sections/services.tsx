"use client";

import { m, useReducedMotion } from "motion/react";
import { PracticeGlyph } from "@/components/ui/glyphs";
import { Chip, Label, Opener, TextLink, Ticks } from "@/components/ui/kit";
import { services } from "@/content/site";
import { practiceHref, practices } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="border-b border-white/10 bg-ink-1000">
      <div className="mx-auto max-w-[1400px] px-gutter pt-16 pb-10 sm:px-10 sm:pt-24 sm:pb-16 lg:px-14 lg:pt-32">
        <Opener
          label={services.eyebrow}
          title={
            <>
              Three practices. <em className="text-aurora-400 not-italic">One team.</em>
            </>
          }
          intro={services.intro}
        />
      </div>

      {/* full-bleed row of hairline cells */}
      <div className="mx-auto grid max-w-[1400px] border-t border-white/10 lg:grid-cols-3">
        {practices.map((practice, i) => (
          <m.article
            key={practice.number}
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: reduced ? 0.001 : 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "group relative flex flex-col px-gutter py-9 transition-colors duration-300 hover:bg-white/[0.045] active:bg-white/[0.06] sm:px-10 sm:py-10 lg:px-10 lg:py-14 xl:px-12",
              i > 0 && "border-t border-white/10 lg:border-t-0 lg:border-l",
            )}
          >
            {/* Crop marks fade in on hover. `touch-visible` keeps them drawn where
                there is no pointer, so the cell still reads as a bounded card
                rather than as loose text on the page background. */}
            <span className="touch-visible pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

            <h3 className="t-h2 mt-7 max-w-md text-balance text-white" style={{ fontSize: "clamp(1.6rem,2.4vw,2rem)" }}>
              {practice.headline.lead}
              <em className="text-aurora-400 not-italic">{practice.headline.accent}</em>
              {practice.headline.tail}
            </h3>

            <p className="t-body mt-5 max-w-xl text-venice-200/68">{practice.subhead}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {practice.tags.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-9">
              <TextLink href={practiceHref(practice)}>Explore {practice.name}</TextLink>
            </div>
          </m.article>
        ))}
      </div>

      {/* nudge strip */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-5 border-t border-white/10 bg-ink-950 px-gutter py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
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
