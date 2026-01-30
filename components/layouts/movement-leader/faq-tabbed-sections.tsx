"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqTabbedSectionsProps {
  className?: string;
}

const tabs = [
  {
    id: "platform",
    label: "Platform",
    questions: [
      { q: "What makes Movemental different from other LMS platforms?", a: "We're built specifically for movement leaders — with multiplication metrics, sending pipeline tools, and network-level analytics that generic LMS platforms don't offer." },
      { q: "Can I use Movemental for my denomination?", a: "Absolutely. Our Network plan supports multi-church and denominational structures with shared content libraries and centralized reporting." },
      { q: "Is my data secure?", a: "Yes. We use enterprise-grade encryption, SOC2 compliance, and regular security audits. Your data is never shared or sold." },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    questions: [
      { q: "Is there really a free plan?", a: "Yes! Our free plan supports up to 5 leaders with core features. No credit card required." },
      { q: "What happens if I exceed my plan limits?", a: "We'll notify you and give you 30 days to upgrade. We never cut off access to your leaders unexpectedly." },
      { q: "Do you offer annual billing?", a: "Yes, annual billing saves 20% compared to monthly. Available on all paid plans." },
    ],
  },
  {
    id: "migration",
    label: "Migration",
    questions: [
      { q: "Can I migrate from another platform?", a: "Yes, we support migrations from Teachable, Kajabi, Thinkific, and custom SCORM packages. Our team handles the heavy lifting." },
      { q: "How long does migration take?", a: "Most migrations complete within 1-2 weeks depending on content volume. Network plan migrations include dedicated support." },
      { q: "Will my leaders lose access during migration?", a: "No. We run parallel systems during migration so there's zero downtime for your leaders." },
    ],
  },
  {
    id: "support",
    label: "Support",
    questions: [
      { q: "How do I get help?", a: "Email us at support@movemental.com, use in-app chat, or browse our help center. Network plans include a dedicated account manager." },
      { q: "Do you offer training?", a: "Yes! All plans include access to our getting-started guides. Growth and Network plans include live onboarding sessions." },
    ],
  },
];

/**
 * Apple-style tabbed FAQ — horizontal topic tabs with
 * accordion content below. Clean, organized.
 */
export function FaqTabbedSections({ className }: FaqTabbedSectionsProps) {
  const [activeTab, setActiveTab] = useState("platform");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeQuestions = tabs.find((t) => t.id === activeTab)?.questions ?? [];

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-text-primary font-mvmt-heading mb-4">FAQ</h1>
          <p className="text-lg text-mvmt-text-secondary">Everything you need to know about Movemental.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setOpenIndex(null); }}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-mvmt-accent text-mvmt-cta-text"
                  : "bg-mvmt-surface-light-muted text-mvmt-text-secondary hover:text-mvmt-text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-0">
          {activeQuestions.map((item, i) => (
            <div key={item.q} className="border-b border-b-mvmt-border-light">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-5 flex items-center justify-between gap-4"
              >
                <span className="text-base font-medium text-mvmt-text-primary">{item.q}</span>
                <span className={cn("text-lg text-mvmt-accent transition-transform flex-shrink-0", openIndex === i && "rotate-45")}>+</span>
              </button>
              {openIndex === i && (
                <p className="text-sm leading-relaxed text-mvmt-text-secondary pb-5">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

FaqTabbedSections.displayName = "FaqTabbedSections";
