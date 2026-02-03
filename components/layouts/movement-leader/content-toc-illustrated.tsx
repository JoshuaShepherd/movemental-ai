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
    { num: 1, title: "The Missional Impulse", description: "Understanding the DNA that drives every lasting movement — and why programs alone won't cut it.", colorVar: "--mvmt-card-decorative-2" },
    { num: 2, title: "Incarnational Presence", description: "What it means to move into a neighborhood, not just minister to it. Brad Brisco's foundational framework.", colorVar: "--mvmt-card-decorative-4" },
    { num: 3, title: "Forming Community", description: "From first gathering to sustained rhythm — the practical steps of launching a missional community.", colorVar: "--mvmt-card-decorative-5" },
    { num: 4, title: "The Apprenticeship Model", description: "How Jesus developed leaders and what that means for your multiplication pipeline today.", colorVar: "--mvmt-card-decorative-3" },
    { num: 5, title: "Coaching for Multiplication", description: "The hero-maker framework: asking better questions, empowering others, and measuring what matters.", colorVar: "--mvmt-card-decorative-2" },
    { num: 6, title: "Sending Well", description: "The art of releasing leaders without losing connection. How healthy movements celebrate sending.", colorVar: "--mvmt-card-decorative-4" },
    { num: 7, title: "Metrics That Matter", description: "Moving beyond attendance counts to track the health signals of a genuine movement.", colorVar: "--mvmt-card-decorative-5" },
    { num: 8, title: "Movement Ecosystems", description: "How networks of communities become movements — and the infrastructure that sustains them.", colorVar: "--mvmt-card-decorative-3" },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest mb-3 text-mvmt-accent">
            The Movemental Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-mvmt-text-primary font-mvmt-heading">
            Movement Leadership Foundations
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-mvmt-text-secondary">
            A comprehensive guide to building, sustaining, and multiplying missional communities. Eight chapters. One vision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((ch) => (
            <div key={ch.num} className="rounded-xl overflow-hidden cursor-pointer group bg-mvmt-surface-light border border-mvmt-border-light">
              <div className="h-32 w-full flex items-center justify-center" style={{ backgroundColor: `var(${ch.colorVar})` }}>
                <span className="text-4xl font-bold text-mvmt-accent" style={{ opacity: 0.3 }}>{String(ch.num).padStart(2, "0")}</span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-mvmt-accent">
                  Chapter {ch.num}
                </p>
                <h3 className="text-base font-bold mb-2 leading-snug text-mvmt-text-primary">{ch.title}</h3>
                <p className="text-xs leading-relaxed text-mvmt-text-secondary">{ch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentTocIllustrated.displayName = "ContentTocIllustrated";
