/* eslint-disable @next/next/no-img-element -- small static portraits with a
   custom grayscale→color hover filter; next/image adds no value here and
   complicates the FLIP-to-hero animation planned for AF-10. */
"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import styles from "../../ink-band.module.css";
import { setPendingFlip } from "./leader-flip";

/** Capture the tapped portrait's rect, then open the leader (prototype). */
function selectLeader(i: number, onSelect: (i: number) => void) {
  const ph = document.getElementById(`ph-${i}`);
  setPendingFlip(ph ? ph.getBoundingClientRect() : null);
  onSelect(i);
}

/** Fisher–Yates shuffle of [0..n-1]. */
function shuffledIndices(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * The "Built with & backed by" portrait band (prototype `bandHTML()`). 17
 * leaders shown as a responsive **carousel** of round portraits that advances
 * **one image at a time** via prev/next. The order is **reshuffled on every
 * mount** so the same core faces aren't always shown first. Tapping a portrait
 * opens that leader; the `id="ph-N"` hooks (original index) are kept for the
 * AF-10 portrait FLIP.
 */
export function LeaderBand({
  onSelect,
  disabled,
}: {
  onSelect: (i: number) => void;
  disabled?: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // SSR renders the natural order; the client reshuffles on mount (no hydration
  // mismatch because the shuffle only runs in an effect).
  const [order, setOrder] = useState<number[]>(() => LEADERS.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [m, setM] = useState({ step: 0, maxOffset: 0, maxIndex: 0 });

  useEffect(() => {
    setOrder(shuffledIndices(LEADERS.length));
    setIndex(0);
  }, []);

  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const items = track.children;
    const first = items[0] as HTMLElement | undefined;
    const second = items[1] as HTMLElement | undefined;
    const step = second && first ? second.offsetLeft - first.offsetLeft : (first?.offsetWidth ?? 0);
    const maxOffset = Math.max(0, track.scrollWidth - vp.clientWidth);
    const maxIndex = step > 0 ? Math.ceil(maxOffset / step) : 0;
    setM({ step, maxOffset, maxIndex });
    setIndex((i) => Math.min(i, maxIndex));
  }, []);

  useEffect(() => {
    measure();
    const vp = viewportRef.current;
    if (!vp || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [measure, order]);

  const atStart = index <= 0;
  const atEnd = index >= m.maxIndex;
  const offset = Math.min(index * m.step, m.maxOffset);

  return (
    <div className={styles.band}>
      <div className={styles.bandHead}>
        <p className={styles.bandLabel}>Built with &amp; backed by</p>
        <div className={styles.carouselNav}>
          <button
            type="button"
            className={styles.carouselBtn}
            aria-label="Previous leader"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={atStart}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.carouselBtn}
            aria-label="Next leader"
            onClick={() => setIndex((i) => Math.min(m.maxIndex, i + 1))}
            disabled={atEnd}
          >
            ›
          </button>
        </div>
      </div>
      <div className={styles.carouselViewport} ref={viewportRef}>
        <div
          className={styles.carouselTrack}
          ref={trackRef}
          style={{ transform: `translateX(${-offset}px)` }}
        >
          {order.map((leaderIndex, pos) => {
            const leader = LEADERS[leaderIndex]!;
            return (
              <button
                key={leaderIndex}
                type="button"
                className={styles.carItem}
                style={{ "--i": pos } as CSSProperties}
                data-i={leaderIndex}
                onClick={() => selectLeader(leaderIndex, onSelect)}
                disabled={disabled}
              >
                <span className={styles.carPortrait} id={`ph-${leaderIndex}`}>
                  <img src={leader.img} alt={leader.name} />
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
    </div>
  );
}
