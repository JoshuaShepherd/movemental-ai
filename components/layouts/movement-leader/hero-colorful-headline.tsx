"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroColorfulHeadlineProps {
  className?: string;
}

/**
 * Colorful Headline Hero — Based on Spotify for Developers reference
 * Full-bleed background image with bold headline, accent-colored keywords, and CTA button
 */
export function HeroColorfulHeadline({ className }: HeroColorfulHeadlineProps) {
  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center", className)}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/media-library/images/headshots/brad-brisco/brad-brisco-outdoor-golden-16x9.webp"
          alt="Brad Brisco in golden light"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay — darker on left for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--mvmt-gradient-overlay-hero)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            style={{
              color: "var(--mvmt-on-dark-primary)",
              fontFamily: "var(--mvmt-font-heading)",
            }}
          >
            Equip leaders for movements with{" "}
            <span style={{ color: "var(--mvmt-accent)" }}>books</span>,{" "}
            <span style={{ color: "var(--mvmt-accent)" }}>courses</span>, and{" "}
            <span style={{ color: "var(--mvmt-accent)" }}>much, much more</span>.
          </h1>

          <div className="mt-10">
            <Link
              href="/fit-check"
              className="inline-block px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{
                backgroundColor: "var(--mvmt-cta-bg)",
                color: "var(--mvmt-cta-text)",
                borderRadius: "var(--mvmt-radius-full)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--mvmt-accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--mvmt-cta-bg)")
              }
            >
              Start Multiplying
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroColorfulHeadline.displayName = "HeroColorfulHeadline";
