/* ============================================================================
   ABOUT PAGE — copy verbatim from sys-info/about-us.md.
   Headings that carry a gradient accent live in the page component, per the
   convention in site.ts.

   TODO: the source leaves room for "one or two sentences on what you were
   doing before Metis and the moment you decided to start it" at the end of
   the story. Add them to `story` when they exist — nothing is invented here.
   ========================================================================== */

export const about = {
  subhead:
    "Metis Tech Studio is a small product engineering studio building AI systems and custom software for businesses that want technology to do a real job. The people you meet on the first call are the people who write the code.",
  cta: "Book a free consultation",

  story: [
    "We started Metis Tech Studio after seeing the same pattern again and again. A project would be sold by one team, designed by another, and built by a third. Somewhere between them, the original problem got lost. The demo looked great; the real system never quite worked.",
    "AI made the gap wider. Plenty of businesses have watched an impressive pilot stall because nobody could connect it to their actual data, systems, and people. The hard part was never the model. It was everything around it.",
    "So we built a studio with no gaps to fall through. Design, engineering, AI, and deployment sit with the same two people, from the first conversation to the last commit.",
  ],

  name: {
    /** "metis" is set in italics between `before` and `after`. */
    before: "In Greek, ",
    word: "metis",
    after: " means practical wisdom: the kind of intelligence that solves real problems in messy, changing conditions, rather than just in theory. That's the standard we hold our work to.",
    motto: "Practical intelligence, engineered.",
  },

  beliefs: [
    { title: "Solve the problem, not the brief.", body: "The first request is rarely the real need. We spend time understanding how the work actually happens before we suggest what to build." },
    { title: "The best project is sometimes no project.", body: "If an existing tool and a short integration will do the job, we'll say so. We'd rather keep your trust than win a contract we shouldn't." },
    { title: "AI is a tool, not a strategy.", body: "We use it where it saves real time or unlocks something new, and conventional engineering everywhere else." },
    { title: "Show, don't report.", body: "Working software every week is the only progress report that can't be spun." },
    { title: "You own everything.", body: "Your code, your data, your models, your infrastructure. No lock-in, no black boxes." },
    { title: "Build it to outlast us.", body: "Clear code, proper documentation, and boring, well-supported technology, so whoever maintains it next can pick it up without starting over." },
  ],

  smallStudio: [
    { title: "You talk to the builders.", body: "There's no account manager relaying messages and no handoff between sales and engineering. The people you explain the problem to are the people solving it." },
    { title: "Your project matters to us.", body: "We take on a handful of clients at a time. Each project shapes our reputation, and we treat it that way." },
    { title: "We move quickly.", body: "No internal approvals, no layers of process. Questions get answered the same day, and decisions get made in the meeting." },
    { title: "We know our limits.", body: "If a project needs a larger team than we can provide, we'll tell you upfront, and we'll help you find the right partner." },
  ],

  steps: [
    { title: "Free 30-minute call.", body: "You describe the problem; we tell you honestly whether and how we'd approach it." },
    { title: "Discovery Sprint.", body: "A short, fixed-fee engagement to map the work and produce a written scope with a fixed price and timeline." },
    { title: "Build in weekly increments.", body: "You see and test working software every week." },
    { title: "Launch and hand over.", body: "We deploy, monitor, and document, then stay on for support or train your team to take it forward." },
  ],

  closing: {
    body: "No pitch deck, no pressure. Tell us about the problem, and we'll tell you how we'd approach it and whether we're the right fit.",
    cta: "Book a free consultation",
  },
} as const;
