"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqSupportCenterProps {
  className?: string;
}

const topQuestions = [
  { q: "How do I reset my password?", a: "Click 'Forgot password' on the login page, enter your email, and follow the reset link sent to your inbox." },
  { q: "Why can't my leaders access a course?", a: "Check that the course is published and that leaders have been enrolled. Go to Courses → Enrollment to verify." },
  { q: "How do I export my data?", a: "Go to Settings → Data → Export. You can export courses, leader data, and analytics as CSV or JSON." },
  { q: "Can I customize the leader experience?", a: "Yes! Growth plans and above support custom branding, navigation, and content organization." },
];

const contactOptions = [
  { icon: "💬", title: "Live Chat", description: "Chat with our team in real-time. Available Mon–Fri, 9am–6pm EST.", cta: "Start chat" },
  { icon: "📧", title: "Email Support", description: "Send us a detailed message and we'll respond within 24 hours.", cta: "Send email" },
  { icon: "📚", title: "Knowledge Base", description: "Browse our comprehensive docs, guides, and video tutorials.", cta: "Browse docs" },
];

/**
 * Zendesk-style support center FAQ — search, top questions,
 * and contact method cards at the bottom.
 */
export function FaqSupportCenter({ className }: FaqSupportCenterProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light", className)}>
      {/* Hero */}
      <div className="bg-mvmt-surface-dark py-16 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-on-dark-primary font-mvmt-heading mb-4">
          Support Center
        </h1>
        <p className="text-lg text-mvmt-on-dark-secondary mb-8">
          We&rsquo;re here to help you succeed.
        </p>
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Describe your issue..."
            className="w-full px-5 py-4 rounded-xl text-base bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted pl-12"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mvmt-on-dark-muted">🔍</span>
        </div>
      </div>

      {/* Top questions */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-mvmt-text-primary mb-6">Top Questions</h2>
        <div className="space-y-0">
          {topQuestions.map((item, i) => (
            <div key={item.q} className="border-b border-b-mvmt-border-light">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-4 flex items-center justify-between gap-4"
              >
                <span className="text-base font-medium text-mvmt-text-primary">{item.q}</span>
                <span className={cn("text-sm text-mvmt-accent transition-transform flex-shrink-0", openIndex === i && "rotate-45")}>+</span>
              </button>
              {openIndex === i && (
                <p className="text-sm leading-relaxed text-mvmt-text-secondary pb-4">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact options */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-mvmt-text-primary mb-6">Still need help?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {contactOptions.map((opt) => (
            <div key={opt.title} className="rounded-xl p-6 border border-mvmt-border-light text-center">
              <span className="text-3xl mb-3 block">{opt.icon}</span>
              <h3 className="text-sm font-bold text-mvmt-text-primary mb-2">{opt.title}</h3>
              <p className="text-xs text-mvmt-text-muted mb-4">{opt.description}</p>
              <button className="text-sm font-medium text-mvmt-accent">{opt.cta} →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

FaqSupportCenter.displayName = "FaqSupportCenter";
