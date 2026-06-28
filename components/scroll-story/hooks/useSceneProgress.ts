import { useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

/**
 * Maps a slice of the story's global scrollYProgress (e.g. 0.25–0.5) to a
 * local 0–1 progress value for one scene. `inputStart` is nudged a hair
 * above 0 when it's exactly 0 — a literal-zero start has caused a
 * framer-motion `useTransform` value to stick at its initial output in
 * this codebase before, and the nudge is visually inert (1/10000th of the
 * whole story) while sidestepping it for good.
 */
export function useSceneProgress(
  progress: MotionValue<number>,
  inputStart: number,
  inputEnd: number,
) {
  const start = inputStart === 0 ? 0.0001 : inputStart;

  return useTransform(progress, [start, inputEnd], [0, 1], {
    clamp: true,
  });
}
