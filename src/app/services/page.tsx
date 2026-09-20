import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCta } from "@/components/sections/closing";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Btn, Label, TextLink } from "@/components/ui/kit";
import { BreadcrumbSchema } from "@/components/schema";
import { allServices, practiceGroups } from "@/content/services";
import { placeholders } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Services — AI, Software, Automation & Data",
  description:
    "Generative AI, web and mobile development, workflow automation, and data engineering — from a two-person studio that builds what it sells.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]} />
      <SiteHeader />
      <main id="main">
        {/* ---- hero ---- */}
        <section className="relative border-b border-white/10">
          <Atmosphere bloom="top-center" intensity="soft" />
          <div className="relative mx-auto grid max-w-[1400px] lg:grid-cols-12">
            <div className="px-gutter pt-12 pb-10 sm:px-10 sm:pt-20 sm:pb-14 lg:col-span-8 lg:border-r lg:border-white/10 lg:px-14 lg:pt-28 lg:pb-20">
              <Label>Services</Label>
              <h1 className="t-display mt-7 text-balance text-white">
                {allServices.length} things we build.{" "}
                <em className="text-gradient-aurora not-italic">Four questions they answer.</em>
              </h1>
              <div className="mt-11">
                <Btn href={placeholders.bookingUrl} size="lg">
                  Book a free consultation
                </Btn>
              </div>
            </div>
            <div className="flex items-end border-t border-white/10 px-gutter py-8 sm:px-10 sm:py-10 lg:col-span-4 lg:border-t-0 lg:px-10 lg:py-28">
              <p className="t-lead max-w-md text-venice-200/80">
                Most studios organise their services by technology. We&apos;ve organised ours by the
                question you&apos;re actually asking — because nobody wakes up wanting a
                recommendation system. They wake up wanting customers to find the right product.
              </p>
            </div>
          </div>
        </section>

        {/* ---- the four practices ---- */}
        {practiceGroups.map((group, gi) => (
          <section
            key={group.slug}
            id={group.slug}
            className="scroll-mt-16 border-b border-white/10"
          >
            <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
              <div className="px-gutter pt-10 pb-5 sm:px-10 sm:pt-14 sm:pb-6 lg:col-span-4 lg:border-r lg:border-white/10 lg:px-14 lg:py-16">
                <div className="lg:sticky lg:top-24">
                  <Label className="text-ember-400">{String(gi + 1).padStart(2, "0")}</Label>
                  <h2 className="t-h2 mt-4 text-white">{group.heading}</h2>
                  <p className="t-editorial mt-4 text-[21px] leading-snug text-aurora-400/85 italic">
                    “{group.question}”
                  </p>
                </div>
              </div>

              <ul className="lg:col-span-8">
                {allServices
                  .filter((s) => s.categorySlug === group.slug)
                  .map((s) => (
                    <li key={s.slug} className="border-t border-white/10 first:border-t-0 lg:first:border-t">
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex min-h-14 items-start justify-between gap-5 px-gutter py-6 transition-colors duration-200 hover:bg-white/[0.045] active:bg-white/[0.06] sm:gap-8 sm:py-7 sm:px-10 lg:px-14"
                      >
                        <span className="min-w-0">
                          <span className="t-h3 block text-white transition-colors group-hover:text-aurora-300">
                            {s.name}
                          </span>
                          <span className="t-small mt-2 block max-w-xl text-venice-200/62">
                            {s.subhead}
                          </span>
                        </span>
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="mt-1.5 h-4 w-4 shrink-0 text-venice-300/50 transition-all duration-200 group-hover:translate-x-1 group-hover:text-aurora-400"
                        >
                          <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                        </svg>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        ))}

        {/* ---- not sure which ---- */}
        <section className="border-b border-white/10 bg-ink-950">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:px-14">
            <div className="lg:col-span-4">
              <div className="h-px w-full bg-white/20" />
              <Label className="mt-4 block">Not sure which?</Label>
            </div>
            <div className="lg:col-span-8">
              <h2 className="t-h2 max-w-2xl text-balance text-white">
                Most projects are two or three of these.
              </h2>
              <p className="t-lead mt-6 max-w-2xl text-venice-200/72">
                An app that needs a recommendation engine. A platform that needs a document
                pipeline. A model that&apos;s useless until someone builds the interface around it.
                Describe the problem in your own words and we&apos;ll tell you what it&apos;s made of.
              </p>
              <div className="mt-8">
                <TextLink href="/contact">Describe your problem</TextLink>
              </div>
            </div>
          </div>
        </section>

        {/* ---- what every engagement includes ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1400px] px-gutter pt-12 pb-6 sm:px-10 sm:pt-16 sm:pb-8 lg:px-14">
            <div className="h-px w-full bg-white/20" />
            <Label className="mt-4 block">Every engagement</Label>
          </div>
          <div className="mx-auto grid max-w-[1400px] border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["A fixed price before we write code.", "Discovery produces a written scope, a number, and a date. That number doesn't move unless you change the scope."],
              ["Your repository from commit one.", "Code, models, and infrastructure live in your accounts, not ours. If we disappeared tomorrow you'd lose time, not assets."],
              ["Weekly working software.", "Not a status call. Something running that you can click."],
              ["An honest no.", "If the right answer is a tool you can buy off the shelf, we'll say so. We'd rather lose the project than sell you the wrong one."],
            ].map(([title, body], i) => (
              <div
                key={title}
                className={`px-gutter py-8 sm:px-8 sm:py-10 lg:px-10 ${i > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""} ${i === 2 ? "sm:border-t sm:border-l-0 lg:border-t-0 lg:border-l" : ""} ${i === 3 ? "sm:border-t lg:border-t-0" : ""}`}
              >
                <h3 className="t-h3 text-white">{title}</h3>
                <p className="t-small mt-3 text-venice-200/68">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <ClosingCta
          heading={
            <>
              Start with a conversation,{" "}
              <em className="text-gradient-aurora not-italic">not a brief.</em>
            </>
          }
          body="Thirty minutes, no charge, no deck. Tell us what's not working and we'll tell you how we'd approach it — including whether we're the right people for it."
        />
      </main>
      <SiteFooter />
    </>
  );
}
