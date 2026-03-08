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
          className="absolute inset-0 bg-mvmt-gradient-overlay-dark"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Headline */}
          <div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-mvmt-on-dark-primary font-mvmt-heading"
            >
              The new age of leader development is{" "}
              <span className="text-mvmt-accent">AI-first</span>
            </h1>
            <p
              className="mt-4 text-sm sm:text-base max-w-md italic leading-relaxed text-mvmt-on-dark-secondary"
            >
              AI-first is a totally new way to equip leaders. The entire
              Movemental platform is powered by AI — so leaders get instant
              coaching, instant assessments, and instant access to field-tested
              resources.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors text-mvmt-on-dark-primary rounded-mvmt-md border-mvmt-border-on-dark-medium"
                
              >
                View demo
              </Link>
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium transition-colors text-mvmt-cta-text bg-mvmt-cta-bg rounded-mvmt-md"
              >
                Start free trial
              </Link>
            </div>
          </div>

          {/* Right — Chat Widget */}
          <div className="hidden md:block">
            <div
              className="rounded-xl p-5 shadow-2xl max-w-sm ml-auto bg-mvmt-surface-light border border-mvmt-border-light"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-mvmt-surface-light" >
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
                  <p className="text-sm font-semibold text-mvmt-text-primary">Movemental AI</p>
                  <p className="text-xs text-mvmt-text-muted">Active now</p>
                </div>
              </div>
              {/* Messages */}
              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-lg text-sm text-mvmt-text-primary bg-mvmt-surface-light-muted">
                  Glad to see you checking out the platform! 👋 Can I help you with anything?
                </div>
                <div className="p-3 rounded-lg text-sm ml-8 text-mvmt-cta-text bg-mvmt-accent">
                  I&apos;m interested in trying Movemental
                </div>
                <div className="p-3 rounded-lg text-sm text-mvmt-text-primary bg-mvmt-surface-light-muted">
                  Movemental is a platform that combines AI coaching with field-tested resources — so you can equip leaders faster.
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-full border text-mvmt-text-secondary border-mvmt-border-light" >
                  Start a free trial
                </span>
                <span className="px-3 py-1.5 rounded-full border text-mvmt-text-secondary border-mvmt-border-light" >
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
