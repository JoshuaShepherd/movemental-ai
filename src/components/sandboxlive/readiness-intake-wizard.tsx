"use client";

import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";

import { submitReadinessIntakeAction } from "@/app/(dashboard)/sandboxlive/readiness/actions";
import { submitReadinessInviteIntakeAction } from "@/app/readiness-invite/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  READINESS_INTAKE_VERSION,
  READINESS_SECTIONS,
  defaultSliderValue,
  isAnswered,
  type LikertQuestion,
  type MultiQuestion,
  type ReadinessQuestion,
  type SingleQuestion,
  type SliderQuestion,
  type TextAreaQuestion,
  type TextQuestion,
} from "@/lib/sandboxlive/readiness-intake-sections";
import { cn } from "@/lib/utils";

type WizardPhase = "welcome" | "section" | "submitting" | "done";

export interface ReadinessIntakeWizardProps {
  orgSlug: string;
  orgQuery: string;
  organizationName: string;
  existingSubmission: {
    answers: Record<string, unknown>;
    submittedAt: string;
    updatedAt: string;
  } | null;
  /** Anonymous token-gated intake — no dashboard session. */
  inviteMode?: {
    token: string;
    /** Stable key for local draft storage (never the raw token). */
    draftKey: string;
  };
}

type AnswersBag = Record<string, unknown>;

function draftStorageKey(orgSlug: string, inviteDraftKey?: string): string {
  if (inviteDraftKey) {
    return `sandboxlive.readiness.invite.draft.v${READINESS_INTAKE_VERSION}.${inviteDraftKey}`;
  }
  return `sandboxlive.readiness.draft.v${READINESS_INTAKE_VERSION}.${orgSlug}`;
}

export function ReadinessIntakeWizard({
  orgSlug,
  orgQuery,
  organizationName,
  existingSubmission,
  inviteMode,
}: ReadinessIntakeWizardProps) {
  const totalSteps = READINESS_SECTIONS.length;

  // If the user already submitted, start in "done" (they can choose to update).
  const [phase, setPhase] = useState<WizardPhase>(
    existingSubmission ? "done" : "welcome",
  );
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswersBag>(
    existingSubmission?.answers ?? {},
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [missingIds, setMissingIds] = useState<Set<string>>(new Set());
  const [displayName, setDisplayName] = useState("");
  const [emailOpt, setEmailOpt] = useState("");
  const [roleOrTeam, setRoleOrTeam] = useState("");
  const [identityError, setIdentityError] = useState<string | null>(null);
  // Once the server already has a submission, no draft load is needed — start
  // loaded. Otherwise the effect below flips this true after reading localStorage.
  const [draftLoaded, setDraftLoaded] = useState<boolean>(existingSubmission != null);

  // Load saved draft (only if no server submission to anchor against). The
  // props are stable for the component's lifetime (the wizard is fully
  // remounted on org / submission changes via the parent page) so a one-shot
  // mount-time read with empty deps is safe.
  useEffect(() => {
    if (existingSubmission) return;
    try {
      const raw = window.localStorage.getItem(
        draftStorageKey(orgSlug, inviteMode?.draftKey),
      );
      if (raw) {
        const parsed = JSON.parse(raw) as {
          answers?: AnswersBag;
          displayName?: string;
          emailOpt?: string;
          roleOrTeam?: string;
        };
        if (parsed?.answers && typeof parsed.answers === "object") {
          setAnswers(parsed.answers);
        }
        if (inviteMode) {
          if (typeof parsed.displayName === "string") setDisplayName(parsed.displayName);
          if (typeof parsed.emailOpt === "string") setEmailOpt(parsed.emailOpt);
          if (typeof parsed.roleOrTeam === "string") setRoleOrTeam(parsed.roleOrTeam);
        }
      }
    } catch {
      // ignore malformed draft
    }
    setDraftLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional one-shot; parent remounts on org / invite change
  }, []);

  // Persist draft locally on every change once initial load is complete.
  useEffect(() => {
    if (!draftLoaded) return;
    if (existingSubmission) return; // draft only matters pre-submission
    const handle = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          draftStorageKey(orgSlug, inviteMode?.draftKey),
          JSON.stringify({
            answers,
            displayName: inviteMode ? displayName : undefined,
            emailOpt: inviteMode ? emailOpt : undefined,
            roleOrTeam: inviteMode ? roleOrTeam : undefined,
            savedAt: new Date().toISOString(),
          }),
        );
      } catch {
        // storage quota / private mode — ignore
      }
    }, 400);
    return () => window.clearTimeout(handle);
  }, [answers, displayName, draftLoaded, emailOpt, existingSubmission, inviteMode, orgSlug, roleOrTeam]);

  const currentSection = READINESS_SECTIONS[sectionIdx];
  const progressPct =
    phase === "section"
      ? (sectionIdx / totalSteps) * 100
      : phase === "done"
        ? 100
        : 0;

  function setAnswer(qid: string, val: unknown) {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
    setMissingIds((prev) => {
      if (!prev.has(qid)) return prev;
      const next = new Set(prev);
      next.delete(qid);
      return next;
    });
  }

  function validateCurrentSection(): { ok: true } | { ok: false; missing: string[] } {
    const missing: string[] = [];
    for (const q of currentSection.questions) {
      if (q.required && !isAnswered(q, answers[q.id])) {
        missing.push(q.id);
      }
    }
    return missing.length === 0 ? { ok: true } : { ok: false, missing };
  }

  function handleNext() {
    const result = validateCurrentSection();
    if (!result.ok) {
      setMissingIds(new Set(result.missing));
      setSubmitError("A few required fields still need an answer.");
      const firstMissing = result.missing[0];
      if (firstMissing) {
        const el = document.getElementById(`q-${firstMissing}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setSubmitError(null);
    setMissingIds(new Set());
    if (sectionIdx < totalSteps - 1) {
      setSectionIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      void handleSubmit();
    }
  }

  function handleBack() {
    setSubmitError(null);
    setMissingIds(new Set());
    if (sectionIdx === 0) {
      setPhase("welcome");
      return;
    }
    setSectionIdx((i) => i - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setPhase("submitting");
    setSubmitError(null);
    if (inviteMode) {
      const result = await submitReadinessInviteIntakeAction({
        rawToken: inviteMode.token,
        payload: {
          displayName: displayName.trim(),
          email: emailOpt.trim() || undefined,
          roleOrTeam: roleOrTeam.trim() || undefined,
          answers,
          intakeVersion: READINESS_INTAKE_VERSION,
        },
      });
      if (!result.ok) {
        setSubmitError(result.reason);
        setPhase("section");
        return;
      }
      try {
        window.localStorage.removeItem(draftStorageKey(orgSlug, inviteMode.draftKey));
      } catch {
        // ignore
      }
    } else {
      const result = await submitReadinessIntakeAction({
        orgSlug,
        payload: { answers, intakeVersion: READINESS_INTAKE_VERSION },
      });
      if (!result.ok) {
        setSubmitError(result.reason);
        setPhase("section");
        return;
      }
      try {
        window.localStorage.removeItem(draftStorageKey(orgSlug));
      } catch {
        // ignore
      }
    }
    setPhase("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleStart() {
    if (inviteMode) {
      setIdentityError(null);
      const n = displayName.trim();
      if (n.length < 2) {
        setIdentityError("Please add your name so the training team knows who this is from.");
        return;
      }
    }
    setPhase("section");
    setSectionIdx(0);
    setSubmitError(null);
    setMissingIds(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleEditExisting() {
    setPhase("section");
    setSectionIdx(0);
    setSubmitError(null);
    setMissingIds(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasDraft = !existingSubmission && Object.keys(answers).length > 0;

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-safestart-bg text-safestart-ink">
      <header className="sticky top-0 z-10 border-b border-safestart-hairline bg-safestart-bg/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 md:px-12">
          {inviteMode ? (
            <div className="flex items-center gap-3 text-safestart-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
                <Sparkles size={14} strokeWidth={2} />
              </span>
              <span>
                <span className="block text-sm font-medium tracking-tight">
                  {organizationName}
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-safestart-muted">
                  AI Readiness Check-In
                </span>
              </span>
            </div>
          ) : (
            <Link
              href={`/sandboxlive${orgQuery}`}
              className="flex items-center gap-3 text-safestart-ink"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
                <Sparkles size={14} strokeWidth={2} />
              </span>
              <span>
                <span className="block text-sm font-medium tracking-tight">
                  {organizationName}
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-safestart-muted">
                  AI Readiness Check-In
                </span>
              </span>
            </Link>
          )}
          {phase === "section" ? (
            <span className="text-xs tabular-nums text-safestart-muted">
              {sectionIdx + 1}{" "}
              <span className="text-safestart-muted/60">of</span> {totalSteps}
            </span>
          ) : null}
        </div>
        {phase === "section" || phase === "submitting" ? (
          <div
            className="h-px w-full bg-safestart-hairline"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPct)}
          >
            <div
              className="h-full bg-pathway-accent transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-12 lg:px-12 lg:py-20">
        {phase === "welcome" ? (
          <WelcomeView
            hasDraft={hasDraft}
            onStart={handleStart}
            orgQuery={orgQuery}
            inviteMode={inviteMode != null}
            displayName={displayName}
            emailOpt={emailOpt}
            roleOrTeam={roleOrTeam}
            identityError={identityError}
            onDisplayNameChange={setDisplayName}
            onEmailChange={setEmailOpt}
            onRoleChange={setRoleOrTeam}
          />
        ) : null}

        {phase === "section" && currentSection ? (
          <SectionView
            stepNumber={sectionIdx + 1}
            section={currentSection}
            answers={answers}
            missingIds={missingIds}
            submitError={submitError}
            isFinalStep={sectionIdx === totalSteps - 1}
            onAnswer={setAnswer}
            onBack={handleBack}
            onNext={handleNext}
          />
        ) : null}

        {phase === "submitting" ? <SubmittingView /> : null}

        {phase === "done" ? (
          <DoneView
            organizationName={organizationName}
            existingSubmission={existingSubmission}
            onEdit={handleEditExisting}
            orgQuery={orgQuery}
            inviteMode={inviteMode != null}
          />
        ) : null}
      </main>

      <footer className="mt-auto border-t border-safestart-hairline px-6 py-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between text-xs text-safestart-muted">
          <span>SandboxLive · staff readiness check-in</span>
          <span>v{READINESS_INTAKE_VERSION}</span>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-views
// ---------------------------------------------------------------------------

function HairlineDivider() {
  return <div aria-hidden className="h-px w-full bg-safestart-hairline" />;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-pathway-accent">
      {children}
    </p>
  );
}

function DisplayHeading({
  children,
  size = "xl",
}: {
  children: React.ReactNode;
  size?: "xl" | "lg" | "md";
}) {
  const cls =
    size === "xl"
      ? "text-[clamp(2.5rem,5.5vw,4rem)]"
      : size === "lg"
        ? "text-[clamp(2rem,4vw,2.75rem)]"
        : "text-[clamp(1.5rem,3vw,2rem)]";
  return (
    <h1
      className={cn(
        "font-serif italic leading-[1.05] tracking-tight text-safestart-ink",
        cls,
      )}
    >
      {children}
    </h1>
  );
}

function WelcomeView({
  hasDraft,
  onStart,
  orgQuery,
  inviteMode,
  displayName,
  emailOpt,
  roleOrTeam,
  identityError,
  onDisplayNameChange,
  onEmailChange,
  onRoleChange,
}: {
  hasDraft: boolean;
  onStart: () => void;
  orgQuery: string;
  inviteMode: boolean;
  displayName: string;
  emailOpt: string;
  roleOrTeam: string;
  identityError: string | null;
  onDisplayNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onRoleChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <Eyebrow>A 10-minute check-in · Pre-training</Eyebrow>
        <DisplayHeading size="xl">Before we begin, where are you at?</DisplayHeading>
        <p className="max-w-xl text-lg leading-relaxed text-safestart-muted">
          We&apos;re shaping AI training for your team. Before we design what
          that looks like, we want to understand where you actually are — what
          you do, what you use, and how you feel about all this.
        </p>
      </div>

      {inviteMode ? (
        <>
          <HairlineDivider />
          <div className="flex max-w-xl flex-col gap-4">
            <Eyebrow>Your details</Eyebrow>
            <p className="text-sm leading-relaxed text-safestart-muted">
              No account needed. Your facilitator shared this link only with your team.
            </p>
            <div className="flex flex-col gap-2">
              <Label htmlFor="readiness-invite-name" className="text-safestart-ink">
                Name <span className="text-pathway-accent">*</span>
              </Label>
              <Input
                id="readiness-invite-name"
                autoComplete="name"
                value={displayName}
                onChange={(e) => onDisplayNameChange(e.target.value)}
                placeholder="First and last"
                className="border-border bg-background text-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="readiness-invite-email" className="text-safestart-ink">
                Work email <span className="text-safestart-muted">(optional)</span>
              </Label>
              <Input
                id="readiness-invite-email"
                type="email"
                autoComplete="email"
                value={emailOpt}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="you@organization.org"
                className="border-border bg-background text-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="readiness-invite-role" className="text-safestart-ink">
                Role or team <span className="text-safestart-muted">(optional)</span>
              </Label>
              <Input
                id="readiness-invite-role"
                value={roleOrTeam}
                onChange={(e) => onRoleChange(e.target.value)}
                placeholder="e.g. Communications, Lead pastor"
                className="border-border bg-background text-foreground"
              />
            </div>
            {identityError ? (
              <p className="text-sm text-destructive" role="alert">
                {identityError}
              </p>
            ) : null}
          </div>
        </>
      ) : null}

      <HairlineDivider />

      <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
        <div>
          <Eyebrow>Time</Eyebrow>
          <p className="mt-2 text-base">About 10–12 minutes. Your answers save as you go.</p>
        </div>
        <div>
          <Eyebrow>Honesty</Eyebrow>
          <p className="mt-2 text-base">
            No wrong answers. Skepticism is as welcome as excitement.
          </p>
        </div>
        <div>
          <Eyebrow>Use</Eyebrow>
          <p className="mt-2 text-base">
            Your answers shape your training. We meet you where you are.
          </p>
        </div>
        <div>
          <Eyebrow>Privacy</Eyebrow>
          <p className="mt-2 text-base">
            Responses go to the training team only. Skip questions that don&apos;t apply.
          </p>
        </div>
      </div>

      <HairlineDivider />

      <div className="flex flex-wrap items-center gap-4">
        <Button size="lg" onClick={onStart}>
          Begin <ArrowRight size={16} className="ml-1.5" />
        </Button>
        {hasDraft ? (
          <span className="text-sm text-safestart-muted">
            We saved your draft — you can pick up where you left off.
          </span>
        ) : inviteMode ? null : (
          <Link
            href={`/sandboxlive${orgQuery}`}
            className="text-sm text-safestart-muted underline decoration-safestart-hairline underline-offset-[0.22em] hover:text-pathway-accent"
          >
            Back to SandboxLive
          </Link>
        )}
      </div>
    </div>
  );
}

function SectionView({
  stepNumber,
  section,
  answers,
  missingIds,
  submitError,
  isFinalStep,
  onAnswer,
  onBack,
  onNext,
}: {
  stepNumber: number;
  section: (typeof READINESS_SECTIONS)[number];
  answers: AnswersBag;
  missingIds: Set<string>;
  submitError: string | null;
  isFinalStep: boolean;
  onAnswer: (qid: string, val: unknown) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <Eyebrow>
          Section {stepNumber} · {section.title}
        </Eyebrow>
        <DisplayHeading size="lg">{section.title}</DisplayHeading>
        <p className="max-w-xl text-lg leading-relaxed text-safestart-muted">
          {section.lede}
        </p>
      </div>

      <HairlineDivider />

      <div className="flex flex-col gap-10">
        {section.questions.map((q) => (
          <QuestionField
            key={q.id}
            question={q}
            value={answers[q.id]}
            missing={missingIds.has(q.id)}
            onChange={(v) => onAnswer(q.id, v)}
          />
        ))}
      </div>

      {submitError ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {submitError}
        </div>
      ) : null}

      <HairlineDivider />

      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={16} className="mr-1.5" /> Back
        </Button>
        <Button size="lg" onClick={onNext}>
          {isFinalStep ? "Submit" : "Continue"}
          <ArrowRight size={16} className="ml-1.5" />
        </Button>
      </div>
    </div>
  );
}

function SubmittingView() {
  return (
    <div className="py-20 text-center">
      <div
        aria-label="Saving"
        className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-pathway-accent border-t-transparent"
      />
      <p className="mt-4 text-sm text-safestart-muted">Saving your response…</p>
    </div>
  );
}

function DoneView({
  organizationName,
  existingSubmission,
  onEdit,
  orgQuery,
  inviteMode,
}: {
  organizationName: string;
  existingSubmission: ReadinessIntakeWizardProps["existingSubmission"];
  onEdit: () => void;
  orgQuery: string;
  inviteMode: boolean;
}) {
  const submittedAt = existingSubmission?.submittedAt
    ? new Date(existingSubmission.submittedAt)
    : null;
  return (
    <div className="flex flex-col gap-10 py-12">
      <Eyebrow>Submitted · Thank you</Eyebrow>
      <DisplayHeading size="xl">
        That&apos;s it. <em>Thank you</em> for the honest read.
      </DisplayHeading>
      <p className="max-w-xl text-lg leading-relaxed text-safestart-muted">
        Your answers go straight to the team designing the AI training. We&apos;ll
        use them to shape sessions that meet the {organizationName} staff where
        you actually are — not at some imaginary baseline.
      </p>
      {submittedAt && !inviteMode ? (
        <p className="text-sm text-safestart-muted">
          Last submitted {submittedAt.toLocaleString()}.
        </p>
      ) : null}
      <HairlineDivider />
      <div className="flex flex-wrap items-center gap-4">
        {inviteMode ? (
          <p className="max-w-xl text-sm text-safestart-muted">
            You can close this page. If you need to submit again, ask your facilitator for a
            fresh link.
          </p>
        ) : (
          <>
            <Button variant="ghost" onClick={onEdit}>
              Review or update my answers <ArrowRight size={16} className="ml-1.5" />
            </Button>
            <Link
              href={`/sandboxlive${orgQuery}`}
              className="text-sm text-safestart-muted underline decoration-safestart-hairline underline-offset-[0.22em] hover:text-pathway-accent"
            >
              Back to SandboxLive
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Question renderers
// ---------------------------------------------------------------------------

function QuestionField({
  question,
  value,
  missing,
  onChange,
}: {
  question: ReadinessQuestion;
  value: unknown;
  missing: boolean;
  onChange: (val: unknown) => void;
}) {
  switch (question.type) {
    case "text":
      return <TextField question={question} value={value} missing={missing} onChange={onChange} />;
    case "textarea":
      return (
        <TextAreaField question={question} value={value} missing={missing} onChange={onChange} />
      );
    case "single":
      return (
        <SingleSelectField question={question} value={value} missing={missing} onChange={onChange} />
      );
    case "multi":
      return (
        <MultiSelectField question={question} value={value} missing={missing} onChange={onChange} />
      );
    case "likert":
      return <LikertField question={question} value={value} missing={missing} onChange={onChange} />;
    case "slider":
      return <SliderField question={question} value={value} missing={missing} onChange={onChange} />;
  }
}

function QuestionLabel({
  htmlFor,
  required,
  children,
  errorId,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  errorId?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block text-base font-medium text-safestart-ink"
      aria-describedby={errorId}
    >
      {children}
      {required ? <span className="text-safestart-muted"> *</span> : null}
    </label>
  );
}

function MissingErrorText({ id }: { id: string }) {
  return (
    <p id={id} className="mt-2 text-xs text-destructive" role="alert">
      This question needs an answer.
    </p>
  );
}

function inputBaseClasses() {
  return cn(
    "w-full rounded-lg bg-card px-4 py-3 text-base text-safestart-ink outline-none",
    "border border-border transition-colors",
    "focus-visible:border-pathway-accent focus-visible:ring-2 focus-visible:ring-pathway-accent/30",
    "placeholder:text-safestart-muted/70",
  );
}

function TextField({
  question,
  value,
  missing,
  onChange,
}: {
  question: TextQuestion;
  value: unknown;
  missing: boolean;
  onChange: (v: string) => void;
}) {
  const inputId = `q-${question.id}`;
  const errId = `err-${question.id}`;
  const v = typeof value === "string" ? value : "";
  return (
    <div>
      <QuestionLabel htmlFor={inputId} required={question.required} errorId={missing ? errId : undefined}>
        {question.label}
      </QuestionLabel>
      <input
        id={inputId}
        type="text"
        value={v}
        placeholder={question.placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={missing}
        aria-required={question.required}
        className={cn(inputBaseClasses(), missing ? "border-destructive/60" : null)}
      />
      {missing ? <MissingErrorText id={errId} /> : null}
    </div>
  );
}

function TextAreaField({
  question,
  value,
  missing,
  onChange,
}: {
  question: TextAreaQuestion;
  value: unknown;
  missing: boolean;
  onChange: (v: string) => void;
}) {
  const inputId = `q-${question.id}`;
  const errId = `err-${question.id}`;
  const v = typeof value === "string" ? value : "";
  return (
    <div>
      <QuestionLabel htmlFor={inputId} required={question.required} errorId={missing ? errId : undefined}>
        {question.label}
      </QuestionLabel>
      <textarea
        id={inputId}
        value={v}
        rows={3}
        placeholder={question.placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={missing}
        aria-required={question.required}
        className={cn(
          inputBaseClasses(),
          "resize-y leading-relaxed",
          missing ? "border-destructive/60" : null,
        )}
      />
      {missing ? <MissingErrorText id={errId} /> : null}
    </div>
  );
}

function pillClasses(active: boolean) {
  return cn(
    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pathway-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-safestart-bg",
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-card text-safestart-ink hover:border-pathway-accent/40",
  );
}

function SingleSelectField({
  question,
  value,
  missing,
  onChange,
}: {
  question: SingleQuestion;
  value: unknown;
  missing: boolean;
  onChange: (v: string) => void;
}) {
  const groupId = useId();
  const inputId = `q-${question.id}`;
  const errId = `err-${question.id}`;
  return (
    <div
      role="radiogroup"
      aria-labelledby={`${groupId}-label`}
      aria-required={question.required}
      aria-invalid={missing || undefined}
      aria-describedby={missing ? errId : undefined}
      id={inputId}
    >
      <p id={`${groupId}-label`} className="mb-3 block text-base font-medium text-safestart-ink">
        {question.label}
        {question.required ? <span className="text-safestart-muted"> *</span> : null}
      </p>
      <div className="flex flex-wrap gap-2">
        {question.options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={pillClasses(active)}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {missing ? <MissingErrorText id={errId} /> : null}
    </div>
  );
}

function MultiSelectField({
  question,
  value,
  missing,
  onChange,
}: {
  question: MultiQuestion;
  value: unknown;
  missing: boolean;
  onChange: (v: string[]) => void;
}) {
  const inputId = `q-${question.id}`;
  const errId = `err-${question.id}`;
  const arr = Array.isArray(value) ? (value as string[]) : [];

  function toggle(opt: string) {
    if (arr.includes(opt)) {
      onChange(arr.filter((v) => v !== opt));
    } else {
      onChange([...arr, opt]);
    }
  }

  return (
    <fieldset id={inputId} aria-describedby={missing ? errId : undefined}>
      <legend className="mb-3 block text-base font-medium text-safestart-ink">
        {question.label}
        {question.required ? <span className="text-safestart-muted"> *</span> : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {question.options.map((opt) => {
          const active = arr.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              role="checkbox"
              aria-checked={active}
              onClick={() => toggle(opt)}
              className={pillClasses(active)}
            >
              {active ? <Check size={14} strokeWidth={2.5} /> : null}
              {opt}
            </button>
          );
        })}
      </div>
      {missing ? <MissingErrorText id={errId} /> : null}
    </fieldset>
  );
}

function LikertField({
  question,
  value,
  missing,
  onChange,
}: {
  question: LikertQuestion;
  value: unknown;
  missing: boolean;
  onChange: (v: number) => void;
}) {
  const groupId = useId();
  const inputId = `q-${question.id}`;
  const errId = `err-${question.id}`;
  const labels = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
  const current = typeof value === "number" ? value : null;
  return (
    <div
      id={inputId}
      role="radiogroup"
      aria-labelledby={`${groupId}-label`}
      aria-required={question.required}
      aria-describedby={missing ? errId : undefined}
    >
      <p id={`${groupId}-label`} className="mb-3 block text-base font-medium text-safestart-ink">
        {question.label}
        {question.required ? <span className="text-safestart-muted"> *</span> : null}
      </p>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n, i) => {
          const active = current === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(n)}
              className={cn(
                "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2.5 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pathway-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-safestart-bg",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-safestart-ink hover:border-pathway-accent/40",
              )}
            >
              <span className="text-base font-semibold">{n}</span>
              <span
                className={cn(
                  "text-center text-[10px] leading-tight",
                  active ? "text-background/85" : "text-safestart-muted",
                )}
              >
                {labels[i]}
              </span>
            </button>
          );
        })}
      </div>
      {missing ? <MissingErrorText id={errId} /> : null}
    </div>
  );
}

function SliderField({
  question,
  value,
  missing,
  onChange,
}: {
  question: SliderQuestion;
  value: unknown;
  missing: boolean;
  onChange: (v: number) => void;
}) {
  const inputId = `q-${question.id}`;
  const errId = `err-${question.id}`;
  const v = typeof value === "number" ? value : defaultSliderValue(question);
  const trackPct = useMemo(() => {
    const range = question.max - question.min;
    if (range <= 0) return 0;
    return Math.max(0, Math.min(100, ((v - question.min) / range) * 100));
  }, [v, question.max, question.min]);

  // Inline background gradient is the standard accessible way to colour the
  // filled portion of a native <input type="range"> — uses semantic tokens,
  // not hex.
  const sliderBg = `linear-gradient(to right, var(--color-pathway-accent) 0%, var(--color-pathway-accent) ${trackPct}%, var(--color-border) ${trackPct}%, var(--color-border) 100%)`;

  return (
    <div>
      <QuestionLabel htmlFor={inputId} required={question.required} errorId={missing ? errId : undefined}>
        {question.label}
      </QuestionLabel>
      <div className="px-1">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-safestart-muted">
            {question.leftLabel ?? question.min}
          </span>
          <span className="font-serif text-[28px] italic leading-none tabular-nums text-pathway-accent">
            {v}
            {question.suffix ?? ""}
          </span>
          <span className="text-xs text-safestart-muted">
            {question.rightLabel ?? question.max}
          </span>
        </div>
        <input
          id={inputId}
          type="range"
          min={question.min}
          max={question.max}
          step={question.step}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-invalid={missing}
          className="readiness-slider h-1 w-full cursor-pointer appearance-none rounded-full"
          style={{ background: sliderBg }}
        />
      </div>
      {missing ? <MissingErrorText id={errId} /> : null}
      <style jsx>{`
        .readiness-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: var(--color-pathway-accent);
          cursor: pointer;
          border: 3px solid var(--color-safestart-bg);
          box-shadow: 0 0 0 1px var(--color-pathway-accent);
        }
        .readiness-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: var(--color-pathway-accent);
          cursor: pointer;
          border: 3px solid var(--color-safestart-bg);
          box-shadow: 0 0 0 1px var(--color-pathway-accent);
        }
      `}</style>
    </div>
  );
}
