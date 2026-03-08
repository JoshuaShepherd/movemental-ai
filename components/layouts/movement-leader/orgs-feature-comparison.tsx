"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface OrgsFeatureComparisonProps {
  className?: string;
}

const features = [
  { name: "Leader seats", standard: "Up to 25", enterprise: "Unlimited" },
  { name: "Content library", standard: "Full access", enterprise: "Full + custom content" },
  { name: "Custom branding", standard: true, enterprise: true },
  { name: "SSO / SAML", standard: false, enterprise: true },
  { name: "Dedicated account manager", standard: false, enterprise: true },
  { name: "API access", standard: false, enterprise: true },
  { name: "Custom integrations", standard: false, enterprise: true },
  { name: "Advanced analytics", standard: "Basic", enterprise: "Full suite" },
  { name: "SLA guarantee", standard: "99.9%", enterprise: "99.99%" },
  { name: "Priority support", standard: false, enterprise: true },
];

/**
 * Enterprise vs Standard feature comparison table —
 * clean light table layout with two plan columns.
 */
export function OrgsFeatureComparison({ className }: OrgsFeatureComparisonProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light py-20 px-6", className)}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-3">
            Plans comparison
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-mvmt-text-primary font-mvmt-heading mb-3">
            Growth vs. Network
          </h2>
          <p className="text-base text-mvmt-text-secondary">
            See what&rsquo;s included at each level.
          </p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-3 gap-0 mb-4 pb-4 border-b border-b-mvmt-border-light">
          <div />
          <div className="text-center">
            <p className="text-sm font-bold text-mvmt-text-primary">Growth</p>
            <p className="text-xs text-mvmt-text-muted">$49/mo</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-mvmt-accent">Network</p>
            <p className="text-xs text-mvmt-text-muted">Custom</p>
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-0">
          {features.map((f) => (
            <div key={f.name} className="grid grid-cols-3 gap-0 py-3 border-b border-b-mvmt-border-light">
              <p className="text-sm font-medium text-mvmt-text-primary">{f.name}</p>
              <div className="flex items-center justify-center">
                {typeof f.standard === "boolean" ? (
                  <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-xs", f.standard ? "bg-mvmt-accent text-mvmt-cta-text" : "bg-mvmt-border-light text-mvmt-text-muted")}>
                    {f.standard ? "✓" : "–"}
                  </span>
                ) : (
                  <span className="text-sm text-mvmt-text-secondary">{f.standard}</span>
                )}
              </div>
              <div className="flex items-center justify-center">
                {typeof f.enterprise === "boolean" ? (
                  <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-xs", f.enterprise ? "bg-mvmt-accent text-mvmt-cta-text" : "bg-mvmt-border-light text-mvmt-text-muted")}>
                    {f.enterprise ? "✓" : "–"}
                  </span>
                ) : (
                  <span className="text-sm text-mvmt-text-secondary">{f.enterprise}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-3 gap-0 mt-8">
          <div />
          <div className="flex justify-center">
            <Link href="/signup" className="px-6 py-2 text-sm font-medium rounded-lg border border-mvmt-border-medium text-mvmt-text-primary">
              Get Growth
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href="/contact" className="px-6 py-2 text-sm font-medium rounded-lg bg-mvmt-accent text-mvmt-cta-text">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

OrgsFeatureComparison.displayName = "OrgsFeatureComparison";
