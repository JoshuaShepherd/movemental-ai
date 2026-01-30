"use client";

import { cn } from "@/lib/utils";

interface TestimonialsDramaticDarkProps {
  className?: string;
}

/**
 * Dramatic Dark Testimonials — Full-bleed dark warm bg, oversized centered serif quote, minimal attribution
 */
export function TestimonialsDramaticDark({ className }: TestimonialsDramaticDarkProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-mvmt-surface-dark min-h-[80vh] flex items-center justify-center py-24 md:py-32",
        className
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        <p className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-mvmt-on-dark-primary font-mvmt-heading italic">
          &ldquo;The future of movement leadership isn&rsquo;t about building
          bigger platforms — it&rsquo;s about connecting the ones that already
          exist.&rdquo;
        </p>

        {/* Attribution */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="w-16 h-px bg-mvmt-border-on-dark" />
          <p className="text-lg font-semibold text-mvmt-on-dark-primary">
            Alan Hirsch
          </p>
          <p className="text-sm text-mvmt-on-dark-secondary">
            Founder &amp; Director, Forge Mission Training Network
          </p>
        </div>
      </div>
    </section>
  );
}

TestimonialsDramaticDark.displayName = "TestimonialsDramaticDark";
