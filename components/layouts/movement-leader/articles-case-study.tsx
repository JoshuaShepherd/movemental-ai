"use client";

import { cn } from "@/lib/utils";

interface ArticlesCaseStudyProps {
  className?: string;
}

/**
 * Case Study Article — Expensify style (ref-02)
 * Left nav sidebar, breadcrumb, hero image, body text, right "At a Glance" card
 */
export function ArticlesCaseStudy({ className }: ArticlesCaseStudyProps) {
  const navLinks = ["Product", "Integrations", "Industries", "Pricing", "Blog", "Partners", "Resources"];

  const favoriteFeatures = [
    "Cohort-based learning paths",
    "Missional community mapping",
    "Leader development dashboards",
    "Automated check-in workflows",
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-10">
          {/* Left Sidebar Nav */}
          <nav className="hidden lg:flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:opacity-80"
                style={{ color: "var(--mvmt-text-secondary)" }}
              >
                {link}
              </a>
            ))}
            <div className="mt-6">
              <a
                href="#"
                className="inline-block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors"
                style={{
                  backgroundColor: "var(--mvmt-accent-primary)",
                  color: "var(--mvmt-on-dark-primary)",
                }}
              >
                Get Started
              </a>
            </div>
          </nav>

          {/* Main Content */}
          <article className="min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--mvmt-text-tertiary)" }}>
              <span>Resource Center</span>
              <span style={{ color: "var(--mvmt-border-default)" }}>/</span>
              <span>Case Studies</span>
              <span style={{ color: "var(--mvmt-border-default)" }}>/</span>
              <span>8 minutes read</span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
              style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
            >
              Exponential + Movemental Case Study
            </h1>
            <p className="text-sm mb-8" style={{ color: "var(--mvmt-text-tertiary)" }}>
              April 10, 2024 by Brad Brisco
            </p>

            {/* Hero Image Placeholder */}
            <div
              className="w-full rounded-xl overflow-hidden mb-10"
              style={{
                aspectRatio: "16 / 9",
                background: "var(--mvmt-gradient-hero-brand)",
              }}
            />

            {/* Body Text */}
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--mvmt-text-primary)" }}>
              <p>
                The Exponential network, one of the largest church planting organizations in North America,
                partnered with Movemental to streamline how they equip and track movement leaders across
                hundreds of partner organizations.
              </p>
              <p>
                Before adopting the platform, Exponential relied on spreadsheets, disconnected survey tools,
                and manual reporting to understand how their leaders were progressing through training pathways.
                The lack of a unified system meant weeks of lag between data collection and actionable insights.
              </p>
              <h2
                className="text-xl font-semibold pt-4"
                style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
              >
                The Challenge
              </h2>
              <p>
                Exponential needed a platform that could serve multiple denominations and networks simultaneously
                while keeping each organization&apos;s data isolated and secure. They also required robust learning
                pathways that could adapt to each leader&apos;s context — whether urban church planting, rural
                revitalization, or international partnerships.
              </p>
              <h2
                className="text-xl font-semibold pt-4"
                style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
              >
                The Solution
              </h2>
              <p>
                Movemental&apos;s multi-tenant architecture allowed Exponential to onboard each partner network into
                its own isolated workspace while maintaining centralized reporting at the meta-network level.
                Leaders could access cohort-based learning paths, track their progress, and receive automated
                check-ins — all from a single platform.
              </p>
              <p>
                Within six months, Exponential saw a 40% increase in leader engagement with training materials
                and reduced their administrative overhead by over 60%.
              </p>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="hidden lg:block">
            <div
              className="rounded-xl p-6 sticky top-8"
              style={{
                backgroundColor: "var(--mvmt-surface-raised)",
                border: "1px solid var(--mvmt-border-default)",
              }}
            >
              <h3
                className="text-lg font-semibold mb-5"
                style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
              >
                At a Glance
              </h3>
              <div className="mb-4">
                <span className="block text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "var(--mvmt-text-tertiary)" }}>
                  Network type:
                </span>
                <span className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>
                  Church Planting &amp; Multiplication
                </span>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--mvmt-text-tertiary)" }}>
                  Favorite features:
                </span>
                <ul className="space-y-2">
                  {favoriteFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--mvmt-accent-primary)" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

ArticlesCaseStudy.displayName = "ArticlesCaseStudy";
