"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroFullBleedProps {
  className?: string;
}

/**
 * Full Bleed Hero — Based on Wix Learn reference
 * Full-bleed image with centered text overlay, accent-colored partial headline
 */
export function HeroFullBleed({ className }: HeroFullBleedProps) {
  return (
    <section className={cn("relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center", className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/media-library/images/headshots/brad-brisco/brad-brisco-portrait-dark-16x9.webp"
          alt="Brad Brisco"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-6 py-16 md:py-24">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto text-mvmt-on-dark-primary font-mvmt-heading"
        >
          You know what you want to accomplish.{" "}
          <span className="text-mvmt-accent">Now learn how.</span>
        </h1>
        <div className="mt-8">
          <Link
            href="/fit-check"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border transition-colors text-mvmt-on-dark-primary rounded-mvmt-md border-mvmt-on-dark-primary"
            
          >
            Start Learning &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

HeroFullBleed.displayName = "HeroFullBleed";
