"use client";

import type { ReactNode } from "react";

import styles from "../../ink-band.module.css";

/**
 * The back-to-home crumb (prototype `CRUMB`), absolutely positioned top-right on
 * the sheet. Shown on every inner screen (about / contact / pricing / faq /
 * safety / confirm / founders / path / leader) — not on home / beat / readback.
 */
export function Crumb({ onHome }: { onHome: () => void }) {
  return (
    <button type="button" className={styles.crumb} onClick={onHome}>
      ↑ Home
    </button>
  );
}

/**
 * One numbered layer row (prototype `layerRow(n, title, g)`) — used by the about,
 * safety, and confirm screens.
 */
export function LayerRow({ n, title, g }: { n: string; title: string; g: string }) {
  return (
    <div className={styles.layer}>
      <span className={styles.ln}>{n}</span>
      <span>
        <b>{title}</b> <span className={styles.g}>{g}</span>
      </span>
    </div>
  );
}

/** One offer card (prototype `.way` / `.way.paid`) — used by pricing + safety. */
export function Way({
  title,
  price,
  paid,
  children,
}: {
  title: string;
  price: string;
  paid?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.way} ${paid ? styles.paid : ""}`}>
      <h4>{title}</h4>
      <p className={styles.price}>{price}</p>
      <p>{children}</p>
    </div>
  );
}
