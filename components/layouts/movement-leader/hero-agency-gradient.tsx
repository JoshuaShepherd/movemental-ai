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
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden", className)}
      style={{ background: "var(--mvmt-gradient-hero-brand)" }}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 border border-[var(--mvmt-border-on-dark)] rounded-full" />
        <div className="absolute bottom-20 right-40 w-40 h-40 border border-[var(--mvmt-border-on-dark)] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-[var(--mvmt-border-on-dark)] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <p
              className="text-sm font-medium uppercase tracking-wider mb-4"
              style={{ color: "var(--mvmt-on-dark-secondary)" }}
            >
              Movemental for Leaders
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
              style={{
                color: "var(--mvmt-on-dark-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Equip every leader. Reach every nation.
            </h1>
            <p
              className="mt-6 text-lg max-w-lg leading-relaxed"
              style={{ color: "var(--mvmt-on-dark-secondary)" }}
            >
              Scale your movement with books, courses, assessments, and
              AI-powered coaching. Leaders like Brad Brisco, Alan Hirsch, and
              Dave Ferguson trust this platform to multiply impact globally.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/fit-check"
                className="inline-block px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-on-dark-primary)",
                  color: "var(--mvmt-surface-dark)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Start for Free
              </Link>
              <Link
                href="/about"
                className="inline-block px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-colors border"
                style={{
                  borderColor: "var(--mvmt-border-on-dark-medium)",
                  color: "var(--mvmt-on-dark-primary)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Learn More &rsaquo;
              </Link>
            </div>
          </div>

          {/* Right — Floating UI Cards */}
          <div className="hidden md:block relative">
            <div
              className="rounded-lg p-6 shadow-xl"
              style={{
                backgroundColor: "var(--mvmt-surface-dark-elevated)",
                border: "1px solid var(--mvmt-border-on-dark)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: "var(--mvmt-accent)",
                    color: "var(--mvmt-cta-text)",
                  }}
                >
                  BB
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--mvmt-on-dark-primary)" }}>Brad Brisco</p>
                  <p className="text-xs" style={{ color: "var(--mvmt-on-dark-muted)" }}>Movement Catalyst</p>
                </div>
              </div>
              <div className="space-y-3">
                {["Books & Resources", "Online Courses", "Assessments", "AI Coaching"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-md"
                    style={{
                      backgroundColor: "var(--mvmt-surface-dark)",
                      border: "1px solid var(--mvmt-border-on-dark)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--mvmt-accent)" }} />
                    <span className="text-sm" style={{ color: "var(--mvmt-on-dark-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
              style={{
                backgroundColor: "var(--mvmt-accent)",
                color: "var(--mvmt-cta-text)",
              }}
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
