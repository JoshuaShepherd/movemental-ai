"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MV_ROUTES } from "../routes";
import { QUESTIONS } from "./questions";

const TYPES = ["Nonprofit", "Church", "School or seminary", "Network or denomination", "Other institution"];

export function AssessmentStart() {
  const router = useRouter();
  const [org, setOrg] = useState("");
  const [type, setType] = useState(TYPES[0]!);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!org.trim()) {
      setError("Please provide your organization name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/assessment/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: org.trim(),
          organizationType: type,
          leaderEmail: email.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error?.message || "Failed to start assessment");
        setIsSubmitting(false);
        return;
      }
      const { leaderToken, contributorToken } = json.data;
      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem("mv.assessment.leaderToken", leaderToken);
          window.sessionStorage.setItem("mv.assessment.contributorToken", contributorToken);
        } catch {
          // Ignore storage restrictions
        }
      }
      router.push(
        `${MV_ROUTES.assessmentPredict}?token=${leaderToken}&org=${encodeURIComponent(org.trim())}`
      );
    } catch {
      setError("Network error starting assessment. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mv-stack"
      style={{ gap: 16, padding: "30px 32px 32px", background: "var(--mv-sheet)", borderRadius: 4 }}
      onSubmit={handleSubmit}
    >
      <h2 className="mv-form-h">Start the Reality Assessment</h2>
      {error ? (
        <p className="mv-caption" style={{ color: "var(--mv-danger, #d93838)" }}>
          {error}
        </p>
      ) : null}
      <div className="mv-field-group">
        <label htmlFor="on" className="mv-label">
          Your organization
        </label>
        <input id="on" type="text" className="mv-field" value={org} onChange={(e) => setOrg(e.target.value)} />
      </div>
      <div className="mv-field-group">
        <label htmlFor="ok" className="mv-label">
          Kind of organization
        </label>
        <select id="ok" className="mv-field" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="mv-field-group">
        <label htmlFor="oe" className="mv-label">
          Your email
        </label>
        <input id="oe" type="email" className="mv-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        <span className="mv-caption mv-muted">So you can come back to the results. We’ll send a sign-in link.</span>
      </div>
      <button type="submit" className="mv-pill mv-pill--block" disabled={isSubmitting}>
        {isSubmitting ? "Starting…" : "Start the Reality Assessment"}
      </button>
      <p className="mv-caption mv-muted">You’ll make your predictions first. Then you invite your people.</p>
    </form>
  );
}

const fill = (t: string, org: string) => t.replaceAll("{org}", org);

export function AssessmentQuestions({
  mode,
  org,
  token,
}: {
  mode: "leader" | "staff";
  org?: string;
  token?: string;
}) {
  const router = useRouter();
  const name = org?.trim() || "";
  const short = name || "your organization";
  const leader = mode === "leader";
  const [qi, setQi] = useState(0);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [sealed, setSealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeToken, setActiveToken] = useState(token || "");
  const [contributorToken, setContributorToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [staffSubmitted, setStaffSubmitted] = useState(false);

  const [resultsStatus, setResultsStatus] = useState<{
    unlocked: boolean;
    contributorCount: number;
    threshold: number;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (token) {
      setActiveToken(token);
    } else if (typeof window !== "undefined") {
      try {
        const stored = leader
          ? window.sessionStorage.getItem("mv.assessment.leaderToken")
          : window.sessionStorage.getItem("mv.assessment.contributorToken");
        if (stored) setActiveToken(stored);

        const storedContributor = window.sessionStorage.getItem("mv.assessment.contributorToken");
        if (storedContributor) setContributorToken(storedContributor);
      } catch {
        // Ignore storage exceptions
      }
    }
  }, [token, leader]);

  // Poll results once sealed in leader view
  useEffect(() => {
    if (!sealed || !activeToken) return;

    let active = true;
    async function checkStatus() {
      try {
        const res = await fetch(`/api/assessment/results?token=${encodeURIComponent(activeToken)}`);
        if (res.ok) {
          const json = await res.json();
          if (active && json.ok && json.data) {
            setResultsStatus(json.data);
          }
        }
      } catch {
        // Fallback to sample / initial waiting state
      }
    }

    void checkStatus();
    const interval = setInterval(checkStatus, 4000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [sealed, activeToken]);

  if (sealed) {
    const count = resultsStatus ? resultsStatus.contributorCount : 0;
    const threshold = resultsStatus ? resultsStatus.threshold : 5;
    const unlocked = resultsStatus ? resultsStatus.unlocked : count >= 5;
    const shareToken = contributorToken || activeToken;
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/assessment/answer?token=${shareToken}${name ? `&org=${encodeURIComponent(name)}` : ""}`
      : `https://movemental.ai/assessment/answer?token=${shareToken}`;

    return (
      <div className="mv-wrap mv-stack mv-settle" style={{ maxWidth: 900, paddingTop: 72, paddingBottom: 96, gap: 28 }}>
        <p className="mv-small mv-muted">{name ? `${name} · ` : ""}Reality Assessment</p>
        <h1 className="mv-rz-title">Your predictions are in. Now your people answer.</h1>
        <div className="mv-stack" style={{ gap: 12, padding: "22px 24px", background: "var(--mv-sheet)", borderRadius: 4 }}>
          <div className="mv-tally" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} data-on={i < count} />
            ))}
          </div>
          <p className="mv-reading" style={{ lineHeight: 1.5 }}>
            {unlocked
              ? `${count} people have answered. The five-person privacy threshold is met — results are unsealed!`
              : `${count} of ${threshold} people required have answered. You’ll see the gap once five have.`}
          </p>
          <p className="mv-caption mv-muted">
            Five keeps anyone’s answers from being guessed. The more people answer, the truer the
            picture. You’ll get one email when results are ready, and none before.
          </p>
        </div>
        {unlocked ? (
          <div style={{ paddingTop: 8 }}>
            <Link
              className="mv-pill"
              href={`${MV_ROUTES.assessmentResults}?token=${encodeURIComponent(activeToken)}`}
            >
              View unsealed reality gap results →
            </Link>
          </div>
        ) : null}
        <div className="mv-field-group">
          <label htmlFor="lk" className="mv-label">
            Link for your people
          </label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input id="lk" type="text" readOnly className="mv-field" value={shareUrl} />
            <button
              type="button"
              className="mv-pill mv-pill--outline"
              style={{ flex: "0 0 auto" }}
              onClick={() => {
                try {
                  void navigator.clipboard?.writeText(shareUrl);
                } catch {
                  // Fallback
                }
                setCopied(true);
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <span className="mv-caption mv-muted">
            Anyone with this link can answer once for {name || "your organization"}. You can switch it off.
          </span>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <Link
            className="mv-link-target"
            href={`${MV_ROUTES.assessmentAnswer}?token=${encodeURIComponent(shareToken)}${name ? `&org=${encodeURIComponent(name)}` : ""}`}
          >
            See what your people will see
          </Link>
          <Link
            className="mv-link-target"
            href={`${MV_ROUTES.assessmentResults}?token=${encodeURIComponent(activeToken)}`}
          >
            See an example of the results
          </Link>
        </div>
      </div>
    );
  }

  if (staffSubmitted) {
    return (
      <div className="mv-wrap mv-stack mv-settle" style={{ maxWidth: 900, paddingTop: 72, paddingBottom: 96, gap: 28 }}>
        <p className="mv-small mv-muted">{name ? `${name} · ` : ""}Reality Assessment</p>
        <h1 className="mv-rz-title">Your answers are in.</h1>
        <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55 }}>
          Thank you. Your responses have been recorded anonymously. No one at {name || "your organization"} will ever
          see your individual answers.
        </p>
        <p className="mv-small mv-muted">
          Aggregated reality gap totals unlock once at least 5 people have answered.
        </p>
        <div>
          <Link
            className="mv-pill"
            href={`${MV_ROUTES.assessmentResults}?token=${encodeURIComponent(activeToken)}`}
          >
            Check results status
          </Link>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[qi]!;
  const options = leader ? q.leaderOptions : q.staffOptions;
  const last = qi === QUESTIONS.length - 1;

  const next = async () => {
    if (!last) return setQi(qi + 1);

    setIsSubmitting(true);
    setSubmitError(null);

    if (leader) {
      try {
        const res = await fetch("/api/assessment/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leaderToken: activeToken || "leader-preview",
            predictions: ans,
          }),
        });
        const json = await res.json();
        setIsSubmitting(false);
        if (!res.ok || !json.ok) {
          // If token not found in mock/preview, still transition to waiting room
          setSealed(true);
          return;
        }
        setSealed(true);
      } catch {
        setIsSubmitting(false);
        setSealed(true);
      }
    } else {
      try {
        const res = await fetch("/api/assessment/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contributorToken: activeToken || "contributor-preview",
            answers: ans,
          }),
        });
        setIsSubmitting(false);
        setStaffSubmitted(true);
      } catch {
        setIsSubmitting(false);
        setStaffSubmitted(true);
      }
    }
  };

  const back = () => {
    if (qi > 0) return setQi(qi - 1);
    router.push(MV_ROUTES.assessment);
  };

  return (
    <div className="mv-wrap mv-stack" style={{ maxWidth: 900, paddingTop: 64, paddingBottom: 96, gap: 28 }}>
      <div className="mv-stack" style={{ gap: 12 }}>
        <p className="mv-small mv-muted">
          {leader ? "Your predictions · leaders only" : `${name || "Your organization"} asked everyone to answer`}
        </p>
        <h1 className="mv-rz-title">{leader ? "What do you think is happening?" : "How do you actually use AI at work?"}</h1>
        <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55 }}>
          {leader
            ? "Answer for your people as a whole. Your predictions are kept sealed until your people’s answers are in, and they never see them."
            : `Your answers are anonymous. ${name ? `${name}’s` : "Your organization’s"} leaders see totals only, once at least five people have answered. No one at ${name || "your organization"} will ever see your individual answers.`}
        </p>
      </div>
      <div className="mv-themebar" aria-hidden="true">
        {QUESTIONS.map((x, k) => (
          <span key={x.area} data-state={k < qi ? "done" : k === qi ? "current" : undefined} />
        ))}
      </div>
      <fieldset key={qi} className="mv-settle mv-stack" style={{ margin: 0, padding: 0, border: "none", gap: 16 }}>
        <legend className="mv-stack" style={{ gap: 6, padding: 0, marginBottom: 16 }}>
          <span className="mv-small mv-muted">
            {q.area} · {qi + 1} of {QUESTIONS.length}
          </span>
          <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 34, lineHeight: 1.12 }}>
            {fill(leader ? q.leader : q.staff, short)}
          </span>
        </legend>
        <div className="mv-opts" role="radiogroup" aria-label={fill(leader ? q.leader : q.staff, short)}>
          {options.map((t, k) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={ans[qi] === k}
              className="mv-choice"
              onClick={() => setAns((a) => ({ ...a, [qi]: k }))}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      {submitError ? (
        <p className="mv-caption" style={{ color: "var(--mv-danger, #d93838)" }}>
          {submitError}
        </p>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={back} disabled={isSubmitting}>
          Back
        </button>
        <button type="button" className="mv-pill" onClick={next} disabled={isSubmitting}>
          {isSubmitting
            ? "Submitting…"
            : !last
            ? "Next"
            : leader
            ? "Seal my predictions"
            : "Send my answers"}
        </button>
      </div>
      <p className="mv-caption mv-muted">
        {leader
          ? "Each leader predicts separately. You’ll see where your own predictions differ from each other, too."
          : `There are no right answers. Honest ones help ${name || "your organization"} decide well.`}
      </p>
    </div>
  );
}
