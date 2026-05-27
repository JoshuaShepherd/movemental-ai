"use client";

import { cn } from "@/lib/utils";

interface ReaderArticleCleanProps {
  className?: string;
}

/**
 * Medium-style clean article reader — minimal chrome, serif body,
 * top search bar, bottom progress indicator, distraction-free reading.
 * Based on reader-article-clean-02.png (Medium) reference.
 */
export function ReaderArticleClean({ className }: ReaderArticleCleanProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-surface-light", className)}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-3 border-b border-b-mvmt-border-light">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-mvmt-text-primary">M</span>
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border border-mvmt-border-light">
            <span className="text-xs text-mvmt-text-muted">🔍</span>
            <span className="text-sm text-mvmt-text-muted">Search Movemental</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-mvmt-text-muted">✏️ Write</button>
        </div>
      </div>

      {/* Article body */}
      <article className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <p className="text-sm text-mvmt-text-muted mb-6">
          At 6:45pm on Wednesday, April 23rd, 2014, I got a message from my friend Alan Hirsch, the pioneering and peerless movement strategist.
        </p>
        <p className="text-lg leading-[1.9] mb-6 font-mvmt-heading text-mvmt-text-primary">
          I opened it, saw that it was to be the first of a long awaited series called &ldquo;Missional Science&rdquo; for the <span className="underline text-mvmt-accent">Forge Blog</span>, where I was then an editor. I assumed it was good &mdash; Alan&rsquo;s work always was &mdash; so I marked it as unread and told myself it could wait until Monday.
        </p>
        <p className="text-lg leading-[1.9] mb-6 font-mvmt-heading text-mvmt-text-primary">
          On that Saturday, less than 72 hours later, I heard that a key leader in our network had experienced a sudden change of heart while hiking in Berkeley. It would have been so easy for me to reply and tell him how happy I was with what he had written. Or how much he&rsquo;d helped me over the years and how excited I was to be working with him. How hard would it have been to give even the courtesy of acknowledging his message?
        </p>
        <p className="text-lg leading-[1.9] mb-6 font-mvmt-heading text-mvmt-text-primary">
          But I didn&rsquo;t. And now I will never get to tell him anything ever again. This man who had mentored me, who had inspired me, who had made me rethink how I did so many things&hellip; I had left him on hold and now he was gone.
        </p>
        <p className="text-lg leading-[1.9] mb-6 font-mvmt-heading text-mvmt-text-primary">
          Of course, I was familiar with the Stoic concept of <em className="underline">Memento Mori</em>. In <em className="underline">Meditations</em>, Marcus Aurelius writes &ldquo;You could leave life right now. Let that determine what you do and say and think.&rdquo; Of course, I knew that any of us could go at any moment. Yet there is, as always, a difference between knowing something and <em>knowing</em> it. And there is nothing like losing someone
        </p>
      </article>

      {/* Bottom progress */}
      <div className="sticky bottom-0 px-6 py-3 flex items-center justify-between border-t border-t-mvmt-border-light bg-mvmt-surface-light">
        <span className="text-sm font-medium text-mvmt-accent">M</span>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-xs text-mvmt-text-muted bg-mvmt-surface-light-muted px-2 py-1 rounded-full">
            4 min 3 compelling
          </span>
        </div>
      </div>
    </section>
  );
}

ReaderArticleClean.displayName = "ReaderArticleClean";
