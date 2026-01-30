"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesChapterBuilderProps {
  className?: string;
}

const courseChapters = [
  {
    title: "Introduction",
    lessons: [
      { title: "Course Overview", date: "Jan 5", status: "published" },
      { title: "What You'll Learn", date: "Jan 5", status: "published" },
    ],
  },
  {
    title: "Sending Church Foundations",
    lessons: [
      { title: "The Multiplication Mindset", date: "Jan 8", status: "published" },
      { title: "Building a Sending Pipeline", date: "Jan 8", status: "draft" },
    ],
  },
  {
    title: "Leader Development",
    lessons: [
      { title: "Identifying Potential Leaders", date: "Jan 12", status: "scheduled" },
    ],
  },
];

export function CoursesChapterBuilder({ className }: CoursesChapterBuilderProps) {
  const [expandedChapter, setExpandedChapter] = useState<string>("Introduction");
  const [selectedLesson, setSelectedLesson] = useState<string>("Course Overview");

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light flex", className)}>
      {/* Left panel */}
      <aside className="w-72 border-r border-r-mvmt-border-light bg-mvmt-surface-light flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-b-mvmt-border-light flex items-center justify-between">
          <h2 className="text-base font-bold text-mvmt-text-primary">Course Content</h2>
          <button className="w-6 h-6 rounded-full bg-mvmt-surface-light-muted flex items-center justify-center text-mvmt-text-muted text-lg">+</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {courseChapters.map((ch) => (
            <div key={ch.title}>
              <button
                onClick={() => setExpandedChapter(expandedChapter === ch.title ? "" : ch.title)}
                className="w-full text-left px-4 py-3 flex items-center justify-between border-b border-b-mvmt-border-light"
              >
                <div>
                  <p className="text-sm font-bold text-mvmt-text-primary">{ch.title}</p>
                  <p className="text-xs text-mvmt-text-muted">Chapter · {ch.lessons.length} Lessons</p>
                </div>
                <span className={cn("text-mvmt-text-muted text-sm transition-transform", expandedChapter === ch.title && "rotate-180")}>▾</span>
              </button>
              {expandedChapter === ch.title && ch.lessons.map((lesson) => (
                <button
                  key={lesson.title}
                  onClick={() => setSelectedLesson(lesson.title)}
                  className={cn(
                    "w-full text-left px-4 py-3 flex items-center gap-3 border-b border-b-mvmt-border-light transition-colors",
                    selectedLesson === lesson.title ? "bg-mvmt-surface-light-muted" : "hover:bg-mvmt-surface-light-muted/50"
                  )}
                >
                  <div className="w-10 h-7 rounded bg-mvmt-surface-light-muted flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-mvmt-text-primary">{lesson.title}</p>
                    <div className="flex items-center gap-2">
                      {lesson.status !== "published" && (
                        <span className={cn(
                          "text-xs font-bold uppercase px-1.5 py-0.5 rounded",
                          lesson.status === "draft" ? "bg-mvmt-surface-light-muted text-mvmt-text-muted" : "bg-mvmt-accent/10 text-mvmt-accent"
                        )}>
                          {lesson.status}
                        </span>
                      )}
                      <span className="text-xs text-mvmt-text-muted">{lesson.date}</span>
                    </div>
                  </div>
                </button>
              ))}
              {expandedChapter === ch.title && (
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-mvmt-accent flex items-center gap-2">
                  <span>+</span> Add Lesson
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom toolbar */}
        <div className="border-t border-t-mvmt-border-light px-4 py-3 flex items-center gap-4">
          <button className="text-xs font-bold uppercase text-mvmt-text-primary">Select All</button>
          <button className="text-xs font-bold uppercase text-mvmt-text-muted">Set Status</button>
          <button className="text-xs font-bold uppercase text-mvmt-accent">Delete</button>
        </div>
      </aside>

      {/* Right panel — preview */}
      <div className="flex-1 flex items-center justify-center bg-mvmt-surface-light-muted">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-mvmt-text-primary mb-2">{selectedLesson}</h2>
          <p className="text-sm text-mvmt-text-muted">Lesson preview</p>
          <button className="mt-6 px-6 py-3 rounded-lg bg-mvmt-cta-bg text-mvmt-cta-text font-medium text-sm">
            Complete &amp; Continue
          </button>
        </div>
      </div>
    </section>
  );
}

CoursesChapterBuilder.displayName = "CoursesChapterBuilder";
