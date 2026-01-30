"use client";

import { cn } from "@/lib/utils";

interface TestimonialsGeometricCarouselProps {
  className?: string;
}

/**
 * Geometric Carousel Testimonials — Dark bg with geometric decorative elements and navigation dots
 */
export function TestimonialsGeometricCarousel({ className }: TestimonialsGeometricCarouselProps) {
  const testimonials = [
    {
      quote:
        "Movemental gave our network the digital backbone we never knew we needed. Leaders across five countries now access our discipleship content in one place — and engagement has never been higher.",
      name: "Brad Brisco",
      role: "Missional Strategist",
      network: "Exponential",
    },
    {
      quote:
        "The platform seamlessly connects training pipelines across our partner organizations. What used to take months of coordination now happens automatically.",
      name: "Dave Ferguson",
      role: "Lead Visionary",
      network: "NewThing",
    },
    {
      quote:
        "We've been able to scale organic church planting resources globally without losing the relational DNA that makes movements work.",
      name: "Neil Cole",
      role: "Founder",
      network: "V3 Church Planting",
    },
    {
      quote:
        "Movemental understands that movements are built on multiplication, not addition. Their tools reflect that philosophy at every level.",
      name: "Alan Hirsch",
      role: "Founder & Director",
      network: "Forge",
    },
    {
      quote:
        "Our leaders went from scattered PDFs and email chains to a unified learning experience. The transition was remarkably smooth.",
      name: "Jeff Vanderstelt",
      role: "Executive Director",
      network: "Missio",
    },
  ];

  const activeIndex = 0;

  return (
    <section
      className={cn(
        "relative w-full bg-mvmt-surface-dark py-24 md:py-32 overflow-hidden",
        className
      )}
    >
      {/* Geometric decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-12 w-36 h-36 border border-mvmt-border-on-dark rounded-none opacity-20" />
        <div className="absolute top-32 left-28 w-20 h-20 border border-mvmt-border-on-dark rounded-full opacity-15" />
        <div className="absolute bottom-20 right-16 w-48 h-48 border border-mvmt-border-on-dark rounded-none opacity-10 rotate-12" />
        <div className="absolute bottom-40 right-48 w-14 h-14 border border-mvmt-border-on-dark rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-mvmt-border-on-dark rounded-none opacity-10 -rotate-6" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        {/* Quote */}
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-mvmt-on-dark-primary font-mvmt-heading">
            &ldquo;{testimonials[activeIndex].quote}&rdquo;
          </p>
          <div className="mt-10">
            <p className="text-lg font-semibold text-mvmt-on-dark-primary">
              {testimonials[activeIndex].name}
            </p>
            <p className="text-sm text-mvmt-on-dark-secondary mt-1">
              {testimonials[activeIndex].role} &middot;{" "}
              {testimonials[activeIndex].network}
            </p>
          </div>
        </div>

        {/* Side arrows + dots */}
        <div className="mt-14 flex items-center gap-8">
          {/* Left arrow */}
          <button
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-mvmt-border-on-dark flex items-center justify-center text-mvmt-on-dark-secondary hover:text-mvmt-on-dark-primary transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Navigation dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  i === activeIndex
                    ? "bg-mvmt-accent"
                    : "border border-mvmt-border-on-dark"
                )}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-mvmt-border-on-dark flex items-center justify-center text-mvmt-on-dark-secondary hover:text-mvmt-on-dark-primary transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

TestimonialsGeometricCarousel.displayName = "TestimonialsGeometricCarousel";
