"use client";

import { cn } from "@/lib/utils";

interface AboutStatsHeroProps {
  className?: string;
}

const stats = [
  { value: "500+", label: "Communities Planted" },
  { value: "6", label: "Continents Reached" },
  { value: "47", label: "Churches in One Year" },
  { value: "10K+", label: "Leaders Equipped" },
];

export function AboutStatsHero({ className }: AboutStatsHeroProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Dark Hero with Stats */}
      <div className="px-6 sm:px-12 lg:px-20 py-28 bg-[var(--mvmt-surface-dark)]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[var(--mvmt-on-dark-muted)]">
            About Movemental
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 max-w-3xl text-[var(--mvmt-on-dark-primary)] font-mvmt-heading">
            Built by practitioners, for practitioners.
          </h1>
          <p className="text-base leading-relaxed max-w-2xl mb-16 text-[var(--mvmt-on-dark-secondary)]">
            We don&rsquo;t just study movements — we start them. Movemental is the platform we wished we had when we were in the field.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[var(--mvmt-border-dark)]">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold mb-1 text-[var(--mvmt-on-dark-primary)]">
                  {s.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-[var(--mvmt-on-dark-muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Light Body */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 bg-[var(--mvmt-surface-light)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-[var(--mvmt-text-primary)] font-mvmt-heading">
            Why we built this
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--mvmt-text-secondary)]">
            <p>
              Movement leaders are some of the most resourceful people on the planet — but they shouldn&rsquo;t have to do everything from scratch. We built Movemental to give practitioners access to proven frameworks, curated content, and a network of peers who understand the work.
            </p>
            <p>
              Every tool on this platform was shaped by field experience. Every piece of content was vetted by practitioners. And every feature was designed to save leaders time so they can focus on what matters: the people in front of them.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-[var(--mvmt-border-light)] bg-[var(--mvmt-surface-light-muted)]">
        <p className="text-sm text-[var(--mvmt-text-secondary)]">
          Ready to explore the platform?
        </p>
        <a
          href="/pricing"
          className="px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-colors text-[var(--mvmt-cta-text)] bg-[var(--mvmt-surface-dark)] hover:opacity-90"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

AboutStatsHero.displayName = "AboutStatsHero";
