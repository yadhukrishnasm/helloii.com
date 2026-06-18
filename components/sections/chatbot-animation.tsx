"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";

const W = 720;
const H = 680;
const DUR = 23;

const WID_RIGHT = 200;
const WID_BOTTOM = 32;
const WID_W = 340;

const ORB_X = W - WID_RIGHT - 32;
const ORB_Y = H - WID_BOTTOM - 32;

const SEND_X = ORB_X - 41;

const Easing = {
  linear: (t: number) => t,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t: number) => t * t * t,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function interp(
  input: number[],
  output: number[],
  ease?: ((t: number) => number) | Array<(t: number) => number>,
) {
  return (t: number) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];

    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const local = (t - input[i]) / (input[i + 1] - input[i]);

        const fn = Array.isArray(ease)
          ? ease[i] || Easing.linear
          : ease || Easing.linear;

        return output[i] + (output[i + 1] - output[i]) * fn(local);
      }
    }

    return output[output.length - 1];
  };
}

type TimelineContextValue = {
  time: number;
  duration: number;
  playing?: boolean;
};

const TL = createContext<TimelineContextValue>({
  time: 0,
  duration: DUR,
});

function useTime() {
  return useContext(TL).time;
}

type StageProps = {
  width?: number;
  height?: number;
  duration?: number;
  background?: string;
  loop?: boolean;
  autoplay?: boolean;
  children: React.ReactNode;
};

function Stage({
  width = W,
  height = H,
  duration = DUR,
  background = "transparent",
  loop = true,
  autoplay = true,
  children,
}: StageProps) {
  const [time, setTime] = useState(0);
  const [playing] = useState(autoplay);
  const [layout, setLayout] = useState({
    scale: 1,
    left: 0,
    top: 0,
  });

  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = wrapRef.current;

      if (!el) return;

      const rect = el.getBoundingClientRect();

      const scale = Math.max(
        0.05,
        Math.min(rect.width / width, rect.height / height),
      );

      setLayout({
        scale,
        left: (rect.width - width * scale) / 2,
        top: (rect.height - height * scale) / 2,
      });
    };

    measure();

    window.addEventListener("resize", measure);

    const observer = new ResizeObserver(measure);

    if (wrapRef.current) {
      observer.observe(wrapRef.current);
    }

    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [width, height]);

  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }

    const frame = (ts: number) => {
      if (last.current == null) last.current = ts;

      const delta = (ts - last.current) / 1000;
      last.current = ts;

      setTime((cur) => {
        let next = cur + delta;

        if (next >= duration) {
          next = loop ? next % duration : duration;
        }

        return next;
      });

      raf.current = requestAnimationFrame(frame);
    };

    raf.current = requestAnimationFrame(frame);

    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }

      last.current = null;
    };
  }, [playing, duration, loop]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background,
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: layout.left,
          top: layout.top,
          width,
          height,
          transformOrigin: "top left",
          transform: `scale(${layout.scale})`,
          overflow: "visible",
        }}
      >
        <TL.Provider value={{ time, duration, playing }}>
          {children}
        </TL.Provider>
      </div>
    </div>
  );
}

const PALS = [
  [
    [37, 99, 235],
    [96, 165, 250],
  ],
  [
    [220, 38, 38],
    [252, 165, 165],
  ],
  [
    [22, 163, 74],
    [134, 239, 172],
  ],
  [
    [147, 51, 234],
    [216, 180, 254],
  ],
  [
    [139, 92, 246],
    [167, 139, 250],
  ],
];

const SWATCH_HEX = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#8b5cf6"];

function mixPal(a: number[][], b: number[][], t: number) {
  return a.map((swatch, i) =>
    swatch.map((channel, j) => Math.round(channel + (b[i][j] - channel) * t)),
  );
}

function accentAt(t: number) {
  const segs = [
    [13.0, 13.5, 0, 1],
    [14.3, 14.8, 1, 2],
    [15.6, 16.1, 2, 3],
    [16.9, 17.4, 3, 4],
    [18.2, 18.7, 4, 0],
  ];

  if (t < 13.0) return PALS[0];

  for (let i = 0; i < segs.length; i++) {
    const [t0, t1, from, to] = segs[i];

    if (t >= t0 && t < t1) {
      return mixPal(
        PALS[from],
        PALS[to],
        Easing.easeInOutCubic((t - t0) / (t1 - t0)),
      );
    }

    if (i < segs.length - 1 && t >= t1 && t < segs[i + 1][0]) {
      return PALS[to];
    }
  }

  return PALS[0];
}

function ac0(t: number) {
  return accentAt(t)[0];
}

function ac1(t: number) {
  return accentAt(t)[1];
}

function acRgb(t: number) {
  return `rgb(${ac0(t)})`;
}

function acGrad(t: number) {
  return `linear-gradient(135deg,rgb(${ac0(t)}),rgb(${ac1(t)}))`;
}

function acGlass(t: number, a1 = 0.9, a2 = 0.7) {
  return `linear-gradient(135deg,rgba(${ac0(t)},${a1}),rgba(${ac1(t)},${a2}))`;
}

function activeSwatchIdx(t: number) {
  if (t < 13.25) return 0;
  if (t < 14.55) return 1;
  if (t < 15.85) return 2;
  if (t < 17.15) return 3;
  if (t < 18.45) return 4;

  return 0;
}

function SendIcon({ color = "#fff", size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.2 11.3 20 4.2c.7-.3 1.4.4 1.1 1.1l-7.1 16.8c-.3.7-1.3.6-1.5-.1l-1.9-6.1a1 1 0 0 0-.6-.6l-6.1-1.9c-.7-.2-.8-1.2-.1-1.5Z"
        fill={color}
      />
    </svg>
  );
}

function CloseIcon({ color = "#8c8c96", size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon({ color = "#9b9ba4", size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 4.2h10M6.4 4.2V3.1c0-.4.3-.7.7-.7h1.8c.4 0 .7.3.7.7v1.1M4.4 4.2l.5 8.1c0 .5.4.9.9.9h4.4c.5 0 .9-.4.9-.9l.5-8.1"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#3897F0" />
      <path
        d="M4.7 8.2l2 2 4-4.4"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShopifyCardIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Shopify bag body */}
      <path
        d="M16.5 6.5C16.2 4.6 14.8 3 13 3c-1.8 0-3.2 1.6-3.5 3.5H7L5.5 20h13L17 6.5h-.5Z"
        fill="white"
        fillOpacity="0.9"
      />
      {/* Bag handle */}
      <path
        d="M10 8.5c0-1.1.9-2 2-2s2 .9 2 2"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* S letterform */}
      <path
        d="M13.4 10.8c-.3-.2-.7-.3-1.1-.3-.7 0-1.1.3-1.1.8 0 .4.3.7 1 .9l.4.1c.9.3 1.4.7 1.4 1.5 0 1-.8 1.7-2.1 1.7-.6 0-1.2-.2-1.6-.5l.4-.7c.3.2.7.4 1.2.4.8 0 1.2-.3 1.2-.9 0-.4-.3-.7-1-.9l-.4-.1c-.9-.3-1.3-.7-1.3-1.5 0-.9.7-1.6 2-1.6.5 0 1 .1 1.4.4l-.4.7Z"
        fill="rgba(0,0,0,0.45)"
      />
    </svg>
  );
}

function AICardIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Central star */}
      <path
        d="M12 2 L13.4 9.5 L20 12 L13.4 14.5 L12 22 L10.6 14.5 L4 12 L10.6 9.5 Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Small satellite sparkle */}
      <path
        d="M20 4 L20.8 6.5 L23 7 L20.8 7.5 L20 10 L19.2 7.5 L17 7 L19.2 6.5 Z"
        fill="white"
        fillOpacity="0.6"
      />
    </svg>
  );
}

function ClockCardIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" fillOpacity="0" />
      {/* Hour hand pointing to 12 */}
      <path d="M12 7v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Minute hand pointing to 3 */}
      <path d="M12 12h3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.2" fill="white" />
    </svg>
  );
}

function Sparkle({ color = "#2563eb", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1.1c.4 2.9 1.9 4.3 4.8 4.7C8.9 6.2 7.4 7.7 7 10.6 6.6 7.7 5.1 6.2 2.2 5.8 5.1 5.4 6.6 4 7 1.1Z"
        fill={color}
      />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.28))" }}
    >
      <path
        d="M5 3.2 18.5 11l-6 .9-2.7 6.2L5 3.2Z"
        fill="#fff"
        stroke="#181820"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrbGlow({ time, fadeOut = 1 }: { time: number; fadeOut?: number }) {
  const intro =
    clamp((time - 0.4) / 0.6, 0, 1) * (1 - clamp((time - 2.6) / 0.3, 0, 1));
  const outro =
    clamp((time - 22.2) / 0.4, 0, 1) * (1 - clamp((time - 23.2) / 0.4, 0, 1));
  const opacity = Math.max(intro, outro) * fadeOut;

  if (opacity <= 0) return null;

  const breath = 0.62 + 0.38 * Math.sin(time * 2.2);
  const c = ac0(time);
  const tipOpacity = intro * clamp((time - 0.8) / 0.4, 0, 1);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: ORB_X - 90,
          top: ORB_Y - 90,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle,rgba(${c},${0.52 * breath}) 0%,rgba(${c},0.18) 45%,transparent 70%)`,
          filter: "blur(20px)",
          opacity,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: ORB_X - 28,
          top: ORB_Y - 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: `radial-gradient(circle,rgba(${c},0.32) 0%,transparent 70%)`,
          filter: "blur(6px)",
          opacity,
          pointerEvents: "none",
        }}
      />

      {tipOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: ORB_X,
            top: ORB_Y - 74,
            transform: "translateX(-50%)",
            opacity: tipOpacity,
            padding: "7px 14px",
            borderRadius: 12,
            background: "rgba(20,20,30,0.88)",
            color: "#fff",
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(20,20,40,0.22)",
            whiteSpace: "nowrap",
          }}
        >
          Need help? Let&apos;s chat
        </div>
      )}
    </>
  );
}

function Cursor({ time }: { time: number }) {
  const opacity =
    clamp((time - 1.4) / 0.25, 0, 1) * (1 - clamp((time - 5.95) / 0.25, 0, 1));

  if (opacity <= 0) return null;

  const x = interp(
    [1.7, 2.75, 5.3, 5.65],
    [W * 0.28, ORB_X, ORB_X, SEND_X],
    [Easing.easeInOutCubic, Easing.linear, Easing.easeInOutCubic],
  )(time);

  const y = interp(
    [1.7, 2.75, 5.3, 5.65],
    [H * 0.35, ORB_Y, ORB_Y, ORB_Y],
    [Easing.easeInOutCubic, Easing.linear, Easing.easeInOutCubic],
  )(time);

  const press =
    time > 2.68 && time < 2.88
      ? 1 - Math.abs((time - 2.78) / 0.1)
      : time > 5.55 && time < 5.75
        ? 1 - Math.abs((time - 5.65) / 0.1)
        : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 90,
        opacity,
        transform: `scale(${1 - press * 0.15}) rotate(${press * -5}deg)`,
      }}
    >
      <CursorIcon />
    </div>
  );
}

function Ripple({
  time,
  t0,
  x,
  y,
  color,
}: {
  time: number;
  t0: number;
  x: number;
  y: number;
  color: string;
}) {
  const p = clamp((time - t0) / 0.5, 0, 1);

  if (p <= 0 || p >= 1) return null;

  const r = 12 + p * 40;

  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        opacity: (1 - p) * 0.6,
        zIndex: 80,
      }}
    />
  );
}

function GlassyMorph({ time }: { time: number }) {
  const mFwd = Easing.easeInOutCubic(clamp((time - 2.9) / 0.9, 0, 1));
  const mRev = Easing.easeInOutCubic(clamp((time - 21.4) / 0.9, 0, 1));
  const mf = mFwd * (1 - mRev);
  const w = 64 + (WID_W - 64) * mf;

  const whiteIn = clamp((time - 3.3) / 0.5, 0, 1);
  const whiteOut = clamp((time - 21.1) / 0.35, 0, 1);
  const white = whiteIn * (1 - whiteOut);

  const ctrlIn = clamp((time - 3.75) / 0.35, 0, 1);
  const ctrlOut = clamp((time - 20.9) / 0.28, 0, 1);
  const ctrl = ctrlIn * (1 - ctrlOut);

  const q = "What is your return policy?";
  let text = "";
  let textCol = "#9ca0aa";

  if (mRev <= 0) {
    if (time < 4.3) {
      text = "Ask me anything…";
    } else {
      const n = Math.floor(clamp((time - 4.3) / 0.82, 0, 1) * q.length);
      text = q.slice(0, n);
      textCol = "#25252d";
    }
  }

  const caret =
    mRev <= 0 && time >= 4.3 && time < 5.65 && Math.floor(time * 3) % 2 === 0;

  const sendPulse =
    time >= 5.45 && time < 5.75 ? 1 - Math.abs((time - 5.6) / 0.15) : 0;

  const shadow = `0 ${8 + mf * 18}px ${22 + mf * 30}px rgba(25,22,45,${
    0.13 + mf * 0.06
  })`;

  const c0 = ac0(time);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        width: w,
        height: 64,
        borderRadius: 32,
        background: "#fff",
        overflow: "hidden",
        boxShadow: shadow,
        border: "1px solid rgba(20,20,40,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - white,
          background: `radial-gradient(140% 140% at 28% 22%,rgba(255,255,255,0.95),rgba(255,255,255,0.15) 38%,rgba(255,255,255,0) 56%),${acGrad(time)}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - white,
          boxShadow:
            "inset 0 2px 7px rgba(255,255,255,0.72),inset 0 -10px 20px rgba(28,18,58,0.22)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 22,
          top: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          opacity: ctrl,
          fontFamily: FONT,
          fontSize: 15,
          color: textCol,
          whiteSpace: "pre",
        }}
      >
        {text}
        {caret ? (
          <span style={{ color: acRgb(time), marginLeft: 1 }}>|</span>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          right: 12,
          top: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 7,
          opacity: ctrl,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: acGlass(time),
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.32)",
            boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.48),0 4px 12px rgba(${c0},0.38)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 + sendPulse * 0.24})`,
          }}
        >
          <SendIcon color="#fff" size={17} />
        </div>

        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            background: "rgba(255,255,255,0.52)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(20,20,40,0.07)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.8),0 2px 5px rgba(20,20,40,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

function Chips({ time }: { time: number }) {
  const enter = clamp((time - 3.8) / 0.35, 0, 1);
  const leave = 1 - clamp((time - 5.7) / 0.35, 0, 1);
  const opacity = Math.min(enter, leave);

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 78,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {["Where is my order?", "What is your return policy?"].map((label, i) => {
        const a = clamp((time - 3.8 - i * 0.12) / 0.3, 0, 1);
        const active = i === 1 && time >= 4.3 && time < 5.1;

        return (
          <div
            key={label}
            style={{
              opacity: opacity * a,
              transform: `translateY(${(1 - a) * 8}px) scale(${
                active ? 1.04 : 1
              })`,
              background: "rgba(30,30,44,0.78)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#fff",
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 600,
              padding: "9px 16px",
              borderRadius: 999,
              boxShadow: active
                ? "0 0 0 2px rgba(255,255,255,0.65),0 8px 22px rgba(20,20,40,0.18)"
                : "0 6px 18px rgba(20,20,40,0.14)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

const PANEL_FULL_H = 380;

function bubbleAnim(v: number) {
  return {
    opacity: v,
    transform: `translateY(${(1 - v) * 10}px)`,
  };
}

function ChatPanel({ time }: { time: number }) {
  const open = Easing.easeOutCubic(clamp((time - 5.7) / 0.85, 0, 1));
  const closing = Easing.easeInCubic(clamp((time - 20.7) / 0.75, 0, 1));
  const hf = open * (1 - closing);

  if (hf <= 0) return null;

  const height = PANEL_FULL_H * hf;
  const panelOpacity = clamp((time - 5.75) / 0.28, 0, 1);
  const contentOpacity = 1 - clamp((time - 20.7) / 0.25, 0, 1);

  const c0 = ac0(time);
  const c1 = ac1(time);

  const greeting = clamp((time - 6.7) / 0.4, 0, 1);
  const userBubble = clamp((time - 8.0) / 0.4, 0, 1);
  const typing = time >= 9.6 && time < 10.7;
  const replyEnter = clamp((time - 10.7) / 0.35, 0, 1);

  const reply =
    "We offer 30-day free returns — just email support to start. Items must be in original packaging.";

  const replyChars = Math.floor(
    clamp((time - 10.7) / 2.0, 0, 1) * reply.length,
  );

  const showCaret =
    time >= 10.7 && time < 13.0 && Math.floor(time * 4) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 78,
        width: WID_W,
        height,
        borderRadius: 22,
        overflow: "hidden",
        opacity: panelOpacity,
        boxShadow: "0 22px 56px rgba(25,22,45,0.20)",
        border: "1px solid rgba(20,20,40,0.06)",
        background:
          "linear-gradient(180deg,#eff4ff 0%,#eef1f6 55%,#e9edf4 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: WID_W,
          height: PANEL_FULL_H,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "13px 14px",
            opacity: contentOpacity,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#93c5fd,#2563eb)",
              color: "#fff",
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            N
          </div>

          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 15,
              color: "#26262c",
            }}
          >
            Natasha
          </span>

          <CheckBadge />

          <span style={{ flex: 1 }} />

          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "rgba(255,255,255,0.62)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(20,20,40,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrashIcon />
          </div>

          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "rgba(255,255,255,0.62)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(20,20,40,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon size={12} />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: "2px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflow: "hidden",
            opacity: contentOpacity,
          }}
        >
          <div
            style={{
              ...bubbleAnim(greeting),
              alignSelf: "flex-start",
              maxWidth: 275,
              background: "#fff",
              color: "#33333a",
              fontFamily: FONT,
              fontSize: 14,
              lineHeight: 1.45,
              padding: "10px 13px",
              borderRadius: "5px 15px 15px 15px",
              boxShadow: "0 2px 8px rgba(20,20,40,0.06)",
            }}
          >
            Hey there! I&apos;m your shopping assistant. How can I help you
            today?
          </div>

          {userBubble > 0 && (
            <div
              style={{
                ...bubbleAnim(userBubble),
                alignSelf: "flex-end",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 3,
              }}
            >
              <div
                style={{
                  position: "relative",
                  maxWidth: 252,
                  overflow: "hidden",
                  background: `linear-gradient(135deg,rgba(${c0},0.90),rgba(${c1},0.72))`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.36)",
                  boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.52),0 8px 22px rgba(${c0},0.36)`,
                  color: "#fff",
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  padding: "10px 14px",
                  borderRadius: "15px 15px 5px 15px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.04) 45%,transparent 60%)",
                    borderRadius: "inherit",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "42%",
                    background:
                      "linear-gradient(180deg,rgba(255,255,255,0.20) 0%,transparent 100%)",
                    borderRadius: "15px 15px 0 0",
                    pointerEvents: "none",
                  }}
                />

                <span style={{ position: "relative", zIndex: 1 }}>
                  What is your return policy?
                </span>
              </div>

              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 10.5,
                  color: "#a8a8b0",
                }}
              >
                3:21 PM
              </span>
            </div>
          )}

          {(typing || replyEnter > 0) && (
            <div
              style={{
                display: "flex",
                gap: 7,
                alignItems: "baseline",
                opacity: typing ? 1 : replyEnter,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#5b5b64",
                }}
              >
                Natasha
              </span>

              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 10.5,
                  color: "#a8a8b0",
                }}
              >
                3:21 PM
              </span>
            </div>
          )}

          {typing && (
            <div
              style={{
                alignSelf: "flex-start",
                background: "#fff",
                padding: "11px 14px",
                borderRadius: "5px 15px 15px 15px",
                boxShadow: "0 2px 8px rgba(20,20,40,0.06)",
                display: "flex",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => {
                const d =
                  0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * 7 - i * 0.9));

                return (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#bcbcc6",
                      opacity: d,
                      transform: `translateY(${-d * 2}px)`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {!typing && replyEnter > 0 && (
            <div
              style={{
                ...bubbleAnim(replyEnter),
                maxWidth: 300,
                alignSelf: "flex-start",
                background: "#fff",
                color: "#33333a",
                fontFamily: FONT,
                fontSize: 14,
                lineHeight: 1.5,
                padding: "10px 13px",
                borderRadius: "5px 15px 15px 15px",
                boxShadow: "0 2px 8px rgba(20,20,40,0.06)",
              }}
            >
              {reply.slice(0, replyChars)}
              {showCaret ? <span style={{ color: acRgb(time) }}>|</span> : null}
            </div>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "8px 0 12px",
            fontFamily: FONT,
            fontSize: 11,
            color: "#a4a4ad",
            letterSpacing: "0.02em",
            opacity: contentOpacity,
          }}
        >
          Powered by <strong style={{ color: "#6a6a73" }}>helloii</strong>
        </div>
      </div>
    </div>
  );
}

function SwatchCallout({ time }: { time: number }) {
  const enter = clamp((time - 12.5) / 0.4, 0, 1);
  const leave = 1 - clamp((time - 19.8) / 0.4, 0, 1);
  const opacity = Math.min(enter, leave);

  if (opacity <= 0) return null;

  const active = activeSwatchIdx(time);
  const eE = Easing.easeOutBack(enter);

  return (
    <div
      style={{
        position: "absolute",
        left: W / 2,
        top: H - WID_BOTTOM - 64 - 78 - PANEL_FULL_H - 20 - 120,
        transform: `translateX(-50%) translateY(${(1 - eE) * 14}px)`,
        width: 230,
        opacity,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 18,
        padding: "14px 17px",
        boxShadow: "0 18px 44px rgba(25,22,45,0.14)",
        border: "1px solid rgba(20,20,40,0.06)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 5,
        }}
      >
        <Sparkle color={acRgb(time)} size={14} />

        <span
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 14,
            color: "#26262c",
          }}
        >
          Fully customizable
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT,
          fontSize: 12,
          color: "#83848f",
          lineHeight: 1.4,
          marginBottom: 12,
        }}
      >
        Match your brand in one click.
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {SWATCH_HEX.map((color, i) => (
          <div
            key={color}
            style={{
              width: 27,
              height: 27,
              borderRadius: "50%",
              background: color,
              flexShrink: 0,
              transform: i === active ? "scale(1.18)" : "scale(1)",
              boxShadow:
                i === active ? `0 0 0 2.5px #fff,0 0 0 5px ${color}` : "none",
              transition: "transform 0.3s,box-shadow 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCards({ time }: { time: number }) {
  const enter = clamp((time - 15.8) / 0.55, 0, 1);
  const leave = 1 - clamp((time - 20.0) / 0.4, 0, 1);
  const opacity = Math.min(enter, leave);

  if (opacity <= 0) return null;

  const panelTop = H - WID_BOTTOM - 64 - 14 - PANEL_FULL_H;

  const cards = [
    {
      label: "AI replies",
      detail: "Instant answers",
      side: "left",
      topOff: 0,
      color: "#2563eb",
      icon: <AICardIcon size={14} />,
    },
    {
      label: "Shopify ready",
      detail: "Store-aware support",
      side: "right",
      topOff: 100,
      color: "#95BF47",
      icon: <ShopifyCardIcon size={14} />,
    },
    {
      label: "24/7 support",
      detail: "Always online",
      side: "left",
      topOff: 200,
      color: "#16a34a",
      icon: <ClockCardIcon size={14} />,
    },
  ];

  const cardW = 148;

  return (
    <>
      {cards.map((card, i) => {
        const a = clamp((time - 15.8 - i * 0.16) / 0.45, 0, 1);
        const e = Easing.easeOutBack(a);
        const fromLeft = card.side === "left";
        const slideX = fromLeft ? (1 - e) * -60 : (1 - e) * 60;
        const posStyle = fromLeft ? { left: 12 } : { right: 12 };

        return (
          <div
            key={card.label}
            style={{
              position: "absolute",
              ...posStyle,
              top: panelTop + 28 + card.topOff,
              width: cardW,
              opacity: opacity * a,
              transform: `translateX(${slideX}px) scale(${0.92 + e * 0.08})`,
              padding: "13px 13px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(20,20,40,0.07)",
              boxShadow: "0 14px 38px rgba(20,20,40,0.12)",
              zIndex: 45,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: card.color,
                marginBottom: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {card.icon}
            </div>

            <div
              style={{
                fontFamily: FONT,
                fontSize: 13.5,
                fontWeight: 800,
                color: "#20202a",
                marginBottom: 3,
              }}
            >
              {card.label}
            </div>

            <div
              style={{
                fontFamily: FONT,
                fontSize: 11.5,
                color: "#777884",
              }}
            >
              {card.detail}
            </div>
          </div>
        );
      })}
    </>
  );
}

function ChatbotScene() {
  const time = useTime();
  const widgetFade = 1;

  return (
    <>
      <OrbGlow time={time} fadeOut={widgetFade} />

      <div
        style={{
          position: "absolute",
          right: WID_RIGHT,
          bottom: WID_BOTTOM,
          width: WID_W,
          height: 1,
          opacity: widgetFade,
        }}
      >
        <ChatPanel time={time} />
        <Chips time={time} />
        <GlassyMorph time={time} />
      </div>

      <div style={{ opacity: widgetFade }}>
        <SwatchCallout time={time} />
        <FeatureCards time={time} />
      </div>

      <Ripple
        time={time}
        t0={2.78}
        x={ORB_X}
        y={ORB_Y}
        color={`rgba(${ac0(time)},0.7)`}
      />

      <Ripple time={time} t0={5.65} x={SEND_X} y={ORB_Y} color={acRgb(time)} />

      <Cursor time={time} />
    </>
  );
}

export function ChatbotAnimation() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Stage
        width={W}
        height={H}
        duration={DUR}
        background="transparent"
        autoplay
        loop
      >
        <ChatbotScene />
      </Stage>
    </div>
  );
}
