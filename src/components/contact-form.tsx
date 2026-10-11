"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "motion/react";
import { placeholders } from "@/content/site";
import { contact, enquiryOptions } from "@/content/contact";
import { ENQUIRY_KEY } from "@/components/enquiry-receipt";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "error";

/* 16px is not a style choice: iOS Safari zooms the viewport on focus for any
   input under 16px and never zooms back out, leaving the page scaled and
   scrolled sideways for the rest of the visit. The 48px min-height is the
   touch floor — `py-3` alone left these at 27px on a phone. The aria-invalid
   variants turn a field ember while its error is showing. */
const field =
  "w-full min-h-12 border border-white/14 bg-white/[0.03] px-4 py-3 text-[16px] text-white placeholder:text-venice-300/75 transition-colors duration-200 focus:border-aurora-500/70 focus:bg-white/[0.05] focus:outline-none aria-invalid:border-ember-500/70 aria-invalid:focus:border-ember-400";

/* The schema brings Zod with it — ~90kB gzipped, more than the rest of this
   page's own code. Imported statically it also rode along whenever Next
   prefetched /contact from a link on another page, homepage included. It is
   fetched the first time anything in the form gets focus instead, which is
   long before anyone can press Send. */
const loadSchema = () => import("@/lib/contact-schema");

/** In the order the form shows them — the first one with an error gets focus. */
const FIELDS = ["name", "email", "message", "company", "phone", "budget", "timeline", "source", "ref_token"] as const;

export function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  /** Show the errors and put the cursor in the first field that has one. */
  function fail(next: Record<string, string>) {
    setErrors(next);
    setStatus("error");
    const first = FIELDS.find((k) => next[k]);
    const el = first && formRef.current?.elements.namedItem(first);
    if (el instanceof HTMLElement) el.focus();
  }

  /** Wired onto each control: the error-state attributes for that field. */
  const invalid = (id: string) =>
    errors[id] ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(FIELDS.map((k) => [k, String(fd.get(k) ?? "")]));

    // Same schema the route uses, so a mistake shows instantly instead of
    // after a round trip — and the server still checks, for anyone who
    // bypasses this.
    const { contactSchema, fieldErrors } = await loadSchema();
    const checked = contactSchema.safeParse(payload);
    if (!checked.success) {
      fail(fieldErrors(checked.error));
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error) setFormError(data.error);
        fail(data.fieldErrors ?? {});
        return;
      }
      try {
        sessionStorage.setItem(
          ENQUIRY_KEY,
          JSON.stringify({
            firstName: payload.name.trim().split(/\s+/)[0] ?? "",
            delivered: data.delivered !== false,
          }),
        );
      } catch {
        // storage blocked — the thank-you page falls back to a generic greeting
      }
      // Status stays "sending", so the button can't be pressed again while
      // the next page loads.
      router.push("/contact/thank-you");
    } catch {
      setFormError(contact.form.error);
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocus={() => void loadSchema()}
      // Editing a field clears its error; the rest stay until the next send.
      onChange={(e) => {
        const name = (e.target as Element).getAttribute("name") ?? "";
        if (!errors[name]) return;
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }}
      noValidate
      aria-busy={status === "sending"}
      className="space-y-8"
    >
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
            {...invalid("name")}
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
            {...invalid("email")}
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
          {...invalid("message")}
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
            {...invalid("company")}
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
            placeholder="+61 412 345 678"
            {...invalid("phone")}
          />
        </Field>
        <Field id="budget" label="Rough budget" error={errors.budget} optional>
          <Select id="budget" options={enquiryOptions.budget} {...invalid("budget")} />
        </Field>
        <Field id="timeline" label="Timeline" error={errors.timeline} optional>
          <Select id="timeline" options={enquiryOptions.timeline} {...invalid("timeline")} />
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
          {...invalid("source")}
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
          {status === "sending" && (
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.6" />
              <path d="M14.25 8A6.25 6.25 0 0 0 8 1.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          )}
          {status === "sending" ? "Sending…" : contact.form.submit}
          {status !== "sending" && (
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          )}
        </button>
        <p className="t-small mt-5 max-w-xl text-venice-300/75">
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
function Select({
  id,
  options,
  ...aria
}: {
  id: string;
  options: readonly string[];
  "aria-invalid"?: true;
  "aria-describedby"?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        {...aria}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          field,
          "cursor-pointer appearance-none pr-11",
          // Windows Chrome paints the open list with the OS's light theme
          // unless each option is coloured explicitly.
          "[&>option]:bg-ink-900 [&>option]:text-white",
          value === "" && "text-venice-300/75",
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
        {optional && <span className="ml-1.5 normal-case tracking-normal">(optional)</span>}
      </label>
      <div className="mt-2.5">{children}</div>
      {/* No role="alert": several of these appear at once on a failed send,
          and focus lands on the first invalid field, whose aria-describedby
          already reads its message out. */}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[14px] text-ember-400">
          {error}
        </p>
      )}
    </div>
  );
}
