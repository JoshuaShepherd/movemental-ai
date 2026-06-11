/* eslint-disable @next/next/no-img-element -- small static portraits with a
   custom grayscale→color hover filter; next/image adds no value here and
   complicates the FLIP-to-hero animation planned for AF-10. */
"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import styles from "../../ink-band.module.css";
import { setPendingFlip } from "./leader-flip";

/** Desktop carousel viewport — paired with `.sheet.home` max-width in ink-band.module.css. */
const BAND_VISIBLE_TARGET = 10;

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

let clientShuffledOrder: number[] | null = null;

function getClientOrder(): number[] {
  if (!clientShuffledOrder) {
    clientShuffledOrder = shuffledIndices(LEADERS.length);
  }
  return clientShuffledOrder;
}

function getServerOrder(): number[] {
  return LEADERS.map((_, i) => i);
}

function subscribeToOrder(): () => void {
  return () => {};
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
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // SSR uses natural order; the client snapshot shuffles once without setState in an effect.
  const order = useSyncExternalStore(subscribeToOrder, getClientOrder, getServerOrder);
  const [index, setIndex] = useState(0);
  const [m, setM] = useState({ step: 0, maxIndex: 0, clipWidth: 0 });

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
    const gap = Math.max(0, step - itemWidth);
    const available = shell.clientWidth;
    const fitted =
      step > 0 ? Math.max(1, Math.floor((available + gap) / step)) : 1;
    const targetCount = Math.min(order.length, BAND_VISIBLE_TARGET);
    const targetClip = targetCount * step - gap;
    const resolvedVisible =
      available >= targetClip ? targetCount : fitted;
    const fullClipWidth = resolvedVisible * step - gap;
    const trackWidth = order.length > 0 ? order.length * step - gap : 0;
    const clipWidth = Math.min(fullClipWidth, trackWidth);
    const maxIndex = Math.max(0, order.length - resolvedVisible);
    setM({ step, maxIndex, clipWidth });
    setIndex((i) => Math.min(i, maxIndex));
  }, [order.length]);

  useLayoutEffect(() => {
    measure();
  }, [measure, order]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(shell);
    return () => ro.disconnect();
  }, [measure]);

  const atStart = index <= 0;
  const atEnd = index >= m.maxIndex;
  const offset = index * m.step;

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
      <div className={styles.carouselShell} ref={shellRef}>
        <div
          className={styles.carouselViewport}
          style={m.clipWidth > 0 ? { width: m.clipWidth } : undefined}
        >
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
    </div>
  );
}
