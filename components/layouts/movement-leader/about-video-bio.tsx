"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AboutVideoBioProps {
  className?: string;
}

export function AboutVideoBio({ className }: AboutVideoBioProps) {
  return (
    <section className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col", className)}>
      {/* Dark Header */}
      <div className="px-6 sm:px-12 lg:px-16 py-10" style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--mvmt-accent)" }}>
          Movemental <span className="px-2 py-0.5 rounded text-xs font-bold ml-1" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>LIVE</span>
        </p>
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 max-w-3xl"
          style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Welcome to Movemental Live with Brad Brisco
        </h1>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
          Movement catalyst Brad Brisco joins Movemental Live on June 24 at 5pm PT/8pm ET to talk about church planting movements and answer questions. Join the conversation by using the hashtag #MovementalLive on Twitter.
        </p>
      </div>

      {/* Two-Column Body */}
      <div className="flex-1 px-6 sm:px-12 lg:px-16 py-12 grid md:grid-cols-2 gap-8" style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
        {/* Video Card */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: "1px solid var(--mvmt-border-light)" }}
        >
          <div className="p-6" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
              Watch Brad&rsquo;s Trailer
            </h3>
            <div
              className="relative aspect-video rounded-lg overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "var(--mvmt-surface-dark)" }}
            >
              <div className="text-center">
                <p className="text-xs font-medium mb-1" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
                  Brad Brisco Teaches Movement Fundamentals
                </p>
                <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--mvmt-on-dark-primary)" }}>
                  BRAD BRISCO
                </p>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--mvmt-on-dark-muted)" }}>
                  TEACHES MOVEMENT FUNDAMENTALS
                </p>
              </div>
              {/* Play Button */}
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: "var(--mvmt-accent)" }}
                >
                  <span style={{ color: "var(--mvmt-cta-text)", fontSize: "1.5rem" }}>▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Card */}
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: "var(--mvmt-surface-dark)", color: "var(--mvmt-on-dark-primary)" }}
            >
              BB
            </div>
            <h3 className="text-lg font-bold" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
              About Brad Brisco
            </h3>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--mvmt-text-secondary)" }}>
            A movement catalyst capable of extraordinary impact, Brad Brisco has helped launch hundreds of missional communities across North America — the first leader in nearly a decade to scale a multiplication movement to six continents. At the 2019 Exponential Conference, Brad unveiled two new frameworks for church planting, becoming the first practitioner to integrate both incarnational and attractional models. In 2016, Brad&rsquo;s network planted 47 churches in a single year, setting records for organic multiplication in established denominations.
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            style={{ backgroundColor: "var(--mvmt-surface-dark)", color: "var(--mvmt-on-dark-primary)" }}
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div
        className="px-6 sm:px-12 lg:px-16 py-4 flex items-center justify-center gap-6"
        style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}
      >
        <p className="text-sm" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
          Access all resources for $15/month (billed annually)
        </p>
        <Link
          href="/pricing"
          className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full"
          style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}

AboutVideoBio.displayName = "AboutVideoBio";
