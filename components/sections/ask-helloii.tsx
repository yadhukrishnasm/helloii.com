"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { LiquidGlassBubble } from "@/components/ui/liquid-glass";
import { ALL_FAQS } from "@/lib/faq-data";

// A few quick-start chips — clicking these still calls the real AI
// endpoint, they're just convenience shortcuts to a pre-filled question.
const SUGGESTED_QUESTIONS = [
  "What is Helloii AI?",
  "How much does it cost?",
  "How long does setup take?",
  "Does it work with my Shopify store?",
  "Can I customize how it looks?",
];

type Exchange = {
  id: number;
  question: string;
  answer: string | null;
  error: string | null;
  loading: boolean;
};

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3.2 11.3 20 4.2c.7-.3 1.4.4 1.1 1.1l-7.1 16.8c-.3.7-1.3.6-1.5-.1l-1.9-6.1a1 1 0 0 0-.6-.6l-6.1-1.9c-.7-.2-.8-1.2-.1-1.5Z"
        fill="#fff"
      />
    </svg>
  );
}

export function AskHelloii() {
  const [question, setQuestion] = useState("");
  // Kept in memory only — resets on page refresh, no persistence.
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [nextId, setNextId] = useState(0);

  const loading = exchanges.some((e) => e.loading);

  async function handleAsk(q: string) {
    const trimmed = q.trim();
    if (!trimmed || loading) return;

    const id = nextId;
    setNextId((n) => n + 1);
    setQuestion("");
    setExchanges((prev) => [
      ...prev,
      { id, question: trimmed, answer: null, error: null, loading: true },
    ]);

    try {
      const res = await fetch("/api/faq-ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await res.json();

      setExchanges((prev) =>
        prev.map((e) =>
          e.id === id
            ? res.ok
              ? { ...e, loading: false, answer: data.answer }
              : {
                  ...e,
                  loading: false,
                  error: data?.error ?? "Couldn't get an answer right now.",
                }
            : e,
        ),
      );
    } catch {
      setExchanges((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                loading: false,
                error:
                  "Couldn't reach the AI right now — try again in a moment.",
              }
            : e,
        ),
      );
    }
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-[#1A56FF]/08 blur-3xl" />

      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="glass-item inline-flex rounded-full px-4 py-2 text-sm font-bold text-[#1A56FF]">
            Try it live
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Ask Helloii AI anything.
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-500">
            This is the same Question Box your customers will use — try it. Ask
            about pricing, setup, or how it works, and Helloii AI answers
            instantly.
          </p>
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mx-auto mt-10 max-w-2xl rounded-[28px] p-5 sm:p-6"
        >
          {/* Chat-style transcript — user bubble on the right (liquid glass,
              same gradient bubble as the product animation's chatbox),
              Helloii AI's reply on the left in a plain white bubble. Grows
              with every exchange instead of scrolling internally — the
              outer card's `layout` prop animates that growth smoothly
              rather than snapping, and nothing here ever scrolls on its
              own (no scrollIntoView/scrollTo calls). */}
          <div className="relative z-10 mb-4 space-y-3">
            {exchanges.map((ex) => (
              <div key={ex.id} className="space-y-3">
                <div className="flex flex-col items-end gap-1 px-4">
                  <LiquidGlassBubble
                    accent="#1A56FF"
                    accentLight="#5A9CFF"
                    className="max-w-[85%] rounded-[15px_15px_5px_15px] px-4 py-2.5"
                  >
                    <p className="text-sm font-bold leading-snug">
                      {ex.question}
                    </p>
                  </LiquidGlassBubble>
                </div>

                <div className="flex flex-col items-start gap-1">
                  <div className="max-w-[85%] rounded-[15px_15px_15px_5px] bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(20,20,40,0.06)]">
                    {ex.loading ? (
                      <div className="flex items-center gap-1 py-0.5 px-10">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="block h-1.5 w-1.5 rounded-full bg-neutral-300"
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm leading-6 text-neutral-700">
                        {ex.error ?? ex.answer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested questions only show once a chat has actually started —
              keeps the empty state clean, and gives quick follow-ups once
              there's a conversation to add to. */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(question);
            }}
            className="relative z-10 flex items-center gap-2"
          >
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about Helloii AI…"
              maxLength={300}
              className="glass-item w-full rounded-full px-5 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Ask"
              className="btn-press shrink-0 disabled:opacity-60"
            >
              <LiquidGlassBubble
                accent="#1A56FF"
                accentLight="#5A9CFF"
                className="flex h-11 w-11 items-center justify-center rounded-full"
              >
                <SendIcon />
              </LiquidGlassBubble>
            </button>
          </form>
          <p className="pointer-events-none select-none text-center text-[10px] font-medium m-3  text-neutral-400/60">
            powered by Helloii AI
          </p>
          <div className="relative z-10 mb-4 flex flex-wrap gap-2 justify-center">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleAsk(q)}
                disabled={loading}
                className="glass-item rounded-full px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-950 disabled:opacity-60"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Server-rendered fallback — same Q&A as real text, visible without JS */}
        <noscript>
          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {ALL_FAQS.slice(0, 5).map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-white/60 bg-white/65 p-4"
              >
                <p className="text-sm font-bold text-neutral-950">
                  {item.question}
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </noscript>

        <p className="mt-8 text-center text-sm text-neutral-400">
          <Link href="/faq" className="text-[#1A56FF] hover:underline">
            See all FAQs
          </Link>
        </p>
      </Container>
    </section>
  );
}
