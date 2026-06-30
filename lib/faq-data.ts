export type FAQEntry = { question: string; answer: string };
export type FAQCategory = { category: string; items: FAQEntry[] };

export const FAQ_GROUPS: FAQCategory[] = [
  {
    category: "About Helloii AI",
    items: [
      {
        question: "What is Helloii AI?",
        answer:
          "Helloii AI is an AI shopping assistant for Shopify stores. It answers customer questions in real time — about products, sizing, shipping, returns, and store policies — to reduce support-team load and help customers buy with confidence.",
      },
      {
        question: "Who is Helloii AI for?",
        answer:
          "Helloii AI is built for founder-run Shopify stores, typically those with a small support team (around 2–5 people). It's most useful for stores receiving repetitive customer questions that take time to answer manually.",
      },
      {
        question: "What problem does Helloii AI solve?",
        answer:
          "It reduces the volume of repetitive support questions reaching a human team, and prevents lost sales by answering customer questions instantly instead of leaving shoppers to figure things out or wait for a reply.",
      },
      {
        question: "Is Helloii AI only a support tool?",
        answer:
          "No. Helloii AI reduces support load, but it also helps with product discovery, product recommendations, and conversion-focused conversations on product pages.",
      },
      {
        question: "What company makes Helloii AI?",
        answer:
          "Helloii AI is built by Nysaclan (nysaclan.com), based at UL Cyberpark, Kozhikode, Kerala, India. It has been in market for 3 years and is used by 200+ Shopify stores, having handled over 1 million chats, with an average rating of 5.0.",
      },
    ],
  },
  {
    category: "Capabilities",
    items: [
      {
        question: "What questions can Helloii AI answer?",
        answer:
          "Helloii AI answers questions about products, variants, sizing, availability, shipping times, delivery, returns, payment, and store policies — based on the data connected from your Shopify store.",
      },
      {
        question: "Can Helloii AI recommend products?",
        answer:
          "Yes. Helloii AI asks clarifying questions and recommends the specific products that match what a customer is looking for, which helps lift product-page conversions.",
      },
      {
        question: "Does Helloii AI use a fixed list of FAQs?",
        answer:
          "No. Helloii AI answers questions dynamically as customers browse, rather than relying on a predefined FAQ list. It works similarly to dynamic shopping assistants like Amazon's Rufus.",
      },
      {
        question: "What happens when Helloii AI doesn't know an answer?",
        answer:
          "Helloii AI does not guess. When it can't answer something, it hands the conversation off to a human or to WhatsApp, so customers still get help.",
      },
      {
        question: "Is Helloii AI available 24/7?",
        answer:
          "Yes. Helloii AI answers customer questions automatically at any time, without a human needing to be online.",
      },
      {
        question: "What languages and stores does it support?",
        answer: "Helloii AI is built specifically for Shopify storefronts.",
      },
    ],
  },
  {
    category: "Setup and how it works",
    items: [
      {
        question: "How do I install Helloii AI?",
        answer:
          "Install Helloii AI from the Shopify App Store in one click. No code or developer is required, and installation and activation take under two minutes.",
      },
      {
        question: "How does Helloii AI learn about my store?",
        answer:
          "After installation, Helloii AI automatically syncs with your product catalog, collections, policies, and FAQs. It reads what your store already has, with nothing to configure manually.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most stores are up and running in under 10 minutes, and Helloii AI typically starts answering questions within about 5 minutes of setup.",
      },
      {
        question: "Can I test Helloii AI before customers see it?",
        answer:
          "Yes. You can try and test Helloii AI privately before it goes live on your storefront.",
      },
      {
        question: "Where does Helloii AI appear for customers?",
        answer:
          "Helloii AI appears on your store, including product pages, and answers customer questions in real time exactly where they're shopping.",
      },
      {
        question: "Can I customize how the assistant looks?",
        answer:
          "Yes. The chat widget can be styled to match your brand, including colors, layout, and the glass-style assistant interface.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        question: "How much does Helloii AI cost?",
        answer:
          "Helloii AI has three plans: Free, Basic at $25/month, and Pro at $55/month. The Free plan has no expiry — it's not a time-limited trial — and you can upgrade, downgrade, or cancel anytime via Shopify.",
      },
      {
        question: "What's the difference between the plans?",
        answer:
          "Free includes 50 chats/month, training on up to 20 products, 10 other training sources, and basic support. Basic ($25/month) includes 1,000 chats/month, training on up to 500 products, 50 other training sources, and 24/7 priority support. Pro ($55/month) includes 2,500 chats/month, training on up to 1,000 products, 120 other training sources, and 24/7 priority support.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "There's no separate time-limited trial — the Free plan itself doesn't expire, so you can use it for as long as you like (50 chats/month) before deciding to upgrade.",
      },
      {
        question: "Is Helloii AI free?",
        answer:
          "Yes. Helloii AI's Free plan can be installed at no cost from the Shopify App Store and includes 50 chats/month with no expiry. Paid plans start at $25/month for higher chat and product-training limits.",
      },
    ],
  },
  {
    category: "Comparisons and fit",
    items: [
      {
        question: "How is Helloii AI different from Shopify's built-in chat?",
        answer:
          "Helloii AI is an AI assistant that automatically learns your store and answers questions itself, rather than routing messages to a human inbox. Its focus is reducing repetitive support work and guiding customers to the right product.",
      },
      {
        question: "How is Helloii AI different from generic support chatbots?",
        answer:
          "Helloii AI is purpose-built for Shopify ecommerce and learns your product catalog and policies automatically, so it answers store-specific questions (sizing, availability, returns) without manual scripting. When it isn't confident, it hands off to a human instead of guessing.",
      },
      {
        question: "Is Helloii AI a good fit for a small store?",
        answer:
          "Yes. Helloii AI is designed for founder-run Shopify stores with small support teams, where automating repetitive questions saves the most time.",
      },
    ],
  },
  {
    category: "Data and reliability",
    items: [
      {
        question: "Does Helloii AI make up answers?",
        answer:
          "No. Helloii AI answers from your store's actual data, and when it doesn't know something it hands off to a human or WhatsApp rather than guessing.",
      },
      {
        question: "What data does Helloii AI use?",
        answer:
          "Helloii AI uses the data connected from your Shopify store — product catalog, collections, policies, and FAQs — to answer customer questions.",
      },
    ],
  },
  {
    category: "Getting started",
    items: [
      {
        question: "How do I get started with Helloii AI?",
        answer:
          "Install Helloii AI free from the Shopify App Store, or book a demo and the team will walk you through setup and storefront integration.",
      },
    ],
  },
];

export const ALL_FAQS: FAQEntry[] = FAQ_GROUPS.flatMap((group) => group.items);

// Plain-text rendering of every Q&A, used as grounding context for the
// AI-powered "Ask Helloii AI" endpoint.
export function buildFaqContextText(): string {
  return FAQ_GROUPS.map((group) => {
    const items = group.items
      .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
      .join("\n\n");
    return `## ${group.category}\n\n${items}`;
  }).join("\n\n");
}
