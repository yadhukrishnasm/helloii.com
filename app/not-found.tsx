"use client";

import { LiquidGlassBubble } from "@/components/ui/liquid-glass";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-6">

      <LiquidGlassBubble
        accent="#1A56FF"
        accentLight="#5A9CFF"
        className="relative backdrop-blur-2xl bg-white/40 border border-white/60 shadow-xl rounded-3xl px-10 py-14 max-w-md w-full text-center overflow-hidden"
      >
        <h1 className="text-9xl font-black  pb-3">404</h1>

          <h1 className="relative text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
            Page not found
          </h1>
          <p className="relative mt-3 text-sm text-shadow-white">
            Let's get your bot back on track.
          </p>
          <Link
            href="/"
            className="relative inline-block mt-8 px-6 py-3 rounded-full bg-white/60 border border-white/80 text-slate-800 font-medium backdrop-blur-md shadow-md hover:bg-white/80 hover:scale-105 transition-all duration-300"
          >
            Back to home
          </Link>


        </LiquidGlassBubble>
      <style jsx global>{`
        @keyframes morph {
          0%, 100% { transform: rotate(0deg) scale(1); border-radius: 50%; }
          33% { transform: rotate(8deg) scale(1.08); }
          66% { transform: rotate(-6deg) scale(0.95); }
        }
        .animate-morph { animation: morph 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
