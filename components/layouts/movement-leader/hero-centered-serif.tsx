"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroCenteredSerifProps {
  className?: string;
}

/**
 * Centered Serif Hero — Based on Substack reference
 * Clean white background, large serif headline centered, supporting text, CTA, testimonial below
 */
export function HeroCenteredSerif({ className }: HeroCenteredSerifProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      {/* Hero */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-mvmt-text-primary font-mvmt-heading"
          style={{ fontWeight: 400 }}
        >
          A comprehensive support
          <br className="hidden sm:block" />
          structure for movement
          <br className="hidden sm:block" />
          leaders.
        </h1>
        <p
          className="mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-mvmt-text-secondary"
        >
          We offer leaders an ecosystem where they can do their best work.
          When leaders have the right support and infrastructure to maximize
          their calling, everything else falls into place.
        </p>
        <div className="mt-8">
          <Link
            href="/fit-check"
            className="inline-block px-8 py-3.5 text-sm font-semibold transition-colors text-mvmt-cta-text bg-mvmt-cta-bg rounded-mvmt-md"
          >
            Start Multiplying
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <hr  className="border-mvmt-border-light" />
      </div>

      {/* Testimonial */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center">
        <blockquote
          className="text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-3xl mx-auto text-mvmt-text-primary font-mvmt-heading"
          style={{ fontWeight: 400 }}
        >
          &ldquo;I have never felt this supported for my work ever.&rdquo;
        </blockquote>
        <p className="mt-4 text-sm text-mvmt-text-secondary">
          — Alan Hirsch, <span className="underline">Forge Mission Training Network</span>
        </p>
      </div>
    </section>
  );
}

HeroCenteredSerif.displayName = "HeroCenteredSerif";
