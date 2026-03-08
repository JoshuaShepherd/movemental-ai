"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqSearchHeroProps {
  className?: string;
}

const popularQuestions = [
  { q: "What is Movemental?", a: "Movemental is an all-in-one platform for movement leaders to create courses, run assessments, coach leaders, and manage content." },
  { q: "How much does it cost?", a: "We offer a free plan for up to 5 leaders. Paid plans start at $19/mo for Starter and $49/mo for Growth." },
  { q: "Can I import my existing content?", a: "Yes! We support PDF, SCORM, video imports, and migration from Teachable, Kajabi, and other platforms." },
  { q: "Is there a mobile app?", a: "Yes, Movemental is available on iOS and Android with offline access on Growth and Network plans." },
  { q: "How do I cancel my subscription?", a: "Go to Settings → Billing → Cancel Plan. You'll retain access until the end of your billing period." },
  { q: "Do you offer team pricing?", a: "Yes! Our Growth plan supports teams, and Network plans offer custom pricing for large organizations." },
];

/**
 * Notion/Stripe-style FAQ with prominent search bar hero,
 * popular questions below. Clean and search-first.
 */
export function FaqSearchHero({ className }: FaqSearchHeroProps) {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = search
    ? popularQuestions.filter((q) => q.q.toLowerCase().includes(search.toLowerCase()))
    : popularQuestions;

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light", className)}>
      {/* Hero with search */}
      <div className="bg-mvmt-surface-light-muted py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-mvmt-text-primary font-mvmt-heading mb-4">
            How can we help?
          </h1>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="w-full px-5 py-4 rounded-xl text-base border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary shadow-sm pl-12"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mvmt-text-muted">🔍</span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-6">
          {search ? `${filtered.length} results` : "Popular questions"}
        </p>
        <div className="space-y-0">
          {filtered.map((item, i) => (
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

        {filtered.length === 0 && (
          <p className="text-sm text-mvmt-text-muted text-center py-8">No matching questions. Try a different search or contact support.</p>
        )}
      </div>
    </section>
  );
}

FaqSearchHero.displayName = "FaqSearchHero";
