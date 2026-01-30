"use client";

import { cn } from "@/lib/utils";

interface AssessmentsUdemyQuizProps {
  className?: string;
}

export function AssessmentsUdemyQuiz({ className }: AssessmentsUdemyQuizProps) {
  const options = [
    { label: "Multiplication Mindset", selected: false },
    { label: "Community Engagement", selected: false },
    { label: "Disciple-Making Culture", selected: true },
    { label: "Organizational Structure", selected: false },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col bg-mvmt-surface-light", className)}
    >
      {/* Dark Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-mvmt-surface-dark">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-mvmt-on-dark-primary">Movemental</span>
          <span className="text-xs text-mvmt-on-dark-muted">|</span>
          <span className="text-xs text-mvmt-on-dark-secondary">Church Planting 101</span>
        </div>
        <button
          className="px-4 py-1.5 text-xs font-medium rounded flex items-center gap-1 text-mvmt-on-dark-primary border border-mvmt-border-on-dark-medium"
        >
          ✕ Save and exit
        </button>
      </div>

      {/* Question Body */}
      <div className="flex-1 px-6 sm:px-12 lg:px-24 py-10 max-w-3xl">
        <p className="text-sm font-medium mb-3 text-mvmt-text-secondary">Question 2</p>
        <h2
          className="text-xl sm:text-2xl font-semibold leading-snug mb-2 text-mvmt-text-primary font-mvmt-heading"
        >
          Which attribute would you prioritize first when launching a movement in a new context? Select all that apply.
        </h2>
        <p className="text-sm mb-8 text-mvmt-text-muted">Select the correct answer</p>

        <div className="space-y-3 max-w-xl">
          {options.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-4 px-5 py-4 rounded cursor-pointer transition-colors"
              style={{ border: opt.selected ? "2px solid var(--mvmt-text-primary)" : "1px solid var(--mvmt-border-medium)" }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-[var(--mvmt-text-primary)]"
              >
                {opt.selected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--mvmt-text-primary)]" />}
              </div>
              <span className="text-sm text-mvmt-text-primary">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="flex items-center justify-between px-6 sm:px-12 lg:px-24 py-4 border-t border-t-mvmt-border-light"
      >
        <button className="text-xs flex items-center gap-1 text-mvmt-text-secondary">
          ⚑ Report issue
        </button>
        <div className="flex gap-3">
          <button
            className="px-5 py-2 text-sm font-medium rounded text-mvmt-text-primary border border-mvmt-border-medium"
          >
            Skip
          </button>
          <button
            className="px-5 py-2 text-sm font-semibold rounded text-mvmt-cta-text bg-mvmt-cta-bg"
          >
            Submit answer
          </button>
        </div>
      </div>
    </section>
  );
}

AssessmentsUdemyQuiz.displayName = "AssessmentsUdemyQuiz";
