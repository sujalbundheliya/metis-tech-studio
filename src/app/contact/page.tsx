import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Label } from "@/components/ui/kit";
import { ContactForm } from "@/components/contact-form";
import { BreadcrumbSchema } from "@/components/schema";
import { placeholders } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're trying to build. A 30-minute call, no charge and no pitch deck — we'll tell you how we'd approach it and whether we're the right team.",
  alternates: { canonical: "/contact" },
};

const STEPS = [
  ["You send this form", "Straight to the two of us. No inbox triage, no sales development rep."],
  ["We reply within one business day", "Usually with questions, because the first answer is rarely the right one."],
  ["A 30-minute call", "No charge, no deck. You describe the problem; we tell you how we'd approach it."],
  ["A written scope", "If it's a fit — fixed price, fixed timeline, before anyone writes code."],
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />
      <SiteHeader />
      <main id="main">
        <section className="relative border-b border-white/10">
          <Atmosphere bloom="top-left" intensity="soft" />
          <div className="relative mx-auto max-w-[1400px] px-6 pt-20 pb-14 sm:px-10 lg:px-14 lg:pt-28">
            <Label>Contact</Label>
            <h1 className="t-display mt-7 max-w-4xl text-balance text-white">
              Tell us what you&apos;re{" "}
              <em className="text-gradient-aurora not-italic">trying to build.</em>
            </h1>
            <p className="t-lead mt-7 max-w-2xl text-venice-200/80">
              Describe the problem in your own words. We&apos;ll tell you how we&apos;d
              approach it, roughly what it costs, and whether we&apos;re the right team for
              it. If we&apos;re not, we&apos;ll say so and point you somewhere better.
            </p>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
            {/* form */}
            <div className="px-6 py-14 sm:px-10 lg:col-span-8 lg:border-r lg:border-white/10 lg:px-14 lg:py-16">
              <ContactForm />
            </div>

            {/* rail */}
            <aside className="border-t border-white/10 px-6 py-12 sm:px-10 lg:col-span-4 lg:border-t-0 lg:px-10 lg:py-16">
              <div className="lg:sticky lg:top-24">
                <Label className="text-venice-300/60">What happens next</Label>
                <ol className="mt-6">
                  {STEPS.map(([title, body], i) => (
                    <li key={title} className="border-t border-white/10 py-5 last:border-b">
                      <div className="flex gap-4">
                        <span className="t-label shrink-0 pt-1 text-ember-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-[16px] font-medium text-white">{title}</p>
                          <p className="t-small mt-1.5 text-venice-200/65">{body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10">
                  <Label className="text-venice-300/60">Or reach us directly</Label>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <a
                        href={`mailto:${placeholders.email}`}
                        className="text-[16px] text-venice-200/80 transition-colors hover:text-aurora-400"
                      >
                        {placeholders.email}
                      </a>
                    </li>
                    {placeholders.phone && (
                      <li>
                        <a
                          href={`tel:${placeholders.phone.replace(/\s/g, "")}`}
                          className="text-[16px] text-venice-200/80 transition-colors hover:text-aurora-400"
                        >
                          {placeholders.phone}
                        </a>
                      </li>
                    )}
                  </ul>
                  <p className="t-small mt-5 text-venice-300/50">
                    We&apos;ll sign an NDA before the first call if you&apos;d like — just say so.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
