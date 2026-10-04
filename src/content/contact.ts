/* ============================================================================
   CONTACT PAGE — copy verbatim from sys-info/contact-us.md.
   Bracketed placeholders in the source resolve through `placeholders` in
   site.ts: where a value is still null, the line is omitted rather than faked.
   ========================================================================== */

import { placeholders } from "./site";

export const contact = {
  subhead:
    "Book a free 30-minute call or send us a message. No pitch deck, no pressure, and a reply within one business day.",

  callSteps: [
    { title: "You describe the problem.", body: "What's slow, manual, broken, or missing, and what you've already tried. You don't need to know the technical solution." },
    { title: "We ask questions.", body: "About your current tools, your data, your team, and what success would look like." },
    { title: "We give you an honest view.", body: "How we'd approach it, a rough cost range, and whether we're the right team. If an off-the-shelf tool would do the job, we'll tell you." },
    { title: "You decide what's next.", body: "If it makes sense, we'll propose a fixed-fee Discovery Sprint. If not, you leave with useful advice and no obligation." },
  ],

  form: {
    heading: "Start the conversation",
    intro: "A few details help us come to the call prepared. Only the first three fields are required.",
    submit: "Send message",
    privacy: "We'll only use your details to reply to your enquiry. Happy to sign an NDA before you share anything sensitive.",
    /** Follows "Thanks, <first name>." — the greeting is built in the form. */
    success: "We've got your message and will reply within one business day, usually sooner. If it's urgent, email us directly at",
    error: "Something went wrong sending your message. Please try again, or email us at",
  },

  booking: {
    heading: "Book a call directly",
    body: "Prefer to skip the form? Pick a time that suits you.",
  },
  replyPromise: "We reply to every enquiry within one business day.",

  faq: [
    { q: "Is the first call really free?", a: "Yes. Thirty minutes, no charge, and no obligation. It's how we work out together whether we're a good fit." },
    { q: "Do I need a detailed brief?", a: "No. A few sentences about the problem is enough. Many of our best projects started with “we're not sure what we need.”" },
    { q: "Will you sign an NDA?", a: "Yes. If you'd like one in place before sharing details, mention it in your message and we'll sort it out before the call." },
    { q: "What size projects do you take on?", a: "Everything from a focused automation or internal tool to a full platform build. If something is too small to justify custom work, we'll point you to a simpler option." },
    {
      q: placeholders.country
        ? `Do you work with businesses outside ${placeholders.country}?`
        : "Do you work with businesses in other countries?",
      a: "Yes. We work remotely and schedule calls to suit your time zone.",
    },
  ],

  closingLine: {
    lead: "Not ready to talk yet?",
    body: "See exactly what a project with us looks like, from first call to launch.",
    link: "Read how we work",
  },
} as const;

/** A real scheduler link (Cal.com / Calendly) rather than the /contact fallback. */
export const hasBookingLink = /^https?:\/\//.test(placeholders.bookingUrl);
