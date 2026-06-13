import { SAFETY_CHARTER_DOCUMENTS } from "@/lib/agent-room/data/safety-charter";
import { SAFETY_HANDBOOK } from "@/lib/agent-room/naming";

import styles from "./audience-page.module.css";

/**
 * The five plain-language layers of the AI Safety Charter, named the way the
 * hero claim names them ("your vision, your plans, your reality, your rules,
 * and your response"). Shared across all three audience pages — the Charter is
 * universal; only the surrounding copy is audience-tuned.
 */
export const CHARTER_FIVE = [
  { n: "01", word: "Vision" },
  { n: "02", word: "Plans" },
  { n: "03", word: "Reality" },
  { n: "04", word: "Rules" },
  { n: "05", word: "Response" },
] as const;

type DashStatus = "ratified" | "review" | "draft" | "none";

/**
 * Illustrative draft → review → ratify progression, keyed by the canonical
 * charter document ids. The titles + layer numbers come from
 * `SAFETY_CHARTER_DOCUMENTS` so the dashboard always mirrors the real charter.
 */
const DASH_STATUS: Record<string, { status: DashStatus; label: string }> = {
  statement: { status: "ratified", label: "Ratified" },
  policy: { status: "review", label: "In review" },
  context: { status: "draft", label: "Draft" },
  rules: { status: "draft", label: "Draft" },
  responsePlans: { status: "none", label: "Not started" },
};

const STATUS_CLASS: Record<DashStatus, string> = {
  ratified: styles.dsRatified,
  review: styles.dsReview,
  draft: styles.dsDraft,
  none: styles.dsNone,
};

/**
 * In-context product artifact — the private Handbook dashboard where a board
 * drafts, reviews, and ratifies the five Charter layers. Dark figure on the
 * warm-paper page (the HTML `.dash`).
 */
export function HandbookDashboard() {
  const ariaLabel = `${SAFETY_HANDBOOK.shortLabel} dashboard. ${SAFETY_CHARTER_DOCUMENTS.map(
    (doc) => `${doc.title}: ${DASH_STATUS[doc.id]?.label ?? "Draft"}`,
  ).join(", ")}.`;

  return (
    <div className={styles.dash} role="img" aria-label={ariaLabel}>
      <div className={styles.dashBar}>
        <span className={styles.dashDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.dashTitle}>
          Your private {SAFETY_HANDBOOK.shortLabel} dashboard · draft, review, ratify
        </span>
      </div>
      <div className={styles.dashGrid}>
        {SAFETY_CHARTER_DOCUMENTS.map((doc) => {
          const s = DASH_STATUS[doc.id] ?? { status: "draft" as const, label: "Draft" };
          return (
            <div key={doc.id} className={styles.docard}>
              <div>
                <span className={styles.dk}>Layer {doc.layer}</span>
                <div className={styles.dt}>{doc.title}</div>
              </div>
              <span className={`${styles.ds} ${STATUS_CLASS[s.status]}`}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <p className={styles.dashCap}>
        The five layers of your Charter, in one place your board can actually sign.
      </p>
    </div>
  );
}
