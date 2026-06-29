"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Container } from "@/components/layout/container";
import ChatPreview from "@/components/ui/product-revealt-chat";
import { FaqAnswerWidget } from "../FaqAnswerWidget";
import { StatIcon } from "../icons";
import type { Flow } from "../data/product-flows";
import { useMotionIndex } from "../hooks/useMotionIndex";

const DEMO_URL = "https://demo.helloii.com";

/**
 * Pure scene: receives this flow's own local 0–1 progress from
 * SceneFrame and derives every reveal from it via useTransform — no
 * useScroll, no requestAnimationFrame, no per-frame setState. The only
 * React state in here is the discrete chat-turn index (via
 * useMotionIndex) and the one-shot "has the chat started" flag, both of
 * which only re-render when their value actually flips.
 *
 * Timing: the flow's progress is divided into `turns + 2` equal
 * segments — one for the text (headline/description), which fades in
 * and then sticks in place, one for the chat/widget (which only starts
 * fading in once the text segment is done, i.e. on the *next* bit of
 * scroll), and one segment per question after that.
 */
export function ProductFlowScene({
  flow,
  reverse,
  progress,
}: {
  flow: Flow;
  reverse: boolean;
  progress: MotionValue<number>;
}) {
  const total = flow.turns.length;
  const segments = total + 2;
  const seg = 1 / segments;

  // [0.0001, ...] instead of [0, ...] — an input range that starts at a
  // literal 0 has caused a derived useTransform value to stick at its
  // initial output in this codebase before; the nudge is imperceptible
  // (well under a pixel of scroll) and sidesteps it for good.
  const textOpacity = useTransform(progress, [0.0001, seg], [0, 1]);
  const textY = useTransform(progress, [0.0001, seg], [18, 0]);

  const chatOpacity = useTransform(progress, [seg, seg * 2], [0, 1]);
  const chatY = useTransform(progress, [seg, seg * 2], [24, 0]);

  const [chatStarted, setChatStarted] = useState(false);
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= seg * 2 && !chatStarted) setChatStarted(true);
  });

  const turnIndex = useMotionIndex(progress, total, seg * 2, 1);

  return (
    <Container className="relative flex h-full items-center py-16 lg:py-24">
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

          <div className="mt-5 flex flex-wrap gap-2.5">
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

          {/* The animated widget above starts empty and types in
              client-side — crawlers/LLMs that don't run that JS would
              otherwise see no conversation text at all. This sr-only
              block puts the full Q&A in the server-rendered HTML,
              present from first paint, without touching the visible
              layout. */}
          <div className="sr-only">
            {flow.turns.map((turn) => (
              <p key={turn.question}>
                Q: {turn.question} A: {turn.answer}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
