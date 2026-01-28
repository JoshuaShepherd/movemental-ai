"use client";

import { cn } from "@/lib/utils";

interface ChatWidgetPopupProps {
  className?: string;
}

/**
 * Chat Widget Popup — Front-style floating chat widget in bottom-right corner (ref-chat-04)
 * Empty page with a floating card containing agent/user message bubbles and input
 */
export function ChatWidgetPopup({ className }: ChatWidgetPopupProps) {
  return (
    <section className={cn("relative w-full min-h-screen", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Floating widget — bottom right */}
      <div className="absolute bottom-6 right-6 w-80 rounded-xl overflow-hidden flex flex-col" style={{ boxShadow: "var(--mvmt-shadow-lg)" }}>
        {/* Widget header */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "var(--mvmt-accent)" }}>
          <span className="text-sm font-semibold" style={{ color: "var(--mvmt-cta-text)" }}>Welcome</span>
          <div className="flex items-center gap-2">
            <span className="text-xs cursor-pointer" style={{ color: "var(--mvmt-cta-text)" }}>&#x26F6;</span>
            <span className="text-xs cursor-pointer" style={{ color: "var(--mvmt-cta-text)" }}>&#x2304;</span>
          </div>
        </div>

        {/* Widget body */}
        <div className="px-4 py-4 space-y-4" style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
          {/* Agent message 1 */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--mvmt-accent), var(--mvmt-accent-muted))" }} />
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--mvmt-text-primary)" }}>Sarah</p>
              <div className="px-3 py-2 rounded-xl rounded-tl-sm text-xs leading-relaxed" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
                Hi there, this is a sample message from a support team member.
              </div>
              <p className="text-[10px] mt-1" style={{ color: "var(--mvmt-text-tertiary)" }}>2 minutes ago</p>
            </div>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div>
              <div className="px-3 py-2 rounded-xl rounded-tr-sm text-xs leading-relaxed" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
                Hi there, this is a sample message from a community leader.
              </div>
              <p className="text-[10px] mt-1 text-right" style={{ color: "var(--mvmt-text-tertiary)" }}>2 minutes ago</p>
            </div>
          </div>

          {/* Agent message 2 */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--mvmt-accent), var(--mvmt-accent-muted))" }} />
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--mvmt-text-primary)" }}>Sarah</p>
              <div className="px-3 py-2 rounded-xl rounded-tl-sm text-xs leading-relaxed" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
                Feel free to continue the conversation and test the chat widget experience below.
              </div>
              <p className="text-[10px] mt-1" style={{ color: "var(--mvmt-text-tertiary)" }}>1 minute ago</p>
            </div>
          </div>
        </div>

        {/* Input footer */}
        <div className="px-4 py-3 border-t" style={{ borderColor: "var(--mvmt-border-light)", backgroundColor: "var(--mvmt-surface-light)" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ borderColor: "var(--mvmt-accent)" }}>
            <span className="text-sm" style={{ color: "var(--mvmt-text-tertiary)" }}>&#x1F4CE;</span>
            <span className="flex-1 text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>Type a message...</span>
          </div>
        </div>
      </div>
    </section>
  );
}

ChatWidgetPopup.displayName = "ChatWidgetPopup";
