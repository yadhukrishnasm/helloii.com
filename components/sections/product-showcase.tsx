"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ProductAnimation = dynamic(
  () => import("@/components/animations/product-animation"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-white text-sm font-medium text-neutral-500">
        Loading product preview...
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
    <section
      id="product"
      className="relative h-screen w-full overflow-hidden"
    >
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
