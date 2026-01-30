"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CtaDarkFullWidthProps {
  className?: string;
}

/**
 * Dark full-bleed CTA section — full-width dark background,
 * centered headline with stats row and prominent button.
 */
export function CtaDarkFullWidth({ className }: CtaDarkFullWidthProps) {
  const stats = [
    { value: "10,000+", label: "Leaders trained" },
    { value: "85+", label: "Countries reached" },
    { value: "500+", label: "Churches planted" },
    { value: "50K+", label: "Disciples made" },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark py-20 px-6", className)}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-mvmt-on-dark-primary font-mvmt-heading mb-6">
          Join the movement that&rsquo;s changing the world
        </h2>
        <p className="text-lg text-mvmt-on-dark-secondary mb-12 max-w-2xl mx-auto">
          Leaders on every continent are using Movemental to multiply disciples, plant churches, and catalyze movements. Will you be next?
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-mvmt-accent">{s.value}</p>
              <p className="text-sm text-mvmt-on-dark-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/signup"
          className="inline-block px-10 py-4 text-sm font-semibold rounded-lg bg-mvmt-accent text-mvmt-cta-text"
        >
          Get started for free
        </Link>
      </div>
    </section>
  );
}

CtaDarkFullWidth.displayName = "CtaDarkFullWidth";
