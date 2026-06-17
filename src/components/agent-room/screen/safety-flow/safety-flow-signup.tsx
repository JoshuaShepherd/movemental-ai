"use client";

import * as React from "react";
import Link from "next/link";

import { SAFETY_FLOW_SIGNUP_COPY } from "@/lib/agent-room/data/safety-flow";
import { createClient } from "@/lib/supabase/client";
import styles from "../../ink-band.module.css";
import { SafetyFlowBack } from "./safety-flow-back";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function SafetyFlowSignup({
  initialOrgName,
  onBack,
  onSent,
  disabled,
}: {
  initialOrgName?: string;
  onBack: () => void;
  onSent: () => void;
  disabled?: boolean;
}) {
  const [orgName, setOrgName] = React.useState(initialOrgName ?? "");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedOrg = orgName.trim();
    const trimmedEmail = email.trim();
    if (!trimmedOrg || !EMAIL_RE.test(trimmedEmail)) {
      setErrorMsg("Enter your organization name and a valid email.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/safety/self-serve-start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgName: trimmedOrg, email: trimmedEmail }),
      });
      if (!res.ok) {
        setStatus("error");
        setErrorMsg("Could not set up your dashboard. Try again in a moment.");
        return;
      }

      const json = (await res.json()) as { data?: { inquiryId?: string } };
      const inquiryId = json.data?.inquiryId;

      const supabase = createClient();
      const inquiryQuery = inquiryId ? `&inquiry=${encodeURIComponent(inquiryId)}` : "";
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent("/dashboard/safety")}${inquiryQuery}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
      });

      if (error) {
        setStatus("error");
        setErrorMsg("Could not send the sign-in link. Try again in a moment.");
        return;
      }

      onSent();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again in a moment.");
    }
  };

  return (
    <div className={styles.flowStep}>
      <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>{SAFETY_FLOW_SIGNUP_COPY.eyebrow}</p>
      <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{SAFETY_FLOW_SIGNUP_COPY.title}</h1>
      <p className={`${styles.sub} ${styles.flowSubCenter}`}>{SAFETY_FLOW_SIGNUP_COPY.sub}</p>

      <form className={styles.flowFormcard} onSubmit={submit}>
        <div className={styles.flowFieldCol}>
          <input
            type="text"
            className={styles.flowInput}
            placeholder={SAFETY_FLOW_SIGNUP_COPY.orgPlaceholder}
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
            aria-label="Organization name"
          />
        </div>
        <div className={styles.flowFieldRow}>
          <input
            type="email"
            className={styles.flowInput}
            placeholder={SAFETY_FLOW_SIGNUP_COPY.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
          <button type="submit" className={`${styles.flowBtn} ${styles.flowBtnBlue}`} disabled={disabled || status === "loading"}>
            {SAFETY_FLOW_SIGNUP_COPY.submit}
          </button>
        </div>
        {errorMsg ? <p className={styles.flowError}>{errorMsg}</p> : null}
        <p className={styles.flowFineprint}>
          {SAFETY_FLOW_SIGNUP_COPY.fineprint}{" "}
          <Link href="/enroll" className={styles.flowQuietLink}>
            {SAFETY_FLOW_SIGNUP_COPY.talkFirst}
          </Link>
        </p>
      </form>

      <p className={`${styles.flowFineprint} ${styles.flowNoUrgency}`}>{SAFETY_FLOW_SIGNUP_COPY.noUrgency}</p>
      <SafetyFlowBack onClick={onBack}>back to both options</SafetyFlowBack>
    </div>
  );
}
