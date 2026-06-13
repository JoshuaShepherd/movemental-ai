"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./deck.module.css";
import { DeckSlideView } from "./deck-slide";
import { DeckStage } from "./deck-stage";
import type { DeckData } from "./deck-types";

type DeckSectionProps = {
  data: DeckData;
  /** Footer line stamped on each slide. */
  foot: string;
  /** Anchor id for the left-nav + scroll-spy (e.g. "why-a-platform"). */
  anchorId: string;
  /** Seam-out target reached by Skip / continuing past the deck. */
  skipToId: string;
};

/**
 * Single-viewport placeholder until the interactive stage mounts — one slide
 * height, never the full vertical stack (avoids double-painting the title slide).
 */
function DeckFallbackShell({ data, foot }: { data: DeckData; foot: string }) {
  const firstSlide = data.slides[0];
  if (!firstSlide) return null;

  return (
    <div className={`${styles.stage} ${styles.modeDeck} ${styles.fallbackShell}`}>
      <div className={styles.track}>
        <DeckSlideView slide={firstSlide} diagram={data.diagram} foot={foot} />
      </div>
    </div>
  );
}

/**
 * Embedded deck — a first-class section of the audience document. No card,
 * border, or shadow: the warm paper runs straight through so it reads as the
 * page continuing, not a widget. Lazy-mounts the interactive stage when it
 * nears the viewport; before that (and with JS off) it shows one slide shell.
 */
export function DeckSection({ data, foot, anchorId, skipToId }: DeckSectionProps) {
  const [near, setNear] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <section id={anchorId} ref={ref} className={styles.embedSection} aria-label={data.ariaLabel}>
      {near ? (
        <DeckStage data={data} foot={foot} variant="embedded" skipToId={skipToId} />
      ) : (
        <DeckFallbackShell data={data} foot={foot} />
      )}
    </section>
  );
}
