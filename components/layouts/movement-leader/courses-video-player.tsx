"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesVideoPlayerProps {
  className?: string;
}

const chapters = [
  {
    title: "Welcome to Sending",
    lessons: [
      { type: "Video", title: "Welcome to the Sending Church Course", duration: "5:21", completed: true },
      { type: "Reading", title: "Begin the Sending Church Certificate", duration: "10 min", completed: true },
    ],
  },
  {
    title: "Foundations of Multiplication",
    lessons: [
      { type: "Video", title: "What Is a Sending Church?", duration: "12:03", completed: false },
      { type: "Video", title: "Introduction to Multiplication Metrics", duration: "8:45", completed: false },
      { type: "Reading", title: "Exponential Network Overview", duration: "15 min", completed: false },
    ],
  },
  {
    title: "Building Your Pipeline",
    lessons: [
      { type: "Video", title: "Identifying Future Leaders", duration: "10:30", completed: false },
      { type: "Reading", title: "Leader Assessment Framework", duration: "12 min", completed: false },
    ],
  },
];

const tabs = ["Overview", "Notes", "Downloads"];

export function CoursesVideoPlayer({ className }: CoursesVideoPlayerProps) {
  const [activeLesson, setActiveLesson] = useState("Welcome to the Sending Church Course");
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light flex", className)}>
      {/* Sidebar */}
      <aside className="w-72 border-r border-r-mvmt-border-light bg-mvmt-surface-light overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-b-mvmt-border-light">
          <p className="text-xs font-bold uppercase tracking-wider text-mvmt-text-muted">Start the program</p>
        </div>
        {chapters.map((ch) => (
          <div key={ch.title}>
            <div className="px-4 py-3 border-b border-b-mvmt-border-light">
              <p className="text-xs font-bold text-mvmt-text-primary">{ch.title}</p>
              <p className="text-xs text-mvmt-text-muted">{ch.lessons.length} Lessons</p>
            </div>
            {ch.lessons.map((lesson) => (
              <button
                key={lesson.title}
                onClick={() => setActiveLesson(lesson.title)}
                className={cn(
                  "w-full text-left px-4 py-3 flex items-start gap-3 border-b border-b-mvmt-border-light transition-colors",
                  activeLesson === lesson.title ? "bg-mvmt-surface-light-muted" : "hover:bg-mvmt-surface-light-muted/50"
                )}
              >
                <span className={cn("mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0", lesson.completed ? "bg-mvmt-accent border-mvmt-accent" : "border-mvmt-border-light")} />
                <div>
                  <p className="text-xs text-mvmt-text-muted">{lesson.type}</p>
                  <p className="text-sm font-medium text-mvmt-text-primary">{lesson.title}</p>
                  <p className="text-xs text-mvmt-text-muted">{lesson.duration}</p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Video area */}
        <div className="aspect-video bg-mvmt-surface-dark flex items-center justify-center">
          <button className="w-16 h-16 rounded-full bg-mvmt-surface-dark-elevated flex items-center justify-center">
            <span className="text-mvmt-on-dark-primary text-2xl ml-1">▶</span>
          </button>
        </div>

        {/* Below video */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-mvmt-text-primary mb-1">{activeLesson}</h1>
          <p className="text-sm text-mvmt-text-muted mb-4">Brad Brisco · Sending Church Foundations</p>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-b-mvmt-border-light mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab
                    ? "border-b-mvmt-accent text-mvmt-accent"
                    : "border-b-transparent text-mvmt-text-muted hover:text-mvmt-text-primary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-mvmt-text-secondary">
            In this lesson, Brad Brisco introduces the Sending Church framework — a model for developing and deploying
            leaders who will multiply the mission across communities and networks. You&apos;ll learn the core principles that
            distinguish a sending culture from a gathering culture.
          </p>
        </div>
      </div>
    </section>
  );
}

CoursesVideoPlayer.displayName = "CoursesVideoPlayer";
