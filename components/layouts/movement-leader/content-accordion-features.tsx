"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ContentAccordionFeaturesProps {
  className?: string;
}

/**
 * Accordion Features — Framer-style expandable feature list
 * Minimal bg, clean typography, expand/collapse feature sections
 */
export function ContentAccordionFeatures({ className }: ContentAccordionFeaturesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const features = [
    { title: "Missional Community Formation", description: "Step-by-step pathways for launching and sustaining missional communities in any context. Includes coaching frameworks, meeting rhythms, and assessment checkpoints developed by movement practitioners." },
    { title: "Leader Multiplication Pipeline", description: "A structured apprenticeship model that takes emerging leaders from observer to facilitator to coach. Built on the discipleship principles of Brad Brisco and the multiplication frameworks of Exponential." },
    { title: "Content & Curriculum Engine", description: "Create, organize, and distribute training content across your entire network. Supports video, text, audio, and interactive assessments with progress tracking at every level." },
    { title: "Network Health Dashboard", description: "Real-time visibility into the health of your movement. Track engagement, multiplication ratios, leader development stages, and community formation metrics across all locations." },
    { title: "Coaching Conversation Tools", description: "Structured frameworks for one-on-one and group coaching sessions. Includes question banks, reflection prompts, and progress documentation inspired by the hero-maker model." },
    { title: "Multi-Site Coordination", description: "Manage multiple communities, campuses, or church plants from a single platform. Each site maintains autonomy while staying connected to the broader movement vision and shared resources." },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--mvmt-text-secondary)" }}>
          Platform Features
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Everything you need to lead a movement
        </h1>
        <p className="text-lg mb-12" style={{ color: "var(--mvmt-text-secondary)" }}>
          Purpose-built tools for missional leaders who are serious about multiplication.
        </p>

        <div className="divide-y" style={{ borderColor: "var(--mvmt-border-light)" }}>
          {features.map((feature, i) => (
            <div key={feature.title}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-lg font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>
                  {feature.title}
                </span>
                <span className="text-2xl leading-none ml-4 flex-shrink-0" style={{ color: "var(--mvmt-text-secondary)" }}>
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <p className="pb-5 text-base leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentAccordionFeatures.displayName = "ContentAccordionFeatures";
