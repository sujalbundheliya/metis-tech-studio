"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Label } from "@/components/ui/kit";
import { navLinks, placeholders, serviceGroups } from "@/content/site";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

/** Hairline-divided nav bar: every item is a cell, the CTA is a solid block. */
export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* A route change leaves the sheet open over the new page otherwise — the
     links close it themselves, but the browser's back button does not.

     Derived during render rather than in an effect: an effect would paint the
     new page with the old sheet still over it for one frame before closing it. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  /* Resizing past the breakpoint hides the sheet via `lg:hidden` but leaves
     the scroll lock and the trigger's aria-expanded behind. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Scroll lock.
     `overflow: hidden` on <body> alone does not hold on iOS Safari — the page
     behind keeps rubber-banding and the sheet scrolls it instead of itself.
     Pinning the body at a negative offset is the one approach that works
     across engines; the offset has to be restored on close or the page jumps
     back to the top. */
  useEffect(() => {
    if (!mobileOpen) return;
    const { body } = document;
    const y = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      Object.assign(body.style, prev);
      window.scrollTo(0, y);
    };
  }, [mobileOpen]);

  /* Escape closes, and focus goes back to the control that opened it rather
     than to the top of the document. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) triggerRef.current?.focus();
      setMobileOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  /* Keyboard focus would otherwise stay on the page behind the sheet. */
  useEffect(() => {
    if (mobileOpen) panelRef.current?.focus();
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  /* ------------------------------------------------------------------ sheet
     Rendered through a portal onto <body>, and that is not a preference.
     `backdrop-filter` on the header makes it a containing block for every
     `position: fixed` descendant, so a sheet nested inside it resolved
     `top: 3.5rem; bottom: 0` against the header's own 57px box and laid out at
     exactly zero height — an invisible panel that still locked the page. The
     portal is what puts the viewport back in charge of it. */
  const sheet = (
    <AnimatePresence>
      {mobileOpen && (
        <m.div
          ref={panelRef}
          key="mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.001 : 0.18 }}
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain",
            "bg-ink-1000 outline-none lg:hidden",
          )}
          style={{ top: "var(--header-h)" }}
        >
          <nav aria-label="Mobile" className="flex flex-1 flex-col">
            <button
              type="button"
              onClick={() => setMobileServices((v) => !v)}
              aria-expanded={mobileServices}
              aria-controls="mobile-services"
              className="flex min-h-14 w-full items-center justify-between border-b border-white/10 px-gutter py-5 text-left transition-colors active:bg-white/[0.06]"
            >
              <span className="t-editorial text-[30px] leading-none text-white">Services</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-venice-300 transition-transform duration-300",
                  mobileServices && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {mobileServices && (
                <m.div
                  id="mobile-services"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0.001 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-b border-white/10 bg-white/[0.02]"
                >
                  <div className="px-gutter py-6">
                    {serviceGroups.map((group, gi) => (
                      <div key={group.heading} className={gi > 0 ? "mt-7" : undefined}>
                        <Label>{group.heading}</Label>
                        {/* The question is what the desktop dropdown leads with;
                            dropping it on mobile would leave a bare link list
                            with none of the reason it is grouped that way. */}
                        <p className="t-editorial mt-1.5 text-[17px] leading-snug text-aurora-400/80 italic">
                          “{group.question}”
                        </p>
                        <ul className="mt-2">
                          {group.items.map((item) => (
                            <li key={item.href} className="border-t border-white/[0.07]">
                              <Link
                                href={item.href}
                                onClick={closeMobile}
                                className="tap-target text-[16px] text-white/78 transition-colors active:text-aurora-300"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link
                      href="/services"
                      onClick={closeMobile}
                      className="tap-target mt-7 border-t border-white/12 text-[15px] font-medium text-aurora-400"
                    >
                      All {serviceGroups.reduce((n, g) => n + g.items.length, 0)} services →
                    </Link>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {navLinks
              .filter((l) => !l.hasDropdown)
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="t-editorial flex min-h-14 items-center border-b border-white/10 px-gutter py-5 text-[30px] leading-none text-white transition-colors active:bg-white/[0.06]"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          {/* Pinned to the foot of the sheet, padded past the home indicator. */}
          <div className="mt-auto px-gutter pt-8 pb-safe">
            <div className="pb-8">
              <Link
                href={placeholders.bookingUrl}
                onClick={closeMobile}
                className="flex min-h-14 w-full items-center justify-center gap-2 bg-sand-100 px-6 text-[16px] font-medium text-ink-1000 transition-colors active:bg-white"
              >
                Book a call
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </Link>
              <a
                href={`mailto:${placeholders.email}`}
                className="tap-target mt-2 justify-center font-mono text-[15px] text-venice-300/70"
              >
                {placeholders.email}
              </a>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
          "border-white/12 bg-ink-1000/88",
        )}
      >
        <div className="flex items-stretch" style={{ height: "var(--header-h)" }}>
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
                        /* `absolute top-full` against the header, rather than
                           `fixed top-14`. The old value only landed correctly
                           because the header's backdrop-filter happened to be
                           the containing block and happened to be 56px tall. */
                        className="absolute inset-x-0 top-full w-screen border-b border-white/10 bg-ink-1000 shadow-[0_20px_40px_-24px_rgba(8,32,46,0.3)]"
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

          {/* pushes the CTA to the right edge. Below `lg` this is the only thing
              between the mark and the menu button, so it carries no border — an
              empty bordered cell read as a missing element on a phone. */}
          <div className="flex-1 lg:border-r lg:border-white/12" />

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
            ref={triggerRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={cn(
              "flex w-14 shrink-0 items-center justify-center border-l transition-colors duration-300 lg:hidden",
              "border-white/12 text-sand-100 active:bg-white/[0.08]",
            )}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {mounted && createPortal(sheet, document.body)}
    </>
  );
}
