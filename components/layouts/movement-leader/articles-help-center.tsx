"use client";

import { cn } from "@/lib/utils";

interface ArticlesHelpCenterProps {
  className?: string;
}

const sidebarLinks = [
  "Overview",
  "Key Features",
  "Inbox basics",
  "Assignments",
  "Channels",
  "Productivity tips",
  "Network setup",
  "Cohort management",
];

/**
 * Help Center Article — Front-style help center layout (ref-01)
 * Gradient hero with search, breadcrumb, sidebar TOC, article content
 */
export function ArticlesHelpCenter({ className }: ArticlesHelpCenterProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      {/* Hero banner */}
      <div
        className="w-full py-12 md:py-16"
        style={{ background: "linear-gradient(135deg, var(--mvmt-accent-muted), var(--mvmt-surface-light))" }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1
            className="text-2xl sm:text-3xl font-bold text-mvmt-text-primary font-mvmt-heading"
          >
            Need help getting started?
          </h1>
          <p className="mt-2 text-sm text-mvmt-text-secondary">
            Search our knowledge base or browse articles below.
          </p>
          <div
            className="mt-6 mx-auto max-w-md flex items-center rounded-lg px-4 py-3 bg-mvmt-surface-light border border-mvmt-border-light"
          >
            <span className="text-sm" style={{ color: "var(--mvmt-text-tertiary)" }}>Search articles...</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <nav className="text-xs flex gap-1" style={{ color: "var(--mvmt-text-tertiary)" }}>
          <span>Home</span>
          <span>&gt;</span>
          <span>Knowledge Base</span>
          <span>&gt;</span>
          <span className="text-mvmt-text-primary">Getting Started</span>
        </nav>
      </div>

      {/* Content area */}
      <div className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-[200px_1fr] gap-10">
        {/* Left sidebar */}
        <aside className="hidden md:block">
          <nav className="space-y-1 sticky top-8">
            {sidebarLinks.map((link, i) => (
              <div
                key={link}
                className={cn("text-sm py-1.5 cursor-pointer", i === 0 && "font-semibold")}
                style={{ color: i === 0 ? "var(--mvmt-accent-primary)" : "var(--mvmt-text-secondary)" }}
              >
                {link}
              </div>
            ))}
          </nav>
        </aside>

        {/* Article */}
        <article>
          <h2
            className="text-2xl font-bold text-mvmt-text-primary font-mvmt-heading"
          >
            Movement Leader 101
          </h2>
          <p className="mt-1 text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>
            Edited 3 months ago
          </p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-mvmt-text-secondary">
            {/* Overview */}
            <div>
              <h3 className="text-base font-semibold mb-2 text-mvmt-text-primary">Overview</h3>
              <p>
                The Movement Leader Platform is your centralized hub for everything related to leading
                missional communities, planting churches, and developing multiplication networks. Whether
                you are a seasoned practitioner or just beginning to explore what it means to lead a
                movement, this guide will orient you to the platform&apos;s core capabilities and help
                you get the most out of your experience from day one.
              </p>
            </div>

            {/* What's the Platform? */}
            <div>
              <h3 className="text-base font-semibold mb-2 text-mvmt-text-primary">What&apos;s the Platform?</h3>
              <p>
                Built by practitioners for practitioners, the platform combines curated content from
                leaders like Brad Brisco, Alan Hirsch, and Dave Ferguson with practical tools for
                managing your network. Think of it as three things in one: a learning management system
                with structured pathways, a content library with searchable resources, and a lightweight
                CRM for tracking the health of your missional communities and church planting cohorts.
                Every feature is designed around the realities of movement leadership — decentralized
                teams, relational capital, and long-arc formation.
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-base font-semibold mb-2 text-mvmt-text-primary">Key Features</h3>
              <p className="mb-3">
                The platform is organized around four core feature areas that map to the rhythm of
                movement leadership:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-mvmt-text-primary">Content Library</strong> — Over
                  50 written guides, video teachings, and downloadable tools organized by topic and
                  difficulty level.
                </li>
                <li>
                  <strong className="text-mvmt-text-primary">Learning Pathways</strong> — Structured
                  multi-week journeys including the Multiplication Pathway and Incarnational Living track.
                </li>
                <li>
                  <strong className="text-mvmt-text-primary">Network Dashboard</strong> — A
                  visual overview of your missional communities, church plants, and leadership pipeline
                  with health indicators.
                </li>
                <li>
                  <strong className="text-mvmt-text-primary">Cohort Tools</strong> — Everything
                  you need to run a leadership cohort: scheduling, assignments, discussion threads, and
                  progress tracking.
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

ArticlesHelpCenter.displayName = "ArticlesHelpCenter";
