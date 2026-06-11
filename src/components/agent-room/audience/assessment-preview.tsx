import {
  SAFETY_CHARTER_DOCUMENTS,
  SAFETY_READBACK_COPY,
} from "@/lib/agent-room/data/safety-charter";
import { SAFETY_HANDBOOK } from "@/lib/agent-room/naming";

import agentStyles from "../ink-band.module.css";
import styles from "./audience-page.module.css";

/**
 * In-context product artifact — a trimmed charter spread plus dashboard framing
 * (not the abstract node graph alone).
 */
export function AudienceAssessmentPreview() {
  const previewDocs = SAFETY_CHARTER_DOCUMENTS.slice(0, 3);

  return (
    <figure className={styles.assessmentPreview} aria-label="Safety dashboard preview">
      <figcaption className={styles.assessmentPreviewCaption}>
        <span className={styles.assessmentPreviewEyebrow}>In context</span>
        <span className={styles.assessmentPreviewTitle}>
          Your private {SAFETY_HANDBOOK.shortLabel} dashboard, draft, review, ratify
        </span>
        <span className={styles.assessmentPreviewSub}>{SAFETY_READBACK_COPY.spreadHint}</span>
      </figcaption>
      <div
        className={`${agentStyles.docSpread} ${agentStyles.docSpreadFold} ${styles.assessmentPreviewSpread}`}
      >
        {previewDocs.map((doc, idx) => (
          <div
            key={doc.id}
            className={`${agentStyles.docCard} ${agentStyles.docCardFold}`}
            data-ratified={doc.ratified ? "true" : "false"}
            style={{ "--rot": doc.rot, "--i": idx } as React.CSSProperties}
          >
            <div className={agentStyles.docInner}>
              <span className={agentStyles.docLayer}>Layer {doc.layer}</span>
              <h3 className={agentStyles.docTitle}>{doc.title}</h3>
              <div className={agentStyles.docLines}>
                <span className={agentStyles.docLine} />
                <span className={`${agentStyles.docLine} ${agentStyles.docLineShort}`} />
                <span className={agentStyles.docLine} />
              </div>
              <span
                className={`${agentStyles.docStatus} ${
                  doc.ratified ? agentStyles.docStatusRatified : agentStyles.docStatusOpen
                }`}
              >
                {doc.ratified ? "Ratified" : "Draft"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.assessmentPreviewNote}>
        The full organizational AI reality assessment maps your team across all four stages, then
        lands here, with documents your board can actually sign.
      </p>
    </figure>
  );
}
