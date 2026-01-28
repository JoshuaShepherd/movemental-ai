"use client";

import { cn } from "@/lib/utils";

interface ContentTemplateShowcaseProps {
  className?: string;
}

/**
 * Template Showcase — Framer-style 4-col template cards with price
 * Light bg, heading, 4-col grid of template preview cards with name, category, free label
 */
export function ContentTemplateShowcase({ className }: ContentTemplateShowcaseProps) {
  const templates = [
    { name: "Movement Catalyst Kit", category: "Starter", color: "#EEF2FF" },
    { name: "Discipleship Pathway", category: "Formation", color: "#F0FDF4" },
    { name: "Church Plant Dashboard", category: "Analytics", color: "#FFF7ED" },
    { name: "Coaching Session Tracker", category: "Coaching", color: "#FDF2F8" },
    { name: "Community Health Report", category: "Analytics", color: "#F5F3FF" },
    { name: "Leader Pipeline Board", category: "Leadership", color: "#ECFDF5" },
    { name: "Network Overview", category: "Starter", color: "#FEF3C7" },
    { name: "Multiplication Scorecard", category: "Analytics", color: "#FCE7F3" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Templates
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
            Jump-start your movement infrastructure with ready-made templates built by practitioners.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {templates.map((tpl) => (
            <div key={tpl.name} className="rounded-xl overflow-hidden cursor-pointer group" style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}>
              <div className="h-44 w-full" style={{ backgroundColor: tpl.color }} />
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1" style={{ color: "var(--mvmt-text-primary)" }}>{tpl.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--mvmt-text-secondary)" }}>{tpl.category}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--mvmt-accent)" }}>Free</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentTemplateShowcase.displayName = "ContentTemplateShowcase";
