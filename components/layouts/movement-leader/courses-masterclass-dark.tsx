"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesMasterclassDarkProps {
  className?: string;
}

const activities = [
  {
    title: "Introduction",
    description: "Brad introduces himself and the Sending Church framework — a model for developing and deploying leaders who multiply the mission.",
    hasVideo: true,
    videoTitle: "Meet Your Instructor: Brad Brisco",
    videoDesc: "Brad Brisco — the thought leader on a mission to transform churches from gathering to sending. Learn how he developed the multiplication framework.",
  },
  { title: "Understand the Sending Posture", description: "", hasVideo: false, videoTitle: "", videoDesc: "" },
  { title: "Identify and Assess Leaders", description: "", hasVideo: false, videoTitle: "", videoDesc: "" },
  { title: "Build Your Pipeline", description: "", hasVideo: false, videoTitle: "", videoDesc: "" },
  { title: "Coach for Multiplication", description: "", hasVideo: false, videoTitle: "", videoDesc: "" },
  { title: "Measure What Matters", description: "", hasVideo: false, videoTitle: "", videoDesc: "" },
];

export function CoursesMasterclassDark({ className }: CoursesMasterclassDarkProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark", className)}>
      {/* Header */}
      <div className="border-b border-b-mvmt-border-on-dark px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-mvmt-on-dark-muted">← Exit Session</span>
        <div className="flex gap-4">
          <button className="px-4 py-1.5 rounded-full border border-mvmt-border-on-dark text-sm text-mvmt-on-dark-primary">My Activities</button>
          <button className="px-4 py-1.5 rounded-full text-sm text-mvmt-on-dark-muted">Community</button>
        </div>
        <div className="w-8 h-8 rounded-full bg-mvmt-accent" />
      </div>

      {/* Instructor header */}
      <div className="text-center py-10 px-6">
        <div className="w-20 h-20 rounded-full bg-mvmt-surface-dark-elevated mx-auto mb-4 border-2 border-mvmt-border-on-dark" />
        <h1 className="text-2xl font-bold text-mvmt-on-dark-primary mb-1">Brad Brisco</h1>
        <p className="text-sm text-mvmt-on-dark-muted">Teaches the Sending Church Framework</p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-sm text-mvmt-on-dark-secondary">My Activities</span>
          <span className="text-xs text-mvmt-on-dark-muted">☐ Show Completed</span>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={cn("w-6 h-6 rounded-full", i === 0 ? "bg-mvmt-accent" : "bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark")} />
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        {activities.map((act, i) => (
          <div key={act.title} className="border-b border-b-mvmt-border-on-dark">
            <button
              onClick={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
              className="w-full text-left py-5 flex items-center gap-4"
            >
              <span className="w-8 h-8 rounded-full bg-mvmt-surface-dark-elevated flex items-center justify-center text-sm font-bold text-mvmt-on-dark-primary border border-mvmt-border-on-dark">
                {i + 1}
              </span>
              <span className="text-base font-medium text-mvmt-on-dark-primary flex-1">{act.title}</span>
              <span className={cn("text-mvmt-on-dark-muted transition-transform", expandedIndex === i && "rotate-180")}>▾</span>
            </button>
            {expandedIndex === i && act.hasVideo && (
              <div className="pb-6 pl-12">
                <p className="text-sm text-mvmt-on-dark-secondary mb-4">{act.description}</p>
                <div className="rounded-xl overflow-hidden border border-mvmt-border-on-dark">
                  <div className="flex items-start gap-4 p-4 bg-mvmt-surface-dark-elevated">
                    <div className="w-32 h-20 rounded-lg bg-mvmt-surface-dark flex-shrink-0 flex items-center justify-center">
                      <span className="text-mvmt-on-dark-primary text-xl">▶</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-mvmt-on-dark-primary mb-1">{act.videoTitle}</h3>
                      <p className="text-xs text-mvmt-on-dark-muted leading-relaxed">{act.videoDesc}</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-mvmt-accent text-mvmt-cta-text text-xs font-bold flex-shrink-0">
                      Start Activity
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

CoursesMasterclassDark.displayName = "CoursesMasterclassDark";
