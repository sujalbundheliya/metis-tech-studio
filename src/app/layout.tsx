import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { NavProgress } from "@/components/nav-progress";
import { MotionProvider } from "@/components/motion-provider";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { DeferRenderAnchors } from "@/components/defer-render-anchors";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { site } from "@/content/site";
import "./globals.css";

/* v1 display face — editorial, high-contrast; stands in for PP Editorial Old */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  // Deliberately no canonical, URL, title or description here. Each page sets
  // its own through pageMetadata() in src/lib/metadata.ts, and anything put
  // here is inherited word for word by a page that doesn't — /about used to
  // share as the homepage card, linking to the homepage.
  openGraph: {
    type: "website",
    siteName: site.name,
  },
  // Title, description and image are filled in from each page's openGraph.
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EEDD" },
    { media: "(prefers-color-scheme: dark)", color: "#030d13" },
  ],
  width: "device-width",
  initialScale: 1,
  // Without `viewportFit: "cover"` iOS letterboxes the page inside the safe
  // area and every env(safe-area-inset-*) resolves to 0 — the padding added
  // for the notch and the home indicator would silently do nothing.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-scroll-behavior` is load-bearing. globals.css sets
    // `scroll-behavior: smooth` for in-page anchors, and since Next 16 the
    // router no longer suspends it during navigation unless told to here. The
    // reset to the top of a new page then ran as a smooth scroll, which the
    // incoming page interrupted part-way — visitors landed thousands of pixels
    // down the next page. With it, page changes jump to the top instantly and
    // same-page `#hash` links keep their smooth scroll.
    <html lang="en" data-scroll-behavior="smooth">
      {/* Browser extensions (password managers, colour pickers, Grammarly…)
          commonly stamp attributes onto <body> before React hydrates, which
          React then reports as a mismatch. suppressHydrationWarning applies to
          this element's own attributes only — real mismatches inside the tree
          are still reported. */}
      <body
        suppressHydrationWarning
        className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-venice-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-sand-50"
        >
          Skip to content
        </a>
        <MotionProvider>
          <NavProgress />
          {children}
          <MobileActionBar />
          <DeferRenderAnchors />
        </MotionProvider>
        {/* Vercel's two are cookieless. Both report only once Analytics and
            Speed Insights are enabled for the project in the Vercel
            dashboard, and do nothing in local dev. Google Analytics does set
            cookies, which /privacy discloses. */}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
