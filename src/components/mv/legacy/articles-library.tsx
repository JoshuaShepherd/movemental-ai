"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { articleHref } from "@/components/mv/routes";

import { MvArrow } from "./page-header";

export interface LibraryItem {
  slug: string;
  title: string;
  eyebrow: string;
  readTime: string;
  excerpt: string;
}

const ORDER = ["Canon", "Guide", "AI note", "Essay", "Methodology", "Playbook", "Field guide", "Case study"];

/** The article list with a filter by kind. Board: Kept pages · Articles. */
export function ArticlesLibrary({ items }: { items: readonly LibraryItem[] }) {
  const [kind, setKind] = useState<string | null>(null);
  const kinds = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) counts.set(i.eyebrow, (counts.get(i.eyebrow) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => {
      const ia = ORDER.indexOf(a[0]);
      const ib = ORDER.indexOf(b[0]);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }, [items]);
  const shown = kind ? items.filter((i) => i.eyebrow === kind) : items;

  return (
    <>
      {kinds.length > 1 ? (
        <div className="mv-fchips" role="group" aria-label="Filter by kind">
          <button type="button" className="mv-fchip" aria-pressed={kind === null} onClick={() => setKind(null)}>
            All <span className="mv-fchip-n">{items.length}</span>
          </button>
          {kinds.map(([k, n]) => (
            <button key={k} type="button" className="mv-fchip" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {k} <span className="mv-fchip-n">{n}</span>
            </button>
          ))}
        </div>
      ) : null}
      <ul className="mv-ix" style={{ marginTop: 24 }}>
        {shown.map((a) => (
          <li key={a.slug}>
            <Link className="mv-ix-row" href={articleHref(a.slug)}>
              <span className="mv-ix-meta">
                <span className="mv-ix-kind">{a.eyebrow}</span>
                <span>{a.readTime}</span>
              </span>
              <span className="mv-ix-main">
                <span className="mv-ix-title">{a.title}</span>
                {a.excerpt ? <span className="mv-ix-text">{a.excerpt}</span> : null}
              </span>
              <MvArrow />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
