"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CtaMinimalCenteredProps {
  className?: string;
}

/**
 * Ultra-clean centered CTA — single headline, subtitle, one button.
 * Generous whitespace, minimal elements.
 */
export function CtaMinimalCentered({ className }: CtaMinimalCenteredProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light py-24 px-6", className)}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-4">
          Get started today
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading mb-6">
          Equip leaders. Multiply movements. Change the world.
        </h2>
        <p className="text-lg text-mvmt-text-secondary mb-10 max-w-lg mx-auto">
          Everything you need to build, train, and deploy the next generation of movement makers — in one platform.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-8 py-3 text-sm font-semibold rounded-lg bg-mvmt-accent text-mvmt-cta-text"
          >
            Start Multiplying
          </Link>
          <Link
            href="/demo"
            className="px-8 py-3 text-sm font-semibold rounded-lg border border-mvmt-border-medium text-mvmt-text-primary"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}

CtaMinimalCentered.displayName = "CtaMinimalCentered";
