"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Container } from "@/components/layout/container";

const words = [
  "Helloii",
  "answers",
  "questions,",
  "recommends",
  "products,",
  "handles",
  "doubts,",
  "and",
  "guides",
  "shoppers",
  "toward",
  "checkout.",
];

interface HeroProps {
  sectionRef?: React.RefObject<HTMLElement | null>;
}

export function Hero({ sectionRef }: HeroProps) {
  const introRef = useRef<HTMLElement | null>(null);
  const internalStoryRef = useRef<HTMLElement | null>(null);
  const storyRef = sectionRef ?? internalStoryRef;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.from(".hero-kicker", { opacity: 0, y: 18, duration: 0.7 })
        .from(
          ".hero-main-title",
          { opacity: 0, y: 54, duration: 0.85 },
          "-=0.35",
        )
        .from(".hero-copy", { opacity: 0, y: 22, duration: 0.7 }, "-=0.45")
        .from(".hero-actions", { opacity: 0, y: 18, duration: 0.65 }, "-=0.45");
    },
    { scope: introRef },
  );

  const { scrollYProgress } = useScroll({
    target: storyRef,
    // End at 5% so animation finishes right as the section scrolls off — no dead gap before About
    offset: ["start 90%", "end 5%"],
  });

  const labelOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0, 0.12], [18, 0]);

  // subtext + button fully visible when last word finishes (~0.55); tiny y movement
  const bottomCopyOpacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1]);
  const bottomCopyY = useTransform(scrollYProgress, [0.42, 0.55], [8, 0]);

  return (
    <>
      {/* ── Mobile intro (hidden on md+) ── */}
      <section
        ref={introRef}
        className="relative block min-h-screen md:hidden"
      >
        {/* Decorative ambient blobs */}
        <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-[#FF2FB2]/14 blur-[72px]" />
        <div className="pointer-events-none absolute -left-10 bottom-32 h-44 w-44 rounded-full bg-[#2563EB]/12 blur-[60px]" />

        <Container>
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-0 text-center">

            {/* Kicker */}
            <div className="hero-kicker glass-item inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF2FB2]" />
              AI Shopping Assistant
            </div>

            {/* Wordmark */}
            <p className="hero-main-title mt-5 text-[5.6rem] font-bold leading-none tracking-[-0.06em]"
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #FF2FB2 55%, #FFB800 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Helloii
            </p>

            {/* Tagline */}
            <h1 className="hero-main-title mt-3 max-w-[260px] text-[1.55rem] font-bold leading-[1.1] tracking-[-0.04em] text-neutral-900">
              Helps shoppers decide faster.
            </h1>

            {/* Copy */}
            <p className="hero-copy mt-4 max-w-[260px] text-sm leading-6 text-neutral-500">
              Your store's AI assistant — answers questions, recommends products, and guides buyers to checkout.
            </p>

            {/* CTA */}
            <div className="hero-actions mt-7">
              <a
                href="http://apps.shopify.com/ai-sales-support-assistant"
                target="_blank"
                rel="noreferrer"
                className="btn-glass-gradient inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-bold"
              >
                Try it, for free
              </a>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Scroll word animation section (all screens) ── */}
      <section ref={storyRef} className="relative md:min-h-[90vh]">
        <Container>
          <div className="sticky top-0 flex items-center py-10 sm:py-20 md:min-h-[80vh] lg:min-h-screen">
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                style={{ opacity: labelOpacity, y: labelY }}
                className="mb-5 flex justify-center sm:mb-8"
              >
                <div className="glass-item inline-flex rounded-full px-4 py-2 text-sm font-bold text-[#2563EB]">
                  What Helloii does
                </div>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center text-[clamp(2.6rem,5.5vw,7rem)] font-bold leading-[1.1] tracking-[-0.06em] sm:gap-x-6 sm:gap-y-4">
                {words.map((word, index) => (
                  <ScrollWord
                    key={`${word}-${index}`}
                    index={index}
                    progress={scrollYProgress}
                  >
                    {word}
                  </ScrollWord>
                ))}
              </div>

              <motion.div
                style={{ opacity: bottomCopyOpacity, y: bottomCopyY }}
                className="mx-auto mt-10 block max-w-3xl text-center sm:mt-12"
              >
                <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                  Instead of leaving shoppers to search, compare, and guess on
                  their own, Helloii helps them move forward inside the
                  storefront.
                </p>

                <div className="mt-7 flex justify-center sm:mt-8">
                  <a
                    href="#about"
                    className="btn-glass-gradient inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-bold"
                  >
                    Continue
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

const COLOR_SETS = [
  { glass: ["#B8C8E8", "#D4DFF5"], final: ["#2563EB", "#60A5FA"] },
  { glass: ["#E8B8D4", "#F0D4E8"], final: ["#FF2FB2", "#FF6BD6"] },
  { glass: ["#E8C0B8", "#F0D0C8"], final: ["#FF3B30", "#FF7A70"] },
  { glass: ["#E8D8A8", "#F0E8C4"], final: ["#FFB800", "#FFD84D"] },
  { glass: ["#C4B8E8", "#DAD4F0"], final: ["#7C3AED", "#A78BFA"] },
] as const;

function ScrollWord({
  children,
  index,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  progress: MotionValue<number>;
}) {
  const totalWords = words.length;

  const start = 0.04 + index * (0.44 / totalWords);
  const mid = start + 0.05;
  const end = start + 0.11;

  const opacity = useTransform(
    progress,
    [start - 0.02, start, end],
    [0.18, 0.55, 1],
  );
  const y = useTransform(progress, [start, end], [18, 0]);
  const scale = useTransform(progress, [start, end], [0.985, 1]);

  const { glass, final } = COLOR_SETS[index % 5];

  const backgroundImage = useTransform([progress], (values: number[]) => {
    const p = values[0];
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const shineT = clamp01((p - start) / Math.max(mid - start, 0.001));
    const shinePos = shineT * 130 - 15;

    if (p <= start) {
      return `linear-gradient(135deg, ${glass[0]} 0%, rgba(255,255,255,0.96) 48%, ${glass[1]} 100%)`;
    }

    if (p >= end) {
      return `linear-gradient(135deg, ${final[0]} 0%, ${final[1]} 100%)`;
    }

    const sw = 28;
    const sp = Math.max(-sw, Math.min(120, shinePos));

    if (p < mid) {
      return `linear-gradient(105deg, ${glass[0]} 0%, ${glass[0]} ${Math.max(0, sp - sw)}%, rgba(255,255,255,1) ${sp}%, ${glass[1]} ${Math.min(100, sp + sw)}%, ${glass[1]} 100%)`;
    }

    const colorT = clamp01((p - mid) / Math.max(end - mid, 0.001));
    const blendFrom = lerpHex(glass[0], final[0], colorT);
    const blendTo = lerpHex(glass[1], final[1], colorT);
    const shineFade = 1 - colorT * 0.85;
    return `linear-gradient(105deg, ${blendFrom} 0%, rgba(255,255,255,${shineFade}) ${Math.min(100, sp + sw * 0.5)}%, ${blendTo} 100%)`;
  });

  const filter = useTransform(
    progress,
    [start, mid, end],
    [
      "drop-shadow(0 0 0px rgba(255,255,255,0))",
      "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
      "drop-shadow(0 4px 10px rgba(0,0,0,0.07))",
    ],
  );

  return (
    <motion.span
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{
        opacity,
        y,
        scale,
        backgroundImage: backgroundImage as any,
        filter,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      className="inline-block px-1 will-change-transform"
    >
      {children}
    </motion.span>
  );
}

function lerpHex(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}
