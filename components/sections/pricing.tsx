"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";

const SHOPIFY_URL = "http://apps.shopify.com/ai-sales-support-assistant";

const PLANS = [
  {
    name: "Free",
    price: "Free",
    period: null,
    accent: "#2563EB",
    accentLight: "#60a5fa",
    features: [
      "50 Chats Per month",
      "20 Products maximum for training",
      "10 Other Training knowledge",
      "Basic support",
    ],
  },
  {
    name: "Basic",
    price: "$25",
    period: "/ month",
    accent: "#7C3AED",
    accentLight: "#C4B5FD",
    features: [
      "1000 Chats Per month",
      "500 Products maximum for training",
      "50 Other Training knowledge",
      "Priority support - 24/7",
    ],
  },
  {
    name: "Pro",
    price: "$55",
    period: "/ month",
    accent: "#6D28D9",
    accentLight: "#A78BFA",
    features: [
      "2500 Chats Per month",
      "1000 Products maximum for training",
      "120 Other Training knowledge",
      "Priority support - 24/7",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-[-8%] top-16 h-72 w-72 rounded-full bg-[#7C3AED]/08 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-8%] h-80 w-80 rounded-full bg-[#2563EB]/08 blur-3xl" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            Simple pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Plans for every store
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-neutral-500">
            No credit card required. Cancel any time.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-card rounded-[28px] p-6"
            >
              <p className="relative z-10 text-sm font-bold uppercase tracking-widest text-neutral-500">
                {plan.name}
              </p>

              <div className="relative z-10 mt-3 flex items-end gap-1">
                <span className="text-4xl font-bold tracking-tight text-neutral-950">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="mb-1 text-sm text-neutral-400">
                    {plan.period}
                  </span>
                )}
              </div>

              <p className="relative z-10 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                Features
              </p>

              <ul className="relative z-10 mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-6 text-neutral-700"
                  >
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: plan.accent }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <LiquidGlassBubble
                accent={plan.accent}
                accentLight={plan.accentLight}
                className="btn-press relative z-10 mt-7 block rounded-full"
              >
                <a
                  href={SHOPIFY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2.5 text-center text-sm font-semibold"
                >
                  Get started
                </a>
              </LiquidGlassBubble>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-xs text-neutral-400"
        >
          Billed monthly · Cancel anytime via Shopify
        </motion.p>
      </Container>
    </section>
  );
}
