"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Label } from "@/components/ui/kit";
import { navLinks, placeholders, serviceGroups } from "@/content/site";
import { cn } from "@/lib/utils";

/** Hairline-divided nav bar: every item is a cell, the CTA is a solid block. */
export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
        "border-white/12 bg-ink-1000/88",
      )}
    >
      <div className="flex h-14 items-stretch">
        {/* mark */}
        <Link
          href="/"
          aria-label="Metis Tech Studio — home"
          className={cn(
            "flex shrink-0 items-center gap-2.5 border-r px-5 transition-colors duration-300",
            "border-white/12 text-sand-100 hover:bg-white/[0.06]",
          )}
        >
          <Logo />
        </Link>

        {/* nav cells — each its own bordered cell, sitting beside the mark */}
        <nav className="hidden items-stretch lg:flex" aria-label="Main">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="relative flex items-stretch"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  onFocus={() => setServicesOpen(true)}
                  aria-expanded={servicesOpen}
                  className={cn(
                    "flex items-center gap-1.5 border-r px-5 text-[15px] transition-colors duration-300",
                    "border-white/12 text-sand-100/85 hover:bg-white/[0.06] hover:text-sand-50",
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")}
                    strokeWidth={2}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <m.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: reduced ? 0.001 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="fixed inset-x-0 top-14 border-b border-white/10 bg-ink-1000 shadow-[0_20px_40px_-24px_rgba(8,32,46,0.3)]"
                    >
                      <div className="mx-auto grid max-w-[1400px] grid-cols-4">
                        {serviceGroups.map((group, i) => (
                          <div
                            key={group.heading}
                            className={cn("px-6 py-7", i > 0 && "border-l border-white/10")}
                          >
                            <Label>{group.heading}</Label>
                            <p className="mt-2.5 t-editorial text-[19px] leading-snug text-venice-200 italic">
                              “{group.question}”
                            </p>
                            <ul className="mt-4 space-y-px">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="block py-1.5 text-[15px] text-venice-200/72 transition-colors hover:text-white"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex items-center border-r px-5 text-[15px] transition-colors duration-300",
                  "border-white/12 text-sand-100/85 hover:bg-white/[0.06] hover:text-sand-50",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* pushes the CTA to the right edge */}
        <div className="flex-1 border-r border-white/12" />

        {/* CTA block — solid, sharp, flush to the edge */}
        <Link
          href={placeholders.bookingUrl}
          className="hidden items-center gap-2 bg-sand-100 px-6 text-[15px] font-medium text-ink-1000 transition-colors duration-200 hover:bg-white sm:flex"
        >
          Book a call
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
          </svg>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className={cn(
            "flex w-14 shrink-0 items-center justify-center border-l transition-colors duration-300 lg:hidden",
            "border-white/12 text-sand-100",
          )}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.2 }}
            className="fixed inset-x-0 top-14 bottom-0 overflow-y-auto bg-ink-1000 lg:hidden"
          >
            <button
              type="button"
              onClick={() => setMobileServices((v) => !v)}
              aria-expanded={mobileServices}
              className="flex w-full items-center justify-between border-b border-white/10 px-6 py-5 text-left t-editorial text-[28px] text-white"
            >
              Services
              <ChevronDown className={cn("h-5 w-5 transition-transform", mobileServices && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {mobileServices && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0.001 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-b border-white/10 bg-white/[0.02]"
                >
                  <div className="space-y-6 px-6 py-6">
                    {serviceGroups.map((group) => (
                      <div key={group.heading}>
                        <Label>{group.heading}</Label>
                        <ul className="mt-2.5 space-y-1.5">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block text-[16px] text-white/75"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {navLinks.filter((l) => !l.hasDropdown).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-white/10 px-6 py-5 t-editorial text-[28px] text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="p-6">
              <Link
                href={placeholders.bookingUrl}
                className="flex w-full items-center justify-center gap-2 bg-sand-100 px-6 py-4 text-[16px] font-medium text-ink-1000"
              >
                Book a call
              </Link>
              <a
                href={`mailto:${placeholders.email}`}
                className="mt-4 block text-center font-mono text-[14px] text-venice-300/65"
              >
                {placeholders.email}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
