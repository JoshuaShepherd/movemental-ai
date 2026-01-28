"use client";

import { cn } from "@/lib/utils";

interface ArticlesCleanLongformProps {
  className?: string;
}

/**
 * Clean Longform Article — Medium-style centered reading experience (ref-09)
 * Minimal chrome, serif heading, author row, body text, interaction row, related articles
 */
export function ArticlesCleanLongform({ className }: ArticlesCleanLongformProps) {
  const relatedArticles = [
    { title: "Why Missional Communities Fail (And How to Fix Them)", author: "Dave Ferguson", date: "March 12, 2024", readTime: "6 min read" },
    { title: "Multiplication Is Not a Strategy — It's a Posture", author: "Alan Hirsch", date: "February 28, 2024", readTime: "5 min read" },
    { title: "From Attractional to Incarnational: Shifting the Paradigm", author: "Brad Brisco", date: "January 15, 2024", readTime: "7 min read" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Top bar */}
      <div className="border-b" style={{ borderColor: "var(--mvmt-border-light)" }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--mvmt-text-primary)" }}>Movemental</span>
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 py-12">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          The Slow Work of Disciple-Making
        </h1>

        {/* Author row */}
        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--mvmt-accent-muted)" }} />
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>Brad Brisco</p>
            <p className="text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>April 23, 2024 &middot; 8 min read</p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 space-y-6 text-base leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
          <p>
            We live in a culture that prizes speed and scale. Church planting conferences celebrate
            rapid growth metrics. Social media amplifies the voices of leaders with the largest
            platforms. And yet, the way of Jesus has always been stubbornly, beautifully slow.
          </p>
          <p>
            When Jesus launched the most significant movement in human history, he did not begin
            with a mass marketing campaign. He called twelve ordinary people into proximity. He
            walked with them, ate with them, let them watch him fail to find solitude and succeed
            in finding compassion. The curriculum was his life.
          </p>
          <p>
            For those of us leading missional communities today, this should reshape our
            expectations. Disciple-making is not a six-week course. It is the patient, repetitive
            work of apprenticing people into the rhythms of the Kingdom — listening prayer, generous
            presence in neighborhoods, shared meals that become sacred ground. These things cannot
            be scaled the way a product launch can.
          </p>
          <p>
            Alan Hirsch often reminds us that every great movement begins at the margins, not the
            center. The early church did not have buildings, budgets, or branding. What it had was a
            contagious way of life that spread person to person, household to household. Multiplication
            happened not because it was a strategy, but because transformed people naturally transform
            the spaces they inhabit.
          </p>
          <p>
            Dave Ferguson talks about the &ldquo;hero maker&rdquo; posture — leaders who measure
            success not by the size of their own platform but by the number of leaders they release.
            This is the heart of multiplication. It requires us to decrease so that others might
            increase. It asks us to celebrate the wins we will never see credited to our name.
          </p>
          <p>
            So what does this mean practically? It means showing up to the same coffee shop with the
            same three people every Tuesday for two years. It means resisting the urge to program your
            way to growth and instead investing in the slow formation of a few who will go on to invest
            in a few more. It means trusting that the mustard seed math of the Kingdom is more powerful
            than any growth hack Silicon Valley could invent.
          </p>
        </div>

        {/* Interaction row */}
        <div className="mt-10 flex items-center gap-4 py-4 border-t border-b" style={{ borderColor: "var(--mvmt-border-light)" }}>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "var(--mvmt-accent-primary)" }} />
            <span className="text-sm" style={{ color: "var(--mvmt-text-tertiary)" }}>142</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
            <span className="text-sm" style={{ color: "var(--mvmt-text-tertiary)" }}>24 responses</span>
          </div>
        </div>
      </article>

      {/* More from Movemental */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-lg font-bold mb-6" style={{ color: "var(--mvmt-text-primary)" }}>More from Movemental</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <div key={article.title} className="space-y-2">
              <div className="w-full h-32 rounded-lg" style={{ backgroundColor: "var(--mvmt-accent-muted)" }} />
              <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--mvmt-text-primary)" }}>{article.title}</h3>
              <p className="text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>
                {article.author} &middot; {article.date} &middot; {article.readTime}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ArticlesCleanLongform.displayName = "ArticlesCleanLongform";
