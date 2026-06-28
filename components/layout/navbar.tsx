"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "../ui/liquid-glass";

export function Navbar() {
  // Product/Features/Pricing are anchors on the homepage's own sections —
  // they don't exist on other routes, so linking to them there does
  // nothing. Only show them when we're actually on the homepage.
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-5 z-50"
    >
      <Container>
        <div className="flex justify-center">
          <div className="relative flex items-center gap-8 overflow-hidden rounded-full border border-white/40 bg-white/60 px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md">
            <div className="pointer-events-none absolute -left-10 top-0 h-full w-24 rotate-12 bg-white/40 blur-2xl" />

            <Link
              href="/"
              className="font-bold tracking-tight text-neutral-950"
            >
              helloii Ai
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {isHome && (
                <>
                  <a
                    href="#product"
                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    Product
                  </a>
                  <a
                    href="#features"
                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    Pricing
                  </a>
                </>
              )}
              <Link
                href="/faq"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
              >
                FAQ
              </Link>
            </nav>

            <a
              href="https://calendar.app.google/uCHWaZUmUy9fbeax5"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 lg:inline-block"
            >
              Book a demo
            </a>

            <LiquidGlassBubble
              accent="#1a56ff"
              accentLight="#5A9CFF"
              className="btn-press rounded-full px-5 py-2 text-sm font-semibold"
            >
              <a
                href="http://apps.shopify.com/ai-sales-support-assistant"
                target="_blank"
                rel="noreferrer"
              >
                Try for free in Shopify
              </a>
            </LiquidGlassBubble>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
