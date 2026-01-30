"use client";

import { cn } from "@/lib/utils";

interface ReaderMinimalScrollProps {
  className?: string;
}

/**
 * Distraction-free scrolling reader — no sidebar, ultra-clean centered column,
 * subtle sticky progress bar, minimal chrome. Inspired by iA Writer / reading mode.
 */
export function ReaderMinimalScroll({ className }: ReaderMinimalScrollProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-surface-light", className)}>
      {/* Minimal top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <button className="text-sm text-mvmt-text-muted">← Back</button>
        <span className="text-xs text-mvmt-text-muted tracking-wider uppercase">Reading Mode</span>
        <button className="text-sm text-mvmt-text-muted">Aa</button>
      </div>

      {/* Progress bar */}
      <div className="sticky top-0 z-10 w-full h-0.5" style={{ backgroundColor: "var(--mvmt-border-light)" }}>
        <div className="h-full w-[35%] bg-mvmt-accent transition-all" />
      </div>

      {/* Content */}
      <article className="flex-1 max-w-xl mx-auto w-full px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3 text-mvmt-text-primary font-mvmt-heading">
          The Quiet Revolution of Everyday Multiplication
        </h1>
        <p className="text-sm text-mvmt-text-muted mb-10">
          Brad Brisco · 12 min read · Chapter 3 of <em>The Sending Church</em>
        </p>

        <div className="space-y-6">
          <p className="text-lg leading-[1.9] text-mvmt-text-primary font-mvmt-heading">
            Most revolutions don&rsquo;t start with a bang. They start with a whisper &mdash; a quiet decision made in a living room, a conversation over coffee, a pastor who finally says &ldquo;yes&rdquo; to something that scares him. The multiplication movement is no different.
          </p>
          <p className="text-lg leading-[1.9] text-mvmt-text-primary font-mvmt-heading">
            For decades, the North American church has been fixated on addition: more seats, more services, more campuses. The metrics of success were attendance and square footage. But a growing number of leaders began to ask a different question: what if the goal isn&rsquo;t to grow bigger, but to multiply further?
          </p>
          <p className="text-lg leading-[1.9] text-mvmt-text-primary font-mvmt-heading">
            This shift &mdash; from addition to multiplication &mdash; is deceptively simple on paper. In practice, it requires rethinking everything: how we define success, how we deploy resources, how we develop leaders, and ultimately, how we understand the mission of the church itself.
          </p>
          <p className="text-lg leading-[1.9] text-mvmt-text-primary font-mvmt-heading">
            The earliest practitioners of this approach didn&rsquo;t have a playbook. They had conviction, a handful of relationships, and an unwillingness to accept the status quo. What they built — often messily, often imperfectly &mdash; became the foundation for what we now call the sending church movement.
          </p>
          <blockquote className="border-l-4 border-l-mvmt-accent pl-6 my-8">
            <p className="text-xl italic leading-relaxed text-mvmt-text-primary font-mvmt-heading">
              &ldquo;The measure of a church is not how many people sit in its seats, but how many people it sends out its doors.&rdquo;
            </p>
            <cite className="block mt-3 text-sm text-mvmt-text-muted not-italic">— Dave Ferguson, Exponential</cite>
          </blockquote>
          <p className="text-lg leading-[1.9] text-mvmt-text-primary font-mvmt-heading">
            Ferguson&rsquo;s words capture the essence of the paradigm shift. A sending church doesn&rsquo;t hoard its best people &mdash; it releases them. It doesn&rsquo;t consolidate power &mdash; it distributes it. It doesn&rsquo;t measure impact by what it accumulates, but by what it gives away.
          </p>
        </div>
      </article>

      {/* Bottom reading info */}
      <div className="text-center py-6">
        <p className="text-xs text-mvmt-text-muted">35% complete · ~8 min remaining</p>
      </div>
    </section>
  );
}

ReaderMinimalScroll.displayName = "ReaderMinimalScroll";
