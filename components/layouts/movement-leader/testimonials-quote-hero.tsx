"use client";

import { cn } from "@/lib/utils";

interface TestimonialsQuoteHeroProps {
  className?: string;
}

const stats = [
  { value: "500+", label: "Churches Planted" },
  { value: "6", label: "Continents Reached" },
  { value: "20+", label: "Years of Impact" },
];

/**
 * Testimonials Quote Hero — Dark vibrant hero with large centered blockquote
 * Full-width dark bg, large quotation mark, big quote text, attribution, stat cards
 */
export function TestimonialsQuoteHero({ className }: TestimonialsQuoteHeroProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark py-20 md:py-32", className)}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Quotation Mark */}
        <div className="flex justify-center mb-8">
          <span className="text-8xl md:text-9xl leading-none text-mvmt-accent font-serif select-none">
            &ldquo;
          </span>
        </div>

        {/* Quote Text */}
        <blockquote className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-2xl sm:text-3xl md:text-4xl font-mvmt-heading leading-relaxed text-mvmt-on-dark-primary">
            The future of the church is not in bigger buildings but in multiplying
            movements that transform neighborhoods, cities, and nations.
          </p>
        </blockquote>

        {/* Attribution */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <div className="w-14 h-14 rounded-full bg-mvmt-accent flex items-center justify-center">
            <span className="text-lg font-bold text-mvmt-on-dark-primary">AH</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-mvmt-on-dark-primary">Alan Hirsch</p>
            <p className="text-sm text-mvmt-on-dark-secondary">Founder, Forge Mission Training Network</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-mvmt-surface-dark-muted px-6 py-5 text-center"
            >
              <p className="text-3xl font-bold text-mvmt-accent">{stat.value}</p>
              <p className="text-sm mt-1 text-mvmt-on-dark-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TestimonialsQuoteHero.displayName = "TestimonialsQuoteHero";
