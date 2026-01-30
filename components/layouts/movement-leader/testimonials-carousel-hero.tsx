"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface TestimonialsCarouselHeroProps {
  className?: string;
}

const quotes = [
  {
    initials: "BB",
    name: "Brad Brisco",
    title: "Missional Strategist, Exponential",
    text: "This platform embodies what it means to equip the saints for the work of ministry. Every tool is built with multiplication in mind.",
  },
  {
    initials: "AH",
    name: "Alan Hirsch",
    title: "Founder, Forge Mission Training Network",
    text: "Movemental captures the apostolic imagination we need for the Western church. It is practical, prophetic, and profoundly useful.",
  },
  {
    initials: "DF",
    name: "Dave Ferguson",
    title: "Lead Visionary, NewThing Network",
    text: "Our network has grown faster with these tools than anything else we have tried. The assessments alone are worth it.",
  },
  {
    initials: "NC",
    name: "Neil Cole",
    title: "Church Planting Pioneer, Missio",
    text: "Organic, simple, and Christ-centered. This is how movement resources should be built — from the ground up.",
  },
  {
    initials: "JR",
    name: "Jeff Randleman",
    title: "Network Director, V3 Movement",
    text: "V3 leaders are better prepared than ever. The content library and learning paths have transformed our pipeline.",
  },
];

const avatarPeople = [
  { initials: "BB" },
  { initials: "AH" },
  { initials: "DF" },
  { initials: "NC" },
  { initials: "JR" },
];

/**
 * Testimonials Carousel Hero — Dark bg with featured quote and navigation
 */
export function TestimonialsCarouselHero({ className }: TestimonialsCarouselHeroProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? quotes.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === quotes.length - 1 ? 0 : c + 1));

  const quote = quotes[current];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark py-20 md:py-32", className)}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mvmt-heading text-mvmt-on-dark-primary mb-14">
          Trusted by Movement Leaders Worldwide
        </h2>

        {/* Featured Quote */}
        <div className="max-w-3xl mx-auto mb-10">
          <span className="text-7xl leading-none text-mvmt-accent font-serif select-none">
            &ldquo;
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-mvmt-on-dark-primary font-mvmt-heading mt-2 mb-6">
            {quote.text}
          </p>
          <p className="text-lg font-semibold text-mvmt-on-dark-primary">{quote.name}</p>
          <p className="text-sm text-mvmt-on-dark-secondary">{quote.title}</p>
        </div>

        {/* Avatar Row */}
        <div className="flex justify-center items-center gap-3 mb-8">
          {avatarPeople.map((person, i) => (
            <button
              key={person.initials}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                i === current
                  ? "bg-mvmt-accent text-mvmt-on-dark-primary ring-2 ring-mvmt-accent ring-offset-2 ring-offset-mvmt-surface-dark"
                  : "bg-mvmt-surface-dark-muted text-mvmt-on-dark-secondary"
              )}
            >
              {person.initials}
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4">
          <button
            onClick={prev}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-mvmt-border-dark text-mvmt-on-dark-secondary hover:text-mvmt-on-dark-primary transition-colors"
          >
            &larr; Previous
          </button>
          <button
            onClick={next}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-mvmt-border-dark text-mvmt-on-dark-secondary hover:text-mvmt-on-dark-primary transition-colors"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

TestimonialsCarouselHero.displayName = "TestimonialsCarouselHero";
