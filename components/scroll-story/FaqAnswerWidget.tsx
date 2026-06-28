"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ChatPreviewTurn } from "@/components/ui/product-revealt-chat";

type Phase = "suggestions" | "selecting" | "typing" | "thinking" | "answer";

/**
 * Smart FAQs gets its own widget instead of the chat-bubble ChatPreview
 * used by the other flows — the feature being demonstrated here *is*
 * the "ask anything" box itself. First turn is shown as the customer
 * clicking a suggested question instead of typing it (suggestions only
 * ever appear before anything's been asked); every turn after that
 * types into the input pill, same as a real follow-up question. Each
 * answered turn stays in the transcript below rather than being
 * replaced by the next one — same as a real chat history — and that
 * transcript caps at a fixed height (~2 question/answer pairs) with its
 * own scroll once there's more than that, instead of growing the whole
 * widget or clipping content.
 *
 * Same external contract as ChatPreview (turns/accent/start/
 * controlledTurn) so the scene/mobile callers can swap one for the
 * other without other changes.
 */
export function FaqAnswerWidget({
  turns,
  accent,
  start = true,
  controlledTurn,
  suggestions,
}: {
  turns: ChatPreviewTurn[];
  accent: string;
  start?: boolean;
  controlledTurn?: number;
  suggestions: string[];
}) {
  const [activeTurn, setActiveTurn] = useState(0);
  const [completedTurns, setCompletedTurns] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("suggestions");
  const [typedText, setTypedText] = useState("");
  const historyRef = useRef<HTMLDivElement>(null);

  const turnIndex = controlledTurn ?? activeTurn;
  const turn = turns[turnIndex];
  const idle = !start;

  // Mirrors ChatPreview's controlled-mode reset: jump to the new turn,
  // mark everything before it as already-answered transcript, and
  // restart this turn's own animation from scratch. Turns at or after
  // it are dropped from the transcript, so scrolling back up un-asks
  // later questions instead of leaving stale answers in the history.
  useEffect(() => {
    if (controlledTurn === undefined || controlledTurn === activeTurn) return;

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
    setPhase(controlledTurn === 0 ? "suggestions" : "typing");
    setTypedText("");
  }, [controlledTurn, activeTurn]);

  useEffect(() => {
    if (!start || phase !== "suggestions") return;
    const timer = window.setTimeout(() => setPhase("selecting"), 900);
    return () => window.clearTimeout(timer);
  }, [phase, start]);

  useEffect(() => {
    if (phase !== "selecting") return;
    const timer = window.setTimeout(() => setPhase("thinking"), 500);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!start || phase !== "typing") return;

    setTypedText("");
    let index = 0;
    const question = turn.question;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(question.slice(0, index));

      if (index >= question.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setPhase("thinking"), 400);
      }
    }, 24);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, turn.question, start]);

  useEffect(() => {
    if (phase !== "thinking") return;
    const timer = window.setTimeout(() => setPhase("answer"), 700);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "answer") return;
    setCompletedTurns((prev) =>
      prev.includes(turnIndex) ? prev : [...prev, turnIndex],
    );
  }, [phase, turnIndex]);

  // Keep the transcript scrolled to the newest message as it grows.
  useEffect(() => {
    const el = historyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [completedTurns, phase]);

  const showSuggestions = idle || phase === "suggestions";
  const showTranscript = !idle && !showSuggestions;

  return (
    <div className="glass-card relative mx-auto flex w-full max-w-[430px] flex-col rounded-[28px] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-neutral-900">
            Have a question?
          </p>
          <p className="text-xs text-neutral-500">
            We can give instant answers
          </p>
        </div>

        <SparkleIcon color={accent} />
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-3 shadow-[0_2px_8px_rgba(20,20,40,0.05)] backdrop-blur-xl">
        <QuestionMarkIcon color="#9ca3af" />
        <span className="min-w-0 flex-1 truncate text-sm text-neutral-800">
          {phase === "typing" ? (
            <>
              {typedText}
              <motion.span
                className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5"
                style={{ background: accent }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </>
          ) : (
            <span className="text-neutral-400">
              {idle ? "Type your question here…" : "Ask a follow-up…"}
            </span>
          )}
        </span>
        <ArrowIcon color={accent} />
      </div>

      <AnimatePresence mode="wait">
        {showSuggestions && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-neutral-400">
              You can ask things like
            </p>

            <div className="mt-2 flex flex-col gap-1.5">
              {suggestions.map((suggestion, i) => {
                const isSelected = phase === "selecting" && i === 0;
                return (
                  <motion.div
                    key={suggestion}
                    animate={
                      isSelected
                        ? { scale: 0.97, opacity: 0.5 }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[14px] border px-3 py-2 text-[13px] leading-5"
                    style={{
                      borderColor: isSelected ? accent : "rgba(0,0,0,0.08)",
                      background: isSelected ? `${accent}14` : "white",
                      color: isSelected ? accent : "#525252",
                    }}
                  >
                    {suggestion}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showTranscript && (
        <motion.div
          ref={historyRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex max-h-[300px] flex-col gap-3 overflow-y-auto overflow-x-hidden pr-1"
        >
          {completedTurns
            .filter((i) => i !== turnIndex)
            .map((i) => (
              <TranscriptPair key={i} turn={turns[i]} accent={accent} />
            ))}

          {/* The question only lands as a chat bubble once it's done
              typing in the input pill above — showing it here earlier
              would spoil the typing animation by revealing the full
              question before it's finished being "typed". */}
          {(phase === "thinking" || phase === "answer") && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-end gap-1.5"
            >
              <span className="text-[11px] font-semibold text-neutral-400">
                You asked
              </span>
              <div
                className="max-w-[88%] rounded-[14px_14px_4px_14px] px-3.5 py-2.5 text-sm font-semibold leading-6 text-white"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
                }}
              >
                {turn.question}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {phase === "thinking" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-fit items-center gap-1 rounded-[4px_14px_14px_14px] border border-white/55 bg-white/55 px-3.5 py-3"
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: accent }}
                    animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: dot * 0.14,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}

            {phase === "answer" && (
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-semibold text-neutral-400">
                  helloii Ai answered
                </p>
                <div className="mt-1.5 max-w-[92%] rounded-[4px_14px_14px_14px] border border-white/50 bg-white/65 px-3.5 py-2.5 text-sm leading-6 text-neutral-700">
                  {turn.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function TranscriptPair({
  turn,
  accent,
}: {
  turn: ChatPreviewTurn;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-[11px] font-semibold text-neutral-400">
          You asked
        </span>
        <div
          className="max-w-[88%] rounded-[14px_14px_4px_14px] px-3.5 py-2.5 text-sm font-semibold leading-6 text-white"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
          }}
        >
          {turn.question}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold text-neutral-400">
          helloii Ai answered
        </p>
        <div className="mt-1.5 max-w-[92%] rounded-[4px_14px_14px_14px] border border-white/50 bg-white/65 px-3.5 py-2.5 text-sm leading-6 text-neutral-700">
          {turn.answer}
        </div>
      </div>
    </div>
  );
}

function SparkleIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l1.6 4.9L18.5 9.5l-4.9 1.6L12 16l-1.6-4.9-4.9-1.6 4.9-1.6L12 3Z"
        fill={color}
      />
    </svg>
  );
}

function QuestionMarkIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6" />
      <path
        d="M9.5 9.3a2.5 2.5 0 1 1 3.8 2.1c-.6.4-1.3.8-1.3 1.7"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.6" r="0.9" fill={color} />
    </svg>
  );
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      className="ml-auto shrink-0"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
