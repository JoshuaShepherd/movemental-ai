"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type ReaderVariant =
  | "reader-docs-sidebar"
  | "reader-ebook-dark"
  | "reader-article-clean"
  | "reader-highlight-tools"
  | "reader-minimal-scroll"
  | "reader-paginated-book"
  | "reader-chapter-nav"
  | "reader-split-reference"
  | "reader-immersive-dark"
  | "reader-newsletter-digest";

interface ReaderTemplateSwitcherProps {
  activeTemplate: ReaderVariant;
  onTemplateChange: (template: ReaderVariant) => void;
}

const templates: Array<{ id: ReaderVariant; name: string; category: "Light" | "Dark" | "Split" }> = [
  { id: "reader-docs-sidebar", name: "Docs Sidebar", category: "Light" },
  { id: "reader-ebook-dark", name: "Ebook Dark", category: "Dark" },
  { id: "reader-article-clean", name: "Article Clean", category: "Light" },
  { id: "reader-highlight-tools", name: "Highlight Tools", category: "Light" },
  { id: "reader-minimal-scroll", name: "Minimal Scroll", category: "Light" },
  { id: "reader-paginated-book", name: "Paginated Book", category: "Light" },
  { id: "reader-chapter-nav", name: "Chapter Nav", category: "Light" },
  { id: "reader-split-reference", name: "Split Reference", category: "Split" },
  { id: "reader-immersive-dark", name: "Immersive Dark", category: "Dark" },
  { id: "reader-newsletter-digest", name: "Newsletter Digest", category: "Light" },
];

export function ReaderTemplateSwitcher({ activeTemplate, onTemplateChange }: ReaderTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-mvmt-text-muted">Reader:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors", "border-mvmt-border-light bg-mvmt-surface-light hover:bg-mvmt-surface-light-muted")}
        >
          {active?.name ?? "Select"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 rounded-md border bg-mvmt-surface-light shadow-lg z-50 max-h-80 overflow-y-auto">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => { onTemplateChange(t.id); setIsOpen(false); }}
                className={cn("w-full text-left px-3 py-2 text-sm transition-colors hover:bg-mvmt-surface-light-muted", t.id === activeTemplate && "bg-mvmt-surface-light-muted font-medium")}
              >
                <span>{t.name}</span>
                <span className="ml-2 text-xs text-mvmt-text-muted">{t.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="text-xs text-mvmt-text-muted">{templates.length} templates</span>
    </div>
  );
}

ReaderTemplateSwitcher.displayName = "ReaderTemplateSwitcher";
