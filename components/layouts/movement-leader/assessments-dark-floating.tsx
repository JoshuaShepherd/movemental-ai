"use client";

import { cn } from "@/lib/utils";

interface AssessmentsDarkFloatingProps {
  className?: string;
}

export function AssessmentsDarkFloating({ className }: AssessmentsDarkFloatingProps) {
  const options = [
    { key: "A", label: "Wide-ranging, uncluttered space to think" },
    { key: "B", label: "Dense clusters of disciples and leaders" },
    { key: "C", label: "Organic communities. Lots of organic communities" },
    { key: "D", label: "Award-winning training programs and mentors" },
    { key: "E", label: "Sustainability — the affordable growth, of course" },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col overflow-hidden bg-mvmt-surface-dark", className)}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-5">
        <span className="text-sm font-bold text-mvmt-on-dark-primary">Movemental</span>
        <span className="text-sm font-semibold tracking-wider text-mvmt-accent font-mvmt-heading">
          Movement Leadership Index
        </span>
        <div className="w-16" />
      </div>

      {/* Floating Cards Stack */}
      <div className="flex-1 flex items-center justify-center relative px-6">
        {/* Background shadow cards */}
        <div
          className="absolute w-80 sm:w-96 h-[28rem] rounded-xl -rotate-6 -translate-x-4 bg-[var(--assess-float-card-1)]"
        />
        <div
          className="absolute w-80 sm:w-96 h-[28rem] rounded-xl rotate-3 translate-x-4 translate-y-2 bg-[var(--assess-float-card-2)]"
        />
        {/* Visible right edge card */}
        <div
          className="absolute right-8 sm:right-16 w-20 h-[28rem] rounded-xl rotate-6 bg-[var(--assess-float-card-3)]"
        />

        {/* Main card */}
        <div
          className="relative z-10 w-80 sm:w-96 rounded-xl p-8 bg-mvmt-surface-light shadow-mvmt-lg"
        >
          <p className="text-sm leading-relaxed mb-6 text-mvmt-text-primary font-mvmt-body">
            Say that you were going to launch a movement in a new city. What would you be most excited for?
          </p>

          <div className="space-y-2.5">
            {options.map((opt) => (
              <div key={opt.key} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-mvmt-text-secondary border-[1.5px] border-[var(--mvmt-border-medium)]"
                >
                  {opt.key}
                </span>
                <span className="text-sm leading-snug text-mvmt-text-primary">{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-end px-6 sm:px-8 py-4">
        <button className="text-xs font-medium text-mvmt-on-dark-muted">
          Share this question
        </button>
      </div>
    </section>
  );
}

AssessmentsDarkFloating.displayName = "AssessmentsDarkFloating";
