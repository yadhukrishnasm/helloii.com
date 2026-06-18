"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/layout/container";

const SHOPIFY_URL = "http://apps.shopify.com/ai-sales-support-assistant";

const STATS = [
  { value: "50+", label: "Shopify Stores" },
  { value: "100K+", label: "Chats Handled" },
  { value: "5.0★", label: "Avg Rating" },
  { value: "3 yrs", label: "In Market" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".h-shopify-badge", { opacity: 0, y: 14, duration: 0.55 })
        .from(".h-headline", { opacity: 0, y: 28, duration: 0.65 }, "-=0.3")
        .from(".h-sub", { opacity: 0, y: 18, duration: 0.55 }, "-=0.35")
        .from(".h-stat", { opacity: 0, y: 16, duration: 0.45, stagger: 0.09 }, "-=0.3")
        .from(".h-cta", { opacity: 0, y: 14, duration: 0.45 }, "-=0.2");
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center pb-20 pt-32"
    >
      <Container>
        {/* ── Gradient box ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3faa] via-[#2563EB] to-[#4f46e5] px-8 py-16 shadow-[0_32px_80px_rgba(37,99,235,0.30)] sm:px-14 sm:py-20">

          {/* Grain texture */}
          <div className="grain-overlay pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.08]" />

          {/* Top specular line */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Corner glow — top left */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          {/* Corner glow — bottom right */}
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#7C3AED]/30 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">

            {/* Shopify badge */}
            <div className="h-shopify-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
              <ShopifyMark />
              Built for Shopify
            </div>

            {/* Headline */}
            <h1 className="h-headline mt-6 text-[2.8rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              The AI assistant your{" "}
              <span className="text-blue-200">Shopify store</span>{" "}
              needs
            </h1>

            {/* Subtext */}
            <p className="h-sub mx-auto mt-5 max-w-xl text-base leading-7 text-blue-100/80 sm:text-lg sm:leading-8">
              Answer every customer question, recommend the right product, and
              handle support — automatically, 24/7. Not a generic chatbot.
              Built exclusively for Shopify.
            </p>

            {/* Trust stats */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="h-stat rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-blue-200/80">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="h-cta mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#2563EB] shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Add to Shopify — free
                <span aria-hidden>→</span>
              </a>
              <a
                href="https://calendar.app.google/uCHWaZUmUy9fbeax5"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
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
