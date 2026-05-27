"use client";

import { cn } from "@/lib/utils";

interface AboutTimelineStoryProps {
  className?: string;
}

const milestones = [
  { year: "2012", title: "The Spark", description: "Brad Brisco begins documenting reproducible patterns in missional community planting across North America." },
  { year: "2014", title: "First Network", description: "A network of 12 movement leaders forms, sharing frameworks and holding each other accountable to multiplication goals." },
  { year: "2016", title: "Record Year", description: "47 churches planted in a single year — setting records for organic multiplication in established denominations." },
  { year: "2019", title: "Exponential Debut", description: "Brad unveils two new frameworks at the Exponential Conference, integrating incarnational and attractional models for the first time." },
  { year: "2021", title: "Six Continents", description: "The movement scales internationally, with active missional communities on six continents and growing." },
  { year: "2024", title: "Movemental Launches", description: "The platform goes live — bringing AI-powered tools and curated content to movement leaders everywhere." },
];

export function AboutTimelineStory({ className }: AboutTimelineStoryProps) {
  return (
    <section className={cn("relative w-full min-h-screen", className)}>
      {/* Hero */}
      <div className="px-6 sm:px-12 lg:px-20 py-24 text-center bg-mvmt-surface-dark">
        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-mvmt-accent">
          Our Story
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto text-mvmt-on-dark-primary font-mvmt-heading">
          A decade of building movements
        </h1>
        <p className="text-base leading-relaxed max-w-2xl mx-auto text-mvmt-on-dark-secondary">
          From a handful of practitioners to a global platform — here&rsquo;s how we got here.
        </p>
      </div>

      {/* Timeline */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 bg-mvmt-surface-dark-elevated">
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-mvmt-border-dark" />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative pl-16 sm:pl-20">
                {/* Dot */}
                <div
                  className="absolute left-4 sm:left-6 top-1 w-4 h-4 rounded-full border-2 border-mvmt-accent"
                  style={{
                    background: i === milestones.length - 1 ? "var(--mvmt-accent)" : "var(--mvmt-surface-dark-elevated)",
                  }}
                />
                <p className="text-xs font-bold tracking-widest uppercase mb-1 text-mvmt-accent">
                  {m.year}
                </p>
                <h3 className="text-lg font-bold mb-2 text-mvmt-on-dark-primary">
                  {m.title}
                </h3>
                <p className="text-sm leading-relaxed text-mvmt-on-dark-secondary">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 sm:px-12 lg:px-20 py-12 text-center bg-mvmt-surface-dark">
        <p className="text-sm mb-4 text-mvmt-on-dark-secondary">
          Ready to be part of what&rsquo;s next?
        </p>
        <a
          href="/pricing"
          className="inline-block px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-colors text-mvmt-cta-text bg-mvmt-accent hover:bg-mvmt-accent-hover"
        >
          Join the Movement
        </a>
      </div>
    </section>
  );
}

AboutTimelineStory.displayName = "AboutTimelineStory";
