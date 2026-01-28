"use client";

import { cn } from "@/lib/utils";

interface AssessmentsAvatarSurveyProps {
  className?: string;
}

export function AssessmentsAvatarSurvey({ className }: AssessmentsAvatarSurveyProps) {
  const options = [
    "1–3 leaders",
    "4–10 leaders",
    "11–25 leaders",
    "26–50 leaders",
    "50+ leaders",
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <button className="text-lg" style={{ color: "var(--mvmt-text-primary)" }}>‹</button>
        <span className="text-sm" style={{ color: "var(--mvmt-text-muted)" }}>3 / 4</span>
        <button className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--mvmt-text-muted)" }}>Skip</button>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mt-4 mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold"
          style={{ backgroundColor: "var(--assess-avatar-bg)", color: "var(--mvmt-surface-light)" }}
        >
          ML
        </div>
      </div>

      {/* Question */}
      <h2
        className="text-xl sm:text-2xl font-bold text-center mb-8 px-6"
        style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
      >
        How many leaders are you<br />currently discipling?
      </h2>

      {/* Options */}
      <div className="space-y-3 px-6 max-w-md mx-auto w-full">
        {options.map((opt) => (
          <button
            key={opt}
            className="w-full py-3.5 px-5 rounded-lg text-sm font-medium text-left transition-colors"
            style={{ backgroundColor: "var(--assess-option-bg)", color: "var(--assess-option-text)" }}
          >
            {opt}
          </button>
        ))}
      </div>
    </section>
  );
}

AssessmentsAvatarSurvey.displayName = "AssessmentsAvatarSurvey";
