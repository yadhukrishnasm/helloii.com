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

export function ScrollStory({
  heightVh,
  scenes,
  className = "",
  startOffset = "start",
}: {
  heightVh: number;
  scenes: ScrollStoryScene[];
  className?: string;
  startOffset?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
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
