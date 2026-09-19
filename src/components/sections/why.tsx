"use client";

import { m, useReducedMotion } from "motion/react";
import { Activity, Compass, KeyRound, ShieldCheck, Users, Wrench } from "lucide-react";
import { Label, Opener } from "@/components/ui/kit";
import { whyMetis } from "@/content/site";
import { cn } from "@/lib/utils";

const ICONS = { users: Users, shield: ShieldCheck, compass: Compass, key: KeyRound, activity: Activity, wrench: Wrench } as const;

export function WhyMetis() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="border-b border-white/10 bg-ink-950">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-16 sm:px-10 lg:px-14 lg:pt-32">
        <Opener
          label={whyMetis.eyebrow}
          title={
            <>
              Why teams choose a studio{" "}
              <em className="text-aurora-400 not-italic">over an agency.</em>
            </>
          }
        />
      </div>

      <div className="mx-auto grid max-w-[1400px] border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {whyMetis.reasons.map((reason, i) => {
          const Icon = ICONS[reason.icon as keyof typeof ICONS];
          return (
            <m.div
              key={reason.title}
              initial={{ opacity: 0, y: reduced ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduced ? 0.001 : 0.65, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative flex flex-col px-6 py-10 transition-colors duration-300 hover:bg-white/[0.04] sm:px-8 lg:px-10",
                "border-t border-white/10 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0",
                "sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-white/10",
                "lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(3n-1)]:border-l lg:[&:nth-child(3n)]:border-l lg:[&:nth-child(3n-1)]:border-white/10 lg:[&:nth-child(3n)]:border-white/10",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-[18px] w-[18px] shrink-0 text-aurora-400" strokeWidth={1.7} />
                <Label className="text-venice-300/60">{String(i + 1).padStart(2, "0")}</Label>
              </div>
              <h3 className="t-h3 mt-6 text-balance text-white">{reason.title}</h3>
              <p className="t-body mt-3.5 text-venice-200/68">{reason.body}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-aurora-500 transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-full" />
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
