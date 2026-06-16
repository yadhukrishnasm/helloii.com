"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      lerp: 0.08,
    });

    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const section = document.querySelector(href);

      if (!section) return;

      event.preventDefault();

      lenis.scrollTo(section as HTMLElement, {
        offset: -90,
        duration: 1.25,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
