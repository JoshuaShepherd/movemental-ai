import type { ReactNode } from "react";

import styles from "./deck.module.css";
import type { DeckGesture } from "./deck-types";

/** Sketchy underline drawn under the phrase (references global #rough filter). */
function Underline({ children }: { children: ReactNode }) {
  return (
    <span className={styles.u}>
      {children}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 8 Q100 2 197 7" />
      </svg>
    </span>
  );
}

/** Hand-drawn circle around the phrase. */
function Circle({ children }: { children: ReactNode }) {
  return (
    <span className={styles.c}>
      {children}
      <svg viewBox="0 0 170 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M85 7 C133 7 147 27 145 41 C143 61 115 73 85 73 C45 73 9 61 7 41 C5 23 37 7 85 7" />
      </svg>
    </span>
  );
}

/** Fluorescent marker swipe behind the phrase (references global #marker filter). */
function Highlight({ children }: { children: ReactNode }) {
  return <span className={styles.hl}>{children}</span>;
}

function wrap(type: DeckGesture["type"], phrase: string): ReactNode {
  if (type === "circle") return <Circle key="g">{phrase}</Circle>;
  if (type === "highlight") return <Highlight key="g">{phrase}</Highlight>;
  return <Underline key="g">{phrase}</Underline>;
}

/**
 * Wrap the first occurrence of `gesture.phrase` in `text` with its gesture.
 * Returns `{ node, matched }` so callers can apply a gesture to exactly one
 * place per slide (heading first, then the first matching paragraph).
 */
export function applyGesture(
  text: string,
  gesture: DeckGesture | undefined,
): { node: ReactNode; matched: boolean } {
  if (!gesture) return { node: text, matched: false };
  const i = text.indexOf(gesture.phrase);
  if (i === -1) return { node: text, matched: false };
  const before = text.slice(0, i);
  const after = text.slice(i + gesture.phrase.length);
  return {
    node: (
      <>
        {before}
        {wrap(gesture.type, gesture.phrase)}
        {after}
      </>
    ),
    matched: true,
  };
}
