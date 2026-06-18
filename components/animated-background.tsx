"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
// useSpring is still used by the background blob follower above

// Mirrors AnimatedMesh from product-animation.jsx — same colors, same sine/cosine motion,
// same white overlay — but mapped to fractional viewport units instead of a 1920×1080 canvas.
const BLOBS = [
  {
    cx: 0.12, cy: 0.15,
    ax: 0.045, ay: 0.05,
    fx: 0.31, fy: 0.25,
    size: 600,
    color: "rgba(238,72,108,0.48)",
  },
  {
    cx: 0.62, cy: 0.13,
    ax: 0.055, ay: 0.055,
    fx: 0.20, fy: 0.29,
    size: 680,
    color: "rgba(46,120,238,0.40)",
  },
  {
    cx: 0.78, cy: 0.66,
    ax: 0.07, ay: 0.065,
    fx: 0.18, fy: 0.22,
    size: 740,
    color: "rgba(255,201,64,0.38)",
  },
  {
    cx: 0.30, cy: 0.76,
    ax: 0.055, ay: 0.065,
    fx: 0.21, fy: 0.19,
    size: 620,
    color: "rgba(139,92,246,0.30)",
  },
] as const;

export function AnimatedBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse follower blob
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  );
  const followerX = useSpring(mouseX, { stiffness: 55, damping: 20, mass: 1.2 });
  const followerY = useSpring(mouseY, { stiffness: 55, damping: 20, mass: 1.2 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // Time-driven blob animation — direct DOM mutation, no React re-renders
  useEffect(() => {
    let rafId: number;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const time = (ts - startTime) / 1000; // seconds

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      BLOBS.forEach((blob, i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const x = (blob.cx + Math.sin(time * blob.fx) * blob.ax) * vw;
        const y = (blob.cy + Math.cos(time * blob.fy) * blob.ay) * vh;
        el.style.transform = `translate(${x - blob.size / 2}px, ${y - blob.size / 2}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
        style={{ background: "#f5f7fb" }}
      >
        {/* Time-based blobs — same technique as product AnimatedMesh */}
        {BLOBS.map((blob, i) => (
          <div
            key={i}
            ref={(el) => { blobRefs.current[i] = el; }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              background: blob.color,
              filter: "blur(90px)",
              willChange: "transform",
            }}
          />
        ))}

        {/* Mouse-follow blob — interactive accent */}
        <motion.div
          style={{ x: followerX, y: followerY }}
          className="pointer-events-none absolute left-0 top-0"
        >
          <div
            style={{
              transform: "translate(-50%, -50%)",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), rgba(37,99,235,0.26) 40%, rgba(255,47,178,0.20) 65%, transparent 85%)",
              filter: "blur(65px)",
              willChange: "transform",
            }}
          />
        </motion.div>

        {/* White overlay — lightens blobs to readable level */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 100% at 80% 0%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.58), rgba(245,247,251,0.60))",
            pointerEvents: "none",
          }}
        />
      </div>

      <LiquidCursor />
    </>
  );
}

// Remove unused spring imports — only useMotionValue needed for direct tracking
function LiquidCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: mouseX, y: mouseY }}
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="h-10 w-10 rounded-full border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),rgba(255,255,255,0.08))] shadow-[0_4px_20px_rgba(37,99,235,0.15)] backdrop-blur-md" />
      </div>
    </motion.div>
  );
}
