"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesDarkPlayerProps {
  className?: string;
}

const sections = [
  { title: "Section 1: Sending Church Foundations", lessons: "7 Lessons · 45min", items: ["Welcome & Vision", "What Is Multiplication?", "The Sending Posture"] },
  { title: "Section 2: Leader Identification", lessons: "5 Lessons · 32min", items: ["Assessment Framework", "Pipeline Development", "Coaching Conversations"] },
  { title: "Section 3: Network Strategy", lessons: "4 Lessons · 28min", items: ["Multi-Site Multiplication", "Denominational Partnerships"] },
  { title: "Section 4: Sustaining Culture", lessons: "6 Lessons · 40min", items: ["Long-term Metrics", "Leader Care", "Celebration Rhythms"] },
];

const bottomTabs = ["Overview", "Q&A", "Notes", "Reviews", "Resources"];

export function CoursesDarkPlayer({ className }: CoursesDarkPlayerProps) {
  const [expandedSection, setExpandedSection] = useState(0);
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark", className)}>
      {/* Top bar */}
      <div className="border-b border-b-mvmt-border-on-dark px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-bold text-mvmt-on-dark-primary">Sending Church Masterclass: Foundations to Finishing Strong</h1>
          <p className="text-xs text-mvmt-on-dark-muted">Brad Brisco, Church Planting Strategist · <span className="text-mvmt-accent">Following</span></p>
        </div>
        <span className="px-3 py-1 border border-mvmt-border-on-dark rounded text-xs font-bold text-mvmt-on-dark-primary">Staff Pick.</span>
      </div>

      <div className="flex">
        {/* Video */}
        <div className="flex-1 min-w-0">
          <div className="aspect-video bg-mvmt-surface-dark-elevated flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-mvmt-surface-dark/80 flex items-center justify-center">
              <span className="text-mvmt-on-dark-primary text-3xl ml-1">▶</span>
            </div>
          </div>

          {/* Bottom tabs */}
          <div className="flex items-center gap-6 px-6 py-3 border-b border-b-mvmt-border-on-dark overflow-x-auto">
            {bottomTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-sm font-medium whitespace-nowrap transition-colors",
                  activeTab === tab ? "text-mvmt-on-dark-primary" : "text-mvmt-on-dark-muted hover:text-mvmt-on-dark-secondary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            <p className="text-sm leading-relaxed text-mvmt-on-dark-secondary">
              22 Lessons (2h 25min) · This masterclass walks movement leaders through the complete sending church
              framework — from identifying future leaders to deploying them across networks with sustainable support
              structures.
            </p>
          </div>
        </div>

        {/* Right sidebar — course content */}
        <aside className="w-80 border-l border-l-mvmt-border-on-dark overflow-y-auto hidden lg:block">
          <div className="px-4 py-3 border-b border-b-mvmt-border-on-dark flex items-center justify-between">
            <span className="text-sm font-bold text-mvmt-on-dark-primary">Course content</span>
            <span className="text-xs text-mvmt-on-dark-muted">22 Lessons</span>
          </div>
          {sections.map((sec, i) => (
            <div key={sec.title}>
              <button
                onClick={() => setExpandedSection(expandedSection === i ? -1 : i)}
                className="w-full text-left px-4 py-3 border-b border-b-mvmt-border-on-dark hover:bg-mvmt-surface-dark-elevated transition-colors"
              >
                <p className="text-sm font-bold text-mvmt-on-dark-primary">{sec.title}</p>
                <p className="text-xs text-mvmt-on-dark-muted">{sec.lessons}</p>
              </button>
              {expandedSection === i && sec.items.map((item, j) => (
                <div key={item} className="px-4 py-2 border-b border-b-mvmt-border-on-dark flex items-center gap-3">
                  <span className="text-xs text-mvmt-on-dark-muted w-4">{j + 1}.</span>
                  <span className="text-sm text-mvmt-on-dark-secondary">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

CoursesDarkPlayer.displayName = "CoursesDarkPlayer";
