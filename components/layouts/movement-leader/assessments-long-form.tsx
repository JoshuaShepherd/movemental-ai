"use client";

import { cn } from "@/lib/utils";

interface AssessmentsLongFormProps {
  className?: string;
}

export function AssessmentsLongForm({ className }: AssessmentsLongFormProps) {
  const segments = 8;
  const completed = 5;
  const options = [
    "Local Church Pastor",
    "Church Planter",
    "Mission Organization Leader",
    "Para-church Ministry",
    "Marketplace Leader",
    "Seminary/Training",
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
    >
      {/* Brand top bar */}
      <div className="text-center py-4" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
        <span className="text-sm font-bold tracking-wide" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Movemental
        </span>
      </div>

      {/* Navigation + Section */}
      <div className="flex items-center gap-4 px-6 sm:px-8 py-3" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
        <button className="text-lg" style={{ color: "var(--mvmt-text-primary)" }}>‹</button>
        <span className="text-xs font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>Your Ministry</span>
      </div>

      {/* Segmented Progress */}
      <div className="flex gap-1 px-6 sm:px-8 pt-3 pb-6">
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full"
            style={{ backgroundColor: i < completed ? "var(--assess-progress-fill)" : "var(--mvmt-border-light)" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 sm:px-8 lg:px-12 max-w-2xl">
        <p className="text-xs mb-2" style={{ color: "var(--mvmt-text-muted)" }}>9 of 21</p>
        <h2
          className="text-xl sm:text-2xl font-bold mb-2"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          What is your primary ministry context?
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
          We ask this question to all movement leaders to ensure that we provide you with the most relevant resources and assessments for your context.
        </p>

        <div className="space-y-3 pb-8">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-4 px-5 py-5 rounded-xl cursor-pointer transition-colors"
              style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                style={{ borderColor: "var(--mvmt-border-medium)" }}
              />
              <span className="text-sm" style={{ color: "var(--mvmt-text-primary)" }}>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

AssessmentsLongForm.displayName = "AssessmentsLongForm";
