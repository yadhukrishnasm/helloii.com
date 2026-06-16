"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ProductAnimation = dynamic(
  () => import("@/components/animations/product-animation"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-white px-8">
        {/* Helloii letter-by-letter wave animation */}
        <div className="flex items-end gap-[1px]">
          {"Helloii".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block text-2xl font-bold text-[#2563EB]"
              style={{
                animation: "loadingBounce 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes loadingBounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-8px); }
          }
        `}</style>

        {/* Skeleton chat bubbles */}
        <div className="w-full max-w-[260px] space-y-3">
          <div className="flex items-end gap-2">
            <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-neutral-100" />
            <div
              className="h-8 flex-1 animate-pulse rounded-2xl rounded-bl-sm bg-neutral-100"
              style={{ animationDelay: "0ms" }}
            />
          </div>
          <div className="flex justify-end">
            <div
              className="h-8 w-3/4 animate-pulse rounded-2xl rounded-br-sm bg-neutral-100"
              style={{ animationDelay: "150ms" }}
            />
          </div>
          <div className="flex items-end gap-2">
            <div
              className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-neutral-100"
              style={{ animationDelay: "300ms" }}
            />
            <div
              className="h-12 flex-1 animate-pulse rounded-2xl rounded-bl-sm bg-neutral-100"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>

        <p className="text-[11px] font-medium tracking-wide text-neutral-300 uppercase">
          Setting up assistant…
        </p>
      </div>
    ),
  },
);

interface ProductShowcaseProps {
  onIntroComplete?: () => void;
}

function ProductShowcase({ onIntroComplete }: ProductShowcaseProps) {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      onIntroComplete?.();
    }, 16000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onIntroComplete]);

  return (
    <section id="product" className="relative h-screen w-full overflow-hidden">
      <ProductAnimation />
    </section>
  );
}

interface DesktopProductShowcaseProps {
  onIntroComplete?: () => void;
}

export default function DesktopProductShowcase({
  onIntroComplete,
}: DesktopProductShowcaseProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const update = () => {
      setIsDesktop(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  if (!isDesktop) {
    return null;
  }

  return <ProductShowcase onIntroComplete={onIntroComplete} />;
}
