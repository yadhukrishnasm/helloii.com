"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";

const PLANS = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Perfect for stores just getting started with AI-powered support.",
    features: [
      "Up to 1,000 chats / month",
      "1 Shopify store",
      "Full product catalog sync",
      "Standard chat widget",
      "Basic analytics dashboard",
      "Email support",
    ],
    cta: "Start free trial",
    accent: "#2563EB",
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "For growing stores that need more volume and brand control.",
    features: [
      "Up to 5,000 chats / month",
      "1 Shopify store",
      "Custom brand colors & widget",
      "Product recommendations engine",
      "Advanced analytics per day",
      "Priority email support",
    ],
    cta: "Start free trial",
    accent: "#7C3AED",
  },
  {
    name: "Scale",
    price: "$99",
    period: "/month",
    description: "For high-volume stores and teams that need full control.",
    features: [
      "Unlimited chats",
      "Up to 3 Shopify stores",
      "White-label widget",
      "API access",
      "Custom knowledge base entries",
      "Dedicated onboarding & support",
    ],
    cta: "Contact us",
    accent: "#2563EB",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
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
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-4xl">
            Plans for every store
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-neutral-500">
            14-day free trial on all plans. No credit card required to get
            started. Cancel any time.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/65 p-7 backdrop-blur-md"
            >

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  {plan.name}
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-neutral-950">
                    {plan.price}
                  </span>
                  <span className="mb-1 text-sm font-medium text-neutral-400">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{plan.description}</p>
              </div>

              <ul className="mb-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: plan.accent }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <LiquidGlassBubble
                accent={plan.accent}
                accentLight={plan.accent === "#7C3AED" ? "#a78bfa" : "#60a5fa"}
                className="btn-press block w-full rounded-full"
              >
                <a
                  href="http://apps.shopify.com/ai-sales-support-assistant"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-3 text-center text-sm font-semibold"
                >
                  {plan.cta}
                </a>
              </LiquidGlassBubble>
            </motion.div>
          ))}
        </div>

        {/* Trust footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center text-xs text-neutral-400"
        >
          All plans include a 14-day free trial · Billed monthly · Cancel anytime via Shopify
        </motion.p>
      </Container>
    </section>
  );
}
