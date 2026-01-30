"use client";

import { cn } from "@/lib/utils";

interface TestimonialsGridCardsProps {
  className?: string;
}

const testimonials = [
  {
    name: "Brad Brisco",
    network: "Missio",
    initials: "BB",
    quote:
      "This platform helped us onboard 200+ missional community leaders in under a month. The content library is unmatched.",
  },
  {
    name: "Alan Hirsch",
    network: "Forge",
    initials: "AH",
    quote:
      "Finally, a tool built for movement leaders — not just megachurch pastors. It understands the apostolic imagination.",
  },
  {
    name: "Dave Ferguson",
    network: "NewThing",
    initials: "DF",
    quote:
      "We scaled our multiplication pipeline across three continents using this system. Game-changing for networks.",
  },
  {
    name: "Neil Cole",
    network: "V3",
    initials: "NC",
    quote:
      "Simple, organic, and Christ-centered. This is the kind of tech that serves the underground church well.",
  },
  {
    name: "Felicity Dale",
    network: "Missio",
    initials: "FD",
    quote:
      "The assessment tools alone are worth it. We identified and deployed leaders faster than ever before.",
  },
  {
    name: "Jeff Vanderstelt",
    network: "Exponential",
    initials: "JV",
    quote:
      "Every resource we needed — courses, assessments, community — all in one place. Our leaders love it.",
  },
];

/**
 * Testimonials Grid Cards — Light background, 3x2 card grid with ratings
 * Star ratings, quotes, avatar + name + network badge per card
 */
export function TestimonialsGridCards({ className }: TestimonialsGridCardsProps) {
  return (
    <section
      className={cn(
        "w-full bg-mvmt-surface-light-muted py-20 md:py-28",
        className
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-mvmt-heading text-center text-mvmt-on-light-primary mb-4">
          What Our Community Says
        </h2>
        <p className="text-center text-mvmt-on-light-secondary max-w-xl mx-auto mb-14">
          Leaders across the globe trust our platform to equip, assess, and
          multiply their movements.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-mvmt-surface-light border border-mvmt-border-light rounded-lg p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-mvmt-accent text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-mvmt-on-light-primary leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <hr className="border-mvmt-border-light mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mvmt-accent flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-mvmt-on-accent">
                    {t.initials}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-mvmt-on-light-primary text-sm">
                    {t.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-mvmt-surface-light-muted text-mvmt-on-light-secondary border border-mvmt-border-light">
                    {t.network}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TestimonialsGridCards.displayName = "TestimonialsGridCards";
