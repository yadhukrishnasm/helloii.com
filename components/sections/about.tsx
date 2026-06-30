"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Container } from "@/components/layout/container";

const questions = [
  {
    question: "What product should I buy?",
    answer:
      "Helloii AI understands intent and guides shoppers to the right product.",
    color: "#FF2FB2",
  },
  {
    question: "Do you have this in my size?",
    answer:
      "Customers can ask product-specific questions without leaving the page.",
    color: "#FFB800",
  },
  {
    question: "What is your return policy?",
    answer:
      "Helloii AI answers common support questions using your store information.",
    color: "#FF3B30",
  },
  {
    question: "Can you recommend something similar?",
    answer:
      "It keeps visitors browsing instead of bouncing when they are unsure.",
    color: "#2563EB",
  },
];

/* ─────────────────────────────────────────────────────────────────
   Public export — wrapper so #about anchor always hits the right spot
───────────────────────────────────────────────────────────────── */
export function About() {
  return (
    <div id="about" className="relative">
      <AboutScrollSection />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL-LOCKED SECTION  (all screens)

   Scroll progress phases (section is ~400 vh):
     0.00 – 0.07  badge in
     0.05 – 0.13  heading in
     0.09 – 0.16  paragraph in
     0.13 – 0.20  buttons in
     ── hold ──
     0.22 – 0.32  right box slides in from right
     ── cards appear one by one ──
     0.34 – 0.42  question 1
     0.44 – 0.52  question 2
     0.54 – 0.62  question 3
     0.64 – 0.72  question 4
     0.74 – 0.82  stats row
     ── hold all visible ──
     0.85 – 1.00  section ends, page scrolls normally
───────────────────────────────────────────────────────────────── */
function AboutScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * All ranges finish at 0.62 max, leaving 0.62–1.0 = 38% of the section
   * as a "hold-all-visible" buffer before the next section appears.
   * Each transform uses a 4-point map: the last two points are identical
   * so the value is explicitly locked at its final state — this is more
   * reliable than relying solely on clamp when combined with Lenis scroll.
   * Scrolling back naturally reverses all animations.
   */

  /*
   * Section is 350vh → scroll budget = 250vh on mobile.
   * Cards are triggered 0.20 apart = 50vh between each trigger.
   * A typical mobile momentum swipe = 40–60vh, so each card gets its own swipe.
   * Each card snaps in over a short 0.05 window (12vh) then holds until the next trigger.
   */

  /* ── Phase 1: left side + box (0.00–0.17) — first scroll ── */
  const badgeOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.07, 0.08, 1],
    [0, 1, 1, 1],
  );
  const badgeY = useTransform(
    scrollYProgress,
    [0.0, 0.07, 0.08, 1],
    [24, 0, 0, 0],
  );
  const headingOpacity = useTransform(
    scrollYProgress,
    [0.03, 0.1, 0.11, 1],
    [0, 1, 1, 1],
  );
  const headingY = useTransform(
    scrollYProgress,
    [0.03, 0.1, 0.11, 1],
    [32, 0, 0, 0],
  );
  const paraOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.13, 1],
    [0, 1, 1, 1],
  );
  const paraY = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.13, 1],
    [24, 0, 0, 0],
  );
  const boxOpacity = useTransform(
    scrollYProgress,
    [0.07, 0.17, 0.18, 1],
    [0, 1, 1, 1],
  );
  const boxX = useTransform(
    scrollYProgress,
    [0.07, 0.17, 0.18, 1],
    [60, 0, 0, 0],
  );

  // Items reveal from BELOW (y: 32 → 0) with fade + scale.
  // maxHeight 0 → 300 collapses each wrapper when hidden; actual layout
  // height stays at content height so there is no extra gap between cards.
  const q0 = {
    opacity: useTransform(scrollYProgress, [0.2, 0.32, 1], [0, 1, 1]),
    y: useTransform(scrollYProgress, [0.2, 0.32, 1], [32, 0, 0]),
    scale: useTransform(scrollYProgress, [0.2, 0.32, 1], [0.96, 1, 1]),
    maxHeight: useTransform(scrollYProgress, [0.2, 0.32, 1], [0, 300, 300]),
  };
  const q1 = {
    opacity: useTransform(scrollYProgress, [0.36, 0.48, 1], [0, 1, 1]),
    y: useTransform(scrollYProgress, [0.36, 0.48, 1], [32, 0, 0]),
    scale: useTransform(scrollYProgress, [0.36, 0.48, 1], [0.96, 1, 1]),
    maxHeight: useTransform(scrollYProgress, [0.36, 0.48, 1], [0, 300, 300]),
  };
  const q2 = {
    opacity: useTransform(scrollYProgress, [0.52, 0.64, 1], [0, 1, 1]),
    y: useTransform(scrollYProgress, [0.52, 0.64, 1], [32, 0, 0]),
    scale: useTransform(scrollYProgress, [0.52, 0.64, 1], [0.96, 1, 1]),
    maxHeight: useTransform(scrollYProgress, [0.52, 0.64, 1], [0, 300, 300]),
  };
  const q3 = {
    opacity: useTransform(scrollYProgress, [0.68, 0.8, 1], [0, 1, 1]),
    y: useTransform(scrollYProgress, [0.68, 0.8, 1], [32, 0, 0]),
    scale: useTransform(scrollYProgress, [0.68, 0.8, 1], [0.96, 1, 1]),
    maxHeight: useTransform(scrollYProgress, [0.68, 0.8, 1], [0, 300, 300]),
  };
  const statsAnim = {
    opacity: useTransform(scrollYProgress, [0.84, 0.94, 1], [0, 1, 1]),
    y: useTransform(scrollYProgress, [0.84, 0.94, 1], [32, 0, 0]),
    scale: useTransform(scrollYProgress, [0.84, 0.94, 1], [0.96, 1, 1]),
    maxHeight: useTransform(scrollYProgress, [0.84, 0.94, 1], [0, 300, 300]),
  };

  return (
    <section ref={sectionRef} className="relative about-section">
      {/* Sticky frame — stays at top while section scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <Container className="h-full">
          <div className="flex h-full items-start pt-[68px] lg:items-center lg:pt-0">
            <div className="grid w-full items-center gap-6 lg:gap-16 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
              {/* ── Left ── */}
              <div>
                <motion.div
                  style={{ opacity: badgeOpacity, y: badgeY }}
                  className="glass-item inline-flex rounded-full px-4 py-2 text-sm font-bold text-[#2563EB]"
                >
                  About Helloii AI
                </motion.div>

                <motion.h2
                  style={{ opacity: headingOpacity, y: headingY }}
                  className="mt-4 lg:mt-6 max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tighter text-neutral-950 xl:text-7xl"
                >
                  Built for the moments shoppers hesitate.
                </motion.h2>

                <motion.p
                  style={{ opacity: paraOpacity, y: paraY }}
                  className="hidden lg:block mt-7 max-w-xl text-lg leading-8 text-neutral-600"
                >
                  Helloii AI gives your store an AI assistant that answers
                  questions, explains products, handles common doubts, and helps
                  customers move toward checkout.
                </motion.p>
              </div>

              {/* ── Right — glass card slides in, then cards appear one-by-one ── */}
              <motion.div style={{ opacity: boxOpacity, x: boxX }}>
                <div className="glass-card rounded-[28px] lg:rounded-[34px] p-4 sm:p-5 lg:p-6">
                  <CardHeader />

                  <div className="relative z-10 pt-3 lg:pt-5">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-[0.18em] text-neutral-400">
                      Customer questions
                    </p>

                    <IntroCard />

                    {/* Each wrapper uses maxHeight 0→300 so layout height
                        equals content height — no dead space between cards.
                        Gap is padding-top inside the wrapper so it collapses
                        with the card when hidden. */}
                    <div className="mt-3 lg:mt-5">
                      {(
                        [
                          { item: questions[0], t: q0 },
                          { item: questions[1], t: q1 },
                          { item: questions[2], t: q2 },
                          { item: questions[3], t: q3 },
                        ] as const
                      ).map(({ item, t }, i) => (
                        // px-2 + -mx-2 gives the shadow horizontal room to paint.
                        // pb-2 lets the downward shadow paint before the clip edge.
                        <motion.div
                          key={item.question}
                          style={{ maxHeight: t.maxHeight, overflow: "hidden" }}
                          className="px-2 pb-2"
                        >
                          <motion.div
                            style={{
                              y: t.y,
                              opacity: t.opacity,
                              scale: t.scale,
                            }}
                            className={i > 0 ? "pt-2 lg:pt-3" : undefined}
                          >
                            <QuestionCard item={item} />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      style={{
                        maxHeight: statsAnim.maxHeight,
                        overflow: "hidden",
                      }}
                      className="px-2 pb-2"
                    >
                      <motion.div
                        style={{
                          y: statsAnim.y,
                          opacity: statsAnim.opacity,
                          scale: statsAnim.scale,
                        }}
                        className="hidden grid-cols-3 gap-2 sm:grid lg:gap-3 pt-3 lg:pt-5"
                      >
                        <SmallStat value="24/7" label="Online" />
                        <SmallStat value="AI" label="Answers" />
                        <SmallStat value="Fast" label="Guidance" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ─── Shared sub-components ─── */

function CardHeader() {
  return (
    <div className="relative z-10 flex items-center justify-between border-b border-white/50 pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] via-[#FF2FB2] to-[#FFB800] text-sm font-bold text-white">
          H
        </div>
        <div>
          <p className="text-sm font-bold text-neutral-950">
            Helloii AI Assistant
          </p>
          <p className="text-xs font-normal text-neutral-500">
            Questions become conversations
          </p>
        </div>
      </div>
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
    </div>
  );
}

function IntroCard() {
  return (
    <div className="glass-item mt-4 rounded-3xl p-4 sm:p-5">
      <p className="relative z-10 text-xl font-bold leading-tight tracking-tighter text-neutral-950 sm:text-2xl lg:text-3xl">
        "Can you help me choose?"
      </p>
      <p className="relative z-10 mt-2 lg:mt-4 text-sm leading-6 lg:leading-7 text-neutral-600">
        As shoppers ask, Helloii AI turns hesitation into a guided buying flow.
      </p>
    </div>
  );
}

function QuestionCard({
  item,
}: {
  item: { question: string; answer: string; color: string };
}) {
  return (
    <div className="glass-item rounded-[20px] lg:rounded-[24px] p-3 lg:p-4">
      <div className="relative z-10 flex items-start gap-3">
        <div
          style={{ backgroundColor: item.color }}
          className="mt-1 h-2.5 w-2.5 lg:h-3 lg:w-3 shrink-0 rounded-full"
        />
        <div>
          <p className="text-sm lg:text-base font-bold leading-snug tracking-tight text-neutral-950">
            {item.question}
          </p>
          <p className="mt-1 lg:mt-2 text-xs lg:text-sm leading-5 lg:leading-6 text-neutral-600">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function SmallStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-item rounded-2xl p-3 text-center">
      <p className="relative z-10 text-lg font-bold tracking-tight text-neutral-950">
        {value}
      </p>
      <p className="relative z-10 mt-1 text-[11px] font-bold text-neutral-400">
        {label}
      </p>
    </div>
  );
}
