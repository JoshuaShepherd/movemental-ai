"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroHowItWorksProps {
  className?: string;
}

/**
 * How It Works Hero — Based on Blue Apron Wine reference
 * Hero image top with overlay text + CTA, then "How It Works" 3-step section below
 */
export function HeroHowItWorks({ className }: HeroHowItWorksProps) {
  const steps = [
    {
      icon: "📚",
      title: "Incredible Resources",
      desc: "Get exclusive access to field-tested books and courses from renowned movement leaders.",
    },
    {
      icon: "🚀",
      title: "Ongoing Delivery",
      desc: "New resources added regularly. No commitment. Access or cancel anytime — it's easy.",
    },
    {
      icon: "👥",
      title: "Sized for Teams",
      desc: "Enjoy team-sized access that's built for cohorts and leadership groups to share.",
    },
  ];

  return (
    <section className={cn("relative w-full", className)}>
      {/* Hero image band */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/media-library/images/headshots/brad-brisco/brad-brisco-library-rays-3x4.webp"
          alt="Brad Brisco in library"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "var(--mvmt-gradient-overlay-dark)" }} />
        <div className="absolute inset-0 flex items-center justify-end pr-6 sm:pr-12 lg:pr-24">
          <div className="text-right max-w-md">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
              style={{
                color: "var(--mvmt-on-dark-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Discover the perfect resource for your movement context
            </h1>
            <div className="mt-6 inline-flex items-center gap-3">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-cta-bg)",
                  color: "var(--mvmt-cta-text)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Get Started
              </Link>
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
              >
                Free
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
            style={{
              color: "var(--mvmt-text-primary)",
              fontFamily: "var(--mvmt-font-heading)",
            }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4" style={{ border: "2px solid var(--mvmt-border-light)" }}>
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 w-24 h-px" style={{ left: `${(i + 1) * 33 - 4}%`, backgroundColor: "var(--mvmt-border-light)" }} />
                )}
                <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--mvmt-text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

HeroHowItWorks.displayName = "HeroHowItWorks";
