"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/kit";
import { cn } from "@/lib/utils";

/* `footer.columns` is a deeply `as const` literal in the content module, so the
   link arrays arrive readonly. Matching that here keeps the content file free
   to stay immutable rather than loosening it for one consumer. */
type Column = {
  readonly heading: string;
  readonly links: readonly { readonly href: string; readonly label: string }[];
};

/**
 * Footer navigation, collapsible on a phone.
 *
 * Open, these four columns are 22 links plus headings. Stacked into one phone
 * column at the 44px touch height they need, that is roughly two thousand
 * pixels of footer — five full screens of link list between the reader and the
 * copyright line. Collapsing them puts the whole footer back on one screen and
 * lets someone choose a section before committing to scrolling it.
 *
 * One DOM tree, not two. Rendering a phone version beside a desktop version
 * would duplicate every link for crawlers and screen readers; instead the list
 * is `lg:block`, so above the breakpoint it ignores the collapsed state
 * entirely and the heading is simply a heading again.
 */
export function FooterNav({ columns }: { columns: readonly Column[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {columns.map((column, i) => {
        const isOpen = open === column.heading;
        return (
          <div
            key={column.heading}
            className={cn(
              "border-t border-white/10 px-gutter sm:px-8 lg:border-t-0 lg:border-l lg:border-white/10",
              // The generous block padding is a desktop proportion; on a phone
              // each column is a row in a list, not a panel.
              "py-0 sm:py-10 lg:py-10",
              i > 0 ? "sm:border-t-0" : "",
              i % 2 === 1 ? "sm:border-l sm:border-white/10" : "",
              i >= 2 ? "sm:border-t" : "",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : column.heading)}
              aria-expanded={isOpen}
              aria-controls={`footer-col-${i}`}
              className={cn(
                "flex min-h-14 w-full items-center justify-between text-left can-hover:min-h-0 sm:cursor-default",
                // Above `sm` the list is always visible, so the control has
                // nothing left to control — it goes back to being a label.
                "sm:pointer-events-none",
              )}
            >
              <Label dark>{column.heading}</Label>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 shrink-0 text-venice-300/60 transition-transform duration-300 sm:hidden",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <ul
              id={`footer-col-${i}`}
              className={cn(
                "space-y-px pb-5 sm:mt-5 sm:block sm:space-y-2.5 sm:pb-0",
                isOpen ? "block" : "hidden",
              )}
            >
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="tap-target text-[15px] text-venice-200/62 transition-colors active:text-sand-50 can-hover:min-h-0 can-hover:block hover:text-sand-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
