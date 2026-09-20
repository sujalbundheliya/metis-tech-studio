"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import { Label } from "@/components/ui/kit";
import { placeholders } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/* 16px is not a style choice: iOS Safari zooms the viewport on focus for any
   input under 16px and never zooms back out, leaving the page scaled and
   scrolled sideways for the rest of the visit. The 48px min-height is the
   touch floor — `py-3` alone left these at 27px on a phone. */
const field =
  "w-full min-h-12 border border-white/14 bg-white/[0.03] px-4 py-3 text-[16px] text-white placeholder:text-venice-300/40 transition-colors duration-200 focus:border-aurora-500/70 focus:bg-white/[0.05] focus:outline-none";

export function ContactForm() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setFormError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
      ref_token: String(fd.get("ref_token") ?? ""),
    };

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
      setDelivered(data.delivered !== false);
      setStatus("sent");
    } catch {
      setFormError("Something went wrong on the way. Please email us directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <m.div
        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.001 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border border-aurora-500/30 bg-aurora-500/[0.06] p-6 sm:p-10"
        role="status"
      >
        <Label className="text-aurora-400">Message sent</Label>
        <h2 className="t-h2 mt-4 text-white">Thanks — we&apos;ve got it.</h2>
        <p className="t-body mt-4 max-w-md text-venice-200/72">
          You&apos;ll hear back within one business day, from one of the two people who
          would actually do the work.
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
        <Field id="name" label="Your name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            className={field}
            placeholder="Jane Okafor"
          />
        </Field>
        <Field id="email" label="Email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={field}
            placeholder="jane@company.com"
          />
        </Field>
      </div>

      <Field id="company" label="Company" error={errors.company} optional>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          autoCapitalize="words"
          enterKeyHint="next"
          className={field}
          placeholder="Acme Ltd"
        />
      </Field>

      <Field id="message" label="What are you trying to build?" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={4}
          enterKeyHint="send"
          className={cn(field, "resize-y sm:min-h-[11rem]")}
          placeholder="The problem, who it's for, and anything you've already tried. Plain language is fine — we'll ask the technical questions."
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
          </m.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col-reverse items-stretch gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small text-venice-300/55">
          We reply within one business day. No newsletter, no sequence.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 bg-sand-100 px-8 py-4 text-[16px] font-medium text-ink-1000 shadow-[0_0_0_1px_rgba(245,238,221,0.2),0_8px_40px_-10px_rgba(245,238,221,0.35)] transition-all duration-200 hover:bg-white active:bg-white disabled:cursor-not-allowed disabled:opacity-60 can-hover:min-h-0 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          {status !== "sending" && (
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          )}
        </button>
      </div>
    </form>
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
