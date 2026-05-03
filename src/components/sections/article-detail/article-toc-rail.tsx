"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/articles";

/**
 * Desktop sticky TOC rail. On mobile the mirror is a `<details>` block; this
 * component is hidden under `lg`. Scroll-spy uses IntersectionObserver and
 * activates the first heading that enters the top 35% of the viewport.
 */
export function ArticleTocRail({ items }: { items: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (!items.length) return;
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside
      aria-label="Table of contents"
      className="hidden lg:sticky lg:top-[calc(var(--site-chrome-total,4.125rem)+1.25rem)] lg:block lg:max-h-[calc(100vh-var(--site-chrome-total,4.125rem)-2rem)] lg:self-start lg:overflow-y-auto"
    >
      <p className="mb-4 text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 border-transparent py-1 text-[0.84rem] leading-snug font-medium text-muted-foreground transition-colors hover:text-foreground",
                item.depth === 3 && "pl-7 text-[0.8rem] font-normal",
                item.depth === 2 && "pl-[0.85rem]",
                activeId === item.id && "border-primary text-primary"
              )}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
