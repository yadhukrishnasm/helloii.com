export type StepIconName = "install" | "sync" | "chat" | "growth";

export type Step = {
  step: string;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
  icon: StepIconName;
  x: number;
  y: number;
  cardSide: "left" | "right";
  revealAt: number;
};

// Unchanged from the previous how-it-works.tsx — same copy, same accents,
// same x/y placement on the curve, same reveal thresholds.
export const STEPS: Step[] = [
  {
    step: "1",
    title: "Install Helloii AI in one click",
    description: "Add it from Shopify and activate it without code.",
    accent: "#1A56FF",
    accentLight: "#5A9CFF",
    icon: "install",
    x: 50,
    y: 16,
    cardSide: "right",
    revealAt: 0.1,
  },
  {
    step: "2",
    title: "AI automatically learns about your website",
    description:
      "Products, policies, FAQs, and collections are read instantly.",
    accent: "#5B4FFF",
    accentLight: "#8A7FFF",
    icon: "sync",
    x: 20,
    y: 38,
    cardSide: "right",
    revealAt: 0.36,
  },
  {
    step: "3",
    title: "Customers start getting instant resolutions",
    description:
      "Helloii AI responds to customer queries everywhere inside your website.",
    accent: "#8B2FFF",
    accentLight: "#B377FF",
    icon: "chat",
    x: 80,
    y: 62,
    cardSide: "left",
    revealAt: 0.64,
  },
  {
    step: "4",
    title: "Support drops and conversions improve",
    description: "Use chat insights to see where customers hesitate.",
    accent: "#1A56FF",
    accentLight: "#5A9CFF",
    icon: "growth",
    x: 50,
    y: 84,
    cardSide: "left",
    revealAt: 0.9,
  },
];

// Same path data as before — the desktop vertical line's curve, in a
// 0–100 x/y coordinate space matching the scene's square viewBox.
export const DESKTOP_PATH =
  "M50,16 C50,23 20,24 20,38 C20,52 80,48 80,62 C80,76 50,76 50,84";
