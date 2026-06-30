"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";
import { STEPS } from "../data/how-it-works";
import type { Step } from "../data/how-it-works";
import { StepIcon } from "../icons";

type LineMetrics = {
  top: number;
  height: number;
  revealPoints: number[];
};

const DEFAULT_LINE_METRICS: LineMetrics = {
  top: 24,
  height: 1,
  revealPoints: [0, 0.33, 0.66, 1],
};

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function MobileHowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduceMotion = useReducedMotion();

  const [lineMetrics, setLineMetrics] =
    useState<LineMetrics>(DEFAULT_LINE_METRICS);

  const { scrollYProgress } = useScroll({
    target: containerRef,

    /**
     * Starts when the first step area is around 72% down the viewport.
     * Ends when the first step area is still visible around 24% down the viewport.
     *
     * This makes the whole line complete before the first step fully leaves view.
     */
    offset: ["start 72%", "start 24%"],
  });

  const lineProgress = useTransform(scrollYProgress, (value) => {
    if (reduceMotion) return Math.min(1, Math.max(0, value));
    return smoothstep(value);
  });

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateLineMetrics = () => {
      const containerRect = container.getBoundingClientRect();
      const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[];

      if (icons.length < 2) return;

      const centers = icons.map((icon) => {
        const rect = icon.getBoundingClientRect();
        return rect.top - containerRect.top + rect.height / 2;
      });

      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];
      const height = Math.max(1, lastCenter - firstCenter);

      const revealPoints = centers.map((center) => {
        return Math.min(1, Math.max(0, (center - firstCenter) / height));
      });

      setLineMetrics({
        top: firstCenter,
        height,
        revealPoints,
      });
    };

    updateLineMetrics();

    const resizeObserver = new ResizeObserver(updateLineMetrics);
    resizeObserver.observe(container);

    iconRefs.current.forEach((icon) => {
      if (icon) resizeObserver.observe(icon);
    });

    window.addEventListener("resize", updateLineMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLineMetrics);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-14 max-w-sm lg:hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 z-0 w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-neutral-200/60"
        style={{
          top: lineMetrics.top,
          height: lineMetrics.height,
        }}
      >
        <motion.div
          style={{ scaleY: lineProgress }}
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#1A56FF] via-[#5B4FFF] to-[#8B2FFF]"
        />
      </div>

      <div className="relative z-10">
        {STEPS.map((step, index) => (
          <MobileStep
            key={step.step}
            step={step}
            iconRef={(node) => {
              iconRefs.current[index] = node;
            }}
            progress={lineProgress}
            revealAt={
              lineMetrics.revealPoints[index] ?? index / (STEPS.length - 1)
            }
          />
        ))}
      </div>
    </div>
  );
}

function MobileStep({
  step,
  iconRef,
  progress,
  revealAt,
}: {
  step: Step;
  iconRef: (node: HTMLDivElement | null) => void;
  progress: MotionValue<number>;
  revealAt: number;
}) {
  const reduceMotion = useReducedMotion();

  const start = Math.max(0, revealAt - 0.08);
  const end = Math.min(1, revealAt + 0.08);

  const opacity = useTransform(progress, [start, end], [0, 1]);

  const x = useTransform(
    progress,
    [start, end],
    reduceMotion ? [0, 0] : [10, 0],
  );

  const scale = useTransform(
    progress,
    [start, end],
    reduceMotion ? [1, 1] : [0.9, 1],
  );

  const textY = useTransform(
    progress,
    [start, end],
    reduceMotion ? [0, 0] : [8, 0],
  );

  return (
    <div className="relative flex gap-4">
      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          ref={iconRef}
          style={{ opacity, scale }}
          className="h-12 w-12 shrink-0"
        >
          <LiquidGlassBubble
            accent={step.accent}
            accentLight={step.accentLight}
            className="flex h-full w-full items-center justify-center rounded-2xl shadow-[0_14px_36px_rgba(26,86,255,0.12)]"
          >
            <StepIcon name={step.icon} color={step.accent} />
          </LiquidGlassBubble>
        </motion.div>
      </div>

      <motion.div style={{ opacity, x, y: textY }} className="min-w-0 pb-10">
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
