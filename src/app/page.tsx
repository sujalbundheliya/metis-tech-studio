import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { ServicesSection } from "@/components/sections/services";
import { CostCalculator } from "@/components/sections/cost-calculator";
import { WhyMetis } from "@/components/sections/why";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/stack";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing";
import { OrganizationSchema, FaqSchema, WebsiteSchema } from "@/components/schema";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <FaqSchema />
      <SiteHeader />
      <main id="main">
        <Hero />
        {/* Everything after the hero renders as it nears the viewport —
            see `defer-render` in globals.css. */}
        {[Problem, ServicesSection, CostCalculator, WhyMetis, Process, TechStack, Faq, ClosingCta].map(
          (Section, i) => (
            <div key={i} className="defer-render">
              <Section />
            </div>
          ),
        )}
      </main>
      <SiteFooter />
      {/* Case studies and testimonials are deliberately omitted until they're
          real — see sections 9 and 10 of the content doc. */}
    </>
  );
}
