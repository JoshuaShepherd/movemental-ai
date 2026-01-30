"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReaderChapterNavProps {
  className?: string;
}

const chapters = [
  { id: 1, title: "Why Sending?", progress: 100 },
  { id: 2, title: "The DNA of a Sending Church", progress: 100 },
  { id: 3, title: "Building a Leadership Pipeline", progress: 45 },
  { id: 4, title: "The Economics of Multiplication", progress: 0 },
  { id: 5, title: "Releasing Your Best People", progress: 0 },
  { id: 6, title: "Sustaining a Sending Culture", progress: 0 },
];

/**
 * GitBook-style reader with top chapter dropdown/nav,
 * per-chapter reading progress, clean body text.
 */
export function ReaderChapterNav({ className }: ReaderChapterNavProps) {
  const [showChapters, setShowChapters] = useState(false);
  const activeChapter = chapters[2]; // Chapter 3 active

  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-surface-light", className)}>
      {/* Top nav with chapter selector */}
      <div className="sticky top-0 z-20 border-b border-b-mvmt-border-light bg-mvmt-surface-light">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-mvmt-text-primary">The Sending Church</span>
            <span className="text-xs text-mvmt-text-muted">by Brad Brisco</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowChapters(!showChapters)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-mvmt-border-light text-mvmt-text-primary"
            >
              Ch. {activeChapter.id}: {activeChapter.title}
              <span className={cn("transition-transform text-xs", showChapters && "rotate-180")}>▼</span>
            </button>

            {showChapters && (
              <div className="absolute right-0 top-full mt-1 w-80 rounded-lg border border-mvmt-border-light bg-mvmt-surface-light shadow-lg z-50">
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setShowChapters(false)}
                    className={cn(
                      "w-full text-left px-4 py-3 flex items-center gap-3 transition-colors",
                      ch.id === activeChapter.id ? "bg-mvmt-surface-light-muted" : "hover:bg-mvmt-surface-light-muted"
                    )}
                  >
                    <span className="text-xs font-mono text-mvmt-text-muted w-6">{ch.id}.</span>
                    <div className="flex-1">
                      <p className="text-sm text-mvmt-text-primary">{ch.title}</p>
                      <div className="mt-1 w-full h-1 rounded-full bg-mvmt-border-light">
                        <div
                          className="h-full rounded-full bg-mvmt-accent transition-all"
                          style={{ width: `${ch.progress}%` }}
                        />
                      </div>
                    </div>
                    {ch.progress === 100 && (
                      <span className="text-xs text-mvmt-accent">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Chapter progress bar */}
        <div className="w-full h-0.5" style={{ backgroundColor: "var(--mvmt-border-light)" }}>
          <div className="h-full bg-mvmt-accent transition-all" style={{ width: "45%" }} />
        </div>
      </div>

      {/* Body */}
      <article className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-mvmt-accent">Chapter 3</span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mt-2 mb-2 text-mvmt-text-primary font-mvmt-heading">
            Building a Leadership Pipeline
          </h1>
          <p className="text-sm text-mvmt-text-muted">Estimated read: 15 min · 45% complete</p>
        </div>

        <div className="space-y-6">
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            The number one bottleneck in church multiplication is not money, vision, or opportunity. It&rsquo;s leaders. More specifically, it&rsquo;s the lack of a systematic process for identifying, developing, and releasing leaders who are capable of starting something new.
          </p>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            Most churches have some form of leadership development. They run classes, assign mentors, invite people to serve on teams. But very few have a pipeline that explicitly prepares people to be sent. The distinction matters more than you might think.
          </p>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            A serving pipeline asks: &ldquo;How can this person help our church?&rdquo; A sending pipeline asks: &ldquo;How can our church help this person fulfill their calling — even if it takes them away from us?&rdquo; The questions are nearly opposite, and they produce entirely different cultures.
          </p>
          <h2 className="text-xl font-bold mt-10 mb-4 text-mvmt-text-primary font-mvmt-heading">
            The Three Phases of a Sending Pipeline
          </h2>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            After studying dozens of effective sending churches, I&rsquo;ve identified three phases that consistently appear in their leadership pathways: <strong>Discover</strong>, <strong>Develop</strong>, and <strong>Deploy</strong>. Each phase has distinct goals, activities, and timelines.
          </p>
        </div>
      </article>

      {/* Bottom nav */}
      <div className="border-t border-t-mvmt-border-light px-6 py-4 flex items-center justify-between">
        <button className="text-sm text-mvmt-accent">← Ch. 2: The DNA of a Sending Church</button>
        <button className="text-sm text-mvmt-accent">Ch. 4: The Economics of Multiplication →</button>
      </div>
    </section>
  );
}

ReaderChapterNav.displayName = "ReaderChapterNav";
