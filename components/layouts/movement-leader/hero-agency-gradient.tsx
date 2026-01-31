"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroAgencyGradientProps {
  className?: string;
}

/**
 * Agency Gradient Hero — Based on Framer for Agencies reference
 * Bold blue/purple gradient background, split layout with headline left and floating UI preview right
 */
export function HeroAgencyGradient({ className }: HeroAgencyGradientProps) {
  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden bg-mvmt-gradient-hero-brand", className)}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 border border-mvmt-border-on-dark rounded-full" />
        <div className="absolute bottom-20 right-40 w-40 h-40 border border-mvmt-border-on-dark rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-mvmt-border-on-dark rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <p
              className="text-sm font-medium uppercase tracking-wider mb-4 text-mvmt-on-dark-secondary"
            >
              Movemental for Leaders
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-mvmt-on-dark-primary font-mvmt-heading"
            >
              Equip every leader. Reach every nation.
            </h1>
            <p
              className="mt-6 text-lg max-w-lg leading-relaxed text-mvmt-on-dark-secondary"
            >
              Scale your movement with books, courses, assessments, and
              AI-powered coaching. Leaders like Brad Brisco, Alan Hirsch, and
              Dave Ferguson trust this platform to multiply impact globally.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/fit-check"
                className="inline-block px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-colors rounded-mvmt-md bg-mvmt-on-dark-primary text-mvmt-surface-dark"
                
              >
                Start for Free
              </Link>
              <Link
                href="/about"
                className="inline-block px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-colors border text-mvmt-on-dark-primary rounded-mvmt-md border-mvmt-border-on-dark-medium"
                
              >
                Learn More &rsaquo;
              </Link>
            </div>
          </div>

          {/* Right — Floating UI Cards */}
          <div className="hidden md:block relative">
            <div
              className="rounded-lg p-6 shadow-xl bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-mvmt-cta-text bg-mvmt-accent"
                >
                  BB
                </div>
                <div>
                  <p className="text-sm font-medium text-mvmt-on-dark-primary">Brad Brisco</p>
                  <p className="text-xs text-mvmt-on-dark-muted">Movement Catalyst</p>
                </div>
              </div>
              <div className="space-y-3">
                {["Books & Resources", "Online Courses", "Assessments", "AI Coaching"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-md bg-mvmt-surface-dark border border-mvmt-border-on-dark"
                  >
                    <div className="w-2 h-2 rounded-full bg-mvmt-accent"  />
                    <span className="text-sm text-mvmt-on-dark-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full text-xs font-bold shadow-lg text-mvmt-cta-text bg-mvmt-accent"
            >
              Leader
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroAgencyGradient.displayName = "HeroAgencyGradient";
