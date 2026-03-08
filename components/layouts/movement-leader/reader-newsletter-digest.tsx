"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ReaderNewsletterDigestProps {
  className?: string;
}

/**
 * Substack-style newsletter/digest reader with author avatar,
 * publish date, like/share/comment actions, email-style layout.
 */
export function ReaderNewsletterDigest({ className }: ReaderNewsletterDigestProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-surface-light", className)}>
      {/* Newsletter header */}
      <div className="border-b border-b-mvmt-border-light">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp"
                alt="Brad Brisco"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-mvmt-text-primary">Brad Brisco</p>
              <p className="text-xs text-mvmt-text-muted">The Sending Church Newsletter · Jan 15, 2026</p>
            </div>
            <button className="ml-auto px-4 py-1.5 text-sm font-medium rounded-full bg-mvmt-accent text-mvmt-cta-text">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4 text-mvmt-text-primary font-mvmt-heading">
          Why Your Church Needs a Sending Pathway (Not Just a Mission Trip)
        </h1>
        <div className="flex items-center gap-4 mb-8 text-sm text-mvmt-text-muted">
          <span>❤️ 247 likes</span>
          <span>💬 38 comments</span>
          <span>↗ Share</span>
        </div>

        <div className="space-y-6">
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            Happy Wednesday, friends. This week I want to tackle something that&rsquo;s been on my mind ever since I spoke at the Exponential conference last month: the difference between a church that <em>does</em> missions and a church that <em>is</em> missional.
          </p>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            Most churches I work with have some version of a missions program. They support missionaries financially. They send teams on short-term trips. They have a missions committee that meets quarterly. And all of this is good. But it&rsquo;s not the same as having a sending pathway.
          </p>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            A sending pathway is an intentional, multi-year process that identifies potential sent-ones early, develops them through increasingly challenging ministry experiences, and commissions them with the full support and ongoing partnership of the sending community. It&rsquo;s not an event — it&rsquo;s a culture.
          </p>

          <div className="my-8 p-6 rounded-lg bg-mvmt-surface-light-muted border border-mvmt-border-light">
            <p className="text-sm font-bold text-mvmt-text-primary mb-2">📌 Key Takeaway</p>
            <p className="text-sm leading-relaxed text-mvmt-text-secondary">
              A mission trip is a program. A sending pathway is a pipeline. Programs produce experiences. Pipelines produce leaders. Both have value, but only one produces multiplication.
            </p>
          </div>

          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            Here are three questions every pastor should ask this week:
          </p>
          <ol className="space-y-3 pl-6 list-decimal">
            <li className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              Who in our church has a calling to plant, and do they know we see it in them?
            </li>
            <li className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              What would we need to change structurally to release our best leaders?
            </li>
            <li className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              If we sent 10% of our congregation next year, would our systems survive it?
            </li>
          </ol>
          <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
            That last question is the hardest. And it&rsquo;s the one that separates addition-minded churches from multiplication-minded ones.
          </p>
        </div>

        {/* Action bar */}
        <div className="mt-10 pt-6 border-t border-t-mvmt-border-light flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm text-mvmt-text-secondary hover:text-mvmt-accent">
            ❤️ <span>247</span>
          </button>
          <button className="flex items-center gap-2 text-sm text-mvmt-text-secondary hover:text-mvmt-accent">
            💬 <span>38</span>
          </button>
          <button className="flex items-center gap-2 text-sm text-mvmt-text-secondary hover:text-mvmt-accent ml-auto">
            🔖 Save
          </button>
          <button className="flex items-center gap-2 text-sm text-mvmt-text-secondary hover:text-mvmt-accent">
            ↗ Share
          </button>
        </div>

        {/* Author footer */}
        <div className="mt-8 p-6 rounded-lg border border-mvmt-border-light flex items-start gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp"
              alt="Brad Brisco"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-mvmt-text-primary mb-1">Brad Brisco</p>
            <p className="text-xs leading-relaxed text-mvmt-text-secondary">
              Author of <em>The Sending Church</em> and <em>Covocational Church Planting</em>. Helping leaders move from addition to multiplication. Writing weekly on missional ecclesiology, church planting, and the sending church movement.
            </p>
            <button className="mt-2 text-xs font-medium text-mvmt-accent">Follow →</button>
          </div>
        </div>
      </article>
    </section>
  );
}

ReaderNewsletterDigest.displayName = "ReaderNewsletterDigest";
