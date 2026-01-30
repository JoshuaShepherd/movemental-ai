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
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-3 text-mvmt-accent">
              Free Movemental Templates
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading"
            >
              Boost your movement.
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md text-mvmt-text-secondary">
              Quickly assemble resources from various categories and customize
              them to your movement&apos;s needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-semibold transition-colors text-mvmt-cta-text bg-mvmt-accent rounded-mvmt-md"
              >
                Use Template
              </Link>
              <Link
                href="/about"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors text-mvmt-text-primary rounded-mvmt-md"
                style={{ borderColor: "var(--mvmt-border-medium)" }}
              >
                Explore Pages
              </Link>
            </div>
          </div>

          {/* Right — Floating Preview Cards */}
          <div className="hidden md:block relative h-96">
            {/* Main large card */}
            <div
              className="absolute top-0 left-0 w-64 rounded-xl overflow-hidden shadow-lg border border-mvmt-border-light"
            >
              <div className="h-32 bg-mvmt-surface-light-muted">
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg font-bold text-mvmt-text-primary">
                    {previewCards[0].title}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-mvmt-surface-light">
                <p className="text-xs text-mvmt-text-muted">{previewCards[0].subtitle}</p>
              </div>
            </div>
            {/* Small card top-right */}
            <div
              className="absolute top-4 right-0 w-48 rounded-xl overflow-hidden shadow-lg border border-mvmt-border-light"
            >
              <div className="h-24 bg-mvmt-surface-light-muted">
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm font-bold text-mvmt-text-primary">
                    {previewCards[1].title}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-mvmt-surface-light">
                <p className="text-xs text-mvmt-text-muted">{previewCards[1].subtitle}</p>
              </div>
            </div>
            {/* Stat badges */}
            <div className="absolute bottom-8 left-8 flex gap-3">
              {["50+", "12", "8K"].map((stat) => (
                <div
                  key={stat}
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-mvmt-cta-text bg-mvmt-accent"
                >
                  {stat}
                </div>
              ))}
            </div>
            {/* Bottom card */}
            <div
              className="absolute bottom-0 right-4 w-56 rounded-xl overflow-hidden shadow-lg border border-mvmt-border-light"
            >
              <div className="p-4 bg-mvmt-surface-light">
                <p className="text-sm font-bold mb-1 text-mvmt-text-primary">
                  {previewCards[2].title} {previewCards[2].subtitle}
                </p>
                <div className="flex gap-2 mt-2">
                  <div className="w-8 h-1 rounded-full bg-mvmt-accent"  />
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
