import type { Metadata } from "next";
import { SimplePage, Legal } from "@/components/simple-page";
import { BreadcrumbSchema } from "@/components/schema";
import { placeholders, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms covering use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

/**
 * ⚠️  NOT LEGAL ADVICE. These cover use of the website only — they are not the
 * terms of any client engagement, which are set out in a separate signed
 * contract. Have a solicitor review before launch.
 */
const SECTIONS = [
  {
    heading: "These terms",
    body: [
      `These terms cover your use of the ${site.name} website. They are not the terms of any engagement with us — work we do for clients is governed by a separate written agreement signed by both parties.`,
      "By using this site you accept these terms. If you don't accept them, please don't use the site.",
    ],
  },
  {
    heading: "What's on this site",
    body: [
      "The pages here describe services we offer and how we approach them. They are written to be useful, not exhaustive, and they don't constitute professional advice or a binding offer.",
      "Timelines, budget bands and technical descriptions are indicative. The numbers that bind us appear in a written scope, agreed after discovery and before any code is written.",
    ],
  },
  {
    heading: "Using the contact form",
    body: [
      "Send us a genuine enquiry. Don't use the form to transmit unlawful, abusive or infringing material, to attempt to disrupt the site, or to send automated or bulk messages.",
      "Please don't send confidential information through the form. If your enquiry is sensitive, say so and we'll sign an NDA before you tell us the details.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      `The text, design, code and marks on this site belong to ${site.name} unless stated otherwise. You may read, quote and link to it with attribution; you may not republish it wholesale or present it as your own.`,
      "For work we deliver to clients, the position is the opposite and is set out in the engagement contract: source code, models, infrastructure, documentation and IP transfer to the client.",
    ],
  },
  {
    heading: "Links to other sites",
    body: [
      "We link to third-party sites where they're useful. We don't control them and aren't responsible for their content, availability or privacy practices.",
    ],
  },
  {
    heading: "Availability and liability",
    body: [
      "We try to keep the site available and accurate, but we provide it \"as is\" and don't guarantee that it will be uninterrupted or error-free.",
      "To the extent the law allows, we're not liable for indirect or consequential loss arising from your use of this site. Nothing here limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We may update these terms; the date at the top of this page shows when they last changed. Continuing to use the site means you accept the current version.",
      `Questions about these terms: ${placeholders.email}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", url: "/" }, { name: "Terms of Service", url: "/terms" }]} />
      <SimplePage
        label="Legal"
        title="Terms of Service"
        intro="These cover use of this website. Client work is governed by a separate signed agreement."
        updated="19 September 2026"
      >
        <Legal sections={SECTIONS} />
      </SimplePage>
    </>
  );
}
