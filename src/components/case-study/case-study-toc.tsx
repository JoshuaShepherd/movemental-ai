"use client";

import { useEffect, useState } from "react";

import type { CaseStudySection } from "./types";

/**
 * Sticky vertical sidebar TOC for the case-study layout.
 *
 * Each entry anchors to the section's `id`. An IntersectionObserver tracks the
 * currently in-view section and highlights its row. On mobile the TOC
 * collapses behind a `<details>` summary so it doesn't dominate the viewport.
 */
export function CaseStudyToc({
  sections,
  ariaLabel = "On this page",
}: {
  sections: ReadonlyArray<CaseStudySection>;
  ariaLabel?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null,
  );

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Of the entries currently above the bottom-third trigger, pick the
        // first that's actively intersecting. Falls through to the closest
        // section if none are intersecting (during fast scrolls).
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a section is in the top third of the viewport so the
        // active row matches what the reader is actually reading.
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={ariaLabel} className="case-study-toc">
      <details className="case-study-toc__details" open>
        <summary className="case-study-toc__summary">
          <span className="case-study-toc__eyebrow">{ariaLabel}</span>
          <span aria-hidden className="case-study-toc__chevron">
            ▾
          </span>
        </summary>
        <ol className="case-study-toc__list">
          {sections.map((section, i) => {
            const isActive = section.id === activeId;
            return (
              <li
                key={section.id}
                className="case-study-toc__item"
                data-active={isActive ? "true" : undefined}
              >
                <a
                  href={`#${section.id}`}
                  className="case-study-toc__link"
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="case-study-toc__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="case-study-toc__label">
                    {section.navLabel}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </details>
    </nav>
  );
}
