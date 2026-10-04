import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCta } from "@/components/sections/closing";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Btn, Label } from "@/components/ui/kit";
import { BreadcrumbSchema } from "@/components/schema";
import { about } from "@/content/about";
import { placeholders } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small product engineering studio building AI systems and custom software. The people you meet on the first call are the people who write the code.",
  alternates: { canonical: "/about" },
};

/** Rule, mono label, serif heading — the opener every band on this page uses. */
function Opener({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="lg:col-span-4">
      <div className="lg:sticky lg:top-24">
        <div className="h-px w-full bg-white/20" />
        <Label className="mt-4 block text-ember-400">{String(n).padStart(2, "0")}</Label>
        <h2 className="t-h2 mt-4 text-balance text-white">{children}</h2>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} />
      <SiteHeader />
      <main id="main">
        {/* ---- hero ---- */}
        <section className="relative border-b border-white/10">
          <Atmosphere bloom="top-left" intensity="soft" />
          <div className="relative mx-auto grid max-w-[1400px] lg:grid-cols-12">
            <div className="px-gutter pt-12 pb-10 sm:px-10 sm:pt-20 sm:pb-14 lg:col-span-8 lg:border-r lg:border-white/10 lg:px-14 lg:pt-28 lg:pb-20">
              <Label>About</Label>
              <h1 className="t-display mt-7 text-balance text-white">
                Practical wisdom,{" "}
                <em className="text-gradient-aurora not-italic">written in code.</em>
              </h1>
              <div className="mt-11">
                <Btn href={placeholders.bookingUrl} size="lg">
                  {about.cta}
                </Btn>
              </div>
            </div>
            <div className="flex items-end border-t border-white/10 px-gutter py-8 sm:px-10 sm:py-10 lg:col-span-4 lg:border-t-0 lg:px-10 lg:py-28">
              <p className="t-lead max-w-md text-venice-200/80">{about.subhead}</p>
            </div>
          </div>
        </section>

        {/* ---- our story ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:px-14 lg:py-20">
            <Opener n={1}>Our story</Opener>
            <div className="max-w-2xl space-y-5 lg:col-span-8">
              {about.story.map((p, i) => (
                <p key={i} className={i === 0 ? "t-lead text-venice-200/88" : "t-body text-venice-200/70"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ---- why "metis" ---- */}
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-ink-950">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-[30%] -z-10 h-[460px] w-[820px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-venice-700)_70%,transparent)_0%,color-mix(in_oklab,var(--color-venice-700)_30%,transparent)_35%,transparent_70%)] opacity-60"
          />
          <div className="mx-auto grid max-w-[1400px] gap-10 px-gutter py-14 sm:px-10 sm:py-20 lg:grid-cols-12 lg:px-14 lg:py-28">
            <div className="lg:col-span-5">
              <div className="h-px w-full bg-white/20" />
              <Label className="mt-4 block text-ember-400">02</Label>
              <h2 className="t-label mt-2 text-venice-300/65">Why &ldquo;Metis&rdquo;</h2>
              <p
                lang="grc"
                aria-hidden="true"
                className="t-editorial mt-8 text-[length:clamp(4.5rem,12vw,9rem)] leading-[0.9] text-white/90 italic"
              >
                μῆτις
              </p>
            </div>
            <div className="lg:col-span-7 lg:pt-12">
              <p className="t-lead max-w-2xl text-venice-200/85">
                {about.name.before}
                <em className="t-editorial text-[length:1.15em] text-white">{about.name.word}</em>
                {about.name.after}
              </p>
              <p className="t-h2 mt-10 text-balance text-white">
                <em className="text-gradient-aurora not-italic">{about.name.motto}</em>
              </p>
            </div>
          </div>
        </section>

        {/* ---- what we believe ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1400px] px-gutter pt-12 pb-8 sm:px-10 sm:pt-16 sm:pb-10 lg:px-14 lg:pt-20">
            <div className="grid gap-8 lg:grid-cols-12">
              <Opener n={3}>What we believe</Opener>
            </div>
          </div>
          <ul className="mx-auto grid max-w-[1400px] gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {about.beliefs.map((b, i) => (
              <li key={b.title} className="bg-ink-1000 px-gutter py-8 sm:px-8 sm:py-10 lg:px-10">
                <Label className="text-ember-400">{String(i + 1).padStart(2, "0")}</Label>
                <h3 className="t-h3 mt-5 text-balance text-white">{b.title}</h3>
                <p className="t-body mt-3 text-venice-200/68">{b.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- why a small studio ---- */}
        <section className="border-b border-white/10 bg-ink-950">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:px-14 lg:py-20">
            <Opener n={4}>Why work with us</Opener>
            <dl className="border-t border-white/10 lg:col-span-8">
              {about.smallStudio.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-2 border-b border-white/10 py-6 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-8"
                >
                  <dt className="t-h3 text-white">{item.title}</dt>
                  <dd className="t-body text-venice-200/70">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- how we work with clients ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1400px] px-gutter pt-12 pb-8 sm:px-10 sm:pt-16 sm:pb-10 lg:px-14 lg:pt-20">
            <div className="grid gap-8 lg:grid-cols-12">
              <Opener n={5}>How we work with clients</Opener>
            </div>
          </div>
          <ol className="mx-auto grid max-w-[1400px] gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {about.steps.map((step, i) => (
              <li key={step.title} className="bg-ink-1000 px-gutter py-8 sm:px-8 sm:py-10 lg:px-10">
                <span className="t-editorial text-[44px] leading-none text-aurora-400/85">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-6 text-white">{step.title}</h3>
                <p className="t-small mt-3 text-venice-200/70">{step.body}</p>
              </li>
            ))}
          </ol>
          {/* How we work — hidden for now.
          <div className="mx-auto max-w-[1400px] border-t border-white/10 px-gutter py-7 sm:px-10 sm:py-8 lg:px-14">
            <TextLink href="/how-we-work">See our full process</TextLink>
          </div>
          */}
        </section>

        <ClosingCta
          heading={
            <>
              Let&apos;s talk about what you&apos;re{" "}
              <em className="text-gradient-aurora not-italic">trying to fix.</em>
            </>
          }
          body={about.closing.body}
          cta={about.closing.cta}
        />
      </main>
      <SiteFooter />
    </>
  );
}
