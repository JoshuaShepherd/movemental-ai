"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type TestimonialsVariant =
  | "testimonials-quote-hero"
  | "testimonials-split-tweets"
  | "testimonials-masonry-grid"
  | "testimonials-carousel-hero"
  | "testimonials-elegant-serif"
  | "testimonials-dark-blockquote"
  | "testimonials-geometric-carousel"
  | "testimonials-split-cta"
  | "testimonials-dramatic-dark"
  | "testimonials-image-overlay"
  | "testimonials-grid-cards"
  | "testimonials-instructor-dark"
  | "testimonials-trust-logos";

interface TestimonialsTemplateSwitcherProps {
  activeTemplate: TestimonialsVariant;
  onTemplateChange: (template: TestimonialsVariant) => void;
}

const templates: Array<{
  id: TestimonialsVariant;
  name: string;
  category: "Light" | "Dark" | "Overlay";
}> = [
  { id: "testimonials-quote-hero", name: "Quote Hero", category: "Dark" },
  { id: "testimonials-split-tweets", name: "Split Tweets", category: "Light" },
  { id: "testimonials-masonry-grid", name: "Masonry Grid", category: "Light" },
  { id: "testimonials-carousel-hero", name: "Carousel Hero", category: "Dark" },
  { id: "testimonials-elegant-serif", name: "Elegant Serif", category: "Light" },
  { id: "testimonials-dark-blockquote", name: "Dark Blockquote", category: "Dark" },
  { id: "testimonials-geometric-carousel", name: "Geometric Carousel", category: "Dark" },
  { id: "testimonials-split-cta", name: "Split CTA", category: "Light" },
  { id: "testimonials-dramatic-dark", name: "Dramatic Dark", category: "Dark" },
  { id: "testimonials-image-overlay", name: "Image Overlay", category: "Overlay" },
  { id: "testimonials-grid-cards", name: "Grid Cards", category: "Light" },
  { id: "testimonials-instructor-dark", name: "Instructor Dark", category: "Dark" },
  { id: "testimonials-trust-logos", name: "Trust Logos", category: "Dark" },
];

const categories = ["All", "Light", "Dark", "Overlay"] as const;

export function TestimonialsTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: TestimonialsTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Testimonials:
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

TestimonialsTemplateSwitcher.displayName = "TestimonialsTemplateSwitcher";
