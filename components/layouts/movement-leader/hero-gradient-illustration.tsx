"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroGradientIllustrationProps {
  className?: string;
}

/**
 * Gradient Illustration Hero — Based on GitLab TeamOps reference
 * Light top section with blue gradient band, headline left, line illustrations right
 */
export function HeroGradientIllustration({ className }: HeroGradientIllustrationProps) {
  return (
    <section className={cn("relative w-full overflow-hidden bg-mvmt-surface-light", className)} >
      {/* Top announcement bar */}
      <div
        className="py-2 text-center text-sm text-mvmt-cta-text bg-mvmt-accent"
      >
        Movemental named in Top 10 Leader Development Platforms for 2026.{" "}
        <Link href="/about" className="underline font-medium">
          Read the report &rarr;
        </Link>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <p
              className="text-sm font-medium mb-2 text-mvmt-accent"
            >
              TeamOps ✦
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading"
            >
              Stay Connected. Stay Productive.
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md text-mvmt-text-secondary">
              Redefining teamwork for the modern movement. Collaborate with leaders across cities, networks, and continents.
            </p>
            <div className="mt-8">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors text-mvmt-text-primary rounded-mvmt-md"
                style={{ borderColor: "var(--mvmt-text-primary)" }}
              >
                Learn How
              </Link>
            </div>
          </div>

          {/* Right — Illustration placeholder (line art circles) */}
          <div className="hidden md:flex items-center justify-center relative h-80">
            <div className="absolute w-64 h-64 rounded-full border-2" style={{ borderColor: "var(--mvmt-border-light)" }} />
            <div className="absolute w-48 h-48 rounded-full border-2 -top-4 -right-4" style={{ borderColor: "var(--mvmt-accent)" }} />
            <div className="absolute w-32 h-32 rounded-full border-2 top-12 right-12" style={{ borderColor: "var(--mvmt-border-medium)" }} />
            {/* People placeholders */}
            <div
              className="absolute top-8 left-16 w-16 h-16 rounded-lg flex items-center justify-center text-xs font-bold text-mvmt-text-primary bg-mvmt-surface-light-muted"
            >
              📚
            </div>
            <div
              className="absolute bottom-12 right-8 w-16 h-16 rounded-lg flex items-center justify-center text-xs font-bold text-mvmt-text-primary bg-mvmt-surface-light-muted"
            >
              🎓
            </div>
            <div
              className="absolute top-1/2 right-1/3 w-16 h-16 rounded-lg flex items-center justify-center text-xs font-bold text-mvmt-text-primary bg-mvmt-surface-light-muted"
            >
              🌍
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroGradientIllustration.displayName = "HeroGradientIllustration";
