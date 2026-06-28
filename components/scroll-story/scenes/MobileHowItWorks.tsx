"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";
import { STEPS } from "../data/how-it-works";
import type { Step } from "../data/how-it-works";
import { StepIcon } from "../icons";

/**
 * Mobile/tablet keeps its own simple, native-scroll mechanism — no
 * ScrollStory pinned desktop viewport, no rAF, no scroll-jacking. Each
 * step tracks *its own* scroll position (not a single progress value
 * shared across the whole 4-step stack) — sharing one progress value
 * meant each step's reveal window was 1/4 of the *entire* stack's
 * height, which for a tall stack requires scrolling well past where a
 * step is already fully visible before its window's threshold catches
 * up. Per-step tracking ties the reveal directly to that step actually
 * scrolling into view, so it's never still fading in once it's already
 * sitting on screen.
 *
 * Shown below `lg:` — matches ScrollStory's own cutoff.
 */
export function MobileHowItWorks() {
  return (
    <div className="mx-auto mt-14 max-w-sm lg:hidden">
      {STEPS.map((step, i) => (
        <MobileStep
          key={step.step}
          step={step}
          isLast={i === STEPS.length - 1}
          nextAccent={STEPS[i + 1]?.accent}
        />
      ))}
    </div>
  );
}

function MobileStep({
  step,
  isLast,
  nextAccent,
}: {
  step: Step;
  isLast: boolean;
  nextAccent?: string;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Tight window tied to this step's own geometry: starts revealing as
  // soon as it's barely visible at the bottom of the viewport, and is
  // fully revealed well before it'd be considered "on screen" further up.
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start 92%", "start 55%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const x = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.85, 1],
  );
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={stepRef} className="flex gap-4">
      <div className="flex flex-col items-center">
        <motion.div style={{ opacity, scale }} className="h-12 w-12 shrink-0">
          <LiquidGlassBubble
            accent={step.accent}
            accentLight={step.accentLight}
            className="flex h-full w-full items-center justify-center rounded-2xl"
          >
            <StepIcon name={step.icon} color={step.accent} />
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
