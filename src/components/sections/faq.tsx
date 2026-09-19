"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Label } from "@/components/ui/kit";
import { faq } from "@/content/site";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="border-b border-white/10 bg-ink-950">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
        <div className="px-6 pt-24 pb-10 sm:px-10 lg:col-span-4 lg:border-r lg:border-white/10 lg:px-14 lg:pt-32 lg:pb-32">
          <div className="lg:sticky lg:top-28">
            <div className="h-px w-full bg-venice-950/20" />
            <Label className="mt-4 block">{faq.eyebrow}</Label>
            <h2 className="t-h2 mt-7 text-balance text-white">
              The things people ask{" "}
              <em className="text-aurora-400 not-italic">on the first call.</em>
            </h2>
          </div>
        </div>

        <div className="lg:col-span-8">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-white/10 first:border-t-0 lg:first:border-t">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`v1-faq-${i}`}
                    className="group flex w-full items-start justify-between gap-8 px-6 py-7 text-left transition-colors duration-200 hover:bg-white/[0.035] sm:px-10 lg:px-14"
                  >
                    <span
                      className={cn(
                        "t-h3 transition-colors duration-200",
                        isOpen ? "text-white" : "text-venice-200/80 group-hover:text-white",
                      )}
                    >
                      {item.q}
                    </span>
                    <span className="relative mt-2 h-3.5 w-3.5 shrink-0">
                      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-aurora-500" />
                      <span
                        className={cn(
                          "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-aurora-500 transition-transform duration-300 ease-[var(--ease-out-expo)]",
                          isOpen && "scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`v1-faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduced ? 0.001 : 0.4,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: reduced ? 0.001 : 0.25 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="t-body max-w-2xl px-6 pb-8 text-venice-200/68 sm:px-10 lg:px-14">
                        {item.a}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
