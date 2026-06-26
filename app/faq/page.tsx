import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

const SITE_URL = "https://helloii.com";

export const metadata: Metadata = {
  title: "Helloii FAQ — AI Shopping Assistant for Shopify",
  description:
    "Helloii is an AI shopping assistant for Shopify stores that reduces support load by instantly answering customer questions about products, shipping, returns, sizing, and store policies — 24/7, with no human in the loop for routine questions.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "Helloii FAQ — AI Shopping Assistant for Shopify",
    description:
      "Answers about what Helloii does, how it works, what it costs, and how it fits inside a Shopify store.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Helloii FAQ — AI Shopping Assistant for Shopify",
    description:
      "Answers about what Helloii does, how it works, what it costs, and how it fits inside a Shopify store.",
  },
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
