"use client";

import { useCallback, useEffect, useRef } from "react";

import styles from "./deck.module.css";
import { DeckSlideView } from "./deck-slide";
import type { DeckData } from "./deck-types";
import { useDeckControls, useDeckMode } from "./use-deck";

type DeckStageProps = {
  data: DeckData;
  foot: string;
  /** "embedded" pins in-flow; "standalone" fills the viewport. */
  variant: "embedded" | "standalone";
  /** Section id to jump to on Skip (embedded only — the seam-out target). */
  skipToId?: string;
};

/**
 * One interactive renderer for the deck, three layout modes (see useDeckMode):
 *   deck  — horizontal translate track, control-driven; embedded variant pins
 *           it with GSAP ScrollTrigger (lazy-imported), standalone fills screen.
 *   snap  — native horizontal scroll-snap (touch); controls scroll, not jack.
 *   stack — plain vertical stack (reduced-motion); page scroll, no pin.
 * Slides never advance on scroll — only via arrows / dots / swipe / keyboard —
 * so the diagram toggle stays usable while the deck is pinned.
 */
export function DeckStage({ data, foot, variant, skipToId }: DeckStageProps) {
  const mode = useDeckMode();
  const count = data.slides.length;
  const { index, setIndex } = useDeckControls(count);

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const indexRef = useRef(index);
  indexRef.current = index;

  const slideEls = useCallback(
    () => Array.from(trackRef.current?.children ?? []) as HTMLElement[],
    [],
  );

  const scrollToSlide = useCallback(
    (k: number) => {
      const el = slideEls()[k];
      if (!el) return;
      if (modeRef.current === "snap") {
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } else if (modeRef.current === "stack") {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [slideEls],
  );

  /** Canonical "go to slide k" — updates index and, off deck mode, scrolls. */
  const select = useCallback(
    (k: number) => {
      const c = Math.min(count - 1, Math.max(0, k));
      setIndex(c);
      if (modeRef.current !== "deck") requestAnimationFrame(() => scrollToSlide(c));
    },
    [count, setIndex, scrollToSlide],
  );
  const go = useCallback((d: number) => select(indexRef.current + d), [select]);

  const skip = useCallback(() => {
    if (!skipToId) return;
    document.getElementById(skipToId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [skipToId]);

  // ---- Keyboard: scoped to the stage (embedded) so the page isn't hijacked;
  //      window-level for standalone where the deck IS the page. ----
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        select(0);
      } else if (e.key === "End") {
        e.preventDefault();
        select(count - 1);
      }
    },
    [go, select, count],
  );

  useEffect(() => {
    if (variant !== "standalone") return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, onKey]);

  // ---- Touch swipe (deck mode only; snap mode uses native scrolling). ----
  useEffect(() => {
    if (mode !== "deck") return;
    const el = stageRef.current;
    if (!el) return;
    let x0: number | null = null;
    const start = (e: TouchEvent) => (x0 = e.touches[0]?.clientX ?? null);
    const end = (e: TouchEvent) => {
      if (x0 === null) return;
      const dx = (e.changedTouches[0]?.clientX ?? x0) - x0;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      x0 = null;
    };
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", end, { passive: true });
    return () => {
      el.removeEventListener("touchstart", start);
      el.removeEventListener("touchend", end);
    };
  }, [mode, go]);

  // ---- Track index from native scroll in snap / stack modes (so dots follow
  //      a swipe or a page scroll). Deck mode is purely state-driven. ----
  useEffect(() => {
    if (mode === "deck") return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const els = slideEls();
      if (!els.length) return;
      let best = 0;
      let bestDist = Infinity;
      if (mode === "snap") {
        const track = trackRef.current!;
        const center = track.scrollLeft + track.clientWidth / 2;
        els.forEach((el, i) => {
          const c = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(c - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
      } else {
        const center = window.innerHeight / 2;
        els.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
      }
      if (best !== indexRef.current) setIndex(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const target: EventTarget = mode === "snap" ? trackRef.current! : window;
    target.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      target.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode, slideEls, setIndex]);

  // ---- Pin (embedded + deck mode): GSAP lazy-imported so it costs nothing on
  //      initial page load. No scroll→slide mapping; the runway just holds the
  //      deck in view while the reader clicks through. Skip / dots always exit. ----
  useEffect(() => {
    if (variant !== "embedded" || mode !== "deck") return;
    let killed = false;
    let trigger: { kill: (revert?: boolean) => void } | null = null;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (killed || !stageRef.current) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);
      trigger = ScrollTrigger.create({
        trigger: stageRef.current,
        start: "center center",
        end: () => "+=" + window.innerHeight,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    })();
    return () => {
      killed = true;
      trigger?.kill(true);
    };
  }, [variant, mode]);

  const stageClass = [
    styles.stage,
    mode === "deck" ? styles.modeDeck : mode === "snap" ? styles.modeSnap : styles.modeStack,
    variant === "standalone" && mode === "deck" ? styles.standalone : "",
  ]
    .filter(Boolean)
    .join(" ");

  const trackStyle =
    mode === "deck" ? { transform: `translateX(-${index * 100}%)` } : undefined;

  return (
    <div
      ref={stageRef}
      className={stageClass}
      role="region"
      aria-roledescription="carousel"
      aria-label={data.ariaLabel}
      tabIndex={variant === "embedded" ? 0 : -1}
      onKeyDown={variant === "embedded" ? (e) => onKey(e.nativeEvent) : undefined}
    >
      {skipToId ? (
        <button type="button" className={styles.skip} onClick={skip}>
          Skip ↓
        </button>
      ) : null}

      {mode === "deck" ? (
        <div className={styles.counter} aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </div>
      ) : null}

      <div ref={trackRef} className={styles.track} style={trackStyle}>
        {data.slides.map((slide, i) => (
          <DeckSlideView
            key={slide.id}
            slide={slide}
            diagram={data.diagram}
            foot={foot}
            hidden={mode === "deck" && i !== index}
          />
        ))}
      </div>

      <div className={styles.controls}>
        {mode !== "stack" ? (
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous slide"
          >
            ←
          </button>
        ) : null}
        <div className={styles.dots} role="tablist" aria-label="Slides">
          {data.slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}${slide.heading ? `: ${slide.heading}` : ""}`}
              className={`${styles.dot} ${i === index ? styles.dotOn : ""}`}
              onClick={() => select(i)}
            />
          ))}
        </div>
        {mode !== "stack" ? (
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(1)}
            disabled={index === count - 1}
            aria-label="Next slide"
          >
            →
          </button>
        ) : null}
      </div>
    </div>
  );
}
