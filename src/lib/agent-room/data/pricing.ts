/**
 * Agent Room — pricing screen SSOT (UI copy and figures).
 * Spoken headlines for the host live in engine `HOST_SCENES.pricing`.
 * Do not change values here without product sign-off.
 */

export type PricingWayData = {
  title: string;
  price: string;
  descriptionEmphasis?: string;
  descriptionBefore?: string;
  descriptionAfter?: string;
  descriptionPlain?: string;
  ctaLabel: string;
  ctaHref: string;
  paid?: boolean;
  placeholder?: boolean;
};

export type TechModulePricing = {
  name: string;
  price: string;
  description: string;
};

export const PRICING_SAFETY_FREE: PricingWayData = {
  title: "Free, and we guide you.",
  price: "Free · about 1 to 2 months, self-paced",
  descriptionBefore: "The handbook, ",
  descriptionEmphasis: "It Starts With Safety",
  descriptionAfter:
    ". Your team drafts all five layers, and we guide you when you need it.",
  ctaLabel: "Start free, we'll guide you",
  ctaHref: "/field-guide",
};

export const PRICING_SAFETY_PAID: PricingWayData = {
  title: "We do it with you.",
  price: "$1,000 · two weeks, start to finish",
  descriptionPlain:
    "We draft all five layers customized to your organization. Your team reviews and ratifies in the dashboard. The full step takes two weeks from kickoff to board-ready charter.",
  ctaLabel: "Have us do it · $1,000",
  ctaHref: "/enroll",
  paid: true,
};

export const PRICING_SANDBOX_FREE: PricingWayData = {
  title: "Free, and we guide you.",
  price: "Free · self-paced",
  descriptionBefore: "The field guide, ",
  descriptionEmphasis: "It Continues With Exploration",
  descriptionAfter:
    ". Your team runs the eight phases, and we guide you when you need it.",
  ctaLabel: "Start free, we'll guide you",
  ctaHref: "/field-guide?guide=sandbox",
};

export const PRICING_SANDBOX_DIGITAL: PricingWayData = {
  title: "Digital license.",
  price: "$5,000 · one-time · lifetime access",
  descriptionPlain:
    "The full Sandbox toolkit in your dashboard: eight phases, results, and ongoing management. One payment, lifetime access to your organization's record.",
  ctaLabel: "Get the digital license · $5,000",
  ctaHref: "/enroll",
  paid: true,
};

export const PRICING_SANDBOX_IN_PERSON: PricingWayData = {
  title: "Hands-on, in person.",
  price: "~$15,000 · facilitated",
  descriptionPlain:
    "About ten hours of in-person teaching across eight phases, learning access, a custom AI recipe library, and dashboard integration. Produces a Future Plan with green, yellow, and red use cases.",
  ctaLabel: "Have us facilitate · ~$15,000",
  ctaHref: "/enroll",
  paid: true,
};

export const PRICING_TRAINING_FREE: PricingWayData = {
  title: "Free, and we guide you.",
  price: "Field guide · coming soon",
  descriptionPlain:
    "Every stage has a free field guide. Training's guide is in progress. Until it ships, the paid cohort runs through Movemental's LMS.",
  ctaLabel: "",
  ctaHref: "",
  placeholder: true,
};

export const PRICING_TRAINING_PAID: PricingWayData = {
  title: "Eight-week cohort.",
  price: "$2,000 per person · 8 weeks · online",
  descriptionPlain:
    "A transformative eight-week course through Movemental's LMS, building discernment, authorship, and stewardship in the people who will steward AI inside your organization.",
  ctaLabel: "Talk to us about Training",
  ctaHref: "/enroll",
  paid: true,
};

export const PRICING_TECH_FREE: PricingWayData = {
  title: "Free, and we guide you.",
  price: "Field guide · coming soon",
  descriptionPlain:
    "Every stage has a free field guide. Tech's guide is in progress. Until it ships, start with the modular builds below.",
  ctaLabel: "",
  ctaHref: "",
  placeholder: true,
};

export const PRICING_TECH_MODULES: readonly TechModulePricing[] = [
  {
    name: "Foundation",
    price: "Built in",
    description:
      "The spine of every platform: website, accounts, library, governance, and AI assistant. Included in every Tech engagement.",
  },
  {
    name: "Publishing",
    price: "$30,000",
    description:
      "Your public face and the tools to run it, with full agentic implementation custom to your organization.",
  },
  {
    name: "Formation",
    price: "$30,000",
    description:
      "Courses, cohorts, and learning paths — how you form and teach people inside your platform.",
  },
  {
    name: "Relationships",
    price: "$30,000",
    description:
      "People, giving, and operations in one place — donor stewardship, member care, and staff workflows.",
  },
] as const;

/** Column header copy for the pricing accordion — derived from tier prices above. */
export type PricingStageHeader = {
  id: "safety" | "sandbox" | "training" | "tech";
  step: string;
  title: string;
  priceLine: string;
  descriptor: string;
};

export const PRICING_STAGE_HEADERS: readonly PricingStageHeader[] = [
  {
    id: "safety",
    step: "01",
    title: "Safety",
    priceLine: `${PRICING_SAFETY_FREE.price.split("·")[0]?.trim()} · ${PRICING_SAFETY_PAID.price.split("·")[0]?.trim()}`,
    descriptor: "Ratify your AI Charter before anything else.",
  },
  {
    id: "sandbox",
    step: "02",
    title: "Sandbox",
    priceLine: `${PRICING_SANDBOX_FREE.price.split("·")[0]?.trim()} · ${PRICING_SANDBOX_DIGITAL.price.split("·")[0]?.trim()}`,
    descriptor: "Try AI against real work inside your charter.",
  },
  {
    id: "training",
    step: "03",
    title: "Training",
    priceLine: `${PRICING_TRAINING_FREE.price} · ${PRICING_TRAINING_PAID.price.split("·")[0]?.trim()}`,
    descriptor: "Form the people who will steward AI inside your org.",
  },
  {
    id: "tech",
    step: "04",
    title: "Technology",
    priceLine: `${PRICING_TECH_MODULES[1]!.price} modules · Foundation built in`,
    descriptor: "Build only what your ratified foundation supports.",
  },
] as const;
