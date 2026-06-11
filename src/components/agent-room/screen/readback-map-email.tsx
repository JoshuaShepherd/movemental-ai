"use client";

import { useState } from "react";

import { EMAIL_RE } from "@/lib/agent-room/capture";
import { READBACK_EMAIL_INPUT_ID } from "@/lib/agent-room/suggest-chip-targets";
import styles from "../ink-band.module.css";

/**
 * Inline map email capture — lives under the readback spine, not a full-screen gate.
 * Submits through the same `onCaptureSubmit('map', …)` seam as the legacy capture cell.
 */
export function ReadbackMapEmail({
  onCaptureSubmit,
  disabled,
}: {
  onCaptureSubmit: (kind: string, values: Record<string, string>) => void;
  disabled?: boolean;
}) {
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
      setError("That email doesn’t look right.");
      return;
    }
    setError("");
    onCaptureSubmit("map", { email: v });
    setSent(true);
  };

  if (sent) {
    return (
      <p className={styles.rbEmailDone} id="readbackEmail">
        Sent — check your inbox.
      </p>
    );
  }

  return (
    <div className={styles.rbEmail}>
      <label className={styles.rbEmailLabel} htmlFor={READBACK_EMAIL_INPUT_ID}>
        Keep a copy
      </label>
      <div className={styles.rbEmailRow}>
        <div className={`${styles.capField} ${styles.rbEmailField} ${error ? styles.capFieldErr : ""}`}>
          <input
            id={READBACK_EMAIL_INPUT_ID}
            type="email"
            autoComplete="email"
            placeholder="you@org.org"
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
        <button type="button" className={styles.rbEmailSend} onClick={submit} disabled={disabled}>
          Send
        </button>
      </div>
      {error ? <p className={styles.capErr}>{error}</p> : null}
    </div>
  );
}
