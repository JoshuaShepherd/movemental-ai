"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

import {
  SAFETY_CHARTER_DOCUMENTS,
  SAFETY_READBACK_COPY,
  type SafetyCharterDocument,
} from "@/lib/agent-room/data/safety-charter";
import { SAFETY_GUIDEBOOK } from "@/lib/agent-room/naming";
import type { MapRead } from "@/lib/agent-room/data/map-q";
import styles from "../ink-band.module.css";
import { CharterLightbox } from "./charter-lightbox";
import { ReadbackRail } from "./readback-rail";
import { SafetyPlanCards } from "./safety-plan-cards";

export interface SafetyReadbackSceneProps {
  mapRead: MapRead | null;
  onRunScene?: (scene: string) => void;
  disabled?: boolean;
}

/** Safety gate readback — hero, path rail, charter spread, and two doors (HTML mock-up). */
export function SafetyReadbackScene({ mapRead, onRunScene, disabled }: SafetyReadbackSceneProps) {
  const [activeDoc, setActiveDoc] = useState<SafetyCharterDocument | null>(null);

  return (
    <div className={styles.safetyReadback}>
      <div className={styles.heroRow}>
        <div className={styles.heroCopy}>
          <h1 className={`${styles.q} ${styles.heroTitle}`}>{SAFETY_READBACK_COPY.heroTitle}</h1>
          <p className={styles.sub}>{SAFETY_READBACK_COPY.reframe}</p>
          <p className={styles.nextMove}>{SAFETY_READBACK_COPY.nextMove}</p>
        </div>
        <aside className={styles.heroPath} aria-label="Four-stage path">
          <p className={styles.pathLabel}>{SAFETY_READBACK_COPY.pathLabel}</p>
          <ReadbackRail
            mapRead={mapRead}
            hereStage="safety"
            className={styles.readbackHero}
          />
        </aside>
      </div>

      <section className={styles.charterFold} aria-label={`${SAFETY_GUIDEBOOK.fullTitle} charter`}>
        <p className={styles.secLabel}>{SAFETY_READBACK_COPY.charterLabel}</p>
        <div className={`${styles.docSpread} ${styles.docSpreadFold}`}>
          {SAFETY_CHARTER_DOCUMENTS.map((doc, idx) => (
            <button
              key={doc.id}
              type="button"
              className={`${styles.docCard} ${styles.docCardFold}`}
              data-ratified={doc.ratified ? "true" : "false"}
              style={{ "--rot": doc.rot, "--i": idx } as CSSProperties}
              aria-label={`${doc.title}${doc.ratified ? ", ratified" : ", not yet ratified"}`}
              onClick={() => setActiveDoc(doc)}
            >
              <div className={styles.docInner}>
                <span className={styles.docLayer}>Layer {doc.layer}</span>
                <h3 className={styles.docTitle}>{doc.title}</h3>
                <div className={styles.docLines}>
                  <span className={styles.docLine} />
                  <span className={`${styles.docLine} ${styles.docLineShort}`} />
                  <span className={styles.docLine} />
                  <span className={`${styles.docLine} ${styles.docLineShorter}`} />
                  <span className={`${styles.docLine} ${styles.docLineShort}`} />
                </div>
                <span
                  className={`${styles.docStatus} ${
                    doc.ratified ? styles.docStatusRatified : styles.docStatusOpen
                  }`}
                >
                  {doc.ratified ? "Ratified" : "Not yet"}
                </span>
              </div>
              <span className={styles.sticky}>{doc.threat}</span>
            </button>
          ))}
        </div>
        <p className={styles.spreadHint}>{SAFETY_READBACK_COPY.spreadHint}</p>
      </section>

      <SafetyPlanCards onRunScene={onRunScene} disabled={disabled} />

      <p className={styles.dashboardBridge}>
        <a className={styles.ctaLead} href="/assess">
          Want this for your actual organization? Take the full AI reality assessment →
        </a>
      </p>

      <CharterLightbox doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </div>
  );
}
