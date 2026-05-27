"use client";

import { cn } from "@/lib/utils";

interface SearchCommandPaletteProps {
  className?: string;
}

const recentItems = [
  { icon: "📄", title: "Movement Leadership Principles — Brad Brisco", shortcut: "⌘1" },
  { icon: "📊", title: "Network Growth Assessment — Exponential", shortcut: "⌘2" },
  { icon: "📹", title: "Discipleship Framework Video — Alan Hirsch", shortcut: "⌘3" },
];

const quickActions = [
  { icon: "✏️", title: "Create New Article" },
  { icon: "📋", title: "Start Assessment" },
  { icon: "👥", title: "Browse Leaders" },
];

export function SearchCommandPalette({ className }: SearchCommandPaletteProps) {
  return (
    <section
      className={cn(
        "bg-mvmt-surface-light-muted min-h-[80vh] flex items-center justify-center px-4",
        className
      )}
    >
      <div className="max-w-xl w-full bg-mvmt-surface-light rounded-xl shadow-lg border border-mvmt-border-light overflow-hidden">
        {/* Search Input */}
        <div className="px-4 py-3 flex items-center gap-3 border-b border-mvmt-border-light">
          <span className="text-mvmt-text-muted">🔍</span>
          <span className="text-mvmt-text-primary text-sm">Search or type a command...</span>
        </div>

        {/* Recent */}
        <div className="px-2 py-2">
          <span className="text-mvmt-text-muted text-xs uppercase tracking-wider px-2">
            Recent
          </span>
          <div className="mt-1 flex flex-col">
            {recentItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-mvmt-surface-light-muted"
              >
                <span className="w-5 h-5 rounded bg-mvmt-surface-light-muted flex items-center justify-center text-xs text-mvmt-text-secondary">
                  {item.icon}
                </span>
                <span className="text-mvmt-text-primary text-sm flex-1">{item.title}</span>
                <span className="text-mvmt-text-muted text-xs">{item.shortcut}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-mvmt-border-light mx-2" />

        {/* Quick Actions */}
        <div className="px-2 py-2">
          <span className="text-mvmt-text-muted text-xs uppercase tracking-wider px-2">
            Quick Actions
          </span>
          <div className="mt-1 flex flex-col">
            {quickActions.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-mvmt-surface-light-muted"
              >
                <span className="w-5 h-5 rounded bg-mvmt-surface-light-muted flex items-center justify-center text-xs text-mvmt-text-secondary">
                  {item.icon}
                </span>
                <span className="text-mvmt-text-primary text-sm flex-1">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-4 py-2 border-t border-mvmt-border-light bg-mvmt-surface-light-muted flex items-center justify-between">
          <span className="text-mvmt-text-muted text-xs">↑↓ to navigate</span>
          <span className="text-mvmt-text-muted text-xs">↵ to select · esc to close</span>
        </div>
      </div>
    </section>
  );
}

SearchCommandPalette.displayName = "SearchCommandPalette";
