"use client";

import { useState } from "react";

import { SafetyHandbookCover } from "@/components/field-guide/safety-handbook-cover";
import { EMAIL_RE } from "@/lib/agent-room/capture";
import { SAFETY_HANDBOOK } from "@/lib/agent-room/naming";
import { HANDBOOK_EMAIL_INPUT_ID } from "@/lib/agent-room/suggest-chip-targets";
import styles from "../ink-band.module.css";

export interface HandbookDockEmailProps {
  onCaptureSubmit: (kind: string, values: Record<string, string>) => void;
  disabled?: boolean;
}

/**
 * Handbook capture in the agent dock — plain paper card, one email field.
 * Submits through the `free` capture seam.
 */
export function HandbookDockEmail({
  onCaptureSubmit,
  disabled,
}: HandbookDockEmailProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    const v = email.trim();
    if (!v) {
      setError("Email required.");
      return;
    }
    if (!EMAIL_RE.test(v)) {
      setError("That email doesn't look right.");
      return;
    }
    setError("");
    onCaptureSubmit("free", { email: v, source: "safety-readback-dock" });
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.threadStickyHandbook} id="handbook-email-block">
        <p className={styles.handbookEmailDone}>
          Sent, check your inbox for the {SAFETY_HANDBOOK.shortLabel}.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.threadStickyHandbook} id="handbook-email-block">
      <SafetyHandbookCover className="mb-3 max-w-[140px]" sizes="140px" />
      <p className={styles.handbookEmailLead}>
        Get your free {SAFETY_HANDBOOK.fullTitle}
      </p>
      <label className={styles.handbookEmailLabel} htmlFor={HANDBOOK_EMAIL_INPUT_ID}>
        Email it to me
      </label>
      <div className={styles.handbookEmailRow}>
        <div
          className={`${styles.capField} ${styles.handbookEmailField} ${error ? styles.capFieldErr : ""}`}
        >
          <input
            id={HANDBOOK_EMAIL_INPUT_ID}
            type="email"
            autoComplete="email"
            placeholder="you@yourorganization.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            disabled={disabled}
          />
        </div>
        <button
          type="button"
          className={styles.handbookEmailSend}
          onClick={submit}
          disabled={disabled}
        >
          Send
        </button>
      </div>
      {error ? <p className={styles.capErr}>{error}</p> : null}
    </div>
  );
}
