# Metis Tech Studio — Website

Dark, editorial marketing site. Copy comes from the markdown documents in the
parent folder and is compiled into typed modules — edit the source of truth, not
the components.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · lucide-react. No database, no CMS.

## Pages

| Route | Notes |
|---|---|
| `/` | Homepage — `metis-tech-studio-website-content-home.md` |
| `/services` | Overview — `00-services-overview.md` |
| `/services/[slug]` | **22 pages**, statically generated from `01`–`04-*.md` |
| `/contact` | Enquiry form → email (see below) |
| `/insights` | Placeholder; no posts yet, points at the service pages |
| `/privacy`, `/terms` | Legal boilerplate — **needs a solicitor's review** |
| 404 | `src/app/not-found.tsx` |

Generated alongside them: `/robots.txt`, `/sitemap.xml` (every real page; the two
redirects are deliberately left out) and `/opengraph-image`, the 1200×630 share
card drawn from the palette and the traced mark — so there is no PNG in the repo
to keep in sync. All three read `site.url`.

`/about` and `/how-we-work` are **not built**. Rather than leave the nav pointing
at 404s, `next.config.ts` redirects them to `/#why` and `/#process`. Delete those
two redirects when you build the real pages.

`next.config.ts` also holds permanent redirects from the shorter slugs an earlier
draft used (`/services/mlops` → `/services/mlops-monitoring`, and seven others).

## Contact form

`POST /api/contact` validates with Zod (shared with the client via
`src/lib/contact-schema.ts`), rate-limits to 5 submissions per IP per 10 minutes,
and drops honeypot submissions silently.

Set these in `.env.local` (see `.env.example`):

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | From resend.com. **Without it the form still works** — submissions are validated and logged to the server console instead of emailed. |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries. Defaults to `placeholders.email`. |
| `CONTACT_FROM_EMAIL` | Must be a sender on a domain verified in Resend. |

The success screen tells the developer when delivery isn't configured, so you
can't ship it silently broken by accident.

## Logo

`LOGO.jpg` is bright-on-black artwork, so it was converted to alpha PNGs — a JPEG
would paint a black rectangle over any non-black surface.

| File | What |
|---|---|
| `public/logo.png` | Full lockup, transparent |
| `public/logo-mark.png` | The M glyph alone, isolated by saturation (the wordmark is white, the mark is a gradient) |
| `src/app/icon.png`, `apple-icon.png` | Favicons, mark on the site background |

The lockup is only legible above ~150px wide, so the header pairs the mark with
live type and the footer uses the full lockup. Brand gradient sampled from the
source: `#1a82fb` → `#ac31f3`, registered as `--color-brand-blue` /
`--color-brand-violet`.

## Where things are

| Path | What |
|---|---|
| [`src/content/services.ts`](src/content/services.ts) | **Generated.** All 22 service pages |
| [`src/content/site.ts`](src/content/site.ts) | Homepage copy + every placeholder |
| [`src/app/globals.css`](src/app/globals.css) | Tokens, type scale, atmosphere utilities |
| `src/components/sections/` | One file per homepage section |
| `src/components/ui/` | Kit, canvases, atmosphere, glyphs |
| [`DESIGN.md`](DESIGN.md) | Palette, type, interactions, Tailwind traps |

### Regenerating the service pages

`src/content/services.ts` is generated from the four markdown documents. Edit the
markdown, then re-run the parser (kept in the session scratchpad — re-create it
from the doc structure if lost). Nav and footer links **derive** from that module,
so a slug can never drift from the page it points at.

## Before you publish

Everything unverified sits in the `placeholders` object at the top of
`src/content/site.ts`. The UI **omits** anything still `null` rather than printing
a fake value — nothing on the site is invented.

- [ ] `email` — currently `hello@metistechstudio.com`
- [ ] `phone`, `location`, `regions` — `null`; footer rows and FAQ adapt
- [ ] `founderA`, `founderB` — `null`; the team FAQ reads "The two founders"
- [ ] `pricing.*` — `null`; the cost FAQ falls back to an honest no-numbers answer
- [ ] `linkedin`, `github` — `null`; the footer icons stay hidden until these are real
- [ ] `bookingUrl` — currently `/contact`, which now exists; swap for Cal.com / Calendly if you prefer
- [ ] `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` so the form actually sends
- [ ] `site.url` — real domain; canonical URLs, `robots.txt`, `sitemap.xml` and the
      share card all read from it
- [ ] Trim `techStack.groups` to what you can discuss in depth on a first call

Case studies and testimonials are deliberately **not** built — sections 9 and 10
of the content doc say omit rather than fake. The trust strip uses launch copy.

## Still to build

`/about` and `/how-we-work` (currently redirected). `/insights` needs real posts.
Privacy and Terms need legal review before launch.
