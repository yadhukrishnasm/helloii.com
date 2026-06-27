"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/layout/container";

const SHOPIFY_URL = "http://apps.shopify.com/ai-sales-support-assistant";

const STATS = [
  {
    value: "200+",
    label: "Shopify Stores",
    icon: StoreIcon,
    className: "sm:left-24 sm:top-20 lg:left-32 lg:top-20",
    rotate: -5,
    burstX: 180,
    burstY: 120,
    // proximity repulsion config — unique per card
    proximityRadius: 180,
    strength: 14,
    returnEase: "elastic.out(1, 0.5)",
    moveDuration: 0.5,
  },
  {
    value: "1M+",
    label: "Chats Handled",
    icon: ChatIcon,
    className: "sm:right-24 sm:top-24 lg:right-32 lg:top-24",
    rotate: 4,
    burstX: -180,
    burstY: 120,
    proximityRadius: 220,
    strength: 10,
    returnEase: "power3.out",
    moveDuration: 0.7,
  },
  {
    value: "5.0★",
    label: "Avg Rating",
    icon: RatingIcon,
    className: "sm:left-20 sm:bottom-24 lg:left-28 lg:bottom-28",
    rotate: 6,
    burstX: 180,
    burstY: -120,
    proximityRadius: 200,
    strength: 18,
    returnEase: "elastic.out(1.2, 0.4)",
    moveDuration: 0.4,
  },
  {
    value: "3 yrs",
    label: "In Market",
    icon: MarketIcon,
    className: "sm:right-20 sm:bottom-24 lg:right-28 lg:bottom-28",
    rotate: -6,
    burstX: -180,
    burstY: -120,
    proximityRadius: 160,
    strength: 12,
    returnEase: "power2.out",
    moveDuration: 0.65,
  },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = ref.current;
      if (!hero) return;

      const statCards = gsap.utils.toArray<HTMLElement>(".h-stat-float");

      // Hide cards immediately so they're invisible before burst. Rotation
      // is set here (and re-asserted on every later tween below) so GSAP
      // "owns" it as part of its own transform stack — otherwise the x/y/
      // scale tweens overwrite the element's transform wholesale and wipe
      // out a CSS-class-based rotate the moment they run.
      statCards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotate: STATS[i].rotate,
          transformPerspective: 700,
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-shopify-badge", { opacity: 0, y: 14, duration: 0.55 })
        .from(".h-headline", { opacity: 0, y: 28, duration: 0.65 }, "-=0.3")
        .from(".h-sub", { opacity: 0, y: 18, duration: 0.55 }, "-=0.35")
        .from(".h-cta", { opacity: 0, y: 14, duration: 0.45 }, "-=0.2")
        .add(() => {
          // One-by-one: each card waits for the previous one to mostly
          // finish before it starts, instead of a tiny near-simultaneous
          // stagger.
          statCards.forEach((card, i) => {
            const stat = STATS[i];
            gsap.fromTo(
              card,
              {
                x: stat.burstX,
                y: stat.burstY,
                scale: 0.6,
                opacity: 0,
                rotate: 0,
                filter: "blur(8px)",
              },
              {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: stat.rotate,
                filter: "blur(0px)",
                duration: 0.7,
                delay: i * 0.35,
                ease: "expo.out",
              },
            );
          });
        }, "-=0.2");

      // Track displaced cards so untouched cards never animate
      const displaced = new Set<number>();

      const handleMouseMove = (event: MouseEvent) => {
        statCards.forEach((card, i) => {
          const stat = STATS[i];
          const cardRect = card.getBoundingClientRect();
          const cardCX = cardRect.left + cardRect.width / 2;
          const cardCY = cardRect.top + cardRect.height / 2;

          const dx = event.clientX - cardCX;
          const dy = event.clientY - cardCY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < stat.proximityRadius && dist > 0) {
            displaced.add(i);
            const t = 1 - dist / stat.proximityRadius;
            gsap.to(card, {
              x: -(dx / dist) * t * stat.strength,
              y: -(dy / dist) * t * stat.strength,
              duration: stat.moveDuration,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else if (displaced.has(i)) {
            displaced.delete(i);
            gsap.to(card, {
              x: 0,
              y: 0,
              duration: 0.9,
              ease: stat.returnEase,
              overwrite: "auto",
            });
          }
        });
      };

      const handleMouseLeave = () => {
        displaced.forEach((i) => {
          gsap.to(statCards[i], {
            x: 0,
            y: 0,
            duration: 1.0,
            ease: STATS[i].returnEase,
            overwrite: "auto",
          });
        });
        displaced.clear();
      };

      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseleave", handleMouseLeave);

      // Rare, random card flip — roughly once every 10s (wide random spread,
      // not a fixed cadence), a single randomly-picked card does a 3D flip.
      // rotationY is a separate transform axis from the base tilt (rotate)
      // and the hover-repulsion x/y tweens, so it never conflicts with them
      // — and a full 360° turn always lands back face-up.
      let flipTimer: number;

      const scheduleFlip = () => {
        const delay = 4000 + Math.random() * 12000; // ~4–16s, avg ~10s
        flipTimer = window.setTimeout(() => {
          const card = statCards[Math.floor(Math.random() * statCards.length)];
          gsap.to(card, {
            rotationY: `+=${360 * (Math.random() < 0.5 ? 1 : -1)}`,
            duration: 0.85,
            ease: "power2.inOut",
          });
          scheduleFlip();
        }, delay);
      };
      scheduleFlip();

      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseleave", handleMouseLeave);
        window.clearTimeout(flipTimer);
      };
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center pb-12 pt-24 sm:pb-20 sm:pt-32"
    >
      <Container>
        <div className="relative overflow-visible rounded-3xl bg-gradient-to-br from-[#1438C9] via-[#1A56FF] to-[#5b4fff] px-6 py-10 shadow-[0_32px_80px_rgba(26,86,255,0.30)] sm:px-14 sm:py-30">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div className="grain-overlay absolute inset-0 rounded-[inherit] opacity-[0.6]" />

            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#8B2FFF]/30 blur-3xl" />
          </div>

          {/* Desktop exploded stat cards — only shown once the box is wide
              enough for the absolute offsets to clear the centered headline
              (below ~1330px they'd overlap the text). */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden min-[1330px]:block">
            {STATS.map((s) => {
              const Icon = s.icon;

              return (
                <div
                  key={s.label}
                  className={`h-stat-float absolute w-[168px] rounded-[1.4rem] border border-white/20 bg-white/15 px-4 py-4 text-center shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md will-change-transform ${s.className}`}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                    <Icon />
                  </div>

                  <p className="mt-3 text-3xl font-black leading-none tracking-tight text-white">
                    {s.value}
                  </p>

                  <p className="mt-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-blue-100/85">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="h-shopify-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              <ShopifyMark />
              Shopify App
            </div>

            <h1 className="h-headline mt-4 text-[2.3rem] font-bold leading-[1.08] tracking-tight text-white sm:mt-6 sm:text-6xl sm:leading-[1.05] lg:text-7xl">
              The AI assistant that turns{" "}
              <span className="text-[#A8E64D]">questions</span> into checkouts.
            </h1>

            <p className="h-sub mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100/80 sm:mt-5 sm:text-lg sm:leading-8">
              When shoppers can't get an answer, they leave. Helloii answers
              instantly on your product pages — sizing, shipping, returns,
              comparisons — guiding customers to the right product and to
              checkout.
            </p>

            {/* Entity sentence — server-rendered, high in the DOM, for LLM/crawler
                citation only. sr-only keeps it out of the visual layout for
                human visitors on every screen size while leaving the text
                fully present in the server-rendered HTML. */}
            <p className="sr-only">
              Helloii is an AI shopping assistant for Shopify stores that
              reduces support load by instantly answering customer questions
              about products, shipping, returns, sizing, and store policies —
              24/7, with no human in the loop for routine questions.
            </p>

            {/* Category/comparison block — plain factual text for LLM
                retrieval on "best Shopify support chatbot" / "X vs Y"
                style queries. sr-only, same reasoning as the entity
                sentence above: present in the server HTML, invisible in
                the rendered layout. */}
            <p className="sr-only">
              Helloii belongs to the category of AI customer support and
              sales assistants for Shopify stores. Unlike chatbots that
              require manual FAQ setup, Helloii automatically learns a
              store's product catalog, collections, and policies on
              installation. It reduces support-team workload by answering
              routine pre-sale and post-sale questions instantly, and hands
              off harder or unresolved questions to the store's team over
              WhatsApp instead of leaving the customer without an answer.
            </p>

            {/* Compact stat grid — covers everything below the floating-card
                breakpoint (was just mobile; now also fills the 640–1330px
                gap where the floating cards would overlap the headline). */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 min-[1330px]:hidden">
              {STATS.map((s) => {
                const Icon = s.icon;

                return (
                  <div
                    key={s.label}
                    className="h-stat rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-center backdrop-blur-sm"
                  >
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                      <Icon />
                    </div>

                    <p className="mt-2 text-xl font-black tracking-tight text-white">
                      {s.value}
                    </p>

                    <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-blue-200/85">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="h-cta mt-6 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white"
              >
                Add to Shopify — free
                <span aria-hidden>→</span>
              </a>

              <a
                href="https://calendar.app.google/uCHWaZUmUy9fbeax5"
                target="_blank"
                rel="noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#1A56FF] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StoreIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.25 12.25V23.25H22.75V12.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.25 23.25V16.5H13.25V23.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 6.25H23.5L25 11.25C25 13.04 23.54 14.5 21.75 14.5C20.46 14.5 19.35 13.75 18.83 12.67C18.31 13.75 17.21 14.5 15.92 14.5C14.63 14.5 13.52 13.75 13 12.67C12.48 13.75 11.37 14.5 10.08 14.5C8.79 14.5 7.69 13.75 7.17 12.67C6.65 13.75 5.54 14.5 4.25 14.5C2.46 14.5 1 13.04 1 11.25L4.5 6.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 6.25V3.75H20V6.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.25 6.5C5.25 4.98 6.48 3.75 8 3.75H20C21.52 3.75 22.75 4.98 22.75 6.5V14.5C22.75 16.02 21.52 17.25 20 17.25H12.25L6.75 22.25V17.25H8C6.48 17.25 5.25 16.02 5.25 14.5V6.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.75H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 13H15.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RatingIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 3.25L17.05 9.43L23.88 10.42L18.94 15.24L20.1 22.03L14 18.82L7.9 22.03L9.06 15.24L4.12 10.42L10.95 9.43L14 3.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 7.85L15.55 11L19.03 11.51L16.51 13.96L17.11 17.43L14 15.8L10.89 17.43L11.49 13.96L8.97 11.51L12.45 11L14 7.85Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}

function MarketIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 25C20.08 25 25 20.08 25 14C25 7.92 20.08 3 14 3C7.92 3 3 7.92 3 14C3 20.08 7.92 25 14 25Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14 7.5V14L18.25 16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 14H5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M22.5 14H20.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function ShopifyMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 109 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M95.5 20.5C95.4 19.8 94.8 19.4 94.3 19.4C93.8 19.4 83.9 19.1 83.9 19.1C83.9 19.1 76.1 11.5 75.3 10.7C74.5 9.9 73 10.1 72.4 10.3C72.4 10.3 70.9 10.8 68.4 11.5C67.9 9.9 67.1 7.9 66 5.9C62.6 -0.1 57.6 -2.9 51.6 3C51.6 3 49.6 4.2 46.9 5C44.2 5.8 41.4 6.6 41.4 6.6L38.7 7.4C38.7 7.4 31.5 9.5 27.6 10.7C27.6 10.7 27.3 11 27 11.6L6.1 109.4C6 110.1 6.4 110.8 7.1 111L94.8 124C94.8 124 95.9 123.9 96.2 123.6C96.5 123.3 96.7 122.4 96.7 122.4L109 21.3C109 20.6 108.4 20 107.7 20C107 20 95.6 20.5 95.5 20.5Z"
        fill="#95BF47"
      />
      <path
        d="M94.3 19.4C93.8 19.4 83.9 19.1 83.9 19.1C83.9 19.1 76.1 11.5 75.3 10.7C75 10.4 74.6 10.3 74.2 10.3L67 123.9L107.6 122.4C107.6 122.4 109 21.3 109 21.2C109 20.5 108.4 19.9 107.7 19.9L94.3 19.4Z"
        fill="#5E8E3E"
      />
      <path
        d="M51.6 38.2L47.8 53.3C47.8 53.3 43.6 51.4 38.6 51.7C31.3 52.1 31.2 56.8 31.3 57.9C31.7 64.4 48.3 65.8 49.3 80.5C50 92 43 99.9 32.4 100.5C19.7 101.2 12.8 93.7 12.8 93.7L15.6 82.1C15.6 82.1 22.6 87.4 28.1 87.1C31.6 86.9 32.9 84.1 32.7 82.1C32.2 73.8 18.6 74.3 17.7 60.8C17 49.5 24.7 38 41.7 37C47.9 36.6 51.6 38.2 51.6 38.2Z"
        fill="white"
      />
    </svg>
  );
}
