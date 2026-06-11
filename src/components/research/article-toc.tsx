"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { ResearchSection } from "@/lib/research/data";

import styles from "./research.module.css";

/** Sticky contents rail with scroll-spy over the article's section anchors. */
export function ArticleToc({ sections }: { sections: ResearchSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className={styles.articleToc} aria-label="Table of contents">
      <div className={styles.articleTocInner}>
        <p className={cn(styles.eyebrow, styles.textMuted, styles.mb6)}>Contents</p>
        <nav className={styles.articleTocNav}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(styles.articleTocLink, active === s.id && styles.articleTocLinkActive)}
            >
              <span className={styles.articleTocDot} />
              <span className={styles.eyebrow}>{s.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
