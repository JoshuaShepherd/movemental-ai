"use client";

import { cn } from "@/lib/utils";

interface ContentFeaturePreviewProps {
  className?: string;
}

/**
 * Feature Preview — Framer-style 2-col feature cards with images
 * Light bg, heading, alternating 2-col feature rows with image + text
 */
export function ContentFeaturePreview({ className }: ContentFeaturePreviewProps) {
  const features = [
    { label: "Leader Development", title: "Apprenticeship pipelines that actually multiply", description: "Track every leader from first encounter to fully released coach. Built-in assessment milestones, coaching checkpoints, and celebration moments keep the pipeline healthy and visible.", color: "#EEF2FF" },
    { label: "Content Engine", title: "Curriculum that forms, not just informs", description: "Create multi-format training pathways that combine video, text, discussion prompts, and hands-on assignments. Designed for formation, not just information transfer.", color: "#F0FDF4" },
    { label: "Network Intelligence", title: "See your movement in real time", description: "Dashboards that surface the metrics movement leaders actually care about: multiplication ratios, leader health signals, community engagement rhythms, and sending patterns.", color: "#FFF7ED" },
    { label: "Coaching Tools", title: "Structured conversations, organic relationships", description: "Hero-maker coaching frameworks with built-in question banks, session recording, progress notes, and automated follow-up. Because the best coaching happens between sessions.", color: "#FDF2F8" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--mvmt-accent)" }}>
            Features
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Built for multiplication
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
            Every feature designed around how movements actually grow — through leaders developing leaders.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, i) => (
            <div key={feature.title} className={cn("flex flex-col md:flex-row gap-8 items-center", i % 2 === 1 && "md:flex-row-reverse")}>
              <div className="flex-1 w-full h-64 sm:h-80 rounded-2xl" style={{ backgroundColor: feature.color }} />
              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--mvmt-accent)" }}>{feature.label}</p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-snug" style={{ color: "var(--mvmt-text-primary)" }}>{feature.title}</h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentFeaturePreview.displayName = "ContentFeaturePreview";
