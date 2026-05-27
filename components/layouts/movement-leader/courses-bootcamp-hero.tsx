"use client";

import { cn } from "@/lib/utils";

interface CoursesBootcampHeroProps {
  className?: string;
}

const stats = [
  { value: "8", label: "Weeks of Live Sessions" },
  { value: "Expert", label: "Coaching Guidance" },
  { value: "4+", label: "Ministry-Ready Projects" },
  { value: "1", label: "Year of Network Access" },
];

export function CoursesBootcampHero({ className }: CoursesBootcampHeroProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark", className)}>
      {/* Hero */}
      <div className="relative px-6 pt-20 pb-32">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          {/* Left text */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-mvmt-accent mb-4">Includes Network Access</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-on-dark-primary font-mvmt-heading leading-tight mb-6">
              Practical Sending<br />Church Leadership<br />for Beginners
            </h1>
            <p className="text-base text-mvmt-on-dark-secondary leading-relaxed mb-8 max-w-lg">
              Learn multiplication strategy using real-world frameworks and tools — no prior
              experience needed. Perfect for new pastors and aspiring movement leaders ready
              to build a sending culture.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-mvmt-surface-dark-elevated" />
              <div>
                <p className="text-sm font-bold text-mvmt-on-dark-primary">Brad Brisco</p>
                <p className="text-xs text-mvmt-on-dark-muted">Author, Church Planting Strategist</p>
              </div>
            </div>
          </div>

          {/* Price card */}
          <div className="w-full lg:w-80 rounded-xl bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark p-6">
            <p className="text-xs text-mvmt-accent mb-2 font-bold">Limited spots available</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-mvmt-on-dark-primary">$199</span>
              <span className="text-lg text-mvmt-on-dark-muted line-through">$299</span>
            </div>
            <p className="text-xs text-mvmt-on-dark-muted mb-6">Starts March 15, 2026 · 2 sessions/week</p>
            <button className="w-full py-3 rounded-lg bg-mvmt-cta-bg text-mvmt-cta-text font-bold text-sm mb-3">
              Reserve your seat now
            </button>
            <button className="w-full py-3 rounded-lg border border-mvmt-border-on-dark text-mvmt-on-dark-secondary font-medium text-sm">
              Download brochure
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-mvmt-accent">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-mvmt-cta-text">{s.value}</p>
              <p className="text-xs font-medium text-mvmt-cta-text/80 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

CoursesBootcampHero.displayName = "CoursesBootcampHero";
