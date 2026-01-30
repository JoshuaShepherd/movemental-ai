"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type AuthVariant =
  | "auth-split-image"
  | "auth-centered-card"
  | "auth-dark-minimal"
  | "auth-social-first"
  | "auth-branded-hero"
  | "auth-magic-link"
  | "auth-tabbed-form"
  | "auth-gradient-overlay";

interface AuthTemplateSwitcherProps {
  activeTemplate: AuthVariant;
  onTemplateChange: (template: AuthVariant) => void;
}

const templates: Array<{
  id: AuthVariant;
  name: string;
  category: "Light" | "Dark" | "Split" | "Gradient";
}> = [
  { id: "auth-split-image", name: "Split Image", category: "Split" },
  { id: "auth-centered-card", name: "Centered Card", category: "Light" },
  { id: "auth-dark-minimal", name: "Dark Minimal", category: "Dark" },
  { id: "auth-social-first", name: "Social First", category: "Light" },
  { id: "auth-branded-hero", name: "Branded Hero", category: "Split" },
  { id: "auth-magic-link", name: "Magic Link", category: "Dark" },
  { id: "auth-tabbed-form", name: "Tabbed Form", category: "Light" },
  { id: "auth-gradient-overlay", name: "Gradient Overlay", category: "Gradient" },
];

const categories = ["All", "Light", "Dark", "Split", "Gradient"] as const;

export function AuthTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: AuthTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Auth:
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

AuthTemplateSwitcher.displayName = "AuthTemplateSwitcher";
