"use client";

import { cn } from "@/lib/utils";

interface AssessmentsNpsScaleProps {
  className?: string;
}

export function AssessmentsNpsScale({ className }: AssessmentsNpsScaleProps) {
  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col bg-mvmt-surface-light", className)}
    >
      {/* Top progress bar */}
      <div className="w-full h-1 bg-[var(--assess-progress-track)]">
        <div className="h-full w-2/3 bg-mvmt-accent"  />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 max-w-4xl">
        <div className="flex items-start gap-3 mb-8">
          <span className="text-sm font-medium text-[var(--assess-question-number)]">2 →</span>
          <h2 className="text-xl sm:text-2xl font-semibold leading-snug text-mvmt-text-primary font-mvmt-heading">
            How likely are you to <span className="font-bold">recommend this movement training</span> to a friend or colleague? *
          </h2>
        </div>

        {/* NPS Scale */}
        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              className="w-12 h-12 flex items-center justify-center text-sm font-medium rounded-md transition-colors cursor-pointer bg-mvmt-surface-light border-[1.5px] border-[var(--assess-scale-border)] text-[var(--assess-scale-text)]"
            >
              {i}
            </button>
          ))}
        </div>
        <div className="flex justify-between mb-8" style={{ maxWidth: "calc(11 * 3.375rem)" }}>
          <span className="text-xs text-[var(--assess-scale-label)]">Not likely at all</span>
          <span className="text-xs text-[var(--assess-scale-label)]">Extremely likely</span>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            className="px-5 py-2 rounded-md text-sm font-bold flex items-center gap-2 text-mvmt-cta-text bg-mvmt-cta-bg"
          >
            OK ✓
          </button>
          <span className="text-xs text-mvmt-text-muted">
            press <strong>Enter</strong> ↵
          </span>
        </div>
      </div>
    </section>
  );
}

AssessmentsNpsScale.displayName = "AssessmentsNpsScale";
