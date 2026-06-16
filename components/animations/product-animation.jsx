"use client";

import React from "react";

const Easing = {
  linear: (t) => t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t) => t * t * t,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function interpolate(input, output, ease = Easing.linear) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];

    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const local = (t - input[i]) / (input[i + 1] - input[i]);
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }

    return output[output.length - 1];
  };
}

const TimelineContext = React.createContext({
  time: 0,
  duration: 16,
  playing: false,
});

const useTime = () => React.useContext(TimelineContext).time;

function Stage({
  width = 1920,
  height = 1080,
  duration = 16,
  background = "#f5f7fb",
  loop = true,
  autoplay = true,
  persistKey = "helloii-product-animation",
  showControls = false,
  children,
}) {
  const [time, setTime] = React.useState(0);
  const [playing, setPlaying] = React.useState(autoplay);
  const [scale, setScale] = React.useState(1);

  const rootRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastRef = React.useRef(null);

  React.useEffect(() => {
    const measure = () => {
      // Use window dimensions directly — avoids ResizeObserver feedback loops
      // from the canvas's own transforms affecting clientHeight measurements.
      // Width-fill: scale so canvas fills viewport width; height overflow clips.
      const nextScale = window.innerWidth / width;
      setScale(Math.max(0.05, nextScale));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [width, height, showControls]);

  React.useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      return;
    }

    const frame = (timestamp) => {
      if (lastRef.current == null) lastRef.current = timestamp;

      const delta = (timestamp - lastRef.current) / 1000;
      lastRef.current = timestamp;

      setTime((current) => {
        let next = current + delta;

        if (next >= duration) {
          if (loop) next = next % duration;
          else {
            next = duration;
            setPlaying(false);
          }
        }

        return next;
      });

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [playing, duration, loop]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "transparent",
        overflow: "hidden",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width,
            height,
            background,
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <TimelineContext.Provider value={{ time, duration, playing }}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>

      {showControls && (
        <PlaybackBar
          time={time}
          duration={duration}
          playing={playing}
          onPlayPause={() => setPlaying((value) => !value)}
          onReset={() => setTime(0)}
          onSeek={setTime}
        />
      )}
    </div>
  );
}

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const getTime = React.useCallback(
    (event) => {
      const rect = trackRef.current.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      return x * duration;
    },
    [duration],
  );

  React.useEffect(() => {
    if (!dragging) return;

    const move = (event) => onSeek(getTime(event));
    const up = () => setDragging(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging, getTime, onSeek]);

  const pct = duration ? (time / duration) * 100 : 0;

  const format = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    const centiseconds = Math.floor((value * 100) % 100);

    return `${minutes}:${String(seconds).padStart(2, "0")}.${String(
      centiseconds,
    ).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        width: "min(720px, calc(100% - 32px))",
        height: 44,
        marginBottom: 8,
        borderRadius: 12,
        background: "rgba(20,20,28,0.92)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 14px",
        flexShrink: 0,
      }}
    >
      <button onClick={onReset} style={controlButtonStyle}>
        0
      </button>

      <button onClick={onPlayPause} style={controlButtonStyle}>
        {playing ? "Ⅱ" : "▶"}
      </button>

      <div style={{ width: 64, fontSize: 12, fontFamily: "monospace" }}>
        {format(time)}
      </div>

      <div
        ref={trackRef}
        onMouseDown={(event) => {
          setDragging(true);
          onSeek(getTime(event));
        }}
        style={{
          flex: 1,
          height: 20,
          position: "relative",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 99,
            background: "rgba(255,255,255,0.15)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 8,
            left: 0,
            width: `${pct}%`,
            height: 4,
            borderRadius: 99,
            background: "#ee486c",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 4,
            left: `${pct}%`,
            width: 12,
            height: 12,
            marginLeft: -6,
            borderRadius: 99,
            background: "#fff",
          }}
        />
      </div>

      <div style={{ width: 64, fontSize: 12, fontFamily: "monospace" }}>
        {format(duration)}
      </div>
    </div>
  );
}

const controlButtonStyle = {
  width: 30,
  height: 30,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

const PAL_CORAL = [
  [238, 72, 108],
  [255, 142, 176],
];

const PAL_BLUE = [
  [46, 120, 238],
  [122, 170, 255],
];

const rgb = (value) => `rgb(${value[0]}, ${value[1]}, ${value[2]})`;

function mixPalette(a, b, t) {
  return a.map((slot, i) =>
    slot.map((channel, j) => Math.round(channel + (b[i][j] - channel) * t)),
  );
}

function accentAt(time) {
  if (time < 9.8) return PAL_CORAL;
  if (time < 10.5) {
    return mixPalette(
      PAL_CORAL,
      PAL_BLUE,
      Easing.easeInOutCubic((time - 9.8) / 0.7),
    );
  }
  if (time < 11.3) return PAL_BLUE;
  if (time < 12.1) {
    return mixPalette(
      PAL_BLUE,
      PAL_CORAL,
      Easing.easeInOutCubic((time - 11.3) / 0.8),
    );
  }
  return PAL_CORAL;
}

function accentSolid(time) {
  return rgb(accentAt(time)[0]);
}

function accentGradient(time) {
  const palette = accentAt(time);
  return `linear-gradient(135deg, ${rgb(palette[0])}, ${rgb(palette[1])})`;
}

function SendIcon({ color = "#ee486c", size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.2 11.3 20 4.2c.7-.3 1.4.4 1.1 1.1l-7.1 16.8c-.3.7-1.3.6-1.5-.1l-1.9-6.1a1 1 0 0 0-.6-.6l-6.1-1.9c-.7-.2-.8-1.2-.1-1.5Z"
        fill={color}
      />
    </svg>
  );
}

function CloseIcon({ color = "#8c8c96", size = 14 }) {
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

function CheckBadge() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
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

function Sparkle({ color = "#ee486c", size = 16 }) {
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
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
      }}
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

function AnimatedMesh({ time }) {
  const blobs = [
    {
      x: 200 + Math.sin(time * 0.31) * 70,
      y: 150 + Math.cos(time * 0.25) * 50,
      size: 520,
      color: "rgba(238,72,108,0.35)",
    },
    {
      x: 980 + Math.sin(time * 0.2) * 80,
      y: 120 + Math.cos(time * 0.29) * 60,
      size: 620,
      color: "rgba(46,120,238,0.28)",
    },
    {
      x: 1220 + Math.cos(time * 0.18) * 100,
      y: 620 + Math.sin(time * 0.22) * 70,
      size: 680,
      color: "rgba(255,201,64,0.28)",
    },
    {
      x: 480 + Math.cos(time * 0.21) * 70,
      y: 720 + Math.sin(time * 0.19) * 70,
      size: 560,
      color: "rgba(139,92,246,0.22)",
    },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {blobs.map((blob, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            background: blob.color,
            filter: "blur(90px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 100% at 80% 0%, rgba(255,255,255,0.45), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.82), rgba(246,248,252,0.82))",
        }}
      />
    </div>
  );
}

function HeroCopy({ time }) {
  const out = 1 - clamp((time - 12.1) / 0.5, 0, 1);
  const a = clamp((time - 0.35) / 0.7, 0, 1) * out;
  const e = Easing.easeOutCubic(a);

  return (
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 250,
        width: 660,
        opacity: a,
        transform: `translateY(${(1 - e) * 24}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(20,20,40,0.08)",
          boxShadow: "0 12px 36px rgba(20,20,40,0.08)",
          marginBottom: 22,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 14,
          color: "#ee486c",
        }}
      >
        <Sparkle color="#ee486c" size={15} />
        Customer support chat assistant for you shopify store
      </div>

      <div
        style={{
          fontFamily: FONT,
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 0.98,
          letterSpacing: "-0.055em",
          color: "#181820",
        }}
      >
        Turn store visitors into supported customers.
      </div>

      <div
        style={{
          marginTop: 24,
          maxWidth: 560,
          fontFamily: FONT,
          fontSize: 23,
          lineHeight: 1.42,
          color: "#62636d",
        }}
      >
        A glassy AI chatbot that answers product questions, handles return
        queries, and matches your brand.
      </div>
    </div>
  );
}

function Attention({ time }) {
  const opacity =
    clamp((time - 1.0) / 0.4, 0, 1) * (1 - clamp((time - 2.9) / 0.35, 0, 1));
  if (opacity <= 0) return null;

  const pulse = (time % 1.4) / 1.4;
  const r = 38 + pulse * 34;
  const x = 1466;
  const y = 866;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - r,
          top: y - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          border: "2px solid rgba(238,72,108,0.45)",
          opacity: (1 - pulse) * opacity,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: x,
          top: y - 82,
          transform: "translateX(-50%)",
          opacity,
          padding: "9px 15px",
          borderRadius: 13,
          background: "rgba(24,24,32,0.92)",
          color: "#fff",
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 600,
          boxShadow: "0 8px 24px rgba(20,20,40,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        Need help? Let's chat
      </div>
    </>
  );
}

function Cursor({ time }) {
  const opacity =
    clamp((time - 1.65) / 0.25, 0, 1) * (1 - clamp((time - 6.15) / 0.25, 0, 1));
  if (opacity <= 0) return null;

  const x = interpolate(
    [1.8, 2.95, 5.65, 6.0],
    [1080, 1466, 1466, 1428],
    [Easing.easeInOutCubic, Easing.linear, Easing.easeInOutCubic],
  )(time);

  const y = interpolate(
    [1.8, 2.95, 5.65, 6.0],
    [560, 866, 866, 866],
    [Easing.easeInOutCubic, Easing.linear, Easing.easeInOutCubic],
  )(time);

  const press =
    time > 2.88 && time < 3.08
      ? 1 - Math.abs((time - 2.98) / 0.1)
      : time > 5.9 && time < 6.1
        ? 1 - Math.abs((time - 6.0) / 0.1)
        : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 90,
        opacity,
        transform: `scale(${1 - press * 0.16}) rotate(${press * -5}deg)`,
      }}
    >
      <CursorIcon />
    </div>
  );
}

function Ripple({ time, t0, x, y, color }) {
  const p = clamp((time - t0) / 0.55, 0, 1);
  if (p <= 0 || p >= 1) return null;

  const r = 14 + p * 46;

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
        opacity: (1 - p) * 0.65,
        zIndex: 80,
      }}
    />
  );
}

function GlassyMorph({ time }) {
  const morph = Easing.easeInOutCubic(clamp((time - 3.0) / 0.95, 0, 1));
  const width = 68 + (444 - 68) * morph;
  const white = clamp((time - 3.45) / 0.55, 0, 1);
  const controls = clamp((time - 3.9) / 0.4, 0, 1);
  const solid = accentSolid(time);

  const q = "What is your return policy?";
  let shownText = "Request";
  let textColor = "#9ca0aa";

  if (time >= 4.6) {
    const n = Math.floor(clamp((time - 4.6) / 0.9, 0, 1) * q.length);
    shownText = q.slice(0, n);
    textColor = "#25252d";
  }

  const caret = time >= 4.6 && time < 6.0 && Math.floor(time * 3) % 2 === 0;
  const sendPulse =
    time >= 5.85 && time < 6.15 ? 1 - Math.abs((time - 6.0) / 0.15) : 0;

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        width,
        height: 68,
        borderRadius: 34,
        background: "#fff",
        overflow: "hidden",
        boxShadow: `0 ${10 + morph * 20}px ${28 + morph * 34}px rgba(25,22,45,${
          0.14 + morph * 0.05
        })`,
        border: "1px solid rgba(20,20,40,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - white,
          background: `radial-gradient(140% 140% at 30% 24%, rgba(255,255,255,0.95), rgba(255,255,255,0.18) 38%, rgba(255,255,255,0) 56%), ${accentGradient(
            time,
          )}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - white,
          boxShadow:
            "inset 0 2px 8px rgba(255,255,255,0.7), inset 0 -12px 22px rgba(30,20,60,0.24)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 26,
          top: 0,
          height: 68,
          display: "flex",
          alignItems: "center",
          opacity: controls,
          fontFamily: FONT,
          fontSize: 16,
          color: textColor,
          whiteSpace: "pre",
        }}
      >
        {shownText}
        {caret ? <span style={{ color: solid, marginLeft: 1 }}>|</span> : null}
      </div>

      <div
        style={{
          position: "absolute",
          right: 16,
          top: 0,
          height: 68,
          display: "flex",
          alignItems: "center",
          gap: 9,
          opacity: controls,
        }}
      >
        <div
          style={{
            transform: `scale(${1 + sendPulse * 0.28})`,
            display: "flex",
          }}
        >
          <SendIcon color={solid} />
        </div>

        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#eef0f3",
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

function Chips({ time }) {
  const enter = clamp((time - 4.0) / 0.4, 0, 1);
  const leave = 1 - clamp((time - 6.0) / 0.4, 0, 1);
  const opacity = Math.min(enter, leave);

  if (opacity <= 0) return null;

  const labels = ["Where is my order?", "What is your return policy?"];

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 86,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {labels.map((label, index) => {
        const a = clamp((time - 4.0 - index * 0.12) / 0.35, 0, 1);
        const active = index === 1 && time >= 4.6 && time < 5.4;

        return (
          <div
            key={label}
            style={{
              opacity: opacity * a,
              transform: `translateY(${(1 - a) * 10}px) scale(${active ? 1.04 : 1})`,
              background: "rgba(34,34,48,0.76)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#fff",
              fontFamily: FONT,
              fontSize: 14.5,
              fontWeight: 600,
              padding: "10px 16px",
              borderRadius: 999,
              boxShadow: active
                ? "0 0 0 2px rgba(255,255,255,0.72), 0 10px 28px rgba(20,20,40,0.18)"
                : "0 8px 20px rgba(20,20,40,0.16)",
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

function bubbleAnimation(value) {
  return {
    opacity: value,
    transform: `translateY(${(1 - value) * 12}px)`,
  };
}

function ChatPanel({ time }) {
  const open = Easing.easeOutCubic(clamp((time - 6.0) / 0.8, 0, 1));
  if (open <= 0) return null;

  const fullHeight = 524;
  const height = fullHeight * open;
  const solid = accentSolid(time);
  const gradient = accentGradient(time);

  const greeting = clamp((time - 7.0) / 0.4, 0, 1);
  const userBubble = clamp((time - 7.7) / 0.4, 0, 1);
  const typing = time >= 8.3 && time < 9.05;
  const replyEnter = clamp((time - 9.05) / 0.35, 0, 1);

  const reply =
    "We offer 30-day free returns. Items must be unused and in their original packaging. I can also help you start the return now.";

  const replyChars = Math.floor(
    clamp((time - 9.05) / 1.55, 0, 1) * reply.length,
  );
  const streamedReply = reply.slice(0, replyChars);
  const showCaret =
    time >= 9.05 && time < 10.6 && Math.floor(time * 4) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 86,
        width: 404,
        height,
        borderRadius: 24,
        overflow: "hidden",
        opacity: clamp((time - 6.05) / 0.3, 0, 1),
        boxShadow: "0 28px 70px rgba(25,22,45,0.23)",
        border: "1px solid rgba(20,20,40,0.06)",
        background:
          "linear-gradient(180deg, #f6f0f4 0%, #eef1f6 48%, #e9edf4 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 404,
          height: fullHeight,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #caa3b0, #7e5f6d)",
              color: "#fff",
              fontFamily: FONT,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            N
          </div>

          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 16,
              color: "#26262c",
            }}
          >
            Natasha
          </span>

          <CheckBadge />

          <span style={{ flex: 1 }} />

          {[0, 1].map((item) => (
            <div
              key={item}
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "rgba(255,255,255,0.72)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloseIcon size={13} />
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            padding: "4px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              ...bubbleAnimation(greeting),
              alignSelf: "flex-start",
              maxWidth: 300,
              background: "#fff",
              color: "#33333a",
              fontFamily: FONT,
              fontSize: 14.5,
              lineHeight: 1.45,
              padding: "11px 14px",
              borderRadius: "5px 16px 16px 16px",
              boxShadow: "0 2px 8px rgba(20,20,40,0.06)",
            }}
          >
            Hey there! I'm your shopping assistant. How can I help you today?
          </div>

          {userBubble > 0 && (
            <div
              style={{
                ...bubbleAnimation(userBubble),
                alignSelf: "flex-end",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 3,
              }}
            >
              <div
                style={{
                  maxWidth: 260,
                  background: gradient,
                  color: "#fff",
                  fontFamily: FONT,
                  fontSize: 14.5,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  padding: "11px 16px",
                  borderRadius: "16px 16px 5px 16px",
                  boxShadow: `0 8px 18px ${solid}40`,
                }}
              >
                What is your return policy?
              </div>
              <span
                style={{ fontFamily: FONT, fontSize: 11, color: "#a8a8b0" }}
              >
                3:21 PM
              </span>
            </div>
          )}

          {(typing || replyEnter > 0) && (
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "baseline",
                opacity: typing ? 1 : replyEnter,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#5b5b64",
                }}
              >
                Natasha
              </span>
              <span
                style={{ fontFamily: FONT, fontSize: 11, color: "#a8a8b0" }}
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
                padding: "13px 16px",
                borderRadius: "5px 16px 16px 16px",
                boxShadow: "0 2px 8px rgba(20,20,40,0.06)",
                display: "flex",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => {
                const dot =
                  0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * 7 - i * 0.9));

                return (
                  <div
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#bcbcc6",
                      opacity: dot,
                      transform: `translateY(${-dot * 2}px)`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {!typing && replyEnter > 0 && (
            <div
              style={{
                ...bubbleAnimation(replyEnter),
                maxWidth: 320,
                alignSelf: "flex-start",
                background: "#fff",
                color: "#33333a",
                fontFamily: FONT,
                fontSize: 14.5,
                lineHeight: 1.5,
                padding: "12px 15px",
                borderRadius: "5px 16px 16px 16px",
                boxShadow: "0 2px 8px rgba(20,20,40,0.06)",
              }}
            >
              {streamedReply}
              {showCaret ? <span style={{ color: solid }}>|</span> : null}
            </div>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "10px 0 14px",
            fontFamily: FONT,
            fontSize: 11.5,
            color: "#a4a4ad",
            letterSpacing: "0.02em",
          }}
        >
          Powered by <strong style={{ color: "#6a6a73" }}>helloii</strong>
        </div>
      </div>
    </div>
  );
}

function SwatchCallout({ time }) {
  const enter = clamp((time - 9.5) / 0.4, 0, 1);
  const leave = 1 - clamp((time - 12.1) / 0.35, 0, 1);
  const opacity = Math.min(enter, leave);

  if (opacity <= 0) return null;

  const active = time < 10.05 ? 0 : time < 11.4 ? 1 : 0;
  const colors = ["#ee486c", "#2e78ee", "#22a06b", "#8b5cf6"];

  return (
    <div
      style={{
        position: "absolute",
        right: 472,
        bottom: 360,
        width: 242,
        opacity,
        transform: `translateY(${(1 - enter) * 12}px)`,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 18,
        padding: "17px 19px",
        boxShadow: "0 20px 48px rgba(25,22,45,0.16)",
        border: "1px solid rgba(20,20,40,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 5,
        }}
      >
        <Sparkle color={accentSolid(time)} size={15} />
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 15,
            color: "#26262c",
          }}
        >
          Fully customizable
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT,
          fontSize: 12.5,
          color: "#83848f",
          lineHeight: 1.4,
          marginBottom: 14,
        }}
      >
        Match your chatbot to your brand in one click.
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {colors.map((color, index) => (
          <div
            key={color}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: color,
              transform: index === active ? "scale(1.08)" : "scale(1)",
              boxShadow:
                index === active
                  ? `0 0 0 3px #fff, 0 0 0 5px ${color}`
                  : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCards({ time }) {
  const enter = clamp((time - 11.1) / 0.55, 0, 1);
  const leave = 1 - clamp((time - 13.4) / 0.45, 0, 1);
  const opacity = Math.min(enter, leave);

  if (opacity <= 0) return null;

  const cards = [
    {
      label: "AI replies",
      detail: "Instant answers",
      x: -210,
      y: -130,
      color: "#ee486c",
    },
    {
      label: "Shopify ready",
      detail: "Store-aware support",
      x: 365,
      y: -95,
      color: "#2e78ee",
    },
    {
      label: "24/7 support",
      detail: "Always online",
      x: -190,
      y: 360,
      color: "#8b5cf6",
    },
  ];

  return (
    <>
      {cards.map((card, index) => {
        const a = clamp((time - 11.1 - index * 0.12) / 0.45, 0, 1);
        const e = Easing.easeOutBack(a);

        return (
          <div
            key={card.label}
            style={{
              position: "absolute",
              right: 70 - card.x * e,
              bottom: 280 + card.y * e,
              width: 190,
              opacity: opacity * a,
              transform: `translateY(${(1 - a) * 20}px) scale(${0.92 + e * 0.08})`,
              padding: "15px 16px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(20,20,40,0.07)",
              boxShadow: "0 20px 50px rgba(20,20,40,0.13)",
              zIndex: 30,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 12,
                background: card.color,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkle color="#fff" size={14} />
            </div>

            <div
              style={{
                fontFamily: FONT,
                fontSize: 15,
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
                fontSize: 12.5,
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

function ShopifyCard({ time }) {
  const enter = clamp((time - 12.0) / 0.55, 0, 1);
  const leave = 1 - clamp((time - 13.7) / 0.4, 0, 1);
  const opacity = Math.min(enter, leave);

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        right: 492,
        bottom: 122,
        width: 274,
        opacity,
        transform: `translateY(${(1 - Easing.easeOutCubic(enter)) * 16}px)`,
        padding: 18,
        borderRadius: 22,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(20,20,40,0.07)",
        boxShadow: "0 22px 54px rgba(20,20,40,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 13,
            background: "#95bf47",
            color: "#fff",
            fontFamily: FONT,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          S
        </div>

        <div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 850,
              fontSize: 15,
              color: "#20202a",
            }}
          >
            Shopify connected
          </div>

          <div
            style={{
              fontFamily: FONT,
              fontSize: 12.5,
              color: "#777884",
              marginTop: 2,
            }}
          >
            Products, policies and FAQs synced
          </div>
        </div>
      </div>

      <div
        style={{
          height: 8,
          borderRadius: 99,
          background: "#edf1e6",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${clamp((time - 12.2) / 0.9, 0, 1) * 100}%`,
            height: "100%",
            borderRadius: 99,
            background: "#95bf47",
          }}
        />
      </div>
    </div>
  );
}

function FinalCTA({ time }) {
  const enter = clamp((time - 13.65) / 0.7, 0, 1);
  if (enter <= 0) return null;

  const e = Easing.easeOutCubic(enter);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: enter,
        transform: `translateY(${(1 - e) * 24}px)`,
        zIndex: 100,
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: 760,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            color: "#ee486c",
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 850,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <Sparkle color="#ee486c" size={16} />
          helloii
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.055em",
            color: "#181820",
          }}
        >
          Customer support powered by AI.
        </div>

        <div
          style={{
            margin: "22px auto 32px",
            width: 540,
            fontFamily: FONT,
            fontSize: 22,
            lineHeight: 1.42,
            color: "#62636d",
          }}
        >
          Customizable, on-brand and always ready to help your customers.
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px 24px",
            borderRadius: 999,
            background: accentGradient(time),
            color: "#fff",
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 850,
            boxShadow: "0 16px 42px rgba(238,72,108,0.28)",
          }}
        >
          Book a demo →
        </div>
      </div>
    </div>
  );
}

function ChatbotScene() {
  const time = useTime();

  let camScale = 1;

  if (time < 3) camScale = 1;
  else if (time < 4) camScale = 1 + 0.12 * Easing.easeInOutCubic(time - 3);
  else if (time < 12.5) camScale = 1.12;
  else if (time < 13.7)
    camScale = 1.12 - 0.12 * Easing.easeInOutCubic((time - 12.5) / 1.2);
  else camScale = 1;

  const widgetOpacity = 1 - clamp((time - 13.3) / 0.45, 0, 1);
  const widgetScale = 1 - clamp((time - 13.2) / 0.5, 0, 1) * 0.08;

  return (
    <>
      <AnimatedMesh time={time} />
      <HeroCopy time={time} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${camScale})`,
          transformOrigin: "1270px 600px",
        }}
      >
        <Attention time={time} />

        <div
          style={{
            position: "absolute",
            right: 420,
            bottom: 180,
            width: 444,
            height: 1,
            opacity: widgetOpacity,
            transform: `scale(${widgetScale})`,
            transformOrigin: "right bottom",
          }}
        >
          <ChatPanel time={time} />
          <Chips time={time} />
          <GlassyMorph time={time} />
          <SwatchCallout time={time} />
          <FeatureCards time={time} />
          <ShopifyCard time={time} />
        </div>

        <Ripple
          time={time}
          t0={2.98}
          x={1466}
          y={866}
          color="rgba(238,72,108,0.7)"
        />

        <Ripple
          time={time}
          t0={6.0}
          x={1428}
          y={866}
          color={accentSolid(time)}
        />

        <Cursor time={time} />
      </div>

      <FinalCTA time={time} />
    </>
  );
}

export default function ChatbotAnimation() {
  return (
    <div className="h-full w-full">
      <Stage
        width={1920}
        height={1080}
        duration={16}
        persistKey="chatbotanim"
        background="#f5f7fb"
        autoplay
        loop
        showControls={false}
      >
        <ChatbotScene />
      </Stage>
    </div>
  );
}
