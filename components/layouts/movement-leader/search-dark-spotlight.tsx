"use client";

import { cn } from "@/lib/utils";

interface SearchDarkSpotlightProps {
  className?: string;
}

const suggested = [
  { title: "Multiplication Movements", type: "Article", icon: "MM" },
  { title: "Dave Ferguson Interview", type: "Video", icon: "DF" },
  { title: "Forge Network", type: "Organization", icon: "FN" },
  { title: "Leadership Assessment", type: "Tool", icon: "LA" },
];

export function SearchDarkSpotlight({ className }: SearchDarkSpotlightProps) {
  return (
    <div
      className={cn(
        "bg-mvmt-surface-dark min-h-[80vh] flex items-center justify-center px-6",
        className
      )}
    >
      <div className="max-w-lg w-full bg-mvmt-surface-dark-elevated rounded-2xl overflow-hidden border border-mvmt-border-on-dark">
        {/* Search input */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-mvmt-border-on-dark">
          <span className="text-mvmt-on-dark-muted text-lg">🔍</span>
          <span className="text-mvmt-on-dark-primary text-base">Search Movemental</span>
        </div>

        {/* Top Hit */}
        <div className="px-5 pt-3 pb-1">
          <span className="text-mvmt-on-dark-muted text-xs uppercase tracking-wider">
            Top Hit
          </span>
        </div>
        <div className="px-5 py-3 flex items-center gap-4 border-b border-[var(--mvmt-border-on-dark)]">
          <div className="w-10 h-10 rounded-lg bg-mvmt-accent flex items-center justify-center text-mvmt-cta-text text-sm font-bold">
            CP
          </div>
          <div>
            <p className="text-mvmt-on-dark-primary text-sm font-medium">
              Church Planting Intensive
            </p>
            <p className="text-mvmt-on-dark-secondary text-xs">Course · Brad Brisco</p>
          </div>
        </div>

        {/* Suggested */}
        <div className="px-5 pt-3 pb-1">
          <span className="text-mvmt-on-dark-muted text-xs uppercase tracking-wider">
            Suggested
          </span>
        </div>
        {suggested.map((item, i) => (
          <div
            key={i}
            className={cn(
              "px-5 py-2.5 flex items-center gap-3",
              i < suggested.length - 1 && "border-b border-[var(--mvmt-border-on-dark)]"
            )}
          >
            <div className="w-6 h-6 rounded bg-mvmt-surface-dark flex items-center justify-center text-mvmt-on-dark-muted text-xs">
              {item.icon.charAt(0)}
            </div>
            <span className="text-mvmt-on-dark-primary text-sm flex-1">{item.title}</span>
            <span className="text-mvmt-on-dark-muted text-xs">{item.type}</span>
          </div>
        ))}

        {/* Bottom hint */}
        <div className="px-5 py-3 border-t border-mvmt-border-on-dark">
          <span className="text-mvmt-on-dark-muted text-xs">Search the web...</span>
        </div>
      </div>
    </div>
  );
}

SearchDarkSpotlight.displayName = "SearchDarkSpotlight";
