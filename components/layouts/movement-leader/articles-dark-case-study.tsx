"use client";

import { cn } from "@/lib/utils";

interface ArticlesDarkCaseStudyProps {
  className?: string;
}

/**
 * Dark Case Study Article — Threads style (ref-05)
 * Dark background throughout, hero quote block, metadata row, body content
 */
export function ArticlesDarkCaseStudy({ className }: ArticlesDarkCaseStudyProps) {
  return (
    <section
      className={cn("relative w-full bg-mvmt-surface-dark", className)}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        {/* Back link */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-opacity hover:opacity-80 text-mvmt-on-dark-muted"
        >
          &larr; Case Studies
        </a>

        {/* Hero quote block */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-10 bg-mvmt-surface-dark-elevated"
        >
          <p
            className="text-2xl sm:text-3xl md:text-4xl italic leading-snug font-light text-mvmt-on-dark-primary font-mvmt-heading"
          >
            &ldquo;If you care about multiplication and healthy communities, you need Movemental.&rdquo;
          </p>
        </div>

        {/* Subtitle */}
        <h1
          className="text-lg sm:text-xl md:text-2xl font-semibold mb-8 text-mvmt-on-dark-primary font-mvmt-heading"
        >
          How Movemental replaced all other tools for NewThing Network
        </h1>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-6 mb-12">
          {/* Company logo placeholder */}
          <div
            className="w-12 h-12 rounded-md flex-shrink-0 bg-mvmt-surface-dark-elevated"
          />
          <div className="flex flex-wrap gap-6 text-sm text-mvmt-on-dark-secondary">
            <span className="font-medium text-mvmt-on-dark-primary">
              Dave Ferguson, COO
            </span>
            <span className="font-medium text-mvmt-on-dark-primary">
              Neil Cole, CEO
            </span>
            <span>December 21, 2023</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-12" style={{ backgroundColor: "var(--mvmt-border-on-dark)" }} />

        {/* Section header */}
        <h2
          className="text-xl font-semibold mb-6 text-mvmt-on-dark-primary font-mvmt-heading"
        >
          <span className="mr-2">&#128075;</span> A bit of context
        </h2>

        {/* Body paragraphs */}
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-mvmt-on-dark-secondary">
          <p>
            NewThing Network has been at the forefront of church multiplication for over two decades.
            Founded by Dave Ferguson and a coalition of movement-minded leaders, the network equips
            planters and multipliers across six continents with coaching, resources, and peer learning.
          </p>
          <p>
            Before adopting Movemental, the NewThing team relied on a patchwork of tools: one platform
            for course delivery, another for community discussion, spreadsheets for cohort tracking,
            and email chains for coaching check-ins. The administrative overhead was staggering, and
            leaders at every level felt the friction.
          </p>
          <p>
            When Dave and Neil first evaluated Movemental, they were skeptical that a single platform
            could replace everything. But after a 90-day pilot with three regional cohorts, the results
            were undeniable: coach-to-planter engagement rose 47%, completion rates on training pathways
            doubled, and the operations team reclaimed nearly 20 hours per week.
          </p>
          <p>
            The key differentiator was Movemental&apos;s multi-tenant architecture. Each regional hub
            operated in its own branded space while headquarters maintained full visibility into progress
            metrics and resource adoption. Leaders no longer had to toggle between systems or re-enter
            data across platforms.
          </p>
          <p>
            Neil Cole noted that the integrated coaching tools were transformative: &ldquo;Our coaches
            finally have a single dashboard where they see every conversation, every milestone, and
            every resource their planters are engaging with. It changed our culture from reactive
            check-ins to proactive multiplication.&rdquo;
          </p>
          <p>
            Today, NewThing runs 100% of its leadership development through Movemental. From onboarding
            new planters to advanced multiplication residencies, the platform handles it all. The team
            estimates they have saved over $85,000 annually in tool consolidation alone, not counting
            the compounding value of higher engagement and faster leader development.
          </p>
        </div>
      </div>
    </section>
  );
}

ArticlesDarkCaseStudy.displayName = "ArticlesDarkCaseStudy";
