import type { Metadata } from "next";
import "./globals.css";

import { AnimatedBackground } from "@/components/animated-background";
import SmoothScroll from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: {
    default: "Helloii — AI Shopping Assistant for Shopify Stores",
    template: "%s | Helloii",
  },
  description:
    "Convert more visitors into customers with Helloii. An AI shopping assistant that answers product questions, recommends products, tracks orders, and provides 24/7 support for Shopify stores.",
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
    description:
      "AI-powered shopping assistant that boosts conversions, answers customer questions, recommends products, and tracks orders.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

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
      </body>
    </html>
  );
}
