"use client";

import { cn } from "@/lib/utils";

interface AssessmentsProgressQuizProps {
  className?: string;
}

export function AssessmentsProgressQuiz({ className }: AssessmentsProgressQuizProps) {
  const steps = ["ABOUT YOU", "LEARN BASICS", "TEST KNOWLEDGE", "TAKE ACTION"];
  const options = [
    { label: "Consistent Prayer Support", selected: true },
    { label: "Local Church Partnership", selected: false },
    { label: "Leadership Pipeline", selected: false },
    { label: "Community Engagement Plan", selected: false },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
    >
      {/* Header */}
      <div className="px-6 sm:px-8 lg:px-12 pt-8 pb-6" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
        <h2 className="text-lg font-bold mb-1" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Movement Best Practices
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--mvmt-text-secondary)" }}>
          Learn how to build and sustain a healthy multiplication movement.
        </p>
        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-2xl">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-0 flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: i < 2 ? "var(--mvmt-accent)" : "transparent",
                    color: i < 2 ? "var(--mvmt-cta-text)" : "var(--mvmt-text-muted)",
                    border: i >= 2 ? "2px solid var(--mvmt-border-medium)" : "none",
                  }}
                >
                  {i < 2 ? "✓" : ""}
                </div>
                <span className="text-[10px] font-semibold tracking-wider mt-1 whitespace-nowrap" style={{ color: i < 2 ? "var(--mvmt-text-primary)" : "var(--mvmt-text-muted)" }}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2" style={{ backgroundColor: i < 1 ? "var(--mvmt-accent)" : "var(--mvmt-border-light)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 px-6 sm:px-8 lg:px-12 py-10 max-w-3xl mx-auto w-full">
        <p className="text-sm mb-2" style={{ color: "var(--mvmt-text-secondary)" }}>
          Test your movement knowledge with this quick quiz.
        </p>
        <p className="text-xs mb-4 font-medium" style={{ color: "var(--mvmt-text-muted)" }}>Question 1 of 3</p>
        <h3
          className="text-xl md:text-2xl font-semibold leading-snug mb-8"
          style={{ color: "var(--mvmt-accent)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          When looking to multiply leaders in your movement you need to collect _______ to help build the trust you need to create lasting discipleship relationships.
        </h3>
        <div className="space-y-3">
          {options.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-4 px-5 py-4 rounded-md cursor-pointer transition-colors"
              style={{
                backgroundColor: opt.selected ? "var(--assess-option-selected-bg)" : "var(--mvmt-surface-light)",
                border: opt.selected ? "2px solid var(--mvmt-accent)" : "1px solid var(--mvmt-border-light)",
              }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: "var(--mvmt-accent)" }}
              >
                {opt.selected && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--mvmt-accent)" }} />}
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>{opt.label}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <button
            className="px-6 py-3 rounded-md text-sm font-semibold transition-colors"
            style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)", borderRadius: "var(--mvmt-radius-md)" }}
          >
            See Where You Stand
          </button>
        </div>
      </div>
    </section>
  );
}

AssessmentsProgressQuiz.displayName = "AssessmentsProgressQuiz";
