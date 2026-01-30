"use client";

import { cn } from "@/lib/utils";

interface ChatAssistantFriendlyProps {
  className?: string;
}

/**
 * Chat Assistant Friendly — Monarch-style three-panel layout
 * Dark nav sidebar, center chat list, right main chat area
 */
export function ChatAssistantFriendly({ className }: ChatAssistantFriendlyProps) {
  const navItems = [
    "Dashboard", "Groups", "Content", "Pathways", "Reports",
    "Library", "Recurring", "Goals", "Coaching", "Feedback",
  ];

  return (
    <section className={cn("relative w-full font-mvmt-body", className)} style={{ height: "680px" }}>
      <div className="flex h-full overflow-hidden rounded-xl border border-mvmt-border-light">
        {/* Left Nav Sidebar */}
        <div className="w-56 flex flex-col shrink-0 text-mvmt-on-dark-primary bg-mvmt-surface-dark">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-mvmt-cta-text bg-mvmt-accent">M</div>
            <div className="flex-1" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          </div>

          <div className="mx-4 mb-3 px-3 py-2 rounded-md text-xs" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex justify-between mb-1">
              <span>Free trial</span>
              <span className="text-mvmt-on-dark-secondary">20 days left</span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <div className="h-full rounded-full" style={{ width: "66%", backgroundColor: "var(--mvmt-success)" }} />
            </div>
          </div>

          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
              <div
                key={item}
                className="px-3 py-2 rounded-md text-sm cursor-pointer text-mvmt-on-dark-secondary"
              >
                {item}
              </div>
            ))}
            <div
              className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-mvmt-cta-text bg-mvmt-accent"
            >
              Assistant
            </div>
          </nav>

          <div className="px-4 py-3 space-y-2 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="px-3 py-2 rounded-md text-center cursor-pointer text-mvmt-on-dark-secondary" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              Get 1 Month Free
            </div>
            <div className="px-3 py-1 cursor-pointer text-mvmt-on-dark-secondary">Help &amp; Support</div>
            <div className="flex items-center gap-2 px-3 py-1">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-2xs font-bold text-mvmt-cta-text bg-mvmt-accent">BB</div>
              <span className="text-sm">Brad Brisco</span>
            </div>
          </div>
        </div>

        {/* Center Chat List */}
        <div className="w-64 flex flex-col shrink-0 bg-mvmt-surface-light border-r border-r-mvmt-border-light">
          <div className="px-4 py-3 font-semibold text-sm text-mvmt-text-primary border-b border-b-mvmt-border-light">
            Chats
          </div>
          <div className="px-3 py-3">
            <div className="px-3 py-2 rounded-md bg-mvmt-surface-light-muted">
              <p className="text-sm font-medium text-mvmt-text-primary">New chat</p>
              <p className="text-xs mt-0.5 text-mvmt-text-muted">less than a minute ago</p>
            </div>
          </div>
        </div>

        {/* Right Main Chat */}
        <div className="flex-1 flex flex-col bg-mvmt-surface-light">
          <div className="flex items-center justify-between px-5 py-3 border-b border-b-mvmt-border-light">
            <span className="text-sm font-semibold text-mvmt-text-primary">New chat</span>
            <button className="text-xs px-3 py-1 rounded text-mvmt-text-muted border border-mvmt-border-light">Delete</button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <p className="text-xs font-medium text-mvmt-text-muted">Assistant AI — Today at 17:32</p>
            <div className="p-4 rounded-lg text-sm leading-relaxed max-w-lg space-y-3 text-mvmt-text-primary bg-mvmt-surface-light-muted">
              <p>Hi there! I&apos;m your Movemental Assistant. I&apos;m here to help you understand your community, provide support, and suggest strategies to improve your leadership health.</p>
              <p>Let&apos;s work together to achieve your goals!</p>
              <p>Here are some questions you might want to ask — or type anything that comes to mind and I&apos;ll answer your questions.</p>
            </div>

            <p className="text-xs font-medium mt-6 text-mvmt-text-muted">Brad Brisco — Today at 17:33</p>
            <div className="p-4 rounded-lg text-sm max-w-lg ml-auto text-mvmt-cta-text bg-mvmt-accent">
              How are my cohorts doing?
            </div>

            <p className="text-xs font-medium text-mvmt-text-muted">Assistant AI — Today at 17:33</p>
            <div className="p-4 rounded-lg text-sm max-w-lg text-mvmt-text-primary bg-mvmt-surface-light-muted">
              Checking on your cohorts...
            </div>
          </div>

          <div className="px-5 py-3 border-t border-t-mvmt-border-light">
            <div className="flex items-center gap-2 rounded-lg px-4 py-2.5 border border-mvmt-border-light">
              <input
                type="text"
                placeholder="Ask anything about your community..."
                className="flex-1 bg-transparent text-sm outline-none text-mvmt-text-primary"
                readOnly
              />
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-mvmt-cta-text bg-mvmt-accent">Send</button>
            </div>
            <p className="text-2xs mt-2 text-center text-mvmt-text-muted">
              Movemental AI may produce inaccurate information. Verify important details with your coach or community leader.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

ChatAssistantFriendly.displayName = "ChatAssistantFriendly";
