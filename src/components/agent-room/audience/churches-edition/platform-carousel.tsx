"use client";

import { useCallback, useState } from "react";

import type { EditionCarouselSlide } from "./churches-edition-types";
import styles from "./churches-edition.module.css";

type PlatformCarouselProps = {
  slides: readonly EditionCarouselSlide[];
};

function SlideContent({ slide }: { slide: EditionCarouselSlide }) {
  if (slide.kind === "quote") {
    return (
      <>
        <p className={styles.slideQuote}>{slide.quote}</p>
        {slide.body ? <p className={styles.slideBody}>{slide.body}</p> : null}
      </>
    );
  }

  return (
    <p className={styles.slideBody}>
      {slide.bold ? <b className={styles.slideBodyBold}>{slide.bold}</b> : null}{" "}
      {slide.body}
    </p>
  );
}

export function PlatformCarousel({ slides }: PlatformCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  return (
    <>
      <div
        className={styles.carousel}
        aria-roledescription="carousel"
        aria-label="Why a platform, not a website builder"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === index ? styles.slideOn : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            <SlideContent slide={slide} />
          </div>
        ))}
      </div>

      <div className={styles.carouselDots}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.carouselDot} ${i === index ? styles.carouselDotOn : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
          />
        ))}
        <button
          type="button"
          className={styles.carouselArrow}
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
        >
          ←
        </button>
        <button
          type="button"
          className={styles.carouselArrow}
          aria-label="Next slide"
          onClick={() => go(index + 1)}
        >
          →
        </button>
      </div>
    </>
  );
}
