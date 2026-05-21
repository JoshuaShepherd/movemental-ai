"use client";

/**
 * FiveLayerRead — Safety stage diagnostic wizard.
 *
 * Single-screen linear wizard. Walks the user through the five canonical
 * Safety layers (Statement / Policy / Context / Rules / Response Plans)
 * one at a time, asks a yes / partial / no rating per layer, narrates the
 * picture as it forms, and emits a per-layer read-back on completion.
 *
 * Voice register: calm, observational, declarative. No marketing verbs,
 * no exclamation marks, no emoji. The brand qualifier — "Documentation
 * begins the work. It does not finish it." — appears only on the results
 * screen.
 *
 * Tokens: uses the repo's Concept Modern palette + status tokens
 * (`--color-status-go|caution|stop`). No blue, no Source Serif 4.
 *
 * Motion: `prefers-reduced-motion` aware via the existing fade-up keyframe.
 * Easings are ease-out only — no spring, no bounce.
 */

import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  ScrollText,
  Shield,
  Siren,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Rating = "yes" | "partial" | "no";

type LayerId = "statement" | "policy" | "context" | "rules" | "response";

interface Layer {
  id: LayerId;
  number: string; // "01" … "05"
  name: string;
  icon: LucideIcon;
  question: string;
  definition: string;
  documents: string[]; // canonical document(s) for this layer
  /** 15 synopses — one per rating per layer, used on the results detail. */
  synopses: Record<Rating, string>;
}

type Answers = Partial<Record<LayerId, Rating>>;

/* -------------------------------------------------------------------------- */
/*  Layer data — canonical five layers, brief-aligned                          */
/* -------------------------------------------------------------------------- */

const LAYERS: readonly Layer[] = [
  {
    id: "statement",
    number: "01",
    name: "Statement",
    icon: ScrollText,
    question:
      "Has your organization put in writing what it believes about AI in relation to its mission?",
    definition:
      "The Charter. A single, ratifiable page that names what AI is for in your work — and what it is not.",
    documents: ["AI Use Charter"],
    synopses: {
      yes: "Your AI Use Charter is on the table. The work below it has a reason to hold.",
      partial:
        "There is a draft instinct here, but no Charter the board could sign. The first pass is to name what you believe before naming what you'll do.",
      no: "Begin here. Without a Charter, every rule under it floats. One page, ratified, changes the conversation.",
    },
  },
  {
    id: "policy",
    number: "02",
    name: "Policy",
    icon: Shield,
    question:
      "Have you defined operationally what your team will do with AI — and what it will refuse to do?",
    definition:
      "Acceptable Use, paired with Named Refusals. The line between permitted work and the things the organization will never automate.",
    documents: ["Acceptable Use Policy", "Named Refusals"],
    synopses: {
      yes: "Acceptable Use is written and Named Refusals are explicit. Staff know the line before they reach it.",
      partial:
        "Acceptable Use exists in part, but Named Refusals are implicit. Name what you will never automate; that decision protects the rest.",
      no: "No policy means staff are writing their own in real time. Draft Acceptable Use this quarter, and name three refusals before you publish it.",
    },
  },
  {
    id: "context",
    number: "03",
    name: "Context",
    icon: ClipboardList,
    question:
      "Do you have a current inventory of the AI tools and vendors in use, and a classification of the data each one touches?",
    definition:
      "Vendor & Tool Inventory plus Data Classification. The map of what is already in the building.",
    documents: ["Vendor & Tool Inventory", "Data Classification"],
    synopses: {
      yes: "You know what is already in the building. Decisions made above this layer rest on real ground.",
      partial:
        "Some tools are catalogued; the data they touch is not. Classify the data first, then re-walk the inventory against it.",
      no: "Shadow use is the default condition without an inventory. A two-hour staff survey closes most of the gap.",
    },
  },
  {
    id: "rules",
    number: "04",
    name: "Rules",
    icon: BookOpen,
    question:
      "Do specific rules govern how AI handles your sensitive domains — data handling, disclosure, and care boundaries?",
    definition:
      "Data Handling Rules, Disclosure & Attribution, and Care Boundaries. The places where general policy meets specific work.",
    documents: [
      "Data Handling Rules",
      "Disclosure & Attribution",
      "Care Boundaries",
    ],
    synopses: {
      yes: "The sensitive domains are governed by named rules. Pastoral, donor, and constituent work has a written floor.",
      partial:
        "One or two of the three rule sets are drafted; the others rely on instinct. Instinct is uneven across a staff.",
      no: "Without domain rules, every staff member improvises at the moment of pressure. Start with disclosure — the rule that travels furthest.",
    },
  },
  {
    id: "response",
    number: "05",
    name: "Response Plans",
    icon: Siren,
    question:
      "Do you have a written plan for what to do when AI causes harm — a leak, a misleading output, a misuse incident?",
    definition:
      "Incident Response Plan. The page you reach for on the day something has already gone wrong.",
    documents: ["Incident Response Plan"],
    synopses: {
      yes: "An Incident Response Plan is in place. The first ten minutes after a misuse are not improvised.",
      partial:
        "Some triage exists, but it is not written down. The first ten minutes after a misuse should not depend on who is in the room.",
      no: "Incidents will happen. Without a plan, the response is whoever is online that day. One page closes most of the exposure.",
    },
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Status colour map — repo tokens, not raw hex                              */
/* -------------------------------------------------------------------------- */

const RATING_COLOR: Record<Rating, string> = {
  yes: "var(--color-status-go)",
  partial: "var(--color-status-caution)",
  no: "var(--color-status-stop)",
};

const RATING_LABEL: Record<Rating, string> = {
  yes: "Yes",
  partial: "Partial",
  no: "No",
};

/* -------------------------------------------------------------------------- */
/*  Cumulative interpretation — composed from answered layers so far          */
/* -------------------------------------------------------------------------- */

/**
 * Read the picture as it forms. Called at the top of steps 2-5 with the
 * layers answered so far. Returns 2-3 short, observational sentences.
 *
 * Never uses the qualifier "Documentation begins the work. It does not
 * finish it." — that line is reserved for the results screen.
 */
function buildCumulativeReading(
  answered: ReadonlyArray<{ layer: Layer; rating: Rating }>,
  nextLayer: Layer,
): string {
  if (answered.length === 0) return "";

  const counts = answered.reduce(
    (acc, { rating }) => {
      acc[rating] += 1;
      return acc;
    },
    { yes: 0, partial: 0, no: 0 } as Record<Rating, number>,
  );

  const total = answered.length;

  // 1) Tally sentence — natural-language version of the count.
  const tallyParts: string[] = [];
  if (counts.yes > 0) tallyParts.push(plural(counts.yes, "yes", "yeses"));
  if (counts.partial > 0)
    tallyParts.push(plural(counts.partial, "partial", "partials"));
  if (counts.no > 0) tallyParts.push(plural(counts.no, "no", "nos"));

  const throughClause = `through ${numberWord(total)} ${total === 1 ? "layer" : "layers"}`;
  const tally =
    tallyParts.length > 0
      ? `${capitalise(joinWithAnd(tallyParts))} ${throughClause}.`
      : "";

  // 2) Strongest-signal sentence — the gap or strength that stands out.
  //    Priority: any "no" speaks first; then any "partial"; then strengths.
  const firstNo = answered.find(({ rating }) => rating === "no");
  const firstPartial = answered.find(({ rating }) => rating === "partial");
  let signal = "";
  if (firstNo) {
    signal = `The gap at Layer ${firstNo.layer.number} — ${firstNo.layer.name} — is the one that travels furthest under the rest.`;
  } else if (firstPartial) {
    signal = `Layer ${firstPartial.layer.number} — ${firstPartial.layer.name} — is the half-built one; the rest only holds as well as that holds.`;
  } else {
    // All yeses so far.
    signal =
      total === 1
        ? "A grounded start. The layers below it have something to attach to."
        : "The foundation is consistent so far. The remaining layers can be read against firm ground.";
  }

  // 3) Pivot toward the next layer.
  const pivot = `Next, ${nextLayer.name.toLowerCase()}.`;

  return [tally, signal, pivot].filter(Boolean).join(" ");
}

function plural(n: number, singular: string, pluralForm: string): string {
  const word = n === 1 ? singular : pluralForm;
  return `${numberWord(n)} ${word}`;
}

function numberWord(n: number): string {
  const words = ["zero", "one", "two", "three", "four", "five"];
  return words[n] ?? String(n);
}

function joinWithAnd(parts: string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!;
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

function capitalise(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* -------------------------------------------------------------------------- */
/*  Results — archetype + per-layer affirmations / next-drafts                */
/* -------------------------------------------------------------------------- */

type Archetype = "high-performer" | "begin-this-quarter" | "begin-now";

interface ResultSummary {
  archetype: Archetype;
  headline: string;
  counts: Record<Rating, number>;
}

function summariseResults(answers: Answers): ResultSummary {
  const counts: Record<Rating, number> = { yes: 0, partial: 0, no: 0 };
  for (const layer of LAYERS) {
    const r = answers[layer.id];
    if (r) counts[r] += 1;
  }

  // Thresholds: tuned so the bar for "high-performer" is real (≥4 yes & ≤1 no)
  // and the dividing line for urgency falls at "≤1 yes OR ≥2 nos".
  let archetype: Archetype;
  let headline: string;

  if (counts.yes >= 4 && counts.no <= 1) {
    archetype = "high-performer";
    headline = "You're likely in the high-performer cohort.";
  } else if (counts.yes <= 1 || counts.no >= 2) {
    archetype = "begin-now";
    headline = "Begin Safety now.";
  } else {
    archetype = "begin-this-quarter";
    headline = "Begin Safety this quarter.";
  }

  return { archetype, headline, counts };
}

/** One-line "in place" affirmation per layer for `yes` ratings. */
const IN_PLACE_AFFIRM: Record<LayerId, string> = {
  statement: "The Charter is the page everything else stands on.",
  policy:
    "Acceptable Use is written and Named Refusals are explicit. The staff line is real.",
  context:
    "The inventory and data classification are current. Decisions rest on what is actually in the building.",
  rules:
    "Data handling, disclosure, and care boundaries are governed. Pressure meets a written floor.",
  response: "There is a page to reach for when something has already gone wrong.",
};

/** "What to draft next" line per layer for `partial` and `no` ratings. */
const NEXT_DRAFT: Record<LayerId, string> = {
  statement: "Draft a one-page AI Use Charter and route it for ratification.",
  policy:
    "Write the Acceptable Use Policy and name three refusals before it ships.",
  context:
    "Run a two-hour tool survey, then classify the data each tool touches.",
  rules:
    "Begin with disclosure — the rule that travels furthest into staff work.",
  response:
    "Write a one-page Incident Response Plan: who, what, in what order, by when.",
};

/* -------------------------------------------------------------------------- */
/*  Subcomponents                                                              */
/* -------------------------------------------------------------------------- */

interface LayerChipsProps {
  answers: Answers;
  currentIndex: number;
  onJump: (index: number) => void;
}

function LayerChips({ answers, currentIndex, onJump }: LayerChipsProps) {
  return (
    <ol
      className="flex items-center gap-2 sm:gap-3"
      aria-label="Layer progress"
    >
      {LAYERS.map((layer, i) => {
        const rating = answers[layer.id];
        const isCurrent = i === currentIndex;
        const isAnswered = rating !== undefined;
        const canJump = isAnswered;
        const Icon = layer.icon;
        const colour = rating ? RATING_COLOR[rating] : "var(--border)";

        return (
          <li key={layer.id}>
            <button
              type="button"
              onClick={canJump ? () => onJump(i) : undefined}
              disabled={!canJump}
              aria-label={`${
                isAnswered ? "Revisit" : "Layer"
              } Layer ${layer.number} — ${layer.name}${
                rating ? ` — rated ${RATING_LABEL[rating]}` : ""
              }`}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors sm:h-10 sm:w-10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                canJump ? "cursor-pointer" : "cursor-default",
                isCurrent && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
              )}
              style={{
                backgroundColor: isAnswered ? colour : "transparent",
                borderColor: isAnswered ? colour : "var(--border)",
                color: isAnswered ? "var(--inverse-foreground)" : "var(--muted-foreground)",
              }}
            >
              <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden />
            </button>
          </li>
        );
      })}
    </ol>
  );
}

interface SegmentedControlProps {
  value: Rating | undefined;
  onChange: (rating: Rating) => void;
  layerName: string;
}

function SegmentedControl({ value, onChange, layerName }: SegmentedControlProps) {
  const options: Rating[] = ["yes", "partial", "no"];
  return (
    <div
      role="group"
      aria-label={`Rate Layer — ${layerName}`}
      className="mt-8 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3"
    >
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={isSelected}
            className={cn(
              "group relative flex items-center justify-center gap-2 border px-4 py-3 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isSelected
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-foreground hover:bg-section",
            )}
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: RATING_COLOR[opt] }}
            />
            {RATING_LABEL[opt]}
          </button>
        );
      })}
    </div>
  );
}

interface RatingChipProps {
  rating: Rating;
}

function RatingChip({ rating }: RatingChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-eyebrow"
      style={{
        borderColor: RATING_COLOR[rating],
        color: RATING_COLOR[rating],
      }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: RATING_COLOR[rating] }}
      />
      {RATING_LABEL[rating]}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS = LAYERS.length;
const RESULTS_STEP = TOTAL_STEPS; // step index 5 = results

export default function FiveLayerRead() {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const stepShellRef = useRef<HTMLDivElement>(null);

  const isResults = stepIndex >= RESULTS_STEP;
  const currentLayer = !isResults ? LAYERS[stepIndex] : null;

  // Focus the step container on transition so screen readers re-read.
  useEffect(() => {
    if (stepShellRef.current) {
      stepShellRef.current.focus({ preventScroll: false });
    }
  }, [stepIndex]);

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!currentLayer) return;
      const layerId = currentLayer.id;
      setAnswers((prev) => ({ ...prev, [layerId]: rating }));
      // Advance to next step (or results).
      setStepIndex((idx) => Math.min(idx + 1, RESULTS_STEP));
    },
    [currentLayer],
  );

  const handleBack = useCallback(() => {
    setStepIndex((idx) => Math.max(idx - 1, 0));
  }, []);

  const handleJump = useCallback(
    (i: number) => {
      // Only jump to layers that have been answered (or the current one).
      const layer = LAYERS[i];
      if (!layer) return;
      if (i === stepIndex) return;
      if (answers[layer.id] !== undefined) {
        setStepIndex(i);
      }
    },
    [answers, stepIndex],
  );

  const handleReset = useCallback(() => {
    setAnswers({});
    setStepIndex(0);
  }, []);

  // Derived: cumulative reading for steps 2-5.
  const cumulativeReading = useMemo(() => {
    if (isResults || !currentLayer || stepIndex === 0) return "";
    const answered = LAYERS.slice(0, stepIndex)
      .map((l) => {
        const r = answers[l.id];
        return r ? { layer: l, rating: r } : null;
      })
      .filter((x): x is { layer: Layer; rating: Rating } => x !== null);
    return buildCumulativeReading(answered, currentLayer);
  }, [answers, currentLayer, isResults, stepIndex]);

  return (
    <section
      aria-labelledby="five-layer-read-title"
      className="bg-background text-foreground"
    >
      <div className="container mx-auto px-6 py-12 sm:py-16">
        {/* Sticky-ish title for context — small, observational */}
        <header className="mb-10">
          <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
            Five-Layer Read · Diagnostic
          </p>
          <h2
            id="five-layer-read-title"
            className="mt-2 max-w-2xl font-serif-display text-2xl italic leading-tight text-foreground sm:text-3xl"
          >
            Where the work already holds, and where the next pass starts.
          </h2>
        </header>

        {/* Chips row */}
        <LayerChips
          answers={answers}
          currentIndex={isResults ? -1 : stepIndex}
          onJump={handleJump}
        />

        {/* Step content */}
        <div
          ref={stepShellRef}
          tabIndex={-1}
          className="mt-10 outline-none"
          // The `key` swap triggers the fade-up animation on each step.
          key={`step-${stepIndex}`}
          style={{
            animation:
              "fade-up var(--duration-normal, 300ms) cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          {!isResults && currentLayer ? (
            <StepView
              layer={currentLayer}
              rating={answers[currentLayer.id]}
              onRate={handleRate}
              onBack={stepIndex > 0 ? handleBack : undefined}
              cumulativeReading={cumulativeReading}
              stepIndex={stepIndex}
              totalSteps={TOTAL_STEPS}
            />
          ) : (
            <ResultsView answers={answers} onReset={handleReset} />
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step view                                                                  */
/* -------------------------------------------------------------------------- */

interface StepViewProps {
  layer: Layer;
  rating: Rating | undefined;
  onRate: (rating: Rating) => void;
  onBack?: () => void;
  cumulativeReading: string;
  stepIndex: number;
  totalSteps: number;
}

function StepView({
  layer,
  rating,
  onRate,
  onBack,
  cumulativeReading,
  stepIndex,
  totalSteps,
}: StepViewProps) {
  return (
    <div className="max-w-3xl">
      {/* Cumulative interpretation panel — steps 2-5 only */}
      {cumulativeReading ? (
        <aside
          aria-label="The picture so far"
          className="mb-10 border-l-2 border-foreground bg-section p-5 text-sm leading-relaxed text-foreground/85 sm:p-6"
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
            The picture so far
          </p>
          <p className="mt-2">{cumulativeReading}</p>
        </aside>
      ) : null}

      {/* Kicker — LAYER 0X · NAME */}
      <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
        Layer {layer.number} · {layer.name}
        <span className="ml-3 text-muted-foreground/70">
          Step {stepIndex + 1} of {totalSteps}
        </span>
      </p>

      {/* Question */}
      <h3
        className="mt-4 font-serif-display italic leading-tight text-foreground"
        style={{
          fontSize: "clamp(2rem, 4vw, 2.5rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {layer.question}
      </h3>

      {/* Definition */}
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {layer.definition}
      </p>

      {/* Documents — small, secondary */}
      <p className="mt-3 text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground">
        Document{layer.documents.length > 1 ? "s" : ""}:{" "}
        <span className="text-foreground/80 normal-case tracking-normal">
          {layer.documents.join(" + ")}
        </span>
      </p>

      {/* Segmented control */}
      <SegmentedControl
        value={rating}
        onChange={onRate}
        layerName={layer.name}
      />

      {/* Back link */}
      <div className="mt-10">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ← Back
          </button>
        ) : (
          <span className="text-xs uppercase tracking-eyebrow text-muted-foreground/60">
            Rate Yes, Partial, or No to continue.
          </span>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Results view                                                               */
/* -------------------------------------------------------------------------- */

interface ResultsViewProps {
  answers: Answers;
  onReset: () => void;
}

function ResultsView({ answers, onReset }: ResultsViewProps) {
  const { headline, counts } = useMemo(() => summariseResults(answers), [answers]);

  const inPlace = LAYERS.filter((l) => answers[l.id] === "yes");
  const nextPass = LAYERS.filter(
    (l) => answers[l.id] === "partial" || answers[l.id] === "no",
  );

  return (
    <div className="max-w-3xl">
      {/* Pattern headline */}
      <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
        Your read · across all five layers
      </p>
      <h3
        className="mt-3 font-serif-display italic leading-tight text-foreground"
        style={{
          fontSize: "clamp(2.2rem, 4.4vw, 2.8rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {headline}
      </h3>

      {/* Count summary */}
      <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground/80">
        {counts.yes} Yes <span className="text-muted-foreground">·</span>{" "}
        {counts.partial} Partial <span className="text-muted-foreground">·</span>{" "}
        {counts.no} No
      </p>

      {/* In-place / Next-pass panels */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Panel
          title="In place"
          empty={
            inPlace.length === 0
              ? "Nothing yet — and that is the read."
              : undefined
          }
        >
          {inPlace.map((layer) => (
            <PanelRow key={layer.id} layer={layer}>
              <p className="text-sm leading-relaxed text-foreground/85">
                {IN_PLACE_AFFIRM[layer.id]}
              </p>
            </PanelRow>
          ))}
        </Panel>

        <Panel
          title="Where the next pass starts"
          empty={
            nextPass.length === 0
              ? "Nothing flagged — but the work below is not finished."
              : undefined
          }
        >
          {nextPass.map((layer) => (
            <PanelRow key={layer.id} layer={layer}>
              <p className="text-sm leading-relaxed text-foreground/85">
                {NEXT_DRAFT[layer.id]}
              </p>
            </PanelRow>
          ))}
        </Panel>
      </div>

      {/* Full per-layer detail */}
      <div className="mt-14">
        <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Layer by layer
        </p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {LAYERS.map((layer) => {
            const rating = answers[layer.id];
            const Icon = layer.icon;
            return (
              <li
                key={layer.id}
                className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full border"
                    style={{
                      backgroundColor: rating
                        ? RATING_COLOR[rating]
                        : "transparent",
                      borderColor: rating
                        ? RATING_COLOR[rating]
                        : "var(--border)",
                      color: rating ? "var(--inverse-foreground)" : "var(--muted-foreground)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      Layer {layer.number}
                    </p>
                    <p className="font-serif-display text-lg italic leading-snug text-foreground">
                      {layer.name}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-eyebrow text-muted-foreground">
                    {layer.documents.join(" + ")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {rating
                      ? layer.synopses[rating]
                      : "Not rated — return to revisit this layer."}
                  </p>
                </div>
                <div className="sm:pt-1">
                  {rating ? (
                    <RatingChip rating={rating} />
                  ) : (
                    <span className="text-[0.68rem] uppercase tracking-eyebrow text-muted-foreground">
                      —
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Honest caveat — brand qualifier, verbatim */}
      <p className="mt-12 max-w-2xl font-serif-display text-lg italic leading-snug text-foreground sm:text-xl">
        Documentation begins the work. It does not finish it. People still make
        mistakes. Training is still required. The Guidebook is the door, not the
        house.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Link
          href="/field-guides/safety-new"
          className="btn-pill btn-pill--primary"
        >
          Read the Field Guide
        </Link>
        <Link
          href="/pathway/safety-new#safestart"
          className="btn-pill btn-pill--ghost"
        >
          Talk about SafeStart
        </Link>
      </div>

      {/* Start Over */}
      <div className="mt-10">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Result panels                                                              */
/* -------------------------------------------------------------------------- */

interface PanelProps {
  title: string;
  empty?: string;
  children?: ReactNode;
}

function Panel({ title, empty, children }: PanelProps) {
  return (
    <div className="border-l-2 border-foreground bg-section p-5 sm:p-6">
      <p className="text-[0.6rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
        {title}
      </p>
      {empty ? (
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-4">{children}</ul>
      )}
    </div>
  );
}

interface PanelRowProps {
  layer: Layer;
  children: ReactNode;
}

function PanelRow({ layer, children }: PanelRowProps) {
  return (
    <li>
      <p className="text-[0.6rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
        Layer {layer.number} · {layer.name}
      </p>
      <p className="font-serif-display text-base italic leading-snug text-foreground">
        {layer.documents.join(" + ")}
      </p>
      <div className="mt-1.5">{children}</div>
    </li>
  );
}
