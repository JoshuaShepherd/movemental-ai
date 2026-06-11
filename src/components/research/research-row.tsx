import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ResearchItem } from "@/lib/research/data";

import { HighlightText } from "./highlight-text";
import styles from "./research.module.css";

function kindLabel(item: ResearchItem): string {
  return item.year ? `${item.kind} · ${item.year}` : item.kind;
}

/** One row in the research index / archive — the whole row links to the reader. */
export function ResearchRow({ item }: { item: ResearchItem }) {
  return (
    <Link
      href={`/research/${item.slug}`}
      className={cn(styles.researchItem, item.thesisNote && styles.researchItemRelative)}
    >
      <div className={styles.researchItemType}>
        <span
          className={cn(
            styles.caption,
            item.flagship ? styles.textInkBlue : styles.textFaint,
            styles.typeLabel,
          )}
        >
          {kindLabel(item)}
        </span>
        {item.flagship ? (
          <div className={styles.researchItemFlagship}>
            <span className={styles.researchItemFlagshipBar} />
            <span className={cn(styles.eyebrow, styles.textInkBlue)}>Flagship</span>
          </div>
        ) : item.featured ? (
          <div className={styles.researchItemFlagship}>
            <span className={cn(styles.eyebrow, styles.textInkBlue)}>Featured</span>
          </div>
        ) : null}
        {item.thesisNote ? (
          <p
            className={cn(styles.marginNote, styles.marginNoteMobileOnly, styles.thesisNote)}
          >
            {item.thesisNote}
          </p>
        ) : null}
      </div>

      <div className={item.thesisNote ? styles.researchItemRelative : undefined}>
        <h2
          className={cn(
            styles.researchItemTitle,
            item.flagship || item.featured ? styles.headlineLg : styles.headlineMd,
          )}
        >
          {item.title}
        </h2>
        <p className={styles.researchItemAbstract}>
          <HighlightText text={item.abstract} />
        </p>
        {item.thesisNote ? (
          <div
            className={cn(styles.marginNote, styles.marginNoteLeft, styles.marginNoteDesktopOnly)}
          >
            {item.thesisNote}
          </div>
        ) : null}
      </div>

      <div className={styles.researchItemMeta}>
        <div className={cn(styles.researchItemStats, styles.eyebrow)}>
          <span>{item.readMin} min</span>
          <span className={styles.researchItemStatsDot} />
          <span>{item.sourceCount} sources</span>
        </div>
      </div>
    </Link>
  );
}
