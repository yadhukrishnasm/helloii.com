import { ChatTurn } from "../sections/chatbot-animation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LiquidGlassBubble } from "./liquid-glass";

export default function ChatPreview({
  turns,
  accent,
  start = true,
  controlledTurn,
}: {
  turns: ChatTurn[];
  accent: string;
  // The whole phase chain is gated on this — nothing types/sends/replies
  // until the parent says it's actually in view, so a chat someone
  // scrolls down to isn't already mid-conversation.
  start?: boolean;
  // When provided, the chat stops driving itself (no auto-advance, no
  // looping) and instead asks exactly this turn, staying on its answer
  // until the parent moves to a new index — used to let scroll position
  // control pacing instead of an internal timer.
  controlledTurn?: number;
}) {
  const isControlled = controlledTurn !== undefined;
  const [activeTurn, setActiveTurn] = useState(0);
  const [completedTurns, setCompletedTurns] = useState<number[]>([]);
  const [phase, setPhase] = useState<
    "input" | "sending" | "user" | "typing" | "answer" | "clearing"
  >("input");
  const [typedText, setTypedText] = useState("");

  const turn = turns[activeTurn];
  const accentLight = lightenHex(accent, 75);
  const isLastTurn = activeTurn === turns.length - 1;

  // Controlled mode: whenever the parent's scroll-driven index changes,
  // jump to that turn and replay its question/answer from scratch. Turns
  // before it are marked complete (transcript so far); turns at or after
  // it are cleared, so scrolling back up un-asks later questions instead
  // of leaving stale answers behind.
  useEffect(() => {
    if (!isControlled || controlledTurn === activeTurn) return;

    setCompletedTurns((prev) =>
      prev
        .filter((i) => i < controlledTurn)
        .concat(
          Array.from({ length: controlledTurn }, (_, i) => i).filter(
            (i) => !prev.includes(i),
          ),
        ),
    );
    setActiveTurn(controlledTurn);
    setPhase("input");
    setTypedText("");
  }, [controlledTurn, isControlled, activeTurn]);

  useEffect(() => {
    if (!start || phase !== "input") return;

    setTypedText("");

    let index = 0;
    const question = turn.question;

    const typingTimer = window.setInterval(() => {
      index += 1;
      setTypedText(question.slice(0, index));

      if (index >= question.length) {
        window.clearInterval(typingTimer);

        window.setTimeout(() => {
          setPhase("sending");
        }, 520);
      }
    }, 30);

    return () => window.clearInterval(typingTimer);
  }, [phase, turn.question, start]);

  useEffect(() => {
    if (phase !== "sending") return;

    const timer = window.setTimeout(() => {
      setPhase("user");
    }, 360);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "user") return;

    const timer = window.setTimeout(() => {
      setPhase("typing");
    }, 760);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;

    const timer = window.setTimeout(() => {
      setPhase("answer");
    }, 920);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "answer") return;

    // Controlled mode: stay on this answer — the parent (scroll position)
    // decides when to move to the next question, not a timer.
    if (isControlled) {
      setCompletedTurns((prev) =>
        prev.includes(activeTurn) ? prev : [...prev, activeTurn],
      );
      return;
    }

    const timer = window.setTimeout(
      () => {
        setCompletedTurns((prev) => {
          if (prev.includes(activeTurn)) return prev;
          return [...prev, activeTurn];
        });

        if (isLastTurn) {
          setPhase("clearing");
        } else {
          setActiveTurn((prev) => prev + 1);
          setPhase("input");
        }
      },
      isLastTurn ? 2400 : 1350,
    );

    return () => window.clearTimeout(timer);
  }, [phase, activeTurn, isLastTurn, isControlled]);

  useEffect(() => {
    if (phase !== "clearing" || isControlled) return;

    const timer = window.setTimeout(() => {
      setCompletedTurns([]);
      setActiveTurn(0);
      setTypedText("");
      setPhase("input");
    }, 720);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const visibleTurnIndexes = [
    ...completedTurns,
    ...(phase === "user" ||
    phase === "typing" ||
    phase === "answer" ||
    phase === "clearing"
      ? [activeTurn]
      : []),
  ].filter((value, index, arr) => arr.indexOf(value) === index);

  const inputText =
    phase === "input"
      ? typedText
      : phase === "sending"
        ? typedText
        : "Ask me anything…";

  const inputIsTyping = phase === "input";
  const sendReady =
    (phase === "input" || phase === "sending") &&
    typedText.length === turn.question.length;

  return (
    <div className="relative mx-auto h-[590px] w-full max-w-[430px] overflow-visible">
      <div
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[64px] opacity-25 blur-3xl"
        style={{
          background: `radial-gradient(circle at 52% 52%, ${accent}, transparent 66%)`,
        }}
      />

      <div
        className="pointer-events-none absolute -right-7 bottom-24 -z-10 h-40 w-40 rounded-full opacity-25 blur-2xl"
        style={{ background: accent }}
      />

      <div
        className="pointer-events-none absolute -left-7 top-20 -z-10 h-32 w-32 rounded-full opacity-15 blur-2xl"
        style={{ background: accent }}
      />

      <motion.div
        layout
        className="absolute bottom-[108px] right-0 w-full overflow-hidden rounded-[24px] border border-white/45 bg-white/35 shadow-[0_24px_64px_rgba(25,22,45,0.18)] backdrop-blur-2xl"
        animate={{
          opacity: phase === "clearing" ? 0.82 : 1,
          y: phase === "clearing" ? -6 : 0,
          scale: phase === "clearing" ? 0.99 : 1,
        }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(255,255,255,0.78),rgba(255,255,255,0.24)_31%,rgba(255,255,255,0)_58%)]" />

        <div className="relative flex items-center gap-2 border-b border-white/35 bg-white/30 px-4 py-3 backdrop-blur-2xl">
          <div
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-sm font-black text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),0_8px_20px_rgba(15,23,42,0.12)]"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
            }}
          >
            N
          </div>

          <span className="text-[15px] font-extrabold text-neutral-900">
            Natasha
          </span>

          <CheckBadge accent={accent} />

          <span className="ml-auto" />

          <button
            type="button"
            aria-label="Clear chat"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] border border-white/45 bg-white/35 text-neutral-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_2px_8px_rgba(20,20,40,0.05)] backdrop-blur-xl transition-transform duration-300 hover:scale-105"
          >
            <TrashIcon />
          </button>

          <button
            type="button"
            aria-label="Close chat"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] border border-white/45 bg-white/35 text-neutral-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_2px_8px_rgba(20,20,40,0.05)] backdrop-blur-xl transition-transform duration-300 hover:scale-105"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="relative flex h-[360px] flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(239,244,255,0.58)_0%,rgba(238,241,246,0.52)_55%,rgba(233,237,244,0.58)_100%)] px-4 py-4 backdrop-blur-2xl">
          <div
            className="pointer-events-none absolute -right-16 top-12 h-44 w-44 rounded-full opacity-10 blur-3xl"
            style={{ background: accent }}
          />

          <div
            className="pointer-events-none absolute -left-16 bottom-20 h-44 w-44 rounded-full opacity-10 blur-3xl"
            style={{ background: accent }}
          />

          <motion.div
            layout
            animate={{
              opacity: phase === "clearing" ? 0 : 1,
              y: phase === "clearing" ? -16 : 0,
              scale: phase === "clearing" ? 0.985 : 1,
              filter: phase === "clearing" ? "blur(4px)" : "blur(0px)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 flex-col justify-end gap-3"
          >
            <motion.div
              layout
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[82%] rounded-[5px_15px_15px_15px] border border-white/50 bg-white/58 px-3.5 py-3 text-sm leading-6 text-neutral-700 shadow-[0_2px_8px_rgba(20,20,40,0.06)] backdrop-blur-xl"
            >
              Hey there! I&apos;m your shopping assistant. How can I help you
              today?
            </motion.div>

            <AnimatePresence mode="popLayout">
              {phase === "input" &&
                completedTurns.length === 0 &&
                typedText.length === 0 && (
                  <motion.div
                    key="waiting"
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 0.55, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center text-xs font-semibold text-neutral-400"
                  >
                    Waiting for customer question…
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {visibleTurnIndexes.map((turnIndex) => {
                const item = turns[turnIndex];
                const isCurrent = turnIndex === activeTurn;
                const answerVisible =
                  completedTurns.includes(turnIndex) ||
                  (isCurrent && phase === "answer") ||
                  phase === "clearing";
                const typingVisible = isCurrent && phase === "typing";

                return (
                  <motion.div
                    key={`turn-${turnIndex}`}
                    layout
                    initial={{
                      opacity: 0,
                      y: 14,
                      scale: 0.985,
                      filter: "blur(4px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -12,
                      scale: 0.985,
                      filter: "blur(4px)",
                    }}
                    transition={{
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col gap-3"
                  >
                    <div
                      className="relative ml-auto max-w-[82%] overflow-hidden rounded-[15px_15px_5px_15px] border border-white/35 px-3.5 py-3 text-sm font-bold leading-6 text-white backdrop-blur-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${accent}CC, ${accent}99)`,
                        boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.46), 0 8px 24px ${accent}38`,
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.06)_44%,transparent_62%)]" />
                      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[42%] rounded-t-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,transparent_100%)]" />

                      <span className="relative z-10">{item.question}</span>
                    </div>

                    {(typingVisible || answerVisible) && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-neutral-600">
                            Natasha
                          </span>
                          <span className="text-[10px] font-semibold text-neutral-400">
                            now
                          </span>
                        </div>

                        <AnimatePresence mode="wait">
                          {typingVisible ? (
                            <motion.div
                              key={`typing-${turnIndex}`}
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{
                                duration: 0.28,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <TypingDots accent={accent} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key={`answer-${turnIndex}`}
                              initial={{
                                opacity: 0,
                                y: 12,
                                scale: 0.98,
                                filter: "blur(4px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                              }}
                              exit={{
                                opacity: 0,
                                y: -8,
                                scale: 0.98,
                                filter: "blur(3px)",
                              }}
                              transition={{
                                duration: 0.38,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="max-w-[88%] rounded-[5px_15px_15px_15px] border border-white/50 bg-white/58 px-3.5 py-3 text-sm leading-6 text-neutral-700 shadow-[0_2px_8px_rgba(20,20,40,0.06)] backdrop-blur-xl"
                            >
                              {item.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="relative border-t border-white/35 bg-white/28 px-3 py-3 text-center text-[11px] tracking-wide text-neutral-400 backdrop-blur-2xl">
          Powered by{" "}
          <strong className="font-extrabold text-neutral-600">helloii</strong>
        </div>
      </motion.div>

      <div className="absolute bottom-0 right-0 w-full">
        <motion.div
          layout
          animate={{
            opacity: phase === "clearing" ? 0.78 : 1,
            y: phase === "clearing" ? 8 : 0,
          }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[72px] overflow-visible rounded-[32px] border border-white/55 bg-white/50 shadow-[0_18px_48px_rgba(25,22,45,0.16)] backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.88),rgba(255,255,255,0.18)_38%,rgba(255,255,255,0)_58%)]" />

          <div className="relative z-10 flex min-h-[72px] items-center gap-2 px-[22px] py-3">
            <motion.p
              layout
              className={`min-w-0 flex-1 whitespace-normal break-words text-[15px] leading-[21px] transition-colors duration-200 ${
                inputIsTyping || phase === "sending"
                  ? "text-neutral-800"
                  : "text-neutral-400"
              }`}
              animate={{
                opacity: phase === "clearing" ? 0.2 : 1,
                y: phase === "clearing" ? 4 : 0,
              }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {inputText || "Ask me anything…"}
              {inputIsTyping && (
                <motion.span
                  className="ml-0.5 inline-block h-4 w-px translate-y-0.5"
                  style={{ background: accent }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              )}
            </motion.p>

            <motion.div
              animate={{
                scale: sendReady ? 1.08 : phase === "sending" ? 0.92 : 1,
              }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
            >
              <LiquidGlassBubble
                accent={accent}
                accentLight={accentLight}
                className="btn-press flex h-10 w-10 items-center justify-center rounded-full p-0 text-white"
              >
                <button
                  type="button"
                  aria-label="Send question"
                  className="flex h-full w-full items-center justify-center rounded-full text-white"
                >
                  <SendIcon />
                </button>
              </LiquidGlassBubble>
            </motion.div>

            <motion.button
              type="button"
              aria-label="Close input"
              animate={{
                scale: phase === "sending" ? 0.96 : 1,
              }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/55 bg-white/42 text-neutral-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_2px_5px_rgba(20,20,40,0.07)] backdrop-blur-xl"
            >
              <CloseIcon />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CheckBadge({ accent }: { accent: string }) {
  return (
    <span
      className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-black text-white shadow-sm"
      style={{ background: accent }}
    >
      ✓
    </span>
  );
}

function SendIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.2 11.3 20 4.2c.7-.3 1.4.4 1.1 1.1l-7.1 16.8c-.3.7-1.3.6-1.5-.1l-1.9-6.1a1 1 0 0 0-.6-.6l-6.1-1.9c-.7-.2-.8-1.2-.1-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 4.2h10M6.4 4.2V3.1c0-.4.3-.7.7-.7h1.8c.4 0 .7.3.7.7v1.1M4.4 4.2l.5 8.1c0 .5.4.9.9.9h4.4c.5 0 .9-.4.9-.9l.5-8.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypingDots({ accent }: { accent: string }) {
  return (
    <div className="flex w-fit items-center gap-1 rounded-[5px_15px_15px_15px] border border-white/55 bg-white/55 px-3.5 py-3 shadow-[0_2px_8px_rgba(20,20,40,0.06)] backdrop-blur-xl">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent }}
          animate={{
            opacity: [0.35, 1, 0.35],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: dot * 0.14,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");

  const value = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized,
    16,
  );

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function rgbToHex([r, g, b]: [number, number, number]) {
  return `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;
}

function lightenHex(hex: string, amount = 65) {
  const [r, g, b] = hexToRgb(hex);

  return rgbToHex([
    Math.min(255, r + amount),
    Math.min(255, g + amount),
    Math.min(255, b + amount),
  ]);
}
