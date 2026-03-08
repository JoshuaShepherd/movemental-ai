"use client";

import { cn } from "@/lib/utils";

interface SearchAiConversationalProps {
  className?: string;
}

const sources = [
  { num: "1", name: "Brad Brisco — Movements 101" },
  { num: "2", name: "Exponential Resources" },
  { num: "3", name: "Forge Training Guide" },
];

const relatedQuestions = [
  "What are the key metrics for measuring movement health?",
  "How does Alan Hirsch define apostolic leadership?",
  "What is the difference between church planting and church planting movements?",
];

export function SearchAiConversational({ className }: SearchAiConversationalProps) {
  return (
    <div className={cn("bg-mvmt-surface-light min-h-[80vh]", className)}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Heading */}
        <h1 className="text-mvmt-text-primary text-2xl font-bold font-mvmt-heading text-center">
          Ask anything about movements
        </h1>

        {/* Search bar */}
        <div className="mt-6 rounded-xl border border-mvmt-border-light bg-mvmt-surface-light px-5 py-4 flex items-center gap-3">
          <span>✨</span>
          <span className="text-mvmt-text-primary text-sm flex-1">
            How do I start a church planting movement?
          </span>
          <button className="w-8 h-8 rounded-full bg-mvmt-accent flex items-center justify-center text-mvmt-cta-text text-sm">
            →
          </button>
        </div>

        {/* Answer section */}
        <div className="mt-8">
          {/* Sources row */}
          <div className="flex gap-2 mb-4">
            {sources.map((s) => (
              <div
                key={s.num}
                className="bg-mvmt-surface-light-muted rounded-lg px-3 py-2 flex items-center gap-2 text-xs"
              >
                <span className="w-5 h-5 rounded-full bg-mvmt-accent text-mvmt-cta-text flex items-center justify-center text-xs">
                  {s.num}
                </span>
                <span className="text-mvmt-text-primary">{s.name}</span>
              </div>
            ))}
          </div>

          {/* Answer text */}
          <p className="text-mvmt-text-primary text-sm leading-relaxed mb-4">
            Starting a church planting movement begins with embracing an apostolic posture
            toward mission. Brad Brisco emphasizes that movements are not programs to
            manage but organic expressions of the gospel taking root in culture{" "}
            <span className="text-mvmt-accent text-xs font-medium">[1]</span>. The first
            step is identifying a people group or neighborhood, immersing yourself in their
            context, and forming a small reproducible community of disciples who can
            multiply.
          </p>
          <p className="text-mvmt-text-primary text-sm leading-relaxed">
            Exponential research shows that the most effective movements share five
            characteristics: empowered leaders, simple and reproducible structures, rapid
            multiplication, decentralized authority, and an unwavering focus on disciple
            making{" "}
            <span className="text-mvmt-accent text-xs font-medium">[2]</span>. Alan
            Hirsch and the Forge network advocate for a learning-by-doing apprenticeship
            model where new leaders are formed in the field rather than the classroom{" "}
            <span className="text-mvmt-accent text-xs font-medium">[3]</span>. Dave
            Ferguson of NewThing adds that every leader must become a "hero maker" —
            someone who multiplies their impact by investing deeply in others.
          </p>
        </div>

        {/* Related Questions */}
        <div className="mt-8">
          <h3 className="text-mvmt-text-primary text-base font-semibold">
            Related Questions
          </h3>
          {relatedQuestions.map((q, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 border-b border-mvmt-border-light cursor-pointer"
            >
              <span className="text-mvmt-accent">→</span>
              <span className="text-mvmt-text-primary text-sm">{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SearchAiConversational.displayName = "SearchAiConversational";
