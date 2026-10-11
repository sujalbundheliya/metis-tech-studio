import type { Metadata } from "next";
import { site } from "@/content/site";

/** The default share card, served by src/app/opengraph-image.tsx. */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

/**
 * Everything a page needs in its <head>: title, description, canonical, and
 * the Open Graph card that Twitter/X, LinkedIn and Slack read.
 *
 * Every page goes through this, because Next merges `metadata` shallowly. A
 * page that declares no `openGraph` inherits the layout's whole object, and a
 * page that declares one replaces it. Before this existed, /about, /contact
 * and the rest shared as the homepage card and linked back to the homepage;
 * the service pages set their own card and in doing so lost the image.
 *
 * Twitter needs nothing of its own. The layout only sets the card type, and
 * Next fills the Twitter title, description and image in from `openGraph`.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ownImage = false,
  noindex = false,
}: {
  /** The layout's template appends " | Metis Tech Studio" unless `absoluteTitle`. */
  title: string;
  description: string;
  /** Canonical path, e.g. "/about". */
  path: string;
  absoluteTitle?: boolean;
  /** The route has its own opengraph-image file. Naming an image here would
   *  override it — Next only applies a file-based image when the page's
   *  `openGraph` has no `images` key at all. */
  ownImage?: boolean;
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_AU",
      title: fullTitle,
      description,
      url: path,
      ...(!ownImage && { images: [shareImage] }),
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
