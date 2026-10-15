"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { MV_ROUTES } from "../routes";
import { Check } from "./dialog";
import {
  ORG_TYPE_LABELS,
  ORG_TYPES,
  type ResolutionDraft,
  emptyDraft,
  numberWord,
  orgName,
  starredLines,
  statementText,
  updateDraft,
  useDraft,
} from "./draft";
import { SAMPLE_INVITATION } from "./fixtures";
import { RESOLVE_ACTS, RESOLVE_THEMES } from "./themes";

/**
 * The Resolution exercise: arrive, nine themes, review, the leadership turn.
 * Board: R3-Flow (and R3-Flow-Phone, R3-States). Copy verbatim.
 * Finishing goes to the document page (R4-Result), which supersedes R3-Flow's screen 5.
 */
export function ResolveFlow({ invitedSample }: { invitedSample: boolean }) {
  const stored = useDraft();
  const router = useRouter();
  const [note, setNote] = useState(-1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [lastStar, setLastStar] = useState(-1);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  // A draft that was mid-theme when this visit began gets the welcome-back note.
  const [resumeAt, setResumeAt] = useState<number | null>(null);

  if (stored === undefined) return <FlowLoading />;
  if (resumeAt === null) {
    setResumeAt(stored && !stored.finishedAt && stored.step === "theme" && stored.ti > 0 ? stored.ti : -1);
  }

  const d: ResolutionDraft =
    stored ??
    (invitedSample
      ? {
          ...emptyDraft(),
          org: SAMPLE_INVITATION.org,
          invitation: { from: SAMPLE_INVITATION.from, pronoun: SAMPLE_INVITATION.pronoun },
        }
      : emptyDraft());
  const set = (patch: Partial<ResolutionDraft>) => updateDraft((cur) => ({ ...cur, ...d, ...patch }));
  const org = orgName(d);
  const lines = starredLines(d);
  const resume = resumeAt !== null && resumeAt >= 0 && !resumeDismissed && d.step === "theme" && d.ti === resumeAt;

  if (d.step === "arrive") {
    return (
      <div className="mv-rz mv-rz--text" style={{ paddingTop: 80, gap: 30 }}>
        {d.invitation ? (
          <p className="mv-note">
            {d.invitation.from} invited you to write your own Resolution for {org}. You won’t see
            what {d.invitation.pronoun} chose until you’ve finished yours.
          </p>
        ) : null}
        <h1 className="mv-rz-title mv-rz-title--arrive">
          Say what you believe your organization should do about AI.
        </h1>
        <div className="mv-stack" style={{ gap: 10, maxWidth: 640 }}>
          <p className="mv-reading" style={{ fontSize: 23, lineHeight: 1.4 }}>
            Think as yourself, about your organization.
          </p>
          <p className="mv-body mv-muted">
            This isn’t a policy and it isn’t a test. Choose the language you could genuinely stand
            behind.
          </p>
        </div>
        <div className="mv-stack" style={{ gap: 12, paddingTop: 10 }}>
          <p id="kind" className="mv-label">
            What kind of organization?
          </p>
          <div role="group" aria-labelledby="kind" className="mv-choice-grid">
            {ORG_TYPES.map((k) => (
              <button
                key={k}
                type="button"
                className="mv-choice"
                aria-pressed={d.orgType === k}
                onClick={() => set({ orgType: k })}
              >
                {ORG_TYPE_LABELS[k]}
              </button>
            ))}
          </div>
        </div>
        <div className="mv-field-group" style={{ maxWidth: 640 }}>
          <label htmlFor="orgname" className="mv-label">
            Your organization’s name, if you’d like it on your Resolution
          </label>
          <input
            id="orgname"
            type="text"
            className="mv-field"
            value={d.org}
            onChange={(e) => set({ org: e.target.value })}
            placeholder="Optional"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", paddingTop: 6 }}>
          <button type="button" className="mv-pill" onClick={() => set({ step: "theme", ti: 0 })}>
            Begin
          </button>
          <p className="mv-caption mv-muted" style={{ fontSize: 14.5 }}>
            Nine themes, about four minutes, no account.
          </p>
        </div>
        <p className="mv-caption mv-muted" style={{ fontSize: 14.5 }}>
          Your Resolution stays private until you choose to share it.
        </p>
      </div>
    );
  }

  if (d.step === "theme") {
    const ti = Math.max(0, Math.min(8, d.ti));
    const th = RESOLVE_THEMES[ti]!;
    const go = (patch: Partial<ResolutionDraft>) => {
      setNote(-1);
      setLastStar(-1);
      set(patch);
      window.scrollTo({ top: 0 });
    };
    const next = () => {
      const skipped = { ...d.skipped };
      if (d.stars[ti] === undefined) skipped[ti] = true;
      go(ti < 8 ? { ti: ti + 1, skipped } : { step: "review", skipped });
    };
    const none = () => {
      const skipped = { ...d.skipped, [ti]: true as const };
      const stars = { ...d.stars };
      delete stars[ti];
      const ticks = { ...d.ticks };
      th.statements.forEach((_, j) => delete ticks[`${ti}-${j}`]);
      go(ti < 8 ? { ti: ti + 1, skipped, stars, ticks } : { step: "review", skipped, stars, ticks });
    };
    const back = () => go(ti > 0 ? { ti: ti - 1 } : { step: "arrive" });

    const sheet = (
      <div className="mv-rz-sheet">
        <p className="mv-caption mv-muted" style={{ fontSize: 13, marginBottom: 6 }}>
          Your Resolution
        </p>
        <p className="mv-rz-sheet-title">Resolved, that {org} should…</p>
        {RESOLVE_THEMES.every((_, i) => d.stars[i] === undefined && !d.skipped[i]) ? (
          <p
            className="mv-muted"
            style={{ paddingTop: 14, borderTop: "1px solid var(--mv-rule)", fontSize: 14.5, lineHeight: 1.55 }}
          >
            Your lines will appear here as you star them.
          </p>
        ) : null}
        <div aria-live="polite">
          {RESOLVE_THEMES.map((t, i) => {
            const j = d.stars[i];
            if (j === undefined && !d.skipped[i]) return null;
            return (
              <div
                key={t.name}
                className={`mv-rz-sheet-line${lastStar === i ? " mv-rz-sheet-line--new" : ""}`}
              >
                <p className="mv-muted" style={{ fontSize: 12.5, marginBottom: 3 }}>
                  {t.name}
                </p>
                {j === undefined ? (
                  <p className="mv-muted" style={{ fontSize: 14 }}>
                    No line from this theme
                  </p>
                ) : (
                  <p className="mv-reading">{statementText(d.orgType, i, j)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div className="mv-rz mv-rz-two" style={{ paddingBottom: 88 }}>
        <div className="mv-stack" style={{ gap: 24, minWidth: 0 }}>
          <div className="mv-stack" style={{ gap: 10 }}>
            <p className="mv-caption mv-muted">Theme {ti + 1} of 9</p>
            <div className="mv-themebar" aria-hidden="true">
              {RESOLVE_THEMES.map((t, i) => (
                <span
                  key={t.name}
                  title={t.name}
                  data-state={
                    i === ti
                      ? "current"
                      : d.stars[i] !== undefined
                        ? "done"
                        : d.skipped[i]
                          ? "skipped"
                          : undefined
                  }
                />
              ))}
            </div>
          </div>
          {resume ? (
            <div
              className="mv-note"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "14px 18px" }}
            >
              <p>
                Welcome back. You were on theme {ti + 1}.{" "}
                {lines.length === 1
                  ? "Your one line is saved."
                  : `Your ${numberWord(lines.length)} lines are saved.`}
              </p>
              <button
                type="button"
                className="mv-textbtn mv-textbtn--muted"
                style={{ fontSize: 14 }}
                onClick={() => setResumeDismissed(true)}
              >
                Dismiss
              </button>
            </div>
          ) : null}
          <div
            className="mv-phone-only"
            style={{ border: "1px solid var(--mv-rule)", borderRadius: 8, padding: "12px 16px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p className="mv-small">
                {lines.length} {lines.length === 1 ? "line so far" : "lines so far"}
              </p>
              <button
                type="button"
                className="mv-textbtn"
                style={{ fontSize: 14 }}
                aria-expanded={sheetOpen}
                onClick={() => setSheetOpen((o) => !o)}
              >
                {sheetOpen ? "Hide" : "Show"}
              </button>
            </div>
            {sheetOpen ? <div style={{ marginTop: 12 }}>{sheet}</div> : null}
          </div>
          <div className="mv-stack" style={{ gap: 12, paddingTop: 12 }}>
            <p style={{ fontSize: 16, fontWeight: 500 }}>{th.name}</p>
            <h1 className="mv-rz-q">{th.question}</h1>
            <button
              type="button"
              className="mv-textbtn mv-textbtn--muted"
              style={{ alignSelf: "flex-start", textDecoration: "none", minHeight: 40 }}
              aria-expanded={note === ti}
              onClick={() => setNote(note === ti ? -1 : ti)}
            >
              What’s at stake {note === ti ? "−" : "+"}
            </button>
            {note === ti ? <p className="mv-stake mv-settle">{th.stake}</p> : null}
          </div>
          <div className="mv-rows">
            {th.statements.map((_, j) => {
              const key = `${ti}-${j}`;
              const text = statementText(d.orgType, ti, j);
              const on = !!d.ticks[key];
              const starred = d.stars[ti] === j;
              return (
                <div key={key} className="mv-row" data-starred={starred}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    className="mv-check"
                    onClick={() => {
                      const ticks = { ...d.ticks };
                      const stars = { ...d.stars };
                      if (ticks[key]) {
                        delete ticks[key];
                        if (stars[ti] === j) delete stars[ti];
                      } else {
                        ticks[key] = true;
                      }
                      set({ ticks, stars });
                    }}
                  >
                    <span aria-hidden="true" className="mv-check-box">
                      ✓
                    </span>
                    <span className="mv-check-text">{text}</span>
                  </button>
                  <button
                    type="button"
                    className="mv-star"
                    aria-pressed={starred}
                    aria-label={`Most mine: ${text}`}
                    title="Most mine"
                    onClick={() => {
                      const ticks = { ...d.ticks };
                      const stars = { ...d.stars };
                      const skipped = { ...d.skipped };
                      if (stars[ti] === j) {
                        delete stars[ti];
                      } else {
                        stars[ti] = j;
                        ticks[key] = true;
                        delete skipped[ti];
                      }
                      setLastStar(ti);
                      set({ ticks, stars, skipped });
                    }}
                  >
                    ★
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mv-caption mv-muted">
            Tick everything you agree with. Star the one that is most yours.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", paddingTop: 6 }}>
            <button type="button" className="mv-pill" onClick={next}>
              {ti < 8 ? "Next theme" : "Review my Resolution"}
            </button>
            <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={back}>
              Back
            </button>
            <span style={{ flex: 1 }} />
            <button
              type="button"
              className="mv-textbtn mv-textbtn--muted"
              style={{ fontSize: 14.5 }}
              onClick={none}
            >
              None of these is mine
            </button>
          </div>
        </div>
        <aside className="mv-rz-aside mv-desk-only">{sheet}</aside>
      </div>
    );
  }

  if (d.step === "review") {
    const short = org;
    const skippedNames = RESOLVE_THEMES.filter((_, i) => d.skipped[i] && d.stars[i] === undefined).map(
      (t) => t.name,
    );
    return (
      <div className="mv-rz mv-rz--text" style={{ paddingTop: 64, gap: 30 }}>
        <h1 className="mv-rz-title">Here is what you resolved.</h1>
        {lines.length === 0 ? (
          <section className="mv-stack" style={{ gap: 12 }}>
            <h2 className="mv-h3--sm">You didn’t choose a line in any theme.</h2>
            <p className="mv-soft" style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 640 }}>
              That can be an honest answer. Want to look again at one?
            </p>
            <button
              type="button"
              className="mv-pill"
              style={{ alignSelf: "flex-start", minHeight: 44, padding: "0 20px", fontSize: 15 }}
              onClick={() => set({ step: "theme", ti: 0 })}
            >
              Look again
            </button>
          </section>
        ) : (
          <>
            <div className="mv-rz-sheet" style={{ padding: "34px 40px" }}>
              <p className="mv-rz-sheet-title" style={{ marginBottom: 14 }}>
                Resolved, that {org} should…
              </p>
              {lines.map((l) => (
                <div
                  key={l.ti}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) auto",
                    gap: 18,
                    alignItems: "baseline",
                    padding: "14px 0",
                    borderTop: "1px solid var(--mv-rule)",
                  }}
                >
                  <span className="mv-stack" style={{ gap: 3 }}>
                    <span className="mv-muted" style={{ fontSize: 12.5 }}>
                      {l.theme}
                    </span>
                    <span className="mv-reading" style={{ fontSize: 19 }}>
                      {l.text}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="mv-textbtn mv-textbtn--muted"
                    style={{ fontSize: 14 }}
                    onClick={() => set({ step: "theme", ti: l.ti })}
                  >
                    Change
                  </button>
                </div>
              ))}
            </div>
            {skippedNames.length ? (
              <p className="mv-muted" style={{ fontSize: 15.5 }}>
                You left {skippedNames.join(" and ")} without a line. That’s fine.
              </p>
            ) : null}
            <div className="mv-stack" style={{ gap: 12, paddingTop: 18 }}>
              <h2 className="mv-rz-h2">Which of these would be hardest for {short} to adopt today?</h2>
              <p className="mv-muted" style={{ fontSize: 15.5 }}>
                Choose one. This helps you see where conviction and readiness are furthest apart.
              </p>
              <div role="radiogroup" aria-label="Hardest to adopt" className="mv-stack" style={{ gap: 8, paddingTop: 6 }}>
                {lines.map((l) => (
                  <button
                    key={l.ti}
                    type="button"
                    role="radio"
                    aria-checked={d.hardest === l.ti}
                    className="mv-choice mv-choice--reading"
                    onClick={() => set({ hardest: l.ti })}
                  >
                    {l.text}
                  </button>
                ))}
                <button
                  type="button"
                  role="radio"
                  aria-checked={d.hardest === -1}
                  className="mv-choice"
                  style={{ minHeight: 52, fontSize: 15.5 }}
                  onClick={() => set({ hardest: -1 })}
                >
                  None of them
                </button>
              </div>
            </div>
          </>
        )}
        <div style={{ paddingTop: 8 }}>
          <button
            type="button"
            className="mv-pill"
            onClick={() => {
              set({ step: "lead" });
              window.scrollTo({ top: 0 });
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // The leadership turn
  const short = org;
  const finish = () => {
    const now = new Date().toISOString();
    updateDraft((cur) => {
      const merged = { ...cur, ...d };
      const nowLines = starredLines(merged).map((l) => `${l.theme}: ${l.text}`);
      const last = merged.versions.at(-1);
      const changed = !last || last.lines.join("|") !== nowLines.join("|");
      return {
        ...merged,
        versions: changed ? [...merged.versions, { at: now, lines: nowLines }] : merged.versions,
        finishedAt: changed ? now : (merged.finishedAt ?? now),
        step: "review",
      };
    });
    router.push(MV_ROUTES.resolveDocument);
  };

  return (
    <div className="mv-rz mv-rz--narrow" style={{ paddingTop: 72, gap: 28 }}>
      <h1 className="mv-rz-title mv-rz-title--lead">Leadership is something you do.</h1>
      <p className="mv-reading mv-soft" style={{ fontSize: 21, lineHeight: 1.5 }}>
        You don’t need a title to help {short} decide this. What will you do with what you just
        resolved?
      </p>
      <div role="group" aria-label="What you will do" className="mv-stack" style={{ borderTop: "1px solid var(--mv-rule)" }}>
        {RESOLVE_ACTS.map((a, i) => (
          <Check
            key={a}
            variant="act"
            checked={d.acts.includes(i)}
            onToggle={() =>
              set({ acts: d.acts.includes(i) ? d.acts.filter((x) => x !== i) : [...d.acts, i] })
            }
          >
            {a}
          </Check>
        ))}
      </div>
      <div className="mv-field-group" style={{ paddingTop: 6 }}>
        <label htmlFor="two" className="mv-label" style={{ fontSize: 15.5 }}>
          If you had two minutes in the meeting where {short} decides this, what would you say?{" "}
          <span className="mv-label-note">Optional</span>
        </label>
        <textarea
          id="two"
          rows={3}
          className="mv-field"
          value={d.two}
          onChange={(e) => set({ two: e.target.value })}
        />
      </div>
      <div className="mv-choice-grid" style={{ gap: 14, maxWidth: "none" }}>
        <div className="mv-field-group">
          <label htmlFor="nm" className="mv-label">
            Your name <span className="mv-label-note">Optional</span>
          </label>
          <input
            id="nm"
            type="text"
            className="mv-field"
            value={d.name}
            onChange={(e) => set({ name: e.target.value })}
          />
        </div>
        <div className="mv-field-group">
          <label htmlFor="rl" className="mv-label">
            Your role <span className="mv-label-note">Optional</span>
          </label>
          <input
            id="rl"
            type="text"
            className="mv-field"
            value={d.role}
            onChange={(e) => set({ role: e.target.value })}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24, paddingTop: 6 }}>
        <button type="button" className="mv-pill" onClick={finish}>
          See my Resolution
        </button>
        <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={() => set({ step: "review" })}>
          Back
        </button>
      </div>
    </div>
  );
}

export function FlowLoading() {
  return (
    <div className="mv-rz mv-rz--text" role="status" aria-label="Loading" style={{ gap: 12 }}>
      <span className="mv-shimmer" style={{ height: 30, width: "55%" }} />
      <span className="mv-shimmer" style={{ height: 14, width: "90%" }} />
      <span className="mv-shimmer" style={{ height: 14, width: "70%" }} />
    </div>
  );
}
