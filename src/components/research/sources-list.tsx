"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ResearchSource } from "@/lib/research/data";

import styles from "./research.module.css";

/**
 * The master source list. Hover/focus activates a row — surfacing its accent
 * rule and (where present) the handwritten callout. First row active by default.
 */
export function SourcesList({ sources }: { sources: ResearchSource[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.sourcesList}>
      {sources.map((source, i) => {
        const isLast = i === sources.length - 1;
        return (
          <a
            key={source.index}
            href={source.url ?? "#"}
            target={source.url ? "_blank" : undefined}
            rel={source.url ? "noreferrer" : undefined}
            className={cn(
              styles.sourcesItem,
              i === active && styles.sourcesItemActive,
              isLast && styles.sourcesItemLast,
            )}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className={styles.sourcesItemNum}>[{source.index}]</span>
            <div className={styles.sourcesItemBody}>
              <p className={styles.sourcesItemTitle}>{source.title}</p>
              <p className={cn(styles.sourcesItemMeta, styles.caption)}>{source.meta}</p>
            </div>
            <span className={styles.sourcesItemView}>
              View
              <ArrowUpRight className={styles.iconSm} aria-hidden />
            </span>
            {source.callout ? (
              <span className={styles.sourcesCallout}>{source.callout}</span>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}
