import Script from "next/script";

const MEASUREMENT_ID = "G-CBYT3Z45VT";

/**
 * Google Analytics 4. Unlike Vercel's analytics this sets cookies (`_ga`,
 * `_ga_<id>`) — /privacy says so; keep the two in step.
 *
 * Only the production deployment reports, so preview deploys and local
 * `next start` runs (Lighthouse and the like) stay out of the numbers.
 * `lazyOnload` keeps gtag.js clear of first paint and hydration: it fetches
 * once the page has loaded and the main thread is idle. The cost is missing
 * the rare visitor who leaves before that. GA4's enhanced measurement records
 * client-side route changes on its own, so there's no per-navigation
 * page_view here.
 */
export function GoogleAnalytics() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
