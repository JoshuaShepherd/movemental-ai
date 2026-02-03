"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type PricingVariant =
  | "pricing-comparison-table"
  | "pricing-team-calculator"
  | "pricing-tier-cards"
  | "pricing-partner-steps"
  | "pricing-business-tiers"
  | "pricing-membership-grid";

interface PricingTemplateSwitcherProps {
  activeTemplate: PricingVariant;
  onTemplateChange: (template: PricingVariant) => void;
}

const templates: Array<{ id: PricingVariant; name: string; category: "Light" | "Dark" | "Mixed" }> = [
  { id: "pricing-comparison-table", name: "Comparison Table", category: "Light" },
  { id: "pricing-team-calculator", name: "Team Calculator", category: "Mixed" },
  { id: "pricing-tier-cards", name: "Tier Cards", category: "Dark" },
  { id: "pricing-partner-steps", name: "Partner Steps", category: "Dark" },
  { id: "pricing-business-tiers", name: "Business Tiers", category: "Dark" },
  { id: "pricing-membership-grid", name: "Membership Grid", category: "Dark" },
];

export function PricingTemplateSwitcher({ activeTemplate, onTemplateChange }: PricingTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-mvmt-text-muted">Pricing:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors", "border-mvmt-border-light bg-mvmt-surface-light hover:bg-mvmt-surface-light-muted")}
        >
          {active?.name ?? "Select"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 rounded-md border bg-mvmt-surface-light shadow-lg z-50">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => { onTemplateChange(t.id); setIsOpen(false); }}
                className={cn("w-full text-left px-3 py-2 text-sm transition-colors hover:bg-mvmt-surface-light-muted", t.id === activeTemplate && "bg-mvmt-surface-light-muted font-medium")}
              >
                <span>{t.name}</span>
                <span className="ml-2 text-xs text-mvmt-text-muted">{t.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="text-xs text-mvmt-text-muted">{templates.length} templates</span>
    </div>
  );
}

PricingTemplateSwitcher.displayName = "PricingTemplateSwitcher";
