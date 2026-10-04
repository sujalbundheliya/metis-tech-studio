"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import { Label } from "@/components/ui/kit";
import { placeholders } from "@/content/site";
import { contact } from "@/content/contact";
import { enquiryOptions } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/* 16px is not a style choice: iOS Safari zooms the viewport on focus for any
   input under 16px and never zooms back out, leaving the page scaled and
   scrolled sideways for the rest of the visit. The 48px min-height is the
   touch floor — `py-3` alone left these at 27px on a phone. */
const field =
  "w-full min-h-12 border border-white/14 bg-white/[0.03] px-4 py-3 text-[16px] text-white placeholder:text-venice-300/40 transition-colors duration-200 focus:border-aurora-500/70 focus:bg-white/[0.05] focus:outline-none";

const FIELDS = ["name", "email", "message", "company", "phone", "budget", "timeline", "source", "ref_token"] as const;

export function ContactForm() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);
  const [firstName, setFirstName] = useState("");
  const sentRef = useRef<HTMLDivElement>(null);

  /* The success panel is far shorter than the form it replaces. On a phone the
     reader is down at the submit button when it swaps, which would leave them
     looking at the rail below with the confirmation scrolled off the top. */
  useEffect(() => {
    if (status === "sent") sentRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  }, [status, reduced]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setFormError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(FIELDS.map((k) => [k, String(fd.get(k) ?? "")]));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        if (data.error) setFormError(data.error);
        setStatus("error");
        return;
      }
      setFirstName(payload.name.trim().split(/\s+/)[0] ?? "");
      setDelivered(data.delivered !== false);
      setStatus("sent");
    } catch {
      setFormError(contact.form.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <m.div
        ref={sentRef}
        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.001 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="scroll-mt-24 border border-aurora-500/30 bg-aurora-500/[0.06] p-6 sm:p-10"
        role="status"
      >
        <Label className="text-aurora-400">Message sent</Label>
        <h2 className="t-h2 mt-4 text-white">Thanks{firstName ? `, ${firstName}` : ""}.</h2>
        <p className="t-body mt-4 max-w-lg text-venice-200/72">
          {contact.form.success}{" "}
          <a href={`mailto:${placeholders.email}`} className="text-aurora-400 underline underline-offset-4">
            {placeholders.email}
          </a>
          .
        </p>
        {!delivered && (
          <p className="t-small mt-5 border-t border-white/10 pt-4 text-ember-400">
            Note for the developer: email delivery isn&apos;t configured yet, so this
            submission was logged to the server console rather than sent. Set
            <code className="mx-1 font-mono text-[13px]">RESEND_API_KEY</code>
            to enable it.
          </p>
        )}
      </m.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div>
        <h2 className="t-h2 text-white">{contact.form.heading}</h2>
        <p className="t-body mt-3 max-w-xl text-venice-200/68">{contact.form.intro}</p>
      </div>

      {/* Honeypot. The field name matters: anything resembling website / url /
          company / phone gets filled by browser autofill even with
          autocomplete="off", which silently discards genuine enquiries. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ref_token">Leave this empty</label>
        <input
          id="ref_token"
          name="ref_token"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-form-type="other"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            className={field}
            placeholder="Your full name"
          />
        </Field>
        <Field id="email" label="Work email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            className={field}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field id="message" label="What are you trying to solve?" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(field, "resize-y sm:min-h-[9.5rem]")}
          placeholder="Describe the problem, process, or idea in a few sentences. Plain English is perfect."
        />
      </Field>

      <div className="grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
        <Field id="company" label="Company" error={errors.company} optional>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            autoCapitalize="words"
            enterKeyHint="next"
            className={field}
            placeholder="Company name"
          />
        </Field>
        <Field id="phone" label="Mobile number" error={errors.phone} optional>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            enterKeyHint="next"
            className={field}
            placeholder="+91 98765 43210"
          />
        </Field>
        <Field id="budget" label="Rough budget" error={errors.budget} optional>
          <Select id="budget" options={enquiryOptions.budget} />
        </Field>
        <Field id="timeline" label="Timeline" error={errors.timeline} optional>
          <Select id="timeline" options={enquiryOptions.timeline} />
        </Field>
      </div>

      <Field id="source" label="How did you hear about us?" error={errors.source} optional>
        <input
          id="source"
          name="source"
          type="text"
          autoComplete="off"
          enterKeyHint="send"
          className={field}
          placeholder="Google, LinkedIn, referral…"
        />
      </Field>

      <AnimatePresence>
        {formError && (
          <m.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="border border-ember-500/40 bg-ember-500/[0.08] px-4 py-3 text-[15px] text-ember-400"
          >
            {formError}{" "}
            <a href={`mailto:${placeholders.email}`} className="underline">
              {placeholders.email}
            </a>
            .
          </m.p>
        )}
      </AnimatePresence>

      <div className="border-t border-white/10 pt-7">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 bg-sand-100 px-8 py-4 text-[16px] font-medium text-ink-1000 shadow-[0_0_0_1px_rgba(245,238,221,0.2),0_8px_40px_-10px_rgba(245,238,221,0.35)] transition-all duration-200 hover:bg-white active:bg-white disabled:cursor-not-allowed disabled:opacity-60 can-hover:min-h-0 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : contact.form.submit}
          {status !== "sending" && (
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          )}
        </button>
        <p className="t-small mt-5 max-w-xl text-venice-300/60">
          {contact.form.privacy}{" "}
          <Link
            href="/privacy"
            className="text-venice-200/80 underline decoration-venice-200/30 underline-offset-4 transition-colors hover:text-aurora-400"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </form>
  );
}

/** Native select — the platform picker is the right control on a phone — with
 *  the empty "Choose one" state dimmed like an input placeholder. */
function Select({ id, options }: { id: string; options: readonly string[] }) {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          field,
          "cursor-pointer appearance-none pr-11",
          // Windows Chrome paints the open list with the OS's light theme
          // unless each option is coloured explicitly.
          "[&>option]:bg-ink-900 [&>option]:text-white",
          value === "" && "text-venice-300/40",
        )}
      >
        <option value="">Choose one</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 h-3.5 w-3.5 -translate-y-1/2 text-venice-300/70"
      >
        <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      </svg>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-label block text-venice-300/70">
        {label}
        {required && <span className="ml-1 text-ember-400">*</span>}
        {optional && <span className="ml-1.5 normal-case tracking-normal opacity-60">(optional)</span>}
      </label>
      <div className="mt-2.5">{children}</div>
      {error && (
        <p role="alert" className="mt-2 text-[14px] text-ember-400">
          {error}
        </p>
      )}
    </div>
  );
}
