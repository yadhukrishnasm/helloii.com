export type FAQEntry = { question: string; answer: string };
export type FAQCategory = { category: string; items: FAQEntry[] };

export const FAQ_GROUPS: FAQCategory[] = [
  {
    category: "About helloii Ai",
    items: [
      {
        question: "What is helloii Ai?",
        answer:
          "helloii Ai is an AI shopping assistant for Shopify stores. It answers customer questions in real time — about products, sizing, shipping, returns, and store policies — to reduce support-team load and help customers buy with confidence.",
      },
      {
        question: "Who is helloii Ai for?",
        answer:
          "helloii Ai is built for founder-run Shopify stores, typically those with a small support team (around 2–5 people). It's most useful for stores receiving repetitive customer questions that take time to answer manually.",
      },
      {
        question: "What problem does helloii Ai solve?",
        answer:
          "It reduces the volume of repetitive support questions reaching a human team, and prevents lost sales by answering customer questions instantly instead of leaving shoppers to figure things out or wait for a reply.",
      },
      {
        question: "Is helloii Ai only a support tool?",
        answer:
          "No. helloii Ai reduces support load, but it also helps with product discovery, product recommendations, and conversion-focused conversations on product pages.",
      },
      {
        question: "What company makes helloii Ai?",
        answer:
          "helloii Ai is built by Nysaclan (nysaclan.com), based at UL Cyberpark, Kozhikode, Kerala, India. It has been in market for 3 years and is used by 200+ Shopify stores, having handled over 1 million chats, with an average rating of 5.0.",
      },
    ],
  },
  {
    category: "Capabilities",
    items: [
      {
        question: "What questions can helloii Ai answer?",
        answer:
          "helloii Ai answers questions about products, variants, sizing, availability, shipping times, delivery, returns, payment, and store policies — based on the data connected from your Shopify store.",
      },
      {
        question: "Can helloii Ai recommend products?",
        answer:
          "Yes. helloii Ai asks clarifying questions and recommends the specific products that match what a customer is looking for, which helps lift product-page conversions.",
      },
      {
        question: "Does helloii Ai use a fixed list of FAQs?",
        answer:
          "No. helloii Ai answers questions dynamically as customers browse, rather than relying on a predefined FAQ list. It works similarly to dynamic shopping assistants like Amazon's Rufus.",
      },
      {
        question: "What happens when helloii Ai doesn't know an answer?",
        answer:
          "helloii Ai does not guess. When it can't answer something, it hands the conversation off to a human or to WhatsApp, so customers still get help.",
      },
      {
        question: "Is helloii Ai available 24/7?",
        answer:
          "Yes. helloii Ai answers customer questions automatically at any time, without a human needing to be online.",
      },
      {
        question: "What languages and stores does it support?",
        answer: "helloii Ai is built specifically for Shopify storefronts.",
      },
    ],
  },
  {
    category: "Setup and how it works",
    items: [
      {
        question: "How do I install helloii Ai?",
        answer:
          "Install helloii Ai from the Shopify App Store in one click. No code or developer is required, and installation and activation take under two minutes.",
      },
      {
        question: "How does helloii Ai learn about my store?",
        answer:
          "After installation, helloii Ai automatically syncs with your product catalog, collections, policies, and FAQs. It reads what your store already has, with nothing to configure manually.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most stores are up and running in under 10 minutes, and helloii Ai typically starts answering questions within about 5 minutes of setup.",
      },
      {
        question: "Can I test helloii Ai before customers see it?",
        answer:
          "Yes. You can try and test helloii Ai privately before it goes live on your storefront.",
      },
      {
        question: "Where does helloii Ai appear for customers?",
        answer:
          "helloii Ai appears on your store, including product pages, and answers customer questions in real time exactly where they're shopping.",
      },
      {
        question: "Can I customize how the assistant looks?",
        answer:
          "Yes. The chat widget can be styled to match your brand, including colors, layout, and the glass-style assistant interface. Custom and white-label widget options are available on higher plans.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        question: "How much does helloii Ai cost?",
        answer:
          "helloii Ai has three plans: Starter at $19/month, Growth at $49/month, and Scale at $99/month. All self-serve plans include a 14-day free trial with no credit card required, and you can cancel anytime via Shopify.",
      },
      {
        question: "What's the difference between the plans?",
        answer:
          "Starter includes 1,000 chats/month for 1 store with basic analytics. Growth includes 5,000 chats/month for 1 store with product recommendations, custom brand colors, advanced analytics, and a custom widget. Scale includes unlimited chats for up to 3 stores, white-label widget, API access, and dedicated support.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes. Self-serve plans include a 14-day free trial with no credit card required.",
      },
      {
        question: "Is helloii Ai free?",
        answer:
          "helloii Ai can be installed free from the Shopify App Store, and all self-serve plans start with a 14-day free trial. Paid plans start at $19/month.",
      },
    ],
  },
  {
    category: "Comparisons and fit",
    items: [
      {
        question: "How is helloii Ai different from Shopify's built-in chat?",
        answer:
          "helloii Ai is an AI assistant that automatically learns your store and answers questions itself, rather than routing messages to a human inbox. Its focus is reducing repetitive support work and guiding customers to the right product.",
      },
      {
        question: "How is helloii Ai different from generic support chatbots?",
        answer:
          "helloii Ai is purpose-built for Shopify ecommerce and learns your product catalog and policies automatically, so it answers store-specific questions (sizing, availability, returns) without manual scripting. When it isn't confident, it hands off to a human instead of guessing.",
      },
      {
        question: "Is helloii Ai a good fit for a small store?",
        answer:
          "Yes. helloii Ai is designed for founder-run Shopify stores with small support teams, where automating repetitive questions saves the most time.",
      },
    ],
  },
  {
    category: "Data and reliability",
    items: [
      {
        question: "Does helloii Ai make up answers?",
        answer:
          "No. helloii Ai answers from your store's actual data, and when it doesn't know something it hands off to a human or WhatsApp rather than guessing.",
      },
      {
        question: "What data does helloii Ai use?",
        answer:
          "helloii Ai uses the data connected from your Shopify store — product catalog, collections, policies, and FAQs — to answer customer questions.",
      },
    ],
  },
  {
    category: "Getting started",
    items: [
      {
        question: "How do I get started with helloii Ai?",
        answer:
          "Install helloii Ai free from the Shopify App Store, or book a demo and the team will walk you through setup and storefront integration.",
      },
    ],
  },
];

export const ALL_FAQS: FAQEntry[] = FAQ_GROUPS.flatMap((group) => group.items);

// Plain-text rendering of every Q&A, used as grounding context for the
// AI-powered "Ask helloii Ai" endpoint.
export function buildFaqContextText(): string {
  return FAQ_GROUPS.map((group) => {
    const items = group.items
      .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
      .join("\n\n");
    return `## ${group.category}\n\n${items}`;
  }).join("\n\n");
}
