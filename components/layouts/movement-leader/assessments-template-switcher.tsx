"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type AssessmentVariant =
  | "assess-template-picker"
  | "assess-progress-quiz"
  | "assess-mood-gradient"
  | "assess-binary-choice"
  | "assess-dark-intro"
  | "assess-modal-quiz"
  | "assess-scale-options"
  | "assess-nps-scale"
  | "assess-section-intro"
  | "assess-udemy-quiz"
  | "assess-visual-cards"
  | "assess-avatar-survey"
  | "assess-dark-floating"
  | "assess-hubspot-duplicate"
  | "assess-long-form";

interface AssessmentsTemplateSwitcherProps {
  activeTemplate: AssessmentVariant;
  onTemplateChange: (template: AssessmentVariant) => void;
}

const templates: Array<{
  id: AssessmentVariant;
  name: string;
  category: "Light" | "Dark" | "Gradient" | "Overlay" | "Minimal";
}> = [
  { id: "assess-template-picker", name: "Template Picker", category: "Light" },
  { id: "assess-progress-quiz", name: "Progress Quiz", category: "Light" },
  { id: "assess-mood-gradient", name: "Mood Gradient", category: "Gradient" },
  { id: "assess-binary-choice", name: "Binary Choice", category: "Minimal" },
  { id: "assess-dark-intro", name: "Dark Intro", category: "Dark" },
  { id: "assess-modal-quiz", name: "Modal Quiz", category: "Overlay" },
  { id: "assess-scale-options", name: "Scale Options", category: "Light" },
  { id: "assess-nps-scale", name: "NPS Scale", category: "Light" },
  { id: "assess-section-intro", name: "Section Intro", category: "Light" },
  { id: "assess-udemy-quiz", name: "Udemy Quiz", category: "Dark" },
  { id: "assess-visual-cards", name: "Visual Cards", category: "Light" },
  { id: "assess-avatar-survey", name: "Avatar Survey", category: "Light" },
  { id: "assess-dark-floating", name: "Dark Floating", category: "Dark" },
  { id: "assess-hubspot-duplicate", name: "HubSpot Duplicate", category: "Light" },
  { id: "assess-long-form", name: "Long Form", category: "Light" },
];

const categories = ["All", "Light", "Dark", "Gradient", "Overlay", "Minimal"] as const;

export function AssessmentsTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: AssessmentsTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-mvmt-text-muted">
        Assessment:
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

AssessmentsTemplateSwitcher.displayName = "AssessmentsTemplateSwitcher";
