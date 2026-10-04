import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCta } from "@/components/sections/closing";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Btn, Label } from "@/components/ui/kit";
import { ServiceFaq } from "@/components/service-faq";
import { HashLanding } from "@/components/hash-landing";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/components/schema";
import { practiceBySlug, practiceHref, practices } from "@/content/services";
import { placeholders, site } from "@/content/site";
import { openGraphBase } from "@/lib/metadata";

export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practice = practiceBySlug(slug);
  if (!practice) return {};
  return {
    title: practice.titleTag.replace(` | ${site.name}`, ""),
    description: practice.metaDescription,
    alternates: { canonical: practiceHref(practice) },
    openGraph: {
      ...openGraphBase,
      title: practice.titleTag,
      description: practice.metaDescription,
      url: `${site.url}${practiceHref(practice)}`,
      type: "website",
    },
  };
}

/** Section opener for the two-column bands: rule, ember number, heading. */
function SectionHead({ n, title, sticky = true }: { n: number; title: string; sticky?: boolean }) {
  return (
    <div className={sticky ? "lg:sticky lg:top-24" : undefined}>
      <div className="h-px w-full bg-white/20" />
      <Label className="mt-4 block text-ember-400">{String(n).padStart(2, "0")}</Label>
      <h2 className="t-h2 mt-4 text-balance text-white">{title}</h2>
    </div>
  );
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice = practiceBySlug(slug);
  if (!practice) notFound();

  const others = practices.filter((p) => p.slug !== practice.slug);
  const { headline } = practice;

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: practice.name, url: practiceHref(practice) },
        ]}
      />
      <ServiceSchema practice={practice} />
      <FaqSchema items={practice.faq} />
      <HashLanding />
      <SiteHeader />

      <main id="main">
        {/* ---- hero ---- */}
        <section className="relative border-b border-white/10">
          <Atmosphere bloom="top-left" intensity="soft" />
          <div className="relative mx-auto grid max-w-[1400px] lg:grid-cols-12">
            <div className="px-gutter pt-12 pb-10 sm:px-10 sm:pt-16 sm:pb-12 lg:col-span-8 lg:border-r lg:border-white/10 lg:px-14 lg:pt-24 lg:pb-16">
              <nav aria-label="Breadcrumb" className="t-label flex min-h-11 flex-wrap items-center gap-2 text-venice-300/55 can-hover:min-h-0">
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-aurora-400 can-hover:min-h-0"
                >
                  Services
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-venice-300/80">
                  {practice.name}
                </span>
              </nav>

              <h1 className="t-display mt-7 text-balance text-white">
                {headline.lead}
                <em className="text-gradient-aurora not-italic">{headline.accent}</em>
                {headline.tail}
              </h1>

              <p className="t-lead mt-7 max-w-2xl text-venice-200/80">{practice.subhead}</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Btn href={placeholders.bookingUrl} size="lg">
                  Book a free consultation
                </Btn>
                {/* How we work — hidden for now.
                <Btn href="/how-we-work" variant="outline" size="lg">
                  See how we work
                </Btn>
                */}
              </div>
            </div>

            {/* On-page index. Below `lg` the services grid follows the intro
                almost immediately, so a second list of the same eight links
                would only push the content a screen further down. */}
            <aside className="hidden px-10 py-24 lg:col-span-4 lg:block">
              <div className="lg:sticky lg:top-24">
                <Label className="text-venice-300/60">
                  Practice {practice.number} / {String(practices.length).padStart(2, "0")}
                </Label>
                <p className="t-editorial mt-3 text-[20px] leading-snug text-aurora-400/80 italic">
                  “{practice.question}”
                </p>
                <ul className="mt-6">
                  {practice.services.map((s) => (
                    <li key={s.id} className="border-t border-white/10 last:border-b">
                      <a
                        href={`#${s.id}`}
                        className="block py-2.5 text-[15px] text-venice-200/65 transition-colors hover:text-white"
                      >
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ---- 01 overview ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:px-14 lg:py-20">
            <div className="lg:col-span-4">
              <div className="h-px w-full bg-white/20" />
              <Label className="mt-4 block text-ember-400">01</Label>
              <h2 className="t-label mt-2 text-venice-300/65">Overview</h2>
            </div>
            <div className="max-w-2xl space-y-5 lg:col-span-8">
              {practice.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "t-lead text-venice-200/88" : "t-body text-venice-200/70"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ---- 02 what we build ---- */}
        <section className="border-b border-white/10 bg-ink-950">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter pt-12 pb-10 sm:px-10 sm:pt-16 sm:pb-12 lg:grid-cols-12 lg:px-14 lg:pt-20">
            <div className="lg:col-span-4">
              <SectionHead n={2} title="What we build" sticky={false} />
            </div>
          </div>
          {/* Hairlines are the 1px gaps showing the grid's own background, so
              the rules stay correct at every column count without per-cell
              border arithmetic. */}
          <ul className="mx-auto grid max-w-[1400px] gap-px border-t border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {practice.services.map((s, i) => (
              <li key={s.id} id={s.id} className="bg-ink-950 px-gutter py-8 sm:px-8 sm:py-10 lg:px-10">
                <Label className="text-venice-300/50">{String(i + 1).padStart(2, "0")}</Label>
                <h3 className="t-h3 mt-4 text-white">{s.name}</h3>
                <p className="t-small mt-3 text-venice-200/68">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- 03 where it fits ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter pt-12 pb-10 sm:px-10 sm:pt-16 sm:pb-12 lg:grid-cols-12 lg:px-14 lg:pt-20">
            <div className="lg:col-span-4">
              <SectionHead n={3} title="Where it fits" sticky={false} />
            </div>
          </div>
          <ul className="mx-auto grid max-w-[1400px] gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {practice.useCases.map((u) => (
              <li key={u.who} className="bg-ink-1000 px-gutter py-8 sm:px-8 sm:py-10 lg:px-10">
                <p className="t-label text-aurora-400">{u.who}</p>
                <p className="t-body mt-4 text-venice-200/72 first-letter:uppercase">{u.what}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- 04 how we build it ---- */}
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:px-14 lg:py-20">
            <div className="lg:col-span-4">
              <SectionHead n={4} title="How we build it" />
            </div>
            <div className="lg:col-span-8">
              <dl className="border-t border-white/10">
                {practice.principles.map((item) => (
                  <div
                    key={item.term}
                    className="grid gap-2 border-b border-white/10 py-6 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-8"
                  >
                    <dt className="t-h3 text-white">{item.term}</dt>
                    <dd className="t-body text-venice-200/70">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---- 05 tech stack ---- */}
        <section className="border-b border-white/10 bg-ink-950">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:px-14 lg:py-20">
            <div className="lg:col-span-4">
              <SectionHead n={5} title="Tech stack" />
            </div>
            <div className="lg:col-span-8">
              <dl className="border-t border-white/10">
                {practice.stack.map((group) => (
                  <div
                    key={group.label}
                    className="grid gap-2 border-b border-white/10 py-5 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-8"
                  >
                    <dt className="t-label pt-1 text-venice-300/65">{group.label}</dt>
                    <dd className="t-body text-venice-200/78">{group.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <ServiceFaq items={practice.faq} />

        {/* ---- other practices ---- */}
        <section className="border-b border-white/10 bg-ink-950">
          <div className="mx-auto max-w-[1400px] px-gutter pt-10 pb-5 sm:px-10 sm:pt-14 sm:pb-6 lg:px-14">
            <div className="h-px w-full bg-white/20" />
            <Label className="mt-4 block">Other practices</Label>
          </div>
          <div className="mx-auto grid max-w-[1400px] gap-px border-t border-white/10 bg-white/10 md:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={practiceHref(p)}
                className="group block bg-ink-950 px-gutter py-8 transition-colors duration-200 hover:bg-ink-900 active:bg-ink-900 sm:px-10 sm:py-10 lg:px-14"
              >
                <Label className="text-ember-400">{p.number}</Label>
                <Label className="ml-3 text-venice-300/60">{p.name}</Label>
                <p className="t-h3 mt-4 max-w-lg text-balance text-white transition-colors group-hover:text-aurora-300">
                  {p.headline.lead}
                  {p.headline.accent}
                  {p.headline.tail}
                </p>
                <p className="t-small mt-3 max-w-xl text-venice-200/62">{p.subhead}</p>
              </Link>
            ))}
          </div>
        </section>

        <ClosingCta
          heading={
            <>
              {practice.closing.heading.lead}
              <em className="text-gradient-aurora not-italic">{practice.closing.heading.accent}</em>
            </>
          }
          body={practice.closing.body}
          cta={practice.closing.cta}
        />
      </main>
      <SiteFooter />
    </>
  );
}
