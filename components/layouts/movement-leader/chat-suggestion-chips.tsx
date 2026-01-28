"use client";

import { cn } from "@/lib/utils";

interface ChatSuggestionChipsProps {
  className?: string;
}

/**
 * Chat Suggestion Chips — Upwork-style layout
 * Left sidebar with chat history, main area with welcome message and suggestion chips
 */
export function ChatSuggestionChips({ className }: ChatSuggestionChipsProps) {
  const suggestions = [
    "... brainstorm ideas for my new cohort",
    "... write or debug curriculum",
    "... create a rough draft for some content",
    "... research a topic for my community",
    "... check my writing for grammar and spelling mistakes",
  ];

  const navLinks = ["Find work", "Deliver work", "Manage team", "Messages"];

  return (
    <section className={cn("relative w-full", className)} style={{ height: "680px", fontFamily: "var(--mvmt-font-body)" }}>
      <div className="flex flex-col h-full overflow-hidden rounded-xl" style={{ border: "1px solid var(--mvmt-border-light)" }}>
        {/* Top Nav Bar */}
        <div className="flex items-center px-4 py-2.5 shrink-0" style={{ backgroundColor: "var(--mvmt-surface-dark)", color: "var(--mvmt-on-dark-primary)" }}>
          <span className="text-sm font-bold mr-6" style={{ color: "var(--mvmt-accent)" }}>Movemental</span>
          <div className="flex gap-4">
            {navLinks.map((link) => (
              <span key={link} className="text-xs cursor-pointer" style={{ color: "var(--mvmt-on-dark-secondary)" }}>{link}</span>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <span style={{ color: "var(--mvmt-on-dark-secondary)" }}>Search</span>
            </div>
            <span className="text-xs px-2 py-1 rounded" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "var(--mvmt-on-dark-secondary)" }}>Jobs</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-on-dark-secondary)" }}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-on-dark-secondary)" }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-on-dark-secondary)" }}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>BB</div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-56 flex flex-col shrink-0" style={{ backgroundColor: "var(--mvmt-surface-light)", borderRight: "1px solid var(--mvmt-border-light)" }}>
            <div className="px-3 py-3">
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm" style={{ border: "1px solid var(--mvmt-border-light)", color: "var(--mvmt-text-secondary)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                New chat
              </button>
            </div>
            <div className="px-4 mt-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--mvmt-text-muted)" }}>Previous 30 days</p>
              <div className="px-2 py-1.5 rounded text-sm cursor-pointer" style={{ color: "var(--mvmt-text-secondary)" }}>Untitled chat</div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col items-center justify-center px-6" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
            <div className="max-w-2xl w-full text-center">
              {/* Decorative icon */}
              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--mvmt-accent)" }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>

              <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
                Hi Brad
              </h1>
              <p className="text-base mb-1" style={{ color: "var(--mvmt-text-secondary)" }}>
                I&apos;m Mara, Movemental&apos;s Mindful AI.{" "}
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
                  Beta
                </span>
              </p>
              <p className="text-sm mb-10" style={{ color: "var(--mvmt-text-muted)" }}>
                Mara can help you work on a project, write proposals, and more.
              </p>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {suggestions.map((chip) => (
                  <span
                    key={chip}
                    className="px-4 py-2 rounded-full text-sm cursor-pointer"
                    style={{ border: "1px solid var(--mvmt-border-light)", color: "var(--mvmt-text-secondary)" }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center rounded-lg px-4 py-3 mx-auto max-w-xl" style={{ border: "1px solid var(--mvmt-border-light)" }}>
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "var(--mvmt-text-primary)" }}
                  readOnly
                />
                <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--mvmt-accent)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-cta-text)" }}>
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="flex items-center justify-center gap-1 mt-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-text-muted)" }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <p className="text-[10px]" style={{ color: "var(--mvmt-text-muted)" }}>
                  Mara is Movemental&apos;s Mindful AI. You&apos;re responsible for your content and work, so be sure to check all responses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ChatSuggestionChips.displayName = "ChatSuggestionChips";
