"use client";

import { useState } from "react";
import { Btn, Opener } from "@/components/ui/kit";

/* ============================================================================
   COST OF MANUAL WORK — from sys-info/calculator/metis-calculator.md.
   The arithmetic, ranges, defaults and captions are the spec's; only the
   presentation is rebuilt in the site's own system (the original shipped as a
   light, rounded, self-contained embed).
   ========================================================================== */

/** The spec's CONFIG block. Change currency, locale or assumptions here. */
const CONFIG = {
  // TODO: switch to the currency you quote in (e.g. "en-AU" + "AUD").
  locale: "en-US",
  currency: "USD",
  fullTimeHoursPerWeek: 38,
  weeksPerYear: 52,
  maxStrips: 6,
} as const;

const money = new Intl.NumberFormat(CONFIG.locale, {
  style: "currency",
  currency: CONFIG.currency,
  maximumFractionDigits: 0,
});
const whole = new Intl.NumberFormat(CONFIG.locale, { maximumFractionDigits: 0 });

type SliderSpec = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  hint?: string;
  format: (v: number) => string;
  /** Read aloud by screen readers in place of the bare number. */
  spoken: (v: number) => string;
};

const SLIDERS = {
  people: {
    id: "mc-people",
    label: "People doing repetitive admin",
    min: 1,
    max: 50,
    step: 1,
    format: (v) => String(v),
    spoken: (v) => `${v} ${v === 1 ? "person" : "people"}`,
  },
  hours: {
    id: "mc-hours",
    label: "Hours each, per week",
    min: 1,
    max: 40,
    step: 1,
    hint: "Copying data between systems, chasing approvals, building reports, sorting emails.",
    format: (v) => `${v} ${v === 1 ? "hr" : "hrs"}`,
    spoken: (v) => `${v} ${v === 1 ? "hour" : "hours"} a week`,
  },
  rate: {
    id: "mc-rate",
    label: "Average hourly cost",
    min: 20,
    max: 150,
    step: 5,
    hint: "Wages plus on-costs such as tax, leave and benefits.",
    format: (v) => money.format(v),
    spoken: (v) => `${money.format(v)} an hour`,
  },
} satisfies Record<string, SliderSpec>;

function caption(totalWeeks: number) {
  const people = totalWeeks / CONFIG.weeksPerYear;
  const weeks = Math.round(totalWeeks);
  if (weeks < 1) return "That's less than one working week of a full-time person's year.";
  if (people < 0.95)
    return `That's ${weeks} working week${weeks === 1 ? "" : "s"} of one full-time person's year.`;
  if (people < 1.05) return "That's about one full-time person's entire working year.";
  return `That's the full working year of ${people.toFixed(1)} full-time people.`;
}

export function CostCalculator() {
  const [people, setPeople] = useState(4);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(45);

  const weeklyHours = people * hours;
  const yearlyHours = weeklyHours * CONFIG.weeksPerYear;
  const cost = yearlyHours * rate;
  const totalWeeks = yearlyHours / CONFIG.fullTimeHoursPerWeek;

  // One strip per full-time working year, one cell per working week.
  const usedWeeks = Math.round(totalWeeks);
  const stripsNeeded = Math.max(1, Math.ceil(usedWeeks / CONFIG.weeksPerYear));
  const stripsShown = Math.min(stripsNeeded, CONFIG.maxStrips);

  return (
    <section id="cost" aria-labelledby="cost-title" className="border-b border-white/10 bg-ink-950">
      <div className="mx-auto max-w-[1400px] px-gutter pt-16 pb-10 sm:px-10 sm:pt-24 sm:pb-16 lg:px-14 lg:pt-32">
        <Opener
          label="The cost of manual work"
          title={
            <span id="cost-title">
              What does manual work{" "}
              <em className="text-aurora-400 not-italic">cost you each year?</em>
            </span>
          }
          intro="Most businesses have never added it up. Move the sliders to match your team and see what repetitive admin is really worth."
        />
      </div>

      <div className="mx-auto grid max-w-[1400px] border-t border-white/10 lg:grid-cols-12">
        {/* ---- inputs ---- */}
        <div className="space-y-9 px-gutter py-10 sm:px-10 sm:py-12 lg:col-span-5 lg:border-r lg:border-white/10 lg:px-14 lg:py-14">
          <Slider spec={SLIDERS.people} value={people} onChange={setPeople} />
          <Slider spec={SLIDERS.hours} value={hours} onChange={setHours} />
          <Slider spec={SLIDERS.rate} value={rate} onChange={setRate} />
        </div>

        {/* ---- results ---- */}
        <div className="border-t border-white/10 lg:col-span-7 lg:border-t-0">
          <dl className="grid grid-cols-2 border-b border-white/10">
            <div className="px-gutter py-6 sm:px-10 sm:py-8 lg:px-12">
              <dt className="t-label text-venice-300/60">Hours spent each week</dt>
              <dd className="t-editorial mt-2 text-[length:clamp(2rem,4vw,2.75rem)] leading-none text-white tabular-nums">
                {whole.format(weeklyHours)}
              </dd>
            </div>
            <div className="border-l border-white/10 px-gutter py-6 sm:px-10 sm:py-8 lg:px-12">
              <dt className="t-label text-venice-300/60">Hours spent each year</dt>
              <dd className="t-editorial mt-2 text-[length:clamp(2rem,4vw,2.75rem)] leading-none text-white tabular-nums">
                {whole.format(yearlyHours)}
              </dd>
            </div>
          </dl>

          <div className="px-gutter py-8 sm:px-10 sm:py-10 lg:px-12">
            <p className="t-label text-venice-300/60">Cost of manual work each year</p>
            {/* Inline style rather than a size class: `t-display` sets its own
                font-size, and which of two utilities wins is down to emit order. */}
            <p
              aria-live="polite"
              className="t-display mt-3 tabular-nums"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
            >
              <span className="text-gradient-aurora">{money.format(cost)}</span>
            </p>

            <p className="t-body mt-8 text-venice-200/85">{caption(totalWeeks)}</p>

            {/* Decorative restatement of the caption above. */}
            <div aria-hidden="true" className="mt-4 space-y-1.5">
              {Array.from({ length: stripsShown }, (_, row) => (
                <div key={row} className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-px sm:gap-[2px]">
                  {Array.from({ length: CONFIG.weeksPerYear }, (_, w) => {
                    const used = row * CONFIG.weeksPerYear + w < usedWeeks;
                    return (
                      <span
                        key={w}
                        className={`aspect-[1/2.2] transition-colors duration-300 motion-reduce:transition-none ${
                          used ? "bg-aurora-500" : "bg-white/[0.08]"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            {stripsNeeded > CONFIG.maxStrips && (
              <p className="t-small mt-3 text-venice-300/60">
                Showing {CONFIG.maxStrips} of {stripsNeeded} full-time working years.
              </p>
            )}
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-venice-300/70">
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2.5 w-2.5 bg-aurora-500" />
                Spent on manual work
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2.5 w-2.5 border border-white/25 bg-white/[0.08]" />
                Rest of the working year
              </li>
            </ul>
          </div>

          <div className="border-t border-white/10 px-gutter py-8 sm:px-10 sm:py-10 lg:px-12">
            <p className="max-w-xl text-[17px] leading-snug font-medium text-white">
              Want to reduce this cost? Let&apos;s talk about which parts of this work can be automated.
            </p>
            <Btn href="/contact" size="lg" className="mt-6 w-full sm:w-auto">
              Contact us
            </Btn>
            <p className="t-small mt-5 max-w-xl text-venice-300/60">
              The first call is free, takes 30 minutes, and comes with no obligation. We&apos;ll look at
              your actual processes and tell you honestly what&apos;s worth automating.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  spec,
  value,
  onChange,
}: {
  spec: SliderSpec;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - spec.min) / (spec.max - spec.min)) * 100;
  const hintId = spec.hint ? `${spec.id}-hint` : undefined;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={spec.id} className="text-[16px] font-medium text-white">
          {spec.label}
        </label>
        <output
          htmlFor={spec.id}
          className="t-editorial shrink-0 text-[30px] leading-none whitespace-nowrap text-aurora-400 tabular-nums"
        >
          {spec.format(value)}
        </output>
      </div>
      <input
        id={spec.id}
        type="range"
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={spec.spoken(value)}
        aria-describedby={hintId}
        className="range mt-2"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
      <div aria-hidden="true" className="t-label flex justify-between text-venice-300/40">
        <span>{spec.format(spec.min)}</span>
        <span>{spec.format(spec.max)}</span>
      </div>
      {spec.hint && (
        <p id={hintId} className="t-small mt-3 text-venice-300/60">
          {spec.hint}
        </p>
      )}
    </div>
  );
}
