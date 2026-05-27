"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesLessonSidebarProps {
  className?: string;
}

const lessons = [
  { num: "01", title: "Opening: What Is a Sending Church?", duration: "3:58", completed: true },
  { num: "02", title: "The Multiplication Framework", duration: "5:12", completed: true },
  { num: "03", title: "Using Assessment Tools", duration: "7:30", completed: false },
  { num: "04", title: "Identifying and Deploying Leaders", duration: "6:15", completed: false },
  { num: "05", title: "Building Your Pipeline", duration: "4:45", completed: false },
  { num: "06", title: "Network-Level Strategy", duration: "8:20", completed: false },
  { num: "07", title: "Coaching Conversations", duration: "5:50", completed: false },
  { num: "08", title: "Measuring Multiplication", duration: "6:00", completed: false },
  { num: "09", title: "Sustaining Sending Culture", duration: "7:10", completed: false },
  { num: "10", title: "What's Next?", duration: "3:00", completed: false },
];

const detailTabs = ["Key Learnings", "Transcript", "The Experts"];

export function CoursesLessonSidebar({ className }: CoursesLessonSidebarProps) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeTab, setActiveTab] = useState("Key Learnings");

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light", className)}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <p className="text-xs text-mvmt-text-muted mb-4">
          Leadership Academy → Courses → <span className="text-mvmt-text-primary">Sending Church Foundations</span>
        </p>

        <h1 className="text-2xl font-bold text-mvmt-text-primary mb-1">Sending Church Foundations</h1>
        <p className="text-sm text-mvmt-text-muted mb-6">★★★★★ 1,482 leaders enrolled</p>

        <div className="flex gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Video */}
            <div className="aspect-video rounded-xl bg-mvmt-surface-dark flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-mvmt-surface-dark-elevated/80 flex items-center justify-center">
                <span className="text-mvmt-on-dark-primary text-2xl ml-1">▶</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-mvmt-text-primary mb-1">{lessons[activeLesson].title}</h2>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-b-mvmt-border-light mt-4 mb-6">
              {detailTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-3 text-sm font-medium border-b-2 transition-colors",
                    activeTab === tab
                      ? "border-b-mvmt-accent text-mvmt-text-primary"
                      : "border-b-transparent text-mvmt-text-muted hover:text-mvmt-text-primary"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-mvmt-text-secondary">
              This lesson explores the foundational principles of sending church culture. Brad Brisco walks through
              how to shift from a gathering mindset to a multiplication mindset, covering the key metrics and
              leadership behaviors that define high-capacity sending churches.
            </p>
          </div>

          {/* Lesson sidebar */}
          <aside className="w-72 flex-shrink-0 hidden lg:block">
            <h3 className="text-sm font-bold text-mvmt-text-primary mb-3">Lessons</h3>
            <div className="space-y-0">
              {lessons.map((lesson, i) => (
                <button
                  key={lesson.num}
                  onClick={() => setActiveLesson(i)}
                  className={cn(
                    "w-full text-left px-3 py-3 flex items-center gap-3 rounded-lg transition-colors",
                    i === activeLesson ? "bg-mvmt-surface-light-muted" : "hover:bg-mvmt-surface-light-muted/50"
                  )}
                >
                  <span className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                    lesson.completed ? "bg-mvmt-accent text-mvmt-cta-text" : "border-2 border-mvmt-border-light text-mvmt-text-muted"
                  )}>
                    {lesson.completed ? "✓" : lesson.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-mvmt-text-primary truncate">{lesson.title}</p>
                    <p className="text-xs text-mvmt-text-muted">{lesson.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

CoursesLessonSidebar.displayName = "CoursesLessonSidebar";
