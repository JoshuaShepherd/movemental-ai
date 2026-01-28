"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type ContentVariant =
  | "cnt-accordion-features"
  | "cnt-case-studies"
  | "cnt-resource-cards"
  | "cnt-category-blog"
  | "cnt-integration-guides"
  | "cnt-component-gallery"
  | "cnt-dark-browse"
  | "cnt-dark-personalized"
  | "cnt-dark-recordings"
  | "cnt-feature-preview"
  | "cnt-video-tutorials"
  | "cnt-toc-illustrated"
  | "cnt-template-showcase"
  | "cnt-resource-hub"
  | "cnt-docs-grid"
  | "cnt-training-resources"
  | "cnt-product-carousel"
  | "cnt-instructor-courses"
  | "cnt-filtered-gallery"
  | "cnt-lesson-list";

interface ContentTemplateSwitcherProps {
  activeTemplate: ContentVariant;
  onTemplateChange: (template: ContentVariant) => void;
}

const templates: Array<{
  id: ContentVariant;
  name: string;
  category: "Light" | "Dark" | "Minimal";
}> = [
  { id: "cnt-accordion-features", name: "Accordion Features", category: "Minimal" },
  { id: "cnt-case-studies", name: "Case Studies", category: "Light" },
  { id: "cnt-resource-cards", name: "Resource Cards", category: "Light" },
  { id: "cnt-category-blog", name: "Category Blog", category: "Light" },
  { id: "cnt-integration-guides", name: "Integration Guides", category: "Light" },
  { id: "cnt-component-gallery", name: "Component Gallery", category: "Minimal" },
  { id: "cnt-dark-browse", name: "Dark Browse", category: "Dark" },
  { id: "cnt-dark-personalized", name: "Dark Personalized", category: "Dark" },
  { id: "cnt-dark-recordings", name: "Dark Recordings", category: "Dark" },
  { id: "cnt-feature-preview", name: "Feature Preview", category: "Light" },
  { id: "cnt-video-tutorials", name: "Video Tutorials", category: "Light" },
  { id: "cnt-toc-illustrated", name: "TOC Illustrated", category: "Light" },
  { id: "cnt-template-showcase", name: "Template Showcase", category: "Light" },
  { id: "cnt-resource-hub", name: "Resource Hub", category: "Light" },
  { id: "cnt-docs-grid", name: "Docs Grid", category: "Minimal" },
  { id: "cnt-training-resources", name: "Training Resources", category: "Light" },
  { id: "cnt-product-carousel", name: "Product Carousel", category: "Light" },
  { id: "cnt-instructor-courses", name: "Instructor Courses", category: "Light" },
  { id: "cnt-filtered-gallery", name: "Filtered Gallery", category: "Light" },
  { id: "cnt-lesson-list", name: "Lesson List", category: "Light" },
];

const categories = ["All", "Light", "Dark", "Minimal"] as const;

export function ContentTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: ContentTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Content:
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

ContentTemplateSwitcher.displayName = "ContentTemplateSwitcher";
