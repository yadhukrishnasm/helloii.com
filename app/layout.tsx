import type { Metadata } from "next";
import "./globals.css";

import { AnimatedBackground } from "@/components/animated-background";
import SmoothScroll from "@/components/smooth-scroll";

const SITE_URL = "https://helloii.com";
const ENTITY_SENTENCE =
  "Helloii is an AI shopping assistant for Shopify stores that reduces support load by instantly answering customer questions about products, shipping, returns, sizing, and store policies — 24/7, with no human in the loop for routine questions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Helloii — AI Shopping Assistant for Shopify Stores",
    template: "%s | Helloii",
  },
  description: ENTITY_SENTENCE,
  keywords: [
    "AI shopping assistant",
    "Shopify AI chatbot",
    "AI product recommendation",
    "ecommerce AI assistant",
    "Shopify customer support",
    "AI sales assistant",
    "AI chatbot for ecommerce",
    "Shopify conversion optimization",
    "product discovery AI",
  ],
  openGraph: {
    title: "Helloii — AI Shopping Assistant for Shopify Stores",
    description: ENTITY_SENTENCE,
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helloii — AI Shopping Assistant for Shopify Stores",
    description: ENTITY_SENTENCE,
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Helloii",
  url: SITE_URL,
  email: "hello@helloii.com",
  sameAs: [
    "https://x.com/helloiihq",
    "https://www.linkedin.com/company/helloii/",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "Nysaclan",
    url: "https://nysaclan.com",
  },
};

const SOFTWARE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Helloii",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Shopify",
  description: ENTITY_SENTENCE,
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "19",
      priceCurrency: "USD",
      billingDuration: "P1M",
    },
    {
      "@type": "Offer",
      name: "Growth",
      price: "49",
      priceCurrency: "USD",
      billingDuration: "P1M",
    },
    {
      "@type": "Offer",
      name: "Scale",
      price: "99",
      priceCurrency: "USD",
      billingDuration: "P1M",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    ratingCount: "200",
  },
};

const REVIEW_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: "Helloii" },
    author: { "@type": "Person", name: "Meera Nair" },
    reviewBody:
      "Since adding Helloii, we cut support tickets by 40% in the first month. Customers get instant answers about sizing and shipping — without ever waiting on us.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: "Helloii" },
    author: { "@type": "Person", name: "James Okafor" },
    reviewBody:
      "The product Q&A feature is what sold me. Customers ask things I never thought to put in my descriptions, and Helloii handles every single one.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: "Helloii" },
    author: { "@type": "Person", name: "Priya Rajan" },
    reviewBody:
      "Setup took under 10 minutes. Within the first week the assistant was already handling 80% of pre-sale questions. Our conversion rate on product pages went up noticeably.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-neutral-950 antialiased">
        <AnimatedBackground />
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SOFTWARE_JSON_LD),
          }}
        />
        {REVIEW_JSON_LD.map((review, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(review) }}
          />
        ))}
      </body>
    </html>
  );
}
