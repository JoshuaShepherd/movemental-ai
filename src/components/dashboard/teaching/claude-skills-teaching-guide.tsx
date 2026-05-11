"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { ClaudeSkillsGuideBody } from "./claude-skills-guide-body";

const TOTAL_CHAPTERS = 8;

const tocItems = [
  { id: "ch-1", num: "01", label: "What a skill actually is" },
  { id: "ch-2", num: "02", label: "Where skills fit in the picture" },
  { id: "ch-3", num: "03", label: "The four levels of skill maturity" },
  { id: "ch-4", num: "04", label: "The anatomy of a real skill" },
  { id: "ch-5", num: "05", label: "How skills become active" },
  { id: "ch-6", num: "06", label: "What makes a skill good or bad" },
  { id: "ch-7", num: "07", label: "Governance — who owns what" },
  { id: "ch-8", num: "08", label: "Where to begin" },
] as const;

export function ClaudeSkillsTeachingGuide() {
  const [activeId, setActiveId] = useState<string>("ch-1");

  const activeChapterNum = useMemo(() => {
    const m = /^ch-(\d+)$/.exec(activeId);
    return m ? parseInt(m[1], 10) : 1;
  }, [activeId]);

  const progressPct = useMemo(
    () => (activeChapterNum / TOTAL_CHAPTERS) * 100,
    [activeChapterNum],
  );

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id^="ch-"]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActiveId(id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-body text-safestart-ink selection:bg-pathway-accent/25 [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:tracking-tight">
      <nav className="sticky top-0 z-50 bg-movemental-midnight text-white">
        <div className="flex h-14 items-center px-4 sm:h-16 sm:px-6">
          <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-4">
              <span className="font-serif text-lg italic text-white">Movemental</span>
              <span className="hidden h-3.5 w-px bg-white/25 sm:block" aria-hidden />
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.08em] text-white/70 sm:inline">
                Teaching Library
              </span>
              <span className="bg-pathway-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                Skills
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden text-xs tabular-nums text-white/70 sm:inline">
                Chapter <strong className="font-medium text-pathway-accent">{activeChapterNum}</strong> of{" "}
                {TOTAL_CHAPTERS}
              </span>
              <Link
                href="/dashboard"
                className="text-xs font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="h-0.5 w-full bg-white/10">
          <div
            className="h-full bg-pathway-accent transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </nav>

      <div className="bg-safestart-bg pb-16 sm:pb-24">
        <section className="mx-auto max-w-[1240px] px-4 pb-10 pt-14 sm:px-8 sm:pb-16 sm:pt-24">
          <div className="max-w-[800px]">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.1em] text-pathway-accent">
              A Movemental Teaching Guide
            </p>
            <h1 className="font-serif text-[clamp(2.75rem,7vw,4.75rem)] font-normal italic leading-none tracking-tight text-safestart-ink">
              What is a <em>skill</em>?
            </h1>
            <p className="mt-8 max-w-[600px] text-lg leading-relaxed text-safestart-ink">
              A working understanding of one of the most useful — and most misunderstood — features of Claude, written
              for the senior leaders who will decide whether and how their organization uses it.
            </p>
            <p className="mt-4 max-w-[580px] text-base leading-relaxed text-safestart-muted">
              Eight chapters. Roughly thirty minutes of reading. No jargon. By the end, you will know what a skill
              actually is, where it fits in the larger architecture of how your team works with AI, what makes a skill
              good or bad, and what your organization needs to put in place before adopting them.
            </p>
            <div className="mt-12 flex flex-wrap gap-10 border-t border-safestart-hairline pt-8 sm:gap-12">
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-safestart-muted">
                  Reading time
                </p>
                <p className="text-sm text-safestart-ink">About 30 minutes</p>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-safestart-muted">
                  Audience
                </p>
                <p className="text-sm text-safestart-ink">Senior leaders, non-technical</p>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-safestart-muted">Series</p>
                <p className="text-sm text-safestart-ink">Teaching Library, Volume 03</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-4 sm:gap-12 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
          <aside className="border border-safestart-hairline bg-safestart-surface-container p-4 lg:sticky lg:top-24 lg:self-start lg:border-0 lg:bg-transparent lg:p-0">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-safestart-muted">Chapters</p>
            <nav className="flex flex-col" aria-label="Table of contents">
              {tocItems.map((item) => {
                const active = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className={cn(
                      "flex items-baseline gap-3 border-l-2 py-2.5 pl-3 text-left text-sm transition-colors",
                      active
                        ? "border-pathway-accent font-medium text-safestart-ink"
                        : "border-transparent text-safestart-muted hover:text-safestart-ink",
                    )}
                  >
                    <span className="shrink-0 font-serif text-sm italic tabular-nums text-pathway-accent">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="max-w-[760px] min-w-0 [&_a]:text-pathway-accent [&_a]:underline [&_a]:decoration-pathway-accent/60 [&_a]:underline-offset-[3px] [&_a]:hover:text-safestart-ink">
            <ClaudeSkillsGuideBody />
          </main>
        </div>

        <footer className="mx-auto mt-16 flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-safestart-hairline px-4 py-10 text-xs text-safestart-muted sm:px-8">
          <span>Movemental · Teaching Library · Volume 03 · Skills</span>
          <span>2026 · movemental.ai</span>
        </footer>
      </div>
    </div>
  );
}
