"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroCleanMinimalAltProps {
  className?: string;
}

/**
 * Clean Minimal Alt Hero — Based on Airbnb Community Leader reference
 * Warm minimal, text left with eyebrow, lifestyle image right, soft tone
 */
export function HeroCleanMinimalAlt({ className }: HeroCleanMinimalAltProps) {
  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: "var(--mvmt-text-muted)" }}
            >
              Movemental Community
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{
                color: "var(--mvmt-text-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Become a Movement Leader
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: "var(--mvmt-text-secondary)" }}>
              Bring together leaders in your area to connect, collaborate, and multiply.
            </p>
            <div className="mt-8">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--mvmt-text-primary)",
                  color: "var(--mvmt-text-primary)",
                  borderRadius: "var(--mvmt-radius-full)",
                }}
              >
                Apply now
              </Link>
            </div>
          </div>

          {/* Right — Lifestyle Image */}
          <div className="relative h-80 md:h-[28rem] rounded-lg overflow-hidden">
            <Image
              src="/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp"
              alt="Brad Brisco"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

HeroCleanMinimalAlt.displayName = "HeroCleanMinimalAlt";
