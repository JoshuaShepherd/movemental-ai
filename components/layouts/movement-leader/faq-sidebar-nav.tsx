"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqSidebarNavProps {
  className?: string;
}

const sections = [
  {
    id: "general",
    title: "General",
    questions: [
      { q: "What is Movemental?", a: "An all-in-one platform for movement leaders to create courses, assessments, and coaching experiences." },
      { q: "Who is Movemental for?", a: "Church planters, network leaders, coaches, seminary educators, and anyone equipping others for missional multiplication." },
    ],
  },
  {
    id: "account",
    title: "Account & Billing",
    questions: [
      { q: "How do I create an account?", a: "Click 'Start for free' on our homepage. You can sign up with email or Google." },
      { q: "How do I upgrade my plan?", a: "Go to Settings → Billing → Upgrade. Changes apply immediately with prorated charges." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and ACH transfers for Network plans." },
    ],
  },
  {
    id: "content",
    title: "Content Creation",
    questions: [
      { q: "How do I create a course?", a: "Navigate to Dashboard → Courses → Create. Our builder walks you through adding modules, lessons, and assessments." },
      { q: "Can I embed videos?", a: "Yes, we support YouTube, Vimeo, Wistia, and direct video uploads up to 2GB per file." },
      { q: "How do assessment scores work?", a: "Scores are calculated based on your rubric settings and can feed into leader progress dashboards automatically." },
    ],
  },
  {
    id: "support",
    title: "Support",
    questions: [
      { q: "How do I contact support?", a: "Email support@movemental.com or use the chat widget in the bottom-right corner of any page." },
      { q: "What are your support hours?", a: "Our team is available Monday–Friday, 9am–6pm EST. Network plans include 24/7 priority support." },
    ],
  },
];

/**
 * Linear-style FAQ with left sidebar navigation and right content area.
 * Click sections in sidebar to scroll to that topic.
 */
export function FaqSidebarNav({ className }: FaqSidebarNavProps) {
  const [activeSection, setActiveSection] = useState("general");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light", className)}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-mvmt-text-primary font-mvmt-heading mb-10">
          Help Center
        </h1>

        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar */}
          <nav className="space-y-1 sticky top-20 self-start">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  activeSection === s.id
                    ? "bg-mvmt-accent text-mvmt-cta-text font-medium"
                    : "text-mvmt-text-secondary hover:bg-mvmt-surface-light-muted"
                )}
              >
                {s.title}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div>
            {sections
              .filter((s) => s.id === activeSection)
              .map((s) => (
                <div key={s.id}>
                  <h2 className="text-xl font-bold text-mvmt-text-primary mb-6">{s.title}</h2>
                  <div className="space-y-0">
                    {s.questions.map((item) => {
                      const key = `${s.id}-${item.q}`;
                      const isOpen = openItems[key];
                      return (
                        <div key={item.q} className="border-b border-b-mvmt-border-light">
                          <button
                            onClick={() => toggle(key)}
                            className="w-full text-left py-4 flex items-center justify-between gap-4"
                          >
                            <span className="text-base font-medium text-mvmt-text-primary">{item.q}</span>
                            <span className={cn("text-sm text-mvmt-accent transition-transform flex-shrink-0", isOpen && "rotate-45")}>+</span>
                          </button>
                          {isOpen && (
                            <p className="text-sm leading-relaxed text-mvmt-text-secondary pb-4">{item.a}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

FaqSidebarNav.displayName = "FaqSidebarNav";
