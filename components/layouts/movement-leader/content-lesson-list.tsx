"use client";

import { cn } from "@/lib/utils";

interface ContentLessonListProps {
  className?: string;
}

/**
 * Lesson List — SuperHi-style vertical video lesson list
 * Light bg, course title, vertical numbered lesson list with title, duration, play indicator
 */
export function ContentLessonList({ className }: ContentLessonListProps) {
  const lessons = [
    { num: 1, title: "What Is a Movement?", duration: "12:34", description: "Defining movements and what separates them from programs, organizations, and institutions." },
    { num: 2, title: "The Missional Posture", duration: "18:21", description: "Brad Brisco on shifting from attractional to incarnational — and why it changes everything." },
    { num: 3, title: "Finding Your Parish", duration: "15:47", description: "A practical guide to exegeting your neighborhood and identifying people of peace." },
    { num: 4, title: "Forming Your First Community", duration: "22:03", description: "From first meal to shared rhythm — the early weeks of a missional community." },
    { num: 5, title: "The Apprenticeship Path", duration: "16:55", description: "How to develop leaders through proximity, not curriculum alone." },
    { num: 6, title: "Coaching That Multiplies", duration: "19:10", description: "Dave Ferguson's hero-maker principles applied to one-on-one coaching." },
    { num: 7, title: "When to Send", duration: "14:32", description: "Discerning readiness, celebrating the release, and staying connected after sending." },
    { num: 8, title: "Building Movement Infrastructure", duration: "20:45", description: "The systems, tools, and rhythms that sustain movements beyond the founding generation." },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--mvmt-accent)" }}>
          Course
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Movement Foundations
        </h1>
        <p className="text-base mb-2" style={{ color: "var(--mvmt-text-secondary)" }}>
          An 8-lesson journey through the core principles of missional movement leadership, taught by Brad Brisco and Dave Ferguson.
        </p>
        <p className="text-sm mb-10" style={{ color: "var(--mvmt-text-muted)" }}>
          8 lessons • 2h 20m total
        </p>

        <div className="space-y-0">
          {lessons.map((lesson) => (
            <div
              key={lesson.num}
              className="flex gap-5 py-5 cursor-pointer group"
              style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "2px solid var(--mvmt-border-light)" }}>
                <span className="text-sm font-bold" style={{ color: "var(--mvmt-text-primary)" }}>{lesson.num}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold" style={{ color: "var(--mvmt-text-primary)" }}>{lesson.title}</h3>
                  <span className="text-xs flex-shrink-0 ml-4" style={{ color: "var(--mvmt-text-muted)" }}>{lesson.duration}</span>
                </div>
                <p className="text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>{lesson.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentLessonList.displayName = "ContentLessonList";
