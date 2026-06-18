"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ChatbotAnimation } from "@/components/sections/chatbot-animation";

const FLOWS = [
  {
    tag: "Product Questions",
    headline: "Size, stock, variants — answered instantly",
    description:
      "Customers ask and Helloii pulls the exact answer from your Shopify catalog. No more 'DM us for details'.",
    accent: "#2563EB",
  },
  {
    tag: "Store Policies",
    headline: "Returns, shipping, refunds — always ready",
    description:
      "Your store policies are always on hand. Helloii answers them naturally so your team doesn't have to.",
    accent: "#FF2FB2",
  },
  {
    tag: "Product Discovery",
    headline: "Smarter recommendations that convert",
    description:
      "When a shopper is unsure, Helloii guides them to the right product — keeping them in your store instead of leaving.",
    accent: "#2563EB",
  },
  {
    tag: "WhatsApp Support",
    headline: "Support that follows the shopper",
    description:
      "Extend Helloii to WhatsApp. Customers get answers wherever they feel most comfortable asking.",
    accent: "#FF2FB2",
  },
];

const FADE_VARIANTS = {
  enter: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function ProductReveal() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % FLOWS.length);
    }, 3200);

    return () => clearInterval(id);
  }, []);

  const flow = FLOWS[active];

  return (
    <section id="product" className="relative overflow-hidden py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            See it in action
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-4xl lg:text-5xl">
            Answers every question,{" "}
            <span className="text-[#2563EB]">inside your store</span>
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg lg:w-[42%] lg:max-w-none"
          >
            <div className="mb-8 flex gap-2">
              {FLOWS.map((f, i) => (
                <button
                  key={f.tag}
                  onClick={() => setActive(i)}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    background: i === active ? flow.accent : "#e5e7eb",
                  }}
                  aria-label={f.tag}
                  type="button"
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={FADE_VARIANTS}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: `${flow.accent}15`,
                    color: flow.accent,
                  }}
                >
                  {flow.tag}
                </span>

                <h3 className="mt-4 text-2xl font-bold leading-snug tracking-[-0.03em] text-neutral-950 sm:text-3xl">
                  {flow.headline}
                </h3>

                <p className="mt-4 text-base leading-7 text-neutral-500">
                  {flow.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() =>
                  setActive((prev) => (prev - 1 + FLOWS.length) % FLOWS.length)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:text-neutral-950"
                aria-label="Previous"
                type="button"
              >
                ←
              </button>

              <button
                onClick={() => setActive((prev) => (prev + 1) % FLOWS.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:text-neutral-950"
                aria-label="Next"
                type="button"
              >
                →
              </button>

              <span className="ml-2 text-xs text-neutral-400">
                {active + 1} / {FLOWS.length}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full lg:flex-1"
          >
            <div className="relative mx-auto aspect-[820/760] w-full max-w-[860px] overflow-visible bg-transparent px-6 py-10">
              <ChatbotAnimation />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
