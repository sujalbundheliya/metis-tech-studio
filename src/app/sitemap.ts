import type { MetadataRoute } from "next";
import { practiceHref, practices } from "@/content/services";
import { site } from "@/content/site";

/**
 * When each page's content last changed. Bump a date when you change what a
 * page says — not for styling or code changes.
 *
 * These used to be the build time, which told Google every page had changed
 * on every deploy. Google notices when `lastmod` doesn't match the content
 * and then ignores it for the whole site, so a stale-but-honest date is worth
 * more than a fresh one.
 */
const UPDATED = {
  home: "2026-10-10",
  services: "2026-10-04",
  practices: "2026-10-04",
  about: "2026-10-04",
  contact: "2026-10-10",
  insights: "2026-10-04",
  privacy: "2026-10-10",
  terms: "2026-10-10",
};

/**
 * Every page the site actually has. `/how-we-work` is absent on purpose — it
 * is a redirect today, not a page, and listing a redirect in a sitemap is the
 * fastest way to get one flagged in Search Console. Add it here when the real
 * page lands. The same goes for the retired service slugs in next.config.ts,
 * and for /contact/thank-you, which is noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const at = (date: string) => new Date(date);

  return [
    { url: url("/"), lastModified: at(UPDATED.home), changeFrequency: "monthly", priority: 1 },
    { url: url("/services"), lastModified: at(UPDATED.services), changeFrequency: "monthly", priority: 0.9 },
    ...practices.map((p) => ({
      url: url(practiceHref(p)),
      lastModified: at(UPDATED.practices),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: url("/about"), lastModified: at(UPDATED.about), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), lastModified: at(UPDATED.contact), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/insights"), lastModified: at(UPDATED.insights), changeFrequency: "monthly", priority: 0.4 },
    { url: url("/privacy"), lastModified: at(UPDATED.privacy), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified: at(UPDATED.terms), changeFrequency: "yearly", priority: 0.2 },
  ];
}
