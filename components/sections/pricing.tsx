"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

const PLANS = [
  {
    name: "Starter",
    price: "—",
    description: "Placeholder — pricing details coming soon.",
    features: [
      "Placeholder feature one",
      "Placeholder feature two",
      "Placeholder feature three",
      "Placeholder feature four",
    ],
    cta: "Get started",
    popular: false,
    accent: "#2563EB",
  },
  {
    name: "Growth",
    price: "—",
    description: "Placeholder — pricing details coming soon.",
    features: [
      "Everything in Starter",
      "Placeholder feature one",
      "Placeholder feature two",
      "Placeholder feature three",
      "Placeholder feature four",
    ],
    cta: "Get started",
    popular: true,
    accent: "#FF2FB2",
  },
  {
    name: "Pro",
    price: "—",
    description: "Placeholder — pricing details coming soon.",
    features: [
      "Everything in Growth",
      "Placeholder feature one",
      "Placeholder feature two",
      "Placeholder feature three",
      "Priority support",
    ],
    cta: "Contact us",
    popular: false,
    accent: "#2563EB",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
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
            Start free, scale as you grow. No hidden fees.
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
              className={`relative rounded-2xl border p-6 ${
                plan.popular
                  ? "border-[#FF2FB2]/40 bg-white shadow-[0_8px_40px_rgba(255,47,178,0.10)]"
                  : "border-neutral-200/70 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-[#FF2FB2] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                  {plan.name}
                </p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-neutral-950">
                  {plan.price}
                </p>
                <p className="mt-2 text-sm text-neutral-500">{plan.description}</p>
              </div>

              <ul className="mb-7 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <span className="mt-0.5 text-xs" style={{ color: plan.accent }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="http://apps.shopify.com/ai-sales-support-assistant"
                target="_blank"
                rel="noreferrer"
                className={`block w-full rounded-full py-3 text-center text-sm font-bold transition-opacity hover:opacity-90 ${
                  plan.popular
                    ? "bg-[#FF2FB2] text-white shadow-[0_4px_16px_rgba(255,47,178,0.28)]"
                    : "bg-[#2563EB] text-white shadow-[0_4px_16px_rgba(37,99,235,0.22)]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
