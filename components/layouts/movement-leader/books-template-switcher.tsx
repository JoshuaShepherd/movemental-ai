"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type BooksVariant =
  | "books-product-showcase"
  | "books-spec-cards"
  | "books-filtered-grid"
  | "books-detail-cart"
  | "books-minimal-grid"
  | "books-related-products"
  | "books-detail-clean"
  | "books-detail-split"
  | "books-detail-modal";

interface BooksTemplateSwitcherProps {
  activeTemplate: BooksVariant;
  onTemplateChange: (template: BooksVariant) => void;
}

const templates: Array<{
  id: BooksVariant;
  name: string;
  category: "Light" | "Dark" | "Overlay" | "Minimal";
}> = [
  { id: "books-product-showcase", name: "Product Showcase", category: "Light" },
  { id: "books-spec-cards", name: "Spec Cards", category: "Light" },
  { id: "books-filtered-grid", name: "Filtered Grid", category: "Light" },
  { id: "books-detail-cart", name: "Detail + Cart", category: "Dark" },
  { id: "books-minimal-grid", name: "Minimal Grid", category: "Minimal" },
  { id: "books-related-products", name: "Related Products", category: "Light" },
  { id: "books-detail-clean", name: "Detail Clean", category: "Light" },
  { id: "books-detail-split", name: "Detail Split", category: "Light" },
  { id: "books-detail-modal", name: "Detail Modal", category: "Overlay" },
];

const categories = ["All", "Light", "Dark", "Overlay", "Minimal"] as const;

export function BooksTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: BooksTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-mvmt-text-muted">
        Books:
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

BooksTemplateSwitcher.displayName = "BooksTemplateSwitcher";
