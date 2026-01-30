"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroPricingCardProps {
  className?: string;
}

/**
 * Pricing Card Hero — Based on Codecademy reference
 * Dark background, course/program details left, pricing card right with CTA
 */
export function HeroPricingCard({ className }: HeroPricingCardProps) {
  const stats = [
    { value: "8", label: "Weeks of Live Virtual Sessions" },
    { value: "Expert", label: "Practitioner Guidance" },
    { value: "4+", label: "Field-Ready Frameworks" },
    { value: "1", label: "Year of Platform Access" },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark", className)} >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — Course Details */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-3 text-mvmt-accent">
              Includes a year of Pro
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-mvmt-on-dark-primary font-mvmt-heading"
            >
              Practical Missional Community Design for Beginners
            </h1>
            <p className="mt-4 text-sm leading-relaxed max-w-md text-mvmt-on-dark-muted">
              Learn missional community design using proven frameworks and create
              thriving, multiplying communities — no prior experience needed.
              Perfect for new leaders ready to launch.
            </p>
            {/* Instructor */}
            <div className="mt-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-mvmt-cta-text bg-mvmt-accent"
              >
                BB
              </div>
              <div>
                <p className="text-sm font-medium text-mvmt-on-dark-primary">Brad Brisco</p>
                <p className="text-xs text-mvmt-on-dark-muted">Movement Catalyst &amp; Author</p>
              </div>
            </div>
          </div>

          {/* Right — Pricing Card */}
          <div
            className="rounded-xl p-8 shadow-xl bg-mvmt-surface-light border border-mvmt-border-light"
          >
            <p className="text-xs font-medium mb-1 text-mvmt-accent">
              Limited enrollment
            </p>
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-4xl font-bold text-mvmt-text-primary">Free</h2>
              <span className="text-lg line-through text-mvmt-text-muted">$450</span>
            </div>
            <p className="text-sm mb-1 text-mvmt-text-secondary">
              ✅ Starts March 2026 | 2 sessions per week
            </p>
            <div className="mt-6 space-y-3">
              <Link
                href="/fit-check"
                className="block w-full text-center px-6 py-3.5 text-sm font-semibold transition-colors text-mvmt-cta-text bg-mvmt-cta-bg rounded-mvmt-md"
              >
                Reserve your seat now
              </Link>
              <Link
                href="/about"
                className="block w-full text-center px-6 py-3.5 text-sm font-medium border transition-colors text-mvmt-text-secondary rounded-mvmt-md"
                style={{ borderColor: "var(--mvmt-border-light)" }}
              >
                Download brochure
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-mvmt-accent">{s.value}</p>
              <p className="text-xs uppercase tracking-wider mt-1 text-mvmt-on-dark-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

HeroPricingCard.displayName = "HeroPricingCard";
