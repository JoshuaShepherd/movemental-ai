"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroProductShowcaseProps {
  className?: string;
}

/**
 * Product Showcase Hero — Based on Blue Apron reference
 * Full-bleed product/lifestyle image, text overlay left, big stat below
 */
export function HeroProductShowcase({ className }: HeroProductShowcaseProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Hero image */}
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex items-end">
        <Image
          src="/media-library/images/headshots/brad-brisco/brad-brisco-outdoor-golden-16x9.webp"
          alt="Brad Brisco in golden light"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 pb-12">
          <div className="max-w-lg">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold italic leading-tight text-mvmt-on-dark-primary font-mvmt-heading"
            >
              The platform that puts quality first
            </h1>
            <div className="mt-6">
              <Link
                href="/fit-check"
                className="inline-block px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors text-mvmt-cta-text bg-mvmt-cta-bg rounded-full"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stat section */}
      <div className="py-10 text-center bg-mvmt-surface-light">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-mvmt-accent">
          10,000+ leaders equipped
        </p>
        <p className="mt-2 text-sm text-mvmt-text-secondary">
          See why movement practitioners stick with the original leader development platform.
        </p>
      </div>
    </section>
  );
}

HeroProductShowcase.displayName = "HeroProductShowcase";
