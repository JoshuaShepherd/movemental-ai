"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoursesQuizProgressProps {
  className?: string;
}

const questions = [
  {
    question: "Which of the following best describes a sending church?",
    options: [
      "A church focused on growing attendance and programs",
      "A church that identifies, develops, and deploys leaders for multiplication",
      "A church that sends financial support to missionaries",
      "A church with multiple campus locations",
    ],
    correct: 1,
  },
];

export function CoursesQuizProgress({ className }: CoursesQuizProgressProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const currentQ = 2;
  const totalQ = 10;

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light flex flex-col", className)}>
      {/* Progress bar */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button className="text-mvmt-text-muted text-lg">✕</button>
        <div className="flex-1 flex gap-1">
          {Array.from({ length: totalQ }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full",
                i < currentQ ? "bg-mvmt-accent" : "bg-mvmt-surface-light-muted"
              )}
            />
          ))}
        </div>
        <span className="text-xs text-mvmt-text-muted">{currentQ} / {totalQ}</span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full">
        <h2 className="text-xl font-bold text-mvmt-text-primary text-center mb-10">
          {questions[0].question}
        </h2>

        <div className="flex flex-col sm:flex-row gap-8 w-full items-start">
          {/* Visual placeholder */}
          <div className="w-full sm:w-1/2 aspect-[4/3] rounded-xl bg-mvmt-surface-light-muted border border-mvmt-border-light flex items-center justify-center">
            <span className="text-4xl">📊</span>
          </div>

          {/* Options */}
          <div className="w-full sm:w-1/2 space-y-3">
            {questions[0].options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors flex items-center gap-3",
                  selected === i
                    ? "border-mvmt-accent bg-mvmt-accent/5 text-mvmt-text-primary"
                    : "border-mvmt-border-light text-mvmt-text-secondary hover:border-mvmt-accent/50"
                )}
              >
                <span className="w-6 h-6 rounded-full border border-mvmt-border-light flex items-center justify-center text-xs font-bold text-mvmt-text-muted flex-shrink-0">
                  {i + 1}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 py-4 border-t border-t-mvmt-border-light flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-mvmt-accent flex items-center justify-center">
            <span className="text-sm font-bold text-mvmt-accent">27</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-mvmt-text-muted flex items-center gap-1">🚩 Report</button>
          <button className="px-6 py-2.5 rounded-lg bg-mvmt-cta-bg text-mvmt-cta-text text-sm font-bold">Continue</button>
        </div>
      </div>
    </section>
  );
}

CoursesQuizProgress.displayName = "CoursesQuizProgress";
