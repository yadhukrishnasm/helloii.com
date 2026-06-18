const LOGOS = [
  { src: "https://helloii.com/assets/images/v2/b_v2_1.png", alt: "Partner badge 1" },
  { src: "https://helloii.com/assets/images/v2/b_v2_2.png", alt: "Partner badge 2" },
  { src: "https://helloii.com/assets/images/v2/b_v2_3.png", alt: "Partner badge 3" },
  { src: "https://helloii.com/assets/images/v2/b_v2_4.png", alt: "Partner badge 4" },
  { src: "https://helloii.com/assets/images/v2/b_v2_5.png", alt: "Partner badge 5" },
];

// Repeat 4× per half so one set ≥ 3200 px — always wider than any viewport.
// The CSS animation runs translateX(0 → -50%), where -50% = exactly one half.
const SET = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

export function RecognizedBy() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-200/60 py-10 sm:py-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
          Recognised by
        </p>
      </div>

      {/* Outer clip */}
      <div className="relative overflow-hidden">
        {/* Fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#f8f9fc] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#f8f9fc] to-transparent" />

        {/*
          Two halves, each containing SET (4 repeats of LOGOS).
          One half width ≥ 3200 px → safely wider than any viewport.
          translateX(-50%) lands exactly at the start of the second half → seamless.
        */}
        <div className="marquee-track flex w-max items-center">
          <div className="flex shrink-0 items-center gap-10 pr-10">
            {SET.map((logo, i) => (
              <LogoBadge key={`a-${i}`} logo={logo} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-10 pr-10">
            {SET.map((logo, i) => (
              <LogoBadge key={`b-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoBadge({ logo }: { logo: { src: string; alt: string } }) {
  return (
    <div className="glass-item flex h-16 w-36 shrink-0 items-center justify-center rounded-2xl px-4">
      <img
        src={logo.src}
        alt={logo.alt}
        className="h-10 w-auto object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
        loading="lazy"
      />
    </div>
  );
}
