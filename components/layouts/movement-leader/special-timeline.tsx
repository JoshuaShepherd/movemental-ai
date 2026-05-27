"use client";

import { cn } from "@/lib/utils";

interface SpecialTimelineProps {
  className?: string;
}

const milestones = [
  { year: "2005", icon: "🔥", label: "Forge Founded", sub: "Alan Hirsch launches Forge" },
  { year: "2007", icon: "🌊", label: "V3 Movement", sub: "Mike Breen & V3 Church" },
  { year: "2010", icon: "🚀", label: "Exponential Launch", sub: "Dave Ferguson & Exponential" },
  { year: "2014", icon: "🌍", label: "Missio Network", sub: "Neil Cole & global mission" },
  { year: "2018", icon: "🌐", label: "NewThing Global", sub: "Brad Brisco & NewThing" },
  { year: "2023", icon: "⚡", label: "Today", sub: "Saturate & 3DM convergence" },
];

const growthEvents = [
  { label: "First Cohort", sub: "12 leaders" },
  { label: "100 Leaders", sub: "Across 5 networks" },
  { label: "Global Expansion", sub: "20+ countries" },
  { label: "1000 Churches", sub: "Movement milestone" },
];

export function SpecialTimeline({ className }: SpecialTimelineProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[80vh] flex flex-col py-20 px-6 sm:px-12 lg:px-16 bg-mvmt-surface-light",
        className
      )}
    >
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold font-mvmt-heading text-mvmt-text-primary mb-16 max-w-2xl">
        Pioneering movements along the way.
      </h2>

      {/* Primary timeline */}
      <div className="relative flex flex-row overflow-x-auto pb-8 gap-12 sm:gap-16 items-start">
        {/* Horizontal line */}
        <div className="absolute top-[4.5rem] left-0 right-0 h-px bg-mvmt-border-light" />

        {milestones.map((m) => (
          <div key={m.year} className="relative flex flex-col items-center min-w-[120px] shrink-0">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-mvmt-surface-light-muted flex items-center justify-center mb-3">
              <span className="text-lg">{m.icon}</span>
            </div>
            {/* Dot on line */}
            <div className="w-3 h-3 rounded-full bg-mvmt-accent mb-3" />
            {/* Year */}
            <span className="text-mvmt-accent font-bold text-sm mb-1">{m.year}</span>
            {/* Label */}
            <span className="text-mvmt-text-primary text-sm font-medium text-center">{m.label}</span>
            {/* Sublabel */}
            <span className="text-mvmt-text-secondary text-xs text-center mt-0.5">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Growth events row */}
      <div className="mt-12 flex flex-row overflow-x-auto gap-10 sm:gap-14">
        {growthEvents.map((e) => (
          <div key={e.label} className="flex flex-col items-center min-w-[110px] shrink-0">
            <div className="w-3 h-3 rounded-full bg-mvmt-accent mb-2" />
            <span className="text-mvmt-text-primary text-sm font-medium text-center">{e.label}</span>
            <span className="text-mvmt-text-secondary text-xs text-center mt-0.5">{e.sub}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20">
        <h3 className="text-2xl sm:text-3xl font-bold font-mvmt-heading text-mvmt-text-primary">
          Come <span className="text-mvmt-accent">build movements</span> with us
        </h3>
      </div>
    </section>
  );
}

SpecialTimeline.displayName = "SpecialTimeline";
