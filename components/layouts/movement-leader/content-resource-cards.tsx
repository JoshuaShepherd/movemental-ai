"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ContentResourceCardsProps {
  className?: string;
}

/**
 * Resource Cards — WSJ-style 3-col cards with images + topic selector
 * Light bg, topic filter pills, 6 cards with image, tag, title, excerpt, date
 */
export function ContentResourceCards({ className }: ContentResourceCardsProps) {
  const [activeTopic, setActiveTopic] = useState("All");
  const topics = ["All", "Discipleship", "Leadership", "Church Planting", "Multiplication", "Culture"];

  const cards = [
    { topic: "Discipleship", title: "The Lost Art of Slow Formation", excerpt: "Why the most effective disciple-makers resist the urge to scale and instead invest deeply in a few.", date: "April 2024", color: "#F1F5F9" },
    { topic: "Leadership", title: "Hero Makers: Five Practices for Leading Others", excerpt: "Dave Ferguson's framework for leaders who measure success by the leaders they develop.", date: "March 2024", color: "#F0FDF4" },
    { topic: "Church Planting", title: "Planting in the Margins", excerpt: "How to start missional communities in overlooked neighborhoods without institutional backing.", date: "March 2024", color: "#FFF7ED" },
    { topic: "Multiplication", title: "From Addition to Multiplication", excerpt: "The mindset shift every movement leader must make to move beyond linear growth.", date: "February 2024", color: "#FDF2F8" },
    { topic: "Culture", title: "Creating a Sending Culture", excerpt: "Practical steps for building an organizational DNA that celebrates releasing leaders, not retaining them.", date: "January 2024", color: "#F5F3FF" },
    { topic: "Discipleship", title: "Rhythms of a Missional Life", excerpt: "Daily, weekly, and seasonal practices that form people into the way of Jesus in their neighborhoods.", date: "January 2024", color: "#ECFDF5" },
  ];

  const filtered = activeTopic === "All" ? cards : cards.filter((c) => c.topic === activeTopic);

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light-muted", className)} >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-mvmt-text-primary font-mvmt-heading">
          Resources
        </h1>
        <p className="text-base mb-8 text-mvmt-text-secondary">
          Curated articles and guides for movement leaders.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={cn("px-4 py-2 text-sm font-medium rounded-full transition-colors")}
              style={{
                backgroundColor: activeTopic === topic ? "var(--mvmt-accent)" : "var(--mvmt-surface-light)",
                color: activeTopic === topic ? "var(--mvmt-cta-text)" : "var(--mvmt-text-secondary)",
                border: activeTopic === topic ? "none" : "1px solid var(--mvmt-border-light)",
              }}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((card) => (
            <div key={card.title} className="rounded-lg overflow-hidden bg-mvmt-surface-light border border-mvmt-border-light">
              <div className="h-40 w-full" style={{ backgroundColor: card.color }} />
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-mvmt-accent">{card.topic}</span>
                <h3 className="text-lg font-bold mt-2 mb-2 text-mvmt-text-primary">{card.title}</h3>
                <p className="text-sm leading-relaxed mb-3 text-mvmt-text-secondary">{card.excerpt}</p>
                <p className="text-xs text-mvmt-text-muted">{card.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentResourceCards.displayName = "ContentResourceCards";
