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

/** Desktop: more compact faces visible; mobile: one full face + peek of the next. */
const VISIBLE_DESKTOP = 5;
const VISIBLE_WIDE = 6;
const VISIBLE_MOBILE = 1.2;

function visibleCount(availableWidth: number): number {
  if (availableWidth >= 1100) return VISIBLE_WIDE;
  if (availableWidth >= 768) return VISIBLE_DESKTOP;
  return VISIBLE_MOBILE;
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
 * Circle-avatar proof carousel for the home trusted-voices band. Scroll-snap
 * track with prev/next controls and a position pill.
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
  const [geom, setGeom] = useState({ step: 0, maxIndex: 0 });

  const measure = useCallback(() => {
    const shell = shellRef.current;
    const track = trackRef.current;
    if (!shell || !track) return;

    const items = track.children;
    const first = items[0] as HTMLElement | undefined;
    const second = items[1] as HTMLElement | undefined;
    const itemWidth = first?.offsetWidth ?? 0;
    const step =
      second && first ? second.offsetLeft - first.offsetLeft : itemWidth;
    if (step <= 0) return;

    const available = shell.clientWidth;
    const visible = visibleCount(available);
    const maxIndex = Math.max(0, order.length - Math.floor(visible));
    const resolvedMax = Math.min(maxIndex, order.length - 1);

    setGeom((prev) => {
      if (prev.step === step && prev.maxIndex === resolvedMax) {
        return prev;
      }
      return { step, maxIndex: resolvedMax };
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
      if (!track || geom.step <= 0) return;
      const clamped = Math.max(0, Math.min(geom.maxIndex, next));
      const offset = clamped * geom.step;
      track.scrollTo({
        left: offset,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      setIndex(clamped);
    },
    [geom.step, geom.maxIndex],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (geom.step <= 0) return;
      const i = Math.round(track.scrollLeft / geom.step);
      setIndex(Math.max(0, Math.min(geom.maxIndex, i)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [geom.step, geom.maxIndex]);

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
        <div className={styles.leaderCarouselTrack} ref={trackRef}>
          {order.map((leaderIndex, pos) => {
            const leader = LEADERS[leaderIndex]!;
            return (
              <button
                key={leaderIndex}
                type="button"
                className={styles.carItem}
                role="group"
                aria-roledescription="slide"
                aria-label={`${leader.name}, ${leader.cred}`}
                style={{ "--i": pos } as CSSProperties}
                data-i={leaderIndex}
                onClick={() => selectLeader(leaderIndex, onSelect)}
                disabled={disabled}
              >
                <span className={styles.carPortrait} id={`ph-${leaderIndex}`}>
                  <img src={leader.img} alt="" loading="lazy" decoding="async" />
                </span>
                <span>
                  <span className={styles.faceName}>{leader.name}</span>
                  <span className={styles.faceCred}>{leader.cred}</span>
                </span>
              </button>
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
