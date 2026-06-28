"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useSceneProgress } from "./hooks/useSceneProgress";

const MIN_EDGE = 0.0001;

/**
 * One scene's slice of a ScrollStory. Crossfades in/out at the edges of
 * its [start, end] window on the *global* progress, and hands the scene
 * its own local 0–1 progress so the scene itself never has to know where
 * it sits in the overall story.
 *
 * `fadeOut` is omitted for a story's last scene — pass a number only
 * when there's a next scene to crossfade into. This isn't just cosmetic:
 * with `clamp: true` (the useTransform default), a trailing [end, →0]
 * stop snaps opacity to 0 for any progress >= end, including the brief
 * moment after progress hits 1 but before the sticky viewport has fully
 * scrolled away — which showed up as a real, visible blank flash at the
 * end of a single/last scene. Leaving the stops array without a
 * trailing-zero point keeps it at 1 for that whole tail instead.
 *
 * `fadeIn` always gets a (possibly near-zero) leading transition since
 * progress can't go below a scene's own `start`, so there's no
 * equivalent risk on that side.
 *
 * Only the active scene is interactive — inactive scenes get
 * pointer-events: none instead of being unmounted, so nothing pops in
 * abruptly and layout never shifts.
 */
export function SceneFrame({
  progress,
  start,
  end,
  fadeIn = MIN_EDGE,
  fadeOut,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  fadeIn?: number;
  fadeOut?: number;
  children: (sceneProgress: MotionValue<number>) => ReactNode;
}) {
  const span = end - start;
  const safeFadeIn = Math.max(MIN_EDGE, Math.min(fadeIn, span / 4));
  // Same literal-zero nudge as useSceneProgress — this becomes the first
  // breakpoint in the opacity transform below, so it needs it too.
  const safeStart = start === 0 ? MIN_EDGE : start;

  const stops =
    fadeOut !== undefined
      ? [safeStart, safeStart + safeFadeIn, end - Math.max(MIN_EDGE, Math.min(fadeOut, span / 4)), end]
      : [safeStart, safeStart + safeFadeIn, end];
  const values = fadeOut !== undefined ? [0, 1, 1, 0] : [0, 1, 1];

  const opacity = useTransform(progress, stops, values);
  const pointerEvents = useTransform(opacity, (v) =>
    v > 0.5 ? "auto" : "none",
  );

  const sceneProgress = useSceneProgress(progress, start, end);

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="absolute inset-0"
    >
      {children(sceneProgress)}
    </motion.div>
  );
}
