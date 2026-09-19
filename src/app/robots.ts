import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Nothing here is private, so everything is crawlable. The API route is
 * excluded only because a POST-only endpoint is pure crawl budget waste.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
