"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type SpecialVariant =
  | "special-network-map"
  | "special-timeline"
  | "special-check-inbox"
  | "special-editor"
  | "special-founder-story"
  | "special-course-transcript"
  | "special-youre-in";

interface SpecialTemplateSwitcherProps {
  activeTemplate: SpecialVariant;
  onTemplateChange: (template: SpecialVariant) => void;
}

const templates: Array<{
  id: SpecialVariant;
  name: string;
  category: "Light" | "Dark" | "Utility";
}> = [
  { id: "special-network-map", name: "Network Map", category: "Light" },
  { id: "special-timeline", name: "Timeline", category: "Light" },
  { id: "special-check-inbox", name: "Check Inbox", category: "Utility" },
  { id: "special-editor", name: "Editor", category: "Light" },
  { id: "special-founder-story", name: "Founder Story", category: "Dark" },
  { id: "special-course-transcript", name: "Course Transcript", category: "Light" },
  { id: "special-youre-in", name: "You're In", category: "Dark" },
];

const categories = ["All", "Light", "Dark", "Utility"] as const;

export function SpecialTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: SpecialTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-mvmt-text-muted">
        Special:
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

SpecialTemplateSwitcher.displayName = "SpecialTemplateSwitcher";
