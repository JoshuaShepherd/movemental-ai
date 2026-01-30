"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type FaqVariant =
  | "faq-dark-hero"
  | "faq-minimal-accordion"
  | "faq-categorized-grid"
  | "faq-search-hero"
  | "faq-sidebar-nav"
  | "faq-tabbed-sections"
  | "faq-support-center"
  | "faq-gradient-cards";

interface FaqTemplateSwitcherProps {
  activeTemplate: FaqVariant;
  onTemplateChange: (template: FaqVariant) => void;
}

const templates: Array<{ id: FaqVariant; name: string; category: "Dark" | "Light" }> = [
  { id: "faq-dark-hero", name: "Dark Hero FAQ", category: "Dark" },
  { id: "faq-minimal-accordion", name: "Minimal Accordion", category: "Light" },
  { id: "faq-categorized-grid", name: "Categorized Grid", category: "Light" },
  { id: "faq-search-hero", name: "Search Hero", category: "Light" },
  { id: "faq-sidebar-nav", name: "Sidebar Nav", category: "Light" },
  { id: "faq-tabbed-sections", name: "Tabbed Sections", category: "Light" },
  { id: "faq-support-center", name: "Support Center", category: "Dark" },
  { id: "faq-gradient-cards", name: "Gradient Cards", category: "Dark" },
];

export function FaqTemplateSwitcher({ activeTemplate, onTemplateChange }: FaqTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">FAQ:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors", "border-border bg-background hover:bg-muted")}
        >
          {active?.name ?? "Select"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 rounded-md border bg-background shadow-lg z-50 max-h-80 overflow-y-auto">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => { onTemplateChange(t.id); setIsOpen(false); }}
                className={cn("w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted", t.id === activeTemplate && "bg-muted font-medium")}
              >
                <span>{t.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">{t.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="text-xs text-muted-foreground">{templates.length} templates</span>
    </div>
  );
}

FaqTemplateSwitcher.displayName = "FaqTemplateSwitcher";
