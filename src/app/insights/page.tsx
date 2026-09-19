import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/simple-page";
import { Label, TextLink } from "@/components/ui/kit";
import { BreadcrumbSchema } from "@/components/schema";
import { allServices } from "@/content/services";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on building software and AI systems that survive contact with real users. Writing from the two engineers doing the work.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  // No posts yet. Rather than fake a blog, point at the substantive writing
  // that already exists on the service pages.
  const starting = allServices.slice(0, 6);

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", url: "/" }, { name: "Insights", url: "/insights" }]} />
      <SimplePage
        label="Insights"
        title={
          <>
            Notes from{" "}
            <em className="text-gradient-aurora not-italic">the build.</em>
          </>
        }
        intro="We write when we have something specific to say — usually after a project taught us something we didn't expect. No posting schedule, no SEO filler."
        withCta
      >
        <div className="border border-dashed border-white/18 bg-white/[0.02] p-8 sm:p-12">
          <Label className="text-ember-400">Nothing published yet</Label>
          <h2 className="t-h2 mt-4 max-w-2xl text-balance text-white">
            The first piece is being written.
          </h2>
          <p className="t-body mt-5 max-w-2xl text-venice-200/70">
            We&apos;d rather publish nothing than publish filler. In the meantime, the
            service pages carry the actual arguments — how we think about evaluation
            sets, why most AI pilots stall, what makes a data pipeline trustworthy.
          </p>
          <div className="mt-7">
            <TextLink href="/services">Read the service pages</TextLink>
          </div>
        </div>

        <div className="mt-14">
          <Label className="text-venice-300/60">Start here</Label>
          <ul className="mt-5 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {starting.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block h-full border border-white/10 p-6 transition-colors duration-200 hover:border-white/22 hover:bg-white/[0.04]"
                >
                  <Label className="text-venice-300/50">{s.category}</Label>
                  <p className="t-h3 mt-3 text-white transition-colors group-hover:text-aurora-300">
                    {s.name}
                  </p>
                  <p className="t-small mt-3 text-venice-200/62">{s.subhead}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SimplePage>
    </>
  );
}
