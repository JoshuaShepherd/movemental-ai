"use client";

import { cn } from "@/lib/utils";

interface ChatDarkSidebarProps {
  className?: string;
}

/**
 * Chat Dark Sidebar — OpenAI/ChatGPT-style layout
 * Dark left sidebar with nav, light main chat area
 */
export function ChatDarkSidebar({ className }: ChatDarkSidebarProps) {
  return (
    <section className={cn("relative w-full font-mvmt-body", className)} style={{ height: "620px" }}>
      <div className="flex h-full overflow-hidden rounded-xl border border-mvmt-border-light">
        {/* Left Sidebar */}
        <div className="w-56 flex flex-col shrink-0 text-mvmt-on-dark-primary bg-mvmt-surface-dark">
          <div className="px-3 py-4">
            <button
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-mvmt-on-dark-primary"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
              New chat
            </button>
          </div>

          <div className="flex-1" />

          <div className="px-3 py-4 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-mvmt-on-dark-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              Dark mode
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-mvmt-on-dark-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              Movemental Community
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-mvmt-on-dark-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              Updates &amp; FAQ
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-mvmt-on-dark-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Log out
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-mvmt-surface-light">
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            {/* User message */}
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-mvmt-cta-text bg-mvmt-accent">
                BB
              </div>
              <p className="text-sm leading-relaxed pt-1 text-mvmt-text-primary">
                How do I start a missional community in my neighborhood?
              </p>
            </div>

            {/* Bot message */}
            <div className="max-w-3xl mx-auto rounded-lg px-6 py-5 bg-mvmt-surface-light-muted">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-mvmt-accent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mvmt-cta-text"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <div className="pt-1">
                  <div className="w-2.5 h-4 inline-block bg-mvmt-text-primary" style={{ animation: "pulse 1s infinite" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div className="px-6 py-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center rounded-lg px-4 py-3 bg-mvmt-surface-light border border-mvmt-border-light">
                <input
                  type="text"
                  placeholder="Send a message..."
                  className="flex-1 bg-transparent text-sm outline-none text-mvmt-text-primary"
                  readOnly
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mvmt-text-muted"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </div>
              <p className="text-2xs mt-2 text-center text-mvmt-text-muted">
                Movemental Jan 30 Version. Our goal is to make AI coaching more natural and safe to interact with.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ChatDarkSidebar.displayName = "ChatDarkSidebar";
