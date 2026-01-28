"use client";

import { cn } from "@/lib/utils";

interface ChatSupportMinimalProps {
  className?: string;
}

/**
 * Chat Support Minimal — Apple Support style full-page chat (ref-chat-01)
 * Clean white bg, centered content, agent/user bubble layout, fixed input footer
 */
export function ChatSupportMinimal({ className }: ChatSupportMinimalProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex flex-col", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "var(--mvmt-border-light)" }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "var(--mvmt-text-primary)" }}
            >
              <span className="text-xs font-bold" style={{ color: "var(--mvmt-text-primary)" }}>M</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--mvmt-status-online)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>
                You are connected with an Advisor
              </span>
            </div>
          </div>
          <button
            className="px-4 py-1.5 text-sm font-medium rounded-md border"
            style={{ borderColor: "var(--mvmt-border-light)", color: "var(--mvmt-text-primary)" }}
          >
            End Chat
          </button>
        </div>
      </div>

      {/* Chat body */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-6 py-6 space-y-4 overflow-y-auto pb-24">
        {/* Timestamp */}
        <p className="text-center text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>
          11/04/2024 5:31 PM
        </p>

        {/* System message */}
        <p className="text-center text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>
          You are chatting with Sarah. Your case number is 102450517498.
        </p>

        {/* Agent message 1 */}
        <div className="flex justify-start">
          <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
            Thanks for contacting Movemental Support. My name is Sarah. Please give me a moment to look over your information.
          </div>
        </div>

        {/* Agent message 2 */}
        <div className="flex justify-start">
          <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)" }}>
            Hi there, how are you doing today?
          </div>
        </div>

        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm text-sm" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
            Hi, Sarah. I&apos;m good thank you. I just started leading a new missional community, and I&apos;m considering upgrading to the Leader Plus plan. Does it cover things like cohort management or team coaching tools? And does it also include the multiplication pathway resources?
          </div>
        </div>
      </div>

      {/* Fixed footer input */}
      <div className="border-t" style={{ borderColor: "var(--mvmt-border-light)", backgroundColor: "var(--mvmt-surface-light)" }}>
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center gap-3">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center border"
            style={{ borderColor: "var(--mvmt-border-light)", color: "var(--mvmt-text-tertiary)" }}
          >
            <span className="text-lg leading-none">+</span>
          </button>
          <div className="flex-1 px-4 py-2 rounded-full border text-sm" style={{ borderColor: "var(--mvmt-border-light)", color: "var(--mvmt-text-tertiary)" }}>
            Send message
          </div>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--mvmt-accent)" }}
          >
            <span className="text-xs" style={{ color: "var(--mvmt-cta-text)" }}>&uarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}

ChatSupportMinimal.displayName = "ChatSupportMinimal";
