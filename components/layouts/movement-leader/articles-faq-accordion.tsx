"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ArticlesFaqAccordionProps {
  className?: string;
}

const faqItems = [
  {
    question: "What is the Movement Leader Platform?",
    answer:
      "The Movement Leader Platform is a curated digital environment built for practitioners leading missional communities, church planting networks, and multiplication movements. It brings together the frameworks of leaders like Brad Brisco, Alan Hirsch, and Dave Ferguson into a single learning and content management system. Rather than scattering resources across books, podcasts, and conferences, the platform gives you a unified space to access field-tested tools, coaching pathways, and community — all designed to accelerate your effectiveness as a movement leader.",
  },
  {
    question: "How do I start a missional community?",
    answer:
      "Starting a missional community begins with identifying two or three people who share a desire to live on mission together in a specific neighborhood or relational network. The platform provides a step-by-step onboarding pathway that walks you through discerning your context, forming a core team, establishing shared rhythms of life (meals, prayer, service), and setting realistic expectations for the first six months. You will also find video coaching from Dave Ferguson on the DNA of healthy missional communities and downloadable guides for your first gathering.",
  },
  {
    question: "What resources are included?",
    answer:
      "Your membership includes access to the full Movemental content library: over 50 written guides, 30 hours of video teaching, downloadable assessment tools, and curated reading lists from authors like Alan Hirsch and Brad Brisco. Resources are organized around key themes — incarnational living, disciple-making, leadership multiplication, and network development. New content is added monthly, and all resources are tagged by topic, difficulty level, and recommended context so you can find exactly what you need for your current season of ministry.",
  },
  {
    question: "Can I invite my network?",
    answer:
      "Absolutely. The platform is built on a multi-tenant architecture that allows you to create a dedicated space for your network. You can invite team members, cohort participants, and emerging leaders into your organization's workspace where they will have access to shared resources, discussion threads, and progress tracking. Each organization can customize which content pathways are visible to their members, making it easy to run structured cohorts or self-paced learning tracks within your existing leadership pipeline.",
  },
  {
    question: "What is the Multiplication Pathway?",
    answer:
      "The Multiplication Pathway is a structured six-month learning journey designed to move leaders from addition thinking to multiplication thinking. Drawing on the work of Dave Ferguson's Hero Maker framework and Alan Hirsch's APEST model, the pathway takes you through four phases: Awareness (understanding the multiplication mindset), Assessment (identifying your current leadership paradigm), Action (implementing specific multiplication practices), and Acceleration (coaching others to do the same). Each phase includes video content, reflection exercises, peer discussion prompts, and a capstone project.",
  },
  {
    question: "How is this different from other platforms?",
    answer:
      "Most ministry platforms focus on either content delivery or church management software. Movemental is purpose-built for the unique needs of movement leaders — people planting churches, launching missional communities, and developing multiplication networks. The platform integrates learning content with practical tools for tracking network health, coaching emerging leaders, and measuring qualitative growth indicators that matter in movement contexts. It is designed by practitioners, for practitioners, with theological and strategic coherence rather than a marketplace of unrelated resources.",
  },
];

/**
 * FAQ Accordion — Framer-style clean minimal FAQ page (ref-10)
 * Expandable question/answer pairs about movement leadership
 */
export function ArticlesFaqAccordion({ className }: ArticlesFaqAccordionProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-mvmt-accent-primary" >
          FAQ
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading"
        >
          Frequently asked questions
        </h1>
        <p className="mt-4 text-base leading-relaxed text-mvmt-text-secondary">
          Everything you need to know about the Movement Leader Platform and how it can serve your mission.
        </p>

        {/* FAQ list */}
        <div className="mt-12 divide-y border-mvmt-border-light" >
          {faqItems.map((item, index) => (
            <div key={index} className="py-5">
              <button
                className="w-full flex items-center justify-between text-left gap-4"
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                <span className="text-base font-semibold text-mvmt-text-primary">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn("w-5 h-5 flex-shrink-0 transition-transform duration-200", expanded === index && "rotate-180", "text-mvmt-text-tertiary")}
                  
                />
              </button>
              {expanded === index && (
                <p className="mt-3 text-sm leading-relaxed text-mvmt-text-secondary">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ArticlesFaqAccordion.displayName = "ArticlesFaqAccordion";
