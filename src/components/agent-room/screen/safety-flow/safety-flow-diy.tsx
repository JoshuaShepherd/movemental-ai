"use client";

import * as React from "react";

import { submitLead } from "@/lib/agent-room/capture";
import { SAFETY_FLOW_DIY_COPY } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function SafetyFlowDiy({
  onBack,
  onDashboard,
  disabled,
}: {
  onBack: () => void;
  onDashboard: () => void;
  disabled?: boolean;
}) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) return;
    setLoading(true);
    await submitLead("free", { email: trimmed, source: "safety-flow-diy" });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className={styles.flowStep}>
      <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>{SAFETY_FLOW_DIY_COPY.eyebrow}</p>
      <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{SAFETY_FLOW_DIY_COPY.title}</h1>
      <p className={`${styles.sub} ${styles.flowSubCenter}`}>{SAFETY_FLOW_DIY_COPY.sub}</p>

      {!sent ? (
        <form className={styles.flowFormcard} onSubmit={submit}>
          <p className={styles.flowFormPrompt}>{SAFETY_FLOW_DIY_COPY.emailPrompt}</p>
          <div className={styles.flowFieldRow}>
            <input
              type="email"
              className={styles.flowInput}
              placeholder={SAFETY_FLOW_DIY_COPY.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
            <button type="submit" className={styles.flowBtn} disabled={disabled || loading}>
              {SAFETY_FLOW_DIY_COPY.submit}
            </button>
          </div>
          <p className={styles.flowFineprint}>{SAFETY_FLOW_DIY_COPY.fineprint}</p>
        </form>
      ) : (
        <div className={styles.flowFormcard}>
          <div className={styles.flowDoneState}>
            <p className={styles.flowDoneTitle}>{SAFETY_FLOW_DIY_COPY.successTitle}</p>
            <p className={styles.flowFineprint}>{SAFETY_FLOW_DIY_COPY.successBody}</p>
          </div>
        </div>
      )}

      <p className={styles.flowTuesday}>
        {SAFETY_FLOW_DIY_COPY.tuesdayBridge}{" "}
        <button type="button" className={styles.flowQuietLink} onClick={onDashboard}>
          {SAFETY_FLOW_DIY_COPY.dashboardLink}
        </button>
        .
      </p>
      <button type="button" className={styles.flowBack} onClick={onBack}>
        ← back to both options
      </button>
    </div>
  );
}
