"use client";

import { cn } from "@/lib/utils";

interface TestimonialsTrustLogosProps {
  className?: string;
}

const logos = [
  "Exponential",
  "Forge",
  "NewThing",
  "V3",
  "Missio",
  "Saturate",
  "3DM",
  "Verge",
];

/**
 * Testimonials Trust Logos — Dark bg, logo wall + featured testimonial + CTA
 * 2 rows of 4 text-based placeholder logos, single quote below, CTA row
 */
export function TestimonialsTrustLogos({
  className,
}: TestimonialsTrustLogosProps) {
  return (
    <section
      className={cn("w-full bg-mvmt-surface-dark py-20 md:py-28", className)}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-mvmt-heading text-center text-mvmt-on-dark-primary mb-3">
          Trusted by Leading Networks
        </h2>
        <p className="text-center text-mvmt-on-dark-secondary max-w-xl mx-auto mb-14">
          Movement leaders and organizations around the world rely on our
          platform to multiply their impact.
        </p>

        {/* Logo Wall */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex items-center justify-center border border-mvmt-border-on-dark rounded-lg px-5 py-4"
            >
              <span className="text-sm font-semibold tracking-wide text-mvmt-on-dark-muted">
                {logo}
              </span>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xl md:text-2xl leading-relaxed text-mvmt-on-dark-primary mb-6">
            &ldquo;This platform has become the backbone of how we train and
            deploy leaders across our entire network. It&rsquo;s exactly what
            the multiplication movement needed.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mvmt-accent flex items-center justify-center">
              <span className="text-xs font-bold text-mvmt-on-accent">BB</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-mvmt-on-dark-primary text-sm">
                Brad Brisco
              </p>
              <p className="text-xs text-mvmt-on-dark-secondary">
                Missio Network
              </p>
            </div>
          </div>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="bg-mvmt-accent text-mvmt-on-accent font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Join These Networks
          </button>
          <button
            type="button"
            className="border border-mvmt-border-on-dark text-mvmt-on-dark-primary font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-80 transition-opacity"
          >
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}

TestimonialsTrustLogos.displayName = "TestimonialsTrustLogos";
