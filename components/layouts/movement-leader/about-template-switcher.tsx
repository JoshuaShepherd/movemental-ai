"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type AboutVariant =
  | "about-video-bio"
  | "about-team-grid"
  | "about-timeline-story"
  | "about-mission-values"
  | "about-stats-hero"
  | "about-manifesto-dark"
  | "about-split-media"
  | "about-founder-letter";

interface AboutTemplateSwitcherProps {
  activeTemplate: AboutVariant;
  onTemplateChange: (template: AboutVariant) => void;
}

const templates: Array<{
  id: AboutVariant;
  name: string;
  category: "Light" | "Dark" | "Split" | "Minimal";
}> = [
  { id: "about-video-bio", name: "Video Bio", category: "Dark" },
  { id: "about-team-grid", name: "Team Grid", category: "Light" },
  { id: "about-timeline-story", name: "Timeline Story", category: "Dark" },
  { id: "about-mission-values", name: "Mission & Values", category: "Light" },
  { id: "about-stats-hero", name: "Stats Hero", category: "Split" },
  { id: "about-manifesto-dark", name: "Manifesto Dark", category: "Dark" },
  { id: "about-split-media", name: "Split Media", category: "Light" },
  { id: "about-founder-letter", name: "Founder Letter", category: "Minimal" },
];

const categories = ["All", "Light", "Dark", "Split", "Minimal"] as const;

export function AboutTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: AboutTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        About:
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

AboutTemplateSwitcher.displayName = "AboutTemplateSwitcher";
