"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CtaSocialProofProps {
  className?: string;
}

/**
 * CTA with embedded testimonial snippet — quote card alongside
 * action prompt, trust signal with author photo.
 */
export function CtaSocialProof({ className }: CtaSocialProofProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light py-20 px-6", className)}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Testimonial card */}
        <div className="rounded-xl p-8 bg-mvmt-surface-light-muted border border-mvmt-border-light">
          <div className="text-3xl text-mvmt-accent mb-4">&ldquo;</div>
          <blockquote className="text-lg leading-relaxed text-mvmt-text-primary font-mvmt-heading mb-6">
            Movemental transformed how our network thinks about leadership development. We went from running occasional workshops to having a full multiplication pipeline — and our leaders have never been more engaged.
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp"
                alt="Brad Brisco"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-mvmt-text-primary">Brad Brisco</p>
              <p className="text-xs text-mvmt-text-muted">Author, The Sending Church</p>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-4">
            Trusted by movement leaders
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading mb-4">
            See why 10,000+ leaders choose Movemental
          </h2>
          <p className="text-base text-mvmt-text-secondary mb-8">
            From solo church planters to global networks — Movemental scales with your mission. Start free and upgrade as you grow.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 text-sm font-semibold rounded-lg bg-mvmt-accent text-mvmt-cta-text"
            >
              Start for free
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium text-mvmt-accent"
            >
              Read more stories →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

CtaSocialProof.displayName = "CtaSocialProof";
