import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Btn, Label } from "@/components/ui/kit";
import { practiceGroups } from "@/content/services";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="relative border-b border-white/10">
          <Atmosphere bloom="top-center" />
          <div className="relative mx-auto max-w-[1400px] px-gutter pt-16 pb-14 sm:px-10 sm:pt-24 sm:pb-20 lg:px-14 lg:pt-32 lg:pb-28">
            <Label className="text-ember-400">Error 404</Label>
            <h1 className="t-display mt-7 max-w-3xl text-balance text-white">
              That page{" "}
              <em className="text-gradient-aurora not-italic">doesn&apos;t exist.</em>
            </h1>
            <p className="t-lead mt-7 max-w-2xl text-venice-200/80">
              Either it moved or the link was wrong. Nothing here is your fault — here&apos;s
              the way back.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Btn href="/" size="lg">Back to the homepage</Btn>
              <Btn href="/services" variant="outline" size="lg">Browse all services</Btn>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1400px] px-gutter pt-12 pb-4 sm:px-10 lg:px-14">
            <Label className="text-venice-300/60">Four practices</Label>
          </div>
          <div className="mx-auto grid max-w-[1400px] border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {practiceGroups.map((group, i) => (
              <Link
                key={group.slug}
                href={`/services#${group.slug}`}
                className={`group px-gutter py-9 transition-colors duration-200 hover:bg-white/[0.05] sm:px-8 ${
                  i > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""
                } ${i === 2 ? "sm:border-t sm:border-l-0 lg:border-t-0 lg:border-l" : ""} ${
                  i === 3 ? "sm:border-t lg:border-t-0" : ""
                }`}
              >
                <p className="t-h3 text-white transition-colors group-hover:text-aurora-300">
                  {group.heading}
                </p>
                <p className="t-small mt-2 text-venice-300/60">{group.items.length} services</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
