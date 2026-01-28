"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ArticlesStatsHighlightProps {
  className?: string;
}

const tabs = ["INTRO", "PART I", "PART II", "PART III", "OUTRO"] as const;

/**
 * Stats Highlight Article — Kajabi style (ref-11)
 * Gradient background, tabbed navigation, large stat callout block
 */
export function ArticlesStatsHighlight({ className }: ArticlesStatsHighlightProps) {
  const [activeTab, setActiveTab] = useState<string>("INTRO");

  return (
    <section
      className={cn("relative w-full", className)}
      style={{ background: "var(--mvmt-gradient-hero-brand)" }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        {/* Tabbed navigation */}
        <nav className="flex flex-wrap gap-1 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
              style={{
                backgroundColor:
                  activeTab === tab
                    ? "var(--mvmt-cta-bg)"
                    : "transparent",
                color:
                  activeTab === tab
                    ? "var(--mvmt-cta-text)"
                    : "var(--mvmt-on-dark-muted)",
                border:
                  activeTab === tab
                    ? "none"
                    : "1px solid var(--mvmt-border-on-dark)",
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8"
          style={{
            color: "var(--mvmt-on-dark-primary)",
            fontFamily: "var(--mvmt-font-heading)",
          }}
        >
          The State of the Movement Economy
        </h1>

        {/* Body text */}
        <div className="max-w-3xl space-y-6 text-base leading-relaxed mb-12" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
          <p>
            The creator economy reshaped how individuals monetize skill and audience. But for
            movement leaders — church planters, missional community founders, multiplication
            coaches — the creator economy was never quite the right frame. Their goal is not
            personal brand. It is collective transformation.
          </p>
          <p>
            Enter the movement economy. A new category of tools, platforms, and funding models
            designed specifically for leaders whose success is measured not in followers but in
            multiplied impact. Forge, Exponential, and NewThing have been operating in this
            space for years, but the infrastructure has lagged behind the vision.
          </p>
          <p>
            This report examines the current landscape: where movement leaders invest their time,
            how they deliver training, what tools they rely on, and where the greatest gaps remain.
            The findings point to a single, urgent conclusion.
          </p>
        </div>

        {/* Stat callout block */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-12"
          style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
        >
          <p
            className="text-6xl sm:text-7xl md:text-8xl font-black mb-4"
            style={{
              color: "var(--mvmt-accent)",
              fontFamily: "var(--mvmt-font-heading)",
            }}
          >
            66%
          </p>
          <p
            className="text-lg sm:text-xl font-bold leading-snug"
            style={{ color: "var(--mvmt-text-primary)" }}
          >
            of movement leaders made most of their impact from one multiplication source — coaching.
          </p>
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "var(--mvmt-text-secondary)" }}
          >
            Movemental &amp; Exponential 2023 Leadership Survey, n=1,240 respondents across
            14 networks and 6 countries.
          </p>
        </div>

        {/* More body text */}
        <div className="max-w-3xl space-y-6 text-base leading-relaxed" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
          <p>
            Coaching remains the single highest-leverage activity in the movement economy, yet
            most leaders still deliver it through ad hoc video calls and untracked conversations.
            Alan Hirsch has long argued that apostolic leadership is fundamentally relational,
            but relationship without infrastructure leads to burnout and inconsistency.
          </p>
          <p>
            The platforms that win in the movement economy will be those that honor the relational
            core of coaching while providing the scaffolding — progress tracking, resource delivery,
            cohort management — that allows one coach to multiply into many. Movemental was
            purpose-built for exactly this intersection.
          </p>
          <p>
            As Dave Ferguson often says, &ldquo;Everything rises and falls on multiplication.&rdquo;
            The data confirms it. The question is no longer whether movement leaders need better
            tools, but how quickly they will adopt them.
          </p>
        </div>
      </div>
    </section>
  );
}

ArticlesStatsHighlight.displayName = "ArticlesStatsHighlight";
