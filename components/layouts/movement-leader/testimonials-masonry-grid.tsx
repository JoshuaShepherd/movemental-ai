"use client";

import { cn } from "@/lib/utils";

interface TestimonialsMasonryGridProps {
  className?: string;
}

const testimonials = [
  {
    initials: "AH",
    name: "Alan Hirsch",
    role: "Author & Thought Leader",
    network: "Forge",
    quote:
      "Movemental has given us a framework to scale training without losing the relational DNA that makes movements work.",
  },
  {
    initials: "BB",
    name: "Brad Brisco",
    role: "Missional Strategist",
    network: "Exponential",
    quote:
      "Every resource here is built for practitioners, not just theorists. That makes all the difference for leaders on the ground.",
  },
  {
    initials: "DF",
    name: "Dave Ferguson",
    role: "Lead Visionary",
    network: "NewThing",
    quote:
      "We needed a platform that understood multiplication at its core. This is it. Our network leaders are equipped like never before.",
  },
  {
    initials: "NC",
    name: "Neil Cole",
    role: "Church Planting Pioneer",
    network: "Missio",
    quote: "Simple, reproducible, and Christ-centered. This reflects organic church values perfectly.",
  },
  {
    initials: "JR",
    name: "Jeff Randleman",
    role: "Network Director",
    network: "V3",
    quote:
      "V3 has benefited tremendously from the content and assessment tools. Our church planters are more prepared than ever to step into their calling.",
  },
  {
    initials: "TH",
    name: "Todd Hunter",
    role: "Bishop & Author",
    network: "Exponential",
    quote:
      "The depth of theological grounding combined with practical tooling is rare. This platform bridges that gap beautifully.",
  },
  {
    initials: "LS",
    name: "Linda Stanley",
    role: "Training Coordinator",
    network: "Forge",
    quote: "Our cohort leaders love the assessment flows. It has streamlined our entire onboarding process.",
  },
  {
    initials: "MR",
    name: "Mike Roberts",
    role: "Regional Catalyst",
    network: "NewThing",
    quote:
      "From articles to assessments to courses — everything is connected and movement-minded. A game-changer for our team.",
  },
];

/**
 * Testimonials Masonry Grid — CSS-columns masonry layout with quote cards
 */
export function TestimonialsMasonryGrid({ className }: TestimonialsMasonryGridProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light-muted py-16 md:py-24", className)}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-mvmt-heading text-mvmt-text-primary">
            Community Voices
          </h2>
          <p className="mt-3 text-lg text-mvmt-text-secondary max-w-xl mx-auto">
            Leaders across networks share how these tools are accelerating their mission.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="break-inside-avoid rounded-xl border border-mvmt-border bg-mvmt-surface-light p-6"
            >
              <p className="text-mvmt-text-secondary leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-mvmt-accent flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-mvmt-on-dark-primary">{t.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-mvmt-text-primary">{t.name}</p>
                  <p className="text-xs text-mvmt-text-tertiary">{t.role}</p>
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-mvmt-surface-light-muted px-3 py-0.5 text-xs font-medium text-mvmt-text-secondary border border-mvmt-border">
                  {t.network}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TestimonialsMasonryGrid.displayName = "TestimonialsMasonryGrid";
