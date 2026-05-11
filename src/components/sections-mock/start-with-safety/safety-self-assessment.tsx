"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type AnswerValue = "yes" | "mostly" | "partially" | "not-yet";

type Question = {
  id: string;
  text: string;
  flaggedHint: string;
};

const QUESTIONS: readonly Question[] = [
  {
    id: "tool-inventory",
    text: "Do you know which AI tools your staff are already using?",
    flaggedHint:
      "Establish a current-state inventory before defining policy. Most organizations underestimate the breadth of shadow AI use already happening on staff laptops.",
  },
  {
    id: "written-guidance",
    text: "Do you have written guidance for acceptable and unacceptable use?",
    flaggedHint:
      "Draft an AI Use Statement that names what is allowed, discouraged, and prohibited. This is the first artifact of the Safety stage and the document everything else hangs off.",
  },
  {
    id: "data-boundaries",
    text: "Have you defined what information should never enter AI tools?",
    flaggedHint:
      "Map your data categories — personal, pastoral, donor, student, financial, board — and assign each a treatment rule before adoption accelerates.",
  },
  {
    id: "human-review",
    text: "Do leaders agree on when human review is required?",
    flaggedHint:
      "Reach senior-team alignment on when AI-assisted work must be reviewed by a human before it reaches constituents. Without this, review happens inconsistently and reactively.",
  },
  {
    id: "sensitive-handling",
    text: "Do staff know how to handle confidential, pastoral, donor, student, or client information?",
    flaggedHint:
      "Translate the policy into role-specific guidance — what each function should and should not paste into AI tools. Policy in the abstract does not survive the daily workflow.",
  },
  {
    id: "use-case-review",
    text: "Do you have a process for reviewing new AI use cases?",
    flaggedHint:
      "Stand up a lightweight review process so new AI work does not bypass the safety frame as adoption accelerates inside the organization.",
  },
  {
    id: "articulation",
    text: "Can your team explain why your AI boundaries exist?",
    flaggedHint:
      "Shared articulation matters more than the policy document. If staff cannot articulate why a boundary exists, the boundary will not hold once pressure arrives.",
  },
];

const OPTIONS: ReadonlyArray<{ value: AnswerValue; label: string; flagged: boolean }> = [
  { value: "yes", label: "Yes", flagged: false },
  { value: "mostly", label: "Mostly", flagged: false },
  { value: "partially", label: "Partially", flagged: true },
  { value: "not-yet", label: "Not yet", flagged: true },
];

type Tier = "ready" | "refining" | "significant" | "beginning";

type ReadBack = {
  tier: Tier;
  headline: string;
  body: string;
  flagged: readonly Question[];
  nextSteps: ReadonlyArray<{ label: string; href: string; primary?: boolean }>;
};

function generateReadBack(answers: Record<string, AnswerValue>): ReadBack {
  const flagged = QUESTIONS.filter((q) => {
    const a = answers[q.id];
    return a === "partially" || a === "not-yet";
  });
  const n = flagged.length;

  if (n === 0) {
    return {
      tier: "ready",
      headline: "Strong starting position.",
      body:
        "Your team can answer the basic Safety questions. That does not mean the work is finished — it means you have a real foundation to build from. Most organizations who can answer these questions are ready to move into Sandbox (Stage 02), where you will explore real AI work against real organizational data inside the safety frame you have already built.",
      flagged,
      nextSteps: [
        { label: "Read Volume One to confirm alignment", href: "/field-guides/safety", primary: true },
        { label: "See Sandbox (Stage 02)", href: "/pathway/sandbox" },
        { label: "Take the broader path-integrity diagnostic", href: "/assess" },
      ],
    };
  }

  if (n <= 2) {
    return {
      tier: "refining",
      headline: "Foundation mostly in place.",
      body: `You can answer most of the Safety questions, but ${n} ${n === 1 ? "gap remains" : "gaps remain"}. These are not crisis-level — they are the kind of refinement Volume One is designed for. Read the guide, address the flagged ${n === 1 ? "area" : "areas"} with your team, and reassess in thirty days.`,
      flagged,
      nextSteps: [
        { label: "Read Volume One", href: "/field-guides/safety", primary: true },
        { label: "See SafeStart (facilitated version)", href: "/pathway/safety" },
      ],
    };
  }

  if (n <= 4) {
    return {
      tier: "significant",
      headline: "Significant Safety work to do.",
      body: `${n} of the seven foundational questions are unclear in your organization. This is normal for organizations that have not yet given Safety a deliberate pass — but it means you are not yet ready for Sandbox. Volume One will help you draft the artifacts. SafeStart, the facilitated version of the Safety stage, can negotiate the seven decisions with your leadership team if facilitation would accelerate the work.`,
      flagged,
      nextSteps: [
        { label: "Read Volume One first", href: "/field-guides/safety", primary: true },
        { label: "Start a SafeStart conversation", href: "/contact?interest=safestart" },
      ],
    };
  }

  return {
    tier: "beginning",
    headline: "Beginning at the beginning.",
    body: `${n} of seven questions are unclear. That does not mean your organization is irresponsible — it likely means AI has crept in without ever being named at the senior-team level. The Field Guide alone may not be enough; SafeStart, the facilitated version of the Safety stage, is built for this situation. Two weeks. Seven decisions. The artifacts your board needs.`,
    flagged,
    nextSteps: [
      { label: "Start a SafeStart conversation", href: "/contact?interest=safestart", primary: true },
      { label: "Read Volume One alongside", href: "/field-guides/safety" },
    ],
  };
}

export function SafetySelfAssessment() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => answers[q.id] !== undefined).length,
    [answers],
  );
  const allAnswered = answeredCount === QUESTIONS.length;

  const readBack = useMemo(() => (submitted ? generateReadBack(answers) : null), [submitted, answers]);

  function setAnswer(questionId: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!allAnswered) return;
    setSubmitted(true);
    requestAnimationFrame(() => {
      document.getElementById("readback")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
    requestAnimationFrame(() => {
      document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (readBack) {
    return <ReadBackView readBack={readBack} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 max-w-3xl" aria-labelledby="assessment-form-title">
      <p
        id="assessment-form-title"
        className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground"
      >
        Seven questions · {answeredCount} of {QUESTIONS.length} answered
      </p>
      <ol className="mt-6 space-y-8">
        {QUESTIONS.map((question, i) => {
          const selected = answers[question.id];
          return (
            <li key={question.id} className="border border-border bg-card p-6 md:p-8">
              <fieldset>
                <legend className="block">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    Question {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block font-serif-display text-xl italic leading-snug text-foreground md:text-2xl">
                    {question.text}
                  </span>
                </legend>
                <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3" role="radiogroup">
                  {OPTIONS.map((option) => {
                    const isSelected = selected === option.value;
                    return (
                      <label
                        key={option.value}
                        className={cn(
                          "flex cursor-pointer items-center justify-center gap-2 border px-3 py-3 text-sm font-medium transition-colors",
                          "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
                          isSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-background text-foreground hover:bg-section",
                        )}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={isSelected}
                          onChange={() => setAnswer(question.id, option.value)}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!allAnswered}
          className={cn(
            "btn-pill btn-pill--primary",
            !allAnswered && "cursor-not-allowed opacity-50",
          )}
        >
          {allAnswered ? "Get my read-back" : `Answer all ${QUESTIONS.length} questions`}
        </button>
        <p className="text-xs text-muted-foreground">
          Nothing is sent or saved. The read-back is generated in your browser from your answers.
        </p>
      </div>
    </form>
  );
}

function ReadBackView({ readBack, onReset }: { readBack: ReadBack; onReset: () => void }) {
  const { tier, headline, body, flagged, nextSteps } = readBack;
  const tierLabel: Record<Tier, string> = {
    ready: "Ready to move forward",
    refining: "Refinement needed",
    significant: "Significant work to do",
    beginning: "Beginning at the beginning",
  };

  return (
    <div id="readback" className="mt-12 max-w-3xl scroll-mt-(--site-chrome-total)">
      <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
        Your read-back · {tierLabel[tier]}
      </p>
      <h3 className="mt-3 font-serif-display text-3xl italic leading-tight text-foreground md:text-4xl">
        {headline}
      </h3>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground">{body}</p>

      {flagged.length > 0 ? (
        <div className="mt-10 border-l-2 border-pathway-accent pl-6">
          <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
            What you flagged · {flagged.length} of {QUESTIONS.length}
          </p>
          <ul className="mt-4 space-y-6">
            {flagged.map((q) => (
              <li key={q.id}>
                <p className="font-serif-display text-lg italic leading-snug text-foreground">{q.text}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{q.flaggedHint}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-12 border-t border-border pt-8">
        <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Recommended next steps
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 md:gap-4">
          {nextSteps.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className={cn(
                "btn-pill px-6 py-3 text-sm font-medium",
                step.primary ? "btn-pill--primary" : "btn-pill--ghost",
              )}
            >
              {step.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-foreground"
        >
          Reset and take it again
        </button>
      </div>
    </div>
  );
}
