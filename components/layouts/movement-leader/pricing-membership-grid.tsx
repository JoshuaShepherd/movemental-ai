"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PricingMembershipGridProps {
  className?: string;
}

const plans = [
  { name: "Individual", subtitle: "1 leader, 1 site", price: "$15", selected: false },
  { name: "Duo", subtitle: "1 leader, 2 sites", price: "$20", selected: true, badge: "Best Value" },
  { name: "Family", subtitle: "1 leader, 6 sites", price: "$23", selected: false },
];

const features = [
  { name: "Monthly price (billed annually)", values: ["$15", "$20", "$23"] },
  { name: "Sites you can manage at the same time", values: ["1", "2", "6"], subtext: "Build by yourself or share with team leaders who partner with you." },
  { name: "Add team leaders", values: ["No", "Yes", "Yes"] },
  { name: "Download for offline access", values: ["No", "Yes", "Yes"] },
  { name: "All 150+ courses across 11 categories", values: [true, true, true] },
  { name: "Access to Coaching Sessions (NEW)", values: [true, true, true], highlight: true },
  { name: "Access on any device", values: [true, true, true] },
  { name: "Bonus training guides & content", values: [true, true, true] },
];

/**
 * MasterClass-style dark membership comparison grid with
 * plan selection, feature rows, and red/pink accent.
 * Based on pricing-membership-grid-06.png reference.
 */
export function PricingMembershipGrid({ className }: PricingMembershipGridProps) {
  const [selectedPlan, setSelectedPlan] = useState(1); // Duo default

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark py-16 px-6", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-mvmt-on-dark-primary font-mvmt-heading mb-2">
            Choose an annual membership
          </h1>
          <p className="text-sm text-mvmt-on-dark-muted">
            All membership plans come with a 30-day satisfaction guarantee.
          </p>
        </div>

        {/* Plan headers */}
        <div className="grid grid-cols-4 gap-0 mb-6">
          <div />
          {plans.map((plan, i) => (
            <div key={plan.name} className="text-center px-4">
              {plan.badge && (
                <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-mvmt-accent text-mvmt-cta-text mb-2">
                  {plan.badge}
                </span>
              )}
              <p className="text-sm font-bold text-mvmt-on-dark-primary">{plan.name}</p>
              <p className="text-xs text-mvmt-on-dark-muted mb-3">{plan.subtitle}</p>
              <button
                onClick={() => setSelectedPlan(i)}
                className={cn(
                  "w-full py-2 rounded-md text-sm font-medium transition-colors",
                  i === selectedPlan
                    ? "bg-mvmt-accent text-mvmt-cta-text"
                    : "border border-mvmt-border-on-dark-medium text-mvmt-on-dark-secondary"
                )}
              >
                {i === selectedPlan ? "Selected" : "Select"}
              </button>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-mvmt-accent mb-6" />

        {/* Feature rows */}
        <div className="space-y-0">
          {features.map((feat) => (
            <div
              key={feat.name}
              className={cn(
                "grid grid-cols-4 gap-0 py-4 border-b border-b-mvmt-border-on-dark",
                feat.highlight && "bg-mvmt-surface-dark-elevated rounded-lg"
              )}
            >
              <div className="flex items-start px-2">
                <div>
                  <p className={cn("text-sm text-mvmt-on-dark-primary", feat.highlight && "font-medium")}>
                    {feat.name}
                    {feat.highlight && <span className="ml-2 text-xs font-bold text-mvmt-accent">NEW</span>}
                  </p>
                  {feat.subtext && (
                    <p className="text-xs text-mvmt-on-dark-muted mt-1 leading-relaxed">{feat.subtext}</p>
                  )}
                </div>
              </div>
              {feat.values.map((val, i) => (
                <div key={i} className="flex items-center justify-center">
                  {typeof val === "boolean" ? (
                    <span className="text-mvmt-on-dark-secondary">●</span>
                  ) : (
                    <span className="text-sm text-mvmt-on-dark-secondary">{val}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button className="w-full max-w-md py-3 rounded-full text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

PricingMembershipGrid.displayName = "PricingMembershipGrid";
