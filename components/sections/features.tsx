"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "../ui/liquid-glass";

type IconComponent = React.FC<{ color: string }>;

/* ─── SVG Icons ───────────────────────────────────────────────────── */

function BrandColorsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="52%" height="52%">
      {/* Palette base */}
      <path
        d="M24 6C14.06 6 6 14.06 6 24c0 9.94 8.06 18 18 18 1.66 0 3-.9 3-2.5 0-.65-.25-1.25-.62-1.75-.36-.47-.58-1.04-.58-1.75 0-1.66 1.34-3 3-3h3.54C37.82 33 42 28.52 42 23c0-9.39-8.06-17-18-17z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Color dots */}
      <circle cx="15" cy="22" r="2.5" fill={color} opacity="0.9" />
      <circle cx="21" cy="15" r="2.5" fill={color} opacity="0.6" />
      <circle cx="30" cy="14" r="2.5" fill={color} opacity="0.4" />
      <circle cx="36" cy="21" r="2.5" fill={color} opacity="0.7" />
    </svg>
  );
}

function KnowledgeBaseIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="52%" height="52%">
      {/* Bottom layer */}
      <ellipse cx="24" cy="36" rx="14" ry="4.5" stroke={color} strokeWidth="2" />
      <path d="M10 36v4c0 2.49 6.27 4.5 14 4.5S38 42.49 38 40v-4" stroke={color} strokeWidth="2" />
      {/* Middle layer */}
      <ellipse cx="24" cy="26" rx="14" ry="4.5" stroke={color} strokeWidth="2" />
      <path d="M10 26v4c0 2.49 6.27 4.5 14 4.5S38 32.49 38 30v-4" stroke={color} strokeWidth="2" />
      {/* Top layer */}
      <ellipse cx="24" cy="16" rx="14" ry="4.5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
      <path d="M10 16v4c0 2.49 6.27 4.5 14 4.5S38 22.49 38 20v-4" stroke={color} strokeWidth="2" />
      {/* Sync arrow on top */}
      <path d="M20 13.5 L24 10 L28 13.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AISparkleIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="52%" height="52%">
      {/* Main large sparkle */}
      <path
        d="M24 6 L26.4 20.8 L38 24 L26.4 27.2 L24 42 L21.6 27.2 L10 24 L21.6 20.8 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.12"
      />
      {/* Small sparkle top-right */}
      <path
        d="M38 10 L39 14 L43 15 L39 16 L38 20 L37 16 L33 15 L37 14 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.2"
      />
      {/* Tiny dot bottom-left */}
      <circle cx="11" cy="36" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function AnalyticsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="52%" height="52%">
      {/* Bars */}
      <rect x="7" y="28" width="7" height="14" rx="2" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.8" />
      <rect x="20.5" y="20" width="7" height="22" rx="2" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.8" />
      <rect x="34" y="12" width="7" height="30" rx="2" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.8" />
      {/* Trend line */}
      <path
        d="M10.5 26 L24 17 L37.5 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      {/* Arrow tip */}
      <path
        d="M34 9 L38 9 L38 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatboxIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="52%" height="52%">
      {/* Main chat bubble */}
      <path
        d="M8 10C8 7.79 9.79 6 12 6H36C38.21 6 40 7.79 40 10V28C40 30.21 38.21 32 36 32H20L12 40V32H12C9.79 32 8 30.21 8 28V10Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.08"
      />
      {/* Cursor / text lines */}
      <path d="M15 17H33" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 23H26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Blinking cursor line */}
      <path d="M28 23H29.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Feature data ────────────────────────────────────────────────── */

const FEATURES: {
  icon: IconComponent;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
  cardBg: string;
  cardBgLight: string;
  size: "big" | "medium" | "small";
  layoutClassName: string;
}[] = [
  {
    icon: BrandColorsIcon,
    title: "Custom Brand Colors",
    description:
      "Match Helloii exactly to your store's design. Full color customization so the assistant feels native — not bolted on.",
    accent: "#2563EB",
    accentLight: "#93C5FD",
    cardBg: "#DBEAFE",
    cardBgLight: "#BFDBFE",
    size: "big",
    layoutClassName: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  },
  {
    icon: KnowledgeBaseIcon,
    title: "Store Knowledge Base",
    description:
      "Syncs with your Shopify catalog, product pages, and store policies. Always up to date — no manual input needed.",
    accent: "#7C3AED",
    accentLight: "#C4B5FD",
    cardBg: "#EDE9FE",
    cardBgLight: "#DDD6FE",
    size: "medium",
    layoutClassName: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  },
  {
    icon: AISparkleIcon,
    title: "GPT-Powered Responses",
    description:
      "Answers that feel human, not robotic. Powered by the latest GPT models to handle complex questions naturally.",
    accent: "#2563EB",
    accentLight: "#93C5FD",
    cardBg: "#DBEAFE",
    cardBgLight: "#BFDBFE",
    size: "small",
    layoutClassName: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  },
  {
    icon: AnalyticsIcon,
    title: "Per-Store Analytics",
    description:
      "Track customers engaged, messages handled, and product recommendations — detailed analytics per store, per day.",
    accent: "#4F46E5",
    accentLight: "#A5B4FC",
    cardBg: "#E0E7FF",
    cardBgLight: "#C7D2FE",
    size: "big",
    layoutClassName: "md:col-span-1 lg:col-span-5 lg:row-span-2",
  },
  {
    icon: ChatboxIcon,
    title: "Embedded Question Box",
    description:
      "A compact assistant appears right below product descriptions — exactly where customers hesitate and need help most.",
    accent: "#7C3AED",
    accentLight: "#C4B5FD",
    cardBg: "#EDE9FE",
    cardBgLight: "#DDD6FE",
    size: "big",
    layoutClassName: "md:col-span-1 lg:col-span-7 lg:row-span-2",
  },
];

/* ─── Section ─────────────────────────────────────────────────────── */

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-[-12%] top-16 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-10%] h-80 w-80 rounded-full bg-[#7C3AED]/10 blur-3xl" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            Everything included
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-4xl lg:text-5xl">
            Built for serious{" "}
            <span className="text-[#7C3AED]">Shopify stores</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-500">
            Every feature is designed around one goal: helping your customers
            find what they need and buy with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[170px]">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`h-full ${feature.layoutClassName}`}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Card ────────────────────────────────────────────────────────── */

function FeatureCard({
  icon,
  title,
  description,
  accent,
  accentLight,
  cardBg,
  cardBgLight,
  size,
}: {
  icon: IconComponent;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
  cardBg: string;
  cardBgLight: string;
  size: "big" | "medium" | "small";
}) {
  const isBig = size === "big";

  return (
    <LiquidGlassBubble
      accent={cardBg}
      accentLight={cardBgLight}
      className="group flex h-full max-w-none flex-col justify-between rounded-[28px] p-6 text-neutral-950 transition-transform duration-300 hover:-translate-y-1"
    >
      {isBig ? (
        <BigFeatureContent icon={icon} title={title} description={description} accent={accent} accentLight={accentLight} />
      ) : (
        <CompactFeatureContent icon={icon} title={title} description={description} accent={accent} accentLight={accentLight} size={size} />
      )}

      <div className="mt-6 flex items-center gap-3">
        <div
          className="h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-16"
          style={{ background: accent }}
        />
        <div className="h-px flex-1 bg-neutral-950/10" />
      </div>
    </LiquidGlassBubble>
  );
}

function BigFeatureContent({
  icon,
  title,
  description,
  accent,
  accentLight,
}: {
  icon: IconComponent;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between">
      <div className="mb-7 flex items-start justify-between gap-5">
        <AnimatedIcon
          icon={icon}
          accent={accent}
          accentLight={accentLight}
          className="h-24 w-24 rounded-[28px] sm:h-28 sm:w-28"
        />
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-full opacity-80"
          style={{ background: accent }}
        />
      </div>

      <div>
        <h3 className="max-w-[20rem] text-2xl font-bold tracking-[-0.04em] text-neutral-950 sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
          {description}
        </p>
      </div>
    </div>
  );
}

function CompactFeatureContent({
  icon,
  title,
  description,
  accent,
  accentLight,
  size,
}: {
  icon: IconComponent;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
  size: "medium" | "small";
}) {
  return (
    <div className="flex min-h-0 flex-1 items-start gap-4">
      <AnimatedIcon
        icon={icon}
        accent={accent}
        accentLight={accentLight}
        className={size === "small" ? "h-16 w-16 rounded-2xl" : "h-20 w-20 rounded-[24px]"}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold tracking-[-0.035em] text-neutral-950">
            {title}
          </h3>
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-full opacity-80"
            style={{ background: accent }}
          />
        </div>
        <p className="text-sm leading-6 text-neutral-600">{description}</p>
      </div>
    </div>
  );
}

/* ─── Animated icon container ─────────────────────────────────────── */

function AnimatedIcon({
  icon: Icon,
  accent,
  accentLight,
  className,
}: {
  icon: IconComponent;
  accent: string;
  accentLight: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0], rotate: [0, -1.5, 1.5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`relative flex shrink-0 items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(135deg, ${accent}14, ${accentLight}28)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 18px 36px ${accent}18`,
      }}
    >
      {/* Radial glow pulse */}
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at 35% 25%, ${accent}30, transparent 60%)`,
        }}
      />

      {/* SVG icon */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex items-center justify-center w-full h-full"
      >
        <Icon color={accent} />
      </motion.div>
    </motion.div>
  );
}
