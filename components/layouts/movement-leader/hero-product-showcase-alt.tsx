"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroProductShowcaseAltProps {
  className?: string;
}

/**
 * Product Showcase Alt Hero — Based on Webflow Enterprise reference
 * Dark background, split layout with bold headline left, UI preview card right, logo bar below
 */
export function HeroProductShowcaseAlt({ className }: HeroProductShowcaseAltProps) {
  const logos = ["Exponential", "Forge", "NewThing", "V3", "Missio", "Saturate"];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark", className)} >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-mvmt-on-dark-primary font-mvmt-heading"
            >
              Movemental Enterprise
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md text-mvmt-on-dark-secondary">
              Equip leaders faster — with the power of Movemental. Backed by
              field-tested frameworks, custom training paths, guaranteed support,
              and much more.
            </p>
            <div className="mt-8">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium transition-colors text-mvmt-cta-text bg-mvmt-cta-bg rounded-full"
              >
                Contact sales
              </Link>
            </div>
          </div>

          {/* Right — UI Preview Card */}
          <div className="hidden md:block">
            <div
              className="rounded-lg overflow-hidden shadow-2xl bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-b-mvmt-border-on-dark">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f56" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#27c93f" }} />
                </div>
                <div className="flex-1 mx-4 px-3 py-1 rounded text-xs text-mvmt-on-dark-muted bg-mvmt-surface-dark">
                  movemental.com/dashboard
                </div>
              </div>
              {/* Content area */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 text-mvmt-on-dark-primary">
                  Leader Strategy is Movement Strategy
                </h3>
                <p className="text-sm mb-4 text-mvmt-on-dark-muted">
                  The complete leader development platform that leaders love to use.
                </p>
                <div className="px-4 py-2 rounded text-sm inline-block text-mvmt-cta-text bg-mvmt-accent">
                  See Dashboard
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo bar */}
      <div className="py-8 border-t border-t-mvmt-border-on-dark">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-center text-sm mb-6 text-mvmt-on-dark-muted">
            Trusted by teams at over 150 of the world&apos;s leading organizations
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {logos.map((name) => (
              <span key={name} className="text-sm font-semibold tracking-wider text-mvmt-on-dark-subtle">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

HeroProductShowcaseAlt.displayName = "HeroProductShowcaseAlt";
