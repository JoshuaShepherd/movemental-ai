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
    { name: "Movement Catalyst Kit", category: "Starter", colorVar: "--mvmt-card-decorative-2" },
    { name: "Discipleship Pathway", category: "Formation", colorVar: "--mvmt-card-decorative-4" },
    { name: "Church Plant Dashboard", category: "Analytics", colorVar: "--mvmt-card-decorative-5" },
    { name: "Coaching Session Tracker", category: "Coaching", colorVar: "--mvmt-card-decorative-3" },
    { name: "Community Health Report", category: "Analytics", colorVar: "--mvmt-card-decorative-2" },
    { name: "Leader Pipeline Board", category: "Leadership", colorVar: "--mvmt-card-decorative-4" },
    { name: "Network Overview", category: "Starter", colorVar: "--mvmt-card-decorative-5" },
    { name: "Multiplication Scorecard", category: "Analytics", colorVar: "--mvmt-card-decorative-3" },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light-muted", className)} >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-mvmt-text-primary font-mvmt-heading">
            Templates
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-mvmt-text-secondary">
            Jump-start your movement infrastructure with ready-made templates built by practitioners.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {templates.map((tpl) => (
            <div key={tpl.name} className="rounded-xl overflow-hidden cursor-pointer group bg-mvmt-surface-light border border-mvmt-border-light">
              <div className="h-44 w-full" style={{ backgroundColor: `var(${tpl.colorVar})` }} />
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1 text-mvmt-text-primary">{tpl.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-mvmt-text-secondary">{tpl.category}</span>
                  <span className="text-xs font-semibold text-mvmt-accent">Free</span>
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
