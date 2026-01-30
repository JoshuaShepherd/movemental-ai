"use client";

import { cn } from "@/lib/utils";

interface ReaderHighlightToolsProps {
  className?: string;
}

/**
 * Pocket/Instapaper-style reader with highlight and share toolbar,
 * "View Original" link, centered serif content, reading tools overlay.
 * Based on reader-article-tools-03.png reference.
 */
export function ReaderHighlightTools({ className }: ReaderHighlightToolsProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-surface-light", className)}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-3 border-b border-b-mvmt-border-light">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-mvmt-accent">⬡ Pocket</span>
        </div>
        <div className="flex items-center gap-4 text-mvmt-text-muted">
          <span className="text-sm">🔖</span>
          <span className="text-sm">↗</span>
        </div>
      </div>

      {/* Article header */}
      <article className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4 text-mvmt-text-primary font-mvmt-heading text-center">
          Farewell, Missional Movement: Why We Honestly Loved It
        </h1>
        <div className="flex items-center justify-center gap-2 mb-2 text-sm text-mvmt-text-muted">
          <span>By bradbrisco</span>
          <span>·</span>
          <span>Exponential</span>
          <span>·</span>
          <span>6 min</span>
        </div>
        <div className="text-center mb-8">
          <button className="text-sm text-mvmt-accent underline">View Original</button>
        </div>

        {/* Highlight toolbar (floating) */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-mvmt-border-light bg-mvmt-surface-light shadow-sm">
            <button className="text-sm text-mvmt-text-muted hover:text-mvmt-text-primary">Aa</button>
            <span className="w-px h-4 bg-mvmt-border-light" />
            <button className="text-sm text-mvmt-text-muted hover:text-mvmt-text-primary">🖍 Highlight</button>
            <span className="w-px h-4 bg-mvmt-border-light" />
            <button className="text-sm text-mvmt-text-muted hover:text-mvmt-text-primary">↗ Share</button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5">
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            Farewell, missional movement. The originally beloved pop concept who changed everything for a generation of church leaders had a weirder trajectory than most, going from the world&rsquo;s favorite organic church model to a brazen new wave multiplication machine in just a few years. But the movement could do it all: weepy calls to action like &ldquo;I Honestly Love You,&rdquo; community rhythms like &ldquo;Let Me Be There,&rdquo; practical frameworks from <em>The Forgotten Ways</em>. Teachings from Alan Hirsch and Neil Cole. Heavy-impact church planting models from Dave Ferguson and the Exponential team.
          </p>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            These are all reasons why we loved the missional movement &mdash; we honestly loved it &mdash; and that&rsquo;s why movement practitioners are mourning for it today.
          </p>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            The movement could hop from model to model, from context to context. It thrived in house churches, microchurches, and legacy denominations alike. It resonated in coffee shops and conferences, in seminary classrooms and living rooms. The framework was endlessly adaptable, and that was its genius.
          </p>
        </div>
      </article>

      {/* Bottom bar */}
      <div className="sticky bottom-0 px-6 py-3 flex items-center justify-between border-t border-t-mvmt-border-light bg-mvmt-surface-light">
        <span className="text-sm font-bold text-mvmt-accent">⬡ Movemental</span>
        <span className="text-xs text-mvmt-text-muted">curated by</span>
      </div>
    </section>
  );
}

ReaderHighlightTools.displayName = "ReaderHighlightTools";
