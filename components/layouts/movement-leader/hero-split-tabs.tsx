"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroSplitTabsProps {
  className?: string;
}

/**
 * Split Tabs Hero — Based on LinkedIn Talent Solutions reference
 * Split layout with image right, bold headline left, tabbed content section below
 */
export function HeroSplitTabs({ className }: HeroSplitTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Find and equip great leaders",
      content: "Discover and develop movement leaders with assessments, AI coaching, and proven frameworks that identify and grow the right people.",
    },
    {
      label: "Help my team build skills",
      content: "Access 50+ courses on missional community design, church planting, discipleship multiplication, and leadership development.",
    },
    {
      label: "Improve leader experience",
      content: "Give your leaders personalized development paths, on-demand resources, and peer learning communities — all in one platform.",
    },
  ];

  return (
    <section className={cn("relative w-full", className)}>
      {/* Hero — split */}
      <div className="grid md:grid-cols-2 min-h-[50vh]">
        {/* Left — Copy */}
        <div
          className="flex items-center px-6 sm:px-12 lg:px-24 py-16"
          style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
        >
          <div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl leading-tight"
              style={{
                color: "var(--mvmt-text-primary)",
                fontFamily: "var(--mvmt-font-heading)",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              Equipping is just the beginning
            </h1>
            <p className="mt-4 text-base" style={{ color: "var(--mvmt-text-secondary)" }}>
              Get help finding and developing great leaders.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/fit-check"
                className="inline-block px-6 py-3 text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--mvmt-text-primary)",
                  color: "var(--mvmt-text-primary)",
                  borderRadius: "var(--mvmt-radius-md)",
                }}
              >
                Contact us
              </Link>
              <Link
                href="/about"
                className="inline-block px-6 py-3 text-sm font-medium transition-colors"
                style={{ color: "var(--mvmt-text-secondary)" }}
              >
                See all resources
              </Link>
            </div>
          </div>
        </div>
        {/* Right — Image */}
        <div className="relative min-h-[300px]">
          <Image
            src="/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp"
            alt="Brad Brisco"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--mvmt-surface-light-muted) 0%, transparent 15%)" }} />
        </div>
      </div>

      {/* Tabs section */}
      <div className="py-12" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <h2
            className="text-xl sm:text-2xl font-medium text-center mb-8"
            style={{
              color: "var(--mvmt-text-primary)",
              fontFamily: "var(--mvmt-font-heading)",
            }}
          >
            What can we help you do?
          </h2>
          <div className="flex justify-center gap-1 border-b" style={{ borderColor: "var(--mvmt-border-light)" }}>
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={cn("px-4 py-3 text-sm font-medium transition-colors border-b-2", i === activeTab ? "border-current" : "border-transparent")}
                style={{ color: i === activeTab ? "var(--mvmt-accent)" : "var(--mvmt-text-secondary)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center max-w-2xl mx-auto">
            <p className="text-base leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
              {tabs[activeTab].content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSplitTabs.displayName = "HeroSplitTabs";
