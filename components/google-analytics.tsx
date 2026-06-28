"use client";

import Script from "next/script";
import { gaMeasurementId } from "@/lib/site";

// Loads GA4 only when an ID is configured — no script tags, no gtag
// calls, and no network requests when NEXT_PUBLIC_GA_MEASUREMENT_ID is
// unset. Only initializes default page-view tracking, nothing custom.
export function GoogleAnalytics() {
  if (!gaMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `}
      </Script>
    </>
  );
}
