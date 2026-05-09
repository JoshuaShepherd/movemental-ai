"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { FieldGuideTocEntry } from "@/lib/field-guide";

export function FieldGuideToc({ entries }: { entries: readonly FieldGuideTocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records.filter((r) => r.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((acc, cur) =>
          (cur.boundingClientRect.top ?? 0) < (acc.boundingClientRect.top ?? 0) ? cur : acc,
        );
        const id = top.target.getAttribute("id");
        if (id) setActiveId(id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    for (const entry of entries) {
      const node = document.getElementById(entry.id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Field Guide contents" className="field-guide-toc">
      <p className="field-guide-toc__label">Contents</p>
      <ol>
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={cn(
              "field-guide-toc__item",
              entry.depth === 3 && "field-guide-toc__item--sub",
              entry.id === activeId && "field-guide-toc__item--active",
            )}
          >
            <a href={`#${entry.id}`}>{entry.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
