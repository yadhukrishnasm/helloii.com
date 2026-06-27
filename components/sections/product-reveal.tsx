"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import type { ChatTurn } from "@/components/sections/chatbot-animation";
import ChatPreview from "../ui/product-revealt-chat";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Tracks scroll progress (0–1) across `ref`'s element by hand instead of
// framer-motion's useScroll/useMotionValueEvent — with several
// ProductFlowSection instances each running their own scroll-tracking
// hooks simultaneously, framer's stop firing reliably (this hit both the
// desktop and mobile paths here). A plain rAF loop reading
// getBoundingClientRect directly is slower to write but actually works
// under that load.
function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollable = rect.height - vh;
        const raw =
          scrollable > 0 ? -rect.top / scrollable : rect.top <= 0 ? 1 : 0;
        const next = Math.min(1, Math.max(0, raw));
        setProgress((prev) => (Math.abs(prev - next) > 0.0005 ? next : prev));
      }
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [ref]);

  return progress;
}

// Drives the pin-and-advance behavior on desktop only — on mobile the
// chat plays itself on a timer like it always did, since pinning a tall
// scroll-jacked section is a much rougher experience on touch scrolling.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

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
    accent: "#1A56FF",
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
    accent: "#8B2FFF",
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
    accent: "#5B4FFF",
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
  const isDesktop = useIsDesktop();
  const total = flow.turns.length;

  // The whole flow is divided into scroll segments: one to bring the text
  // in, one to bring the chat box in, one per question, and one trailing
  // "buffer" segment so the last answer has a moment to sit before the
  // pin releases into the next flow. Nothing here runs on a timer —
  // every reveal is a direct function of scroll progress.
  const segments = total + 3;
  const seg = 1 / segments;

  const pinRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(pinRef);

  const textT = Math.min(1, Math.max(0, progress / seg));
  const textOpacity = textT;
  const textY = lerp(18, 0, textT);

  const chatT = Math.min(1, Math.max(0, (progress - seg) / seg));
  const chatOpacity = chatT;
  const chatY = lerp(24, 0, chatT);
  const chatStarted = progress >= seg * 2;

  const turnsProgress = Math.min(
    1,
    Math.max(0, (progress - seg * 2) / (seg * total)),
  );
  const turnIndex = Math.min(
    total - 1,
    Math.max(0, Math.floor(turnsProgress * total)),
  );

  // Mobile gets its own, much calmer mechanism — the desktop segment math
  // above packs 6 distinct phases into whatever the flow's *natural*
  // height happens to be (no extra scroll room, no pin), which on a phone
  // is only a few hundred px — everything fires almost at once and feels
  // jumpy. Instead: text reveals once, normally, as it scrolls into view;
  // the chat gets a dedicated tall wrapper with a *local* sticky window
  // (not the whole flow) so just the chat card holds still for a
  // comfortable scroll distance while turns advance one at a time.
  const mobileChatRef = useRef<HTMLDivElement>(null);
  const mobileProgress = useScrollProgress(mobileChatRef);
  const mobileChatStarted = mobileProgress > 0.02;
  const mobileTurnIndex = Math.min(
    total - 1,
    Math.max(0, Math.floor(mobileProgress * total)),
  );

  if (!isDesktop) {
    return (
      <section className="relative py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest"
            style={{ background: `${flow.accent}18`, color: flow.accent }}
          >
            {flow.tag}
          </span>

          <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-neutral-950">
            {flow.headline}
          </h3>

          <p className="mt-4 text-base leading-7 text-neutral-500">
            {flow.description}
          </p>

          <a
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-black hover:underline"
            style={{ color: flow.accent }}
          >
            View on a demo website
            <span aria-hidden>→</span>
          </a>

          <div className="mt-4 flex flex-wrap gap-2">
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

        <div
          ref={mobileChatRef}
          className="relative mb-10 mt-8"
          style={{ height: `${total * 70}vh` }}
        >
          {/* h-screen + flex centering (instead of a fixed top-offset)
              keeps the chat vertically centered in the viewport for the
              whole time it's stuck, not pinned near the top edge. */}
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
            <div
              style={{ opacity: mobileChatStarted ? 1 : 0.4 }}
              className="w-full transition-opacity duration-500 ease-out"
            >
              <ChatPreview
                turns={flow.turns}
                accent={flow.accent}
                start={mobileChatStarted}
                controlledTurn={mobileTurnIndex}
              />
            </div>

            <div className="mt-6 flex items-center gap-2">
              {flow.turns.map((turn, i) => (
                <span
                  key={turn.question}
                  className="h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: i === mobileTurnIndex ? 22 : 8,
                    background:
                      i <= mobileTurnIndex ? flow.accent : "#e5e7eb",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

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
      </section>
    );
  }

  return (
    <section
      ref={pinRef}
      className="relative"
      style={{ height: `${segments * 100}vh` }}
    >
      <div
        className="relative flex items-center py-16 lg:py-24"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <div
          className={`grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div style={{ opacity: textOpacity, y: textY }}>
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

            {/* Progress dots — which question scroll has reached so far,
                fades in alongside the chat box itself. */}
            <motion.div
              style={{ opacity: chatOpacity }}
              className="mt-7 flex items-center gap-2"
            >
              {flow.turns.map((turn, i) => (
                <span
                  key={turn.question}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === turnIndex ? 22 : 8,
                    background: i <= turnIndex ? flow.accent : "#e5e7eb",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: chatOpacity, y: chatY }}>
            <ChatPreview
              turns={flow.turns}
              accent={flow.accent}
              start={chatStarted}
              controlledTurn={turnIndex}
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
      </div>
    </section>
  );
}

export function ProductReveal() {
  // No overflow-hidden on this section — it would break position:sticky
  // on the pinned chat-flow sections below (an overflow-hidden ancestor
  // stops sticky descendants from engaging at all).
  return (
    <section id="product" className="relative py-20 sm:py-28">
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
            <span className="bg-gradient-to-r from-[#1A56FF] via-[#5B4FFF] to-[#8B2FFF] bg-clip-text text-transparent">
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
