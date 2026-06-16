import { cn } from "@/lib/utils";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidGlass({ children, className }: LiquidGlassProps) {
  return (
    <div
      className={cn(
        `
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/30
        bg-white/50
        backdrop-blur-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
      `,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-24
            bg-gradient-to-b
            from-white/60
            to-transparent
          "
        />

        <div
          className="
            absolute
            -left-24
            top-0
            h-full
            w-32
            rotate-12
            bg-white/30
            blur-3xl
          "
        />
      </div>

      {children}
    </div>
  );
}
