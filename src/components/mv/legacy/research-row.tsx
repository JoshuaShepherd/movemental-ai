import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import type { ResearchItem } from "@/lib/research/data";

import { researchHref } from "@/components/mv/routes";

import { MvArrow } from "./page-header";

/** `{hl}` … `{/hl}` marks the one highlighted run in seed copy. */
export function Hl({ text }: { text: string }): ReactNode {
  return text.split(/\{hl\}|\{\/hl\}/).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="mv-hl-mark">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function kindLabel(item: ResearchItem): string {
  return item.year ? `${item.kind} · ${item.year}` : item.kind;
}

export function ResearchRowItem({ item }: { item: ResearchItem }) {
  return (
    <li>
      <Link className="mv-ix-row" href={researchHref(item.slug)} data-lead={item.flagship || item.featured ? "true" : undefined}>
        <span className="mv-ix-meta">
          <span className="mv-ix-kind">{kindLabel(item)}</span>
          {item.flagship ? <span className="mv-ix-badge">Flagship</span> : item.featured ? <span className="mv-ix-badge">Featured</span> : null}
        </span>
        <span className="mv-ix-main">
          <span className="mv-ix-title">{item.title}</span>
          <span className="mv-ix-text">
            <Hl text={item.abstract} />
          </span>
          {item.thesisNote ? <em className="mv-ix-note">{item.thesisNote.replace(/^\*|\*$/g, "")}</em> : null}
          <span className="mv-ix-meta mv-ix-meta--row">
            <span>{item.readMin} min</span>
            <span>{item.sourceCount} sources</span>
          </span>
        </span>
        <MvArrow />
      </Link>
    </li>
  );
}

