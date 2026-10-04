import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { placeholders, site } from "@/content/site";
import { contact } from "@/content/contact";

/**
 * Contact form handler.
 *
 * Requires two env vars in production:
 *   RESEND_API_KEY   — from resend.com
 *   CONTACT_TO_EMAIL — inbox that receives enquiries (defaults to the site address)
 *   CONTACT_FROM_EMAIL — a verified sender on your Resend domain
 *
 * Without RESEND_API_KEY the route accepts and logs the submission rather than
 * failing, so the form is testable locally before email is wired up.
 */

const TO = process.env.CONTACT_TO_EMAIL || placeholders.email;
const FROM = process.env.CONTACT_FROM_EMAIL || "Metis Tech Studio <onboarding@resend.dev>";

// Very small in-memory rate limit. Enough to blunt casual abuse on a single
// instance; put a real limiter in front if this ever gets traffic.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this address. Try again shortly, or email us at" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: contact.form.error }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const { name, email, company, phone, message, budget, timeline, source, ref_token } = parsed.data;

  // Honeypot filled → look successful to the sender, but send nothing.
  // Always log it: a silently-dropped enquiry is far more costly than a spam
  // one, so this must never be invisible again.
  if (ref_token) {
    console.warn(
      `[contact] DISCARDED as bot — honeypot filled with ${JSON.stringify(ref_token)} ` +
        `(from ${name} <${email}>). If this was a real person, the honeypot is misfiring.`,
    );
    return NextResponse.json({ ok: true });
  }

  const subject = `New enquiry — ${name}${company ? ` (${company})` : ""}`;
  // Optional answers, in the order the form asks them. Blank ones still get a
  // row, so a reply can see at a glance what the sender chose to skip.
  const details: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Mobile", phone || "—"],
    ["Budget", budget || "—"],
    ["Timeline", timeline || "—"],
    ["Heard via", source || "—"],
  ];
  const text = [
    ...details.map(([k, v]) => `${`${k}:`.padEnd(12)}${v}`),
    ``,
    message,
    ``,
    `— sent from ${site.url}/contact`,
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#0b1520">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry via ${esc(site.name)}</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${details
          .map(([k, v]) => {
            const cell = k === "Email" ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : esc(v);
            return `<tr><td style="padding:4px 16px 4px 0;color:#667"><b>${k}</b></td><td>${cell}</td></tr>`;
          })
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#667;font-size:13px"><b>Message</b></p>
      <div style="white-space:pre-wrap;font-size:14px">${esc(message)}</div>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — enquiry accepted but NOT emailed:\n" + text,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        { ok: false, error: contact.form.error },
        { status: 502 },
      );
    }
    // Log the Resend id so a "did it actually arrive?" question can be answered
    // from the terminal — paste it into resend.com/emails to see delivery events.
    console.log(`[contact] sent to ${TO} — resend id ${data?.id ?? "unknown"}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { ok: false, error: contact.form.error },
      { status: 502 },
    );
  }
}
