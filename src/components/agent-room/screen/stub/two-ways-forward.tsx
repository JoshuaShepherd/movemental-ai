"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import styles from "../../ink-band.module.css";

export interface WayForwardOption {
  /** Card heading, e.g. "Free, and we guide you." */
  title: string;
  /** Price line under the title. */
  price: string;
  description: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  paid?: boolean;
  /** When true, renders a marked placeholder instead of a live CTA. */
  placeholder?: boolean;
}

export interface TwoWaysForwardProps {
  sectionLabel?: string;
  reassurance: string;
  freeWay: WayForwardOption;
  paidWay: WayForwardOption;
  /** When true, the free card CTA gets the scene's single highlighter swipe. */
  freeLead?: boolean;
}

function WayCard({ option, lead }: { option: WayForwardOption; lead?: boolean }) {
  return (
    <div
      className={`${styles.way} ${lead ? styles.wayLead : ""} ${option.paid ? styles.paid : ""}`}
    >
      <h4>{option.title}</h4>
      <p className={styles.price}>{option.price}</p>
      <p>{option.description}</p>
      {option.placeholder ? (
        <p className={styles.wayPlaceholder}>[Free entry point to confirm]</p>
      ) : (
        <Link href={option.ctaHref} className={option.paid ? styles.wayCtaPaid : styles.wayCta}>
          {option.ctaLabel}
        </Link>
      )}
    </div>
  );
}

/** Reusable "Two ways forward" block: equal-dignity free + paid cards. */
export function TwoWaysForward({
  sectionLabel = "Two ways forward",
  reassurance,
  freeWay,
  paidWay,
  freeLead = false,
}: TwoWaysForwardProps) {
  return (
    <div className={styles.sec}>
      <p className={styles.secLabel}>{sectionLabel}</p>
      <div className={styles.ways}>
        <WayCard option={freeWay} lead={freeLead} />
        <WayCard option={paidWay} />
      </div>
      <p className={styles.honest}>{reassurance}</p>
    </div>
  );
}
