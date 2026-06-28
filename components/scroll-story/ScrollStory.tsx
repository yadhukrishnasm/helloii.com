"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { SceneFrame } from "./SceneFrame";

export type ScrollStoryScene = {
  /** Start of this scene's window on the story's 0–1 progress. */
  start: number;
  /** End of this scene's window on the story's 0–1 progress. */
  end: number;
  /** Receives this scene's own local 0–1 progress (already clamped). */
  render: (sceneProgress: MotionValue<number>) => ReactNode;
};

const CROSSFADE_EDGE = 0.02;

/**
 * The one reusable scroll-jacked viewport for desktop: a single
 * useScroll call drives a single sticky viewport, and `scenes` are
 * stacked absolutely inside it, each crossfading in/out of its own
 * window on the shared progress via SceneFrame. Nothing here is nested
 * inside another sticky/scroll-tracked ancestor, and this component
 * itself is the *only* thing that calls useScroll for whatever scenes
 * it's given — scenes themselves never call useScroll.
 *
 * Only scenes with a neighbor on a given side get a visible crossfade
 * there — the story's very first and very last scenes stay fully
 * visible right up to that edge, matching how each section behaved on
 * its own before this was unified.
 *
 * Hidden below `lg:` — mobile/tablet uses separate, lightweight
 * components instead of this pinned desktop experience. `lg` specifically
 * because scenes built for this viewport (e.g. ProductFlowScene's
 * 2-column grid) also switch to their desktop layout at `lg`; showing
 * this sticky, fixed-height viewport at any narrower breakpoint than
 * what a scene's own layout assumes causes that scene's now-taller
 * single-column content to overflow the fixed sticky height and get
 * clipped.
 */
export function ScrollStory({
  heightVh,
  scenes,
  className = "",
  startOffset = "start",
}: {
  heightVh: number;
  scenes: ScrollStoryScene[];
  className?: string;
  /**
   * Viewport edge (framer-motion useScroll offset syntax, e.g. "start"
   * or "85%") that this story's own top has to reach before progress
   * starts ticking. Defaults to "start" (0%) — progress only begins once
   * the story has scrolled all the way to the top of the viewport, which
   * is also right around where it pins. Pass a larger value to have
   * progress (and so the first scene's reveal) start earlier, while the
   * story is still mostly below the fold.
   *
   * This is measured from *this story's own* top, not from any heading
   * rendered above it as a separate sibling — calibrate the percentage
   * empirically against that gap rather than assuming it lines up with
   * any particular fraction of that heading's own position.
   */
  startOffset?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // useScroll's offset type is a closed union of literal intersection
    // strings ("start start", "start 60%", etc.) — too narrow to express
    // as a plain template-string prop, so the assembled value is cast
    // back to it here. Still real framer-motion offset syntax at runtime.
    offset: [`start ${startOffset}`, "end end"] as NonNullable<
      Parameters<typeof useScroll>[0]
    >["offset"],
  });

  return (
    <div
      ref={ref}
      className={`relative hidden lg:block ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))]">
        <div className="relative h-full overflow-hidden">
          {scenes.map((scene, i) => (
            <SceneFrame
              key={i}
              progress={scrollYProgress}
              start={scene.start}
              end={scene.end}
              fadeIn={i === 0 ? undefined : CROSSFADE_EDGE}
              fadeOut={i === scenes.length - 1 ? undefined : CROSSFADE_EDGE}
            >
              {scene.render}
            </SceneFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
