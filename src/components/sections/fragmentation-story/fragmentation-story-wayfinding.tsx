"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import type { ChapterId } from "./fragmentation-story-content";

const SCROLL_SPY_ORDER = [
  "fragmentation",
  "scatter",
  "bridge-part-two",
  "stage-integration",
  "stage-activation",
  "stage-formation",
  "stage-multiplication",
  "stage-movement",
  "outro-cta",
] as const;

const CHAPTER_ORDER: ChapterId[] = [
  "unity",
  "session",
  "first-break",
  "divergence",
  "channels",
  "misalignment",
];

const STAGE_NAV: { id: string; label: string }[] = [
  { id: "bridge-part-two", label: "Bridge" },
  { id: "stage-integration", label: "Integrate" },
  { id: "stage-activation", label: "Activate" },
  { id: "stage-formation", label: "Form" },
  { id: "stage-multiplication", label: "Multiply" },
  { id: "stage-movement", label: "Move" },
  { id: "outro-cta", label: "Next" },
];

type Props = {
  activeChapter: ChapterId;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function FragmentationStoryWayfinding({ activeChapter }: Props) {
  const [activeSection, setActiveSection] = useState<string>("fragmentation");

  const updateSpy = useCallback(() => {
    if (typeof window === "undefined") return;
    const marker = window.innerHeight * 0.28;
    let current: (typeof SCROLL_SPY_ORDER)[number] = "fragmentation";
    for (const id of SCROLL_SPY_ORDER) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= marker) current = id;
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    const runInitial = () => queueMicrotask(() => updateSpy());
    runInitial();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateSpy();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateSpy]);

  const inPartOne = useMemo(
    () => activeSection === "fragmentation" || activeSection === "scatter",
    [activeSection]
  );

  return (
    <nav
      aria-label="Story position"
      className="border-t border-inverse-foreground/10 bg-inverse-surface/95 px-3 py-2 text-inverse-foreground backdrop-blur-md supports-[backdrop-filter]:bg-inverse-surface/90 sm:px-6 lg:px-12"
    >
      <div className="mx-auto flex max-w-(--container-max) flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[0.65rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/50">
            Story
          </span>
          <div className="flex rounded-full bg-inverse-foreground/5 p-0.5">
            <button
              type="button"
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                inPartOne
                  ? "bg-inverse-foreground/12 text-inverse-foreground"
                  : "text-inverse-foreground/65 hover:text-inverse-foreground"
              )}
              onClick={() => scrollToId("fragmentation")}
            >
              Problem
            </button>
            <button
              type="button"
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                !inPartOne
                  ? "bg-inverse-foreground/12 text-inverse-foreground"
                  : "text-inverse-foreground/65 hover:text-inverse-foreground"
              )}
              onClick={() => scrollToId("bridge-part-two")}
            >
              System
            </button>
          </div>
        </div>

        {inPartOne ? (
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-end [&::-webkit-scrollbar]:hidden">
            {CHAPTER_ORDER.map((id) => {
              const on = activeChapter === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={cn(
                    "size-2 shrink-0 rounded-full transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface focus-visible:outline-none",
                    on ? "bg-primary" : "bg-inverse-foreground/25 hover:bg-inverse-foreground/45"
                  )}
                  aria-label={`Go to chapter ${id.replace(/-/g, " ")}`}
                  aria-current={on ? "step" : undefined}
                  onClick={() => scrollToId(`chapter-${id}`)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-end [&::-webkit-scrollbar]:hidden">
            {STAGE_NAV.map(({ id, label }) => {
              const on = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-eyebrow transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                    on
                      ? "bg-inverse-foreground/12 text-inverse-foreground ring-1 ring-primary/40"
                      : "text-inverse-foreground/55 hover:text-inverse-foreground"
                  )}
                  aria-current={on ? "page" : undefined}
                  onClick={() => scrollToId(id)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
