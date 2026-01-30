"use client";

import { cn } from "@/lib/utils";

interface TestimonialsSplitCtaProps {
  className?: string;
}

/**
 * Split CTA Testimonials — Light bg, quote left, CTA card right
 */
export function TestimonialsSplitCta({ className }: TestimonialsSplitCtaProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-mvmt-surface-light py-20 md:py-28",
        className
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Quote */}
          <div>
            <blockquote>
              <p className="text-2xl md:text-3xl leading-relaxed text-mvmt-text-primary font-mvmt-heading italic">
                &ldquo;Movemental removed the friction between our content and
                the leaders who need it most. We went from siloed resources to a
                living, breathing ecosystem — and our network has grown 40% in
                engagement since launch.&rdquo;
              </p>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-mvmt-surface-light-muted flex items-center justify-center text-sm font-bold text-mvmt-text-primary">
                DF
              </div>
              <div>
                <p className="font-semibold text-mvmt-text-primary">
                  Dave Ferguson
                </p>
                <p className="text-sm text-mvmt-text-secondary">
                  Lead Visionary &middot; NewThing Network
                </p>
              </div>
            </div>
          </div>

          {/* Right — CTA Card */}
          <div className="rounded-2xl bg-mvmt-surface-light-muted p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-mvmt-text-primary font-mvmt-heading">
              Join the Movement
            </h3>
            <p className="mt-4 text-mvmt-text-secondary leading-relaxed">
              Connect your training, content, and community with thousands of
              movement leaders worldwide. Get started for free — no credit card
              required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@organization.com"
                className="flex-1 rounded-lg border border-mvmt-border bg-mvmt-surface-light px-4 py-3 text-sm text-mvmt-text-primary placeholder:text-mvmt-text-tertiary focus:outline-none focus:ring-2 focus:ring-mvmt-accent"
              />
              <button className="rounded-lg bg-mvmt-accent px-6 py-3 text-sm font-semibold text-mvmt-on-accent hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

TestimonialsSplitCta.displayName = "TestimonialsSplitCta";
