import { z } from "zod";

/** Shared by the client form and the server route — one definition, no drift. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please give us your name.").max(120),
  email: z.email("That doesn't look like an email address.").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about the problem helps us reply usefully.")
    .max(5000),
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
