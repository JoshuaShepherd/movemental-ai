"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/primitives";

import { stageMeta } from "./data/shared";
import { PathRail } from "./PathRail";
import { SafetyContent } from "./stages/SafetyContent";
import { SandboxContent } from "./stages/SandboxContent";
import { SkillsContent } from "./stages/SkillsContent";
import { SolutionsContent } from "./stages/SolutionsContent";
import { StepPanel } from "./StepPanel";

/**
 * PathStickySection — the four-stage sticky scroll experience.
 *
 * Layout: 33%/66% grid at ≥960px. Left rail is sticky. Right column is the
 * four scrolling step panels.
 *
 * Active-stage tracking uses IntersectionObserver with a tight center band
 * (`-45% 0px -45% 0px`) so the matching panel "claims" the rail as it
 * crosses the viewport center. Progress is measured separately by reading
 * the section's bounding rect on scroll, so the meter ink fill grows
 * smoothly through the whole section.
 *
 * Click-to-jump: meter ticks call `scrollIntoView` on the matching panel
 * (or `auto` behavior when the user prefers reduced motion).
 */
const STAGE_CONTENT = [
  <SafetyContent key="safety" />,
  <SandboxContent key="sandbox" />,
  <SkillsContent key="skills" />,
  <SolutionsContent key="solutions" />,
];

export function PathStickySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  // Active-panel detection via IntersectionObserver — picks whichever panel
  // is closest to the viewport center.
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
            // Active is the panel with the highest intersection ratio in the
            // tight center band; ties resolve to the lowest index.
            let bestIndex = activeIndex;
            let bestRatio = -1;
            visible.forEach((ratio, idx) => {
              if (ratio > bestRatio) {
                bestRatio = ratio;
                bestIndex = idx;
              }
            });
            setActiveIndex(bestIndex);
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuous scroll progress — drives the meter ink fill height.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewport = window.innerHeight || 0;
        const total = rect.height + viewport;
        const traveled = viewport - rect.top;
        const pct = Math.max(0, Math.min(1, traveled / total));
        setProgress(pct);
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
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <section
      id="path"
      aria-labelledby="path-section-title"
      className="relative bg-background border-t border-border pb-16 sm:pb-28"
      ref={sectionRef}
    >
      <h2 id="path-section-title" className="sr-only">
        The four stages of the Movemental Path
      </h2>
      <Container>
        <div className="grid grid-cols-1 min-[960px]:grid-cols-[33%_1fr] gap-10 min-[960px]:gap-12 lg:gap-16">
          <PathRail
            activeIndex={activeIndex}
            progress={progress}
            onJump={handleJump}
          />

          <div className="flex flex-col">
            {stageMeta.map((stage, i) => (
              <div
                key={stage.num}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
              >
                <StepPanel
                  index={i}
                  name={stage.name}
                  sentence={stage.sentence}
                  panelId={`stage-${stage.name.toLowerCase()}`}
                >
                  {STAGE_CONTENT[i]}
                </StepPanel>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
