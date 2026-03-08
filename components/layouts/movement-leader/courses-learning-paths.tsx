"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesLearningPathsProps {
  className?: string;
}

const paths = [
  {
    title: "Sending Church Foundations",
    description: "Master the core principles of sending church culture and multiplication strategy.",
    status: "In Progress",
    levels: [
      { level: "Level 1", courses: ["The Sending Posture", "Why Multiplication Matters"] },
      { level: "Level 2", courses: ["Leader Identification", "Assessment Tools", "Pipeline Basics"] },
      { level: "Level 3", courses: ["Coaching Framework", "Network Building"] },
      { level: "Level 4", courses: ["Advanced Metrics", "Culture Sustainability"] },
    ],
  },
  {
    title: "Leader Development",
    description: "Build the skills to identify, develop, and deploy leaders across your network.",
    status: "Not Started",
    levels: [
      { level: "Level 1", courses: ["Leadership 101", "Discovering Potential"] },
      { level: "Level 2", courses: ["Coaching Conversations", "Feedback Loops"] },
    ],
  },
  {
    title: "Network Strategy",
    description: "Scale your sending culture across multiple churches and denominational structures.",
    status: "Not Started",
    levels: [
      { level: "Level 1", courses: ["Multi-Church Models", "Shared Resources"] },
      { level: "Level 2", courses: ["Denominational Partnerships", "Reporting"] },
    ],
  },
];

export function CoursesLearningPaths({ className }: CoursesLearningPathsProps) {
  const [expandedPath, setExpandedPath] = useState(0);

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-12 px-6", className)}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-mvmt-text-primary font-mvmt-heading mb-2">Learning Paths</h1>
        <p className="text-base text-mvmt-text-secondary mb-10">Step-by-step paths to mastery</p>

        <div className="space-y-4">
          {paths.map((path, i) => (
            <div key={path.title} className="rounded-xl border border-mvmt-border-light overflow-hidden">
              <button
                onClick={() => setExpandedPath(expandedPath === i ? -1 : i)}
                className="w-full text-left px-6 py-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-mvmt-accent/10 flex items-center justify-center text-xl flex-shrink-0">📚</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-xs font-bold uppercase",
                      path.status === "In Progress" ? "text-mvmt-accent" : "text-mvmt-text-muted"
                    )}>
                      {path.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-mvmt-text-primary">{path.title}</h3>
                  <p className="text-sm text-mvmt-text-secondary">{path.description}</p>
                </div>
                <button className="px-5 py-2 rounded-lg bg-mvmt-cta-bg text-mvmt-cta-text text-sm font-bold flex-shrink-0">
                  {path.status === "In Progress" ? "Continue" : "Start"}
                </button>
                <span className={cn("text-mvmt-text-muted transition-transform", expandedPath === i && "rotate-180")}>▾</span>
              </button>

              {expandedPath === i && (
                <div className="px-6 pb-6">
                  <div className="rounded-xl bg-mvmt-surface-light-muted p-6 overflow-x-auto">
                    <div className="flex gap-6 min-w-max">
                      {path.levels.map((lvl) => (
                        <div key={lvl.level}>
                          <p className="text-xs font-bold uppercase tracking-wider text-mvmt-text-muted mb-3">{lvl.level}</p>
                          <div className="flex gap-3">
                            {lvl.courses.map((course) => (
                              <div
                                key={course}
                                className="w-28 h-28 rounded-xl border border-mvmt-border-light bg-mvmt-surface-light p-3 flex flex-col items-center justify-center text-center"
                              >
                                <span className="text-2xl mb-1">📖</span>
                                <p className="text-xs font-medium text-mvmt-text-primary leading-tight">{course}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recommended */}
        <div className="mt-10 rounded-xl border border-mvmt-border-light px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-mvmt-accent/10 flex items-center justify-center text-xl">🎯</div>
            <div>
              <p className="text-xs font-bold uppercase text-mvmt-accent">Recommended</p>
              <p className="text-base font-bold text-mvmt-text-primary">Assessment Mastery</p>
              <p className="text-sm text-mvmt-text-secondary">Master the tools for identifying high-potential leaders</p>
            </div>
          </div>
          <button className="px-5 py-2 rounded-lg border border-mvmt-border-light text-sm font-medium text-mvmt-text-primary">
            View path
          </button>
        </div>
      </div>
    </section>
  );
}

CoursesLearningPaths.displayName = "CoursesLearningPaths";
