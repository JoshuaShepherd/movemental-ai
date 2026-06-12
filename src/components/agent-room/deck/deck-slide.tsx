import type { ReactNode } from "react";

import styles from "./deck.module.css";
import { applyGesture } from "./deck-gesture";
import { DeckDiagramView } from "./deck-diagram";
import type { DeckData, DeckSlide } from "./deck-types";

type DeckSlideViewProps = {
  slide: DeckSlide;
  diagram: DeckData["diagram"];
  /** Footer line shown on each slide (e.g. "Movemental · For nonprofits"). */
  foot: string;
  /** Hidden from assistive tech / tab order when off-screen in deck mode. */
  hidden?: boolean;
};

/** One slide, rendered from data. Used identically by every layout mode. */
export function DeckSlideView({ slide, diagram, foot, hidden }: DeckSlideViewProps) {
  const dark = slide.kind === "title" || slide.kind === "close";
  const isTitle = slide.kind === "title";

  // One gesture per slide: try the heading first, then the first matching body
  // paragraph. `gestureUsed` guarantees we never wrap more than once.
  let gestureUsed = false;
  let headingNode: ReactNode = slide.heading;
  if (slide.heading && slide.gesture) {
    const res = applyGesture(slide.heading, slide.gesture);
    headingNode = res.node;
    gestureUsed = res.matched;
  }

  const renderBody = (text: string): ReactNode => {
    if (slide.gesture && !gestureUsed) {
      const res = applyGesture(text, slide.gesture);
      if (res.matched) {
        gestureUsed = true;
        return res.node;
      }
    }
    return text;
  };

  return (
    <section
      className={`${styles.slide} ${dark ? styles.dark : ""}`}
      aria-label={slide.heading}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      <div className={styles.inner}>
        {slide.eyebrow ? <p className={styles.eyebrow}>{slide.eyebrow}</p> : null}

        {slide.heading ? (
          isTitle ? (
            <h1 className={styles.h1}>{headingNode}</h1>
          ) : slide.kind === "quote" ? (
            <p className={styles.q}>{headingNode}</p>
          ) : (
            <h2 className={styles.h2}>{headingNode}</h2>
          )
        ) : null}

        {slide.parts ? (
          <div className={styles.parts}>
            {slide.parts.map((part) => (
              <div key={part.n} className={styles.part}>
                <span className={styles.partN}>{part.n}</span>
                <span>
                  <span className={styles.partT}>{part.title}</span>{" "}
                  <span className={styles.partD}>{part.desc}</span>
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {slide.kind === "diagram" ? <DeckDiagramView diagram={diagram} /> : null}

        {slide.body?.map((para) => (
          <p key={para.slice(0, 40)} className={isTitle ? styles.sub : styles.lead}>
            {isTitle ? para : renderBody(para)}
          </p>
        ))}
      </div>
      <div className={styles.foot} aria-hidden="true">
        {foot}
      </div>
    </section>
  );
}
