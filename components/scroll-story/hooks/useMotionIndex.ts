import { useState } from "react";
import { useMotionValueEvent } from "framer-motion";
import type { MotionValue } from "framer-motion";

/**
 * Derives a discrete 0..count-1 index from a continuous progress
 * MotionValue, re-rendering only when the integer index actually
 * changes — not on every scroll-frame tick. This is the one place in the
 * scroll-story system that touches React state; everything else stays on
 * MotionValues.
 */
export function useMotionIndex(
  progress: MotionValue<number>,
  count: number,
  start = 0,
  end = 1,
) {
  const [index, setIndex] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const normalized = Math.min(
      1,
      Math.max(0, (latest - start) / (end - start)),
    );

    const next = Math.min(
      count - 1,
      Math.max(0, Math.floor(normalized * count)),
    );

    setIndex((prev) => (prev === next ? prev : next));
  });

  return index;
}
