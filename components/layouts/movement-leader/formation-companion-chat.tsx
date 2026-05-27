"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

interface FormationCompanionChatProps {
  className?: string;
  /** Optional context: courseId, moduleId, lessonIndex for future agent context */
  courseContext?: { courseId?: string; moduleId?: string; lessonIndex?: number };
  /** Initial greeting from the Formation Companion */
  initialMessage?: string;
}

const DEFAULT_GREETING =
  "I'm your Formation Companion for this course. I can help you reflect on what you're learning, connect it to your context, and plan next steps. What's on your mind right now?";

/**
 * Formation Companion chat — in-unit chat window for course flow.
 * Renders agent/user bubbles and input; calls Formation Companion API for replies.
 * Borrows patterns from ChatSupportMinimal and ChatWidgetPopup.
 */
export function FormationCompanionChat({
  className,
  courseContext,
  initialMessage = DEFAULT_GREETING,
}: FormationCompanionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      content: initialMessage,
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/agents/formation-companion/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          courseContext,
        }),
      });

      const data = await res.json();
      const assistantContent =
        data?.data?.message ?? data?.message ?? "I'm here to support your formation. Could you say a bit more?";
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: assistantContent,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallback: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "Something went wrong. Please try again.",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className={cn(
        "relative w-full flex flex-col bg-mvmt-surface-light rounded-xl border border-mvmt-border-light overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-mvmt-border-light bg-mvmt-surface-light-muted/50">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, var(--mvmt-accent), var(--mvmt-accent-muted))" }}
        >
          <span className="text-sm font-bold text-mvmt-cta-text">FC</span>
        </div>
        <div>
          <p className="text-sm font-bold text-mvmt-text-primary">Formation Companion</p>
          <p className="text-xs text-mvmt-text-muted">Reflect and apply what you're learning</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-[280px] max-h-[420px] overflow-y-auto px-4 py-4 space-y-4"
      >
        {messages.map((msg) =>
          msg.role === "assistant" ? (
            <div key={msg.id} className="flex justify-start">
              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-mvmt-text-primary bg-mvmt-surface-light-muted">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-sm text-sm text-mvmt-cta-text bg-mvmt-accent">
                {msg.content}
              </div>
            </div>
          )
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-mvmt-text-muted bg-mvmt-surface-light-muted">
              …
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-mvmt-border-light px-4 py-3 bg-mvmt-surface-light">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 rounded-full border border-mvmt-border-light text-sm text-mvmt-text-primary placeholder:text-mvmt-text-tertiary focus:outline-none focus:ring-2 focus:ring-mvmt-accent/30"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-mvmt-accent text-mvmt-cta-text disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}

FormationCompanionChat.displayName = "FormationCompanionChat";
