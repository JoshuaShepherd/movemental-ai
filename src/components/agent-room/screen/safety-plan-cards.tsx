"use client";

import { Check } from "lucide-react";

import {
  SAFETY_DOORS,
  SAFETY_READBACK_COPY,
  type SafetyDoor,
} from "@/lib/agent-room/data/safety-charter";
import styles from "../ink-band.module.css";

export interface SafetyPlanCardsProps {
  onRunScene?: (scene: string) => void;
  disabled?: boolean;
}

function PlanCard({
  door,
  onRunScene,
  disabled,
}: {
  door: SafetyDoor;
  onRunScene?: (scene: string) => void;
  disabled?: boolean;
}) {
  return (
    <article
      className={`${styles.way} ${styles.wayPlan} ${door.featured ? styles.wayLead : ""} ${
        door.paid ? styles.paid : ""
      }`}
    >
      <span className={styles.wayBadge}>{door.badge}</span>
      <p className={styles.wayPriceRow}>
        <span className={styles.wayPriceAmt}>{door.priceAmount}</span>
        <span className={styles.wayPricePeriod}>{door.pricePeriod}</span>
      </p>
      <p className={styles.wayTagline}>{door.tagline}</p>
      <p className={styles.wayBody}>{door.body}</p>
      <button
        type="button"
        className={`${styles.wayCtaBtn} ${door.paid ? styles.wayCtaBtnPaid : ""}`}
        disabled={disabled || !onRunScene}
        onClick={() => onRunScene?.(door.scene)}
      >
        {door.cta}
      </button>
      <p className={styles.wayIncludes}>What&apos;s included</p>
      <ul className={styles.wayFeatures}>
        {door.features.map((feature) => (
          <li key={feature} className={styles.wayFeature}>
            <span className={styles.wayCheck} aria-hidden="true">
              <Check className={styles.wayCheckIcon} strokeWidth={1.75} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Free vs managed plan preview — sheet content only (above the agent dock). */
export function SafetyPlanCards({ onRunScene, disabled }: SafetyPlanCardsProps) {
  return (
    <div className={`${styles.sec} ${styles.secPlans}`}>
      <h2 className={styles.plansPreview}>{SAFETY_READBACK_COPY.plansPreview}</h2>
      <div className={`${styles.ways} ${styles.waysPlans}`}>
        {SAFETY_DOORS.map((door) => (
          <PlanCard key={door.id} door={door} onRunScene={onRunScene} disabled={disabled} />
        ))}
      </div>
      <p className={styles.honest}>{SAFETY_READBACK_COPY.doorsHonest}</p>
    </div>
  );
}
