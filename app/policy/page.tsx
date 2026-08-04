"use client";

import { Database, ShieldCheck, Scale, type LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

const GROUPS: { heading: string; icon: LucideIcon; sections: any[] }[] = [
  {
    heading: "What we collect & how we use it",
    icon: Database,
    sections: [
      {
        title: "Who we are",
        body: [
          "Helloii AI provides an AI chatbot app for Shopify stores. This policy explains what data we collect, why, and how it's handled — for merchants who install Helloii and for their customers who chat with it.",
        ],
      },
      {
        title: "Information we collect",
        body: ["When a merchant installs Helloii, Shopify grants us access to the following via API scopes:"],
        list: [
          "Products, theme, and store content — used to power accurate chatbot answers",
          "Orders — used to answer order-status and tracking questions",
          "Customer browsing/interaction events and pixel data — used for personalization and analytics",
          "Merchant account and billing details, via Shopify's Billing API",
          "Chat conversations between shoppers and the bot, stored so merchants can review them in the app",
        ],
      },
      {
        title: "How we use this data",
        body: [
          "Store and product data is used to generate accurate, relevant chatbot responses.",
          "To keep conversations coherent, we send the ongoing conversation's recent messages — not the full chat history — to our AI provider to generate each response.",
          "Full chat transcripts are stored on our servers and shown inside the Helloii dashboard.",
        ],
      },
    ],
  },
  {
    heading: "Sharing, security & retention",
    icon: ShieldCheck,
    sections: [
      {
        title: "Who can see chat data",
        body: [
          "Chat conversations are visible only to the store owner and any staff accounts the store owner has explicitly granted access to. Helloii does not share chat content outside the store's authorized team, except where required to operate the service or by law.",
        ],
      },
      {
        title: "Data sharing & third parties",
        body: ["We share data only as needed to run Helloii:"],
        list: [
          "AI/LLM provider — receives recent conversation context to generate responses",
          "Cloud hosting/infrastructure providers — store app and chat data",
          "Shopify — for billing, authentication, and store data access",
        ],
        footer: "We do not sell customer or merchant data to third parties.",
      },
      {
        title: "Retention & deletion",
        body: [
          "Chat data is retained for as long as the app is installed. On uninstall, we delete associated data per Shopify's mandatory compliance webhooks (customers/redact, shop/redact).",
          "Merchants or customers can request earlier deletion by contacting hello@helloii.com.",
        ],
      },
      {
        title: "Security",
        body: [
          "We use TLS/HTTPS to encrypt data in transit between Shopify, our servers, and our AI provider. Access to stored chat data is restricted to the store owner and staff they've granted access to.",
        ],
      },
    ],
  },
  {
    heading: "Your rights & contact",
    icon: Scale,
    sections: [
      {
        title: "Your rights (GDPR / CCPA)",
        body: ["Depending on your location, you may have the right to:"],
        list: [
          "Access the personal data we hold about you",
          "Request correction or deletion of your data",
          "Object to or restrict certain processing",
          "Request a copy of your data in a portable format",
        ],
        footer: "To exercise any of these rights, contact hello@helloii.com.",
      },
      {
        title: "Children's data",
        body: ["Helloii is not directed at children, and we do not knowingly collect data from children under 16."],
      },
      {
        title: "Changes to this policy",
        body: ["We may update this policy over time. Material changes will be posted here with an updated date."],
      },
      {
        title: "Contact us",
        body: ["Questions about this policy or your data? Email us at hello@helloii.com."],
      },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <section id="privacy-policy" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute left-[8%] top-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-[#1A56FF]/10 blur-[100px] sm:h-[480px] sm:w-[480px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-[#8B2FFF]/10 blur-[100px] sm:h-[480px] sm:w-[480px]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="glass-item inline-flex rounded-full px-4 py-2 text-sm font-semibold text-[#1A56FF]">
              Privacy Policy
            </div>
          </Reveal>

          <Reveal>
            <h1 className="mt-6 text-4xl font-bold leading-[0.95] tracking-tighter text-neutral-950 sm:text-5xl lg:text-7xl">
              Your data, handled transparently.
            </h1>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              How Helloii AI collects, uses, and protects data for merchants and their customers.
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-3 text-sm text-neutral-400">Last updated: August 4, 2026</p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-8 sm:mt-20">
          {GROUPS.map((group) => (
            <Reveal key={group.heading}>
              <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/65 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A56FF] to-[#8B2FFF]">
                    <group.icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl lg:text-3xl">
                    {group.heading}
                  </h2>
                </div>

                <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
                  {group.sections.map((section, i) => (
                    <div
                      key={section.title}
                      className={
                        i === 0
                          ? ""
                          : "border-t border-neutral-200/70 pt-8 sm:pt-10"
                      }
                    >
                      <h3 className="text-lg font-bold text-neutral-950 sm:text-xl">
                        {section.title}
                      </h3>

                      <div className="mt-3 space-y-3">
                        {section.body.map((paragraph) => (
                          <p key={paragraph} className="text-base leading-8 text-neutral-600 sm:text-lg">
                            {paragraph}
                          </p>
                        ))}

                        {section.list && (
                          <ul className="space-y-2.5 pl-1">
                            {section.list.map((item) => (
                              <li key={item} className="flex gap-3 text-base leading-8 text-neutral-600 sm:text-lg">
                                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A56FF]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.footer && (
                          <p className="text-base leading-8 text-neutral-600 sm:text-lg">{section.footer}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
