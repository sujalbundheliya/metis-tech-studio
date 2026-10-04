/* ============================================================================
   PRACTICE PAGES — generated from sys-info/services.md.
   Three practices, eight services each. Copy is verbatim from that document;
   bracketed placeholders in it are resolved as noted inline (search "TODO").

   This replaces the earlier 22-service, four-category structure. Every old
   `/services/<slug>` URL is permanently redirected in next.config.ts to the
   closest practice page or section, so inbound links keep working.

   Regenerate rather than hand-editing: the source of truth is the markdown.
   ========================================================================== */

export type PracticeService = {
  /** Anchor id on the practice page — nav, footer and redirects deep-link here. */
  id: string;
  name: string;
  /** Shorter label for the nav and footer, where the full name would wrap. */
  navLabel?: string;
  body: string;
};

export type Practice = {
  slug: string;
  number: string;
  name: string;
  /** The question this practice answers — leads the dropdown and index. */
  question: string;
  glyph: "neural" | "stack" | "flow" | "pipeline";
  /** Short chips for the homepage card. */
  tags: string[];
  titleTag: string;
  metaDescription: string;
  /** The H1, split so the accent phrase can carry the gradient. */
  headline: { lead: string; accent: string; tail?: string };
  subhead: string;
  intro: string[];
  services: PracticeService[];
  useCases: { who: string; what: string }[];
  principles: { term: string; body: string }[];
  stack: { label: string; items: string[] }[];
  faq: { q: string; a: string }[];
  closing: { heading: { lead: string; accent: string }; body: string; cta: string };
};

export const practices: Practice[] = [
  /* ------------------------------------------------------------------------ */
  /* PAGE 1 — GENERATIVE AI & RAG                                              */
  /* ------------------------------------------------------------------------ */
  {
    slug: "generative-ai-rag",
    number: "01",
    name: "Generative AI & RAG",
    question: "Can AI answer from what we know?",
    glyph: "neural",
    tags: ["RAG", "LLM integration", "Assistants", "Knowledge search", "Document processing"],
    titleTag: "Generative AI & RAG Development | Metis Tech Studio",
    metaDescription:
      "Assistants, search, and document pipelines built on large language models and grounded in your own documents. Every answer cites its source.",
    headline: { lead: "AI that answers from ", accent: "your", tail: " knowledge, and shows its sources." },
    subhead:
      "We build assistants, search, and document pipelines on top of large language models, grounded in your company's own documents, policies, and data. Every answer cites where it came from, so your team can trust it and check it.",
    intro: [
      "General-purpose AI tools know a lot about the world and nothing about your business. They don't know your refund policy, your safety procedures, or what was agreed in last year's contract. Ask them anyway and they'll guess, confidently.",
      "Retrieval-augmented generation (RAG) fixes that. Before the model answers, it searches your approved sources and builds its answer from what it finds. If the answer isn't in your documents, it says so instead of inventing one.",
      "We use the same foundations to read documents, not just answer questions about them: pulling structured data out of invoices, forms, contracts, and reports so it can flow into the systems you already use.",
    ],
    services: [
      {
        id: "rag-development",
        name: "RAG Development",
        body: "Custom retrieval-augmented generation systems built on your documents, wikis, and databases. We handle chunking, embeddings, hybrid search, re-ranking, and evaluation, so answers are accurate rather than just plausible.",
      },
      {
        id: "llm-integration",
        name: "LLM Integration",
        body: "Add large language models from OpenAI, Anthropic, or open-source providers to your existing products and internal tools. We design the prompts, guardrails, and fallbacks, and pick the model that fits your cost, speed, and privacy needs.",
      },
      {
        id: "ai-chatbots-assistants",
        name: "AI Chatbots & Assistants",
        body: "Assistants for customers or staff that answer from approved sources, hand over to a human when they should, and log every conversation. Deployed on your website, in Slack or Microsoft Teams, or inside your own app.",
      },
      {
        id: "enterprise-knowledge-search",
        name: "Enterprise Knowledge Search",
        navLabel: "Knowledge Search",
        body: "One search box across SharePoint, Google Drive, Confluence, Notion, and shared folders. Ask in plain English and get a direct answer with links to the source pages, respecting each user's existing access permissions.",
      },
      {
        id: "intelligent-document-processing",
        name: "Intelligent Document Processing (IDP)",
        navLabel: "Document Processing",
        body: "Automatically classify incoming documents and extract the fields that matter: supplier, amounts, dates, line items, clauses. Low-confidence results are flagged for a person to check rather than silently passed through.",
      },
      {
        id: "ocr-data-extraction",
        name: "OCR & Data Extraction",
        body: "Turn scanned paperwork, photos, and PDFs into clean, structured data. We combine OCR with language models to handle messy layouts, handwriting, and tables that traditional templates break on.",
      },
      {
        id: "natural-language-processing",
        name: "Natural Language Processing",
        body: "Classification, summarisation, sentiment analysis, entity extraction, and translation for text at volume: support tickets, survey responses, emails, or reviews. Built to run reliably on thousands of records, not just a demo.",
      },
      {
        id: "multimodal-ai",
        name: "Multimodal AI",
        body: "Systems that understand text, images, diagrams, PDFs, and audio together. Useful for inspection photos, technical drawings, recorded calls, and documents where the meaning lives in the layout as much as the words.",
      },
    ],
    useCases: [
      { who: "Operations teams", what: "staff ask “what's the procedure for a damaged delivery?” and get the current SOP, with the exact section linked." },
      { who: "Finance", what: "supplier invoices are read on arrival, matched to purchase orders, and queued for approval with the extracted fields already filled in." },
      { who: "HR and people teams", what: "an internal assistant answers leave, payroll, and policy questions, and sends anything sensitive to a real person." },
      { who: "Legal and compliance", what: "search across hundreds of contracts for specific clauses, renewal dates, or obligations in minutes rather than days." },
      { who: "Customer support", what: "agents get suggested replies drawn from the help centre and past resolved tickets, with sources they can verify before sending." },
      { who: "Healthcare and allied health", what: "intake forms and referral letters are turned into structured records, with every extracted field reviewable." },
    ],
    principles: [
      { term: "Citations by default.", body: "Every answer links back to the document, page, or record it came from. If the system can't find support in your sources, it tells the user rather than guessing." },
      { term: "Measured, not eyeballed.", body: "Before launch we build a test set of real questions from your team and score the system on accuracy, completeness, and citation quality. You see the numbers, and we re-run them after every change." },
      { term: "Permissions respected.", body: "If someone can't open a document today, the assistant won't quote it to them tomorrow. Access rules are carried through from your existing systems." },
      { term: "Your data stays yours.", body: "We can deploy within your own cloud account, use providers with no-training guarantees, or run open-source models privately when the data is too sensitive to leave your environment." },
      { term: "Humans in the loop where it matters.", body: "Extraction pipelines show confidence scores and route uncertain results to a person. Nothing important is written into your systems without a way to review it." },
    ],
    // TODO: trim to only what you've actually used in production.
    stack: [
      { label: "Models", items: ["OpenAI", "Anthropic", "Llama", "Mistral", "Open-source models via Hugging Face"] },
      { label: "Frameworks", items: ["LangChain", "LlamaIndex", "Custom pipelines in Python and TypeScript"] },
      { label: "Retrieval", items: ["pgvector", "Pinecone", "Weaviate", "Elasticsearch", "Hybrid keyword and vector search"] },
      { label: "Document processing", items: ["Azure Document Intelligence", "AWS Textract", "Tesseract", "Unstructured"] },
      { label: "Evaluation and monitoring", items: ["Ragas", "LangSmith", "Custom test suites"] },
      { label: "Infrastructure", items: ["AWS", "Google Cloud", "Docker", "FastAPI"] },
    ],
    faq: [
      { q: "Will the AI make things up?", a: "Any language model can, which is why we design against it. Answers are built only from retrieved sources, every answer is cited, and the system is instructed to say “I don't know” when the sources don't cover the question. We test for this specifically before launch." },
      { q: "Is our data used to train public AI models?", a: "No. We use API providers that don't train on business data, or host models privately in your own cloud. Where data is especially sensitive, we'll recommend the private option." },
      { q: "What documents can it work with?", a: "PDFs, Word files, spreadsheets, web pages, wikis, emails, scanned documents, and database records. If your knowledge lives somewhere unusual, tell us on the first call." },
      // TODO: confirm "4–6 weeks" — it was a bracketed placeholder in the source.
      { q: "How long does a first version take?", a: "A focused assistant on a defined set of documents is typically 4–6 weeks from discovery to a working version your team can test. Document extraction pipelines depend on how many document types are involved." },
      { q: "What happens when our documents change?", a: "We set up automatic syncing so new and updated documents are indexed on a schedule or as they change. Old versions stop being cited once they're replaced." },
      { q: "Can it work in languages other than English?", a: "Yes. Modern models handle most major languages well, and we test in each language you need before launch." },
    ],
    closing: {
      heading: { lead: "Got documents your team ", accent: "keeps searching through?" },
      body: "Tell us where your knowledge lives and what people keep asking. In a free 30-minute call, we'll tell you whether RAG is the right fit, roughly what it would cost, and what a first version could look like.",
      cta: "Book a free consultation",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* PAGE 2 — AGENTIC AI & AUTOMATION                                          */
  /* ------------------------------------------------------------------------ */
  {
    slug: "agentic-ai-automation",
    number: "02",
    name: "Agentic AI & Automation",
    question: "Can this happen without a person?",
    glyph: "flow",
    tags: ["AI agents", "Workflow automation", "Inbox automation", "MCP", "Human-in-the-loop"],
    titleTag: "Agentic AI & Workflow Automation | Metis Tech Studio",
    metaDescription:
      "AI agents that automate emails, data entry, reconciliations, and reports. Agents handle the routine, people approve what matters, every action is logged.",
    headline: { lead: "AI agents that do the work, ", accent: "with a human holding the keys." },
    subhead:
      "We automate the repetitive back-office work that eats your team's week: emails, data entry, reconciliations, and reports. Agents handle the routine, people approve what matters, and every action is logged.",
    intro: [
      "Most businesses run on a layer of manual glue. Someone copies details from an email into the CRM. Someone downloads a report, reformats it, and sends it on. Someone chases the same three approvals every Friday. None of it is hard, but it adds up to hours every week, and errors creep in.",
      "Traditional automation handles the predictable parts but breaks the moment an email is phrased differently or a form arrives in a new layout. AI agents can read, interpret, and decide, which means they can handle the messy, real-world inputs that rule-based tools can't.",
      "The risk is obvious: you don't want software acting on your behalf without oversight. So we build agents the way you'd onboard a new staff member. They start with narrow permissions, check in before anything important, and every action leaves a trail you can review.",
    ],
    services: [
      {
        id: "ai-agent-development",
        name: "AI Agent Development",
        body: "Custom agents that take a goal, plan the steps, and use your tools to complete it: looking up records, drafting replies, updating systems. Each agent is scoped to a specific job, with clear limits on what it can and can't touch.",
      },
      {
        id: "multi-agent-systems",
        name: "Multi-Agent Systems",
        body: "For larger processes, several specialised agents work together, one to triage, one to research, one to draft, one to check. Each does one thing well, and an orchestration layer keeps them coordinated and accountable.",
      },
      {
        id: "workflow-automation",
        name: "Workflow Automation",
        body: "Connect the tools your team already uses so information moves without copy and paste. Triggers, branches, and scheduled jobs, with AI steps added only where judgement is actually needed.",
      },
      {
        id: "business-process-automation",
        name: "Business Process Automation",
        body: "End-to-end automation of a full process, such as order-to-invoice, supplier onboarding, or month-end reporting. We map how the work happens today, remove the steps that don't need a person, and redesign the hand-offs that do.",
      },
      {
        id: "email-inbox-automation",
        name: "Email & Inbox Automation",
        body: "Agents that read shared inboxes, classify and prioritise messages, extract the details, draft replies, and route each one to the right person or system. Your team reviews and sends instead of starting from a blank screen.",
      },
      {
        id: "report-generation",
        name: "Report Generation",
        body: "Scheduled reports assembled automatically from your systems, with a written summary of what changed and why it matters. Delivered by email, Slack, or Teams, in the format your managers actually read.",
      },
      {
        id: "mcp-tool-integration",
        name: "MCP & Tool Integration",
        body: "We build Model Context Protocol (MCP) servers and API integrations that give AI assistants safe, controlled access to your internal systems. Your team can then use tools like Claude or ChatGPT with your real data, inside the permissions you set.",
      },
      {
        id: "human-in-the-loop",
        name: "Human-in-the-Loop Systems",
        body: "Approval queues, confidence thresholds, and escalation rules that decide when an agent acts on its own and when it asks first. Includes review dashboards so your team can approve, edit, or reject in a click.",
      },
    ],
    useCases: [
      { who: "Finance and accounts", what: "invoices are matched to purchase orders, exceptions are flagged, and the approved ones are posted to Xero or MYOB for sign-off." },
      { who: "Sales and CRM", what: "inbound enquiries are read, qualified, logged in the CRM with the right details, and handed to a salesperson with a drafted first reply." },
      { who: "Customer service", what: "routine requests like address changes, order status, and refunds under a set amount are resolved automatically; everything else is escalated with a summary." },
      { who: "Operations", what: "daily stock, delivery, or job-status reports are compiled from three systems and sent to managers before 8am." },
      { who: "Recruitment and HR", what: "applications are screened against criteria, interview slots are offered, and onboarding paperwork is sent and chased." },
      { who: "Property and trades", what: "maintenance requests are triaged by urgency, assigned to the right contractor, and tracked through to completion." },
    ],
    principles: [
      { term: "Start narrow, then expand.", body: "We automate one well-defined task first, measure it, and only widen the agent's responsibilities once it has earned trust. The first release is deliberately boring." },
      { term: "Approvals where they belong.", body: "Anything that sends money, contacts a customer, or changes a record of consequence can require human sign-off. You decide the thresholds, and you can tighten or loosen them at any time." },
      { term: "A full audit trail.", body: "Every input, decision, tool call, and output is logged with a timestamp and the reasoning behind it. When someone asks “why did the system do that?”, there's an answer." },
      { term: "Least-privilege access.", body: "Agents get only the permissions their job requires, through dedicated service accounts. They can't wander into systems they weren't built for." },
      { term: "Graceful failure.", body: "When an agent is unsure or a system is down, it stops and asks rather than guessing. Failures are reported, retried safely, and never silently dropped." },
      { term: "Measured savings.", body: "We baseline how long the process takes today and track time saved, error rates, and volume handled after launch. You see whether it's paying for itself." },
    ],
    // TODO: trim to only what you've actually used in production.
    stack: [
      { label: "Models", items: ["OpenAI", "Anthropic", "Open-source models"] },
      { label: "Agent frameworks", items: ["LangGraph", "OpenAI Agents SDK", "Claude Agent SDK", "Custom orchestration"] },
      { label: "Integration", items: ["Model Context Protocol (MCP)", "REST and GraphQL APIs", "Webhooks"] },
      { label: "Workflow tools", items: ["n8n", "Make", "Zapier", "Temporal", "Custom Python or Node.js services"] },
      { label: "Business systems", items: ["Microsoft 365", "Google Workspace", "Xero", "MYOB", "HubSpot", "Salesforce", "Slack", "Teams"] },
      { label: "Infrastructure", items: ["AWS", "Google Cloud", "Docker", "PostgreSQL"] },
    ],
    faq: [
      { q: "Will the agent do something we didn't approve?", a: "Only within the limits you set. We define exactly which actions it can take on its own and which need approval, and we test those boundaries before launch. Higher-risk actions default to requiring sign-off." },
      { q: "What's the difference between this and Zapier or Make?", a: "Those tools are excellent for predictable, rule-based steps, and we often use them. Agents add judgement: reading an unstructured email, deciding what it's about, and choosing what to do next. Most good systems combine both." },
      { q: "Do we need to replace our existing software?", a: "No. We automate around the tools you already use. If a system has an API, we connect to it directly; if it doesn't, we'll find the most reliable alternative." },
      { q: "How do we know it's working?", a: "You get a dashboard showing what the system handled, what it escalated, and what it got wrong. We review it with you after launch and tune it based on real results." },
      { q: "What happens to the people who did this work?", a: "In most projects, the goal is to remove the tedious part of a role, not the role itself. Your team spends less time on data entry and more on the work that needs a person." },
      { q: "How much time will it save?", a: "It depends on volume and how manual the process is today. During discovery we measure the current process and give you a realistic estimate before you commit." },
    ],
    closing: {
      heading: { lead: "What does your team do every week ", accent: "that a computer should?" },
      body: "Pick the most repetitive process in your business and tell us about it. In a free 30-minute call, we'll tell you how much of it can be automated safely, what needs to stay with a person, and roughly what it would cost.",
      cta: "Book a free consultation",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* PAGE 3 — SOFTWARE DEVELOPMENT                                             */
  /* ------------------------------------------------------------------------ */
  {
    slug: "software-development",
    number: "03",
    name: "Software Development",
    question: "Can you build the thing itself?",
    glyph: "stack",
    tags: ["Web apps", "Custom software", "SaaS", "Internal tools", "APIs"],
    titleTag: "Custom Software & Web App Development | Metis Tech Studio",
    metaDescription:
      "Custom web applications, internal tools, dashboards, and business systems designed with the people who use them. Proven, maintainable technology.",
    headline: { lead: "Software built around how your business ", accent: "actually works." },
    subhead:
      "Custom web applications, internal tools, dashboards, and business systems, designed with the people who'll use them every day. Built on proven, maintainable technology, with AI added where it earns its place.",
    intro: [
      "Off-the-shelf software is built for the average business. That works until your process isn't average. Then your team ends up with five subscriptions, three spreadsheets, and a lot of copying between them.",
      "Custom software makes sense when the way you work is part of your advantage, or when the workarounds have started costing more than building something properly. We build web applications, internal tools, and platforms that fit your process instead of forcing your process to fit the tool.",
      "And when off-the-shelf really is the better answer, we'll tell you. A two-day integration beats a three-month build every time it's enough.",
    ],
    services: [
      {
        id: "web-app-development",
        name: "Web App Development",
        body: "Fast, secure, responsive web applications for customers, partners, or staff. Built with modern frameworks like React and Next.js, tested properly, and deployed with monitoring from day one.",
      },
      {
        id: "custom-software-development",
        name: "Custom Software Development",
        navLabel: "Custom Software",
        body: "Software designed from scratch around a specific business process, when nothing on the market fits. We start with how the work happens today and design the system around the people doing it.",
      },
      {
        id: "saas-development",
        name: "SaaS Development",
        body: "From first version to a product that's ready for paying customers: multi-tenant architecture, subscriptions and billing, user management, and the admin tools you'll need to run it. Built so the next developer you hire can pick it up.",
      },
      {
        id: "internal-tools-admin-panels",
        name: "Internal Tools & Admin Panels",
        navLabel: "Internal Tools",
        body: "Replace spreadsheets and manual workarounds with purpose-built tools for your team: approval flows, job tracking, inventory, scheduling, and back-office admin. Small to build, big on daily time saved.",
      },
      {
        id: "dashboards-business-intelligence",
        name: "Dashboards & Business Intelligence",
        navLabel: "Dashboards & BI",
        body: "Live dashboards that pull data from your systems into one view, so managers see what's happening without asking for a report. Built around the decisions people actually make, not every metric you could track.",
      },
      {
        id: "business-management-systems",
        name: "Business Management Systems",
        body: "CRM, ERP, job management, and client portals tailored to your industry and workflow. Ideal when generic platforms are too complex, too limited, or too expensive per user for what you actually need.",
      },
      {
        id: "api-development-integration",
        name: "API Development & Integration",
        navLabel: "APIs & Integration",
        body: "Well-documented APIs that let your systems talk to each other, your partners, and your customers. We also connect existing tools such as accounting, CRM, payments, and logistics, so data flows without manual re-entry.",
      },
      // TODO: the source says to swap this for UI/UX Design if you're not
      // actively taking mobile work.
      {
        id: "mobile-app-development",
        name: "Mobile App Development",
        body: "iOS and Android apps built with React Native or Flutter from a single codebase, sharing the same backend as your web platform. Best for field teams, customer self-service, and anything people need on the go.",
      },
    ],
    useCases: [
      { who: "Service businesses", what: "a job management system that takes a booking through quoting, scheduling, completion, and invoicing in one place." },
      { who: "Growing teams outgrowing spreadsheets", what: "an internal tool that replaces the shared spreadsheet everyone is afraid to edit, with proper permissions and history." },
      { who: "Founders with a product idea", what: "a SaaS first version, scoped tightly enough to launch, learn from real users, and grow without a rewrite." },
      { who: "Managers flying blind", what: "a live dashboard that combines sales, operations, and finance data, updated automatically every morning." },
      { who: "Businesses with clients or partners", what: "a secure portal where clients upload documents, track progress, and download reports instead of emailing back and forth." },
      { who: "Legacy system owners", what: "a modern web replacement for an old desktop or Access database application, migrated without losing years of data." },
    ],
    principles: [
      { term: "Boring technology, on purpose.", body: "We use well-supported, widely adopted tools. Your software will be cheaper to maintain, easier to hire for, and still supported in five years." },
      { term: "Working software every week.", body: "You see real progress, running in a browser, not status reports. You can test it with your team and change direction while it's still cheap to do so." },
      { term: "Designed with the people who use it.", body: "We talk to the staff who'll use the system daily, not just the people commissioning it. Software that ignores its users doesn't get used." },
      { term: "AI where it helps, not everywhere.", body: "We add AI features like smart search, document reading, or automated summaries only where they save real time. Everything else is solid, conventional engineering." },
      { term: "Security and quality built in.", body: "Authentication, role-based access, automated testing, code review, backups, and monitoring are part of every project, not optional extras." },
      { term: "Yours from the first commit.", body: "The code lives in your repository, the infrastructure in your cloud account. Documented and handed over properly, whether we stay on or your team takes it forward." },
    ],
    // TODO: trim to only what you've actually used in production.
    stack: [
      { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Python", "FastAPI", "Django"] },
      { label: "Mobile", items: ["React Native", "Flutter"] },
      { label: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] },
      { label: "Cloud and DevOps", items: ["AWS", "Google Cloud", "Vercel", "Docker", "GitHub Actions"] },
      { label: "Integrations", items: ["Stripe", "Xero", "MYOB", "HubSpot", "Salesforce", "Microsoft 365", "Google Workspace"] },
    ],
    faq: [
      { q: "How much does custom software cost?", a: "It depends on scope. A focused internal tool costs far less than a full SaaS platform. After discovery you get a written scope with a fixed price and timeline, and that number doesn't move unless you change the scope." },
      // TODO: confirm "4–8 weeks" and "3–6 months" — bracketed placeholders in the source.
      { q: "How long does it take?", a: "A focused internal tool or dashboard is typically 4–8 weeks. A larger platform or SaaS first version is usually 3–6 months. We'll give you a realistic timeline after discovery." },
      { q: "Should we build custom or buy off the shelf?", a: "Buy if an existing product does 80% of what you need at a sensible price. Build when your process is a competitive advantage, when per-user licensing is getting expensive, or when you're stitching together too many tools. We'll give you an honest recommendation either way." },
      { q: "Can you take over or improve an existing system?", a: "Yes. We start with a code and architecture review, tell you what's worth keeping and what isn't, and improve it step by step rather than recommending a rewrite by default." },
      { q: "Who maintains it after launch?", a: "Your choice. We offer an ongoing support retainer, or we document everything and train your team to take it forward. Either way, you own the code." },
      { q: "Can you work with our existing developers?", a: "Yes. We can lead the project, work alongside your team, or handle a specific part such as the AI features or the integrations." },
    ],
    closing: {
      heading: { lead: "Outgrown your spreadsheets, ", accent: "or your software?" },
      body: "Tell us what's slowing your team down. In a free 30-minute call, we'll tell you whether to build, buy, or fix what you have, and roughly what each option would cost.",
      cta: "Book a free consultation",
    },
  },
];

export const practiceBySlug = (slug: string) => practices.find((p) => p.slug === slug);

export const practiceHref = (p: Practice) => `/services/${p.slug}`;
export const serviceHref = (p: Practice, s: PracticeService) => `/services/${p.slug}#${s.id}`;

/** Every service across every practice — the "N things we build" count. */
export const serviceCount = practices.reduce((n, p) => n + p.services.length, 0);
