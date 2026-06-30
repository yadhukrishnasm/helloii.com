"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "@/components/layout/container";
import ChatPreview from "@/components/scroll-story/product-revealt-chat";
import { FaqAnswerWidget } from "../FaqAnswerWidget";
import { StatIcon } from "../icons";
import { FLOWS } from "../data/product-flows";
import type { Flow } from "../data/product-flows";
import { useMotionIndex } from "../hooks/useMotionIndex";

const DEMO_URL = "https://demo.helloii.com";

/**
 * Mobile/tablet's "What Helloii does" — native scroll throughout, no
 * page-wide scroll-jacking. Text reveals once via whileInView as it
 * scrolls into view. The chat gets its own dedicated tall wrapper with a
 * *local* sticky window (not the whole flow, not the whole page) so just
 * the chat card holds still for a comfortable scroll distance while
 * turns advance one at a time — driven by a local useScroll + MotionValue
 * progress, not rAF/getBoundingClientRect polling.
 *
 * Shown below `lg:` — matches ScrollStory's own cutoff, since
 * ProductFlowScene's 2-column grid (the desktop layout this replaces)
 * also only kicks in at `lg`.
 */
export function MobileProductReveal() {
  return (
    <section
      id="product-mobile"
      className="relative overflow-x-clip [overflow-clip-margin:20px] py-20 lg:hidden"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            What Helloii AI does
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
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
          {FLOWS.map((flow) => (
            <MobileFlow key={flow.tag} flow={flow} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function MobileFlow({ flow }: { flow: Flow }) {
  const total = flow.turns.length;

  const chatRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: chatProgress } = useScroll({
    target: chatRef,
    offset: ["start start", "end end"],
  });

  const [chatStarted, setChatStarted] = useState(false);
  useMotionValueEvent(chatProgress, "change", (latest) => {
    if (latest > 0.02 && !chatStarted) setChatStarted(true);
  });

  const turnIndex = useMotionIndex(chatProgress, total);

  return (
    <section className="relative overflow-x-clip [overflow-clip-margin:20px] py-14">
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

        <div className="mt-4 flex flex-wrap gap-2.5">
          {flow.stats.map((stat) => (
            <span
              key={stat.label}
              className="glass-item inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-neutral-600"
            >
              <span className="h-5 w-5 shrink-0">
                <StatIcon name={stat.icon} color={flow.accent} />
              </span>
              {stat.label}
            </span>
          ))}
        </div>
      </motion.div>

      <div
        ref={chatRef}
        className="relative mb-10 mt-8"
        style={{ height: `${total * 70}vh` }}
      >
        {/* h-screen + flex centering keeps the chat vertically centered
            in the viewport the whole time it's stuck, instead of pinned
            near the top edge. */}
        <div
          className="sticky flex flex-col items-center justify-center"
          style={{ top: "var(--nav-height)", height: "calc(100vh - var(--nav-height))" }}
        >
          <div
            style={{ opacity: chatStarted ? 1 : 0.4 }}
            className="w-full transition-opacity duration-500 ease-out"
          >
            {flow.faqWidget ? (
              <FaqAnswerWidget
                turns={flow.turns}
                accent={flow.accent}
                start={chatStarted}
                controlledTurn={turnIndex}
                suggestions={flow.faqWidget.suggestions}
              />
            ) : (
              <ChatPreview
                turns={flow.turns}
                accent={flow.accent}
                start={chatStarted}
                controlledTurn={turnIndex}
              />
            )}
          </div>

          <div className="mt-6 flex items-center gap-2">
            {flow.turns.map((turn, i) => (
              <span
                key={turn.question}
                className="h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: i === turnIndex ? 22 : 8,
                  background: i <= turnIndex ? flow.accent : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The animated chat above starts empty and types in client-side —
          crawlers/LLMs that don't run that JS would otherwise see no
          conversation text at all. This sr-only block puts the full Q&A
          in the server-rendered HTML, present from first paint, without
          touching the visible layout. */}
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
