"use client";

import { useEffect } from "react";

import { TYPE_PAIRS } from "@/lib/visual-style-finder/data/typography";

const LOADED = new Set<string>();

function googleFontsHref(families: string[]): string {
  const params = families
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

/** Loads Google Fonts for the active typography pairing only. */
export function useTypographyFonts(activeTypeId: string) {
  useEffect(() => {
    const pair = TYPE_PAIRS.find((p) => p.id === activeTypeId);
    if (!pair) return;

    const families = [...new Set([pair.hn, pair.bn])];
    const key = families.sort().join("|");
    if (LOADED.has(key)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = googleFontsHref(families);
    link.dataset.styleFinderFonts = key;
    document.head.appendChild(link);
    LOADED.add(key);

    return () => {
      link.remove();
    };
  }, [activeTypeId]);
}

/** Preload fonts for all pairs visible in the rail (debounced batch). */
export function useTypographyFontsBatch(pairIds: string[]) {
  useEffect(() => {
    const families = new Set<string>();
    pairIds.forEach((id) => {
      const p = TYPE_PAIRS.find((x) => x.id === id);
      if (p) {
        families.add(p.hn);
        families.add(p.bn);
      }
    });
    if (!families.size) return;

    const key = [...families].sort().join("|").slice(0, 80);
    if (LOADED.has(key)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = googleFontsHref([...families]);
    document.head.appendChild(link);
    LOADED.add(key);
  }, [pairIds]);
}
