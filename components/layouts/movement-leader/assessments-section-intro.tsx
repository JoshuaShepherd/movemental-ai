"use client";

import { cn } from "@/lib/utils";

interface AssessmentsSectionIntroProps {
  className?: string;
}

export function AssessmentsSectionIntro({ className }: AssessmentsSectionIntroProps) {
  const segments = 8;
  const completed = 4;

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

      {/* Section label */}
      <div className="text-center pt-4 pb-2">
        <span className="text-xs font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>Your Leadership</span>
      </div>

      {/* Segmented Progress */}
      <div className="flex gap-1 px-16 sm:px-24 lg:px-32 mb-8">
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full"
            style={{ backgroundColor: i < completed ? "var(--assess-progress-fill)" : "var(--mvmt-border-light)" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 sm:px-8 lg:px-12 max-w-lg mx-auto" style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Let&rsquo;s talk about your leadership
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--mvmt-text-secondary)" }}>
          Next we&rsquo;ll cover your leadership background and experience as well as your growth areas.
        </p>

        {/* Illustration placeholder */}
        <div className="w-48 h-48 mb-8 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full" style={{ color: "var(--mvmt-text-primary)" }}>
            <rect x="30" y="10" width="60" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="35" y="18" width="50" height="6" rx="1" fill="var(--assess-progress-fill)" opacity="0.3" />
            <rect x="35" y="28" width="50" height="6" rx="1" fill="var(--assess-progress-fill)" opacity="0.3" />
            <rect x="50" y="42" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <polyline points="54,52 58,56 66,48" fill="none" stroke="var(--assess-progress-fill)" strokeWidth="2.5" />
            <path d="M55,90 Q50,100 45,110 Q55,108 60,100 Q65,108 75,110 Q70,100 65,90" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* CTA */}
        <button
          className="w-full max-w-sm py-4 rounded-lg text-base font-medium transition-colors"
          style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)" }}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

AssessmentsSectionIntro.displayName = "AssessmentsSectionIntro";
