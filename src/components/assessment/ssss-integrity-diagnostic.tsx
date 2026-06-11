"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import { AssessmentProgress } from "@/components/assessment/assessment-progress";
import { LikertScale } from "@/components/assessment/likert-scale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Local surface card — the editorial primitives were archived in the agent pivot. */
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-ambient sm:p-8", className)}>
      {children}
    </div>
  );
}
import {
  AUDIENCE_CONTEXT_OPTIONS,
  computeSsssIntegrityResult,
  SSSS_INTEGRITY_ITEMS,
  type AudienceContextId,
  type SsssIllusionId,
  type SsssStageId,
} from "@/lib/ssss-integrity-assessment";

const STORAGE_KEY = "movemental:ai-reality-assessment:v2" as const;
const LEGACY_STORAGE_KEY = "movemental:ssss-integrity-diagnostic:v1" as const;

// Public instrument + output names. Internal labels match the path stages.
const INSTRUMENT_NAME = "Organizational AI Reality Assessment";

const STAGE_DESCRIPTIONS: Record<string, string> = {
  Safety:
    "Governance, conviction lines, and boundaries: what yes and no mean before pressure arrives.",
  Sandbox:
    "Evidence under Safety: a shared record of what's been tried, in compliant places, with proof.",
  Training:
    "Formation as judgment: distributed taste, correction, and verification, not button-pushing.",
  Technology:
    "Workflows with AI inside them: owners, gates, outcomes, and independence from any one tool.",
  Cross:
    "Honest location: where you actually are on the path, and how you respond when things break.",
};

const ILLUSION_COPY: Record<Exclude<SsssIllusionId, "none">, string> = {
  honesty_gap:
    "The scores look healthy, but the team can't yet say out loud where it's skipping steps.",
  inversion_profile:
    "Several signs point the same way: buying and deploying ahead of safety and skill.",
  solutions_without_evidence:
    "Tools are rolling out faster than the evidence that they work.",
  skills_theater:
    "Training has happened, but there's no shared log proving people actually got better.",
  shadow_sandbox:
    "People are experimenting, but off to the side, no shared record of what's been tried.",
  safety_paper:
    "A policy on paper that nobody trains against.",
};

function stripBold(s: string) {
  return s.replace(/\*\*/g, "");
}

const TOTAL_ITEMS = SSSS_INTEGRITY_ITEMS.length;

/** Step model:
 *   0                                      → intro screen
 *   1                                      → audience preamble
 *   2 .. 1 + TOTAL_ITEMS                   → one question per screen
 *   2 + TOTAL_ITEMS                        → results / submit
 */
const STEP_INTRO = 0;
const STEP_AUDIENCE = 1;
const FIRST_QUESTION_STEP = 2;
const LAST_QUESTION_STEP = FIRST_QUESTION_STEP + TOTAL_ITEMS - 1;
const STEP_RESULTS = LAST_QUESTION_STEP + 1;

type PersistedState = {
  v: 2;
  step: number;
  scores: (number | null)[];
  audience: AudienceContextId | null;
  email: string;
};

function emptyScores(): (number | null)[] {
  return Array.from({ length: TOTAL_ITEMS }, () => null);
}

function loadPersisted(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!legacy) return null;
      const parsed = JSON.parse(legacy) as {
        v: 1;
        step: number;
        scores: (number | null)[];
        email: string;
      };
      if (parsed.v !== 1 || !Array.isArray(parsed.scores) || parsed.scores.length !== TOTAL_ITEMS) {
        return null;
      }
      return {
        v: 2,
        step: STEP_INTRO,
        scores: parsed.scores,
        audience: null,
        email: parsed.email ?? "",
      };
    }
    const data = JSON.parse(raw) as PersistedState;
    if (data.v !== 2 || !Array.isArray(data.scores) || data.scores.length !== TOTAL_ITEMS) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function savePersisted(p: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* quota */
  }
}

export function SsssIntegrityDiagnostic() {
  const [hydrated, setHydrated] = React.useState(false);
  const [step, setStep] = React.useState<number>(STEP_INTRO);
  const [scores, setScores] = React.useState<(number | null)[]>(emptyScores);
  const [audience, setAudience] = React.useState<AudienceContextId | null>(null);
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    const p = loadPersisted();
    if (p) {
      setStep(p.step);
      setScores(p.scores);
      setAudience(p.audience);
      setEmail(p.email);
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    savePersisted({ v: 2, step, scores, audience, email });
  }, [hydrated, step, scores, audience, email]);

  const isIntro = step === STEP_INTRO;
  const isAudience = step === STEP_AUDIENCE;
  const isResults = step === STEP_RESULTS;
  const questionIndex = step - FIRST_QUESTION_STEP;
  const isQuestion = questionIndex >= 0 && questionIndex < TOTAL_ITEMS;

  const allComplete = scores.every((s) => s !== null && s !== undefined);
  const answeredCount = scores.filter((s) => s !== null && s !== undefined).length;

  const result = isResults && allComplete ? computeSsssIntegrityResult(scores as number[]) : null;
  const audienceLabel = audience
    ? AUDIENCE_CONTEXT_OPTIONS.find((o) => o.id === audience)?.label
    : null;

  const setScoreAt = (index: number, likertZeroToFour: number) => {
    setScores((prev) => {
      const next = [...prev];
      next[index] = likertZeroToFour + 1;
      return next;
    });
  };

  const goNext = React.useCallback(() => {
    setStep((s) => Math.min(STEP_RESULTS, s + 1));
  }, []);
  const goBack = React.useCallback(() => {
    setStep((s) => Math.max(STEP_INTRO, s - 1));
  }, []);

  const restart = () => {
    setStep(STEP_INTRO);
    setScores(emptyScores());
    setAudience(null);
    setEmail("");
    setSubmitError(null);
    setSaved(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      /* noop */
    }
  };

  const saveResult = async () => {
    if (!allComplete) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/assess/ssss-integrity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scores,
          audience: audience ?? undefined,
          email: email.trim() || undefined,
        }),
      });
      const json = (await res.json()) as { success?: boolean; error?: { message?: string } };
      if (!res.ok) {
        setSubmitError(json.error?.message ?? "Could not save your result.");
      } else {
        setSaved(true);
      }
    } catch {
      setSubmitError("Network error, your summary is still visible below.");
    } finally {
      setSubmitting(false);
    }
  };

  // Keyboard: Enter advances when current step is answered.
  React.useEffect(() => {
    if (!hydrated) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" && (target as HTMLInputElement).type !== "radio") return;
      if (tag === "TEXTAREA") return;

      if (e.key === "Enter") {
        if (isAudience && audience) {
          e.preventDefault();
          goNext();
        } else if (isQuestion && scores[questionIndex] !== null) {
          e.preventDefault();
          goNext();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hydrated, isAudience, isQuestion, audience, scores, questionIndex, goNext]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[240px] items-center justify-center text-muted-foreground">
        <Loader2 className="size-8 animate-spin" aria-hidden />
      </div>
    );
  }

  const showProgress = isAudience || isQuestion;
  const progressFraction = isQuestion ? answeredCount / TOTAL_ITEMS : 0;
  const stageOfCurrent = isQuestion ? SSSS_INTEGRITY_ITEMS[questionIndex]!.stage : null;

  return (
    <div className="space-y-8">
      {!isResults && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-eyebrow text-muted-foreground">
            <span>{INSTRUMENT_NAME}</span>
            <span>
              {isIntro
                ? "Start"
                : isAudience
                  ? "Setup"
                  : isQuestion
                    ? `Question ${questionIndex + 1} of ${TOTAL_ITEMS}`
                    : "Summary"}
            </span>
          </div>
          {showProgress && (
            <AssessmentProgress
              className="mb-0 mt-3"
              progress={progressFraction}
              leftLabel={
                isAudience
                  ? "Tell us who's answering"
                  : stageOfCurrent === "Cross"
                    ? "Honest location"
                    : (stageOfCurrent ?? "")
              }
              rightLabel={
                isAudience
                  ? `0 of ${TOTAL_ITEMS} answered`
                  : `${answeredCount} of ${TOTAL_ITEMS} answered`
              }
            />
          )}
        </div>
      )}

      {/* ------------------------------- INTRO ------------------------------- */}
      {isIntro && (
        <Card>
          <h2 className="text-xl tracking-tight text-foreground md:text-2xl">
            {INSTRUMENT_NAME}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Eighteen statements about how your organization actually operates across the four stages of
            the path:{" "}
            <strong className="font-medium text-foreground">
              Safety, Sandbox, Training, Technology
            </strong>
            . Honest answers give you a clear mirror, and one place to start. Suitable for a leadership
            team answering together.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            One question at a time. About 8–12 minutes. Use number keys
            <span className="mx-1 font-mono text-foreground">1–5</span>
            and <span className="mx-1 font-mono text-foreground">Enter</span> to move quickly. Progress saves
            in this browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={goNext}>
              {answeredCount > 0 ? "Resume" : "Begin"}
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Button>
            {answeredCount > 0 && (
              <Button size="lg" variant="outline" onClick={restart}>
                Start fresh
              </Button>
            )}
          </div>
          {answeredCount > 0 && (
            <p className="mt-4 text-xs text-muted-foreground">
              You have {answeredCount} of {TOTAL_ITEMS} answers saved from a previous session.
            </p>
          )}
        </Card>
      )}

      {/* ----------------------------- AUDIENCE ------------------------------ */}
      {isAudience && (
        <Card>
          <p className="text-[0.78rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
            Setup · 1 of 1
          </p>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground md:text-xl">
            Which of these best describes the entity you&apos;re answering for?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            One choice. Used only to frame your summary at the end , 
            scoring is identical across audiences.
          </p>

          <div
            className="mt-8 space-y-3"
            role="radiogroup"
            aria-label="Audience context"
          >
            {AUDIENCE_CONTEXT_OPTIONS.map((opt) => {
              const checked = audience === opt.id;
              return (
                <label
                  key={opt.id}
                  className={cn(
                    "group relative flex cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-xl bg-card p-5 shadow-ambient transition-colors",
                    "hover:bg-section has-focus-visible:ring-2 has-focus-visible:ring-primary has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
                  )}
                >
                  <input
                    type="radio"
                    name="audience"
                    value={opt.id}
                    checked={checked}
                    onChange={() => setAudience(opt.id)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "text-base font-medium text-foreground transition-colors",
                      checked && "text-primary",
                      "group-hover:text-primary",
                    )}
                  >
                    {opt.label}
                  </span>
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      checked ? "border-primary bg-primary" : "border-border",
                    )}
                    aria-hidden
                  >
                    <span
                      className={cn(
                        "size-2.5 rounded-full bg-primary-foreground scale-0 transition-transform",
                        checked && "scale-100",
                      )}
                    />
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" onClick={goBack}>
              <ArrowLeft className="mr-2 size-4" aria-hidden />
              Back
            </Button>
            <Button type="button" disabled={!audience} onClick={goNext}>
              Continue
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Button>
            <button
              type="button"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              onClick={goNext}
            >
              Skip
            </button>
          </div>
        </Card>
      )}

      {/* ---------------------------- ONE QUESTION --------------------------- */}
      {isQuestion && (
        <Card>
          <p className="text-[0.78rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
            {stageOfCurrent === "Cross"
              ? "Honest location"
              : stageOfCurrent}{" "}
            ·{" "}
            <span className="text-muted-foreground">
              Question {questionIndex + 1} of {TOTAL_ITEMS}
            </span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {STAGE_DESCRIPTIONS[
              stageOfCurrent === "Cross"
                ? "Cross"
                : stageOfCurrent ?? ""
            ] ?? null}
          </p>

          {(() => {
            const item = SSSS_INTEGRITY_ITEMS[questionIndex]!;
            const v = scores[questionIndex];
            const selected = v === null || v === undefined ? null : v - 1;
            return (
              <div className="mt-8">
                <p className="text-lg font-medium leading-snug text-foreground" id={`q-${item.id}`}>
                  {stripBold(item.prompt)}
                </p>
                <div className="mt-6">
                  <LikertScale
                    name={item.id}
                    value={selected}
                    autoFocus
                    onChange={(z) => setScoreAt(questionIndex, z)}
                  />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Press <span className="font-mono text-foreground">1</span>–
                  <span className="font-mono text-foreground">5</span> to choose,
                  <span className="font-mono text-foreground"> Enter</span> to continue.
                </p>
              </div>
            );
          })()}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" onClick={goBack}>
              <ArrowLeft className="mr-2 size-4" aria-hidden />
              Back
            </Button>
            <Button
              type="button"
              disabled={scores[questionIndex] === null || scores[questionIndex] === undefined}
              onClick={goNext}
            >
              {questionIndex === TOTAL_ITEMS - 1 ? "See summary" : "Next question"}
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Button>
          </div>
        </Card>
      )}

      {/* ------------------------------ RESULTS ------------------------------ */}
      {isResults && result ? (
        <div className="space-y-8">
          <Card>
            <p className="text-[0.78rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
              Summary
              {audienceLabel ? (
                <span className="ml-2 text-muted-foreground">· for {audienceLabel}</span>
              ) : null}
            </p>
            <h2 className="mt-2 text-xl tracking-tight text-foreground md:text-2xl">
              Your AI reality
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Overall signal:{" "}
              <strong className="text-foreground">{result.normalizedOverallPercent}%</strong> , {" "}
              {result.band.label}. {result.band.primaryRisk}
            </p>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
              The four stages
            </h3>
            <ul className="mt-4 space-y-3">
              {(
                [
                  ["Safety", result.stagePercents.Safety],
                  ["Sandbox", result.stagePercents.Sandbox],
                  ["Training", result.stagePercents.Training],
                  ["Technology", result.stagePercents.Technology],
                  ["Honest location & incidents", result.stagePercents.Cross],
                ] as const
              ).map(([label, pct]) => (
                <li key={label}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="tabular-nums text-muted-foreground">{pct}%</span>
                  </div>
                  <div
                    className="mt-1.5 h-2 overflow-hidden rounded-full bg-section"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-[width] duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Your three weakest answers
            </h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground">
              {result.topWeaknesses.map((w) => (
                <li key={w.id}>
                  <span className="text-muted-foreground">({w.stage})</span> {stripBold(w.prompt)}{" "}
                  <span className="tabular-nums text-muted-foreground">score {w.score}/5</span>
                </li>
              ))}
            </ol>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
              What to watch for
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {result.likelyIllusion === "none"
                ? "No single pattern dominated, still use the lowest three answers above for your next ninety days."
                : ILLUSION_COPY[result.likelyIllusion]}
            </p>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Next ninety days
            </h3>
            <p className="mt-2 text-sm font-medium text-foreground">{result.next90Days.focus}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Stop:</span> {result.next90Days.stop}
            </p>

            <div className="mt-10 space-y-3 rounded-xl bg-section p-5">
              <label htmlFor="ssss-email" className="block text-sm font-medium text-foreground">
                Email (optional)
              </label>
              <input
                id="ssss-email"
                type="email"
                autoComplete="email"
                placeholder="you@organization.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-(--color-ink-band-blue)"
              />
              <p className="text-xs text-muted-foreground">
                We&apos;ll keep your result with your account so your team dashboard can build on it.
              </p>
              <Button type="button" disabled={submitting || saved} onClick={saveResult}>
                {submitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : saved ? (
                  "Saved"
                ) : (
                  "Save my result"
                )}
              </Button>
              {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button type="button" asChild>
                <Link href="/dashboard/ai-reality">See your team dashboard</Link>
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/agent/invite">Invite your team</Link>
              </Button>
              <Button type="button" variant="outline" onClick={restart}>
                Start over
              </Button>
            </div>
          </Card>
        </div>
      ) : isResults ? (
        <Card>
          <p className="text-foreground">Complete every question to see your summary.</p>
          <Button className="mt-6" variant="outline" onClick={() => setStep(LAST_QUESTION_STEP)}>
            Back to last question
          </Button>
        </Card>
      ) : null}
    </div>
  );
}
