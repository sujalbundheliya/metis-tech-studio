import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Label } from "@/components/ui/kit";
import { ClosingCta } from "@/components/sections/closing";

export function SimplePage({
  label,
  title,
  intro,
  updated,
  children,
  withCta = false,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
  withCta?: boolean;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="relative border-b border-white/10">
          <Atmosphere bloom="top-left" intensity="soft" beam={false} />
          <div className="relative mx-auto max-w-[1400px] px-6 pt-20 pb-12 sm:px-10 lg:px-14 lg:pt-28">
            <Label>{label}</Label>
            <h1 className="t-display mt-7 max-w-4xl text-balance text-white">{title}</h1>
            {intro && <p className="t-lead mt-7 max-w-2xl text-venice-200/80">{intro}</p>}
            {updated && (
              <p className="t-label mt-8 text-venice-300/45">Last updated {updated}</p>
            )}
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            {children}
          </div>
        </section>

        {withCta && <ClosingCta />}
      </main>
      <SiteFooter />
    </>
  );
}

/** Legal prose block — headings and paragraphs with a readable measure. */
export function Legal({ sections }: { sections: { heading: string; body: string[] }[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <nav aria-label="On this page" className="lg:col-span-4">
        <div className="lg:sticky lg:top-24">
          <Label className="text-venice-300/60">On this page</Label>
          <ol className="mt-4">
            {sections.map((s, i) => (
              <li key={s.heading} className="border-t border-white/10 last:border-b">
                <a
                  href={`#s${i + 1}`}
                  className="flex gap-3 py-2.5 text-[15px] text-venice-200/65 transition-colors hover:text-white"
                >
                  <span className="t-label shrink-0 pt-1 text-venice-300/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="lg:col-span-8">
        {sections.map((s, i) => (
          <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-24 border-t border-white/10 py-9 first:border-t-0 first:pt-0">
            <h2 className="t-h3 text-white">{s.heading}</h2>
            <div className="mt-4 max-w-2xl space-y-4">
              {s.body.map((p, pi) => (
                <p key={pi} className="t-body text-venice-200/70">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
