"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

const TESTIMONIALS = [
  {
    quote:
      "Placeholder testimonial — this store owner will share their experience with Helloii here.",
    name: "Store Owner Name",
    store: "Store Name · Shopify",
    rating: 5,
  },
  {
    quote:
      "Placeholder testimonial — another customer will describe how Helloii improved their store's support.",
    name: "Store Owner Name",
    store: "Store Name · Shopify",
    rating: 5,
  },
  {
    quote:
      "Placeholder testimonial — a third store owner will explain the impact Helloii had on their conversions.",
    name: "Store Owner Name",
    store: "Store Name · Shopify",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
            What stores say
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-4xl">
            Trusted by <span className="text-[#2563EB]">50+ Shopify stores</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col rounded-2xl border border-neutral-200/70 bg-white p-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} className="text-[#FF2FB2]">★</span>
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-7 text-neutral-600 italic">
                "{t.quote}"
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                {/* Avatar placeholder */}
                <div className="h-9 w-9 rounded-full bg-neutral-200" />
                <div>
                  <p className="text-sm font-bold text-neutral-950">{t.name}</p>
                  <p className="text-xs text-neutral-400">{t.store}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
