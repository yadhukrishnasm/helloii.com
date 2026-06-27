"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/container";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.3l8.1-9.3L1 2h7l4.9 6.4L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.98h4V21H3V9.98ZM9 9.98h3.83v1.51h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14V21h-4v-4.93c0-1.18-.02-2.69-1.64-2.69-1.65 0-1.9 1.29-1.9 2.6V21H9V9.98Z" />
    </svg>
  );
}

const SHOPIFY_URL = "http://apps.shopify.com/ai-sales-support-assistant";
const DEMO_URL = "https://calendar.app.google/uCHWaZUmUy9fbeax5";

const LINK_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Product", href: "/#product", homeOnly: true },
      { label: "Features", href: "/#features", homeOnly: true },
      { label: "Pricing", href: "/#pricing", homeOnly: true },
      { label: "FAQ", href: "/faq", homeOnly: false },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "hello@helloii.com", href: "mailto:hello@helloii.com", homeOnly: false },
      { label: "Book a demo", href: DEMO_URL, homeOnly: false, external: true },
      { label: "Nysaclan.com", href: "https://nysaclan.com", homeOnly: false, external: true },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="relative overflow-hidden border-t border-neutral-200/70 py-14 sm:py-16">
      <div className="pointer-events-none absolute left-[8%] top-0 -z-10 h-[280px] w-[280px] rounded-full bg-[#1A56FF]/08 blur-[100px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-0 -z-10 h-[280px] w-[280px] rounded-full bg-[#8B2FFF]/08 blur-[100px]" />

      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand + CTA */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex text-2xl font-bold tracking-tighter text-neutral-950">
              Helloii
            </Link>

            <p className="mt-4 text-sm leading-7 text-neutral-600">
              AI shopping assistant for Shopify stores. Helps customers ask,
              discover, decide, and buy faster — while cutting your support
              load.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-press btn-glass-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold"
              >
                Start for free
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-press btn-glass-secondary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold"
              >
                Book a demo
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            {LINK_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                  {col.heading}
                </h3>
                <nav className="mt-5 flex flex-col gap-3 text-sm font-medium">
                  {col.links.map((link) => {
                    if (link.homeOnly && !isHome) return null;
                    return link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-700 transition-colors hover:text-neutral-950"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-neutral-700 transition-colors hover:text-neutral-950"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}

            {/* Office address */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                Office
              </h3>
              <p className="mt-5 text-sm leading-6 text-neutral-500">
                LEAP KSUM, 2nd Floor, <br />
                UL CyberPark, Kozhikode <br />
                Kerala, India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500">
            © Helloii.com, from the House of Nysaclan — Nysaclan.com
          </p>

          <div className="flex items-center gap-5">
            <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-neutral-950">
              Privacy
            </a>
            <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-neutral-950">
              Terms
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://x.com/helloiihq"
                target="_blank"
                rel="noreferrer"
                aria-label="Helloii on X"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-500 backdrop-blur-sm transition-colors hover:border-neutral-300 hover:text-neutral-950"
              >
                <XIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/helloii/"
                target="_blank"
                rel="noreferrer"
                aria-label="Helloii on LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-500 backdrop-blur-sm transition-colors hover:border-neutral-300 hover:text-neutral-950"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
