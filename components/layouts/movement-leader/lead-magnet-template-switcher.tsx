"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type LeadMagnetVariant =
  | "lead-magnet-split-form"
  | "lead-magnet-book-preview"
  | "lead-magnet-guide-simple"
  | "lead-magnet-dark-resources"
  | "lead-magnet-share-invite"
  | "lead-magnet-ebook-preview"
  | "lead-magnet-checklist"
  | "lead-magnet-webinar"
  | "lead-magnet-toolkit"
  | "lead-magnet-dark-minimal";

interface LeadMagnetTemplateSwitcherProps {
  activeTemplate: LeadMagnetVariant;
  onTemplateChange: (template: LeadMagnetVariant) => void;
}

const templates: Array<{ id: LeadMagnetVariant; name: string; category: "Light" | "Dark" }> = [
  { id: "lead-magnet-split-form", name: "Split Form", category: "Light" },
  { id: "lead-magnet-book-preview", name: "Book Preview", category: "Light" },
  { id: "lead-magnet-guide-simple", name: "Guide Simple", category: "Light" },
  { id: "lead-magnet-dark-resources", name: "Dark Resources", category: "Dark" },
  { id: "lead-magnet-share-invite", name: "Share Invite", category: "Dark" },
  { id: "lead-magnet-ebook-preview", name: "Ebook Preview", category: "Light" },
  { id: "lead-magnet-checklist", name: "Checklist", category: "Light" },
  { id: "lead-magnet-webinar", name: "Webinar", category: "Dark" },
  { id: "lead-magnet-toolkit", name: "Toolkit", category: "Light" },
  { id: "lead-magnet-dark-minimal", name: "Dark Minimal", category: "Dark" },
];

export function LeadMagnetTemplateSwitcher({ activeTemplate, onTemplateChange }: LeadMagnetTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Lead Magnet:</span>
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

LeadMagnetTemplateSwitcher.displayName = "LeadMagnetTemplateSwitcher";
