/* eslint-disable @next/next/no-img-element -- static portraits; img keeps FLIP hooks (AF-10). */
"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import styles from "../../ink-band.module.css";
import { setPendingFlip } from "./leader-flip";

/** Desktop: more compact faces visible; mobile: one full card + peek of the next. */
const VISIBLE_DESKTOP = 5;
const VISIBLE_WIDE = 6;
const VISIBLE_MOBILE = 1.2;

/** Portrait + card chrome (padding, meta, gaps) below the square image. */
const CARD_CHROME_PX = 54;
/** Carousel foot (nav + progress) below the track. */
const CAROUSEL_FOOT_PX = 62;

const CARD_WIDTH_MAX = {
  wide: 96,
  desktop: 92,
  mobile: 80,
} as const;
const CARD_WIDTH_MIN = 56;

function visibleCount(availableWidth: number): number {
  if (availableWidth >= 1100) return VISIBLE_WIDE;
  if (availableWidth >= 768) return VISIBLE_DESKTOP;
  return VISIBLE_MOBILE;
}

function maxCardWidthForViewport(availableWidth: number): number {
  if (availableWidth >= 1100) return CARD_WIDTH_MAX.wide;
  if (availableWidth >= 768) return CARD_WIDTH_MAX.desktop;
  return CARD_WIDTH_MAX.mobile;
}

function heightBudgetForShell(shell: HTMLElement): number | null {
  const stage = shell.closest("[data-agent-screen]") as HTMLElement | null;
  if (!stage) return null;

  const stageStyle = getComputedStyle(stage);
  const stageHeight =
    stage.clientHeight -
    (parseFloat(stageStyle.paddingTop) || 0) -
    (parseFloat(stageStyle.paddingBottom) || 0);
  const shellTop = shell.getBoundingClientRect().top - stage.getBoundingClientRect().top;
  const belowTrack = CAROUSEL_FOOT_PX + 6;

  return stageHeight - shellTop - belowTrack;
}

function selectLeader(i: number, onSelect: (i: number) => void) {
  const ph = document.getElementById(`ph-${i}`);
  setPendingFlip(ph ? ph.getBoundingClientRect() : null);
  onSelect(i);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface LeaderCarouselProps {
  /** Leader band indices in display order (shuffled or natural). */
  order: readonly number[];
  onSelect: (leaderIndex: number) => void;
  disabled?: boolean;
  /** Optional aria label for the carousel region. */
  ariaLabel?: string;
}

/**
 * Rounded-card proof carousel (Ink Band pattern D). Scroll-snap track with
 * prev/next controls and a position pill. Reusable for founders band (P3).
 */
export function LeaderCarousel({
  order,
  onSelect,
  disabled,
  ariaLabel = "Trusted voices",
}: LeaderCarouselProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [geom, setGeom] = useState({ cardWidth: 0, gap: 14, maxIndex: 0, visible: VISIBLE_DESKTOP });

  const measure = useCallback(() => {
    const shell = shellRef.current;
    const track = trackRef.current;
    if (!shell || !track) return;

    const available = shell.clientWidth;
    const visible = visibleCount(available);
    const gap = 10;
    const widthBased = Math.floor((available - gap * (Math.ceil(visible) - 1)) / visible);

    let maxCard = maxCardWidthForViewport(available);
    const heightBudget = heightBudgetForShell(shell);
    if (heightBudget != null && heightBudget > 0) {
      const maxFromHeight = Math.floor(heightBudget - CARD_CHROME_PX);
      if (maxFromHeight > 0) {
        maxCard = Math.min(maxCard, maxFromHeight);
      }
    }

    const cardWidth = Math.max(CARD_WIDTH_MIN, Math.min(widthBased, maxCard));
    const step = cardWidth + gap;
    const maxIndex = Math.max(0, order.length - Math.floor(visible));
    const resolvedMax = Math.min(maxIndex, order.length - 1);

    setGeom((prev) => {
      if (
        prev.cardWidth === cardWidth &&
        prev.maxIndex === resolvedMax &&
        prev.visible === visible
      ) {
        return prev;
      }
      return { cardWidth, gap, maxIndex: resolvedMax, visible };
    });
    setIndex((i) => Math.min(i, resolvedMax));
  }, [order.length]);

  useLayoutEffect(() => {
    measure();
  }, [measure, order]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(shell);
    const stage = shell.closest("[data-agent-screen]");
    if (stage) ro.observe(stage);
    return () => ro.disconnect();
  }, [measure]);

  const scrollToIndex = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(geom.maxIndex, next));
      const offset = clamped * (geom.cardWidth + geom.gap);
      track.scrollTo({
        left: offset,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      setIndex(clamped);
    },
    [geom.cardWidth, geom.gap, geom.maxIndex],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const step = geom.cardWidth + geom.gap;
      if (step <= 0) return;
      const i = Math.round(track.scrollLeft / step);
      setIndex(Math.max(0, Math.min(geom.maxIndex, i)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [geom.cardWidth, geom.gap, geom.maxIndex]);

  const atStart = index <= 0;
  const atEnd = index >= geom.maxIndex;
  const positionLabel = `${index + 1} / ${order.length}`;
  const progressPct = geom.maxIndex > 0 ? (index / geom.maxIndex) * 100 : 100;

  return (
    <div
      className={styles.leaderCarousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className={styles.carouselShell} ref={shellRef}>
        <div
          className={styles.leaderCarouselTrack}
          ref={trackRef}
          style={
            geom.cardWidth > 0
              ? ({
                  "--leader-card-w": `${geom.cardWidth}px`,
                  "--leader-gap": `${geom.gap}px`,
                } as CSSProperties)
              : undefined
          }
        >
          {order.map((leaderIndex, pos) => {
            const leader = LEADERS[leaderIndex]!;
            return (
              <div
                key={leaderIndex}
                className={styles.leaderCard}
                role="group"
                aria-roledescription="slide"
                aria-label={`${leader.name}, ${leader.cred}`}
                style={{ "--i": pos } as CSSProperties}
              >
                <button
                  type="button"
                  className={styles.leaderCardBtn}
                  data-i={leaderIndex}
                  onClick={() => selectLeader(leaderIndex, onSelect)}
                  disabled={disabled}
                >
                  <span className={styles.leaderCardPortrait} id={`ph-${leaderIndex}`}>
                    <img src={leader.img} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className={styles.leaderCardMeta}>
                    <span className={styles.faceName}>{leader.name}</span>
                    <span className={styles.faceCred}>{leader.cred}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.leaderCarouselFoot}>
        <div className={styles.carouselNav}>
          <button
            type="button"
            className={styles.carouselBtn}
            aria-label={`Previous leader (${positionLabel})`}
            onClick={() => scrollToIndex(index - 1)}
            disabled={atStart}
          >
            ‹
          </button>
          <span className={styles.carouselPill} aria-live="polite">
            {positionLabel}
          </span>
          <button
            type="button"
            className={styles.carouselBtn}
            aria-label={`Next leader (${positionLabel})`}
            onClick={() => scrollToIndex(index + 1)}
            disabled={atEnd}
          >
            ›
          </button>
        </div>
        <div className={styles.carouselProgress} aria-hidden="true">
          <span className={styles.carouselProgressFill} style={{ width: `${progressPct}%` }} />
        </div>
      </div>
    </div>
  );
}
