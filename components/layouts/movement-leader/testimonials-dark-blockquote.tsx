"use client";

import { cn } from "@/lib/utils";

interface TestimonialsDarkBlockquoteProps {
  className?: string;
}

/**
 * Dark Blockquote Testimonials — Dark slate background with featured quote left, stacked cards right
 */
export function TestimonialsDarkBlockquote({ className }: TestimonialsDarkBlockquoteProps) {
  const featured = {
    quote:
      "Movemental has fundamentally changed how we equip and mobilize leaders across our network. The platform connects our training resources to the right people at the right time — it's the infrastructure the movement needed.",
    name: "Alan Hirsch",
    role: "Founder & Director",
    network: "Forge Mission Training Network",
  };

  const sideQuotes = [
    {
      initials: "BB",
      name: "Brad Brisco",
      quote:
        "The simplicity of sharing resources across networks has been a game-changer for our team.",
    },
    {
      initials: "DF",
      name: "Dave Ferguson",
      quote:
        "We've seen 3x the engagement since onboarding our content into Movemental's ecosystem.",
    },
    {
      initials: "NC",
      name: "Neil Cole",
      quote:
        "Organic movements need organic tools. Movemental gets that — and delivers it beautifully.",
    },
  ];

  return (
    <section
      className={cn(
        "relative w-full bg-mvmt-surface-dark py-20 md:py-28",
        className
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Featured blockquote */}
          <div className="relative">
            <span className="absolute -top-8 -left-4 text-[120px] leading-none font-mvmt-heading text-mvmt-accent opacity-30 select-none">
              &ldquo;
            </span>
            <blockquote className="relative z-10 pt-12">
              <p className="text-xl md:text-2xl leading-relaxed text-mvmt-on-dark-primary font-mvmt-heading italic">
                {featured.quote}
              </p>
              <footer className="mt-8">
                <p className="text-lg font-semibold text-mvmt-on-dark-primary">
                  {featured.name}
                </p>
                <p className="text-sm text-mvmt-on-dark-secondary mt-1">
                  {featured.role} &middot; {featured.network}
                </p>
              </footer>
            </blockquote>
          </div>

          {/* Right — Stacked cards */}
          <div className="flex flex-col gap-6">
            {sideQuotes.map((item) => (
              <div
                key={item.name}
                className="rounded-xl bg-mvmt-surface-dark-elevated p-6 border border-mvmt-border-on-dark"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-mvmt-accent flex items-center justify-center text-sm font-bold text-mvmt-on-accent">
                    {item.initials}
                  </div>
                  <span className="font-semibold text-mvmt-on-dark-primary">
                    {item.name}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-mvmt-on-dark-secondary">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

TestimonialsDarkBlockquote.displayName = "TestimonialsDarkBlockquote";
