"use client";

import { cn } from "@/lib/utils";

interface ReaderSplitReferenceProps {
  className?: string;
}

const footnotes = [
  { id: 1, text: "Hirsch, Alan. The Forgotten Ways: Reactivating Apostolic Movements. Brazos Press, 2016." },
  { id: 2, text: "Ferguson, Dave & Warren Bird. Hero Maker: Five Essential Practices for Leaders to Multiply. Zondervan, 2018." },
  { id: 3, text: "Cole, Neil. Organic Church: Growing Faith Where Life Happens. Jossey-Bass, 2005." },
  { id: 4, text: "See the Exponential 2024 report on Level 5 Multiplication for comparable data across 1,200 churches." },
];

/**
 * Academic/Notion-style split-pane reader: main text on left,
 * footnotes/references/annotations on right sidebar.
 */
export function ReaderSplitReference({ className }: ReaderSplitReferenceProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-surface-light", className)}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-b-mvmt-border-light">
        <span className="text-sm font-bold text-mvmt-text-primary">Movemental Reader</span>
        <div className="flex items-center gap-4 text-sm text-mvmt-text-muted">
          <button>📖 Reading</button>
          <button>📝 Notes</button>
          <button>🔗 References</button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex-1 grid lg:grid-cols-[1fr_320px] gap-0">
        {/* Main content */}
        <article className="px-8 sm:px-12 py-10 border-r border-r-mvmt-border-light">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2 text-mvmt-text-primary font-mvmt-heading">
            The Missional Imagination
          </h1>
          <p className="text-sm text-mvmt-text-muted mb-8">
            From <em>The Sending Church</em> · Chapter 5 · Brad Brisco
          </p>

          <div className="max-w-2xl space-y-6">
            <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              Alan Hirsch argues that every church already contains the latent potential for apostolic movement.<sup className="text-mvmt-accent cursor-pointer">1</sup> The problem is not that the potential is absent, but that it has been suppressed by decades of institutional Christianity that prioritizes stability over sentness.
            </p>
            <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              Dave Ferguson and Warren Bird extend this insight by identifying five practices that distinguish &ldquo;hero makers&rdquo; from traditional leaders.<sup className="text-mvmt-accent cursor-pointer">2</sup> The hero maker doesn&rsquo;t ask &ldquo;How can I lead more people?&rdquo; but &ldquo;How can I develop more leaders?&rdquo; This shift in question changes everything downstream.
            </p>
            <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              Neil Cole&rsquo;s work on organic church provides the practical framework for what happens when these leaders are released into the wild.<sup className="text-mvmt-accent cursor-pointer">3</sup> His model demonstrates that multiplication happens most naturally in small, relational contexts — not in large institutional structures.
            </p>
            <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              Recent data from Exponential suggests that fewer than 4% of North American churches operate at a &ldquo;Level 5&rdquo; multiplication capacity.<sup className="text-mvmt-accent cursor-pointer">4</sup> This means that 96% of churches are either declining, plateaued, or growing only through addition. The gap between aspiration and reality remains enormous.
            </p>
            <p className="text-base leading-[1.85] text-mvmt-text-primary font-mvmt-heading">
              Closing that gap requires more than strategy. It requires a fundamental shift in imagination — from seeing the church as a destination to seeing it as a launching pad. This is the missional imagination: the ability to envision every gathered community as a potential sending community.
            </p>
          </div>
        </article>

        {/* Right sidebar: references & notes */}
        <aside className="px-6 py-10 bg-mvmt-surface-light-muted overflow-y-auto">
          <h3 className="text-xs font-bold tracking-widest uppercase text-mvmt-text-muted mb-6">
            References &amp; Notes
          </h3>
          <div className="space-y-5">
            {footnotes.map((fn) => (
              <div key={fn.id} className="group">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-mvmt-accent mt-0.5">{fn.id}</span>
                  <p className="text-xs leading-relaxed text-mvmt-text-secondary">{fn.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-t-mvmt-border-light">
            <h3 className="text-xs font-bold tracking-widest uppercase text-mvmt-text-muted mb-4">
              Your Highlights
            </h3>
            <div className="space-y-3">
              <div className="px-3 py-2 rounded-md border-l-2 border-l-mvmt-accent bg-mvmt-surface-light">
                <p className="text-xs leading-relaxed text-mvmt-text-primary italic">
                  &ldquo;The hero maker doesn&rsquo;t ask &lsquo;How can I lead more people?&rsquo; but &lsquo;How can I develop more leaders?&rsquo;&rdquo;
                </p>
                <p className="text-xs text-mvmt-text-muted mt-1">Highlighted 2 days ago</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

ReaderSplitReference.displayName = "ReaderSplitReference";
