"use client";

import { cn } from "@/lib/utils";

interface AssessmentsTemplatePickerProps {
  className?: string;
}

export function AssessmentsTemplatePicker({ className }: AssessmentsTemplatePickerProps) {
  const assessmentTypes = [
    { title: "Leadership Style", subtitle: "Discover your approach", color: "var(--assess-card-1)" },
    { title: "Movement Readiness", subtitle: "Evaluate your team", color: "var(--assess-card-2)" },
    { title: "Discipleship Journey", subtitle: "Map your growth", color: "var(--assess-card-3)" },
    { title: "Church Planting", subtitle: "Assess your calling", color: "var(--assess-card-4)" },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 text-center">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Choose Your Assessment
        </h1>
        <p className="text-base md:text-lg mb-12 max-w-lg mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
          Select any assessment to get started. You can customize them however you&rsquo;d like later.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {assessmentTypes.map((item) => (
            <div
              key={item.title}
              className="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              style={{ border: "1px solid var(--mvmt-border-light)", boxShadow: "var(--mvmt-shadow-sm)" }}
            >
              <div className="aspect-[4/3] relative" style={{ backgroundColor: item.color }}>
                <div className="absolute inset-4 rounded" style={{ backgroundColor: "var(--mvmt-surface-light)", opacity: 0.85 }}>
                  <div className="p-3 space-y-2">
                    <div className="h-2 w-3/4 rounded-full" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
                    <div className="h-2 w-1/2 rounded-full" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
                    <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
                  </div>
                </div>
              </div>
              <div className="p-4 text-left" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--mvmt-text-secondary)" }}>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

AssessmentsTemplatePicker.displayName = "AssessmentsTemplatePicker";
