"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CtaGradientSplitProps {
  className?: string;
}

/**
 * Gradient background CTA with split layout — bold headline left,
 * feature bullets + button right. Warm gradient overlay.
 */
export function CtaGradientSplit({ className }: CtaGradientSplitProps) {
  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <div className="bg-mvmt-surface-dark py-20 px-6 sm:px-12 lg:px-16" style={{ background: "var(--mvmt-gradient-hero-brand, linear-gradient(135deg, var(--mvmt-surface-dark) 0%, var(--mvmt-surface-dark-elevated) 100%))" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: headline */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-mvmt-on-dark-primary font-mvmt-heading">
              Ready to start<br />multiplying?
            </h2>
            <p className="mt-4 text-lg text-mvmt-on-dark-secondary">
              Join thousands of movement leaders equipping the next generation.
            </p>
          </div>

          {/* Right: features + CTA */}
          <div className="rounded-xl p-8 bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark">
            <ul className="space-y-4 mb-8">
              {[
                "Unlimited courses and assessments",
                "AI-powered coaching assistant",
                "Custom branding for your network",
                "Analytics and leader progress tracking",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-mvmt-on-dark-secondary">
                  <span className="w-5 h-5 rounded-full bg-mvmt-accent text-mvmt-cta-text flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="inline-block w-full text-center px-6 py-3 text-sm font-semibold rounded-lg bg-mvmt-accent text-mvmt-cta-text"
            >
              Start for free →
            </Link>
            <p className="mt-3 text-xs text-center text-mvmt-on-dark-muted">No credit card required</p>
          </div>
        </div>
      </div>
    </section>
  );
}

CtaGradientSplit.displayName = "CtaGradientSplit";
