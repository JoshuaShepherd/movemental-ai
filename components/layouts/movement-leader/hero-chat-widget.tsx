"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroChatWidgetProps {
  className?: string;
}

/**
 * Chat Widget Hero — Based on Intercom reference
 * Full-bleed landscape image, bold sans headline overlay, floating chat widget card on right
 */
export function HeroChatWidget({ className }: HeroChatWidgetProps) {
  return (
    <section className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center", className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/media-library/images/headshots/brad-brisco/brad-brisco-outdoor-golden-16x9.webp"
          alt="Brad Brisco outdoors"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--mvmt-gradient-overlay-dark)" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Headline */}
          <div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              style={{
                color: "var(--mvmt-on-dark-primary)",
                fontFamily: "var(--mvmt-font-heading)",
              }}
            >
              The new age of leader development is{" "}
              <span style={{ color: "var(--mvmt-accent)" }}>AI-first</span>
            </h1>
            <p
              className="mt-4 text-sm sm:text-base max-w-md italic leading-relaxed"
              style={{ color: "var(--mvmt-on-dark-secondary)" }}
            >
              AI-first is a totally new way to equip leaders. The entire
              Movemental platform is powered by AI — so leaders get instant
              coaching, instant assessments, and instant access to field-tested
              resources.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--mvmt-border-on-dark-medium)",
                  color: "var(--mvmt-on-dark-primary)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                View demo
              </Link>
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-cta-bg)",
                  color: "var(--mvmt-cta-text)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Start free trial
              </Link>
            </div>
          </div>

          {/* Right — Chat Widget */}
          <div className="hidden md:block">
            <div
              className="rounded-xl p-5 shadow-2xl max-w-sm ml-auto"
              style={{
                backgroundColor: "var(--mvmt-surface-light)",
                border: "1px solid var(--mvmt-border-light)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2" style={{ borderColor: "var(--mvmt-surface-light)" }}>
                    <Image
                      src="/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp"
                      alt="Brad Brisco"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>Movemental AI</p>
                  <p className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>Active now</p>
                </div>
              </div>
              {/* Messages */}
              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
                  Glad to see you checking out the platform! 👋 Can I help you with anything?
                </div>
                <div className="p-3 rounded-lg text-sm ml-8" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
                  I&apos;m interested in trying Movemental
                </div>
                <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
                  Movemental is a platform that combines AI coaching with field-tested resources — so you can equip leaders faster.
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--mvmt-border-light)", color: "var(--mvmt-text-secondary)" }}>
                  Start a free trial
                </span>
                <span className="px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--mvmt-border-light)", color: "var(--mvmt-text-secondary)" }}>
                  Chat with a coach
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroChatWidget.displayName = "HeroChatWidget";
