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
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Hero */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              style={{
                color: "var(--mvmt-text-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Missional Communities
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: "var(--mvmt-text-secondary)" }}>
              Movemental lets you access thousands of resources for discipleship and mission.
              From church planting to leadership coaching, find what you&apos;re looking for with one platform.
            </p>
            <div className="mt-6">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-accent)",
                  color: "var(--mvmt-cta-text)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
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
        className="py-8 text-center"
        style={{ backgroundColor: "var(--mvmt-surface-dark)", color: "var(--mvmt-on-dark-primary)" }}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <h2
            className="text-lg sm:text-xl md:text-2xl font-medium"
            style={{ fontFamily: "var(--mvmt-font-heading)" }}
          >
            Sign up to access courses and resources from top-rated movement leaders
          </h2>
          <div className="mt-4">
            <Link
              href="/fit-check"
              className="inline-block px-6 py-2.5 text-sm font-medium border transition-colors"
              style={{
                borderColor: "var(--mvmt-border-on-dark-medium)",
                color: "var(--mvmt-on-dark-primary)",
                borderRadius: "var(--mvmt-radius-full)",
              }}
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
