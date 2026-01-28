"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ContentTrainingResourcesProps {
  className?: string;
}

/**
 * Training Resources — Google Classroom-style filtered resource cards
 * Light bg, heading, filter bar, grid of resource cards with type, title, description
 */
export function ContentTrainingResources({ className }: ContentTrainingResourcesProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Video", "Document", "Worksheet", "Assessment"];

  const resources = [
    { type: "Video", title: "Introduction to Missional Living", description: "A 20-minute overview of incarnational community practices.", meta: "20 min • Brad Brisco", color: "#DBEAFE" },
    { type: "Document", title: "Community Covenant Template", description: "A starter template for writing your missional community's shared commitments.", meta: "PDF • 3 pages", color: "#D1FAE5" },
    { type: "Worksheet", title: "Neighborhood Mapping Exercise", description: "Guided activity for identifying the people, places, and patterns in your parish.", meta: "Interactive • 30 min", color: "#FEF3C7" },
    { type: "Assessment", title: "Leadership Readiness Check", description: "Self-assessment for emerging leaders preparing to facilitate a community.", meta: "15 questions • 10 min", color: "#EDE9FE" },
    { type: "Video", title: "Hero Maker Workshop: Session 1", description: "Dave Ferguson walks through the five practices of multiplying leadership.", meta: "45 min • Dave Ferguson", color: "#DBEAFE" },
    { type: "Document", title: "Movement Glossary", description: "Key terms and definitions used across the Movemental platform.", meta: "PDF • 8 pages", color: "#D1FAE5" },
  ];

  const filtered = activeFilter === "All" ? resources : resources.filter((r) => r.type === activeFilter);

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Training Resources
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--mvmt-text-secondary)" }}>
          Materials for developing leaders at every stage of the multiplication journey.
        </p>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: activeFilter === f ? "var(--mvmt-accent)" : "var(--mvmt-surface-light)",
                color: activeFilter === f ? "var(--mvmt-cta-text)" : "var(--mvmt-text-secondary)",
                border: activeFilter === f ? "none" : "1px solid var(--mvmt-border-light)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Resource cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((res, i) => (
            <div key={`${res.title}-${i}`} className="rounded-xl p-5 cursor-pointer" style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: res.color }}>
                  <span className="text-xs font-bold" style={{ color: "var(--mvmt-accent)" }}>{res.type.slice(0, 3).toUpperCase()}</span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--mvmt-accent)" }}>{res.type}</span>
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "var(--mvmt-text-primary)" }}>{res.title}</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--mvmt-text-secondary)" }}>{res.description}</p>
              <p className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>{res.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentTrainingResources.displayName = "ContentTrainingResources";
