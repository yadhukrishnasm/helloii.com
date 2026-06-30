"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { FAQ_GROUPS, ALL_FAQS } from "@/lib/faq-data";

const faqGroups = FAQ_GROUPS;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute left-[8%] top-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-[#1A56FF]/10 blur-[100px] sm:h-[480px] sm:w-[480px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-[#8B2FFF]/10 blur-[100px] sm:h-[480px] sm:w-[480px]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="glass-item inline-flex rounded-full px-4 py-2 text-sm font-semibold text-[#1A56FF]">
              FAQ
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mt-6 text-4xl font-bold leading-[0.95] tracking-tighter text-neutral-950 sm:text-5xl lg:text-7xl">
              Questions store owners usually ask.
            </h2>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              Answers about what Helloii AI does, how it works, what it costs,
              and how it fits inside a Shopify store.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-10 sm:mt-20">
          {faqGroups.map((group) => (
            <div key={group.category}>
              <Reveal>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                  {group.category}
                </h3>
              </Reveal>

              <div className="space-y-4">
                {group.items.map((faq, index) => (
                  <Reveal key={faq.question}>
                    <FAQItem
                      question={faq.question}
                      answer={faq.answer}
                      index={index}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
        <span className="text-base font-bold tracking-tight text-neutral-950 sm:text-lg">
          {question}
        </span>

        <span
          className={`btn-press btn-glass-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-medium text-[#1A56FF] duration-300 ${open ? "rotate-45" : "rotate-0"}`}
        >
          +
        </span>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s ease-in-out",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="border-t border-neutral-100 px-5 pb-6 pt-4 sm:px-7">
            <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
