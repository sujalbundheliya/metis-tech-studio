import { z } from "zod";

/** Dropdown choices, from contact-us.md. */
export const enquiryOptions = {
  // TODO: set the bands in the currency you quote in, sized to your projects.
  budget: ["Under $10k", "$10k–$25k", "$25k–$50k", "$50k+", "Not sure yet"],
  timeline: ["As soon as possible", "Within 3 months", "Just exploring"],
} as const;

/** An optional dropdown: empty, or exactly one of its listed values. */
const choice = (values: readonly string[]) =>
  z
    .string()
    .refine((v) => v === "" || values.includes(v), "Please pick one of the listed options.")
    .optional();

/** Shared by the client form and the server route — one definition, no drift. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please give us your name.").max(120),
  email: z.email("That doesn't look like an email address.").max(200),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about the problem helps us reply usefully.")
    .max(5000),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  /** Optional. Digits with the usual separators; 7–15 digits covers local
   *  numbers through full E.164 with country code. */
  phone: z
    .string()
    .trim()
    .refine((v) => {
      if (v === "") return true;
      const digits = v.replace(/\D/g, "").length;
      return /^\+?[\d\s().-]+$/.test(v) && digits >= 7 && digits <= 15;
    }, "That doesn't look like a phone number.")
    .optional(),
  budget: choice(enquiryOptions.budget),
  timeline: choice(enquiryOptions.timeline),
  source: z.string().trim().max(200).optional().or(z.literal("")),
  /** Honeypot.
   *
   *  Deliberately NOT named website/url/company/phone/address — browser autofill
   *  and password managers fill those even with autocomplete="off", which
   *  silently binned real enquiries. This name matches no autofill heuristic.
   *
   *  Accept whatever a bot puts here; the route discards the submission. */
  ref_token: z.string().max(500).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
