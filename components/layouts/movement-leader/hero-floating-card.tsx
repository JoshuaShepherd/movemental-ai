"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroFloatingCardProps {
  className?: string;
}

/**
 * Floating Card Hero — Based on OpenTable reference
 * Full-bleed warm image background, floating white card with CTA overlaid, heading below
 */
export function HeroFloatingCard({ className }: HeroFloatingCardProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Background image hero */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="/media-library/images/headshots/brad-brisco/brad-brisco-urban-steps-a-16x9.webp"
          alt="Brad Brisco urban setting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "var(--mvmt-gradient-overlay-dark)" }} />

        {/* Floating card */}
        <div className="absolute bottom-12 left-6 sm:left-12 lg:left-24 z-10">
          <div
            className="p-6 sm:p-8 rounded-lg shadow-xl max-w-sm"
            style={{ backgroundColor: "var(--mvmt-surface-light)" }}
          >
            <h2
              className="text-xl sm:text-2xl font-bold leading-tight"
              style={{
                color: "var(--mvmt-text-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Equip your movement every season
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>
              Get more reach and increase impact when you access the world&apos;s
              largest network of movement leaders.
            </p>
            <div className="mt-4">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-cta-bg)",
                  color: "var(--mvmt-cta-text)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Get Started with Movemental
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Below hero — headline */}
      <div
        className="py-12 text-center"
        style={{ backgroundColor: "var(--mvmt-surface-light)" }}
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
          style={{
            color: "var(--mvmt-text-primary)",
            fontFamily: "var(--mvmt-font-heading)",
          }}
        >
          Make your calling easier when you accept the mission
        </h2>
      </div>
    </section>
  );
}

HeroFloatingCard.displayName = "HeroFloatingCard";
