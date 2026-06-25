"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/container";

const TESTIMONIALS = [
  {
    quote:
      "Since adding Helloii, we cut support tickets by 40% in the first month. Customers get instant answers about sizing and shipping — without ever waiting on us.",
    name: "Meera Nair",
    store: "The Weave Studio",
    initials: "MN",
    color: "#2563EB",
  },
  {
    quote:
      "The product Q&A feature is what sold me. Customers ask things I never thought to put in my descriptions, and Helloii handles every single one. It's like having a full-time sales rep embedded in the page.",
    name: "James Okafor",
    store: "Vitaleaf Naturals",
    initials: "JO",
    color: "#7C3AED",
  },
  {
    quote:
      "Setup took under 10 minutes. Within the first week the assistant was already handling 80% of pre-sale questions. Our conversion rate on product pages went up noticeably.",
    name: "Priya Rajan",
    store: "Bloom & Thread",
    initials: "PR",
    color: "#2563EB",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  const prev = () => setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-bold uppercase tracking-[0.22em] text-neutral-400"
        >
          What stores say
        </motion.p>

        {/* Quote area */}
        <div className="relative mx-auto mt-14 max-w-3xl text-center">

          {/* Decorative opening mark */}
          <span
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-serif text-[9rem] leading-none text-neutral-100"
            aria-hidden
          >
            &ldquo;
          </span>

          {/* Rotating quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-xl font-medium leading-relaxed tracking-[-0.02em] text-neutral-800 sm:text-2xl lg:text-3xl lg:leading-snug"
            >
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          {/* Divider */}
          <motion.div
            key={`div-${active}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 h-px w-12 origin-left rounded-full"
            style={{ background: t.color }}
          />

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-6 flex items-center justify-center gap-3"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: t.color }}
              >
                {t.initials}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-950">{t.name}</p>
                <p className="text-xs text-neutral-400">{t.store} · Shopify</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-14 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous"
            className="btn-press flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-500 backdrop-blur-sm"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 24 : 6,
                  background: i === active ? t.color : "#d1d5db",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="btn-press flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-500 backdrop-blur-sm"
          >
            →
          </button>
        </div>
      </Container>
    </section>
  );
}
