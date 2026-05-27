"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqCategorizedGridProps {
  className?: string;
}

const categories = [
  {
    title: "Getting Started",
    icon: "🚀",
    questions: [
      { q: "What is Movemental?", a: "Movemental is a platform that equips movement leaders with courses, assessments, coaching tools, and content management — all in one place." },
      { q: "How do I create my first course?", a: "Navigate to your dashboard, click 'Create Course', and follow the step-by-step builder. You can add lessons, assessments, and resources." },
      { q: "Is there a free plan?", a: "Yes! Our free plan includes up to 5 leaders, basic content tools, and access to the community library." },
    ],
  },
  {
    title: "Billing & Plans",
    icon: "💳",
    questions: [
      { q: "What plans are available?", a: "We offer Free, Starter ($19/mo), Growth ($49/mo), and custom Network plans for large organizations." },
      { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect at your next billing cycle." },
      { q: "Do you offer nonprofit discounts?", a: "Yes! We offer 25% off for verified 501(c)(3) organizations. Contact us with your tax-exempt documentation." },
    ],
  },
  {
    title: "Content & Courses",
    icon: "📚",
    questions: [
      { q: "Can I import existing content?", a: "Yes, we support importing from PDF, SCORM, video files, and several LMS platforms including Teachable and Kajabi." },
      { q: "How do assessments work?", a: "Our assessment builder supports multiple question types, scoring rubrics, and automated feedback. Results feed into leader progress dashboards." },
      { q: "Can leaders access content offline?", a: "On Growth and Network plans, leaders can download courses for offline access through our mobile app." },
    ],
  },
  {
    title: "Teams & Networks",
    icon: "🤝",
    questions: [
      { q: "How do I add team members?", a: "Go to Settings → Team, then invite members by email. You can assign roles like Admin, Editor, or Viewer." },
      { q: "Can I manage multiple churches?", a: "Yes! Growth and Network plans support multi-site management with separate dashboards and shared content libraries." },
      { q: "Is there an enterprise option?", a: "Our Network plan includes SSO, dedicated support, custom integrations, and volume pricing. Contact sales for details." },
    ],
  },
];

/**
 * Categorized FAQ grid — questions grouped by topic in card columns,
 * expandable answers within each category. Intercom-inspired.
 */
export function FaqCategorizedGrid({ className }: FaqCategorizedGridProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-text-primary font-mvmt-heading mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-mvmt-text-secondary">
            Find answers organized by topic. Can&rsquo;t find what you need? Contact us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-xl p-6 border border-mvmt-border-light bg-mvmt-surface-light">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-lg font-bold text-mvmt-text-primary">{cat.title}</h2>
              </div>
              <div className="space-y-0">
                {cat.questions.map((item) => {
                  const key = `${cat.title}-${item.q}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={item.q} className="border-b border-b-mvmt-border-light last:border-b-0">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full text-left py-3 flex items-center justify-between gap-2"
                      >
                        <span className="text-sm font-medium text-mvmt-text-primary">{item.q}</span>
                        <span className={cn("text-xs text-mvmt-text-muted transition-transform flex-shrink-0", isOpen && "rotate-180")}>▼</span>
                      </button>
                      {isOpen && (
                        <p className="text-sm leading-relaxed text-mvmt-text-secondary pb-3">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

FaqCategorizedGrid.displayName = "FaqCategorizedGrid";
