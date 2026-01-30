"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReaderPaginatedBookProps {
  className?: string;
}

const pages = [
  {
    content: (
      <>
        <h2 className="text-sm font-bold tracking-[0.3em] text-center mb-10 text-mvmt-text-primary uppercase">
          Chapter One
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-mvmt-text-primary font-mvmt-heading">
          The DNA of a Sending Church
        </h3>
        <p className="text-base leading-[1.85] text-justify mb-5 text-mvmt-text-primary font-mvmt-heading">
          <span className="text-5xl font-bold float-left mr-3 leading-none text-mvmt-text-primary">E</span>very church has DNA. It&rsquo;s the invisible code that shapes culture, determines priorities, and ultimately decides what a congregation will and won&rsquo;t do. Most churches have inherited DNA that prioritizes gathering — Sunday attendance, building programs, staff growth. There&rsquo;s nothing inherently wrong with these things. But sending DNA is different.
        </p>
        <p className="text-base leading-[1.85] text-justify mb-5 text-mvmt-text-primary font-mvmt-heading">
          A sending church carries multiplication in its genetic code. It talks about it from the pulpit, budgets for it in its finances, and celebrates it in its stories. When someone says &ldquo;I feel called to plant a church,&rdquo; the response isn&rsquo;t fear or loss — it&rsquo;s commissioning.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="text-base leading-[1.85] text-justify mb-5 text-mvmt-text-primary font-mvmt-heading">
          But here&rsquo;s the uncomfortable truth: you can&rsquo;t program sending DNA. You can&rsquo;t add it to your mission statement and expect it to take hold. It has to be modeled by the senior leader, reinforced by the elders, and embedded in the discipleship pathway from day one.
        </p>
        <p className="text-base leading-[1.85] text-justify mb-5 text-mvmt-text-primary font-mvmt-heading">
          I&rsquo;ve watched dozens of churches try to bolt on a &ldquo;sending culture&rdquo; without changing anything fundamental about how they operate. They announce a church plant, take up a special offering, and send a team with a prayer and a potluck. Six months later, the plant is struggling and the sending church has moved on to the next initiative.
        </p>
        <p className="text-base leading-[1.85] text-justify mb-5 text-mvmt-text-primary font-mvmt-heading">
          Real sending requires structural change. It means building a leadership pipeline that expects people to leave. It means allocating 10-15% of the budget not to buildings or programs but to external mission. It means the senior pastor regularly saying, &ldquo;My job is to work myself out of a job.&rdquo;
        </p>
        <p className="text-base leading-[1.85] text-justify mb-5 text-mvmt-text-primary font-mvmt-heading">
          The churches that do this well share three common traits: a theology of sentness, a culture of generosity, and a leadership structure that distributes authority rather than concentrating it.
        </p>
      </>
    ),
  },
];

/**
 * Apple Books-style paginated reader with page-turn navigation,
 * page numbers, and book-like proportions.
 */
export function ReaderPaginatedBook({ className }: ReaderPaginatedBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;

  return (
    <section className={cn("relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-mvmt-surface-light-muted", className)}>
      {/* Top controls */}
      <div className="w-full max-w-3xl flex items-center justify-between px-6 py-4">
        <button className="text-sm text-mvmt-text-muted">☰ Contents</button>
        <span className="text-sm font-medium text-mvmt-text-primary">The Sending Church</span>
        <div className="flex items-center gap-3">
          <button className="text-sm text-mvmt-text-muted">🔍</button>
          <button className="text-sm text-mvmt-text-muted">Aa</button>
        </div>
      </div>

      {/* Book page */}
      <div className="relative w-full max-w-3xl mx-4 flex-1 flex items-stretch">
        {/* Previous page arrow */}
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full flex items-center justify-center text-mvmt-text-muted transition-opacity",
            currentPage === 0 ? "opacity-30 cursor-default" : "hover:text-mvmt-text-primary"
          )}
        >
          ‹
        </button>

        {/* Page content */}
        <div className="flex-1 rounded-lg bg-mvmt-surface-light shadow-lg px-10 sm:px-16 py-12 overflow-hidden">
          {pages[currentPage].content}
        </div>

        {/* Next page arrow */}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full flex items-center justify-center text-mvmt-text-muted transition-opacity",
            currentPage === totalPages - 1 ? "opacity-30 cursor-default" : "hover:text-mvmt-text-primary"
          )}
        >
          ›
        </button>
      </div>

      {/* Page indicator */}
      <div className="w-full max-w-3xl px-6 py-4 flex items-center justify-between">
        <span className="text-xs text-mvmt-text-muted">Page {currentPage + 1} of {totalPages}</span>
        <div className="flex items-center gap-1">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === currentPage ? "bg-mvmt-accent" : "bg-mvmt-border-light"
              )}
            />
          ))}
        </div>
        <span className="text-xs text-mvmt-text-muted">3% complete</span>
      </div>
    </section>
  );
}

ReaderPaginatedBook.displayName = "ReaderPaginatedBook";
