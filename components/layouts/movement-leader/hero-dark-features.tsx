"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroDarkFeaturesProps {
  className?: string;
}

/**
 * Dark Features Hero — Based on Zapier Platform reference
 * Dark background, headline + CTA top, 6-feature grid below with icons
 */
export function HeroDarkFeatures({ className }: HeroDarkFeaturesProps) {
  const features = [
    { title: "Save development time", desc: "With one integration, your content reaches 5,000+ leaders across networks and denominations." },
    { title: "Gain new connections daily", desc: "Two new leaders join our platform every day, and your resources automatically connect with them." },
    { title: "Multiply your reach", desc: "Get exposure to Movemental's 3 million+ views through our resource directory, content, and partner network." },
    { title: "Increase leader retention", desc: "Leaders who engage with multiple resources stay 4x longer in active ministry." },
    { title: "Close more enrollments", desc: 'Say "yes" to leaders who need your courses — Movemental handles discovery and delivery.' },
    { title: "It's free", desc: "The Movemental Platform is free. Build your presence, publish resources, and reach the world." },
  ];

  return (
    <section
      className={cn("relative w-full", className)}
      style={{ backgroundColor: "var(--mvmt-surface-dark)" }}
    >
      {/* Decorative dots */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 border border-[var(--mvmt-border-on-dark)] rounded-lg rotate-12" />
        <div className="absolute top-40 right-60 w-20 h-20 border border-[var(--mvmt-border-on-dark)] rounded-lg -rotate-6" />
      </div>

      {/* Hero top */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-12">
        <div className="max-w-2xl">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{
              color: "var(--mvmt-on-dark-primary)",
              fontFamily: "var(--mvmt-font-heading)",
            }}
          >
            Build a Movemental integration, instantly connect with 5,000+ leaders
          </h1>
          <div className="mt-8">
            <Link
              href="/fit-check"
              className="inline-block px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
              style={{
                backgroundColor: "var(--mvmt-cta-bg)",
                color: "var(--mvmt-cta-text)",
                borderRadius: "var(--mvmt-radius-md)",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 pb-16 md:pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title}>
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}
              >
                <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: "var(--mvmt-accent)" }} />
              </div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--mvmt-on-dark-muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

HeroDarkFeatures.displayName = "HeroDarkFeatures";
