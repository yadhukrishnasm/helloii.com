"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Container } from "@/components/layout/container";

const CUSTOMERS = [
  {
    name: "Fabus Frames",
    src: "https://fabusframes.com/cdn/shop/files/Fabus_White_240x.png?v=1684904672",
    dark: true,
  },
  {
    name: "Denzo Fashion",
    src: "https://denzofashion.com/cdn/shop/files/Denzo_LOGO-05.png?height=88&v=1779860396",
  },
  {
    name: "Spice Basket",
    src: "https://spicebasket.com/cdn/shop/files/Layer_1.svg?v=1753251331&width=600",
  },
  {
    name: "Zilmor",
    src: "https://zilmor.com/cdn/shop/files/1072X861-PNG_1_90x_1.png?v=1772515941&width=600",
  },
  {
    name: "Kawaii Molds",
    src: "https://kawaiimolds.com/cdn/shop/files/LOGO-TOPWEBSITE-whitebarbottomAsset_9.svg?v=1754250832&width=600",
    dark: true,
  },
  {
    name: "Gold Age",
    src: "https://goldage.life/cdn/shop/files/AD906D9D-0C9C-470D-8073-5F2237B44DE7-2_90x.jpg?v=1651237394",
  },
  {
    name: "Chryso Collections",
    // No logo image found on the live site — store uses a text wordmark.
    src: null,
  },
];

export function RecognizedBy() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-200/60 py-10 sm:py-14">
      <Container>
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
          Trusted by
        </p>

        <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 sm:gap-1 lg:grid-cols-7">
          {CUSTOMERS.map((customer) => (
            <CustomerLogo key={customer.name} customer={customer} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CustomerLogo({
  customer,
}: {
  customer: { name: string; src: string | null; dark?: boolean };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="group flex h-14 w-full max-w-[150px] items-center justify-center"
    >
      {customer.src ? (
        <img
          src={customer.src}
          alt={customer.name}
          loading="lazy"
          className="h-9 w-auto max-w-[120px] object-contain opacity-40 grayscale contrast-125 brightness-75 saturate-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:saturate-100"
        />
      ) : (
        <span className="text-sm font-semibold tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-neutral-950">
          {customer.name}
        </span>
      )}
    </div>
  );
}
