import { Fragment, type ReactNode } from "react";

import styles from "./research.module.css";

/**
 * Renders copy that may contain a single highlighter span marked with
 * `{hl}` … `{/hl}` — wraps that run in the fluorescent Ink Band swipe.
 * Keeps seed copy as plain strings while letting the index/findings heroes
 * carry one emphasis mark.
 */
export function HighlightText({ text }: { text: string }): ReactNode {
  const parts = text.split(/\{hl\}|\{\/hl\}/);
  // Even indices are plain text; odd indices are highlighted runs.
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className={styles.highlighter}>
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
