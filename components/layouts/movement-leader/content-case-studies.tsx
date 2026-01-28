"use client";

import { cn } from "@/lib/utils";

interface ContentCaseStudiesProps {
  className?: string;
}

/**
 * Case Studies — Kit-style 3-col case study cards with photos
 * Light bg, header + 3 cards with image, org name, quote, attribution
 */
export function ContentCaseStudies({ className }: ContentCaseStudiesProps) {
  const studies = [
    { org: "Exponential Network", quote: "Movemental gave us the infrastructure to track multiplication across 200+ church plants. What used to take spreadsheets now happens in real time.", person: "Dave Ferguson", role: "Lead Visionary, Exponential", color: "#DBEAFE" },
    { org: "Forge Mission Training", quote: "We needed a platform that understood missional DNA — not just content delivery. Movemental gets the difference between education and formation.", person: "Alan Hirsch", role: "Founder, Forge", color: "#E0E7FF" },
    { org: "The Underground", quote: "Our network of missional communities finally has a shared space for training, coaching, and storytelling. It changed how we develop leaders.", person: "Brad Brisco", role: "Director, The Underground", color: "#FCE7F3" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--mvmt-accent)" }}>
            Case Studies
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Leaders building movements with Movemental
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
            See how missional organizations are using the platform to multiply leaders and communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {studies.map((study) => (
            <div key={study.org} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--mvmt-border-light)", backgroundColor: "var(--mvmt-surface-light)" }}>
              <div className="h-48 w-full" style={{ backgroundColor: study.color }} />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--mvmt-accent)" }}>
                  {study.org}
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--mvmt-text-primary)" }}>
                  &ldquo;{study.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: study.color }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>{study.person}</p>
                    <p className="text-xs" style={{ color: "var(--mvmt-text-secondary)" }}>{study.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentCaseStudies.displayName = "ContentCaseStudies";
