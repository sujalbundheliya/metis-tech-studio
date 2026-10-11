import { ImageResponse } from "next/og";
import { MARK_PATH, MARK_VIEWBOX } from "@/components/ui/mark-path";
import { site } from "@/content/site";

/**
 * The card that appears when a link to this site is pasted into Slack,
 * LinkedIn or a message. Generated rather than designed in a file so it can
 * never drift from the palette, and so there is no 2MB PNG in the repo.
 *
 * Shared by the site-wide card (src/app/opengraph-image.tsx) and the one per
 * practice page (src/app/services/[slug]/opengraph-image.tsx).
 */
export const ogSize = { width: 1200, height: 630 };

export function ogCard({
  eyebrow,
  headline,
  accent,
  accentSize = 76,
  sub,
  path = "",
}: {
  /** Small label above the headline. */
  eyebrow?: string;
  /** First line, in cream. */
  headline: string;
  /** Second line, in cyan. */
  accent: string;
  /** Shrink a longer accent line so it doesn't wrap onto a third. */
  accentSize?: number;
  sub?: string;
  /** Appended to the domain in the footer, e.g. "/services/…". */
  path?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#03070e",
          padding: "72px 80px",
        }}
      >
        {/* the bloom the site opens with, flattened to a static radial */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 900,
            height: 900,
            background:
              "radial-gradient(circle, rgba(26,79,216,0.40) 0%, rgba(26,79,216,0.14) 34%, rgba(3,7,14,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            right: -200,
            width: 820,
            height: 820,
            background:
              "radial-gradient(circle, rgba(172,49,243,0.28) 0%, rgba(172,49,243,0.10) 36%, rgba(3,7,14,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox={MARK_VIEWBOX}>
            <defs>
              <linearGradient id="mark" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1a82fb" />
                <stop offset="1" stopColor="#ac31f3" />
              </linearGradient>
            </defs>
            <path d={MARK_PATH} fill="url(#mark)" />
          </svg>
          <span
            style={{
              fontSize: 26,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#84b3ce",
            }}
          >
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <span
              style={{
                marginBottom: 22,
                fontSize: 24,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f2ab5c",
              }}
            >
              {eyebrow}
            </span>
          )}
          <span style={{ fontSize: 76, lineHeight: 1.1, color: "#f5eedd", letterSpacing: "-0.02em" }}>
            {headline}
          </span>
          <span style={{ fontSize: accentSize, lineHeight: 1.1, color: "#5ad8f2", letterSpacing: "-0.02em" }}>
            {accent}
          </span>
          {sub && (
            <span style={{ marginTop: 34, fontSize: 30, lineHeight: 1.4, color: "#c8d9e6" }}>{sub}</span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 240, height: 4, background: "linear-gradient(90deg,#1a82fb,#ac31f3)" }} />
          <span style={{ fontSize: 24, color: "#84b3ce" }}>
            {site.url.replace(/^https?:\/\//, "") + path}
          </span>
        </div>
      </div>
    ),
    ogSize,
  );
}
