"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type HeroVariant =
  | "colorful-headline"
  | "agency-gradient"
  | "centered-product"
  | "centered-serif"
  | "chat-widget"
  | "circular-feature"
  | "clean-minimal"
  | "clean-minimal-alt"
  | "dark-features"
  | "floating-card"
  | "full-bleed"
  | "gradient-illustration"
  | "how-it-works"
  | "image-grid"
  | "pricing-card"
  | "product-showcase"
  | "product-showcase-alt"
  | "split-tabs"
  | "template-preview";

interface TemplateSwitcherProps {
  activeTemplate: HeroVariant;
  onTemplateChange: (template: HeroVariant) => void;
}

const templates: Array<{
  id: HeroVariant;
  name: string;
  category: "Split" | "Gradient" | "Dark" | "Light" | "Overlay" | "Minimal";
}> = [
  { id: "colorful-headline", name: "Colorful Headline", category: "Overlay" },
  { id: "agency-gradient", name: "Agency Gradient", category: "Gradient" },
  { id: "centered-product", name: "Centered Product", category: "Light" },
  { id: "centered-serif", name: "Centered Serif", category: "Light" },
  { id: "chat-widget", name: "Chat Widget", category: "Overlay" },
  { id: "circular-feature", name: "Circular Feature", category: "Light" },
  { id: "clean-minimal", name: "Clean Minimal", category: "Minimal" },
  { id: "clean-minimal-alt", name: "Clean Minimal Alt", category: "Minimal" },
  { id: "dark-features", name: "Dark Features", category: "Dark" },
  { id: "floating-card", name: "Floating Card", category: "Overlay" },
  { id: "full-bleed", name: "Full Bleed", category: "Overlay" },
  { id: "gradient-illustration", name: "Gradient Illustration", category: "Gradient" },
  { id: "how-it-works", name: "How It Works", category: "Light" },
  { id: "image-grid", name: "Image Grid", category: "Dark" },
  { id: "pricing-card", name: "Pricing Card", category: "Dark" },
  { id: "product-showcase", name: "Product Showcase", category: "Overlay" },
  { id: "product-showcase-alt", name: "Product Showcase Alt", category: "Dark" },
  { id: "split-tabs", name: "Split Tabs", category: "Split" },
  { id: "template-preview", name: "Template Preview", category: "Light" },
];

const categories = ["All", "Split", "Gradient", "Dark", "Light", "Overlay", "Minimal"] as const;

export function TemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Template:
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
            {/* Category filter */}
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
            {/* Template list */}
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

TemplateSwitcher.displayName = "TemplateSwitcher";
