"use client";

import { cn } from "@/lib/utils";

interface PricingComparisonTableProps {
  className?: string;
}

const plans = [
  { name: "Free", price: "$0/mo", accent: false },
  { name: "Starter", price: "$19/mo", accent: true },
  { name: "Growth", price: "$49/mo", accent: true },
  { name: "Network", price: "Custom", accent: false },
];

const sections = [
  {
    title: "Platform",
    rows: [
      { feature: "Leaders supported", values: ["5", "25", "Unlimited", "Custom"] },
      { feature: "Content library", values: ["Basic", "Full", "Full", "Full + Custom"] },
      { feature: "Storage", values: ["1 GB", "10 GB", "100 GB", "Custom"] },
      { feature: "SSL Certificate", values: ["Included", "Included", "Included", "Included"] },
      { feature: "Custom domain", values: [false, true, true, true] },
    ],
  },
  {
    title: "Courses & Content",
    rows: [
      { feature: "Course creation", values: [true, true, true, true] },
      { feature: "Assessment builder", values: [true, true, true, true] },
      { feature: "AI content assistant", values: [false, true, true, true] },
      { feature: "Cohort management", values: [false, false, true, true] },
      { feature: "White-label branding", values: [false, false, true, true] },
    ],
  },
];

/**
 * Framer-style feature comparison table with 4 plan columns,
 * grouped feature rows, and check/text values.
 * Based on pricing-comparison-table-01.png reference.
 */
export function PricingComparisonTable({ className }: PricingComparisonTableProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        {/* Plan headers */}
        <div className="grid grid-cols-5 gap-0 mb-8">
          <div className="py-4">
            <h2 className="text-lg font-bold text-mvmt-text-primary">Site plans</h2>
          </div>
          {plans.map((plan) => (
            <div key={plan.name} className="py-4 text-center">
              <p className={cn("text-sm font-bold", plan.accent ? "text-mvmt-accent" : "text-mvmt-text-primary")}>
                {plan.name}
              </p>
              <p className={cn("text-sm", plan.accent ? "text-mvmt-accent" : "text-mvmt-text-secondary")}>
                {plan.price}
              </p>
            </div>
          ))}
        </div>

        {/* Feature sections */}
        {sections.map((section) => (
          <div key={section.title} className="mb-10">
            <p className="text-sm italic text-mvmt-text-muted mb-4 border-b border-b-mvmt-border-light pb-2">
              {section.title}
            </p>
            <div className="space-y-0">
              {section.rows.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-5 gap-0 py-3 border-b border-b-mvmt-border-light"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-mvmt-text-primary">{row.feature}</span>
                  </div>
                  {row.values.map((val, i) => (
                    <div key={i} className="flex items-center justify-center">
                      {typeof val === "boolean" ? (
                        <span
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                            val
                              ? "bg-mvmt-accent text-mvmt-cta-text"
                              : "bg-mvmt-border-light text-mvmt-text-muted"
                          )}
                        >
                          {val ? "✓" : "–"}
                        </span>
                      ) : (
                        <span className="text-sm text-mvmt-text-secondary">{val}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA row */}
        <div className="grid grid-cols-5 gap-0 mt-8">
          <div />
          {plans.map((plan) => (
            <div key={plan.name} className="flex justify-center">
              <button
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-colors",
                  plan.accent
                    ? "bg-mvmt-accent text-mvmt-cta-text"
                    : "border border-mvmt-border-medium text-mvmt-text-primary"
                )}
              >
                {plan.name === "Network" ? "Contact us" : plan.price === "$0/mo" ? "Try for free" : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

PricingComparisonTable.displayName = "PricingComparisonTable";
