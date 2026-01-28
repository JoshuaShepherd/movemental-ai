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
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      {/* Dark Header */}
      <div className="flex items-center justify-between px-6 py-3" style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold" style={{ color: "var(--mvmt-on-dark-primary)" }}>Movemental</span>
          <span className="text-xs" style={{ color: "var(--mvmt-on-dark-muted)" }}>|</span>
          <span className="text-xs" style={{ color: "var(--mvmt-on-dark-secondary)" }}>Church Planting 101</span>
        </div>
        <button
          className="px-4 py-1.5 text-xs font-medium rounded flex items-center gap-1"
          style={{ border: "1px solid var(--mvmt-border-on-dark-medium)", color: "var(--mvmt-on-dark-primary)" }}
        >
          ✕ Save and exit
        </button>
      </div>

      {/* Question Body */}
      <div className="flex-1 px-6 sm:px-12 lg:px-24 py-10 max-w-3xl">
        <p className="text-sm font-medium mb-3" style={{ color: "var(--mvmt-text-secondary)" }}>Question 2</p>
        <h2
          className="text-xl sm:text-2xl font-semibold leading-snug mb-2"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Which attribute would you prioritize first when launching a movement in a new context? Select all that apply.
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--mvmt-text-muted)" }}>Select the correct answer</p>

        <div className="space-y-3 max-w-xl">
          {options.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-4 px-5 py-4 rounded cursor-pointer transition-colors"
              style={{ border: opt.selected ? "2px solid var(--mvmt-text-primary)" : "1px solid var(--mvmt-border-medium)" }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: "var(--mvmt-text-primary)" }}
              >
                {opt.selected && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--mvmt-text-primary)" }} />}
              </div>
              <span className="text-sm" style={{ color: "var(--mvmt-text-primary)" }}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="flex items-center justify-between px-6 sm:px-12 lg:px-24 py-4"
        style={{ borderTop: "1px solid var(--mvmt-border-light)" }}
      >
        <button className="text-xs flex items-center gap-1" style={{ color: "var(--mvmt-text-secondary)" }}>
          ⚑ Report issue
        </button>
        <div className="flex gap-3">
          <button
            className="px-5 py-2 text-sm font-medium rounded"
            style={{ border: "1px solid var(--mvmt-border-medium)", color: "var(--mvmt-text-primary)" }}
          >
            Skip
          </button>
          <button
            className="px-5 py-2 text-sm font-semibold rounded"
            style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)" }}
          >
            Submit answer
          </button>
        </div>
      </div>
    </section>
  );
}

AssessmentsUdemyQuiz.displayName = "AssessmentsUdemyQuiz";
