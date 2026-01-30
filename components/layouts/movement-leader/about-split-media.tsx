"use client";

import { cn } from "@/lib/utils";

interface AboutSplitMediaProps {
  className?: string;
}

const sections = [
  {
    label: "Our Origin",
    title: "Started in the field, not the boardroom",
    body: "Movemental began as a practitioner's notebook — frameworks scribbled between church planting sessions, patterns observed across dozens of multiplication movements. We turned those notes into a platform because we believe every leader deserves access to what works.",
    align: "left" as const,
  },
  {
    label: "Our Approach",
    title: "Research meets practice",
    body: "We don't publish theory for theory's sake. Every framework on Movemental has been tested in the field by practitioners, refined through peer review, and validated by measurable outcomes. If it doesn't work in real communities, it doesn't make the cut.",
    align: "right" as const,
  },
  {
    label: "Our Platform",
    title: "AI-powered tools for movement leaders",
    body: "From personalized assessments to curated content libraries, Movemental uses AI to surface exactly what leaders need at each stage of their journey. Think of it as a co-pilot for movement work — always available, never prescriptive.",
    align: "left" as const,
  },
];

export function AboutSplitMedia({ className }: AboutSplitMediaProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Hero */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 text-center bg-[var(--mvmt-surface-light)]">
        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[var(--mvmt-accent)]">
          About
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto text-[var(--mvmt-text-primary)] font-mvmt-heading">
          Building the future of movement leadership
        </h1>
      </div>

      {/* Alternating Sections */}
      {sections.map((s, i) => (
        <div
          key={s.title}
          className={cn(
            "grid md:grid-cols-2 min-h-[400px]",
            i % 2 === 0 ? "" : "md:direction-rtl"
          )}
        >
          {/* Text */}
          <div
            className={cn(
              "flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16",
              i % 2 === 0 ? "md:order-1" : "md:order-2",
              "bg-[var(--mvmt-surface-light)]"
            )}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3 text-[var(--mvmt-accent)]">
              {s.label}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--mvmt-text-primary)] font-mvmt-heading">
              {s.title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--mvmt-text-secondary)]">
              {s.body}
            </p>
          </div>

          {/* Image Placeholder */}
          <div
            className={cn(
              "flex items-center justify-center min-h-[300px]",
              i % 2 === 0 ? "md:order-2" : "md:order-1",
              "bg-[var(--mvmt-surface-light-muted)]"
            )}
          >
            <div className="text-center px-8">
              <div className="w-20 h-20 rounded-lg mx-auto mb-4 flex items-center justify-center bg-[var(--mvmt-surface-dark)]">
                <span className="text-2xl font-bold text-[var(--mvmt-on-dark-primary)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs uppercase tracking-wider text-[var(--mvmt-text-muted)]">
                Image Placeholder
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="px-6 sm:px-12 lg:px-20 py-12 text-center border-t border-[var(--mvmt-border-light)] bg-[var(--mvmt-surface-light)]">
        <a
          href="/pricing"
          className="inline-block px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-colors text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)] hover:bg-[var(--mvmt-accent-hover)]"
        >
          Start Your Journey
        </a>
      </div>
    </section>
  );
}

AboutSplitMedia.displayName = "AboutSplitMedia";
