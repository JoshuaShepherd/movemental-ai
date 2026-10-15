"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MV_ROUTES } from "../routes";
import { QUESTIONS } from "./questions";

/**
 * The Reality Assessment. Board: Assessment, whose five states become routes:
 * explainer and start (/assessment), leader predicts (/assessment/predict), waiting for five
 * (after sealing), what your people see (/assessment/answer), the gap (/assessment/results).
 *
 * Fixture seam: there is no back end. Answers live in component state and are not stored or
 * sent. The waiting screen and the results are the board's sample, labeled "Sample data."
 * TODO(back-end merge): assessments, invitations, the five-answer threshold, sealed predictions.
 */

const TYPES = ["Nonprofit", "Church", "School or seminary", "Network or denomination", "Other institution"];

export function AssessmentStart() {
  const router = useRouter();
  const [org, setOrg] = useState("");
  const [type, setType] = useState(TYPES[0]!);
  const [email, setEmail] = useState("");
  return (
    <form
      className="mv-stack"
      style={{ gap: 16, padding: "30px 32px 32px", background: "var(--mv-sheet)", borderRadius: 4 }}
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        if (org.trim()) q.set("org", org.trim());
        router.push(`${MV_ROUTES.assessmentPredict}${q.size ? `?${q}` : ""}`);
      }}
    >
      <h2 className="mv-form-h">Start the Reality Assessment</h2>
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
        {/* TODO(back-end merge): send the sign-in link. Not stored or sent today. */}
        <input id="oe" type="email" className="mv-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        <span className="mv-caption mv-muted">So you can come back to the results. We’ll send a sign-in link.</span>
      </div>
      <button type="submit" className="mv-pill mv-pill--block">
        Start the Reality Assessment
      </button>
      <p className="mv-caption mv-muted">You’ll make your predictions first. Then you invite your people.</p>
    </form>
  );
}

const fill = (t: string, org: string) => t.replaceAll("{org}", org);

export function AssessmentQuestions({ mode, org }: { mode: "leader" | "staff"; org?: string }) {
  const router = useRouter();
  const name = org?.trim() || "";
  const short = name || "your organization";
  const leader = mode === "leader";
  const [qi, setQi] = useState(0);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [sealed, setSealed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (sealed) {
    return (
      <div className="mv-wrap mv-stack mv-settle" style={{ maxWidth: 900, paddingTop: 72, paddingBottom: 96, gap: 28 }}>
        <p className="mv-small mv-muted">{name ? `${name} · ` : ""}Reality Assessment</p>
        <h1 className="mv-rz-title">Your predictions are in. Now your people answer.</h1>
        <div className="mv-stack" style={{ gap: 12, padding: "22px 24px", background: "var(--mv-sheet)", borderRadius: 4 }}>
          <div className="mv-tally" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} data-on={i < 3} />
            ))}
          </div>
          <p className="mv-reading" style={{ lineHeight: 1.5 }}>
            3 of the 19 people you invited have answered. You’ll see the gap once five have.{" "}
            <span className="mv-caption mv-muted">Sample data.</span>
          </p>
          <p className="mv-caption mv-muted">
            Five keeps anyone’s answers from being guessed. The more people answer, the truer the
            picture. You’ll get one email when results are ready, and none before.
          </p>
        </div>
        <div className="mv-field-group">
          <label htmlFor="lk" className="mv-label">
            Link for your people
          </label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* TODO(back-end merge): a real link per assessment. */}
            <input id="lk" type="text" readOnly className="mv-field" value="movemental.ai/a/riverbend-oct" />
            <button type="button" className="mv-pill mv-pill--outline" style={{ flex: "0 0 auto" }} onClick={() => setCopied(true)}>
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
            href={`${MV_ROUTES.assessmentAnswer}${name ? `?org=${encodeURIComponent(name)}` : ""}`}
          >
            See what your people will see
          </Link>
          <Link className="mv-link-target" href={MV_ROUTES.assessmentResults}>
            See an example of the results
          </Link>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[qi]!;
  const options = leader ? q.leaderOptions : q.staffOptions;
  const last = qi === QUESTIONS.length - 1;
  const next = () => {
    if (!last) return setQi(qi + 1);
    if (leader) return setSealed(true);
    router.push(MV_ROUTES.assessmentResults);
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
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={back}>
          Back
        </button>
        <button type="button" className="mv-pill" onClick={next}>
          {!last ? "Next" : leader ? "Seal my predictions" : "Send my answers"}
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
