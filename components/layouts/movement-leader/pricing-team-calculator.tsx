"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PricingTeamCalculatorProps {
  className?: string;
}

/**
 * Framer-style team pricing with left feature card + right cost calculator.
 * Interactive +/- quantity controls and dynamic total.
 * Based on pricing-team-calculator-02.png reference.
 */
export function PricingTeamCalculator({ className }: PricingTeamCalculatorProps) {
  const [starterQty, setStarterQty] = useState(1);
  const [growthQty, setGrowthQty] = useState(0);
  const [editorsQty, setEditorsQty] = useState(1);

  const total = starterQty * 19 + growthQty * 49 + (editorsQty > 1 ? (editorsQty - 1) * 10 : 0);

  const features = [
    "Team workspace",
    "Collaborate on all plan levels",
    "Shared content library across team",
    "Unlimited viewers",
    "Up to 10 team leaders",
  ];

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-text-primary font-mvmt-heading mb-4">
          Team Pricing
        </h1>
        <p className="text-lg text-mvmt-text-secondary">
          Optionally add leaders to collaborate on ministry sites.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Left card: team editors */}
        <div className="rounded-xl p-8 bg-mvmt-surface-light border border-mvmt-border-light shadow-sm">
          <h3 className="text-lg font-bold text-mvmt-text-primary mb-1">Team leaders</h3>
          <p className="text-3xl font-bold text-mvmt-text-primary mb-2">$10/mo</p>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs px-2 py-0.5 rounded-full border border-mvmt-border-light text-mvmt-text-muted">Per leader</span>
            <span className="text-xs text-mvmt-text-muted">🔄 Billed yearly</span>
          </div>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-mvmt-text-primary">
                <span className="w-5 h-5 rounded-full bg-mvmt-accent text-mvmt-cta-text flex items-center justify-center text-xs flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-8 w-full py-3 rounded-lg text-sm font-semibold bg-mvmt-surface-dark text-mvmt-on-dark-primary">
            Add leaders
          </button>
        </div>

        {/* Right card: cost calculator */}
        <div className="rounded-xl p-8 bg-mvmt-surface-dark text-mvmt-on-dark-primary">
          <h3 className="text-lg font-bold mb-1">Cost calculator</h3>
          <p className="text-3xl font-bold mb-2">${total}/mo</p>
          <p className="text-xs text-mvmt-on-dark-muted mb-8">🔄 Billed yearly</p>

          <div className="space-y-4">
            {/* Starter site */}
            <div className="flex items-center justify-between py-3 border-b border-b-mvmt-border-on-dark">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStarterQty(Math.max(0, starterQty - 1))}
                    className="w-7 h-7 rounded-full border border-mvmt-border-on-dark-medium flex items-center justify-center text-sm text-mvmt-on-dark-secondary"
                  >−</button>
                  <span className="w-8 text-center text-sm font-medium">{starterQty}</span>
                  <button
                    onClick={() => setStarterQty(starterQty + 1)}
                    className="w-7 h-7 rounded-full border border-mvmt-border-on-dark-medium flex items-center justify-center text-sm text-mvmt-on-dark-secondary"
                  >+</button>
                </div>
                <span className="text-sm">Starter site</span>
              </div>
              <span className="text-sm text-mvmt-on-dark-secondary">${starterQty * 19}/mo</span>
            </div>

            {/* Growth site */}
            <div className="flex items-center justify-between py-3 border-b border-b-mvmt-border-on-dark">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGrowthQty(Math.max(0, growthQty - 1))}
                    className="w-7 h-7 rounded-full border border-mvmt-border-on-dark-medium flex items-center justify-center text-sm text-mvmt-on-dark-secondary"
                  >−</button>
                  <span className="w-8 text-center text-sm font-medium">{growthQty}</span>
                  <button
                    onClick={() => setGrowthQty(growthQty + 1)}
                    className="w-7 h-7 rounded-full border border-mvmt-border-on-dark-medium flex items-center justify-center text-sm text-mvmt-on-dark-secondary"
                  >+</button>
                </div>
                <span className="text-sm">Growth site</span>
              </div>
              <span className="text-sm text-mvmt-on-dark-secondary">${growthQty * 49}/mo</span>
            </div>

            {/* Editors */}
            <div className="flex items-center justify-between py-3 border-b border-b-mvmt-border-on-dark">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditorsQty(Math.max(1, editorsQty - 1))}
                    className="w-7 h-7 rounded-full border border-mvmt-border-on-dark-medium flex items-center justify-center text-sm text-mvmt-on-dark-secondary"
                  >−</button>
                  <span className="w-8 text-center text-sm font-medium">{editorsQty}</span>
                  <button
                    onClick={() => setEditorsQty(editorsQty + 1)}
                    className="w-7 h-7 rounded-full border border-mvmt-border-on-dark-medium flex items-center justify-center text-sm text-mvmt-on-dark-secondary"
                  >+</button>
                </div>
                <span className="text-sm">Leaders — first one is free!</span>
              </div>
              <span className="text-sm text-mvmt-on-dark-secondary">${editorsQty > 1 ? (editorsQty - 1) * 10 : 0}/mo</span>
            </div>
          </div>

          <button className="mt-8 w-full py-3 rounded-lg text-sm font-semibold border border-mvmt-border-on-dark-medium text-mvmt-on-dark-primary">
            Manage team
          </button>
        </div>
      </div>
    </section>
  );
}

PricingTeamCalculator.displayName = "PricingTeamCalculator";
