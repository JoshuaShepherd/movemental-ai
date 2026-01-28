"use client";

import { cn } from "@/lib/utils";

interface AssessmentsNpsScaleProps {
  className?: string;
}

export function AssessmentsNpsScale({ className }: AssessmentsNpsScaleProps) {
  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      {/* Top progress bar */}
      <div className="w-full h-1" style={{ backgroundColor: "var(--assess-progress-track)" }}>
        <div className="h-full w-2/3" style={{ backgroundColor: "var(--mvmt-accent)" }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 max-w-4xl">
        <div className="flex items-start gap-3 mb-8">
          <span className="text-sm font-medium" style={{ color: "var(--assess-question-number)" }}>2 →</span>
          <h2 className="text-xl sm:text-2xl font-semibold leading-snug" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            How likely are you to <span style={{ fontWeight: 700 }}>recommend this movement training</span> to a friend or colleague? *
          </h2>
        </div>

        {/* NPS Scale */}
        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              className="w-12 h-12 flex items-center justify-center text-sm font-medium rounded-md transition-colors cursor-pointer"
              style={{
                border: "1.5px solid var(--assess-scale-border)",
                color: "var(--assess-scale-text)",
                backgroundColor: "var(--mvmt-surface-light)",
              }}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="flex justify-between mb-8" style={{ maxWidth: "calc(11 * 3.375rem)" }}>
          <span className="text-xs" style={{ color: "var(--assess-scale-label)" }}>Not likely at all</span>
          <span className="text-xs" style={{ color: "var(--assess-scale-label)" }}>Extremely likely</span>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            className="px-5 py-2 rounded-md text-sm font-bold flex items-center gap-2"
            style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)" }}
          >
            OK ✓
          </button>
          <span className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>
            press <strong>Enter</strong> ↵
          </span>
        </div>
      </div>
    </section>
  );
}

AssessmentsNpsScale.displayName = "AssessmentsNpsScale";
