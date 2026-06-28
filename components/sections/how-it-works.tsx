"use client";

import { Container } from "@/components/layout/container";
import { ScrollStory } from "@/components/scroll-story/ScrollStory";
import { HowItWorksScene } from "@/components/scroll-story/scenes/HowItWorksScene";
import { MobileHowItWorks } from "@/components/scroll-story/scenes/MobileHowItWorks";
import { STEPS } from "@/components/scroll-story/data/how-it-works";

// Same total scroll distance as before this was rebuilt onto the shared
// ScrollStory engine — STEPS.length * 82vh.
const HEIGHT_VH = STEPS.length * 82;

export function HowItWorks() {
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
            No technical setup. No prompt engineering. helloii Ai reads your
            store and gets to work immediately.
          </p>
        </div>
      </Container>

      {/* startOffset="86%" — calibrated so the story's progress (and so
          the line/step reveal) starts while the heading above is still
          about 60% down the viewport, instead of waiting until the
          story has scrolled all the way to the top (which is also right
          where it pins). Same approach as ProductReveal's ScrollStory. */}
      <ScrollStory
        className="mt-16"
        heightVh={HEIGHT_VH}
        startOffset="86%"
        scenes={[
          {
            start: 0,
            end: 1,
            render: (progress) => <HowItWorksScene progress={progress} />,
          },
        ]}
      />

      <MobileHowItWorks />
    </section>
  );
}
