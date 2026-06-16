"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    question: "What is Helloii?",
    answer:
      "Helloii is an AI shopping assistant for ecommerce stores. It helps customers ask questions, discover products, understand policies, and move closer to checkout.",
  },
  {
    question: "Does Helloii work with Shopify?",
    answer:
      "Yes. Helloii is built for Shopify stores and can be connected to your storefront so customers can interact with the assistant directly while browsing.",
  },
  {
    question: "Can it answer product questions?",
    answer:
      "Yes. Helloii can help answer questions about products, variants, sizing, availability, returns, delivery, and store policies depending on the data connected to it.",
  },
  {
    question: "Can I customize the chatbot design?",
    answer:
      "Yes. The widget can be styled to match your brand, including colors, layout, and the glass-like assistant interface.",
  },
  {
    question: "Is this only for support?",
    answer:
      "No. Helloii is not just a support bot. It also helps with product discovery, buying decisions, recommendations, and conversion-focused conversations.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a demo and we will walk you through the setup, storefront integration, and how Helloii can fit your store.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute left-[8%] top-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-[#FF2FB2]/10 blur-[100px] sm:h-[480px] sm:w-[480px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-[#FFB800]/14 blur-[100px] sm:h-[480px] sm:w-[480px]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="glass-item inline-flex rounded-full px-4 py-2 text-sm font-semibold text-[#2563EB]">
              FAQ
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mt-6 text-4xl font-bold leading-[0.95] tracking-[-0.06em] text-neutral-950 sm:text-5xl lg:text-7xl">
              Questions store owners usually ask.
            </h2>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              Simple answers about what Helloii does, how it works, and where it
              fits inside your ecommerce store.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-4 sm:mt-20">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/65 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7 sm:py-6"
      >
        <span className="text-base font-bold tracking-[-0.03em] text-neutral-950 sm:text-lg">
          {question}
        </span>

        <span
          className={`btn-glass-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-medium text-[#2563EB] transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, delay: 0.1, ease: "easeOut" },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.32, ease: [0.55, 0, 0.1, 1] },
                opacity: { duration: 0.16, ease: "easeIn" },
              },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-100 px-5 pb-6 pt-4 sm:px-7">
              <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
