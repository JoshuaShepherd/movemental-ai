"use client";

import { cn } from "@/lib/utils";

interface AssessmentsModalQuizProps {
  className?: string;
}

export function AssessmentsModalQuiz({ className }: AssessmentsModalQuizProps) {
  const options = [
    { label: "Less than 50", selected: false },
    { label: "50–500", selected: true },
    { label: "More than 500", selected: false },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-[var(--assess-overlay-bg)]", className)}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl mx-4 rounded-lg overflow-hidden bg-mvmt-surface-light shadow-mvmt-lg"
      >
        {/* Close button */}
        <button className="absolute top-4 right-4 text-lg text-mvmt-text-muted">
          ✕
        </button>

        <div className="p-8">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold tracking-wider uppercase text-mvmt-text-primary">
              Question 1 of 3
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full mb-8 bg-mvmt-border-light">
            <div className="h-full rounded-full w-1/3 bg-mvmt-accent"  />
          </div>

          {/* Question */}
          <h2
            className="text-xl sm:text-2xl font-bold mb-2 text-mvmt-text-primary font-mvmt-heading"
          >
            How large is your movement network?
          </h2>
          <p className="text-sm mb-8 text-mvmt-text-secondary">
            Include both your direct disciples and extended network.
          </p>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {options.map((opt) => (
              <button
                key={opt.label}
                className="flex items-center justify-center py-5 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                style={{
                  backgroundColor: opt.selected ? "var(--mvmt-surface-dark)" : "var(--mvmt-surface-light)",
                  color: opt.selected ? "var(--mvmt-on-dark-primary)" : "var(--mvmt-text-primary)",
                  border: opt.selected ? "none" : "1px solid var(--mvmt-border-light)",
                }}
              >
                {opt.selected && <span className="mr-2">✓</span>}
                {opt.label}
              </button>
            ))}
          </div>

          {/* Next button */}
          <div className="flex justify-center">
            <button
              className="px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-md transition-colors text-mvmt-on-dark-primary bg-mvmt-surface-dark"
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

AssessmentsModalQuiz.displayName = "AssessmentsModalQuiz";
