"use client";

import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";
import { STEPS, DESKTOP_PATH } from "../data/how-it-works";
import type { Step } from "../data/how-it-works";
import { StepIcon } from "../icons";

/**
 * Pure scene: everything here is a function of the `progress` MotionValue
 * it's handed by ScrollStory/SceneFrame. No useScroll, no scroll
 * listeners, no scroll-frame state updates — identical visual output to
 * the previous DesktopVerticalTimeline, just decoupled from owning its
 * own scroll tracking.
 */
export function HowItWorksScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const lineOpacity = useTransform(progress, [0, 0.015, 1], [0, 1, 1]);

  return (
    <Container className="relative h-full">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1A56FF]/[0.06] via-[#8B2FFF]/[0.05] to-transparent blur-3xl" />

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
    </Container>
  );
}

function DesktopStep({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}) {
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
          <StepIcon name={step.icon} color={step.accent} />
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
