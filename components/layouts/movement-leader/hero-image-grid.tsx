"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroImageGridProps {
  className?: string;
}

/**
 * Image Grid Hero — Based on Dropbox Champions reference
 * Dark background, bold headline left, grid of people images right
 */
export function HeroImageGrid({ className }: HeroImageGridProps) {
  const images = [
    "/media-library/images/headshots/brad-brisco/brad-brisco-studio-backdrop-3x4.webp",
    "/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp",
    "/media-library/images/headshots/brad-brisco/brad-brisco-office-bw-3x4.webp",
    "/media-library/images/headshots/brad-brisco/brad-brisco-library-rays-3x4.webp",
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                color: "var(--mvmt-on-dark-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Become a Movemental Champion
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
              Grow your network. Promote your resources and your movement&apos;s
              success. And get equipped for your advocacy.
            </p>
            <div className="mt-8">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-accent)",
                  color: "var(--mvmt-cta-text)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Right — Image Grid */}
          <div className="grid grid-cols-2 gap-3">
            {images.map((src, i) => (
              <div key={src} className={cn("relative overflow-hidden", i === 0 ? "rounded-tl-3xl" : i === 1 ? "rounded-tr-3xl" : i === 2 ? "rounded-bl-3xl" : "rounded-br-3xl", "h-40 md:h-52")}>
                <Image src={src} alt={`Leader ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Below section */}
      <div className="py-12 text-center" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{
            color: "var(--mvmt-text-primary)",
            fontFamily: "var(--mvmt-font-heading)",
          }}
        >
          What is the Movemental Champions program?
        </h2>
      </div>
    </section>
  );
}

HeroImageGrid.displayName = "HeroImageGrid";
