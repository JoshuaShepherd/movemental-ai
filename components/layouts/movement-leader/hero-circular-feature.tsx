"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroCircularFeatureProps {
  className?: string;
}

/**
 * Circular Feature Hero — Based on ClassPass reference
 * Clean minimal white background, large headline left, circular image, feature bar below
 */
export function HeroCircularFeature({ className }: HeroCircularFeatureProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      {/* Hero */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading"
            >
              Missional Communities
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md text-mvmt-text-secondary">
              Movemental lets you access thousands of resources for discipleship and mission.
              From church planting to leadership coaching, find what you&apos;re looking for with one platform.
            </p>
            <div className="mt-6">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-semibold transition-colors text-mvmt-cta-text bg-mvmt-accent rounded-mvmt-md"
              >
                Try for free
              </Link>
            </div>
          </div>
          {/* Circular image */}
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
              <Image
                src="/media-library/images/headshots/brad-brisco/brad-brisco-studio-backdrop-3x4.webp"
                alt="Brad Brisco"
                width={320}
                height={320}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature bar */}
      <div
        className="py-8 text-center text-mvmt-on-dark-primary bg-mvmt-surface-dark"
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <h2
            className="text-lg sm:text-xl md:text-2xl font-medium font-mvmt-heading"
          >
            Sign up to access courses and resources from top-rated movement leaders
          </h2>
          <div className="mt-4">
            <Link
              href="/fit-check"
              className="inline-block px-6 py-2.5 text-sm font-medium border transition-colors text-mvmt-on-dark-primary rounded-full border-mvmt-border-on-dark-medium"
              
            >
              Start a free trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroCircularFeature.displayName = "HeroCircularFeature";
