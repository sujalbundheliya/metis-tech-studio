import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * The Open Graph fields every page shares.
 *
 * Next merges `metadata` shallowly: a route that declares its own `openGraph`
 * replaces the layout's entirely, rather than adding to it. The service pages
 * set an OG title and URL, and in doing so used to drop `siteName` and the
 * card image from every one of them. Spreading this keeps them.
 *
 * `images` points at the route that `src/app/opengraph-image.tsx` serves;
 * `metadataBase` in the layout turns it into an absolute URL.
 */
export const openGraphBase: Metadata["openGraph"] = {
  siteName: site.name,
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${site.name} — ${site.tagline}`,
    },
  ],
};
