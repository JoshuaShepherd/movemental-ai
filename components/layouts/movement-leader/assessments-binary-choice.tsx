"use client";

import { cn } from "@/lib/utils";

interface AssessmentsBinaryChoiceProps {
  className?: string;
}

export function AssessmentsBinaryChoice({ className }: AssessmentsBinaryChoiceProps) {
  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
    >
      {/* Back Arrow */}
      <button
        className="absolute top-6 left-6 text-lg"
        style={{ color: "var(--mvmt-text-primary)" }}
      >
        ‹
      </button>

      {/* Question */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 max-w-xl px-6"
        style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
      >
        Has this resource helped you multiply leaders?
      </h1>

      {/* Binary Cards */}
      <div className="flex gap-6">
        {[
          { label: "Yes", icon: "✓" },
          { label: "No", icon: "✕" },
        ].map((option) => (
          <button
            key={option.label}
            className="flex flex-col items-center w-48 sm:w-56 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ border: "1px solid var(--mvmt-border-light)", boxShadow: "var(--mvmt-shadow-sm)" }}
          >
            <div
              className="w-full aspect-square flex items-center justify-center"
              style={{ backgroundColor: "var(--assess-card-muted)" }}
            >
              <span className="text-5xl font-light" style={{ color: "var(--mvmt-text-secondary)" }}>{option.icon}</span>
            </div>
            <div className="w-full py-4 text-center" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
              <span className="text-base font-medium" style={{ color: "var(--mvmt-text-primary)" }}>{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

AssessmentsBinaryChoice.displayName = "AssessmentsBinaryChoice";
