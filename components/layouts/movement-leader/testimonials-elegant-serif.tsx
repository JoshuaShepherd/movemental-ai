"use client";

import { cn } from "@/lib/utils";

interface TestimonialsElegantSerifProps {
  className?: string;
}

const quotes = [
  {
    text: "The integration of assessment, content, and community has created a pipeline for movement leaders that simply did not exist before.",
    name: "Alan Hirsch",
    title: "Founder, Forge Mission Training Network",
  },
  {
    text: "Every church planter in our network now has access to world-class resources. That changes the trajectory of entire communities.",
    name: "Dave Ferguson",
    title: "Lead Visionary, NewThing Network",
  },
  {
    text: "What I love most is the simplicity. No bloat, no noise — just the essentials that help leaders multiply disciples and churches.",
    name: "Neil Cole",
    title: "Church Planting Pioneer, Missio",
  },
];

/**
 * Testimonials Elegant Serif — Clean, airy layout with accent-bordered quote cards
 */
export function TestimonialsElegantSerif({ className }: TestimonialsElegantSerifProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light py-20 md:py-28", className)}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mvmt-heading text-mvmt-text-primary">
            Stories of Impact
          </h2>
        </div>

        {/* Quote Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="border-t-2 border-mvmt-accent pt-8"
            >
              <p className="text-lg md:text-xl italic leading-relaxed text-mvmt-text-primary font-mvmt-heading mb-8">
                &ldquo;{q.text}&rdquo;
              </p>
              <p className="text-sm text-mvmt-text-secondary">
                &mdash; <span className="font-semibold text-mvmt-text-primary">{q.name}</span>,{" "}
                {q.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TestimonialsElegantSerif.displayName = "TestimonialsElegantSerif";
