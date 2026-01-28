"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type ChatVariant =
  | "chat-support-minimal"
  | "chat-warm-greeting"
  | "chat-panel-sidebar"
  | "chat-widget-popup"
  | "chat-hero-overlay"
  | "chat-assistant-friendly"
  | "chat-dark-sidebar"
  | "chat-split-templates"
  | "chat-team-channels"
  | "chat-suggestion-chips";

interface ChatTemplateSwitcherProps {
  activeTemplate: ChatVariant;
  onTemplateChange: (template: ChatVariant) => void;
}

const templates: Array<{
  id: ChatVariant;
  name: string;
  category: "Minimal" | "Dark" | "Panel" | "Widget" | "Split";
}> = [
  { id: "chat-support-minimal", name: "Support Minimal", category: "Minimal" },
  { id: "chat-warm-greeting", name: "Warm Greeting", category: "Minimal" },
  { id: "chat-panel-sidebar", name: "Panel Sidebar", category: "Panel" },
  { id: "chat-widget-popup", name: "Widget Popup", category: "Widget" },
  { id: "chat-hero-overlay", name: "Hero Overlay", category: "Widget" },
  { id: "chat-assistant-friendly", name: "Assistant Friendly", category: "Panel" },
  { id: "chat-dark-sidebar", name: "Dark Sidebar", category: "Dark" },
  { id: "chat-split-templates", name: "Split Templates", category: "Split" },
  { id: "chat-team-channels", name: "Team Channels", category: "Panel" },
  { id: "chat-suggestion-chips", name: "Suggestion Chips", category: "Minimal" },
];

const categories = ["All", "Minimal", "Dark", "Panel", "Widget", "Split"] as const;

export function ChatTemplateSwitcher({
  activeTemplate,
  onTemplateChange,
}: ChatTemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const active = templates.find((t) => t.id === activeTemplate);

  const filtered = filterCategory === "All"
    ? templates
    : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Chat:
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

ChatTemplateSwitcher.displayName = "ChatTemplateSwitcher";
