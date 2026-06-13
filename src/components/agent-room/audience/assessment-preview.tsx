import {
  SAFETY_CHARTER_DOCUMENTS,
  SAFETY_READBACK_COPY,
} from "@/lib/agent-room/data/safety-charter";
import { SAFETY_HANDBOOK } from "@/lib/agent-room/naming";

import agentStyles from "../ink-band.module.css";
import styles from "./audience-page.module.css";

type PreviewStatus = "draft" | "review" | "ratified";

const PREVIEW_STATUSES: Record<string, PreviewStatus> = {
  statement: "draft",
  policy: "review",
  context: "ratified",
  rules: "draft",
  responsePlans: "ratified",
};

function statusLabel(status: PreviewStatus): string {
  if (status === "ratified") return "Ratified";
  if (status === "review") return "In review";
  return "Draft";
}

function statusClass(status: PreviewStatus): string {
  if (status === "ratified") return agentStyles.docStatusRatified;
  if (status === "review") return agentStyles.docStatusReview;
  return agentStyles.docStatusOpen;
}

/**
 * In-context product artifact — full charter spread plus dashboard framing.
 */
export function AudienceAssessmentPreview() {
  return (
    <figure className={styles.assessmentPreview} aria-label="Safety dashboard preview">
      <figcaption className={styles.assessmentPreviewCaption}>
        <span className={styles.assessmentPreviewEyebrow}>In context</span>
        <span className={styles.assessmentPreviewTitle}>
          Your private {SAFETY_HANDBOOK.shortLabel} dashboard: draft, review, ratify
        </span>
        <span className={styles.assessmentPreviewSub}>{SAFETY_READBACK_COPY.spreadHint}</span>
      </figcaption>
      <div
        className={`${agentStyles.docSpread} ${agentStyles.docSpreadFold} ${agentStyles.docSpreadEmbed} ${styles.assessmentPreviewSpread}`}
      >
        {SAFETY_CHARTER_DOCUMENTS.map((doc, idx) => {
          const status = PREVIEW_STATUSES[doc.id] ?? "draft";
          return (
            <div
              key={doc.id}
              className={`${agentStyles.docCard} ${agentStyles.docCardFold}`}
              data-ratified={status === "ratified" ? "true" : "false"}
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
                <span className={`${agentStyles.docStatus} ${statusClass(status)}`}>
                  {statusLabel(status)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className={styles.assessmentPreviewNote}>
        The full organizational AI reality assessment maps your team across all four stages, then
        lands here, with documents your board can actually sign.
      </p>
    </figure>
  );
}
