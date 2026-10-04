import type { MetadataRoute } from "next";
import { practiceHref, practices } from "@/content/services";
import { site } from "@/content/site";

/**
 * Every page the site actually has. `/how-we-work` is absent on purpose — it
 * is a redirect today, not a page, and listing a redirect in a sitemap is the
 * fastest way to get one flagged in Search Console. Add it here when the real
 * page lands. The same goes for the retired service slugs in next.config.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: url("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...practices.map((p) => ({
      url: url(practiceHref(p)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: url("/about"), lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/insights"), lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: url("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
