"use client";

import { cn } from "@/lib/utils";

interface ContentTocIllustratedProps {
  className?: string;
}

/**
 * TOC Illustrated — User Interviews-style illustrated chapter grid
 * Light bg, guide title, grid of chapter cards with illustration, number, title, description
 */
export function ContentTocIllustrated({ className }: ContentTocIllustratedProps) {
  const chapters = [
    { num: 1, title: "The Missional Impulse", description: "Understanding the DNA that drives every lasting movement — and why programs alone won't cut it.", color: "#EEF2FF" },
    { num: 2, title: "Incarnational Presence", description: "What it means to move into a neighborhood, not just minister to it. Brad Brisco's foundational framework.", color: "#F0FDF4" },
    { num: 3, title: "Forming Community", description: "From first gathering to sustained rhythm — the practical steps of launching a missional community.", color: "#FFF7ED" },
    { num: 4, title: "The Apprenticeship Model", description: "How Jesus developed leaders and what that means for your multiplication pipeline today.", color: "#FDF2F8" },
    { num: 5, title: "Coaching for Multiplication", description: "The hero-maker framework: asking better questions, empowering others, and measuring what matters.", color: "#F5F3FF" },
    { num: 6, title: "Sending Well", description: "The art of releasing leaders without losing connection. How healthy movements celebrate sending.", color: "#ECFDF5" },
    { num: 7, title: "Metrics That Matter", description: "Moving beyond attendance counts to track the health signals of a genuine movement.", color: "#FEF3C7" },
    { num: 8, title: "Movement Ecosystems", description: "How networks of communities become movements — and the infrastructure that sustains them.", color: "#FCE7F3" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--mvmt-accent)" }}>
            The Movemental Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Movement Leadership Foundations
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
            A comprehensive guide to building, sustaining, and multiplying missional communities. Eight chapters. One vision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((ch) => (
            <div key={ch.num} className="rounded-xl overflow-hidden cursor-pointer group" style={{ border: "1px solid var(--mvmt-border-light)", backgroundColor: "var(--mvmt-surface-light)" }}>
              <div className="h-32 w-full flex items-center justify-center" style={{ backgroundColor: ch.color }}>
                <span className="text-4xl font-bold" style={{ color: "var(--mvmt-accent)", opacity: 0.3 }}>{String(ch.num).padStart(2, "0")}</span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--mvmt-accent)" }}>
                  Chapter {ch.num}
                </p>
                <h3 className="text-base font-bold mb-2 leading-snug" style={{ color: "var(--mvmt-text-primary)" }}>{ch.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>{ch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentTocIllustrated.displayName = "ContentTocIllustrated";
