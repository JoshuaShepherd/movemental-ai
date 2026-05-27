"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesGridCatalogProps {
  className?: string;
}

const filters = [
  { label: "Duration", options: ["Under 30 min", "30–60 min", "1–2 hours", "2+ hours"] },
  { label: "Your Goal", options: ["Start sending", "Grow leaders", "Build networks", "Measure impact"] },
  { label: "Your Role", options: ["Lead Pastor", "Church Planter", "Network Leader", "Coach"] },
  { label: "Focus Area", options: ["Multiplication", "Assessment", "Pipeline", "Culture"] },
];

const courses = [
  { title: "Sending Church Foundations", desc: "Learn the core model for developing and deploying leaders who multiply the mission.", duration: "30 min", color: "bg-mvmt-accent/20" },
  { title: "Getting Started as a Coach", desc: "Master coaching conversations that accelerate leader development and deployment.", duration: "45 min", color: "bg-mvmt-accent/10" },
  { title: "Building Your Leader Pipeline", desc: "Create a structured pipeline from identification through assessment to deployment.", duration: "1 hr", color: "bg-mvmt-accent/20" },
  { title: "Multiplication Metrics That Matter", desc: "Identify the key metrics that reveal sending health and multiplication potential.", duration: "20 min", color: "bg-mvmt-accent/15" },
  { title: "Network-Level Strategy", desc: "Scale your sending culture across multiple churches and denominational structures.", duration: "1.5 hrs", color: "bg-mvmt-accent/10" },
  { title: "Assessment Framework Deep Dive", desc: "Master the assessment tools that help you identify high-potential future leaders.", duration: "40 min", color: "bg-mvmt-accent/20" },
];

export function CoursesGridCatalog({ className }: CoursesGridCatalogProps) {
  const [expandedFilter, setExpandedFilter] = useState<string>("Duration");

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-12 px-6", className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-mvmt-text-primary font-mvmt-heading">Courses</h1>
          <button className="mt-2 text-sm text-mvmt-accent font-medium">← Back to Home Page</button>
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-mvmt-accent">Expand All</span>
              <span className="text-sm text-mvmt-text-muted">Reset</span>
            </div>
            {filters.map((f) => (
              <div key={f.label} className="mb-2">
                <button
                  onClick={() => setExpandedFilter(expandedFilter === f.label ? "" : f.label)}
                  className="w-full text-left py-3 flex items-center justify-between text-sm font-medium text-mvmt-text-primary"
                >
                  {f.label}
                  <span className={cn("text-xs text-mvmt-text-muted transition-transform", expandedFilter === f.label && "rotate-180")}>▾</span>
                </button>
                {expandedFilter === f.label && (
                  <div className="pb-3 space-y-2">
                    {f.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-mvmt-text-secondary cursor-pointer">
                        <span className="w-4 h-4 rounded border border-mvmt-border-light" />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </aside>

          {/* Course grid */}
          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.title} className="rounded-xl border border-mvmt-border-light overflow-hidden">
                <div className={cn("h-32 flex items-center justify-center", course.color)}>
                  <span className="text-4xl">📘</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-mvmt-text-primary mb-2">{course.title}</h3>
                  <p className="text-xs text-mvmt-text-secondary mb-4 leading-relaxed">{course.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mvmt-text-muted">{course.duration}</span>
                    <button className="text-xs font-medium text-mvmt-accent">Get started →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

CoursesGridCatalog.displayName = "CoursesGridCatalog";
