import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Names and icons for "Add to Home Screen" and Android's tab colouring.
 * `display: "browser"` on purpose: this is a marketing site full of mailto
 * and external links, not an app — a standalone window would hide the URL bar
 * without giving anything back.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#03070e",
    theme_color: "#030d13",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
