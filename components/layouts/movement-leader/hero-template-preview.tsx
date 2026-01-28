"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroTemplatePreviewProps {
  className?: string;
}

/**
 * Template Preview Hero — Based on Framer Boost reference
 * Light background, text left, floating template preview cards right with purple accents
 */
export function HeroTemplatePreview({ className }: HeroTemplatePreviewProps) {
  const previewCards = [
    { title: "Empowering leaders.", subtitle: "Leading development for modern teams.", size: "large" },
    { title: "We can help", subtitle: "Resources and coaching", size: "small" },
    { title: "50+", subtitle: "Courses available", size: "stat" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--mvmt-accent)" }}>
              Free Movemental Templates
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{
                color: "var(--mvmt-text-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              Boost your movement.
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: "var(--mvmt-text-secondary)" }}>
              Quickly assemble resources from various categories and customize
              them to your movement&apos;s needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-accent)",
                  color: "var(--mvmt-cta-text)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Use Template
              </Link>
              <Link
                href="/about"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--mvmt-border-medium)",
                  color: "var(--mvmt-text-primary)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Explore Pages
              </Link>
            </div>
          </div>

          {/* Right — Floating Preview Cards */}
          <div className="hidden md:block relative h-96">
            {/* Main large card */}
            <div
              className="absolute top-0 left-0 w-64 rounded-xl overflow-hidden shadow-lg"
              style={{ border: "1px solid var(--mvmt-border-light)" }}
            >
              <div className="h-32" style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg font-bold" style={{ color: "var(--mvmt-text-primary)" }}>
                    {previewCards[0].title}
                  </p>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
                <p className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>{previewCards[0].subtitle}</p>
              </div>
            </div>
            {/* Small card top-right */}
            <div
              className="absolute top-4 right-0 w-48 rounded-xl overflow-hidden shadow-lg"
              style={{ border: "1px solid var(--mvmt-border-light)" }}
            >
              <div className="h-24" style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm font-bold" style={{ color: "var(--mvmt-text-primary)" }}>
                    {previewCards[1].title}
                  </p>
                </div>
              </div>
              <div className="p-3" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
                <p className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>{previewCards[1].subtitle}</p>
              </div>
            </div>
            {/* Stat badges */}
            <div className="absolute bottom-8 left-8 flex gap-3">
              {["50+", "12", "8K"].map((stat) => (
                <div
                  key={stat}
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
                >
                  {stat}
                </div>
              ))}
            </div>
            {/* Bottom card */}
            <div
              className="absolute bottom-0 right-4 w-56 rounded-xl overflow-hidden shadow-lg"
              style={{ border: "1px solid var(--mvmt-border-light)" }}
            >
              <div className="p-4" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--mvmt-text-primary)" }}>
                  {previewCards[2].title} {previewCards[2].subtitle}
                </p>
                <div className="flex gap-2 mt-2">
                  <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "var(--mvmt-accent)" }} />
                  <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
                  <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroTemplatePreview.displayName = "HeroTemplatePreview";
