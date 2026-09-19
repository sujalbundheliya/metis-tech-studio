import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LogoLockup } from "@/components/ui/logo";
import { Label } from "@/components/ui/kit";
import { footer, placeholders, site } from "@/content/site";
import { cn } from "@/lib/utils";

const LINKEDIN_PATH =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0";
const GITHUB_PATH =
  "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3";

/** The closing gradient, sampled from the hero's bloom. */
const BAND =
  "linear-gradient(90deg," +
  " #0b1026 0%," +
  " #1e325a 9%," +
  " #2f5590 22%," +
  " #3a6495 33%," +
  " #4a74c4 43%," +
  " #5e8fff 52%," +
  " #6a63cf 62%," +
  " #7c4fbb 71%," +
  " #8b46c9 78%," +
  " #4a2878 88%," +
  " #241542 95%," +
  " #0b0a1e 100%)";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const contact = [
    { icon: Mail, value: placeholders.email, href: `mailto:${placeholders.email}` },
    placeholders.phone && {
      icon: Phone,
      value: placeholders.phone,
      href: `tel:${placeholders.phone.replace(/\s/g, "")}`,
    },
    placeholders.location && { icon: MapPin, value: placeholders.location, href: null },
  ].filter(Boolean) as { icon: typeof Mail; value: string; href: string | null }[];

  const socials = [
    placeholders.linkedin && { label: "LinkedIn", href: placeholders.linkedin, path: LINKEDIN_PATH },
    placeholders.github && { label: "GitHub", href: placeholders.github, path: GITHUB_PATH },
  ].filter(Boolean) as { label: string; href: string; path: string }[];

  return (
    <footer data-nav="dark" className="bg-ink-1000">
      {/* Signature closure band.
          Sampled from the hero bloom: deep indigo → blue → violet, luminous
          across the middle and falling away at both ends. A blurred copy sits
          above it so the band reads as light rather than as a painted stripe. */}
      <div aria-hidden="true" className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-55 blur-2xl"
          style={{ background: BAND }}
        />
        <div className="relative h-[10px] w-full" style={{ background: BAND }} />
      </div>

      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
        <div className="px-6 py-12 sm:px-10 lg:col-span-4 lg:border-r lg:border-white/10 lg:px-14">
          <LogoLockup width={190} />
          <p className="t-small mt-5 max-w-xs text-venice-200/62">
            {site.name} — {site.tagline.toLowerCase()}
            {placeholders.location ? ` ${placeholders.location}` : ""}
          </p>
          {socials.length > 0 && (
            <div className="mt-7 flex gap-px">
              {socials.map(({ label, href, path }, i) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "grid h-10 w-10 place-items-center border border-white/12 text-venice-200/65 transition-colors hover:border-aurora-500/50 hover:text-aurora-400",
                    i > 0 && "border-l-0",
                  )}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[15px] w-[15px]">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="grid border-t border-white/10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:border-t-0">
          {footer.columns.map((column, i) => (
            <div
              key={column.heading}
              className={`px-6 py-10 sm:px-8 ${i > 0 ? "border-t border-white/10 sm:border-t-0" : ""} ${
                i % 2 === 1 ? "sm:border-l sm:border-white/10" : ""
              } ${i >= 2 ? "sm:border-t" : ""} lg:border-t-0 lg:border-l lg:border-white/10`}
            >
              <Label dark>{column.heading}</Label>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-venice-200/62 transition-colors hover:text-sand-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-white/10 px-6 py-10 sm:border-l sm:px-8 lg:border-t-0">
            <Label dark>Get in touch</Label>
            <ul className="mt-5 space-y-2.5">
              {contact.map(({ icon: Icon, value, href }) => (
                <li key={value}>
                  {href ? (
                    <a
                      href={href}
                      className="inline-flex items-center gap-2 text-[15px] text-venice-200/62 transition-colors hover:text-sand-50"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.7} />
                      {value}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[15px] text-venice-200/62">
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.7} />
                      {value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row sm:px-10 lg:px-14">
          <p className="font-mono text-[12px] text-venice-300/45">
            © {year} {site.name}
          </p>
          <div className="flex items-center gap-7">
            <Link href="/privacy" className="text-[13px] text-venice-200/55 transition-colors hover:text-sand-50">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[13px] text-venice-200/55 transition-colors hover:text-sand-50">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
