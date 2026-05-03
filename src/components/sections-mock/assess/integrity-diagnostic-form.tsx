"use client";

import {
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  DIMENSIONS,
  QUESTIONS,
  QUESTIONS_BY_DIMENSION,
  TOTAL_QUESTIONS,
  type DimensionId,
} from "@/lib/integrity-diagnostic/questions";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

interface IdentityFields {
  name: string;
  email: string;
  organizationName: string;
  role: string;
}

const TOTAL_SECTIONS = DIMENSIONS.length + 1; // +1 for identity step

export function IntegrityDiagnosticForm() {
  const formId = useId();
  const [step, setStep] = useState(0); // 0 = identity, 1..6 = dimension sections
  const [identity, setIdentity] = useState<IdentityFields>({
    name: "",
    email: "",
    organizationName: "",
    role: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [followUps, setFollowUps] = useState<Partial<Record<DimensionId, string>>>({});
  const [closingNote, setClosingNote] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === TOTAL_QUESTIONS;
  const identityValid =
    identity.name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(identity.email.trim());

  const currentDimension =
    step >= 1 && step <= DIMENSIONS.length ? DIMENSIONS[step - 1] : null;

  const dimensionsWithMissing = useMemo(() => {
    return DIMENSIONS.filter((d) =>
      QUESTIONS_BY_DIMENSION[d.id].some((q) => answers[q.id] === undefined),
    );
  }, [answers]);

  function handleIdentityChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.currentTarget;
    setIdentity((prev) => ({ ...prev, [name]: value }));
  }

  function handleAnswer(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, TOTAL_SECTIONS));
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        const el = document.getElementById("begin");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        const el = document.getElementById("begin");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function jumpToDimension(dimId: DimensionId) {
    const idx = DIMENSIONS.findIndex((d) => d.id === dimId);
    if (idx >= 0) setStep(idx + 1);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;
    if (!identityValid) {
      setStatus({ kind: "error", message: "Please add your name and a valid email." });
      setStep(0);
      return;
    }
    if (!allAnswered) {
      setStatus({
        kind: "error",
        message: "Please answer every question before submitting.",
      });
      const firstMissing = dimensionsWithMissing[0];
      if (firstMissing) jumpToDimension(firstMissing.id);
      return;
    }

    setStatus({ kind: "submitting" });

    const orderedAnswers = QUESTIONS.map((q) => answers[q.id] ?? -1);

    const payload = {
      name: identity.name.trim(),
      email: identity.email.trim(),
      organizationName: identity.organizationName.trim() || undefined,
      role: identity.role.trim() || undefined,
      answers: orderedAnswers,
      followUps: Object.fromEntries(
        Object.entries(followUps)
          .map(([k, v]) => [k, (v ?? "").trim()] as const)
          .filter(([, v]) => v.length > 0),
      ),
      closingNote: closingNote.trim() || undefined,
    };

    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const detail =
          data?.error?.message ??
          (res.status === 429
            ? "Too many submissions. Please try again later."
            : "Something went wrong. Please try again.");
        setStatus({ kind: "error", message: detail });
        return;
      }
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        className="diag-preview"
        id="begin"
        role="status"
        aria-live="polite"
      >
        <p
          className="diag-preview__q"
          style={{ fontSize: "1.4rem" }}
        >
          Thank you. Your diagnostic is in.
        </p>
        <p className="form-help" style={{ fontSize: "1.05rem", marginTop: "0.75rem" }}>
          Within five business days, one of the Movemental founders will read
          your responses, write a six-page narrative read-back, and send you a
          calendar invite for a thirty-minute call to walk it together.
        </p>
        <p className="form-help" style={{ marginTop: "0.5rem" }}>
          A confirmation has been sent to{" "}
          <strong>{identity.email.trim()}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      className="diag-preview"
      id="begin"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${formId}-step-heading`}
    >
      <div className="diag-preview__progress">
        <span>
          {currentDimension
            ? `Section ${step} of ${DIMENSIONS.length} · ${currentDimension.title}`
            : step === 0
              ? "Before you begin"
              : "Final review"}
        </span>
        <span>
          {answeredCount} of {TOTAL_QUESTIONS} answered
        </span>
      </div>
      <div
        className="diag-preview__progress-bar"
        aria-hidden="true"
        style={{
          ["--diag-progress" as never]: `${Math.round((answeredCount / TOTAL_QUESTIONS) * 100)}%`,
        }}
      />

      {step === 0 ? (
        <IdentityStep
          headingId={`${formId}-step-heading`}
          values={identity}
          onChange={handleIdentityChange}
        />
      ) : null}

      {currentDimension ? (
        <DimensionStep
          headingId={`${formId}-step-heading`}
          dimension={currentDimension}
          answers={answers}
          onAnswer={handleAnswer}
          followUp={followUps[currentDimension.id] ?? ""}
          onFollowUpChange={(value) =>
            setFollowUps((prev) => ({ ...prev, [currentDimension.id]: value }))
          }
        />
      ) : null}

      {step === TOTAL_SECTIONS ? (
        <ReviewStep
          headingId={`${formId}-step-heading`}
          identity={identity}
          answers={answers}
          missingDimensions={dimensionsWithMissing}
          closingNote={closingNote}
          onClosingNoteChange={(value) => setClosingNote(value)}
          onJump={(dimId) => jumpToDimension(dimId)}
        />
      ) : null}

      {status.kind === "error" ? (
        <p
          role="alert"
          className="form-help"
          style={{ color: "var(--destructive)", marginTop: "1rem" }}
        >
          {status.message}
        </p>
      ) : null}

      <div
        className="form-actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            className="btn-pill btn-pill--ghost"
            onClick={goBack}
            disabled={step === 0}
          >
            Back
          </button>
          {step < TOTAL_SECTIONS ? (
            <button
              type="button"
              className="btn-pill btn-pill--primary"
              onClick={goNext}
              disabled={step === 0 && !identityValid}
            >
              {step === 0 ? "Begin section 1" : "Continue"}
            </button>
          ) : (
            <button
              type="submit"
              className="btn-pill btn-pill--primary"
              disabled={
                status.kind === "submitting" || !identityValid || !allAnswered
              }
            >
              {status.kind === "submitting" ? "Sending…" : "Send the diagnostic"}
            </button>
          )}
        </div>
        <p className="form-fineprint" style={{ margin: 0 }}>
          Your responses are held confidentially by the Movemental founders. No
          score, no benchmark, no public leaderboard.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Identity step                                                             */
/* -------------------------------------------------------------------------- */

function IdentityStep({
  headingId,
  values,
  onChange,
}: {
  headingId: string;
  values: IdentityFields;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <>
      <h3 className="diag-preview__q" id={headingId}>
        Before you begin.
      </h3>
      <p className="form-help" style={{ marginTop: "0.5rem" }}>
        We use this to send your read-back. Nothing else.
      </p>
      <div className="form-row" style={{ marginTop: "1rem" }}>
        <div className="form-field">
          <label htmlFor="diag-name" className="form-label">
            Your name
          </label>
          <input
            id="diag-name"
            name="name"
            type="text"
            className="form-input"
            autoComplete="name"
            required
            value={values.name}
            onChange={onChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="diag-email" className="form-label">
            Email
          </label>
          <input
            id="diag-email"
            name="email"
            type="email"
            className="form-input"
            autoComplete="email"
            required
            value={values.email}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="diag-org" className="form-label">
            Organization (optional)
          </label>
          <input
            id="diag-org"
            name="organizationName"
            type="text"
            className="form-input"
            autoComplete="organization"
            value={values.organizationName}
            onChange={onChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="diag-role" className="form-label">
            Your role (optional)
          </label>
          <input
            id="diag-role"
            name="role"
            type="text"
            className="form-input"
            autoComplete="organization-title"
            placeholder="Senior pastor, executive director, provost…"
            value={values.role}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dimension step                                                            */
/* -------------------------------------------------------------------------- */

function DimensionStep({
  headingId,
  dimension,
  answers,
  onAnswer,
  followUp,
  onFollowUpChange,
}: {
  headingId: string;
  dimension: { id: DimensionId; num: string; title: string; description: string };
  answers: Record<string, number>;
  onAnswer: (questionId: string, optionIndex: number) => void;
  followUp: string;
  onFollowUpChange: (value: string) => void;
}) {
  const questions = QUESTIONS_BY_DIMENSION[dimension.id];
  return (
    <>
      <p className="eyebrow" style={{ marginTop: 0 }}>
        Section {dimension.num}
      </p>
      <h3 className="diag-preview__q" id={headingId}>
        {dimension.title}.
      </h3>
      <p className="form-help" style={{ marginTop: "0.5rem", maxWidth: "60ch" }}>
        {dimension.description}
      </p>

      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {questions.map((q, qIdx) => {
          const groupName = `q-${q.id}`;
          const selected = answers[q.id];
          return (
            <fieldset key={q.id} style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="diag-preview__q" style={{ fontSize: "1.05rem" }}>
                <span style={{ color: "var(--muted-foreground)", fontWeight: 500 }}>
                  Q{qIdx + 1}.
                </span>{" "}
                {q.prompt}
              </legend>
              <ul
                className="diag-preview__options"
                role="radiogroup"
                aria-label={q.prompt}
                style={{ marginTop: "0.75rem" }}
              >
                {q.options.map((opt, optIdx) => {
                  const isSelected = selected === optIdx;
                  const optionId = `${groupName}-${optIdx}`;
                  return (
                    <li
                      key={optionId}
                      className={isSelected ? "is-selected" : undefined}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => onAnswer(q.id, optIdx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onAnswer(q.id, optIdx);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        type="radio"
                        id={optionId}
                        name={groupName}
                        value={optIdx}
                        checked={isSelected}
                        onChange={() => onAnswer(q.id, optIdx)}
                        style={{
                          position: "absolute",
                          width: 1,
                          height: 1,
                          padding: 0,
                          margin: -1,
                          overflow: "hidden",
                          clip: "rect(0,0,0,0)",
                          border: 0,
                        }}
                      />
                      <span className="diag-preview__radio" aria-hidden="true" />
                      <label htmlFor={optionId} style={{ cursor: "pointer" }}>
                        {opt}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          );
        })}
      </div>

      <div className="form-field" style={{ marginTop: "2rem" }}>
        <label htmlFor={`followup-${dimension.id}`} className="form-label">
          Show your work (optional)
        </label>
        <textarea
          id={`followup-${dimension.id}`}
          className="form-textarea"
          rows={4}
          placeholder="One or two sentences. What is true on the ground that the multiple choice didn't quite capture?"
          value={followUp}
          maxLength={2000}
          onChange={(e) => onFollowUpChange(e.currentTarget.value)}
        />
        <p className="form-help">
          The read-back is built from these notes. Plain language helps more than
          the right word.
        </p>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Review step                                                               */
/* -------------------------------------------------------------------------- */

function ReviewStep({
  headingId,
  identity,
  answers,
  missingDimensions,
  closingNote,
  onClosingNoteChange,
  onJump,
}: {
  headingId: string;
  identity: IdentityFields;
  answers: Record<string, number>;
  missingDimensions: ReadonlyArray<{ id: DimensionId; title: string }>;
  closingNote: string;
  onClosingNoteChange: (value: string) => void;
  onJump: (dimId: DimensionId) => void;
}) {
  return (
    <>
      <h3 className="diag-preview__q" id={headingId}>
        Last look.
      </h3>
      <p className="form-help" style={{ marginTop: "0.5rem" }}>
        We will read your diagnostic against the version dated today. You can
        still go back and change any answer.
      </p>

      <ul
        className="path-step__list"
        style={{ marginTop: "1.25rem", paddingLeft: 0 }}
        aria-label="Submitter summary"
      >
        <li>
          <strong>Submitter:</strong> {identity.name.trim()} &lt;
          {identity.email.trim()}&gt;
        </li>
        {identity.organizationName.trim().length > 0 ? (
          <li>
            <strong>Organization:</strong> {identity.organizationName.trim()}
          </li>
        ) : null}
        {identity.role.trim().length > 0 ? (
          <li>
            <strong>Role:</strong> {identity.role.trim()}
          </li>
        ) : null}
        <li>
          <strong>Answers complete:</strong>{" "}
          {Object.keys(answers).length} of {TOTAL_QUESTIONS}
        </li>
      </ul>

      {missingDimensions.length > 0 ? (
        <aside
          className="evidence-note"
          style={{ marginTop: "1.5rem" }}
          aria-live="polite"
        >
          <p className="evidence-note__label">Still to do</p>
          <p className="evidence-note__body">
            Some sections still have unanswered questions:
          </p>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
            {missingDimensions.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => onJump(d.id)}
                  className="link"
                  style={{
                    background: "none",
                    border: 0,
                    padding: 0,
                    color: "var(--primary)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {d.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <div className="form-field" style={{ marginTop: "2rem" }}>
        <label htmlFor="closing-note" className="form-label">
          Anything else we should know? (optional)
        </label>
        <textarea
          id="closing-note"
          className="form-textarea"
          rows={4}
          placeholder="Context, constraints, what would make the read-back useful — or what we should not write back about. Plain language is fine."
          value={closingNote}
          maxLength={5000}
          onChange={(e) => onClosingNoteChange(e.currentTarget.value)}
        />
      </div>
    </>
  );
}
