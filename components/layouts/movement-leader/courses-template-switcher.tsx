"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type CoursesVariant =
  | "courses-video-player"
  | "courses-chapter-builder"
  | "courses-lesson-sidebar"
  | "courses-dark-player"
  | "courses-bootcamp-hero"
  | "courses-grid-catalog"
  | "courses-certificate"
  | "courses-quiz-progress"
  | "courses-masterclass-dark"
  | "courses-learning-paths";

interface CoursesTemplateSwitcherProps {
  activeTemplate: CoursesVariant;
  onTemplateChange: (template: CoursesVariant) => void;
}

const templates: Array<{ id: CoursesVariant; name: string; category: "Dark" | "Light" }> = [
  { id: "courses-video-player", name: "Video Player", category: "Light" },
  { id: "courses-chapter-builder", name: "Chapter Builder", category: "Light" },
  { id: "courses-lesson-sidebar", name: "Lesson Sidebar", category: "Light" },
  { id: "courses-dark-player", name: "Dark Player", category: "Dark" },
  { id: "courses-bootcamp-hero", name: "Bootcamp Hero", category: "Dark" },
  { id: "courses-grid-catalog", name: "Grid Catalog", category: "Light" },
  { id: "courses-certificate", name: "Certificate", category: "Light" },
  { id: "courses-quiz-progress", name: "Quiz Progress", category: "Light" },
  { id: "courses-masterclass-dark", name: "Masterclass Dark", category: "Dark" },
  { id: "courses-learning-paths", name: "Learning Paths", category: "Light" },
];

export function CoursesTemplateSwitcher({ activeTemplate, onTemplateChange }: CoursesTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Courses:</span>
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

CoursesTemplateSwitcher.displayName = "CoursesTemplateSwitcher";
