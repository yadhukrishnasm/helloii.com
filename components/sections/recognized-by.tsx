import { Container } from "@/components/layout/container";

const CUSTOMERS = [
  {
    name: "Fabus Frames",
    src: "https://fabusframes.com/cdn/shop/files/Fabus_White_240x.png?v=1684904672",
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
  },
  {
    name: "Gold Age",
    src: "https://goldage.life/cdn/shop/files/AD906D9D-0C9C-470D-8073-5F2237B44DE7-2_90x.jpg?v=1651237394",
    // JPEGs have no alpha channel — brightness-0 would blacken the whole
    // opaque rectangle instead of just the logo shape, so this one needs
    // the older grayscale-based treatment instead.
    flat: true,
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
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
          Trusted by
        </p>

        {/* flex-wrap + justify-center (instead of a strict grid) so an odd
            leftover item on its own last row centers itself rather than
            sitting stuck in the grid's first column. */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-2 lg:flex-nowrap lg:justify-between">
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
  customer: { name: string; src: string | null; flat?: boolean };
}) {
  return (
    <div className="group relative flex h-16 w-[40%] max-w-[150px] shrink-0 items-center justify-center sm:w-[28%] lg:w-auto lg:flex-1">
      {/* Glass strip — only visible on hover, gives white/light logos a
          surface with enough contrast to actually read against, instead of
          a flat black tile. */}
      <span className="glass-item absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100" />

      {customer.src ? (
        customer.flat ? (
          // No alpha channel (JPEG) — brightness-0 would blacken the whole
          // opaque rectangle, so this falls back to grayscale + dimming.
          <img
            src={customer.src}
            alt={customer.name}
            loading="lazy"
            className="relative z-10 h-9 w-auto max-w-[120px] rounded-md object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          // brightness-0 forces a uniform black silhouette regardless of
          // the source logo's real color (so even a pure-white logo reads
          // as dark grey by default) — opacity then softens it to grey.
          // Hover snaps straight to the real colors, no transition.
          <img
            src={customer.src}
            alt={customer.name}
            loading="lazy"
            className="relative z-10 h-9 w-auto max-w-[120px] object-contain opacity-50 brightness-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:drop-shadow-sm"
          />
        )
      ) : (
        <span className="relative z-10 text-sm font-semibold tracking-tight text-neutral-500 group-hover:text-neutral-950">
          {customer.name}
        </span>
      )}
    </div>
  );
}
