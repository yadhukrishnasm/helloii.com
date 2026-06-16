"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-5 z-50"
    >
      <Container>
        <div className="flex justify-center">
          <div className="relative flex items-center gap-8 overflow-hidden rounded-full border border-white/40 bg-white/60 px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md">
            <div className="pointer-events-none absolute -left-10 top-0 h-full w-24 rotate-12 bg-white/40 blur-2xl" />

            <Link
              href="/"
              className="font-bold tracking-tight text-neutral-950"
            >
              Helloii
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <a
                href="#about"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
              >
                About
              </a>

              <a
                href="#product"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
              >
                Product
              </a>

              <a
                href="#faq"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
              >
                FAQ
              </a>
            </nav>

            <a
              href="https://calendar.app.google/uCHWaZUmUy9fbeax5"
              target="_blank"
              rel="noreferrer"
              className="btn-glass-primary rounded-full px-5 py-2 text-sm font-medium"
            >
              Book a demo
            </a>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
