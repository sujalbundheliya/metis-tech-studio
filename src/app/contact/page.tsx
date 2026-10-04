import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Btn, Label } from "@/components/ui/kit";
import { ContactForm } from "@/components/contact-form";
import { ServiceFaq } from "@/components/service-faq";
import { BreadcrumbSchema, FaqSchema } from "@/components/schema";
import { placeholders } from "@/content/site";
import { contact, hasBookingLink } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute call or send us a message. No pitch deck, no pressure, and a reply within one business day.",
  alternates: { canonical: "/contact" },
};

const LINKEDIN_PATH =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0";

const reach =
  "inline-flex min-h-11 items-center gap-2.5 text-[16px] text-venice-200/80 transition-colors hover:text-aurora-400 can-hover:min-h-0";

export default function ContactPage() {
  const { location, regions, hours, linkedin } = placeholders;

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />
      <FaqSchema items={[...contact.faq]} />
      <SiteHeader />
      <main id="main">
        {/* ---- hero ---- */}
        <section className="relative border-b border-white/10">
          <Atmosphere bloom="top-left" intensity="soft" />
          <div className="relative mx-auto max-w-[1400px] px-gutter pt-12 pb-10 sm:px-10 sm:pt-20 sm:pb-14 lg:px-14 lg:pt-28">
            <Label>Contact</Label>
            <h1 className="t-display mt-7 max-w-4xl text-balance text-white">
              Tell us what you&apos;re{" "}
              <em className="text-gradient-aurora not-italic">trying to fix.</em>
            </h1>
            <p className="t-lead mt-7 max-w-2xl text-venice-200/80">{contact.subhead}</p>
          </div>
        </section>

        {/* ---- form + rail ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
            <div className="px-gutter py-10 sm:px-10 sm:py-14 lg:col-span-8 lg:border-r lg:border-white/10 lg:px-14 lg:py-16">
              <ContactForm />
            </div>

            <aside className="border-t border-white/10 px-gutter py-10 sm:px-10 sm:py-12 lg:col-span-4 lg:border-t-0 lg:px-10 lg:py-16">
              <div className="lg:sticky lg:top-24">
                <h2 className="t-label text-venice-300/60">What happens on the call</h2>
                <ol className="mt-6">
                  {contact.callSteps.map((step, i) => (
                    <li key={step.title} className="border-t border-white/10 py-5 last:border-b">
                      <div className="flex gap-4">
                        <span className="t-label shrink-0 pt-1 text-ember-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-[16px] font-medium text-white">{step.title}</p>
                          <p className="t-small mt-1.5 text-venice-200/65">{step.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10">
                  <h2 className="t-label text-venice-300/60">Other ways to reach us</h2>

                  {/* Only once a real scheduler is configured — the fallback
                      booking URL is this very page. */}
                  {hasBookingLink && (
                    <div className="mt-5 border border-white/12 p-5">
                      <p className="text-[16px] font-medium text-white">{contact.booking.heading}</p>
                      <p className="t-small mt-1.5 text-venice-200/65">{contact.booking.body}</p>
                      <Btn href={placeholders.bookingUrl} variant="outline" size="sm" className="mt-4">
                        Pick a time
                      </Btn>
                    </div>
                  )}

                  <ul className="mt-4 space-y-1">
                    <li>
                      <a href={`mailto:${placeholders.email}`} className={reach}>
                        <span className="t-label w-16 shrink-0 text-venice-300/45">Email</span>
                        {placeholders.email}
                      </a>
                    </li>
                    {placeholders.phone && (
                      <li>
                        <a href={`tel:${placeholders.phone.replace(/\s/g, "")}`} className={reach}>
                          <span className="t-label w-16 shrink-0 text-venice-300/45">Phone</span>
                          {placeholders.phone}
                        </a>
                      </li>
                    )}
                    {linkedin && (
                      <li>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className={reach}>
                          <span className="t-label w-16 shrink-0 text-venice-300/45">LinkedIn</span>
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[15px] w-[15px]">
                            <path d={LINKEDIN_PATH} />
                          </svg>
                          Company page
                        </a>
                      </li>
                    )}
                  </ul>

                  <div className="t-small mt-5 space-y-2 text-venice-200/62">
                    {location && (
                      <p>
                        Based in {location}. We work with clients remotely
                        {regions ? ` across ${regions}` : ""}.
                      </p>
                    )}
                    <p>
                      {hours ? `${hours}. ` : ""}
                      {contact.replyPromise}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <ServiceFaq items={[...contact.faq]} />

        {/* ---- closing line ---- */}
        {/* How we work — hidden for now.
        <section className="border-b border-white/10 bg-ink-950">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-3 px-gutter py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-12 lg:px-14">
            <p className="t-body max-w-2xl text-venice-200/75">
              <span className="font-medium text-white">{contact.closingLine.lead}</span>{" "}
              {contact.closingLine.body}
            </p>
            <TextLink href="/how-we-work" className="shrink-0">
              {contact.closingLine.link}
            </TextLink>
          </div>
        </section>
        */}
      </main>
      <SiteFooter />
    </>
  );
}
