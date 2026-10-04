import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/simple-page";
import { Label, TextLink } from "@/components/ui/kit";
import { BreadcrumbSchema } from "@/components/schema";
import { practiceHref, practices } from "@/content/services";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on building software and AI systems that survive contact with real users. Writing from the two engineers doing the work.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  // No posts yet. Rather than fake a blog, point at the substantive writing
  // that already exists on the practice pages.

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
            service pages carry the actual arguments — how we measure an AI system
            before launch, when an agent should stop and ask, and why we choose boring
            technology on purpose.
          </p>
          <div className="mt-7">
            <TextLink href="/services">Read the service pages</TextLink>
          </div>
        </div>

        <div className="mt-14">
          <Label className="text-venice-300/60">Start here</Label>
          <ul className="mt-5 grid gap-px md:grid-cols-3">
            {practices.map((p) => (
              <li key={p.slug}>
                <Link
                  href={practiceHref(p)}
                  className="group block h-full border border-white/10 p-6 transition-colors duration-200 hover:border-white/22 hover:bg-white/[0.04]"
                >
                  <Label className="text-venice-300/50">{p.number}</Label>
                  <p className="t-h3 mt-3 text-white transition-colors group-hover:text-aurora-300">
                    {p.name}
                  </p>
                  <p className="t-small mt-3 text-venice-200/62">{p.subhead}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SimplePage>
    </>
  );
}
