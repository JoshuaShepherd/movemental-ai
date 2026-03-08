"use client";

import { cn } from "@/lib/utils";

interface AssessmentsMoodGradientProps {
  className?: string;
}

export function AssessmentsMoodGradient({ className }: AssessmentsMoodGradientProps) {
  const steps = [
    { label: "Check In", active: true },
    { label: "Assess Skills", active: false },
    { label: "Get Your Plan", active: false },
  ];

  const moods = [
    { label: "Struggling", icon: "🌧️" },
    { label: "Growing", icon: "🌤️" },
    { label: "Thriving", icon: "⛅" },
    { label: "Multiplying", icon: "☀️" },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-mvmt-gradient-hero-brand", className)}
    >
      {/* Decorative cloud shapes */}
      <div className="absolute top-16 right-20 w-20 h-8 rounded-full opacity-20 bg-mvmt-on-dark-primary" />
      <div className="absolute top-24 right-32 w-12 h-5 rounded-full opacity-15 bg-mvmt-on-dark-primary" />

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: step.active ? "var(--mvmt-on-dark-primary)" : "var(--mvmt-on-dark-muted)" }}
            />
            <span className="text-xs font-medium" style={{ color: step.active ? "var(--mvmt-on-dark-primary)" : "var(--mvmt-on-dark-muted)" }}>
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span className="text-xs mx-1 text-mvmt-on-dark-muted">•</span>
            )}
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-[var(--assess-close-bg)]"
      >
        <span className="text-mvmt-on-dark-primary">✕</span>
      </button>

      {/* Content */}
      <p className="text-sm mb-2 text-mvmt-on-dark-secondary font-mvmt-body">
        Before we get started...
      </p>
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-mvmt-on-dark-primary font-mvmt-heading"
      >
        How is your discipleship<br />journey going?
      </h1>

      {/* Mood Cards */}
      <div className="flex gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl cursor-pointer transition-transform hover:scale-105 bg-[var(--assess-mood-card-bg)]"
          >
            <span className="text-3xl mb-2">{mood.icon}</span>
            <span className="text-xs font-medium text-mvmt-on-dark-primary">{mood.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

AssessmentsMoodGradient.displayName = "AssessmentsMoodGradient";
