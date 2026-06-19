"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

const SHOPIFY_URL = "http://apps.shopify.com/ai-sales-support-assistant";

export function CTABanner() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-br from-[#1d4ed8] via-[#2563EB] to-[#4f46e5] px-8 py-16 text-center shadow-[0_32px_80px_rgba(37,99,235,0.28)] sm:px-14 sm:py-20"
        >
          {/* Subtle inner glow top-left */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-[#7C3AED]/30 blur-3xl" />
          {/* Top specular */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
            Ready to get started?
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
            Add Helloii to your Shopify store today
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-blue-100">
            14-day free trial. No credit card required. Your store, your
            customers, better conversations — starting now.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-press inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#2563EB] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            >
              Start free trial
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
