"use client";

import { cn } from "@/lib/utils";

interface ChatTeamChannelsProps {
  className?: string;
}

/**
 * Chat Team Channels — Twist-style layout
 * Three-panel: left sidebar with channels, center message list, right chat
 */
export function ChatTeamChannels({ className }: ChatTeamChannelsProps) {
  return (
    <section className={cn("relative w-full", className)} style={{ height: "660px", fontFamily: "var(--mvmt-font-body)" }}>
      <div className="flex h-full overflow-hidden rounded-xl" style={{ border: "1px solid var(--mvmt-border-light)" }}>
        {/* Left Sidebar */}
        <div className="w-56 flex flex-col shrink-0" style={{ backgroundColor: "var(--mvmt-surface-light)", borderRight: "1px solid var(--mvmt-border-light)" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>Brad&apos;s Network</span>
            <div className="flex gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-text-muted)" }}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-text-muted)" }}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
            </div>
          </div>

          <nav className="px-2 py-3 space-y-0.5">
            {["Search", "Inbox", "Saved"].map((item) => (
              <div key={item} className="px-3 py-1.5 rounded text-sm cursor-pointer" style={{ color: "var(--mvmt-text-secondary)" }}>{item}</div>
            ))}
            <div className="px-3 py-1.5 rounded text-sm font-medium cursor-pointer" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>Messages</div>
          </nav>

          <div className="px-4 mt-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--mvmt-text-muted)" }}>Favorites</p>
            <div className="px-3 py-1.5 text-sm cursor-pointer" style={{ color: "var(--mvmt-text-secondary)" }}># Church Launch</div>
          </div>

          <div className="px-4 mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--mvmt-text-muted)" }}>Channels</p>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 px-3 py-1.5 text-sm cursor-pointer" style={{ color: "var(--mvmt-text-secondary)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                Admin Resources
              </div>
              <div className="px-3 py-1.5 text-sm cursor-pointer" style={{ color: "var(--mvmt-text-secondary)" }}># General</div>
              <div className="px-3 py-1.5 text-sm cursor-pointer" style={{ color: "var(--mvmt-text-secondary)" }}># Church Launch</div>
              <div className="px-3 py-1.5 text-sm cursor-pointer" style={{ color: "var(--mvmt-text-secondary)" }}># Multiply</div>
              <div className="px-3 py-1.5 text-sm cursor-pointer" style={{ color: "var(--mvmt-accent)" }}>+ New channel</div>
            </div>
          </div>

          <div className="mt-auto px-4 py-3" style={{ borderTop: "1px solid var(--mvmt-border-light)" }}>
            <p className="text-xs cursor-pointer" style={{ color: "var(--mvmt-text-muted)" }}>Invite your team</p>
          </div>
        </div>

        {/* Center Message List */}
        <div className="w-64 flex flex-col shrink-0" style={{ backgroundColor: "var(--mvmt-surface-light)", borderRight: "1px solid var(--mvmt-border-light)" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>Messages</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-text-muted)" }}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
          </div>

          <div className="px-3 py-2 space-y-1">
            <div className="px-3 py-2.5 rounded-md cursor-pointer" style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>General</span>
                <span className="text-[10px]" style={{ color: "var(--mvmt-text-muted)" }}>&lt;1m</span>
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: "var(--mvmt-text-muted)" }}>Me: ok that&apos;s great, thanks @Jon A</p>
            </div>
            <div className="px-3 py-2.5 rounded-md cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>Ada Bot</span>
                <span className="text-[10px]" style={{ color: "var(--mvmt-text-muted)" }}>1d</span>
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: "var(--mvmt-text-muted)" }}>That&apos;s it for now...</p>
            </div>
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
          <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>General</p>
            <p className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>3 members</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* User message (right-aligned) */}
            <div className="flex justify-end">
              <div className="max-w-xs">
                <div className="px-4 py-2.5 rounded-lg text-sm" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
                  hey guys let&apos;s switch the team sync to next Monday, is everyone ok with that?
                </div>
                <p className="text-[10px] text-right mt-1" style={{ color: "var(--mvmt-text-muted)" }}>&lt;1m</p>
              </div>
            </div>

            {/* Reply from Jon */}
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>JA</div>
              <div className="max-w-xs">
                <p className="text-xs font-medium mb-1" style={{ color: "var(--mvmt-text-primary)" }}>Jon Adams <span style={{ color: "var(--mvmt-text-muted)", fontWeight: 400 }}>&lt;1m</span></p>
                <div className="px-4 py-2.5 rounded-lg text-sm" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
                  yup i&apos;m good!
                </div>
              </div>
            </div>

            {/* Another reply from Jon */}
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>JA</div>
              <div className="max-w-xs">
                <div className="px-4 py-2.5 rounded-lg text-sm" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
                  joe is on leave so i&apos;ll let him know 👍
                </div>
              </div>
            </div>

            {/* User reply (right-aligned) */}
            <div className="flex justify-end">
              <div className="max-w-xs">
                <div className="px-4 py-2.5 rounded-lg text-sm" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
                  ok that&apos;s great, thanks @Jon A
                </div>
                <p className="text-[10px] text-right mt-1" style={{ color: "var(--mvmt-text-muted)" }}>&lt;1m</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-5 py-3" style={{ borderTop: "1px solid var(--mvmt-border-light)" }}>
            <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ border: "1px solid var(--mvmt-border-light)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-text-muted)" }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              <input
                type="text"
                placeholder="Group message"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--mvmt-text-primary)" }}
                readOnly
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-text-muted)" }}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
              <span className="text-sm" style={{ color: "var(--mvmt-text-muted)" }}>😊</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-text-muted)" }}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              <button className="ml-1 w-7 h-7 rounded flex items-center justify-center" style={{ backgroundColor: "var(--mvmt-accent)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--mvmt-cta-text)" }}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ChatTeamChannels.displayName = "ChatTeamChannels";
