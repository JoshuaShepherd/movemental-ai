"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type MiscVariant =
  | "about-video-bio"
  | "cta-bold-banner"
  | "orgs-enterprise-trust";

interface MiscTemplateSwitcherProps {
  activeTemplate: MiscVariant;
  onTemplateChange: (template: MiscVariant) => void;
}

const templates: Array<{ id: MiscVariant; name: string; category: "Dark" | "Light" }> = [
  { id: "about-video-bio", name: "Video Bio", category: "Dark" },
  { id: "cta-bold-banner", name: "Bold Banner CTA", category: "Light" },
  { id: "orgs-enterprise-trust", name: "Enterprise Trust", category: "Dark" },
];

export function MiscTemplateSwitcher({ activeTemplate, onTemplateChange }: MiscTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Misc:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors", "border-border bg-background hover:bg-muted")}
        >
          {active?.name ?? "Select"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 rounded-md border bg-background shadow-lg z-50">
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

MiscTemplateSwitcher.displayName = "MiscTemplateSwitcher";
