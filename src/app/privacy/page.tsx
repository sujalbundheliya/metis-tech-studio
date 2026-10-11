import { SimplePage, Legal } from "@/components/simple-page";
import { BreadcrumbSchema } from "@/components/schema";
import { placeholders, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} handles the personal data you send us: what we collect, why, who processes it, and how to have it deleted.`,
  path: "/privacy",
});

/**
 * ⚠️  NOT LEGAL ADVICE. This describes what the site actually does today —
 * one contact form delivered by email, Google Analytics, and Vercel's
 * cookieless analytics — which makes it accurate but generic. Have a solicitor
 * review it, and revisit it the moment you add a CRM, ad pixels, or another
 * analytics tool.
 */
const SECTIONS = [
  {
    heading: "Who we are",
    body: [
      `${site.name} is a two-person product engineering studio. You can reach us at ${placeholders.email} about anything in this policy, including a request to delete what we hold about you.`,
      placeholders.location
        ? `We are based in ${placeholders.location}.`
        : "Our registered address is available on request.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "Only what you type into the contact form: your name, email address, and — if you choose to provide them — your company, an approximate budget band, the services you're interested in, and your message.",
      "We use Google Analytics to understand how people find and use the site. It sets cookies (named _ga and _ga_ followed by an ID) that recognise your browser on return visits, and records things like the pages you view, the site that referred you, your approximate location, and your browser and device type. We see this as reports, not as a record of who you are. You can block these cookies in your browser settings, or opt out with Google's browser add-on at tools.google.com/dlpage/gaoptout.",
      "We also use Vercel Web Analytics and Vercel Speed Insights to count visits and measure how quickly pages load. Neither sets cookies or identifies you.",
      "We don't run advertising pixels, and the Google Analytics cookies above are the only cookies this site sets.",
      "Vercel, our hosting provider, keeps standard server logs, which include IP addresses, for security and abuse prevention. We use your IP address only to rate-limit the contact form.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "To reply to your enquiry and, if it goes further, to scope and carry out work for you. That is the only purpose.",
      "We do not sell your data, share it with advertisers, or add you to a marketing list. There is no newsletter and no automated sequence.",
    ],
  },
  {
    heading: "Who else sees it",
    body: [
      "Your submission is delivered to our inbox by Resend, our transactional email provider, which processes it on our behalf. Our email is hosted by our mail provider. Vercel hosts this site and provides the speed and visit counts described above. Google provides Google Analytics; how Google uses data from sites like this one is set out at policies.google.com/technologies/partner-sites.",
      "Resend, Vercel and Google are based in the United States, so your information may be stored or processed there.",
      "We do not otherwise disclose your information, except where we are legally required to.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries that don't become projects are deleted within 24 months. Project correspondence is kept for as long as we have a contractual or tax obligation to keep it, and deleted after that.",
      `Ask us to delete your data sooner and we will, unless we're legally required to retain it. Email ${placeholders.email}.`,
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access the personal data we hold about you, correct it, delete it, restrict or object to how we use it, and receive a copy in a portable format.",
      `Exercise any of these by emailing ${placeholders.email}. We'll respond within one month. If you're unhappy with our response, you can complain to the data protection authority where you live.`,
    ],
  },
  {
    heading: "Security",
    body: [
      "The site is served over HTTPS, and form submissions are transmitted encrypted. Client code, models and infrastructure live in our clients' own accounts rather than ours, which limits what we hold in the first place.",
      "No system is perfectly secure. If you believe you've found a vulnerability in this site, please email us rather than disclosing it publicly, and we'll respond promptly.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If we change this policy we'll update the date at the top of this page. Material changes affecting data we already hold will be notified by email where we have an address for you.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }]} />
      <SimplePage
        label="Legal"
        title="Privacy Policy"
        intro="What we collect, why, and how to make us delete it. Short, because we collect very little."
        updated="11 October 2026"
      >
        <Legal sections={SECTIONS} />
      </SimplePage>
    </>
  );
}
