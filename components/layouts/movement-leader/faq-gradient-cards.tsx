"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqGradientCardsProps {
  className?: string;
}

const faqs = [
  { q: "What is Movemental?", a: "An all-in-one platform for movement leaders to build courses, run assessments, coach leaders, and manage content across networks.", category: "General" },
  { q: "How much does it cost?", a: "Free for up to 5 leaders. Starter is $19/mo, Growth is $49/mo. Network plans have custom pricing for large organizations.", category: "Pricing" },
  { q: "Can I try before I buy?", a: "Yes! Our free plan has no time limit. You can also request a 14-day trial of Growth features.", category: "Pricing" },
  { q: "How do I create a course?", a: "Go to Dashboard → Courses → Create. Our step-by-step builder helps you add modules, lessons, videos, and assessments.", category: "Features" },
  { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption, are SOC2 compliant, and conduct regular third-party security audits.", category: "Security" },
  { q: "Do you offer nonprofit pricing?", a: "Yes, verified 501(c)(3) organizations get 25% off any paid plan. Contact us with documentation.", category: "Pricing" },
  { q: "Can I migrate from another LMS?", a: "We support migrations from Teachable, Kajabi, Thinkific, and SCORM packages. Our team handles the process.", category: "Migration" },
  { q: "How do I get support?", a: "Email, in-app chat, or our help center. Network plans include a dedicated account manager with 24/7 availability.", category: "Support" },
];

/**
 * Visual card-based FAQ with gradient accent bar on each card.
 * All questions visible as cards, click to expand.
 */
export function FaqGradientCards({ className }: FaqGradientCardsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark py-16 px-6", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-on-dark-primary font-mvmt-heading mb-4">
            Questions &amp; Answers
          </h1>
          <p className="text-lg text-mvmt-on-dark-secondary">
            Everything you need to know, at a glance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {faqs.map((item, i) => (
            <button
              key={item.q}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={cn(
                "text-left rounded-xl p-5 border transition-colors",
                openIndex === i
                  ? "bg-mvmt-surface-dark-elevated border-mvmt-accent"
                  : "bg-mvmt-surface-dark-elevated border-mvmt-border-on-dark hover:border-mvmt-accent/50"
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-bold text-mvmt-accent">{item.category}</span>
                <span className={cn("text-xs text-mvmt-on-dark-muted transition-transform flex-shrink-0", openIndex === i && "rotate-45")}>+</span>
              </div>
              <p className="text-sm font-medium text-mvmt-on-dark-primary mb-1">{item.q}</p>
              {openIndex === i && (
                <p className="text-sm leading-relaxed text-mvmt-on-dark-secondary mt-2">{item.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

FaqGradientCards.displayName = "FaqGradientCards";
