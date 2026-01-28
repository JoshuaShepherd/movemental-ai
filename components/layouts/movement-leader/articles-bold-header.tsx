"use client";

import { cn } from "@/lib/utils";

interface ArticlesBoldHeaderProps {
  className?: string;
}

/**
 * Bold Header Article — Dovetail style (ref-06)
 * Full-width colored header, large title, metadata row, two-column body with CTA sidebar
 */
export function ArticlesBoldHeader({ className }: ArticlesBoldHeaderProps) {
  const tocLinks = [
    "What defines a missional community?",
    "Core leadership competencies",
    "Building rhythms of life",
    "Multiplying leaders within community",
    "Common pitfalls to avoid",
    "Getting started today",
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Full-width Header */}
      <div
        className="w-full px-6 sm:px-8 lg:px-12 py-16 md:py-24"
        style={{ background: "var(--mvmt-gradient-hero-brand)" }}
      >
        <div className="container mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
            <span>Guides</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>Missional Communities</span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl"
            style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}
          >
            What is missional community leadership?
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
            <span>Last updated: January 2025</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>Author: Brad Brisco</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>Reviewed by: Alan Hirsch</span>
          </div>
        </div>
      </div>

      {/* Two-column Body */}
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Article Body */}
          <article className="space-y-6 text-base leading-relaxed" style={{ color: "var(--mvmt-text-primary)" }}>
            <p>
              Missional community leadership is a distinct practice rooted in the conviction that the people of
              God are called to live as a sent community — not merely gathering for worship, but actively
              participating in God&apos;s mission in their neighborhoods, workplaces, and relational networks.
            </p>
            <h2
              className="text-2xl font-semibold pt-4"
              style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
            >
              What defines a missional community?
            </h2>
            <p>
              A missional community is typically a group of 15–40 people who share a common mission focus.
              Unlike traditional small groups that center on Bible study alone, missional communities
              organize their shared life around a specific people group, place, or domain of society they
              feel called to serve.
            </p>
            <h2
              className="text-2xl font-semibold pt-4"
              style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
            >
              Core leadership competencies
            </h2>
            <p>
              Leading a missional community requires competencies that go beyond traditional pastoral skills.
              Leaders must cultivate the ability to discern context, facilitate communal discernment, develop
              apprentices, and create sustainable rhythms that balance gathering and scattering.
            </p>
            <p>
              The most effective missional leaders are those who see themselves not as the sole visionary,
              but as cultivators of an environment where every member discovers and exercises their calling
              within the broader mission of the community.
            </p>
            <h2
              className="text-2xl font-semibold pt-4"
              style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
            >
              Building rhythms of life
            </h2>
            <p>
              Sustainable missional communities develop shared rhythms — practices like eating together,
              serving neighbors, prayer walking, and celebrating milestones. These rhythms form the
              backbone of communal identity and keep the group anchored during seasons of challenge.
            </p>
          </article>

          {/* Right Sidebar */}
          <aside className="space-y-8">
            {/* CTA Card */}
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--mvmt-surface-raised)",
                border: "1px solid var(--mvmt-border-default)",
              }}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
              >
                Get started today
              </h3>
              <p className="text-sm mb-5" style={{ color: "var(--mvmt-text-secondary)" }}>
                Launch your first missional community cohort with guided onboarding and templates.
              </p>
              <a
                href="#"
                className="inline-block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-accent-primary)",
                  color: "var(--mvmt-on-dark-primary)",
                }}
              >
                Start free trial
              </a>
            </div>

            {/* Table of Contents */}
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--mvmt-text-tertiary)" }}
              >
                Contents
              </h4>
              <ul className="space-y-3">
                {tocLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--mvmt-text-secondary)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

ArticlesBoldHeader.displayName = "ArticlesBoldHeader";
