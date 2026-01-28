"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type ArticlesVariant =
  | "art-help-center"
  | "art-case-study"
  | "art-guide-hero"
  | "art-dark-case-study"
  | "art-bold-header"
  | "art-colorful-sidebar"
  | "art-bold-editorial"
  | "art-clean-longform"
  | "art-faq-accordion"
  | "art-stats-highlight"
  | "art-docs-sidebar"
  | "art-blockquote-editorial";

interface ArticlesTemplateSwitcherProps {
  activeTemplate: ArticlesVariant;
  onTemplateChange: (template: ArticlesVariant) => void;
}

const templates: Array<{
  id: ArticlesVariant;
  name: string;
  category: "Light" | "Dark" | "Gradient" | "Split" | "Minimal";
}> = [
  { id: "art-help-center", name: "Help Center", category: "Light" },
  { id: "art-case-study", name: "Case Study", category: "Light" },
  { id: "art-guide-hero", name: "Guide Hero", category: "Split" },
  { id: "art-dark-case-study", name: "Dark Case Study", category: "Dark" },
  { id: "art-bold-header", name: "Bold Header", category: "Gradient" },
  { id: "art-colorful-sidebar", name: "Colorful Sidebar", category: "Light" },
  { id: "art-bold-editorial", name: "Bold Editorial", category: "Dark" },
  { id: "art-clean-longform", name: "Clean Longform", category: "Minimal" },
  { id: "art-faq-accordion", name: "FAQ Accordion", category: "Minimal" },
  { id: "art-stats-highlight", name: "Stats Highlight", category: "Gradient" },
  { id: "art-docs-sidebar", name: "Docs Sidebar", category: "Light" },
  { id: "art-blockquote-editorial", name: "Blockquote Editorial", category: "Split" },
];

const categories = ["All", "Light", "Dark", "Gradient", "Split", "Minimal"] as const;

export function ArticlesTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: ArticlesTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Article:
      </span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors",
            "border-border bg-background hover:bg-muted"
          )}
        >
          {active?.name ?? "Select"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-72 rounded-md border bg-background shadow-lg z-50">
            <div className="flex flex-wrap gap-1 p-2 border-b">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={cn(
                    "px-2 py-1 text-xs rounded transition-colors",
                    filterCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground"
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
                    "w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted",
                    t.id === activeTemplate && "bg-muted font-medium"
                  )}
                >
                  <span>{t.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{t.category}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <span className="text-xs text-muted-foreground">
        {templates.length} templates
      </span>
    </div>
  );
}

ArticlesTemplateSwitcher.displayName = "ArticlesTemplateSwitcher";
