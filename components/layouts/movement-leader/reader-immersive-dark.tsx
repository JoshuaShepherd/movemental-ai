"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReaderImmersiveDarkProps {
  className?: string;
}

/**
 * Full-screen dark reading mode with font/theme controls,
 * warm sepia tint option. Inspired by Kindle dark mode.
 */
export function ReaderImmersiveDark({ className }: ReaderImmersiveDarkProps) {
  const [showControls, setShowControls] = useState(false);

  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-surface-dark", className)}>
      {/* Minimal floating top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3">
        <button className="text-sm text-mvmt-on-dark-muted">← Library</button>
        <span className="text-xs text-mvmt-on-dark-muted">
          The Forgotten Ways — Alan Hirsch
        </span>
        <button
          onClick={() => setShowControls(!showControls)}
          className="text-sm text-mvmt-on-dark-muted"
        >
          Aa
        </button>
      </div>

      {/* Font/theme control panel */}
      {showControls && (
        <div className="mx-auto w-72 rounded-lg p-4 mb-4 bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-mvmt-on-dark-muted">Font Size</span>
            <div className="flex items-center gap-3">
              <button className="text-xs text-mvmt-on-dark-secondary">A-</button>
              <div className="w-20 h-1 rounded-full bg-mvmt-border-on-dark relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-mvmt-accent" />
              </div>
              <button className="text-sm text-mvmt-on-dark-secondary">A+</button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-mvmt-on-dark-muted">Theme</span>
            <div className="flex items-center gap-2">
              {[
                { label: "Dark", bg: "bg-mvmt-surface-dark" },
                { label: "Sepia", bg: "bg-mvmt-surface-light-muted" },
                { label: "Light", bg: "bg-mvmt-surface-light" },
              ].map((theme) => (
                <button
                  key={theme.label}
                  className={cn(
                    "w-7 h-7 rounded-full border border-mvmt-border-on-dark",
                    theme.bg,
                    theme.label === "Dark" && "ring-2 ring-mvmt-accent"
                  )}
                  title={theme.label}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-mvmt-on-dark-muted">Font</span>
            <div className="flex items-center gap-2 text-xs text-mvmt-on-dark-secondary">
              <button className="px-2 py-1 rounded border border-mvmt-accent text-mvmt-accent">Serif</button>
              <button className="px-2 py-1 rounded border border-mvmt-border-on-dark">Sans</button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="flex-1 max-w-xl mx-auto w-full px-6 py-8">
        <div className="space-y-6">
          <p className="text-lg leading-[2] text-mvmt-on-dark-primary font-mvmt-heading">
            <span className="text-5xl font-bold float-left mr-3 leading-none text-mvmt-on-dark-primary">T</span>he early church didn&rsquo;t have buildings, budgets, or professional clergy. What it had was an apostolic imagination — a capacity to see every believer as a potential missionary and every gathering as a potential movement. This imagination was so powerful that within three centuries, a persecuted minority had become the dominant faith of the Roman Empire.
          </p>
          <p className="text-lg leading-[2] text-mvmt-on-dark-primary font-mvmt-heading">
            What happened? How did a ragtag group of fishermen, tax collectors, and tent-makers turn the world upside down? The answer, I believe, lies in six elements of what I call &ldquo;apostolic genius&rdquo; — the built-in life force of the people of God.
          </p>
          <p className="text-lg leading-[2] text-mvmt-on-dark-primary font-mvmt-heading">
            These elements are not new inventions. They are rediscoveries — ancient practices and postures that have been buried under centuries of institutional accumulation. When we strip away the layers of Christendom and return to these core dynamics, we find a movement engine that is as powerful today as it was in the first century.
          </p>
          <p className="text-lg leading-[2] text-mvmt-on-dark-primary font-mvmt-heading">
            The first element is <em>Jesus is Lord</em> — not as a doctrinal statement but as a living confession that reorganizes all of life around the person and mission of Christ. The second is <em>Disciple Making</em> — the irreducible practice of one life shaping another in the way of Jesus.
          </p>
        </div>
      </article>

      {/* Bottom progress */}
      <div className="px-6 py-4">
        <div className="max-w-xl mx-auto">
          <div className="w-full h-0.5 rounded-full bg-mvmt-border-on-dark mb-2">
            <div className="h-full w-[18%] rounded-full bg-mvmt-accent" />
          </div>
          <div className="flex items-center justify-between text-xs text-mvmt-on-dark-muted">
            <span>Location 83 of 456</span>
            <span>18% · ~45 min remaining</span>
          </div>
        </div>
      </div>
    </section>
  );
}

ReaderImmersiveDark.displayName = "ReaderImmersiveDark";
