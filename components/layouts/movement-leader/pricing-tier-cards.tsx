"use client";

import { cn } from "@/lib/utils";

interface PricingTierCardsProps {
  className?: string;
}

const tiers = [
  {
    name: "Free site",
    price: "$0",
    period: "/mo",
    description: "Unlimited leaders",
    features: [
      "For individual leaders",
      "Content editor",
      "Movemental branding",
      "100 content items",
      "1,000 monthly views",
    ],
    cta: "Try for free",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/mo",
    description: "Per site · Billed yearly",
    features: [
      "For growing ministries",
      "Custom domain",
      "Remove branding",
      "1,000 content items",
      "10,000 monthly views",
    ],
    cta: "Start building",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    description: "Per site · Billed yearly",
    features: [
      "For scaling networks",
      "Site staging",
      "Visitor analytics",
      "10,000 content items",
      "100,000 monthly views",
    ],
    cta: "Start multiplying",
    highlighted: true,
  },
];

/**
 * Framer-style 3-column tier cards with gradient header,
 * feature lists, and highlighted recommended plan.
 * Based on pricing-tier-cards-03.png reference.
 */
export function PricingTierCards({ className }: PricingTierCardsProps) {
  return (
    <section className={cn("relative w-full min-h-screen", className)}>
      {/* Dark gradient header */}
      <div className="bg-mvmt-surface-dark pt-16 pb-32 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-on-dark-primary font-mvmt-heading mb-4">
          Site Pricing
        </h1>
        <p className="text-lg text-mvmt-on-dark-secondary max-w-lg mx-auto">
          Start building your movement site for free. Upgrade to unlock more features.
        </p>
      </div>

      {/* Cards overlapping header */}
      <div className="max-w-5xl mx-auto px-6 -mt-20">
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "rounded-xl p-6 flex flex-col",
                tier.highlighted
                  ? "bg-mvmt-surface-dark text-mvmt-on-dark-primary ring-2 ring-mvmt-accent"
                  : "bg-mvmt-surface-light text-mvmt-text-primary border border-mvmt-border-light shadow-sm"
              )}
            >
              <p className={cn("text-xs font-bold uppercase tracking-wider mb-3", tier.highlighted ? "text-mvmt-accent" : "text-mvmt-accent")}>
                {tier.name}
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className={cn("text-sm", tier.highlighted ? "text-mvmt-on-dark-secondary" : "text-mvmt-text-secondary")}>{tier.period}</span>
              </div>
              <p className={cn("text-xs mb-6", tier.highlighted ? "text-mvmt-on-dark-muted" : "text-mvmt-text-muted")}>
                {tier.description}
              </p>

              <ul className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={cn("flex items-center gap-2 text-sm", tier.highlighted ? "text-mvmt-on-dark-secondary" : "text-mvmt-text-secondary")}>
                    <span className={cn("w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0", tier.highlighted ? "text-mvmt-accent" : "text-mvmt-accent")}>●</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "mt-8 w-full py-3 rounded-lg text-sm font-semibold transition-colors",
                  tier.highlighted
                    ? "bg-mvmt-accent text-mvmt-cta-text"
                    : tier.price === "$0"
                      ? "border border-mvmt-border-medium text-mvmt-text-primary"
                      : "bg-mvmt-accent text-mvmt-cta-text"
                )}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

PricingTierCards.displayName = "PricingTierCards";
