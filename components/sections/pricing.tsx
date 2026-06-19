"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For stores just getting started.",
    cta: "Get started free",
    href: "http://apps.shopify.com/ai-sales-support-assistant",
    accent: "#2563EB",
    accentLight: "#60a5fa",
  },
  {
    name: "Growth",
    price: "$25",
    period: "/mo",
    description: "More volume and brand control.",
    cta: "Start free trial",
    href: "http://apps.shopify.com/ai-sales-support-assistant",
    accent: "#7C3AED",
    accentLight: "#a78bfa",
  },
  {
    name: "Scale",
    price: "$55",
    period: "/mo",
    description: "Full control for high-volume stores.",
    cta: "Start free trial",
    href: "http://apps.shopify.com/ai-sales-support-assistant",
    accent: "#4F46E5",
    accentLight: "#818cf8",
  },
];

type RowValue = string | boolean;

const ROWS: { label: string; values: RowValue[] }[] = [
  { label: "Chats per month", values: ["1,000", "5,000", "Unlimited"] },
  { label: "Shopify stores", values: ["1", "1", "3"] },
  { label: "Product catalog sync", values: [true, true, true] },
  { label: "Custom brand colors", values: [false, true, true] },
  { label: "Product recommendations", values: [false, true, true] },
  { label: "Analytics", values: ["Basic", "Advanced", "Advanced"] },
  { label: "Chat widget", values: ["Standard", "Custom", "White-label"] },
  { label: "API access", values: [false, false, true] },
  { label: "Support", values: ["Email", "Priority", "Dedicated"] },
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
            14-day free trial on all plans. No credit card required. Cancel any
            time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer glass container */}
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/65 shadow-[0_8px_40px_rgba(0,0,0,0.07)] backdrop-blur-md">
            {/* Scrollable table wrapper (mobile) */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                {/* Plan headers */}
                <thead>
                  <tr>
                    {/* Feature label column */}
                    <th className="w-[38%] px-6 pb-6 pt-8 text-left align-bottom">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                        Features
                      </span>
                    </th>

                    {PLANS.map((plan, i) => (
                      <th
                        key={plan.name}
                        className="px-4 pb-6 pt-8 text-left align-top"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                          {/* Accent top bar */}
                          <div
                            className="mb-4 h-0.5 w-8 rounded-full"
                            style={{ background: plan.accent }}
                          />

                          <p
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: plan.accent }}
                          >
                            {plan.name}
                          </p>

                          <div className="mt-2 flex items-end gap-0.5">
                            <span className="text-3xl font-bold tracking-tight text-neutral-950">
                              {plan.price}
                            </span>
                            <span className="mb-1 text-sm text-neutral-400">
                              {plan.period}
                            </span>
                          </div>

                          <p className="mt-1.5 text-xs leading-5 text-neutral-500">
                            {plan.description}
                          </p>
                        </motion.div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Feature rows */}
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.label}
                      className="border-t border-neutral-100/80"
                    >
                      <td className="px-6 py-3.5 text-sm font-medium text-neutral-600">
                        {row.label}
                      </td>

                      {row.values.map((val, pi) => (
                        <td key={pi} className="px-4 py-3.5 text-sm">
                          {typeof val === "boolean" ? (
                            val ? (
                              <span
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                style={{ background: PLANS[pi].accent }}
                              >
                                ✓
                              </span>
                            ) : (
                              <span className="text-neutral-300">—</span>
                            )
                          ) : (
                            <span className="font-medium text-neutral-800">
                              {val}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* CTA row */}
                  <tr className="border-t border-neutral-100/80">
                    <td className="px-6 py-6" />
                    {PLANS.map((plan) => (
                      <td key={plan.name} className="px-4 py-6">
                        <LiquidGlassBubble
                          accent={plan.accent}
                          accentLight={plan.accentLight}
                          className="btn-press block rounded-full"
                        >
                          <a
                            href={plan.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full py-2.5 text-center text-sm font-semibold"
                          >
                            {plan.cta}
                          </a>
                        </LiquidGlassBubble>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-xs text-neutral-400"
        >
          All plans include a 14-day free trial · Billed monthly · Cancel
          anytime via Shopify
        </motion.p>
      </Container>
    </section>
  );
}
