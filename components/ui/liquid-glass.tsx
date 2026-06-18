"use client";

import type { CSSProperties, ReactNode } from "react";

type LiquidGlassBubbleProps = {
  children: ReactNode;
  accent?: string;
  accentLight?: string;
  className?: string;
};

export function LiquidGlassBubble({
  children,
  accent = "#ffffff",
  accentLight = "#eef4ff",
  className = "",
}: LiquidGlassBubbleProps) {
  return (
    <div
      className={`liquid-glass ${className}`}
      style={
        {
          "--liquid-accent": accent,
          "--liquid-accent-light": accentLight,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
