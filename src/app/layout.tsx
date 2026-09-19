import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { BootSplash } from "@/components/boot-splash";
import { NavProgress } from "@/components/nav-progress";
import { MotionProvider } from "@/components/motion-provider";
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    // The card image comes from src/app/opengraph-image.tsx — naming it here
    // as well would override the generated one with a path that has to exist.
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
          <BootSplash />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
