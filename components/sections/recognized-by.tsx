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
    flat: true,
  },
  {
    name: "Chryso Collections",
    src: null,
  },
];

type Customer = {
  name: string;
  src: string | null;
  flat?: boolean;
};

export function RecognizedBy() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-200/60 py-10 sm:py-14">
      <style>
        {`
          @keyframes recognized-marquee {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .recognized-marquee-track {
            animation: recognized-marquee 26s linear infinite;
            will-change: transform;
          }

          .recognized-marquee:hover .recognized-marquee-track {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .recognized-marquee-track {
              animation: none;
              transform: none;
            }
          }
        `}
      </style>

      <Container>
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
          Trusted by
        </p>

        <div
          className="recognized-marquee relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="recognized-marquee-track flex w-max items-center">
            <LogoRow customers={CUSTOMERS} />
            <LogoRow customers={CUSTOMERS} ariaHidden />
          </div>
        </div>
      </Container>
    </section>
  );
}

function LogoRow({
  customers,
  ariaHidden = false,
}: {
  customers: Customer[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10 lg:gap-12 lg:pr-12"
    >
      {customers.map((customer) => (
        <CustomerLogo
          key={`${ariaHidden ? "duplicate-" : ""}${customer.name}`}
          customer={customer}
        />
      ))}
    </div>
  );
}

function CustomerLogo({ customer }: { customer: Customer }) {
  return (
    <div className="group relative flex h-16 w-[150px] shrink-0 items-center justify-center sm:w-[170px]">
      <span className="glass-item absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

      {customer.src ? (
        customer.flat ? (
          <img
            src={customer.src}
            alt={customer.name}
            loading="lazy"
            className="relative z-10 h-9 w-auto max-w-[120px] rounded-md object-contain opacity-60 grayscale transition-all duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <img
            src={customer.src}
            alt={customer.name}
            loading="lazy"
            className="relative z-10 h-9 w-auto max-w-[120px] object-contain opacity-50 brightness-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:brightness-100 group-hover:drop-shadow-sm"
          />
        )
      ) : (
        <span className="relative z-10 text-sm font-semibold tracking-tight text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-950">
          {customer.name}
        </span>
      )}
    </div>
  );
}
