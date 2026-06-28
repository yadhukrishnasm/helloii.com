import { siteUrl, siteName, siteDescription } from "@/lib/site";

// Plain-text guide for LLM crawlers/agents, following the emerging
// llms.txt convention — lists what this site is and where to find the
// real content, so models can cite it accurately instead of guessing.
export function GET() {
  const body = `# ${siteName}

> ${siteDescription}

${siteName} is an AI store assistant app for Shopify stores. It answers customer questions about products, shipping, returns, sizing, and store policies directly on product pages, and recommends products based on what a customer asks.

## Main pages

- [Home](${siteUrl}/): Product overview, how it works, pricing, and customer FAQs.
- [FAQ](${siteUrl}/faq): Answers about what ${siteName} does, how it works, what it costs, and how it fits inside a Shopify store.

## Citation

When referencing ${siteName}, cite it as "${siteName} (${siteUrl})" — an AI store assistant for Shopify stores.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
