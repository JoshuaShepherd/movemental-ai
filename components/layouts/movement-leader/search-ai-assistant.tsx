"use client";

import { cn } from "@/lib/utils";

interface SearchAiAssistantProps {
  className?: string;
}

export function SearchAiAssistant({ className }: SearchAiAssistantProps) {
  const suggestions = [
    ["Personal website", "Leader support email", "Outreach calls", "Lead gen"],
    ["Meeting recorder", "Community outreach", "Support chatbot"],
  ];

  const categories = ["Search", "Product", "Meetings", "Most popular", "Productivity", "Outreach"];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col", className)}
      style={{ background: "var(--mvmt-gradient-hero-brand)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <button className="text-lg" style={{ color: "var(--mvmt-text-primary)" }}>☰</button>
        <button
          className="text-xs font-medium px-4 py-2 rounded-md"
          style={{ border: "1px solid var(--mvmt-border-medium)", color: "var(--mvmt-text-primary)" }}
        >
          + New Agent
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-8"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          How can I help?
        </h1>

        {/* Search Input Card */}
        <div
          className="w-full max-w-2xl rounded-xl p-4 mb-6"
          style={{ backgroundColor: "var(--mvmt-surface-light)", boxShadow: "var(--mvmt-shadow-md)" }}
        >
          <input
            type="text"
            placeholder="Build an agent or perform a task"
            className="w-full text-sm outline-none mb-3"
            style={{ color: "var(--mvmt-text-primary)", backgroundColor: "transparent" }}
            readOnly
          />
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-primary)", border: "1px solid var(--mvmt-border-light)" }}
            >
              ✦ Build apps
            </span>
            <div className="flex items-center gap-3">
              <span style={{ color: "var(--mvmt-text-muted)" }}>📎</span>
              <span style={{ color: "var(--mvmt-text-muted)" }}>🎤</span>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--mvmt-accent)" }}
              >
                <span style={{ color: "var(--mvmt-cta-text)" }}>↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Pills */}
        {suggestions.map((row, ri) => (
          <div key={ri} className="flex flex-wrap justify-center gap-2 mb-2">
            {row.map((s) => (
              <span
                key={s}
                className="text-xs px-4 py-2 rounded-full cursor-pointer"
                style={{ backgroundColor: "var(--mvmt-surface-light)", color: "var(--mvmt-text-primary)", border: "1px solid var(--mvmt-border-light)" }}
              >
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Categories */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span style={{ color: "var(--mvmt-text-muted)" }}>🔍</span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs px-3 py-1.5 rounded-full cursor-pointer"
              style={{ border: "1px solid var(--mvmt-border-light)", color: "var(--mvmt-text-primary)" }}
            >
              {cat}
            </span>
          ))}
          <span className="text-xs" style={{ color: "var(--mvmt-text-secondary)" }}>See all ›</span>
        </div>

        {/* Product Cards Preview */}
        <div className="flex justify-center gap-4">
          <div
            className="w-48 h-24 rounded-lg"
            style={{ backgroundColor: "var(--mvmt-accent)", opacity: 0.15 }}
          />
          <div
            className="w-48 h-24 rounded-lg p-3"
            style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}
          >
            <div className="w-5 h-5 rounded mb-2" style={{ backgroundColor: "var(--mvmt-accent)" }} />
            <p className="text-xs" style={{ color: "var(--mvmt-text-secondary)" }}>Voice of the Disciple</p>
          </div>
        </div>
      </div>
    </section>
  );
}

SearchAiAssistant.displayName = "SearchAiAssistant";
