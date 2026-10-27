"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MV_ROUTES } from "../routes";
import { Check } from "./dialog";
import {
  type Pick,
  type ResolutionDraft,
  answeredCount,
  beliefLines,
  emptyDraft,
  emptyPick,
  firstOpenIndex,
  hardestCandidates,
  hasAnyAnswer,
  isAnswered,
  leaderQuestion,
  orgLineParts,
  orgName,
  orgTitle,
  pickOf,
  questionLines,
  snapshotLines,
  updateDraft,
  useDraft,
} from "./draft";
import { SAMPLE_INVITATION } from "./fixtures";
import {
  BELIEF_PART,
  PARTS,
  QUESTIONS,
  QUESTION_COUNT,
  RESOLVE_ACTS,
  SECTORS,
  type ResolveQuestion,
  type Sector,
  answerText,
  loadExamples,
  pad2,
  partRange,
  questionTitle,
  richSegments,
  sectorDef,
} from "./questions";

/**
 * Resolve: arrive, fourteen questions, review, the leadership turn.
 * Board: canvas "Resolve: Fourteen Questions", Main (docs/handoff/resolve-v3/).
 * Finishing goes to the document page.
 */
export function ResolveFlow({ invitedSample }: { invitedSample: boolean }) {
  const stored = useDraft();
  const router = useRouter();
  // A draft that was mid-way when this visit began gets the welcome-back note on the start screen.
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const [resumeDismissed, setResumeDismissed] = useState(false);

  if (stored === undefined) return <FlowLoading />;
  if (resumeAt === null) {
    setResumeAt(stored && !stored.finishedAt && answeredCount(stored) > 0 ? answeredCount(stored) : -1);
  }

  const d: ResolutionDraft =
    stored ??
    (invitedSample
      ? {
          ...emptyDraft(),
          sector: "church",
          org: SAMPLE_INVITATION.org,
          invitation: { from: SAMPLE_INVITATION.from, pronoun: SAMPLE_INVITATION.pronoun },
        }
      : emptyDraft());
  const set = (patch: Partial<ResolutionDraft>) => updateDraft((cur) => ({ ...cur, ...d, ...patch }));
  const go = (patch: Partial<ResolutionDraft>) => {
    set(patch);
    window.scrollTo({ top: 0 });
  };

  if (d.step === "arrive") {
    const showResume = !!resumeAt && resumeAt > 0 && !resumeDismissed && !d.finishedAt;
    return (
      <Arrive
        d={d}
        set={set}
        resume={
          showResume
            ? {
                text: `Welcome back. You have answered ${answeredCount(d)} of ${QUESTION_COUNT} questions, and your answers are saved on this device.`,
                go: () => go({ step: "question", qi: firstOpenIndex(d) }),
                dismiss: () => setResumeDismissed(true),
              }
            : null
        }
        begin={() => go({ step: "question", qi: 0 })}
      />
    );
  }

  if (d.step === "question") {
    return <QuestionScreen key={d.qi} d={d} set={set} go={go} />;
  }

  if (d.step === "review") {
    return <Review d={d} set={set} go={go} />;
  }

  const finish = () => {
    const now = new Date().toISOString();
    updateDraft((cur) => {
      const merged = { ...cur, ...d };
      const nowLines = snapshotLines(merged);
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
  return <Lead d={d} set={set} go={go} finish={finish} />;
}

type Setter = (patch: Partial<ResolutionDraft>) => void;

/* ---------------------------------------------------------------- arrive */

function Arrive({
  d,
  set,
  resume,
  begin,
}: {
  d: ResolutionDraft;
  set: Setter;
  resume: { text: string; go: () => void; dismiss: () => void } | null;
  begin: () => void;
}) {
  const sec = sectorDef(d.sector);
  return (
    <div className="mv-rz mv-rz--narrow" style={{ paddingTop: 72, gap: 30 }}>
      {d.invitation ? (
        <p className="mv-note">
          {d.invitation.from} invited you to write your own Resolution for {orgName(d)}. You won’t see
          what {d.invitation.pronoun} chose until you’ve finished yours.
        </p>
      ) : null}
      {resume ? (
        <div className="mv-note mv-rq-resume">
          <p>{resume.text}</p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <button type="button" className="mv-pill mv-pill--outline" onClick={resume.go}>
              Continue where you left off
            </button>
            <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={resume.dismiss}>
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
      <p style={{ fontSize: 15, fontWeight: 500 }}>Your Resolution</p>
      <h1 className="mv-rz-title mv-rz-title--arrive">What should your organization do about AI?</h1>
      <p className="mv-reading mv-soft" style={{ fontSize: 21, lineHeight: 1.55 }}>
        Fourteen questions every church, nonprofit and school needs to answer about AI. Choose the
        answers you agree with, or write your own. If you are not sure, each question has a short
        explanation, and you can see Movemental’s own answer after you give yours.
      </p>
      <ol className="mv-rq-parts">
        {PARTS.map((p) => {
          const [a, b] = partRange(p.id);
          return (
            <li key={p.id}>
              <span>{p.name}</span>
              <span>
                Questions {pad2(a)} to {pad2(b)}: {p.blurb}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mv-stack" style={{ gap: 12 }}>
        <p id="kind" className="mv-label">
          What kind of organization is it?
        </p>
        <div role="group" aria-labelledby="kind" className="mv-rq-sectors">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="mv-rq-sector"
              aria-pressed={d.sector === s.id}
              onClick={() => set({ sector: s.id })}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mv-field-group" style={{ maxWidth: 460 }}>
        <label htmlFor="orgname" className="mv-label">
          Its name <span className="mv-label-note">(optional)</span>
        </label>
        <input
          id="orgname"
          type="text"
          className="mv-field"
          value={d.org}
          onChange={(e) => set({ org: e.target.value })}
          placeholder={`For example, ${sec.namePlaceholder}`}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", paddingTop: 6 }}>
        <button type="button" className="mv-pill" onClick={begin}>
          Start the questions
        </button>
        <p className="mv-caption mv-muted" style={{ fontSize: 14 }}>
          About twelve minutes. No account needed.
        </p>
      </div>
      <p className="mv-caption mv-muted" style={{ fontSize: 14 }}>
        Only you see your answers unless you choose to share them.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- question */

function useExamples(sector: Sector, wanted: boolean) {
  const [ex, setEx] = useState<{ sector: Sector; data: Record<string, string[]> } | null>(null);
  useEffect(() => {
    if (!wanted || ex?.sector === sector) return;
    let live = true;
    loadExamples(sector)
      .then((data) => {
        if (live) setEx({ sector, data });
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [sector, wanted, ex?.sector]);
  return ex?.sector === sector ? ex.data : null;
}

function QuestionScreen({ d, set, go }: { d: ResolutionDraft; set: Setter; go: Setter }) {
  const qi = Math.max(0, Math.min(QUESTION_COUNT - 1, d.qi));
  const q = QUESTIONS[qi]!;
  const p = pickOf(d, q.id);
  const single = q.mode === "single";
  const sec = sectorDef(d.sector);
  const [teach, setTeach] = useState(false);
  const [take, setTake] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false);
  const examples = useExamples(d.sector, Object.values(open).some(Boolean));
  const answered = isAnswered(d, q);
  const part = PARTS.find((x) => x.id === q.part)!;
  const partIdx = PARTS.indexOf(part);
  const title = questionTitle(q, d.sector);
  const setPick = (next: Pick) => set({ picks: { ...d.picks, [q.id]: next } });

  const next = () => go(qi < QUESTION_COUNT - 1 ? { qi: qi + 1 } : { step: "review" });
  const back = () => go(qi > 0 ? { qi: qi - 1 } : { step: "arrive" });

  return (
    <div className="mv-rz mv-rz-two" style={{ paddingBottom: 96 }}>
      <div className="mv-stack" style={{ gap: 26, minWidth: 0, maxWidth: 820 }}>
        <nav aria-label="Questions" className="mv-stack" style={{ gap: 12 }}>
          <p className="mv-caption mv-muted" style={{ fontSize: 14 }}>
            Part {partIdx + 1} of {PARTS.length}: {part.name} · Question {qi + 1} of {QUESTION_COUNT}
          </p>
          <div className="mv-rq-nav">
            {PARTS.map((pt) => (
              <div key={pt.id}>
                {QUESTIONS.map((qq, i) =>
                  qq.part !== pt.id ? null : (
                    <button
                      key={qq.id}
                      type="button"
                      className="mv-rq-num"
                      data-state={i === qi ? "current" : isAnswered(d, qq) ? "done" : undefined}
                      aria-current={i === qi ? "step" : undefined}
                      aria-label={`Question ${i + 1}: ${questionTitle(qq, d.sector)}`}
                      title={questionTitle(qq, d.sector)}
                      onClick={() => go({ qi: i })}
                    >
                      {pad2(i + 1)}
                    </button>
                  ),
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="mv-phone-only mv-rq-sheet-toggle">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="mv-small">Your Resolution so far</p>
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
          {sheetOpen ? (
            <div style={{ marginTop: 12 }}>
              <SoFar d={d} />
            </div>
          ) : null}
        </div>

        <div className="mv-stack" style={{ gap: 14 }}>
          <p className="mv-caption mv-muted" style={{ fontSize: 14 }}>
            {q.term}
          </p>
          <h1 className="mv-rz-q">{title}</h1>
          <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 700 }}>
            {q.why}
          </p>
          <button
            type="button"
            className="mv-rq-disclose"
            aria-expanded={teach}
            aria-controls={`teach-${q.id}`}
            onClick={() => setTeach((t) => !t)}
          >
            Before you answer {teach ? "−" : "+"}
          </button>
          {teach ? (
            <div id={`teach-${q.id}`} className="mv-rq-teach mv-settle">
              {q.teach.map((t) => (
                <div key={t.heading}>
                  <p>{t.heading}</p>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mv-stack" style={{ gap: 10 }}>
          <p className="mv-caption mv-muted" style={{ fontSize: 14 }}>
            {q.how}
          </p>
          <div role={single ? "radiogroup" : "group"} aria-label={title} className="mv-rows">
            {q.answers.map((a) => {
              const text = answerText(a, d.sector);
              const exs = examples?.[a.id] ?? [];
              const exOpen = !!open[a.id];
              const exToggle = (
                <div className="mv-rq-exwrap">
                  <button
                    type="button"
                    className="mv-rq-exbtn"
                    aria-expanded={exOpen}
                    onClick={() => setOpen((o) => ({ ...o, [a.id]: !o[a.id] }))}
                  >
                    {exOpen ? "Hide examples" : `Examples for ${sec.exName}`}
                  </button>
                  {exOpen ? (
                    exs.length ? (
                      <ul className="mv-rq-ex mv-settle">
                        {exs.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mv-caption mv-muted" style={{ padding: "6px 0" }}>
                        Loading examples…
                      </p>
                    )
                  ) : null}
                </div>
              );
              if (single) {
                const on = p.choice === a.id;
                return (
                  <div key={a.id} className="mv-rq-row" data-starred={on}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className="mv-check mv-rq-radio"
                      onClick={() => setPick({ ...p, choice: on ? null : a.id, none: false })}
                    >
                      <span aria-hidden="true" className="mv-radio-dot" />
                      <span className="mv-check-text">{text}</span>
                    </button>
                    {exToggle}
                  </div>
                );
              }
              const on = !!p.ticks[a.id];
              const starred = p.star === a.id;
              return (
                <div key={a.id} className="mv-rq-row" data-starred={starred}>
                  <div className="mv-row" style={{ borderBottom: "none" }}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      className="mv-check"
                      onClick={() => {
                        const ticks = { ...p.ticks };
                        if (on) delete ticks[a.id];
                        else ticks[a.id] = true;
                        setPick({ ...p, ticks, star: on && starred ? null : p.star, none: false });
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
                      aria-label={`Mark as most important: ${text}`}
                      title="Most important"
                      onClick={() =>
                        setPick({
                          ...p,
                          ticks: { ...p.ticks, [a.id]: true },
                          star: starred ? null : a.id,
                          none: false,
                        })
                      }
                    >
                      ★
                    </button>
                  </div>
                  {exToggle}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mv-stack" style={{ gap: 12 }}>
          <button
            type="button"
            className="mv-rq-none"
            aria-pressed={p.none}
            onClick={() =>
              setPick(p.none ? { ...p, none: false } : { ...emptyPick(), none: true, own: p.own })
            }
          >
            None of these fits my view
          </button>
          {p.none ? (
            <div className="mv-field-group mv-settle" style={{ maxWidth: 640 }}>
              <label htmlFor={`own-${q.id}`} className="mv-label">
                What would you say instead? <span className="mv-label-note">(optional)</span>
              </label>
              <textarea
                id={`own-${q.id}`}
                rows={3}
                className="mv-field mv-rq-own"
                value={p.own}
                placeholder={q.part === BELIEF_PART ? "I believe…" : "We should…"}
                onChange={(e) => setPick({ ...p, own: e.target.value })}
              />
              <span className="mv-caption mv-muted">Private to you. Never counted.</span>
            </div>
          ) : null}
        </div>

        <section aria-label="Movemental’s answer" className="mv-rq-take">
          {answered ? (
            <button
              type="button"
              className="mv-pill mv-pill--outline"
              aria-expanded={take}
              aria-controls={`take-${q.id}`}
              style={{ alignSelf: "flex-start" }}
              onClick={() => setTake((t) => !t)}
            >
              {take ? "Hide Movemental’s answer" : "See Movemental’s answer"}
            </button>
          ) : (
            <p className="mv-muted" style={{ fontSize: 15 }}>
              Answer the question to see Movemental’s answer.
            </p>
          )}
          {answered && take ? <Take q={q} /> : null}
        </section>

        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", paddingTop: 4 }}>
          <button type="button" className="mv-pill" onClick={next}>
            {qi === QUESTION_COUNT - 1 ? "Review my answers" : "Next question"}
          </button>
          <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={back}>
            Back
          </button>
        </div>
      </div>
      <aside className="mv-rz-aside mv-desk-only" aria-label="Your Resolution so far">
        <div className="mv-rz-sheet">
          <p className="mv-caption mv-muted" style={{ fontSize: 13, marginBottom: 10 }}>
            Your Resolution so far
          </p>
          <SoFar d={d} />
        </div>
      </aside>
    </div>
  );
}

function Rich({ value }: { value: string }) {
  return (
    <>
      {richSegments(value).map((s, i) =>
        s.strong ? (
          <strong key={i} style={{ color: "var(--mv-ink)", fontWeight: 600 }}>
            {s.text}
          </strong>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

function Take({ q }: { q: ResolveQuestion }) {
  return (
    <div id={`take-${q.id}`} className="mv-rq-takebody mv-settle">
      <p className="mv-rq-takehead">{q.take.head}</p>
      {q.take.body.map((b, i) =>
        b.kind === "h" ? (
          <h3 key={i}>{b.value}</h3>
        ) : b.kind === "p" ? (
          <p key={i}>
            <Rich value={b.value} />
          </p>
        ) : (
          <ul key={i}>
            {b.value.map((li) => (
              <li key={li}>
                <Rich value={li} />
              </li>
            ))}
          </ul>
        ),
      )}
      <p className="mv-rq-takemeta">Read more: {q.deeper}</p>
      <p className="mv-rq-takemeta">Movemental’s answer does not change yours and is never counted.</p>
    </div>
  );
}

/** The side sheet: each starred answer (or the q05 choice) as it builds. */
function SoFar({ d }: { d: ResolutionDraft }) {
  const beliefs = beliefLines(d).filter((l) => l.lead);
  const org = orgLineParts(d)
    .flatMap((p) => p.rows)
    .filter((l) => l.lead);
  if (!beliefs.length && !org.length) {
    return (
      <p className="mv-reading mv-muted" style={{ fontSize: 16, lineHeight: 1.55 }}>
        The answers you star will appear here.
      </p>
    );
  }
  return (
    <div className="mv-stack" style={{ gap: 6 }} aria-live="polite">
      {beliefs.length ? (
        <>
          <p className="mv-rz-sheet-title" style={{ fontSize: 26, margin: "0 0 4px" }}>
            I believe
          </p>
          {beliefs.map((l) => (
            <div key={l.qid} className="mv-rq-soline">
              <span>{l.label}</span>
              <span>{l.lead!.text}</span>
            </div>
          ))}
        </>
      ) : null}
      {org.length ? (
        <>
          <p className="mv-rz-sheet-title" style={{ fontSize: 26, margin: "10px 0 4px" }}>
            Resolved, that {orgTitle(d)} should
          </p>
          {org.map((l) => (
            <div key={l.qid} className="mv-rq-soline">
              <span>{l.label}</span>
              <span>{l.lead!.text}</span>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- review */

function Review({ d, set, go }: { d: ResolutionDraft; set: Setter; go: Setter }) {
  const org = orgName(d);
  const any = hasAnyAnswer(d);
  const hard = hardestCandidates(d);
  return (
    <div className="mv-rz mv-rz--text" style={{ paddingTop: 56, gap: 40 }}>
      <div className="mv-stack" style={{ gap: 12 }}>
        <h1 className="mv-rz-title">Here is what you resolved.</h1>
        <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55 }}>
          Your starred answers, one for each question. Change any of them before you go on.
        </p>
      </div>
      {!any ? (
        <section className="mv-rz-sheet mv-stack" style={{ gap: 12, alignItems: "flex-start" }}>
          <h2 className="mv-rz-h2--sm">You didn’t choose an answer to any question.</h2>
          <p className="mv-reading mv-soft" style={{ fontSize: 17, lineHeight: 1.55 }}>
            That can be an honest answer. Would you like to look at the questions again?
          </p>
          <button type="button" className="mv-pill" onClick={() => go({ step: "question", qi: 0 })}>
            Look again
          </button>
        </section>
      ) : (
        <>
          {PARTS.map((pt) => (
            <section key={pt.id} className="mv-stack" style={{ gap: 0 }}>
              <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{pt.name}</h2>
              <ol className="mv-rq-review">
                {QUESTIONS.map((q, i) => {
                  if (q.part !== pt.id) return null;
                  const l = questionLines(d, q);
                  return (
                    <li key={q.id}>
                      <span className="mv-stack" style={{ gap: 4, minWidth: 0 }}>
                        <span className="mv-caption mv-muted">
                          {pad2(i + 1)} · {q.label}
                        </span>
                        <span className="mv-reading" data-empty={!l.lead}>
                          {l.lead ? l.lead.text : l.none ? "None of the options fit my view." : "Not answered."}
                        </span>
                      </span>
                      <button
                        type="button"
                        className="mv-textbtn mv-textbtn--muted"
                        aria-label={`Change your answer to question ${i + 1}`}
                        onClick={() => go({ step: "question", qi: i })}
                      >
                        Change
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
          {hard.length ? (
            <section className="mv-stack" style={{ gap: 12 }}>
              <h2 id="hardLabel" className="mv-rz-h2">
                Which of these would be hardest for {org} to do today?
              </h2>
              <p className="mv-muted" style={{ fontSize: 15, lineHeight: 1.55 }}>
                Choose one. It shows where your convictions and your organization’s readiness are
                furthest apart.
              </p>
              <div role="radiogroup" aria-labelledby="hardLabel" className="mv-rq-hard">
                {[...hard, { id: "none", text: "None of them" }].map((h) => {
                  const on = d.hardest === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className="mv-radio"
                      onClick={() => set({ hardest: on ? null : h.id })}
                    >
                      <span aria-hidden="true" className="mv-radio-dot" />
                      <span className={h.id === "none" ? undefined : "mv-reading"} style={{ fontSize: h.id === "none" ? 15.5 : 17, lineHeight: 1.45 }}>
                        {h.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}
        </>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <button type="button" className="mv-pill" onClick={() => go({ step: "lead" })}>
          Continue
        </button>
        <button
          type="button"
          className="mv-textbtn mv-textbtn--muted"
          onClick={() => go({ step: "question", qi: QUESTION_COUNT - 1 })}
        >
          Back to question {QUESTION_COUNT}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ lead */

function Lead({ d, set, go, finish }: { d: ResolutionDraft; set: Setter; go: Setter; finish: () => void }) {
  const org = orgName(d);
  const suggest = leaderQuestion(d);
  const sec = sectorDef(d.sector);
  return (
    <div className="mv-rz mv-rz--narrow" style={{ paddingTop: 56, gap: 32 }}>
      <div className="mv-stack" style={{ gap: 14 }}>
        <h1 className="mv-rz-title mv-rz-title--lead">Leadership is something you do.</h1>
        <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55 }}>
          You don’t need a title to help {org} decide this. What will you do with your Resolution?
        </p>
      </div>
      <div role="group" aria-label="What I’ll do" className="mv-stack" style={{ borderTop: "1px solid var(--mv-rule)" }}>
        {RESOLVE_ACTS.map((a, i) => (
          <Check
            key={a}
            variant="act"
            checked={d.acts.includes(i)}
            onToggle={() => set({ acts: d.acts.includes(i) ? d.acts.filter((x) => x !== i) : [...d.acts, i] })}
          >
            {a}
          </Check>
        ))}
      </div>
      <div className="mv-field-group">
        <label htmlFor="two" className="mv-label" style={{ fontSize: 15.5 }}>
          If you had two minutes with the people who decide, what would you say?{" "}
          <span className="mv-label-note">(optional)</span>
        </label>
        <textarea
          id="two"
          rows={4}
          className="mv-field mv-rq-own"
          value={d.two}
          placeholder={suggest || "What should we decide first?"}
          onChange={(e) => set({ two: e.target.value })}
        />
        {suggest && !d.two.trim() ? (
          <button
            type="button"
            className="mv-textbtn"
            style={{ alignSelf: "flex-start", fontSize: 14, textAlign: "left" }}
            onClick={() => set({ two: suggest })}
          >
            Start from your first step: “{suggest}”
          </button>
        ) : null}
      </div>
      <div className="mv-choice-grid" style={{ gap: 14, maxWidth: "none" }}>
        <div className="mv-field-group">
          <label htmlFor="nm" className="mv-label">
            Your name <span className="mv-label-note">(optional)</span>
          </label>
          <input id="nm" type="text" className="mv-field" value={d.name} onChange={(e) => set({ name: e.target.value })} />
        </div>
        <div className="mv-field-group">
          <label htmlFor="rl" className="mv-label">
            Your role <span className="mv-label-note">(optional)</span>
          </label>
          <input
            id="rl"
            type="text"
            className="mv-field"
            value={d.role}
            placeholder={sec.rolePlaceholder}
            onChange={(e) => set({ role: e.target.value })}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <button type="button" className="mv-pill" onClick={finish}>
          See my Resolution
        </button>
        <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={() => go({ step: "review" })}>
          Back
        </button>
      </div>
    </div>
  );
}

export function FlowLoading() {
  return (
    <div className="mv-rz mv-rz--text" role="status" aria-label="Loading your Resolution" style={{ gap: 12 }}>
      <span className="mv-shimmer" style={{ height: 30, width: "55%" }} />
      <span className="mv-shimmer" style={{ height: 14, width: "90%" }} />
      <span className="mv-shimmer" style={{ height: 14, width: "70%" }} />
    </div>
  );
}

