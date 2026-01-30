"use client";

import { cn } from "@/lib/utils";

interface ChatWarmGreetingProps {
  className?: string;
}

/**
 * Chat Warm Greeting — Claude-style warm interface with sidebar navigation (ref-chat-02)
 * Left sidebar with nav/recents, centered greeting with decorative icon, input card, category chips
 */
export function ChatWarmGreeting({ className }: ChatWarmGreetingProps) {
  const navItems = [
    { label: "+ New chat", isAccent: true },
    { label: "Chats", isAccent: false },
    { label: "Projects", isAccent: false },
    { label: "Resources", isAccent: false },
  ];

  const recentChats = [
    "Missional community launch plan",
    "Coaching session prep notes",
    "Multiplication pathway outline",
    "Church planting assessment review",
  ];

  const categoryChips = ["Write", "Learn", "Lead", "Plan", "Coach's choice"];

  return (
    <section className={cn("relative w-full min-h-screen flex bg-mvmt-surface-light", className)} >
      {/* Left sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col border-r px-4 py-5" style={{ borderColor: "var(--mvmt-border-light)" }}>
        <span className="text-sm font-bold tracking-wide mb-6 text-mvmt-text-primary">Movemental</span>

        <nav className="space-y-1 mb-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              style={{ color: item.isAccent ? "var(--mvmt-accent)" : "var(--mvmt-text-secondary)" }}
            >
              {item.label}
            </div>
          ))}
        </nav>

        <span className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--mvmt-text-tertiary)" }}>
          Recents
        </span>
        <div className="space-y-1 flex-1 overflow-y-auto">
          {recentChats.map((chat) => (
            <div key={chat} className="px-3 py-1.5 text-xs rounded-md truncate cursor-pointer text-mvmt-text-secondary">
              {chat}
            </div>
          ))}
        </div>

        {/* User */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-md bg-mvmt-surface-light-muted">
          <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--mvmt-accent-muted)" }} />
          <div>
            <p className="text-xs font-medium text-mvmt-text-primary">Brad Brisco</p>
            <p className="text-2xs" style={{ color: "var(--mvmt-text-tertiary)" }}>Pro plan</p>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Decorative icon */}
        <div className="text-3xl mb-4 text-mvmt-accent">&#10042;</div>

        <h1 className="text-3xl font-bold mb-10 text-mvmt-text-primary">
          What&apos;s new, Brad?
        </h1>

        {/* Input card */}
        <div className="w-full max-w-xl border rounded-xl p-4" style={{ borderColor: "var(--mvmt-border-light)" }}>
          <div className="text-sm mb-4" style={{ color: "var(--mvmt-text-tertiary)" }}>
            How can I help you today?
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-base" style={{ color: "var(--mvmt-text-tertiary)" }}>+</span>
              <span className="text-sm" style={{ color: "var(--mvmt-text-tertiary)" }}>&#9776;</span>
              <span className="px-2 py-0.5 text-xs rounded-full border text-mvmt-text-secondary" style={{ borderColor: "var(--mvmt-border-light)" }}>
                Research
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>Sonnet 4 &#9662;</span>
              <button className="w-7 h-7 rounded-full flex items-center justify-center bg-mvmt-accent">
                <span className="text-xs text-mvmt-cta-text">&uarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {categoryChips.map((chip) => (
            <span
              key={chip}
              className="px-4 py-1.5 rounded-full border text-sm cursor-pointer text-mvmt-text-secondary"
              style={{ borderColor: "var(--mvmt-border-light)" }}
            >
              {chip}
            </span>
          ))}
        </div>
      </main>
    </section>
  );
}

ChatWarmGreeting.displayName = "ChatWarmGreeting";
