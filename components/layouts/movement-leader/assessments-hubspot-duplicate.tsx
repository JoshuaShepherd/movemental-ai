"use client";

import { cn } from "@/lib/utils";

interface AssessmentsHubspotDuplicateProps {
  className?: string;
}

export function AssessmentsHubspotDuplicate({ className }: AssessmentsHubspotDuplicateProps) {
  const steps = ["TELL US ABOUT YOU", "LEARN THE BASICS", "TEST YOUR KNOWLEDGE", "TAKE ACTION"];
  const options = [
    { label: "Verifiable Permission", selected: true },
    { label: "Email Address", selected: false },
    { label: "Email Domain", selected: false },
    { label: "Verifiable business name", selected: false },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col bg-mvmt-surface-light", className)}
    >
      {/* Header Card */}
      <div className="px-8 sm:px-12 lg:px-16 pt-8 pb-6 border-b border-b-mvmt-border-light">
        <h2 className="text-lg font-bold mb-1 text-mvmt-text-primary font-mvmt-heading">
          Discipleship Foundations
        </h2>
        <p className="text-sm mb-6 text-mvmt-text-secondary">
          Learn how to build and maintain a strong disciple-making reputation.
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-3xl">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center flex-1">
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
                <span className="text-2xs font-bold tracking-wider mt-1.5 text-center whitespace-nowrap" style={{ color: i < 2 ? "var(--mvmt-text-primary)" : "var(--mvmt-text-muted)" }}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-3" style={{ backgroundColor: i < 1 ? "var(--mvmt-accent)" : "var(--mvmt-border-light)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-8 sm:px-12 lg:px-16 py-10 max-w-3xl">
        <p className="text-sm mb-2 text-mvmt-text-secondary">
          Test your discipleship knowledge with this quick quiz.
        </p>
        <p className="text-xs font-medium mb-4 text-mvmt-text-muted">Question 1 of 3</p>
        <h3
          className="text-xl md:text-2xl font-semibold leading-snug mb-8 text-mvmt-accent font-mvmt-heading"
        >
          When looking to send leaders to your network you need to collect _______ to help build the trust you need to create lasting relationships with your disciples.
        </h3>

        <div className="space-y-3 max-w-2xl">
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
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-mvmt-accent"
              >
                {opt.selected && <div className="w-2.5 h-2.5 rounded-full bg-mvmt-accent"  />}
              </div>
              <span className="text-sm font-medium text-mvmt-text-primary">{opt.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            className="px-6 py-3 rounded-md text-sm font-semibold text-mvmt-cta-text bg-mvmt-cta-bg"
          >
            Check Answer
          </button>
        </div>
      </div>
    </section>
  );
}

AssessmentsHubspotDuplicate.displayName = "AssessmentsHubspotDuplicate";
