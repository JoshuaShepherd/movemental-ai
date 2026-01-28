"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type SearchVariant =
  | "search-ai-assistant"
  | "search-minimal-centered"
  | "search-resource-hub";

interface SearchTemplateSwitcherProps {
  activeTemplate: SearchVariant;
  onTemplateChange: (template: SearchVariant) => void;
}

const templates: Array<{ id: SearchVariant; name: string; category: "Gradient" | "Light" }> = [
  { id: "search-ai-assistant", name: "AI Assistant", category: "Gradient" },
  { id: "search-minimal-centered", name: "Minimal Centered", category: "Light" },
  { id: "search-resource-hub", name: "Resource Hub", category: "Gradient" },
];

export function SearchTemplateSwitcher({ activeTemplate, onTemplateChange }: SearchTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Search:</span>
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

SearchTemplateSwitcher.displayName = "SearchTemplateSwitcher";
