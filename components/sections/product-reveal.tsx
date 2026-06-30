"use client";

import { Container } from "@/components/layout/container";
import { ScrollStory } from "@/components/scroll-story/ScrollStory";
import type { ScrollStoryScene } from "@/components/scroll-story/ScrollStory";
import { ProductFlowScene } from "@/components/scroll-story/scenes/ProductFlowScene";
import { MobileProductReveal } from "@/components/scroll-story/scenes/MobileProductReveal";
import { FLOWS } from "@/components/scroll-story/data/product-flows";

// Each flow gets (turns + 2) viewport-heights — one segment for the
// text (headline/description) to reveal and stick, one for the
// chat/widget to reveal on the *next* bit of scroll, and one per
// question after that. The three flows are laid end-to-end on one
// shared progress instead of each owning an independent pinned section,
// proportioned by their own segment count.
const FLOW_SEGMENTS = FLOWS.map((flow) => flow.turns.length + 2);
const TOTAL_SEGMENTS = FLOW_SEGMENTS.reduce((sum, n) => sum + n, 0);
const HEIGHT_VH = TOTAL_SEGMENTS * 100;

const SCENES: ScrollStoryScene[] = (() => {
  let cursor = 0;
  return FLOWS.map((flow, index) => {
    const start = cursor / TOTAL_SEGMENTS;
    cursor += FLOW_SEGMENTS[index];
    const end = cursor / TOTAL_SEGMENTS;

    return {
      start,
      end,
      render: (progress) => (
        <ProductFlowScene
          flow={flow}
          reverse={index % 2 === 1}
          progress={progress}
        />
      ),
    };
  });
})();

export function ProductReveal() {
  return (
    <section id="product" className="relative overflow-x-clip [overflow-clip-margin:20px] py-20 sm:py-28">
      {/* Mobile renders its own heading inside MobileProductReveal, since
          it needs to sit in normal scroll flow there rather than above a
          desktop-only ScrollStory. */}
      <Container className="hidden lg:block">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            What Helloii AI does
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Answers every question,{" "}
            <span className="bg-gradient-to-r from-[#1A56FF] via-[#5B4FFF] to-[#8B2FFF] bg-clip-text text-transparent">
              inside your store
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-500">
            Each feature is shown as a real customer conversation, followed by
            the exact value it brings to the store.
          </p>
        </div>
      </Container>

      {/* startOffset="87%" — calibrated so the story's progress (and so
          the first scene's reveal) starts while the heading above is
          still about 60% down the viewport, instead of waiting until
          the story has scrolled all the way to the top (which is also
          right where it pins). 87% rather than 60% because this is
          measured from the *story's* own top, which sits ~245px below
          the heading's top — the gap has to be added back in. */}
      <ScrollStory heightVh={HEIGHT_VH} scenes={SCENES} startOffset="87%" />

      <MobileProductReveal />
    </section>
  );
}
