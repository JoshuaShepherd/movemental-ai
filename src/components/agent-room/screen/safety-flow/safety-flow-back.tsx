"use client";

import { ArrowLeft } from "lucide-react";

import styles from "../../ink-band.module.css";

/** Wizard back control — 44px touch target with lucide arrow (not a raw glyph). */
export function SafetyFlowBack({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" className={styles.flowBack} onClick={onClick}>
      <ArrowLeft className={styles.flowBackIcon} strokeWidth={1.75} aria-hidden />
      {children}
    </button>
  );
}
