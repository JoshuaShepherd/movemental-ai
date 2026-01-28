"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroCleanMinimalProps {
  className?: string;
}

/**
 * Clean Minimal Hero — Based on Unsplash reference
 * Clean white background, text left, image grid right, minimal and spacious
 */
export function HeroCleanMinimal({ className }: HeroCleanMinimalProps) {
  const images = [
    { src: "/media-library/images/headshots/brad-brisco/brad-brisco-outdoor-golden-16x9.webp", alt: "Golden light", className: "col-span-2 row-span-1 h-48" },
    { src: "/media-library/images/headshots/brad-brisco/brad-brisco-studio-backdrop-3x4.webp", alt: "Studio portrait", className: "col-span-1 row-span-2 h-full" },
    { src: "/media-library/images/headshots/brad-brisco/brad-brisco-urban-steps-a-16x9.webp", alt: "Urban", className: "col-span-1 row-span-1 h-48" },
    { src: "/media-library/images/headshots/brad-brisco/brad-brisco-library-rays-3x4.webp", alt: "Library", className: "col-span-1 row-span-1 h-48" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — Copy */}
          <div className="pt-8">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{
                color: "var(--mvmt-text-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Resources for everyone
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: "var(--mvmt-text-secondary)" }}>
              Over 50 field-tested resources brought to you by the world&apos;s
              most effective movement practitioners.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--mvmt-text-primary)",
                  color: "var(--mvmt-text-primary)",
                  borderRadius: "var(--mvmt-radius-full)",
                }}
              >
                Start browsing
              </Link>
              <Link
                href="/about"
                className="inline-block px-6 py-3 text-sm font-medium transition-colors"
                style={{ color: "var(--mvmt-text-secondary)" }}
              >
                Become a contributor
              </Link>
            </div>
          </div>

          {/* Right — Image Grid */}
          <div className="grid grid-cols-2 gap-3">
            {images.map((img) => (
              <div key={img.src} className={cn("relative rounded-lg overflow-hidden", img.className)}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

HeroCleanMinimal.displayName = "HeroCleanMinimal";
