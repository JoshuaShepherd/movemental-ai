import type { ReactNode } from "react";

import styles from "../ink-band.module.css";

/**
 * Presentational horizontal process accordion (Ink Band).
 *
 * Reference pattern C — equal columns where one expands with an ink-blue rail,
 * ghost step number, and an expanded body. Used by the path (§3.1) and pricing
 * (§3.4) screens. See
 * docs/build/notes/ink-band-interactive-ui-patterns-proposal.md §4.
 *
 * UI-only and **wide-viewport only**: the root carries `.paOnlyWide`, so it is
 * `display:none` below 768px. Each consumer renders its own vertical fallback
 * wrapped in `.paOnlyNarrow` (the existing, proven mobile markup). No data,
 * routing, or scene-runner coupling — click handling is delegated via
 * `onActiveChange`, so the consumer owns toggle semantics.
 */
export interface ProcessAccordionItem {
  id: string;
  /** Two-digit step index, e.g. "01" … "04". */
  step: string;
  title: string;
  /** Short line shown under the title in the active column. */
  summary?: string;
  /** Expanded body (active column only). */
  children: ReactNode;
  /** Optional mono tag row beneath the body. */
  tags?: string[];
}

export interface ProcessAccordionProps {
  items: ProcessAccordionItem[];
  /** Currently expanded column id (empty string = all collapsed). */
  activeId: string;
  /** Fired with the clicked column id; the consumer owns toggle behavior. */
  onActiveChange: (id: string) => void;
  ariaLabel?: string;
}

export function ProcessAccordion({
  items,
  activeId,
  onActiveChange,
  ariaLabel,
}: ProcessAccordionProps) {
  return (
    <div
      className={`${styles.processAccordion} ${styles.paOnlyWide}`}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <div
            key={item.id}
            className={`${styles.paColumn} ${isActive ? styles.paColumnActive : ""}`}
          >
            <button
              type="button"
              className={styles.paTrigger}
              aria-expanded={isActive}
              onClick={() => onActiveChange(item.id)}
            >
              <span className={styles.paNum} aria-hidden="true">
                {item.step}
              </span>
              <span className={styles.paTitle}>{item.title}</span>
            </button>
            <div className={styles.paPanel} aria-hidden={!isActive}>
              <div className={styles.paPanelInner}>
                {item.summary ? <p className={styles.paSummary}>{item.summary}</p> : null}
                {item.children}
                {item.tags && item.tags.length > 0 ? (
                  <div className={styles.paTags}>
                    {item.tags.map((t) => (
                      <span key={t} className={styles.paTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
