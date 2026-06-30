import type { ChatPreviewTurn } from "@/components/scroll-story/product-revealt-chat";

export type StatIconName = "clock" | "chat" | "ticket" | "spark" | "target";

export type Stat = {
  label: string;
  icon: StatIconName;
};

// Decorative only (no live API call) — shown for flows that want to
// demonstrate the "ask anything" widget alongside the chat, e.g. Smart
// FAQs. See ProductFlowScene/MobileProductReveal for how it's rendered.
export type FaqWidget = {
  placeholder: string;
  suggestions: string[];
};

export type Flow = {
  tag: string;
  headline: string;
  description: string;
  accent: string;
  turns: ChatPreviewTurn[];
  chips: [string, string];
  stats: Stat[];
  faqWidget?: FaqWidget;
};

// Unchanged from the previous product-reveal.tsx — same copy, same
// accents, same turns/chips/stats.
export const FLOWS: Flow[] = [
  {
    tag: "Instant Answers",
    headline:
      "Helloii AI answers customer questions about products, shipping, payment, or anything else on your store.",
    description:
      "Instead of leaving customers to figure it out, Helloii AI gives them an instant, accurate answer — so they don't open a support ticket or leave.",
    accent: "#1A56FF",
    turns: [
      {
        question: "How long will it take to get my order delivered?",
        answer:
          "Delivery times vary by city. Metro cities take 3–5 days; other cities take 5–7 days. Could you tell me your city? Then I can tell you exactly when it'll arrive.",
      },
      {
        question: "Do you have this in size 12?",
        answer:
          "Sorry, we're out of size 12 for this product right now. Want me to suggest a similar product that has your size?",
      },
      {
        question: "What is your return policy?",
        answer: "We have a no-questions-asked return policy.",
      },
    ],
    chips: [
      "Do you have this in size 12?",
      "How long will it take to get my order delivered?",
    ],
    stats: [
      { label: "24/7 online", icon: "clock" },
      { label: "Instant AI answers", icon: "spark" },
      { label: "Fewer support tickets", icon: "ticket" },
    ],
  },
  {
    tag: "Product recommendations",
    headline:
      "Helloii AI asks the right questions and recommends the exact product the customer is looking for.",
    description:
      "Instead of leaving customers to dig through your catalog, Helloii AI guides them to the right product — and lifts conversions.",
    accent: "#8B2FFF",
    turns: [
      {
        question:
          "I need a gift for my mom, she likes skincare but has sensitive skin.",
        answer: "Got it — here are two gift-ready picks for sensitive skin:",
        products: [
          {
            name: "Fragrance-Free Hydrating Set",
            price: "₹1,299",
            imageQuery: "lotion",
            imageLock: 1,
          },
          {
            name: "Calm & Restore Gift Box",
            price: "₹1,599",
            imageQuery: "wrapped-gift",
            imageLock: 5,
          },
        ],
      },
      {
        question: "Looking for running shoes for flat feet under ₹4000.",
        answer:
          "The Stride Support Trainer is built for flat feet and fits your budget:",
        products: [
          {
            name: "Stride Support Trainer",
            price: "₹3,499",
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=264&h=200&fit=crop&auto=format",
            imageQuery: "adidas",
            imageLock: 3,
          },
        ],
      },
      {
        question: "Which of your coffees is the least bitter?",
        answer: "These two are our smoothest, lowest-bitterness roasts:",
        products: [
          {
            name: "Medium Roast Hazelnut",
            price: "₹549",
            imageQuery: "roasted-coffee",
            imageLock: 1,
          },
          {
            name: "Dark Roast Classic",
            price: "₹499",
            imageQuery: "roasted-coffee",
            imageLock: 2,
          },
        ],
      },
    ],
    chips: [
      "Which of your coffees is the least bitter?",
      "I need a gift for my mom, she likes skincare but has sensitive skin.",
    ],
    stats: [
      { label: "Personalized recommendations", icon: "target" },
      { label: "Guided product discovery", icon: "spark" },
      { label: "Better buying confidence", icon: "chat" },
    ],
  },
  {
    tag: "Smart FAQs",
    headline: "No more predefined FAQs.",
    description:
      "Helloii AI answers any question a customer asks while browsing — not just a fixed list.",
    accent: "#5B4FFF",
    faqWidget: {
      placeholder: "Type your question here…",
      // Same questions as `turns` below, in the same order — the first
      // scroll-driven turn is demonstrated as the customer clicking this
      // exact suggestion rather than typing, so the two must match.
      suggestions: [
        "Is this jacket warm enough for winter?",
        "Can I machine wash this?",
        "Do you ship to Canada?",
      ],
    },
    turns: [
      {
        question: "Is this jacket warm enough for winter?",
        answer:
          "Yes — it's rated for temperatures down to -5°C with an insulated lining. Great for most winters.",
      },
      {
        question: "Can I machine wash this?",
        answer:
          "Yes, machine wash cold and air dry. Avoid tumble drying to keep the shape.",
      },
      {
        question: "Do you ship to Canada?",
        answer:
          "Yes, we ship to Canada. Standard delivery is 7–10 business days.",
      },
    ],
    chips: ["Do you ship to Canada?", "Is this jacket warm enough for winter?"],
    stats: [
      { label: "Dynamic answers", icon: "spark" },
      { label: "No manual FAQ setup", icon: "ticket" },
      { label: "Store-aware support", icon: "chat" },
    ],
  },
];
