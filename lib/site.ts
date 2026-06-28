export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://yourdomain.com";

export const siteName = "helloii";

export const siteDescription =
  "helloii is an AI shopping assistant for Shopify stores that reduces support load by instantly answering customer questions about products, shipping, returns, sizing, and store policies — 24/7, with no human in the loop for routine questions.";

export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
