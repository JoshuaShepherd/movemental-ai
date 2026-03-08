"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type SearchVariant =
  | "search-ai-assistant"
  | "search-minimal-centered"
  | "search-resource-hub"
  | "search-faceted-filters"
  | "search-command-palette"
  | "search-discovery-grid"
  | "search-results-list"
  | "search-dark-spotlight"
  | "search-ai-conversational";

interface SearchTemplateSwitcherProps {
  activeTemplate: SearchVariant;
  onTemplateChange: (template: SearchVariant) => void;
}

const templates: Array<{
  id: SearchVariant;
  name: string;
  category: "Light" | "Dark" | "Gradient" | "Overlay";
}> = [
  { id: "search-ai-assistant", name: "AI Assistant", category: "Gradient" },
  { id: "search-minimal-centered", name: "Minimal Centered", category: "Light" },
  { id: "search-resource-hub", name: "Resource Hub", category: "Gradient" },
  { id: "search-faceted-filters", name: "Faceted Filters", category: "Light" },
  { id: "search-command-palette", name: "Command Palette", category: "Overlay" },
  { id: "search-discovery-grid", name: "Discovery Grid", category: "Dark" },
  { id: "search-results-list", name: "Results List", category: "Light" },
  { id: "search-dark-spotlight", name: "Dark Spotlight", category: "Dark" },
  { id: "search-ai-conversational", name: "AI Conversational", category: "Light" },
];

const categories = ["All", "Light", "Dark", "Gradient", "Overlay"] as const;

export function SearchTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: SearchTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-mvmt-text-muted">
        Search:
      </span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors",
            "border-mvmt-border-light bg-mvmt-surface-light hover:bg-mvmt-surface-light-muted"
          )}
        >
          {active?.name ?? "Select"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-72 rounded-md border bg-mvmt-surface-light shadow-lg z-50">
            <div className="flex flex-wrap gap-1 p-2 border-b">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={cn(
                    "px-2 py-1 text-xs rounded transition-colors",
                    filterCategory === cat
                      ? "bg-mvmt-accent text-mvmt-cta-text"
                      : "hover:bg-mvmt-surface-light-muted text-mvmt-text-muted"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onTemplateChange(t.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition-colors hover:bg-mvmt-surface-light-muted",
                    t.id === activeTemplate && "bg-mvmt-surface-light-muted font-medium"
                  )}
                >
                  <span>{t.name}</span>
                  <span className="ml-2 text-xs text-mvmt-text-muted">{t.category}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <span className="text-xs text-mvmt-text-muted">
        {templates.length} templates
      </span>
    </div>
  );
}

SearchTemplateSwitcher.displayName = "SearchTemplateSwitcher";
