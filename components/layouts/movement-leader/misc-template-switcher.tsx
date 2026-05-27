"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type MiscVariant =
  | "cta-bold-banner"
  | "cta-gradient-split"
  | "cta-minimal-centered"
  | "cta-dark-full-width"
  | "cta-social-proof"
  | "orgs-enterprise-trust"
  | "orgs-logo-grid"
  | "orgs-case-study-cards"
  | "orgs-feature-comparison"
  | "orgs-contact-sales";

interface MiscTemplateSwitcherProps {
  activeTemplate: MiscVariant;
  onTemplateChange: (template: MiscVariant) => void;
}

const templates: Array<{ id: MiscVariant; name: string; category: "CTA" | "Orgs" }> = [
  { id: "cta-bold-banner", name: "Bold Banner CTA", category: "CTA" },
  { id: "cta-gradient-split", name: "Gradient Split", category: "CTA" },
  { id: "cta-minimal-centered", name: "Minimal Centered", category: "CTA" },
  { id: "cta-dark-full-width", name: "Dark Full Width", category: "CTA" },
  { id: "cta-social-proof", name: "Social Proof", category: "CTA" },
  { id: "orgs-enterprise-trust", name: "Enterprise Trust", category: "Orgs" },
  { id: "orgs-logo-grid", name: "Logo Grid", category: "Orgs" },
  { id: "orgs-case-study-cards", name: "Case Study Cards", category: "Orgs" },
  { id: "orgs-feature-comparison", name: "Feature Comparison", category: "Orgs" },
  { id: "orgs-contact-sales", name: "Contact Sales", category: "Orgs" },
];

export function MiscTemplateSwitcher({ activeTemplate, onTemplateChange }: MiscTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-mvmt-text-muted">Misc:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors", "border-mvmt-border-light bg-mvmt-surface-light hover:bg-mvmt-surface-light-muted")}
        >
          {active?.name ?? "Select"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 rounded-md border bg-mvmt-surface-light shadow-lg z-50 max-h-80 overflow-y-auto">
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

MiscTemplateSwitcher.displayName = "MiscTemplateSwitcher";
