"use client";

import type { CSSProperties } from "react";

import {
  SAFETY_DASHBOARD_COPY,
  SAFETY_DASHBOARD_DOCUMENTS,
} from "@/lib/agent-room/data/safety-dashboard";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";

/** Dashboard conversion — sell the managed Safety sprint (HTML mock-up screen 3). */
export function SafetyDashboardScreen({ onRunScene, disabled }: ScreenProps) {
  return (
    <>
      <p className={styles.eyebrow}>{SAFETY_DASHBOARD_COPY.eyebrow}</p>
      <p className={styles.q}>{SAFETY_DASHBOARD_COPY.headline}</p>
      <p className={styles.sub}>{SAFETY_DASHBOARD_COPY.lede}</p>

      <div className={styles.compare}>
        <div className={styles.compareCol}>
          <p className={styles.compareTag}>{SAFETY_DASHBOARD_COPY.compare.before.tag}</p>
          <p>{SAFETY_DASHBOARD_COPY.compare.before.text}</p>
          <div className={styles.blankPage} aria-hidden="true" />
        </div>
        <div className={styles.compareMid} aria-hidden="true">
          →
        </div>
        <div className={`${styles.compareCol} ${styles.compareColAfter}`}>
          <p className={styles.compareTag}>{SAFETY_DASHBOARD_COPY.compare.after.tag}</p>
          <p>{SAFETY_DASHBOARD_COPY.compare.after.text}</p>
          <div className={styles.miniStack} aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`${styles.miniDoc} ${i <= 2 ? styles.miniDocFilled : ""}`} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sceneGrid}>
        <div className={styles.mainCol}>
          <div className={`${styles.sec} ${styles.secPlans}`}>
            <p className={styles.secLabel}>Managed sprint · $1,000</p>
            <article className={`${styles.way} ${styles.wayPlan} ${styles.paid}`}>
              <span className={styles.wayBadge}>Managed</span>
              <p className={styles.wayPriceRow}>
                <span className={styles.wayPriceAmt}>$1,000</span>
                <span className={styles.wayPricePeriod}>two weeks</span>
              </p>
              <p className={styles.wayTagline}>
                We draft all five layers customized to your organization.
              </p>
              <p className={styles.wayBody}>
                Your team reviews and ratifies in a private dashboard — live working sessions,
                not async email ping-pong.
              </p>
              <button
                type="button"
                className={`${styles.wayCtaBtn} ${styles.wayCtaBtnPaid}`}
                disabled={disabled || !onRunScene}
                onClick={() => onRunScene?.("withUs")}
              >
                Have us draft it · $1,000
              </button>
            </article>
          </div>
        </div>

        <aside className={styles.charterPanel} aria-label="Guidebook assembly preview">
          <p className={styles.assembleLabel}>{SAFETY_DASHBOARD_COPY.assembleLabel}</p>
          <div className={`${styles.docSpread} ${styles.docSpreadAssemble}`}>
            {SAFETY_DASHBOARD_DOCUMENTS.map((doc) => (
              <div
                key={doc.layer}
                className={styles.docCard}
                style={
                  {
                    left: doc.left,
                    top: doc.top,
                    transform: `rotate(${doc.rot})`,
                    zIndex: doc.z,
                  } as CSSProperties
                }
              >
                <div className={styles.docInner}>
                  <span className={styles.docLayer}>Layer {doc.layer}</span>
                  <h3 className={styles.docTitle}>{doc.title}</h3>
                  <div className={styles.docLines}>
                    <span className={`${styles.docLine} ${doc.drafting ? "" : styles.docLineFilled}`} />
                    <span
                      className={`${styles.docLine} ${styles.docLineShort} ${doc.drafting ? "" : styles.docLineFilled}`}
                    />
                    <span className={`${styles.docLine} ${doc.drafting ? "" : styles.docLineFilled}`} />
                    <span className={`${styles.docLine} ${styles.docLineShorter}`} />
                  </div>
                  <span className={styles.docStatus}>
                    {doc.drafting ? "Drafting…" : "Draft ready"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.proofBlock}>
            <div className={styles.proofSheet}>
              <p className={styles.proofEyebrow}>{SAFETY_DASHBOARD_COPY.proof.eyebrow}</p>
              <h3 className={styles.proofTitle}>{SAFETY_DASHBOARD_COPY.proof.title}</h3>
              <p className={styles.proofExcerpt}>{SAFETY_DASHBOARD_COPY.proof.excerpt}</p>
              <p className={styles.proofSig}>{SAFETY_DASHBOARD_COPY.proof.signature}</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
