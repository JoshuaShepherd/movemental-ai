"use client";

import { useSyncExternalStore } from "react";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import styles from "../../ink-band.module.css";
import { LeaderCarousel } from "./leader-carousel";

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
 * Trusted-voices proof band on the agent home screen. Doctrine label is
 * **Trusted voices** — movement leaders appear in explanatory copy only.
 */
export function LeaderBand({
  onSelect,
  disabled,
}: {
  onSelect: (i: number) => void;
  disabled?: boolean;
}) {
  const order = useSyncExternalStore(subscribeToOrder, getClientOrder, getServerOrder);

  return (
    <div className={styles.band}>
      <div className={styles.bandHead}>
        <div>
          <p className={styles.bandLabel}>Trusted voices</p>
          <p className={styles.bandSubline}>
            Movement leaders who shape how organizations steward AI.
          </p>
        </div>
      </div>
      <LeaderCarousel order={order} onSelect={onSelect} disabled={disabled} />
    </div>
  );
}
