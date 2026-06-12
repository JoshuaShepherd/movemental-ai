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
 * Static, no-JS / pre-mount fallback: the slides as a plain vertical stack.
 * This is the SSR content (indexable, accessible) and what renders until the
 * section nears the viewport — so the interactive deck (and GSAP) cost nothing
 * on initial page load.
 */
function DeckFallbackStack({ data, foot }: { data: DeckData; foot: string }) {
  return (
    <div className={`${styles.stage} ${styles.modeStack}`}>
      <div className={styles.track}>
        {data.slides.map((slide) => (
          <DeckSlideView key={slide.id} slide={slide} diagram={data.diagram} foot={foot} />
        ))}
      </div>
    </div>
  );
}

/**
 * Embedded deck — a first-class section of the audience document. No card,
 * border, or shadow: the warm paper runs straight through so it reads as the
 * page continuing, not a widget. Lazy-mounts the interactive stage when it
 * nears the viewport; before that (and with JS off) it shows the slide stack.
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
        <DeckFallbackStack data={data} foot={foot} />
      )}
    </section>
  );
}
