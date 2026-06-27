"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";

type IconComponent = React.FC<{ color: string }>;

function InstallIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M12 3v12m0 0-4-4m4 4 4-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SyncIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M4 12a8 8 0 0 1 14-5.3L20 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4v4h-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12a8 8 0 0 1-14 5.3L4 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20v-4h4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M4 5h16v11H9l-4 4V5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 10h8M8 13h5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GrowthIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M4 18 9 12l4 3 7-8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7h4v4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  cardSide: "left" | "right";
  revealAt: number;
}[] = [
  {
    step: "1",
    title: "Install Helloii in one click",
    description: "Add it from Shopify and activate it without code.",
    accent: "#1A56FF",
    accentLight: "#5A9CFF",
    icon: InstallIcon,
    x: 50,
    y: 16,
    cardSide: "right",
    revealAt: 0.1,
  },
  {
    step: "2",
    title: "Your store data syncs automatically",
    description:
      "Products, policies, FAQs, and collections are read instantly.",
    accent: "#5B4FFF",
    accentLight: "#8A7FFF",
    icon: SyncIcon,
    x: 20,
    y: 38,
    cardSide: "right",
    revealAt: 0.36,
  },
  {
    step: "3",
    title: "Customers get answers while shopping",
    description: "Helloii responds on product pages when buyers need help.",
    accent: "#8B2FFF",
    accentLight: "#B377FF",
    icon: ChatIcon,
    x: 80,
    y: 62,
    cardSide: "left",
    revealAt: 0.64,
  },
  {
    step: "4",
    title: "Support drops and conversions improve",
    description: "Use chat insights to see where customers hesitate.",
    accent: "#1A56FF",
    accentLight: "#5A9CFF",
    icon: GrowthIcon,
    x: 50,
    y: 84,
    cardSide: "left",
    revealAt: 0.9,
  },
];

const DESKTOP_PATH =
  "M50,16 C50,23 20,24 20,38 C20,52 80,48 80,62 C80,76 50,76 50,84";

export function HowItWorks() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const desktopHeight = `${STEPS.length * 82}vh`;

  const { scrollYProgress: desktopScrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileRef,
    offset: ["start 85%", "end 35%"],
  });
  const desktopAnimatedPathProgress = useTransform(
    desktopScrollYProgress,
    [0.04, 0.96],
    [0, 1],
  );

  const mobileAnimatedPathProgress = useTransform(
    mobileScrollYProgress,
    [0, 1],
    [0, 1],
  );

  const desktopPathProgress = reduceMotion
    ? desktopScrollYProgress
    : desktopAnimatedPathProgress;

  const mobilePathProgress = reduceMotion
    ? mobileScrollYProgress
    : mobileAnimatedPathProgress;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-10%] top-16 h-72 w-72 rounded-full bg-[#5B4FFF]/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-10 h-80 w-80 rounded-full bg-[#1A56FF]/[0.08] blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Up and running in{" "}
            <span className="bg-gradient-to-r from-[#1A56FF] via-[#8B2FFF] to-[#5B4FFF] bg-clip-text text-transparent">
              under 10 minutes
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-500">
            No technical setup. No prompt engineering. Helloii reads your store
            and gets to work immediately.
          </p>
        </div>
      </Container>

      <div
        ref={desktopRef}
        className="relative mt-16 hidden sm:block"
        style={{ height: desktopHeight }}
      >
        <div className="sticky top-20 h-[calc(100vh-5rem)]">
          <div className="relative h-full overflow-hidden">
            <Container className="relative h-full">
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1A56FF]/[0.06] via-[#8B2FFF]/[0.05] to-transparent blur-3xl" />

              <DesktopVerticalTimeline progress={desktopPathProgress} />
            </Container>
          </div>
        </div>
      </div>

      <div ref={mobileRef} className="mx-auto mt-14 max-w-sm sm:hidden">
        {STEPS.map((s, i) => (
          <MobileStep
            key={s.step}
            step={s}
            index={i}
            total={STEPS.length}
            progress={mobilePathProgress}
            isLast={i === STEPS.length - 1}
            nextAccent={STEPS[i + 1]?.accent}
          />
        ))}
      </div>
    </section>
  );
}

function DesktopVerticalTimeline({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const lineOpacity = useTransform(progress, [0, 0.015, 1], [0, 1, 1]);

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id="howItWorksVerticalLine"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1A56FF" />
            <stop offset="35%" stopColor="#5B4FFF" />
            <stop offset="68%" stopColor="#8B2FFF" />
            <stop offset="100%" stopColor="#1A56FF" />
          </linearGradient>

          <mask id="howItWorksLineMask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill="black" />

            <motion.path
              d={DESKTOP_PATH}
              fill="none"
              stroke="white"
              strokeWidth="4.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                pathLength: progress,
              }}
            />
          </mask>
        </defs>

        <motion.g
          mask="url(#howItWorksLineMask)"
          style={{ opacity: lineOpacity }}
        >
          <path
            d={DESKTOP_PATH}
            fill="none"
            stroke="url(#howItWorksVerticalLine)"
            strokeWidth="6.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>

      {STEPS.map((step, index) => (
        <DesktopStep
          key={step.step}
          step={step}
          index={index}
          progress={progress}
        />
      ))}
    </div>
  );
}

function DesktopStep({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = step.icon;

  const opacity = useTransform(
    progress,
    [step.revealAt - 0.04, step.revealAt + 0.08],
    [0, 1],
  );
  const iconScale = useTransform(
    progress,
    [step.revealAt - 0.06, step.revealAt + 0.08],
    [0.84, 1],
  );

  const cardY = useTransform(
    progress,
    [step.revealAt - 0.08, step.revealAt + 0.08],
    [28, 0],
  );

  const cardOpacity = useTransform(
    progress,
    [step.revealAt - 0.08, step.revealAt + 0.08],
    [0, 1],
  );

  const isLeft = step.cardSide === "left";

  return (
    <div
      className="absolute"
      style={{
        left: `${step.x}%`,
        top: `${step.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 select-none font-black leading-none"
        style={{
          color: step.accent,
          opacity: 0.09,
          fontSize: "clamp(4.5rem, 7vw, 7rem)",
          transform:
            index % 2 === 0 ? "translate(-110%, -78%)" : "translate(12%, -18%)",
        }}
      >
        {step.step}
      </span>

      <motion.div
        style={{ opacity, scale: iconScale }}
        className="relative z-20 h-16 w-16 lg:h-20 lg:w-20"
      >
        <LiquidGlassBubble
          accent={step.accent}
          accentLight={step.accentLight}
          className="flex h-full w-full items-center justify-center rounded-[1.4rem] shadow-[0_18px_45px_rgba(26,86,255,0.18)]"
        >
          <Icon color={step.accent} />
        </LiquidGlassBubble>
      </motion.div>

      <motion.div
        style={{
          y: cardY,
          opacity: cardOpacity,
        }}
        className={[
          "absolute top-1/2 z-10 w-[min(24rem,30vw)] -translate-y-1/2 rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.09)] backdrop-blur-xl",
          isLeft ? "right-[7rem]" : "left-[7rem]",
        ].join(" ")}
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className="rounded-full px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em]"
            style={{
              color: step.accent,
              backgroundColor: `${step.accent}12`,
            }}
          >
            Step {step.step}
          </span>

          <span className="h-px flex-1 bg-gradient-to-r from-neutral-200 to-transparent" />
        </div>

        <h3 className="text-xl font-bold leading-snug tracking-tight text-neutral-950">
          {step.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          {step.description}
        </p>
      </motion.div>
    </div>
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

  const opacity = useTransform(
    progress,
    [start, start + 0.12, end],
    [0, 0.5, 1],
  );

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
                background: `linear-gradient(to bottom, ${step.accent}, ${
                  nextAccent ?? step.accent
                })`,
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.18)",
              }}
              className="absolute inset-0 origin-top rounded-full"
            />
          </div>
        )}
      </div>

      <motion.div style={{ opacity, x }} className="min-w-0 pb-10">
        <p
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: step.accent }}
        >
          Step {step.step}
        </p>

        <h3 className="mt-1 text-base font-bold tracking-tight text-neutral-950">
          {step.title}
        </h3>

        <p className="mt-1.5 text-sm leading-6 text-neutral-600">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}
