"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

const STEPS = [
  {
    step: "01",
    title: "Install from the Shopify App Store",
    description:
      "Add Helloii to your store in one click — no code, no developer required. It takes under two minutes to install and activate.",
    accent: "#2563EB",
  },
  {
    step: "02",
    title: "Helloii learns your store automatically",
    description:
      "The assistant syncs with your product catalog, collections, policies, and FAQs. It reads everything your store already has — nothing to configure manually.",
    accent: "#4F46E5",
  },
  {
    step: "03",
    title: "Customers get instant, accurate answers",
    description:
      "The assistant appears on your product pages and answers questions in real time — about sizing, shipping, returns, and comparisons — exactly when customers need it.",
    accent: "#7C3AED",
  },
  {
    step: "04",
    title: "Watch conversions and confidence grow",
    description:
      "Track chats, question types, and engagement from your analytics dashboard. See exactly where customers hesitate and how Helloii moves them forward.",
    accent: "#2563EB",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-20 h-72 w-72 rounded-full bg-[#4F46E5]/08 blur-3xl" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-4xl lg:text-5xl">
            Up and running in{" "}
            <span className="text-[#2563EB]">under 10 minutes</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-500">
            No technical setup. No prompt engineering. Helloii reads your store
            and gets to work immediately.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/65 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md"
            >
              {/* Step number background accent */}
              <div
                className="absolute -right-3 -top-3 text-[5rem] font-black leading-none opacity-[0.04] select-none"
                style={{ color: s.accent }}
              >
                {s.step}
              </div>

              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ background: s.accent }}
              >
                {s.step}
              </div>

              <h3 className="text-base font-bold tracking-[-0.025em] text-neutral-950">
                {s.title}
              </h3>

              <p className="mt-2.5 text-sm leading-6 text-neutral-500">
                {s.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-5 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: s.accent }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
