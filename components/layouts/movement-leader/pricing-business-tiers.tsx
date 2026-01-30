"use client";

import { cn } from "@/lib/utils";

interface PricingBusinessTiersProps {
  className?: string;
}

const categories = [
  {
    icon: "⚡",
    title: "Features",
    items: [
      "No hard hosting limits",
      "Reverse proxy support",
      "Premium infrastructure",
      "Custom application limits",
    ],
  },
  {
    icon: "🛡️",
    title: "Services",
    items: [
      "Onboarding",
      "Launch support",
      "SEO & Performance audit",
      "Dedicated Slack channel",
    ],
  },
  {
    icon: "💜",
    title: "Contract",
    items: [
      "Ministry contract",
      "Consolidated yearly billing",
      "Confidentiality agreement",
      "SOC2 and security compliance",
    ],
  },
];

/**
 * Framer-style dark business/enterprise tier page with description text,
 * 3 feature category cards with icon headers, and upgrade CTA.
 * Based on pricing-business-tiers-05.png reference.
 */
export function PricingBusinessTiers({ className }: PricingBusinessTiersProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark py-16 px-6", className)}>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-mvmt-on-dark-primary font-mvmt-heading mb-4">
          Network Plan
        </h1>
        <p className="text-lg leading-relaxed text-mvmt-on-dark-secondary">
          is a mutual relationship that offers peace of mind in building and running your movement site.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="rounded-xl p-6 border border-mvmt-border-on-dark bg-mvmt-surface-dark-elevated"
          >
            <div className="w-10 h-10 rounded-lg bg-mvmt-accent/20 flex items-center justify-center text-xl mb-4">
              {cat.icon}
            </div>
            <h3 className="text-base font-bold text-mvmt-on-dark-primary mb-4">{cat.title}</h3>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-mvmt-on-dark-secondary">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs text-mvmt-accent flex-shrink-0">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="px-8 py-3 rounded-full text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
          Upgrade to Network
        </button>
      </div>
    </section>
  );
}

PricingBusinessTiers.displayName = "PricingBusinessTiers";
