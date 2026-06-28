import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { siteUrl, siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "helloii Ai FAQ — AI Shopping Assistant for Shopify",
  description: siteDescription,
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: "helloii Ai FAQ — AI Shopping Assistant for Shopify",
    description:
      "Answers about what helloii Ai does, how it works, what it costs, and how it fits inside a Shopify store.",
    url: `${siteUrl}/faq`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "helloii Ai FAQ — AI Shopping Assistant for Shopify",
    description:
      "Answers about what helloii Ai does, how it works, what it costs, and how it fits inside a Shopify store.",
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
