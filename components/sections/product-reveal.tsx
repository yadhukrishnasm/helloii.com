"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import {
  ChatbotAnimation,
  type ChatTurn,
} from "@/components/sections/chatbot-animation";

const DEMO_URL = "https://demo.helloii.com";

const FLOWS: {
  tag: string;
  headline: string;
  description: string;
  accent: string;
  turns: ChatTurn[];
  chips: [string, string];
  stats: string[];
}[] = [
  {
    tag: "Instant Answers",
    headline:
      "Helloii answers customer questions about products, shipping, payment, or anything else on your store.",
    description:
      "Instead of leaving customers to figure it out, Helloii gives them an instant, accurate answer — so they don't open a support ticket or leave.",
    accent: "#2563EB",
    turns: [
      {
        question: "How long will it take to get my order delivered?",
        answer:
          "Delivery times vary by city. Metro cities take 3–5 days; other cities take 5–7 days. Could you tell me your city? Then I can tell you exactly when it'll arrive.",
      },
      {
        question: "Do you have this in size 12?",
        answer:
          "Sorry, we're out of size 12 for this product right now. Want me to suggest a similar product that has your size?",
      },
      {
        question: "What is your return policy?",
        answer: "We have a no-questions-asked return policy.",
      },
    ],
    chips: [
      "Do you have this in size 12?",
      "How long will it take to get my order delivered?",
    ],
    stats: ["24/7 Online", "Instant AI Answers", "Fewer Support Tickets"],
  },
  {
    tag: "Product recommendations",
    headline:
      "Helloii asks the right questions and recommends the exact product the customer is looking for.",
    description:
      "Instead of leaving customers to dig through your catalog, Helloii guides them to the right product — and lifts conversions.",
    accent: "#7C3AED",
    turns: [
      {
        question:
          "I need a gift for my mom, she likes skincare but has sensitive skin.",
        answer:
          "Got it — for sensitive skin I'd suggest our Fragrance-Free Hydrating Set. It's our most popular gift for sensitive skin and ships in a gift box. Want me to show it?",
      },
      {
        question: "Looking for running shoes for flat feet under ₹4000.",
        answer:
          "The Stride Support Trainer is built for flat feet and is ₹3,499. Want me to check your size?",
      },
      {
        question: "Which of your coffees is the least bitter?",
        answer:
          "That'd be our Medium Roast Hazelnut — smooth, low bitterness, our top pick for first-time buyers. Want a bag?",
      },
    ],
    chips: [
      "Which of your coffees is the least bitter?",
      "I need a gift for my mom, she likes skincare but has sensitive skin.",
    ],
    stats: ["Personalized recommendations that lift product-page conversions."],
  },
  {
    tag: "Smart FAQs",
    headline: "No more predefined FAQs.",
    description:
      "Helloii answers any question a customer asks while browsing — not just a fixed list.",
    accent: "#D97706",
    turns: [
      {
        question: "Is this jacket warm enough for winter?",
        answer:
          "Yes — it's rated for temperatures down to -5°C with an insulated lining. Great for most winters.",
      },
      {
        question: "Can I machine wash this?",
        answer:
          "Yes, machine wash cold and air dry. Avoid tumble drying to keep the shape.",
      },
      {
        question: "Do you ship to Canada?",
        answer:
          "Yes, we ship to Canada. Standard delivery is 7–10 business days.",
      },
    ],
    chips: ["Do you ship to Canada?", "Is this jacket warm enough for winter?"],
    stats: ["Answers any question, dynamically — no manual FAQ setup."],
  },
];

const FADE_VARIANTS = {
  enter: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function ColorPickerButton({
  color,
  onChange,
}: {
  color: string;
  onChange: (hex: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="glass-item btn-press flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-neutral-600">
        <span className="relative block h-4 w-4 shrink-0 overflow-hidden rounded-full border border-white shadow-sm">
          <span className="absolute inset-0" style={{ background: color }} />
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer border-0 p-0 opacity-0"
            aria-label="Pick widget color"
          />
        </span>
        Widget color
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="opacity-50"
        >
          <path
            d="M2 3.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <button
        type="button"
        onClick={() => onChange("")}
        className="glass-item btn-press rounded-full px-2.5 py-1.5 text-[10px] font-bold text-neutral-400 transition-colors hover:text-neutral-600"
        aria-label="Reset to default color"
      >
        Reset
      </button>
    </div>
  );
}

export function ProductReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const speedResetTimer = useRef<ReturnType<typeof window.setTimeout> | null>(
    null,
  );
  const lastScrollRef = useRef({
    y: 0,
    time: 0,
  });
  const activeRef = useRef(0);

  const [active, setActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [activatedGen, setActivatedGen] = useState<number[]>(() =>
    FLOWS.map(() => 0),
  );

  const flow = FLOWS[active];
  const effectiveAccent = customColor || flow.accent;

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    setActivatedGen((prev) => {
      const next = [...prev];
      next[active] += 1;
      return next;
    });
  }, [active]);

  useEffect(() => {
    function updateFromScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(1, rect.height - viewportHeight);

      const progress = clamp(-rect.top / scrollableDistance, 0, 1);
      const nextActive = Math.min(
        FLOWS.length - 1,
        Math.floor(progress * FLOWS.length),
      );

      setScrollProgress(progress);

      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
        setCustomColor(null);
      }

      const now = performance.now();
      const currentY = window.scrollY;
      const previous = lastScrollRef.current;
      const deltaY = Math.abs(currentY - previous.y);
      const deltaTime = Math.max(16, now - previous.time);
      const velocity = deltaY / deltaTime;

      lastScrollRef.current = {
        y: currentY,
        time: now,
      };

      const nextSpeed = clamp(1 + velocity * 2.8, 1, 3.8);
      setAnimationSpeed(nextSpeed);

      if (speedResetTimer.current) {
        window.clearTimeout(speedResetTimer.current);
      }

      speedResetTimer.current = window.setTimeout(() => {
        setAnimationSpeed(1);
      }, 140);
    }

    lastScrollRef.current = {
      y: window.scrollY,
      time: performance.now(),
    };

    updateFromScroll();

    window.addEventListener("scroll", updateFromScroll, {
      passive: true,
    });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);

      if (speedResetTimer.current) {
        window.clearTimeout(speedResetTimer.current);
      }
    };
  }, []);

  function handleColorChange(hex: string) {
    setCustomColor(hex === "" ? null : hex);
  }

  function scrollToFlow(index: number) {
    const section = sectionRef.current;

    if (!section) {
      setActive(index);
      setCustomColor(null);
      return;
    }

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableDistance = Math.max(
      1,
      section.offsetHeight - window.innerHeight,
    );

    const targetProgress = clamp((index + 0.08) / FLOWS.length, 0, 0.98);
    const targetY = sectionTop + scrollableDistance * targetProgress;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }

  function handleTabClick(i: number) {
    scrollToFlow(i);
  }

  function handlePrevious() {
    scrollToFlow((active - 1 + FLOWS.length) % FLOWS.length);
  }

  function handleNext() {
    scrollToFlow((active + 1) % FLOWS.length);
  }

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative h-[340vh] overflow-visible"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 text-center sm:mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
              What Helloii does
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-4xl lg:text-5xl">
              Answers every question,{" "}
              <span style={{ color: effectiveAccent }}>inside your store</span>
            </h2>
          </motion.div>

          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg lg:w-[42%] lg:max-w-none"
            >
              <div className="mb-8 flex gap-2">
                {FLOWS.map((f, i) => {
                  const segmentStart = i / FLOWS.length;
                  const segmentEnd = (i + 1) / FLOWS.length;
                  const segmentProgress = clamp(
                    (scrollProgress - segmentStart) /
                      (segmentEnd - segmentStart),
                    0,
                    1,
                  );

                  return (
                    <button
                      key={f.tag}
                      onClick={() => handleTabClick(i)}
                      className="relative h-1 flex-1 overflow-hidden rounded-full bg-neutral-200 transition-all duration-300"
                      aria-label={f.tag}
                      type="button"
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                        style={{
                          width:
                            i < active
                              ? "100%"
                              : i === active
                                ? `${Math.max(12, segmentProgress * 100)}%`
                                : "0%",
                          background: i <= active ? effectiveAccent : "#e5e7eb",
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  variants={FADE_VARIANTS}
                  initial="enter"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    style={{
                      background: `${effectiveAccent}18`,
                      color: effectiveAccent,
                    }}
                  >
                    {flow.tag}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold leading-snug tracking-[-0.03em] text-neutral-950 sm:text-3xl">
                    {flow.headline}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-neutral-500">
                    {flow.description}
                  </p>

                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold hover:underline"
                    style={{ color: effectiveAccent }}
                  >
                    View on a demo website
                    <span aria-hidden>→</span>
                  </a>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {flow.stats.map((stat) => (
                      <span
                        key={stat}
                        className="glass-item rounded-full px-3 py-1.5 text-xs font-bold text-neutral-600"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="btn-press flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-500 backdrop-blur-sm"
                  aria-label="Previous"
                  type="button"
                >
                  ←
                </button>

                <button
                  onClick={handleNext}
                  className="btn-press flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-500 backdrop-blur-sm"
                  aria-label="Next"
                  type="button"
                >
                  →
                </button>

                <span className="ml-2 text-xs text-neutral-400">
                  {active + 1} / {FLOWS.length}
                </span>

                <span
                  className="ml-auto hidden rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400 sm:inline-flex"
                  style={{
                    background: `${effectiveAccent}10`,
                  }}
                >
                  Scroll to explore
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full lg:flex-1"
            >
              <div className="mb-3 flex justify-end px-2">
                <ColorPickerButton
                  color={effectiveAccent}
                  onChange={handleColorChange}
                />
              </div>

              <div className="relative mx-auto aspect-[820/760] w-full max-w-[860px] overflow-visible bg-transparent sm:px-6 sm:py-10">
                {FLOWS.map((f, i) => (
                  <div
                    key={f.tag}
                    className={
                      i === active
                        ? "relative h-full w-full"
                        : "pointer-events-none absolute inset-0 h-full w-full opacity-0"
                    }
                    aria-hidden={i === active ? undefined : true}
                  >
                    <ChatbotAnimation
                      qa={{ turns: f.turns, chips: f.chips }}
                      accentColor={i === active ? effectiveAccent : f.accent}
                      playing={i === active}
                      resetKey={activatedGen[i]}
                      speed={i === active ? animationSpeed : 1}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
