"use client";

import { useRef, useState } from "react";

import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import DesktopProductShowcase from "@/components/sections/product-showcase";
import { RecognizedBy } from "@/components/sections/recognized-by";

function slowScrollTo(target: HTMLElement, duration = 2400) {
  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export default function HomePage() {
  const storyRef = useRef<HTMLElement | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleIntroComplete = () => {
    setAnimationComplete(true);
    if (storyRef.current) slowScrollTo(storyRef.current);
  };

  return (
    <>
      {/* Mobile: always show. Desktop: hide during animation, reveal after. */}
      <div className={animationComplete ? "block" : "block md:hidden"}>
        <Navbar />
      </div>

      <main>
        <div className="block md:hidden">
          <Hero />
        </div>

        <div className="hidden md:block">
          <DesktopProductShowcase onIntroComplete={handleIntroComplete} />
          <Hero sectionRef={storyRef} />
        </div>

        <About />
        <FAQ />
        <RecognizedBy />
      </main>

      <Footer />
    </>
  );
}
