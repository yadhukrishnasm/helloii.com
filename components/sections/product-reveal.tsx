"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/container";
import type { ChatTurn } from "@/components/sections/chatbot-animation";
import ChatPreview from "../ui/product-revealt-chat";

const DEMO_URL = "https://demo.helloii.com";

const FLOWS: {
  tag: string;
  headline: string;
  description: string;
  accent: string;
  turns: ChatTurn[];
  chips: [string, string];
  stats: string[];
}[] = [
  {
    tag: "Instant Answers",
    headline:
      "Helloii answers customer questions about products, shipping, payment, or anything else on your store.",
    description:
      "Instead of leaving customers to figure it out, Helloii gives them an instant, accurate answer — so they don't open a support ticket or leave.",
    accent: "#2563EB",
    turns: [
      {
        question: "How long will it take to get my order delivered?",
        answer:
          "Delivery times vary by city. Metro cities take 3–5 days; other cities take 5–7 days. Could you tell me your city? Then I can tell you exactly when it'll arrive.",
      },
      {
        question: "Do you have this in size 12?",
        answer:
          "Sorry, we're out of size 12 for this product right now. Want me to suggest a similar product that has your size?",
      },
      {
        question: "What is your return policy?",
        answer: "We have a no-questions-asked return policy.",
      },
    ],
    chips: [
      "Do you have this in size 12?",
      "How long will it take to get my order delivered?",
    ],
    stats: ["24/7 online", "Instant AI answers", "Fewer support tickets"],
  },
  {
    tag: "Product recommendations",
    headline:
      "Helloii asks the right questions and recommends the exact product the customer is looking for.",
    description:
      "Instead of leaving customers to dig through your catalog, Helloii guides them to the right product — and lifts conversions.",
    accent: "#7C3AED",
    turns: [
      {
        question:
          "I need a gift for my mom, she likes skincare but has sensitive skin.",
        answer:
          "Got it — for sensitive skin I'd suggest our Fragrance-Free Hydrating Set. It's our most popular gift for sensitive skin and ships in a gift box. Want me to show it?",
      },
      {
        question: "Looking for running shoes for flat feet under ₹4000.",
        answer:
          "The Stride Support Trainer is built for flat feet and is ₹3,499. Want me to check your size?",
      },
      {
        question: "Which of your coffees is the least bitter?",
        answer:
          "That'd be our Medium Roast Hazelnut — smooth, low bitterness, our top pick for first-time buyers. Want a bag?",
      },
    ],
    chips: [
      "Which of your coffees is the least bitter?",
      "I need a gift for my mom, she likes skincare but has sensitive skin.",
    ],
    stats: [
      "Personalized recommendations",
      "Guided product discovery",
      "Better buying confidence",
    ],
  },
  {
    tag: "Smart FAQs",
    headline: "No more predefined FAQs.",
    description:
      "Helloii answers any question a customer asks while browsing — not just a fixed list.",
    accent: "#D97706",
    turns: [
      {
        question: "Is this jacket warm enough for winter?",
        answer:
          "Yes — it's rated for temperatures down to -5°C with an insulated lining. Great for most winters.",
      },
      {
        question: "Can I machine wash this?",
        answer:
          "Yes, machine wash cold and air dry. Avoid tumble drying to keep the shape.",
      },
      {
        question: "Do you ship to Canada?",
        answer:
          "Yes, we ship to Canada. Standard delivery is 7–10 business days.",
      },
    ],
    chips: ["Do you ship to Canada?", "Is this jacket warm enough for winter?"],
    stats: ["Dynamic answers", "No manual FAQ setup", "Store-aware support"],
  },
];

function ProductFlowSection({
  flow,
  index,
}: {
  flow: (typeof FLOWS)[number];
  index: number;
}) {
  const reverse = index % 2 === 1;
  // The chat demo only starts typing/sending/replying once this section is
  // actually scrolled into view — otherwise it's already mid-conversation
  // by the time someone reaches it.
  const chatRef = useRef<HTMLDivElement>(null);
  const chatInView = useInView(chatRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest"
            style={{
              background: `${flow.accent}18`,
              color: flow.accent,
            }}
          >
            {flow.tag}
          </span>

          <h3 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
            {flow.headline}
          </h3>

          <p className="mt-5 max-w-xl text-base leading-8 text-neutral-500">
            {flow.description}
          </p>

          <a
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-black hover:underline"
            style={{ color: flow.accent }}
          >
            View on a demo website
            <span aria-hidden>→</span>
          </a>

          <div className="mt-5 flex flex-wrap gap-2">
            {flow.stats.map((stat) => (
              <span
                key={stat}
                className="glass-item rounded-full px-3 py-1.5 text-xs font-bold text-neutral-600"
              >
                {stat}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={chatRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{
            duration: 0.6,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ChatPreview
            turns={flow.turns}
            accent={flow.accent}
            start={chatInView}
          />

          {/* The animated chat above starts empty and types in client-side
              — crawlers/LLMs that don't run that JS would otherwise see no
              conversation text at all. This sr-only block puts the full
              Q&A in the server-rendered HTML, present from first paint,
              without touching the visible layout. */}
          <div className="sr-only">
            {flow.turns.map((turn) => (
              <p key={turn.question}>
                Q: {turn.question} A: {turn.answer}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ProductReveal() {
  return (
    <section id="product" className="relative overflow-hidden py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            What Helloii does
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Answers every question,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-amber-600 bg-clip-text text-transparent">
              inside your store
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-500">
            Each feature is shown as a real customer conversation, followed by
            the exact value it brings to the store.
          </p>
        </motion.div>

        <div className="divide-y divide-neutral-200/70">
          {FLOWS.map((flow, index) => (
            <ProductFlowSection key={flow.tag} flow={flow} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
