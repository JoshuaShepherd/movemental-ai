"use client";

import { cn } from "@/lib/utils";

interface AssessmentsScaleOptionsProps {
  className?: string;
}

export function AssessmentsScaleOptions({ className }: AssessmentsScaleOptionsProps) {
  const steps = [
    { label: "Choose a plan", done: true },
    { label: "Review plan changes", done: true },
    { label: "Feedback survey", done: false, active: true },
    { label: "Confirmation", done: false },
  ];

  const options = [
    { key: "A", label: "Definitely" },
    { key: "B", label: "Probably" },
    { key: "C", label: "Undecided" },
    { key: "D", label: "Probably not" },
    { key: "E", label: "Definitely not" },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col bg-mvmt-surface-light", className)}
    >
      {/* Top Steps Bar */}
      <div className="flex items-center justify-center gap-8 px-6 py-4 border-b border-b-mvmt-border-light">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{
                backgroundColor: step.done ? "var(--mvmt-accent)" : "transparent",
                color: step.done ? "var(--mvmt-cta-text)" : "var(--mvmt-text-muted)",
                border: step.done ? "none" : "1.5px solid var(--mvmt-border-medium)",
              }}
            >
              {step.done ? "✓" : step.active ? (i + 1) : ""}
            </div>
            <span className="text-xs font-medium" style={{ color: step.active ? "var(--mvmt-text-primary)" : "var(--mvmt-text-muted)" }}>
              {step.label}
            </span>
            {i < steps.length - 1 && <div className="w-12 h-px ml-2 bg-mvmt-border-light" />}
          </div>
        ))}
      </div>

      {/* Close + Back */}
      <div className="flex items-center justify-between px-8 py-4">
        <button className="text-sm font-medium flex items-center gap-1 text-mvmt-text-secondary">
          ← Back
        </button>
        <p className="text-base font-semibold text-mvmt-text-primary">Feedback Survey</p>
        <button className="text-lg text-mvmt-text-muted">✕</button>
      </div>

      <div className="border-t border-t-mvmt-border-light"  />

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 max-w-3xl">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-sm font-medium text-mvmt-accent">1 →</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold leading-snug text-mvmt-text-primary font-mvmt-heading">
              Will you continue using this discipleship pathway <span className="font-bold">with an alternative tool</span>?*
            </h2>
            <p className="text-sm mt-1 text-mvmt-text-secondary">Now or in the future</p>
          </div>
        </div>

        <div className="mt-8 space-y-2.5 max-w-sm">
          {options.map((opt) => (
            <button
              key={opt.key}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium transition-colors text-mvmt-text-primary bg-[var(--assess-pill-bg)]"
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-mvmt-text-primary bg-[var(--assess-pill-key-bg)]"
              >
                {opt.key}
              </span>
              {opt.label}
            </button>
          ))}
        </div>

        <button
          className="mt-6 px-6 py-2 rounded-md text-sm font-bold w-fit text-mvmt-cta-text bg-mvmt-cta-bg"
        >
          OK
        </button>
      </div>
    </section>
  );
}

AssessmentsScaleOptions.displayName = "AssessmentsScaleOptions";
