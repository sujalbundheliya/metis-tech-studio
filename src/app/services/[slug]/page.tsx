import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCta } from "@/components/sections/closing";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Btn, Label } from "@/components/ui/kit";
import { ServiceFaq } from "@/components/service-faq";
import { BreadcrumbSchema, FaqSchema } from "@/components/schema";
import { allServices, practiceGroups, serviceBySlug } from "@/content/services";
import { placeholders, site } from "@/content/site";
import { openGraphBase } from "@/lib/metadata";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: service.titleTag.replace(` | ${site.name}`, ""),
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      ...openGraphBase,
      title: service.titleTag,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const group = practiceGroups.find((g) => g.slug === service.categorySlug);
  const siblings = allServices.filter(
    (s) => s.categorySlug === service.categorySlug && s.slug !== service.slug,
  );
  // "Related" in the source docs is by display name, so match on that
  const related = service.related
    .map((name) => allServices.find((s) => s.name.toLowerCase() === name.toLowerCase()))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const suggestions = related.length > 0 ? related : siblings.slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
        ]}
      />
      {service.faq.length > 0 && <FaqSchema items={service.faq} />}
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
                <Link
                  href={`/services#${service.categorySlug}`}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-aurora-400 can-hover:min-h-0"
                >
                  {service.category}
                </Link>
              </nav>

              <h1 className="t-display mt-7 text-balance text-white">{service.h1}</h1>

              <p className="t-lead mt-7 max-w-2xl text-venice-200/80">{service.subhead}</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Btn href={placeholders.bookingUrl} size="lg">
                  {service.heroCta}
                </Btn>
                <Btn href="/services" variant="outline" size="lg">
                  All services
                </Btn>
              </div>
            </div>

            {/* sibling rail */}
            <aside className="border-t border-white/10 px-gutter py-8 sm:px-10 sm:py-10 lg:col-span-4 lg:border-t-0 lg:px-10 lg:py-24">
              <div className="lg:sticky lg:top-24">
                <Label className="text-venice-300/60">{group?.heading}</Label>
                <p className="t-editorial mt-3 text-[20px] leading-snug text-aurora-400/80 italic">
                  “{group?.question}”
                </p>
                <ul className="mt-6">
                  {siblings.map((s) => (
                    <li key={s.slug} className="border-t border-white/10 last:border-b">
                      <Link
                        href={`/services/${s.slug}`}
                        className="tap-target text-[15px] text-venice-200/65 transition-colors hover:text-white active:text-white can-hover:block can-hover:py-3"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ---- body sections ---- */}
        {service.sections.map((section, i) => (
          <section key={section.heading} className="border-b border-white/10">
            <div className="mx-auto grid max-w-[1400px] gap-8 px-gutter py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:px-14 lg:py-20">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <div className="h-px w-full bg-white/20" />
                  <Label className="mt-4 block text-ember-400">
                    {String(i + 1).padStart(2, "0")}
                  </Label>
                  <h2 className="t-h2 mt-4 text-balance text-white">{section.heading}</h2>
                </div>
              </div>

              <div className="lg:col-span-8">
                {section.kind === "prose" ? (
                  <div className="max-w-2xl space-y-5">
                    {section.paragraphs.map((p, pi) => (
                      <p
                        key={pi}
                        className={
                          pi === 0
                            ? "t-lead text-venice-200/85"
                            : "t-body text-venice-200/70"
                        }
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ) : (
                  <>
                    {section.intro && (
                      <p className="t-lead mb-8 max-w-2xl text-venice-200/80">{section.intro}</p>
                    )}
                    <dl className="border-t border-white/10">
                      {section.items.map((item) => (
                        <div
                          key={item.term}
                          className="group grid gap-2 border-b border-white/10 py-6 transition-colors duration-200 hover:bg-white/[0.03] md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-8"
                        >
                          <dt className="t-h3 text-white transition-colors group-hover:text-aurora-300">
                            {item.term}
                          </dt>
                          <dd className="t-body text-venice-200/70">{item.body}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* ---- FAQ ---- */}
        {service.faq.length > 0 && <ServiceFaq items={service.faq} />}

        {/* ---- related ---- */}
        {suggestions.length > 0 && (
          <section className="border-b border-white/10 bg-ink-950">
            <div className="mx-auto max-w-[1400px] px-gutter pt-10 pb-5 sm:px-10 sm:pt-14 sm:pb-6 lg:px-14">
              <div className="h-px w-full bg-white/20" />
              <Label className="mt-4 block">Related services</Label>
            </div>
            <div className="mx-auto grid max-w-[1400px] border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className={`group block px-gutter py-7 transition-colors duration-200 hover:bg-white/[0.05] active:bg-white/[0.07] sm:px-8 sm:py-9 lg:px-10 ${
                    i > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""
                  } ${i === 2 ? "sm:border-t sm:border-l-0 lg:border-t-0 lg:border-l" : ""}`}
                >
                  <Label className="text-venice-300/55">{s.category}</Label>
                  <p className="t-h3 mt-3 text-white transition-colors group-hover:text-aurora-300">
                    {s.name}
                  </p>
                  <p className="t-small mt-3 text-venice-200/62">{s.subhead}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ClosingCta
          heading={
            <>
              Tell us what you&apos;re{" "}
              <em className="text-gradient-aurora not-italic">trying to build.</em>
            </>
          }
          cta={service.closingCta}
        />
      </main>
      <SiteFooter />
    </>
  );
}
