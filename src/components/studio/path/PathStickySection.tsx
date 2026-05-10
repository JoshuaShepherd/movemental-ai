"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { stageMeta } from "@/data/shared-path-data";

import { SafetyContent } from "./stages/SafetyContent";
import { SandboxContent } from "./stages/SandboxContent";
import { SkillsContent } from "./stages/SkillsContent";
import { SolutionsContent } from "./stages/SolutionsContent";

export function PathStickySection() {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const meterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<number, number>();

    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.set(i, entry.intersectionRatio || 0.001);
            } else {
              visible.delete(i);
            }
          }
          if (visible.size > 0) {
            let bestIndex = 0;
            let bestRatio = -1;
            visible.forEach((ratio, idx) => {
              if (ratio > bestRatio) {
                bestRatio = ratio;
                bestIndex = idx;
              }
            });
            setActiveStage(bestIndex);
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el || !meterRef.current) return;
        const rect = el.getBoundingClientRect();
        const viewport = window.innerHeight || 0;
        const total = rect.height + viewport;
        const traveled = viewport - rect.top;
        const pct = Math.max(0, Math.min(1, traveled / total));
        meterRef.current.style.height = `${pct * 100}%`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleJump = useCallback((index: number) => {
    const target = panelRefs.current[index];
    if (!target) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  const StageComponent = [SafetyContent, SandboxContent, SkillsContent, SolutionsContent];

  return (
    <section ref={sectionRef} className="band-section" id="path" aria-labelledby="path-section-title">
      <h2 id="path-section-title" className="sr-only">
        The four stages of the Movemental Path
      </h2>
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 min-[960px]:grid-cols-[33%_1fr] min-[960px]:gap-12 lg:gap-16">
          <div className="relative hidden min-[960px]:block min-[960px]:self-start" aria-label="Path stages">
            <div className="sticky top-[var(--site-chrome-total,4.25rem)] flex max-h-[calc(100dvh-var(--site-chrome-total,4.25rem))] gap-8 overflow-y-auto rounded-card border border-border bg-section p-8">
              <div className="pointer-events-none absolute inset-0 rounded-card bg-linear-to-br from-background/40 to-transparent" />

              <div className="relative h-[400px] w-1 flex-shrink-0 rounded-full bg-border">
                <div
                  ref={meterRef}
                  className="absolute top-0 left-0 w-full rounded-full bg-foreground transition-all duration-100 ease-linear"
                  style={{ height: "0%" }}
                />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-between py-1">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleJump(i)}
                      className={cn(
                        "h-4 w-4 rounded-full border-2 bg-section transition-colors",
                        activeStage >= i ? "border-foreground" : "border-border hover:border-foreground/40",
                      )}
                      aria-label={`Jump to ${stageMeta[i].name}`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex w-full flex-col justify-center">
                <div className="mb-6 flex gap-1">
                  {[0, 1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                        dot === activeStage ? "bg-primary" : "bg-border",
                      )}
                    />
                  ))}
                </div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-eyebrow text-foreground/50 transition-all">
                  Stage {stageMeta[activeStage].num} of 04
                </div>
                <h3 className="font-serif-display mb-6 text-3xl italic transition-all">{stageMeta[activeStage].name}</h3>

                <div key={activeStage} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <p className="mb-6 text-lg font-medium leading-relaxed text-foreground">{stageMeta[activeStage].tagline}</p>

                  <a
                    href={`#stage-${stageMeta[activeStage].num}`}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-primary transition-opacity hover:opacity-80"
                  >
                    Read requirements <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {stageMeta.map((stage, i) => {
              const Content = StageComponent[i];
              return (
                <article
                  key={i}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  id={`stage-${stage.num}`}
                  className="stage-panel scroll-mt-[calc(var(--site-chrome-total,4.25rem)+1rem)] min-h-[90vh] border-b border-border py-16 last:min-h-[70vh] last:border-b-0 lg:py-24"
                >
                  <div className="mb-10 flex items-center gap-4 md:hidden">
                    <span className="text-sm font-semibold uppercase tracking-eyebrow text-foreground/60">
                      Stage {stage.num} of 04 <span className="mx-2 text-border">/</span>{" "}
                      <em className="text-foreground">{stage.name}</em>
                    </span>
                  </div>
                  <Content />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
