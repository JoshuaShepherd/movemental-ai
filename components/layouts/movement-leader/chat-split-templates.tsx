"use client";

import { cn } from "@/lib/utils";

interface ChatSplitTemplatesProps {
  className?: string;
}

/**
 * Chat Split Templates — Strut-style layout
 * Left kanban board panel with narrow sidebar, right chat panel
 */
export function ChatSplitTemplates({ className }: ChatSplitTemplatesProps) {
  const cards = [
    { title: "Offer Special Promotions or Discounts", desc: "Run a limited-time offer for new cohort members joining this quarter.", tags: ["Marketing", "Promo"] },
    { title: "Highlight the Vast Collection", desc: "Showcase the breadth of resources available on the Movemental platform.", tags: ["Product"] },
    { title: "Feature Popular or Trending Designs", desc: "Surface the most-used pathway templates and assessment frameworks.", tags: ["Product"] },
    { title: "Showcase User Testimonials", desc: "Gather stories from church planters who have used Movemental coaching.", tags: [] },
  ];

  return (
    <section className={cn("relative w-full font-mvmt-body", className)} style={{ height: "700px" }}>
      <div className="flex h-full overflow-hidden rounded-xl border border-mvmt-border-light">
        {/* Narrow left icon sidebar */}
        <div className="w-12 flex flex-col items-center py-3 gap-4 shrink-0 text-mvmt-on-dark-secondary bg-mvmt-surface-dark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
          <div className="flex-1" />
          <div className="space-y-3 text-2xs text-center">
            {["Getting Started", "Marketing", "Gardening", "Social Media"].map((ws, i) => (
              <div
                key={ws}
                className="w-7 h-7 rounded flex items-center justify-center text-2xs font-bold cursor-pointer"
                style={{
                  backgroundColor: i === 1 ? "var(--mvmt-accent)" : "rgba(255,255,255,0.1)",
                  color: i === 1 ? "var(--mvmt-cta-text)" : "var(--mvmt-on-dark-secondary)",
                }}
              >
                {ws[0]}
              </div>
            ))}
          </div>
          <p className="text-3xs mt-1 text-mvmt-on-dark-secondary">Browse</p>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          <div className="mt-auto space-y-3 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          </div>
        </div>

        {/* Left Board Panel */}
        <div className="flex-1 flex flex-col bg-mvmt-surface-light">
          {/* Top bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-b-mvmt-border-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mvmt-text-muted"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            <div className="flex -space-x-1">
              {[0, 1].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-mvmt-accent" style={{ border: "2px solid var(--mvmt-surface-light)", opacity: 1 - i * 0.3 }} />
              ))}
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full text-mvmt-text-secondary bg-mvmt-surface-light-muted">Movemental</span>
            <div className="flex-1" />
            <div className="flex gap-1">
              {["list", "grid", "board"].map((v) => (
                <div key={v} className="w-7 h-7 rounded flex items-center justify-center cursor-pointer text-2xs text-mvmt-text-muted" style={{ backgroundColor: v === "board" ? "var(--mvmt-surface-light-muted)" : "transparent" }}>
                  {v[0].toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-3">
            <h2 className="text-lg font-semibold text-mvmt-text-primary">Marketing</h2>
          </div>

          {/* Columns */}
          <div className="flex-1 flex gap-4 px-4 pb-4 overflow-x-auto">
            <div className="w-64 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-mvmt-text-primary">Ideas</span>
                <span className="text-xs text-mvmt-text-muted">6</span>
                <span className="text-xs cursor-pointer text-mvmt-text-muted">+</span>
                <span className="text-xs text-mvmt-text-muted">...</span>
              </div>
              <div className="space-y-2">
                {cards.map((card) => (
                  <div key={card.title} className="p-3 rounded-lg bg-mvmt-surface-light border border-mvmt-border-light">
                    <p className="text-sm font-medium text-mvmt-text-primary">{card.title}</p>
                    <p className="text-xs mt-1 text-mvmt-text-muted">{card.desc}</p>
                    {card.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {card.tags.map((tag) => (
                          <span key={tag} className="text-2xs px-1.5 py-0.5 rounded text-mvmt-text-secondary bg-mvmt-surface-light-muted">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-64 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-mvmt-text-primary">Research</span>
                <span className="text-xs text-mvmt-text-muted">0</span>
                <span className="text-xs cursor-pointer text-mvmt-text-muted">+</span>
                <span className="text-xs text-mvmt-text-muted">...</span>
              </div>
            </div>

            <div className="w-64 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-mvmt-text-primary">Outli...</span>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 flex items-center gap-2 border-t border-t-mvmt-border-light">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mvmt-accent"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            <span className="text-2xs text-mvmt-text-muted">Ctrl+K</span>
          </div>
        </div>

        {/* Right Chat Panel */}
        <div className="w-96 flex flex-col shrink-0 bg-mvmt-surface-light border-l border-l-mvmt-border-light">
          <div className="flex items-center justify-between px-4 py-3 border-b border-b-mvmt-border-light">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mvmt-text-muted"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mvmt-text-muted"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
            </div>
            <button className="text-xs px-3 py-1 rounded text-mvmt-text-muted border border-mvmt-border-light">Clear Chat</button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div>
              <p className="text-xs font-semibold mb-1 text-mvmt-text-primary">You</p>
              <p className="text-sm text-mvmt-text-secondary">
                Write an announcement about an exclusive offer for our movement leader community launching this spring.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-mvmt-text-primary">Movemental</span>
                <span className="w-2 h-2 rounded-full bg-mvmt-accent"  />
              </div>
              <div className="text-sm space-y-2 text-mvmt-text-secondary">
                <p className="font-semibold text-mvmt-text-primary">Exclusive Spring Offer for Movement Leaders</p>
                <p>We are thrilled to announce an exclusive offer for our movement leader community. This spring, all active members of the Movemental platform will receive early access to our new multiplication pathway — designed by Alan Hirsch and Dave Ferguson to help you launch missional communities with confidence.</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="text-xs px-3 py-1.5 rounded text-mvmt-text-secondary border border-mvmt-border-light">Create a doc</button>
                <button className="text-xs px-3 py-1.5 rounded text-mvmt-text-secondary border border-mvmt-border-light">Copy to clipboard</button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-mvmt-text-muted">Movemental is typing...</span>
              <button className="text-xs px-2 py-1 rounded text-mvmt-text-muted border border-mvmt-border-light">Stop writing</button>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-t-mvmt-border-light">
            <div className="flex items-center rounded-lg px-3 py-2.5 border border-mvmt-border-light">
              <input
                type="text"
                placeholder="Send a message about Content"
                className="flex-1 bg-transparent text-sm outline-none text-mvmt-text-primary"
                readOnly
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mvmt-accent"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ChatSplitTemplates.displayName = "ChatSplitTemplates";
