import type { MetadataRoute } from "next";
import { allServices } from "@/content/services";
import { site } from "@/content/site";

/**
 * Every page the site actually has. `/about` and `/how-we-work` are absent on
 * purpose — they are redirects today, not pages, and listing a redirect in a
 * sitemap is the fastest way to get one flagged in Search Console. Add them
 * here when the real pages land.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: url("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...allServices.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: url("/contact"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/insights"), lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: url("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
