"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
// useSpring is still used by the background blob follower above

// Mirrors AnimatedMesh from product-animation.jsx — same colors, same sine/cosine motion,
// same white overlay — but mapped to fractional viewport units instead of a 1920×1080 canvas.
const BLOBS = [
  {
    cx: 0.1,
    cy: 0.12,
    ax: 0.045,
    ay: 0.05,
    fx: 0.31,
    fy: 0.25,
    size: 600,
    color: "rgba(26,86,255,0.36)",
  },
  {
    cx: 0.68,
    cy: 0.1,
    ax: 0.055,
    ay: 0.055,
    fx: 0.2,
    fy: 0.29,
    size: 680,
    color: "rgba(91,79,255,0.30)",
  },
  {
    cx: 0.8,
    cy: 0.65,
    ax: 0.07,
    ay: 0.065,
    fx: 0.18,
    fy: 0.22,
    size: 720,
    color: "rgba(139,47,255,0.24)",
  },
  {
    cx: 0.25,
    cy: 0.78,
    ax: 0.055,
    ay: 0.065,
    fx: 0.21,
    fy: 0.19,
    size: 580,
    color: "rgba(26,86,255,0.28)",
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
  const followerX = useSpring(mouseX, {
    stiffness: 55,
    damping: 20,
    mass: 1.2,
  });
  const followerY = useSpring(mouseY, {
    stiffness: 55,
    damping: 20,
    mass: 1.2,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // Set the correct (time=0) blob position synchronously before the
  // browser's first paint. requestAnimationFrame's first callback only
  // runs *after* that paint, so without this the blobs would briefly sit
  // at their unset default (top-left) and visibly snap into place — looks
  // like the whole background "slides" in on mount, especially on slower
  // mobile hydration. useLayoutEffect (not useEffect) is what guarantees
  // "before paint" here.
  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    BLOBS.forEach((blob, i) => {
      const el = blobRefs.current[i];
      if (!el) return;
      const x = blob.cx * vw;
      const y = (blob.cy + blob.ay) * vh;
      el.style.transform = `translate(${x - blob.size / 2}px, ${y - blob.size / 2}px)`;
    });
  }, []);

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
        style={{ background: "#f8f9fc" }}
      >
        {/* Time-based blobs — same technique as product AnimatedMesh */}
        {BLOBS.map((blob, i) => (
          <div
            key={i}
            ref={(el) => {
              blobRefs.current[i] = el;
            }}
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
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), rgba(26,86,255,0.26) 40%, rgba(255,47,178,0.20) 65%, transparent 85%)",
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
    </>
  );
}
