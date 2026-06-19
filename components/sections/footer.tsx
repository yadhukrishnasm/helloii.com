import Link from "next/link";

import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-200/70 py-10 sm:py-14">
      <div className="pointer-events-none absolute left-[10%] top-0 -z-10 h-[260px] w-[260px] rounded-full bg-[#2563EB]/08 blur-[90px]" />
      <div className="pointer-events-none absolute right-[10%] bottom-0 -z-10 h-[260px] w-[260px] rounded-full bg-[#FF2FB2]/08 blur-[90px]" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
          {/* Brand col */}
          <div>
            <Link
              href="/"
              className="inline-flex text-2xl font-bold tracking-[-0.05em] text-neutral-950"
            >
              Helloii
            </Link>

            <p className="mt-4 max-w-md text-sm font-medium leading-7 text-neutral-600">
              AI shopping assistant for ecommerce stores. Help customers ask,
              discover, decide, and buy faster.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="http://apps.shopify.com/ai-sales-support-assistant"
                target="_blank"
                rel="noreferrer"
                className="btn-press btn-glass-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold"
              >
                Sign up for free
              </a>

              <a
                href="https://calendar.app.google/uCHWaZUmUy9fbeax5"
                target="_blank"
                rel="noreferrer"
                className="btn-press btn-glass-secondary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold"
              >
                Book a demo
              </a>
            </div>
          </div>

          {/* Website links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
              Website
            </h3>

            <nav className="mt-5 flex flex-col gap-3 text-sm font-medium text-neutral-700">
              <a
                href="#product"
                className="transition-colors hover:text-neutral-950"
              >
                Product
              </a>
              <a
                href="#features"
                className="transition-colors hover:text-neutral-950"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="transition-colors hover:text-neutral-950"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="transition-colors hover:text-neutral-950"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
              Contact
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-neutral-700">
              <a
                href="mailto:hello@helloii.com"
                className="transition-colors hover:text-neutral-950"
              >
                hello@helloii.com
              </a>
              <p className="text-sm leading-6 text-neutral-500">
                LEAP KSUM, 2nd Floor, <br />
                UL CyberPark, Kozhikode <br />
                Kerala - India
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
              Follow
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-neutral-700">
              <a
                href="https://x.com/helloiihq"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-neutral-950"
              >
                X (Twitter)
              </a>
              <a
                href="https://www.linkedin.com/company/helloii/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-neutral-950"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© Helloii.com, Powered by MAGNOINNOVATIONLAB PRIVATE LIMITED</p>

          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-neutral-950">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-neutral-950">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
