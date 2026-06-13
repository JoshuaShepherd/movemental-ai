"use client";

import { useState, type CSSProperties } from "react";

import { SAFETY_CHARTER_DOCUMENTS, type SafetyCharterDocument } from "@/lib/agent-room/data/safety-charter";
import { SAFETY_FLOW_CHARTER_COPY } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";
import { CharterDocModal } from "./charter-doc-modal";

export function SafetyFlowCharter({
  onNext,
  onBack,
  disabled,
}: {
  onNext: () => void;
  onBack: () => void;
  disabled?: boolean;
}) {
  const [activeDoc, setActiveDoc] = useState<SafetyCharterDocument | null>(null);

  return (
    <div className={styles.flowStep}>
      <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>{SAFETY_FLOW_CHARTER_COPY.eyebrow}</p>
      <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{SAFETY_FLOW_CHARTER_COPY.title}</h1>
      <p className={`${styles.sub} ${styles.flowSubCenter}`}>{SAFETY_FLOW_CHARTER_COPY.sub}</p>
      <p className={`${styles.secLabel} ${styles.flowCharterLabel}`}>{SAFETY_FLOW_CHARTER_COPY.charterLabel}</p>
      <div className={`${styles.docSpread} ${styles.docSpreadFold} ${styles.flowCharterRow}`}>
        {SAFETY_CHARTER_DOCUMENTS.map((doc, idx) => (
          <button
            key={doc.id}
            type="button"
            className={`${styles.docCard} ${styles.docCardFold}`}
            data-ratified="false"
            style={{ "--rot": doc.rot, "--i": idx } as CSSProperties}
            aria-label={`${doc.title}, not yet written`}
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
              </div>
              <span className={`${styles.docStatus} ${styles.docStatusOpen}`}>Not yet</span>
            </div>
            <span className={styles.sticky}>{doc.threat}</span>
          </button>
        ))}
      </div>
      <p className={`${styles.spreadHint} ${styles.flowSpreadHint}`}>{SAFETY_FLOW_CHARTER_COPY.spreadHint}</p>
      <div className={styles.flowCenter}>
        <button type="button" className={styles.flowBtn} disabled={disabled} onClick={onNext}>
          {SAFETY_FLOW_CHARTER_COPY.cta}
        </button>
      </div>
      <button type="button" className={styles.flowBack} onClick={onBack}>
        ← back
      </button>
      <CharterDocModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </div>
  );
}
