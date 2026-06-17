/**
 * Agent Room — pricing screen SSOT (UI copy and figures).
 * Spoken headlines for the host live in engine `HOST_SCENES.pricing`.
 * Do not change values here without product sign-off.
 */

export const PRICING_REFUSALS = [
  "We don't negotiate the price. It's the same for a 500-person church and a 50,000-member denomination.",
  "We don't gate the methodology. The field guides are free, and any team can run the work itself.",
  "We don't run hidden enterprise tiers. There is no number above what's listed here.",
  "We don't charge per seat. Pricing is by engagement, because per-seat rewards lock-in, not belonging.",
  "We don't use urgency. No limited-time discounts, no \"spots filling fast.\"",
  "We don't pay our network in logos. The movement leaders behind the path are paid through a real agreement, with royalties, available on request.",
] as const;

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

export const PRICING_SAFETY_FREE: PricingWayData = {
  title: "Free, and we guide you.",
  price: "Free · about 1 to 2 months",
  descriptionBefore: "The handbook, ",
  descriptionEmphasis: "It Starts With Safety",
  descriptionAfter:
    ". Your team drafts all five layers, and we guide you when you need it.",
  ctaLabel: "Start free, we'll guide you",
  ctaHref: "/field-guide",
};

export const PRICING_SAFETY_PAID: PricingWayData = {
  title: "We do it with you.",
  price: "$1,000 · two weeks",
  descriptionPlain:
    "We draft all five layers customized to your organization. Your team reviews and ratifies in the dashboard.",
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

export const PRICING_SANDBOX_PAID: PricingWayData = {
  title: "We do it with you.",
  price: "$15,000 · four to six weeks",
  descriptionPlain:
    "About ten hours of in-person teaching across eight phases, learning access, a custom AI recipe library, and dashboard integration. Produces a Future Plan with green, yellow, and red use cases.",
  ctaLabel: "Have us do it · $15,000",
  ctaHref: "/enroll",
  paid: true,
};

export const PRICING_TRAINING_FREE: PricingWayData = {
  title: "Free, and we guide you.",
  price: "[Free entry point to confirm]",
  descriptionPlain:
    "Training has run cohort-only to date. We will confirm the free entry point before publishing a claim here.",
  ctaLabel: "",
  ctaHref: "",
  placeholder: true,
};

export const PRICING_TRAINING_PAID: PricingWayData = {
  title: "We do it with you.",
  price: "$15,000 + $5,000 per year",
  descriptionPlain:
    "An eight-week formation cohort building three capacities: discernment, authorship, and stewardship, in the people who will steward AI inside your organization.",
  ctaLabel: "Talk to us about Training",
  ctaHref: "/enroll",
  paid: true,
};

export const PRICING_TECH_FREE: PricingWayData = {
  title: "Free, and we guide you.",
  price: "[Free entry point to confirm]",
  descriptionPlain:
    "Tech is scoped per engagement. We will confirm the free entry point before publishing a claim here.",
  ctaLabel: "",
  ctaHref: "",
  placeholder: true,
};

export const PRICING_TECH_PAID: PricingWayData = {
  title: "We do it with you.",
  price: "From $30,000 · scoped",
  descriptionPlain:
    "Scoped AI deployment across six configurations, from tool optimization to network-scale work for institutions and denominations.",
  ctaLabel: "Talk to us about Tech",
  ctaHref: "/enroll",
  paid: true,
};
