"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "../ui/liquid-glass";

const FEATURES = [
  {
    icon: "🎨",
    title: "Custom Brand Colors",
    description:
      "Match Helloii exactly to your store's design. Full color customization so the assistant feels native — not bolted on.",
    accent: "#2563EB",
    accentLight: "#93C5FD",
    size: "big",
    layoutClassName: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  },
  {
    icon: "📚",
    title: "Store Knowledge Base",
    description:
      "Syncs with your Shopify catalog, product pages, and store policies. Always up to date — no manual input needed.",
    accent: "#FF2FB2",
    accentLight: "#FF9BDB",
    size: "medium",
    layoutClassName: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  },
  {
    icon: "🤖",
    title: "GPT-Powered Responses",
    description:
      "Answers that feel human, not robotic. Powered by the latest GPT models to handle complex questions naturally.",
    accent: "#2563EB",
    accentLight: "#93C5FD",
    size: "small",
    layoutClassName: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  },
  {
    icon: "📊",
    title: "Per-Store Analytics",
    description:
      "Track customers engaged, messages handled, and product recommendations — detailed analytics per store, per day.",
    accent: "#2563EB",
    accentLight: "#93C5FD",
    size: "medium",
    layoutClassName: "md:col-span-1 lg:col-span-5 lg:row-span-2",
  },
  {
    icon: "💬",
    title: "Embedded Question Box",
    description:
      "A compact assistant appears right below product descriptions — exactly where customers hesitate and need help most.",
    accent: "#FF2FB2",
    accentLight: "#FF9BDB",
    size: "big",
    layoutClassName: "md:col-span-1 lg:col-span-7 lg:row-span-2",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-[-12%] top-16 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-10%] h-80 w-80 rounded-full bg-[#FF2FB2]/10 blur-3xl" />

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
            <span className="text-[#FF2FB2]">Shopify stores</span>
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

function FeatureCard({
  icon,
  title,
  description,
  accent,
  accentLight,
  size,
}: {
  icon: string;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
  size: "big" | "medium" | "small";
}) {
  const isBig = size === "big";

  return (
    <LiquidGlassBubble
      accent="#ffffff"
      accentLight="#eef4ff"
      className="group flex h-full max-w-none flex-col justify-between rounded-[28px] p-6 text-neutral-950 transition-transform duration-300 hover:-translate-y-1"
    >
      {isBig ? (
        <BigFeatureContent
          icon={icon}
          title={title}
          description={description}
          accent={accent}
          accentLight={accentLight}
        />
      ) : (
        <CompactFeatureContent
          icon={icon}
          title={title}
          description={description}
          accent={accent}
          accentLight={accentLight}
          size={size}
        />
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
  icon: string;
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
          className="h-24 w-24 rounded-[28px] text-5xl sm:h-28 sm:w-28 sm:text-6xl"
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
  icon: string;
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
        className={
          size === "small"
            ? "h-16 w-16 rounded-2xl text-3xl"
            : "h-20 w-20 rounded-[24px] text-4xl"
        }
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

function AnimatedIcon({
  icon,
  accent,
  accentLight,
  className,
}: {
  icon: string;
  accent: string;
  accentLight: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -5, 0],
        rotate: [0, -2, 2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative flex shrink-0 items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(135deg, ${accent}18, ${accentLight}30)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 18px 36px ${accent}18`,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at 35% 25%, ${accent}35, transparent 58%)`,
        }}
      />

      <motion.span
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        {icon}
      </motion.span>
    </motion.div>
  );
}
