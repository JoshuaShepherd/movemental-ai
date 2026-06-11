"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for the Institutions sidebar nav. Watches a list of section ids and
 * reports the index of the section currently dominating the viewport, so the
 * sidebar can highlight the active label and fade the rest by distance (the
 * reference scroll-nav: active item solid ink, neighbours dimming away).
 *
 * Uses one IntersectionObserver across all sections and picks the most-visible
 * intersecting entry. A top-biased rootMargin makes a section "active" once its
 * heading clears roughly the upper third of the screen, which matches how the
 * big section title reads as the current one while you scroll.
 */
export function useScrollSpy(ids: readonly string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId = ids[0];
        let bestRatio = -1;
        for (const id of ids) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        const idx = ids.indexOf(bestId);
        if (idx !== -1) setActive(idx);
      },
      {
        // Bias the "active" line toward the upper-middle of the viewport.
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
