"use client";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { ProductReveal } from "@/components/sections/product-reveal";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { RecognizedBy } from "@/components/sections/recognized-by";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { AskHelloii } from "@/components/sections/ask-helloii";
import { CTABanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";
import { StructuredData } from "@/components/structured-data";
import { siteUrl, siteName, siteDescription } from "@/lib/site";

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={WEBSITE_JSON_LD} />
      <Navbar />
      <main>
        <Hero />
        <RecognizedBy />
        <ProductReveal />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <AskHelloii />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
