"use client";

import { cn } from "@/lib/utils";

interface ArticlesDocsSidebarProps {
  className?: string;
}

/**
 * Docs Sidebar Article — Framer Docs-style three-column layout (ref-docs-sidebar)
 * Left nav sidebar, center article content, right TOC area
 */
export function ArticlesDocsSidebar({ className }: ArticlesDocsSidebarProps) {
  const navItems = [
    { label: "Terms of Service", active: false },
    { label: "Terms of Service Update", active: false },
    { label: "Privacy Statement", active: false },
    { label: "Sub-Processors", active: false },
    { label: "Cookie Policy", active: false },
    { label: "Community Guidelines", active: true },
  ];

  const tocItems = [
    "Overview",
    "Compliance",
    "Network Standards",
    "Dispute Resolution",
    "Updates & Amendments",
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      {/* Top bar */}
      <div className="border-b border-mvmt-border-light" >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide text-mvmt-text-primary">Movemental Docs</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-mvmt-text-secondary">Search</span>
            <div className="w-5 h-5 rounded-full bg-mvmt-border-light"  />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Left sidebar */}
        <aside className="w-56 flex-shrink-0 border-r py-8 px-4 border-mvmt-border-light" >
          <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-mvmt-text-tertiary" >
            Legal
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="block py-1.5 px-2 text-sm rounded"
                style={{
                  color: item.active ? "var(--mvmt-text-primary)" : "var(--mvmt-text-secondary)",
                  fontWeight: item.active ? 700 : 400,
                  backgroundColor: item.active ? "var(--mvmt-accent-muted)" : "transparent",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Center content */}
        <main className="flex-1 max-w-2xl py-12 px-10">
          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading"
          >
            Community Guidelines
          </h1>

          <p className="mt-4 text-base leading-relaxed text-mvmt-text-secondary">
            These guidelines govern how leaders, coaches, and participants interact on the
            Movemental platform. They are designed to foster healthy multiplication culture
            while maintaining the relational integrity that movement ecosystems require.
          </p>

          <h2 className="mt-10 text-xl font-bold text-mvmt-text-primary font-mvmt-heading">
            Compliance
          </h2>
          <p className="mt-3 text-base leading-relaxed text-mvmt-text-secondary">
            Every organization on Movemental agrees to operate within the ethical and
            relational standards outlined here. Drawing from the missional frameworks
            popularized by Alan Hirsch and the Forge network, compliance is not about
            legalism — it is about shared commitment to incarnational practice. Leaders
            are expected to model transparency, practice mutual accountability, and ensure
            that their coaching relationships reflect Kingdom values rather than corporate
            hierarchies.
          </p>
          <p className="mt-4 text-base leading-relaxed text-mvmt-text-secondary">
            Organizations found in violation of these standards will be contacted directly
            by the Movemental partnerships team. Our process prioritizes restorative
            conversation over punitive action, consistent with the reconciliation practices
            championed by movements like NewThing and Exponential.
          </p>

          <h2 className="mt-10 text-xl font-bold text-mvmt-text-primary font-mvmt-heading">
            Network Standards
          </h2>
          <p className="mt-3 text-base leading-relaxed text-mvmt-text-secondary">
            Movemental adopts a standards framework inspired by ISO quality management
            principles, adapted for the unique dynamics of church planting networks and
            missional communities. Each network on the platform must designate a standards
            lead responsible for onboarding practices, content quality, and leader
            development pathways. Dave Ferguson&rsquo;s hero-maker principle guides our
            approach: standards exist not to control but to release leaders with confidence.
          </p>
          <p className="mt-4 text-base leading-relaxed text-mvmt-text-secondary">
            Annual reviews ensure that published content remains doctrinally sound,
            contextually relevant, and pedagogically effective. Brad Brisco&rsquo;s
            work on the missional-incarnational impulse reminds us that standards must
            serve the mission, not the institution. Our review process reflects that
            conviction by centering neighborhood impact over organizational metrics.
          </p>
        </main>

        {/* Right TOC sidebar */}
        <aside className="w-48 flex-shrink-0 py-12 px-4 hidden lg:block">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-mvmt-text-tertiary" >
            On this page
          </p>
          <nav className="space-y-2">
            {tocItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block text-sm text-mvmt-text-secondary"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </section>
  );
}

ArticlesDocsSidebar.displayName = "ArticlesDocsSidebar";
