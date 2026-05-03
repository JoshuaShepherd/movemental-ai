"use client";

import * as React from "react";

import {
  describeLegibility,
  type LegibilityProfile,
} from "@/lib/knowledge-graph/metrics";

const SAMPLE_PROFILE: LegibilityProfile = {
  canonicalSpine: "high",
  transcriptCoverage: "medium",
  internalLinking: "high",
  entityClarity: "high",
  topicDepth: "medium",
  multilingualReach: "low",
};

const LABELS: { key: keyof LegibilityProfile; label: string }[] = [
  { key: "canonicalSpine", label: "Canonical spine" },
  { key: "transcriptCoverage", label: "Transcript coverage" },
  { key: "internalLinking", label: "Internal linking" },
  { key: "entityClarity", label: "Entity clarity" },
  { key: "topicDepth", label: "Topic depth" },
  { key: "multilingualReach", label: "Multilingual reach" },
];

function barHeight(
  signal: LegibilityProfile[keyof LegibilityProfile],
): string {
  switch (signal) {
    case "high":
      return "h-full";
    case "medium":
      return "h-[66%]";
    default:
      return "h-[36%]";
  }
}

/**
 * Interpretive view — qualitative bands only (no fabricated percentages).
 */
export function MachineLegibilityView() {
  const [profile, setProfile] =
    React.useState<LegibilityProfile>(SAMPLE_PROFILE);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="rounded-md border border-border bg-card p-6 shadow-ambient">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Interpretive model
        </p>
        <h3 className="mt-2 font-semibold text-foreground">
          What structured corpora make easier to reason about
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          These bars are <strong className="text-foreground">ordinal signals</strong>{" "}
          for storytelling — not measurements from your analytics stack. They
          describe how a mature Movemental-shaped system tends to read to machines
          and careful readers.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {LABELS.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-stretch gap-2">
              <div className="flex h-28 items-end rounded-md bg-section px-1 pt-2">
                <div
                  className={`w-full rounded-sm bg-primary/85 ${barHeight(profile[key])}`}
                  aria-hidden
                />
              </div>
              <p className="text-center text-[11px] font-medium leading-snug text-muted-foreground">
                {label}
              </p>
              <div className="flex justify-center gap-1">
                {(["low", "medium", "high"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={
                      profile[key] === v
                        ? "rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground"
                        : "rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-section"
                    }
                    onClick={() =>
                      setProfile((p) => ({
                        ...p,
                        [key]: v,
                      }))
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="rounded-md border border-border bg-section p-5 text-sm leading-relaxed text-muted-foreground">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-primary">
          Reading the pattern
        </p>
        <p className="mt-3 text-foreground">{describeLegibility(profile)}</p>
        <p className="mt-4">
          Search engines and large language models reward stable entities,
          repeated internal reference, and text that machines can align to the
          same underlying sources humans trust.
        </p>
      </aside>
    </div>
  );
}
