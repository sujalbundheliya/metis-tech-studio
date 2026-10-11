import { ogCard, ogSize } from "@/lib/og-card";
import { site } from "@/content/site";

/**
 * The site-wide share card. Pages name it explicitly through pageMetadata()
 * in src/lib/metadata.ts — a page that declares its own `openGraph` otherwise
 * loses it. The practice pages have their own, beside their page.tsx.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({
    headline: "We design, build, and ship",
    accent: "software that works.",
    sub: "Web platforms, mobile apps, and AI systems — founder-built.",
  });
}
