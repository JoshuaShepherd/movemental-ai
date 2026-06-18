"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

import type { EditionCharterPart } from "./churches-edition-types";
import styles from "./churches-edition.module.css";
import { RevealOnScroll } from "./reveal-on-scroll";

type CharterTabsProps = {
  parts: readonly EditionCharterPart[];
};

export function CharterTabs({ parts }: CharterTabsProps) {
  const [active, setActive] = useState(0);
  const current = parts[active] ?? parts[0];

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((index + 1) % parts.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((index - 1 + parts.length) % parts.length);
      }
    },
    [parts.length],
  );

  if (!current) return null;

  return (
    <RevealOnScroll>
      <div className={styles.charter}>
        <div className={styles.charterTabs} role="tablist" aria-label="AI Safety Charter parts">
          {parts.map((part, index) => (
            <button
              key={part.title}
              type="button"
              role="tab"
              id={`charter-tab-${part.title}`}
              aria-selected={active === index}
              aria-controls="charter-panel"
              tabIndex={active === index ? 0 : -1}
              className={`${styles.charterTab} ${active === index ? styles.charterTabOn : ""}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {part.title}
            </button>
          ))}
        </div>
        <div
          id="charter-panel"
          role="tabpanel"
          aria-labelledby={`charter-tab-${current.title}`}
          className={styles.charterPanel}
        >
          <span className={styles.charterNo}>{current.n}</span>
          <div>
            <h3 className={styles.charterPanelTitle}>{current.title}</h3>
            <p className={styles.charterPanelBody}>{current.body}</p>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
