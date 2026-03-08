"use client";

import { cn } from "@/lib/utils";

interface TestimonialsInstructorDarkProps {
  className?: string;
}

const instructors = [
  {
    name: "Neil Cole",
    initials: "NC",
    quote: "Organic church principles made accessible to every believer.",
  },
  {
    name: "Felicity Dale",
    initials: "FD",
    quote: "Equipping women and men to lead simple, multiplying communities.",
  },
  {
    name: "Jeff Vanderstelt",
    initials: "JV",
    quote: "Gospel-centered mission embedded in the rhythms of everyday life.",
  },
  {
    name: "Brad Brisco",
    initials: "BB",
    quote: "Missional leadership development for the neighborhood church.",
  },
];

/**
 * Testimonials Instructor Dark — Pure dark bg, featured instructor spotlight
 * Large image + quote for featured instructor, row of smaller instructor cards below
 */
export function TestimonialsInstructorDark({
  className,
}: TestimonialsInstructorDarkProps) {
  return (
    <section
      className={cn("w-full bg-mvmt-surface-dark py-20 md:py-28", className)}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-mvmt-heading text-mvmt-on-dark-primary mb-3">
          Learn From the Best
        </h2>
        <p className="text-mvmt-on-dark-secondary max-w-xl mb-14">
          World-class movement leaders share their decades of experience through
          our platform.
        </p>

        {/* Featured Instructor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image Placeholder */}
          <div className="bg-mvmt-surface-dark-elevated rounded-xl aspect-[3/4] max-h-[500px] flex items-center justify-center">
            <span className="text-mvmt-on-dark-muted text-sm tracking-widest uppercase">
              Instructor Photo
            </span>
          </div>

          {/* Quote & Info */}
          <div className="flex flex-col justify-center">
            <p className="text-2xl md:text-3xl leading-relaxed text-mvmt-on-dark-primary font-mvmt-heading mb-8">
              &ldquo;The missional movement isn&rsquo;t slowing down — it&rsquo;s
              accelerating. We need tools that keep pace with what the Spirit is
              doing globally.&rdquo;
            </p>
            <p className="text-xl font-semibold text-mvmt-on-dark-primary mb-1">
              Alan Hirsch
            </p>
            <p className="text-mvmt-on-dark-secondary mb-8">
              Founder, Forge Mission Training Network
            </p>
            <div>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-mvmt-accent text-mvmt-on-accent font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Watch Their Story
              </button>
            </div>
          </div>
        </div>

        {/* Instructor Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {instructors.map((inst) => (
            <div
              key={inst.name}
              className="bg-mvmt-surface-dark-elevated rounded-lg p-6"
            >
              <div className="w-11 h-11 rounded-full bg-mvmt-accent flex items-center justify-center mb-4">
                <span className="text-xs font-bold text-mvmt-on-accent">
                  {inst.initials}
                </span>
              </div>
              <p className="font-semibold text-mvmt-on-dark-primary mb-2">
                {inst.name}
              </p>
              <p className="text-sm text-mvmt-on-dark-secondary leading-relaxed">
                &ldquo;{inst.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TestimonialsInstructorDark.displayName = "TestimonialsInstructorDark";
