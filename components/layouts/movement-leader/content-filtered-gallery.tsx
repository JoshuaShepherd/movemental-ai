"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ContentFilteredGalleryProps {
  className?: string;
}

/**
 * Filtered Gallery — Framer-style sidebar filter + template grid
 * Minimal bg, left sidebar filters, right template preview grid
 */
export function ContentFilteredGallery({ className }: ContentFilteredGalleryProps) {
  const [activeType, setActiveType] = useState("All");
  const types = ["All", "Community", "Coaching", "Content", "Analytics"];

  const items = [
    { name: "Missional Community Starter", type: "Community", description: "Launch a new community with proven rhythms and structures.", color: "#F1F5F9" },
    { name: "Coaching Session Template", type: "Coaching", description: "Hero-maker framework with question banks and note fields.", color: "#EEF2FF" },
    { name: "Discipleship Pathway Builder", type: "Content", description: "Create multi-week formation journeys with assessments.", color: "#F0FDF4" },
    { name: "Network Health Dashboard", type: "Analytics", description: "At-a-glance metrics for your entire movement.", color: "#FFF7ED" },
    { name: "Small Group Guide", type: "Community", description: "Weekly discussion guide with scripture and application.", color: "#FDF2F8" },
    { name: "Leader Check-in Form", type: "Coaching", description: "Quick pulse survey for leaders between coaching sessions.", color: "#F5F3FF" },
    { name: "Video Course Template", type: "Content", description: "Multi-module course layout with progress tracking.", color: "#ECFDF5" },
    { name: "Multiplication Report", type: "Analytics", description: "Track sending metrics and reproduction ratios.", color: "#FEF3C7" },
    { name: "Prayer Walk Guide", type: "Community", description: "Structured neighborhood prayer exercise for groups.", color: "#FCE7F3" },
  ];

  const filtered = activeType === "All" ? items : items.filter((item) => item.type === activeType);

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="max-w-7xl mx-auto px-6 py-16 flex gap-8">
        {/* Sidebar filters */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-mvmt-text-muted">
            Filter by type
          </p>
          <nav className="space-y-1">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className="block w-full text-left px-3 py-2 text-sm rounded-md transition-colors"
                style={{
                  backgroundColor: activeType === type ? "var(--mvmt-surface-light-muted)" : "transparent",
                  color: activeType === type ? "var(--mvmt-text-primary)" : "var(--mvmt-text-secondary)",
                  fontWeight: activeType === type ? 600 : 400,
                }}
              >
                {type}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-mvmt-text-primary font-mvmt-heading">
            Template Gallery
          </h1>
          <p className="text-base mb-8 text-mvmt-text-secondary">
            Browse and customize templates for your movement.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div key={item.name} className="rounded-lg overflow-hidden cursor-pointer border border-mvmt-border-light">
                <div className="h-36 w-full" style={{ backgroundColor: item.color }} />
                <div className="p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-mvmt-accent">{item.type}</span>
                  <h3 className="text-sm font-bold mt-1 mb-1 text-mvmt-text-primary">{item.name}</h3>
                  <p className="text-xs text-mvmt-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

ContentFilteredGallery.displayName = "ContentFilteredGallery";
