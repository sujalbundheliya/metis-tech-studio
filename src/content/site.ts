/* ============================================================================
   SITE CONTENT — single source of truth for the homepage.
   Copy is taken verbatim from metis-tech-studio-website-content-home.md.

   ⚠️  PLACEHOLDERS — everything in `placeholders` below is unverified.
       Replace before publishing. Nothing here is invented as fact: where a
       real value is unknown, the UI omits the element rather than faking it.

   Section headings are NOT here. Every one of them carries an inline accent
   span (`<em class="text-gradient-aurora">`) that decides where the gradient
   phrase starts, which is markup, not copy — so the headline lives in the
   section component beside the styling that shapes it. Keeping a second plain
   copy here only created two versions to edit and one that silently did
   nothing. Everything else on a section — eyebrow, intro, body, items — is
   here and is the single source of truth.
   ========================================================================== */

export const placeholders = {
  /** TODO: real inbox */
  email: "hello@metistechstudio.com",
  /** TODO: real number, or leave null to hide the row entirely */
  phone: null as string | null,
  /** TODO: e.g. "Ahmedabad, India" — leave null to hide */
  location: null as string | null,
  /** TODO: regions served, e.g. "India, UK and the EU" */
  regions: null as string | null,
  /** TODO: founder names for the FAQ */
  founderA: null as string | null,
  founderB: null as string | null,
  /** TODO: pricing bands — null renders the honest fallback sentence */
  pricing: {
    mvp: null as string | null,
    platform: null as string | null,
    aiPilot: null as string | null,
  },
  /** TODO: real profiles. Null hides the icon — `#` rendered a link that
   *  opened a blank tab onto the same page, which is worse than no link. */
  linkedin: null as string | null,
  github: null as string | null,
  /** TODO: real scheduling link (Cal.com / Calendly) */
  bookingUrl: "/contact",
} as const;

export const site = {
  name: "Metis Tech Studio",
  shortName: "Metis",
  tagline: "Practical intelligence, engineered.",
  url: "https://metistechstudio.com", // TODO: real domain
  title: "Metis Tech Studio — Web, App & AI Development",
  description:
    "Product engineering studio building web platforms, mobile apps, and AI systems. Founder-built, fixed scope, code you own. Book a free consultation.",
} as const;

/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                  */
/* -------------------------------------------------------------------------- */

import { practiceGroups } from "./services";

export type NavService = { label: string; href: string };
export type NavServiceGroup = { heading: string; question: string; items: NavService[] };

/** Derived from services.ts — every href resolves to a real page. */
export const serviceGroups: NavServiceGroup[] = practiceGroups;

export const navLinks = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "How we work", href: "/how-we-work", hasDropdown: false },
  { label: "About", href: "/about", hasDropdown: false },
  { label: "Contact", href: "/contact", hasDropdown: false },
] as const;

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "A product engineering studio",
  subhead:
    "Metis Tech Studio builds web platforms, mobile apps, and AI systems. We're two engineers, which means the people you meet in the first call are the people writing the code in the last one.",
  primaryCta: "Book a free consultation",
  secondaryCta: "See how we work",
} as const;

/** Launch version — no invented statistics, no unearned logos. */
export const trustSignals = [
  "Founder-built",
  "Fixed-price scopes",
  "Code and IP yours from day one",
  "Reply within one business day",
] as const;

/* -------------------------------------------------------------------------- */
/* PROBLEM                                                                     */
/* -------------------------------------------------------------------------- */

export const problem = {
  gaps: [
    { left: "The agency that designed it", right: "The developers who built it" },
    { left: "The prototype that demoed beautifully", right: "The version that met real traffic" },
    { left: "The AI pilot that impressed the board", right: "The system nobody could productionise" },
  ],
  body: "We work end to end specifically to close those gaps. Design, engineering, data, and deployment sit in the same two heads, in the same conversations, from day one.",
} as const;

/* -------------------------------------------------------------------------- */
/* SERVICES                                                                    */
/* -------------------------------------------------------------------------- */

export type Practice = {
  number: string;
  name: string;
  headline: string;
  body: string;
  tags: string[];
  cta: string;
  href: string;
  glyph: "neural" | "stack" | "flow" | "pipeline";
};

export const services = {
  eyebrow: "What we do",
  intro:
    "From a first release to an AI system running against live data. Most projects touch two or three of these, which is exactly why having them under one roof matters.",
  practices: [
    {
      number: "01",
      name: "AI & ML",
      headline: "AI that does a job, not a demo.",
      body: "Generative AI, autonomous agents, and custom machine learning models trained on your data. We start by finding the task worth automating, then build the narrowest thing that solves it well.",
      tags: ["Generative AI", "AI agents", "Machine learning models", "Computer vision", "NLP"],
      cta: "Explore AI & ML",
      href: "/services#ai-ml",
      glyph: "neural",
    },
    {
      number: "02",
      name: "Software Development",
      headline: "Web and mobile products built to last.",
      body: "Custom web applications, iOS and Android apps, and the platforms underneath them. Built on modern, boring, maintainable foundations, so the next developer to open the repo doesn't have to start over.",
      tags: ["Web apps", "Mobile apps", "Custom software", "SaaS", "APIs"],
      cta: "Explore software development",
      href: "/services#software",
      glyph: "stack",
    },
    {
      number: "03",
      name: "Intelligent Systems",
      headline: "Automation wired into the tools you already use.",
      body: "Chatbots and assistants, document processing, and workflow automation connected to your real systems — with guardrails, approval steps, and an audit trail.",
      tags: ["Chatbots & assistants", "Document processing", "Workflow automation", "Knowledge search"],
      cta: "Explore intelligent systems",
      href: "/services#intelligent-systems",
      glyph: "flow",
    },
    {
      number: "04",
      name: "Data & Cloud",
      headline: "The plumbing that makes the rest work.",
      body: "Data pipelines, analytics, predictive models, and the cloud infrastructure to run them. Including the part most projects skip: monitoring what happens after deployment.",
      tags: ["Data engineering", "Analytics", "Predictive models", "MLOps", "Cloud & DevOps"],
      cta: "Explore data & cloud",
      href: "/services#data-cloud",
      glyph: "pipeline",
    },
  ] satisfies Practice[],
} as const;

/* -------------------------------------------------------------------------- */
/* WHY METIS                                                                   */
/* -------------------------------------------------------------------------- */

export const whyMetis = {
  eyebrow: "Why Metis",
  reasons: [
    {
      title: "The people who sell it, build it.",
      body: "No account layer. No handoff document. The founders in your kickoff call are the ones writing the code.",
      icon: "users",
    },
    {
      title: "Your project is our reputation.",
      body: "We're a young studio taking on a handful of clients at a time. Your project isn't one of two hundred on a delivery board — it's one of the few that decides whether this company exists in five years. Nobody at a larger firm has that much riding on your outcome.",
      icon: "shield",
    },
    {
      title: "We tell you when not to build.",
      body: "Sometimes the honest answer is an off-the-shelf tool and a two-day integration. We'd rather say so and keep the relationship.",
      icon: "compass",
    },
    {
      title: "You own everything.",
      body: "Source code, models, infrastructure, documentation, and IP transfer to you. Your repository from the first commit. No lock-in, no proprietary black boxes.",
      icon: "key",
    },
    {
      title: "Weekly working software.",
      body: "Every week you see something running. Not a status update, not a slide. Working software is the only honest progress report.",
      icon: "activity",
    },
    {
      title: "Built to be maintained.",
      body: "Documented, tested, and handed over properly — whether we stay on or your team takes it forward.",
      icon: "wrench",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* PROCESS                                                                     */
/* -------------------------------------------------------------------------- */

export const process = {
  eyebrow: "How we work",
  intro:
    "Four phases. You know what's happening, what it costs, and what comes next at every stage.",
  phases: [
    {
      number: "01",
      name: "Discover",
      subtitle: "Understand the actual problem",
      body: "We map your workflows, talk to the people doing the work, and audit the data and systems you already have. You get a written scope with a fixed price and timeline before anyone writes code.",
      duration: "Typically 1–2 weeks",
    },
    {
      number: "02",
      name: "Design",
      subtitle: "Architect it properly",
      body: "Interface design, system architecture, and data flow decided together. We prototype the risky parts first — the ones that would blow up the timeline if we found them in month three.",
      duration: "Typically 2–3 weeks",
    },
    {
      number: "03",
      name: "Build",
      subtitle: "Ship in weekly increments",
      body: "Two-week sprints with a working demo at the end of each. You test real software as it's built, and change direction while changing direction is still cheap.",
      duration: "Varies by scope",
    },
    {
      number: "04",
      name: "Launch & support",
      subtitle: "Deploy, monitor, improve",
      body: "We handle deployment, monitoring, and handover documentation. Then we either stay on a support retainer or train your team to take it from here.",
      duration: "Ongoing",
    },
  ],
  cta: "See our full process",
} as const;

/* -------------------------------------------------------------------------- */
/* TECH STACK                                                                  */
/* -------------------------------------------------------------------------- */

export const techStack = {
  intro:
    "We choose boring, well-supported technology on purpose. It's cheaper to maintain and easier to hire for.",
  // TODO: trim any item you can't discuss in depth on a first call.
  groups: [
    { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { label: "Backend", items: ["Node.js", "Python", "FastAPI", "Django"] },
    { label: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
    {
      label: "AI & ML",
      items: ["PyTorch", "scikit-learn", "Hugging Face", "LangChain", "OpenAI", "Anthropic", "Vector databases"],
    },
    { label: "Data", items: ["PostgreSQL", "MongoDB", "Airflow", "dbt"] },
    { label: "Cloud", items: ["AWS", "Google Cloud", "Docker", "GitHub Actions"] },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

const teamAnswer = (() => {
  const { founderA, founderB } = placeholders;
  const names = founderA && founderB ? `${founderA} and ${founderB}` : "The two founders";
  return `Two. ${names} founded the studio and do the building themselves, bringing in trusted specialists for things like design or security review. It means we run fewer projects than a larger firm, and that the two people accountable for your project are the two writing the code. If your project needs a team of fifteen, we'll tell you on the first call and point you somewhere better.`;
})();

const costAnswer = (() => {
  const { mvp, platform, aiPilot } = placeholders.pricing;
  if (mvp && platform && aiPilot) {
    return `It depends on scope, but for planning: a focused MVP typically runs ${mvp}, a full platform build ${platform}, and an AI pilot ${aiPilot}. We give you a fixed price after discovery, before any code is written. No hourly surprises.`;
  }
  return "It depends on scope. Discovery produces a written scope with a fixed price and a date, and that number doesn't move unless you change the scope. Tell us roughly what you have in mind on a first call and we'll give you a realistic band before you commit to anything.";
})();

const locationAnswer = (() => {
  const { location, regions } = placeholders;
  if (location && regions) {
    return `We're based in ${location} and work with clients across ${regions}. Most delivery is remote, with on-site sessions for discovery and key milestones.`;
  }
  return "Most delivery is remote, with on-site sessions for discovery and key milestones. Tell us where you are and we'll work out the overlap.";
})();

export const faq = {
  eyebrow: "Questions",
  items: [
    { q: "How much does a project cost?", a: costAnswer },
    {
      q: "How long will it take?",
      a: "Most first releases ship in 8–16 weeks. Discovery takes one to two weeks, and you'll have a firm timeline at the end of it.",
    },
    { q: "How big is your team?", a: teamAnswer },
    {
      q: "We already have a development team. Can you work alongside them?",
      a: "Yes. We take on specific workstreams, embed with in-house teams, and do hands-on architecture reviews. It's a common way to start.",
    },
    {
      q: "Who owns the code?",
      a: "You do. Source code, IP, models, and infrastructure transfer to you, and it lives in your repository from the first commit. We'll sign an NDA before the first call if you'd like.",
    },
    {
      q: "Do you only do AI projects?",
      a: "No. Plenty of our work is straightforward web and mobile development. We'll tell you honestly if AI isn't the right answer for your problem.",
    },
    { q: "Where are you based?", a: locationAnswer },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* CLOSING CTA                                                                 */
/* -------------------------------------------------------------------------- */

export const closingCta = {
  body: "A 30-minute call, no charge and no pitch deck. Describe the problem and we'll tell you how we'd approach it, roughly what it costs, and whether we're the right team for it. If we're not, we'll say so.",
  cta: "Book a call",
} as const;

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                      */
/* -------------------------------------------------------------------------- */

export const footer = {
  columns: [
    {
      heading: "AI & ML",
      links: practiceGroups[0].items,
    },
    {
      heading: "Software",
      links: practiceGroups[1].items,
    },
    {
      heading: "Intelligent Systems",
      links: [...practiceGroups[2].items, { label: "All services →", href: "/services" }],
    },
    {
      heading: "Data & Cloud",
      links: practiceGroups[3].items,
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "How we work", href: "/how-we-work" },
        { label: "Insights", href: "/insights" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
} as const;
