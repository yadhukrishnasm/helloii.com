import { NextRequest, NextResponse } from "next/server";
import { buildFaqContextText } from "@/lib/faq-data";

export const runtime = "nodejs";

const MAX_QUESTION_LENGTH = 300;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;

// Simple in-memory rate limiter, keyed by IP. Resets on every cold start
// and isn't shared across serverless instances — good enough for a small
// deployment, not a substitute for a real rate-limiting service at scale.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

const SYSTEM_PROMPT = `You are the helloii Ai Question Box — a live demo of the AI assistant helloii Ai puts on Shopify product pages, here scoped to answer questions about helloii Ai itself.

Answer primarily from the FAQ context below. You may reason a little beyond it for helloii Ai-specific questions that aren't verbatim in the doc (e.g. inferring something reasonable about how it'd behave), but never invent unrelated facts, pricing, or capabilities.

Writing rules:
- Lead with the answer in the first sentence. State facts plainly. No marketing fluff.
- Keep answers short — 1 to 3 sentences, matching the FAQ's tone.
- If the message is a greeting or small talk (e.g. "hi", "hello", "thanks", "how are you"), respond warmly and briefly, then invite them to ask anything about helloii Ai. This is not an "unrelated" question — answer it directly, don't decline it.
- Only decline when the message is about a genuinely unrelated topic with no connection to helloii Ai, Shopify, or AI shopping assistants (e.g. asking for a recipe, a poem, or unrelated trivia). In that case, politely say you can't help with that and point them to hello@helloii.com.

FAQ context:
${buildFaqContextText()}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI is not configured." },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many questions — try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const question =
    typeof (body as { question?: unknown })?.question === "string"
      ? (body as { question: string }).question.trim()
      : "";

  if (!question) {
    return NextResponse.json(
      { error: "Question is required." },
      { status: 400 },
    );
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      {
        error: `Question is too long (max ${MAX_QUESTION_LENGTH} characters).`,
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Couldn't get an answer right now." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const answer: string | undefined = data?.choices?.[0]?.message?.content;

    if (!answer) {
      return NextResponse.json(
        { error: "Couldn't get an answer right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer: answer.trim() });
  } catch {
    return NextResponse.json(
      { error: "Couldn't get an answer right now." },
      { status: 502 },
    );
  }
}
