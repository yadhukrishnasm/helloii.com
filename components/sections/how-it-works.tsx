"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";

type IconComponent = React.FC<{ color: string }>;

function InstallIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path d="M12 3v12m0 0-4-4m4 4 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SyncIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path d="M4 12a8 8 0 0 1 14-5.3L20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4v4h-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12a8 8 0 0 1-14 5.3L4 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20v-4h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path d="M4 5h16v11H9l-4 4V5Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GrowthIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path d="M4 18 9 12l4 3 7-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7h4v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STEPS: {
  step: string;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
  icon: IconComponent;
  x: number;
  y: number;
  textSide: "above" | "below";
}[] = [
  {
    step: "1",
    title: "Install from the Shopify App Store",
    description:
      "Add Helloii to your store in one click — no code, no developer required. Installing and activating takes under two minutes.",
    accent: "#2563EB",
    accentLight: "#60a5fa",
    icon: InstallIcon,
    x: 4,
    y: 78,
    textSide: "above",
  },
  {
    step: "2",
    title: "Helloii learns your store automatically",
    description:
      "It syncs with your product catalog, collections, policies, and FAQs — reading everything your store already has. Nothing to configure manually.",
    accent: "#4F46E5",
    accentLight: "#818cf8",
    icon: SyncIcon,
    x: 34,
    y: 20,
    textSide: "below",
  },
  {
    step: "3",
    title: "Customers get instant, accurate answers",
    description:
      "Helloii appears on your product pages and answers questions in real time — sizing, shipping, returns, comparisons — exactly when customers need it.",
    accent: "#7C3AED",
    accentLight: "#a78bfa",
    icon: ChatIcon,
    x: 66,
    y: 78,
    textSide: "above",
  },
  {
    step: "4",
    title: "Watch conversions grow and support load drop",
    description:
      "Track chats, question types, and engagement from your analytics dashboard. See where customers hesitate and how Helloii moves them forward.",
    accent: "#2563EB",
    accentLight: "#60a5fa",
    icon: GrowthIcon,
    x: 96,
    y: 20,
    textSide: "below",
  },
];

// Wave path in a 100 x 60 coordinate space — the svg viewBox below matches
// that exact 10:6 aspect ratio (same as the container's `aspect-[10/6]`),
// so the stroke scales uniformly instead of being squashed/stretched by a
// mismatched preserveAspectRatio="none" (which is what made the line look
// dashed/broken before). Node x/y above are plain CSS percentages of the
// container; here they're just scaled ×0.6 on the y-axis to match.
const WAVE_PATH =
  "M4,46.8 C16,46.8 21,12 34,12 S57,46.8 66,46.8 S89,12 96,12";

export function HowItWorks() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start 95%", "center 45%"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 90%", "end 68%"],
  });

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-20 h-72 w-72 rounded-full bg-[#4F46E5]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-10%] bottom-10 h-80 w-80 rounded-full bg-[#2563EB]/08 blur-3xl" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Up and running in{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent">
              under 10 minutes
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-500">
            No technical setup. No prompt engineering. Helloii reads your store
            and gets to work immediately.
          </p>
        </motion.div>

        {/* Desktop / tablet — wavy glass-rod line, grows as you scroll;
            each step lights up only once the line actually reaches it. */}
        <div
          ref={desktopRef}
          className="relative mx-auto mt-24 hidden aspect-[10/6] w-full max-w-6xl sm:mt-28 sm:block"
        >
          <svg
            viewBox="0 0 100 60"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="howItWorksRod" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="34%" stopColor="#4F46E5" />
                <stop offset="66%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            {/* Soft shadow beneath the rod, for depth */}
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke="#1e1b4b"
              strokeOpacity={0.18}
              strokeWidth={3.4}
              strokeLinecap="round"
              style={{ pathLength: desktopProgress, filter: "blur(3px)" }}
              transform="translate(0, 1.4)"
            />
            {/* Gradient rod */}
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke="url(#howItWorksRod)"
              strokeWidth={2.4}
              strokeLinecap="round"
              style={{ pathLength: desktopProgress }}
            />
          </svg>

          {STEPS.map((s, i) => (
            <DesktopStep key={s.step} step={s} index={i} total={STEPS.length} progress={desktopProgress} />
          ))}
        </div>

        {/* Full step copy lives in its own grid below the wave — keeping
            it off the curve means the (long, intentionally unabridged)
            descriptions never collide with each other, however far they
            wrap. Each column still lights up in step with the line above
            via the same scroll progress. */}
        <div className="mx-auto mt-8 hidden max-w-6xl grid-cols-4 gap-x-6 gap-y-8 sm:mt-10 sm:grid">
          {STEPS.map((s, i) => (
            <DesktopStepText key={s.step} step={s} index={i} total={STEPS.length} progress={desktopProgress} />
          ))}
        </div>

        {/* Mobile — vertical glass-rod connector, same step-by-step
            scroll-linked reveal, stacked instead of waved. */}
        <div ref={mobileRef} className="mx-auto mt-14 max-w-sm sm:hidden">
          {STEPS.map((s, i) => (
            <MobileStep
              key={s.step}
              step={s}
              index={i}
              total={STEPS.length}
              progress={mobileProgress}
              isLast={i === STEPS.length - 1}
              nextAccent={STEPS[i + 1]?.accent}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function DesktopStep({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, start + 0.05, end], [0.15, 0.4, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);
  const Icon = step.icon;

  return (
    <div
      className="absolute"
      style={{ left: `${step.x}%`, top: `${step.y}%`, transform: "translate(-50%, -50%)" }}
    >
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 select-none font-black leading-none"
        style={{
          color: step.accent,
          opacity: 0.12,
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          transform:
            index === 0
              ? "translate(10%, 10%)"
              : index === total - 1
                ? "translate(-110%, -120%)"
                : step.textSide === "above"
                  ? "translate(-130%, 10%)"
                  : "translate(30%, -120%)",
        }}
      >
        {step.step}
      </span>

      <motion.div style={{ opacity, scale, y }} className="h-14 w-14 sm:h-16 sm:w-16">
        <LiquidGlassBubble
          accent={step.accent}
          accentLight={step.accentLight}
          className="flex h-full w-full items-center justify-center rounded-2xl"
        >
          <Icon color={step.accent} />
        </LiquidGlassBubble>
      </motion.div>
    </div>
  );
}

function DesktopStepText({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, start + 0.05, end], [0.15, 0.4, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: step.accent }}>
        Step {step.step}
      </p>
      <h3 className="mt-1.5 text-base font-bold tracking-tight text-neutral-950">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-neutral-500">{step.description}</p>
    </motion.div>
  );
}

function MobileStep({
  step,
  index,
  total,
  progress,
  isLast,
  nextAccent,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  isLast: boolean;
  nextAccent?: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, start + 0.06, end], [0.2, 0.45, 1]);
  const x = useTransform(progress, [start, end], [14, 0]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);
  const lineScale = useTransform(progress, [start, end], [0, 1]);
  const Icon = step.icon;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <motion.div style={{ opacity, scale }} className="h-12 w-12 shrink-0">
          <LiquidGlassBubble
            accent={step.accent}
            accentLight={step.accentLight}
            className="flex h-full w-full items-center justify-center rounded-2xl"
          >
            <Icon color={step.accent} />
          </LiquidGlassBubble>
        </motion.div>

        {!isLast && (
          <div className="relative my-1.5 w-[3px] flex-1 overflow-hidden rounded-full bg-neutral-200/60">
            <motion.div
              style={{
                scaleY: lineScale,
                background: `linear-gradient(to bottom, ${step.accent}, ${nextAccent ?? step.accent})`,
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.18)",
              }}
              className="absolute inset-0 origin-top rounded-full"
            />
          </div>
        )}
      </div>

      <motion.div style={{ opacity, x }} className="min-w-0 pb-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: step.accent }}>
          Step {step.step}
        </p>
        <h3 className="mt-1 text-base font-bold tracking-tight text-neutral-950">
          {step.title}
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-neutral-600">{step.description}</p>
      </motion.div>
    </div>
  );
}
