"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetEbookPreviewProps {
  className?: string;
}

/**
 * Ebook preview with chapter listing — centered book cover,
 * chapter preview list, and email capture below.
 */
export function LeadMagnetEbookPreview({ className }: LeadMagnetEbookPreviewProps) {
  const chapters = [
    "Chapter 1: Why Sending Matters Now",
    "Chapter 2: The DNA of a Sending Church",
    "Chapter 3: Building a Leadership Pipeline",
    "Chapter 4: The Economics of Multiplication",
    "Chapter 5: Releasing Your Best People",
  ];

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Book cover */}
        <div className="w-48 mx-auto rounded-lg overflow-hidden shadow-lg mb-8 bg-mvmt-surface-dark p-6">
          <p className="text-xs uppercase tracking-widest text-mvmt-on-dark-muted mb-2">Brad Brisco</p>
          <p className="text-lg font-bold text-mvmt-on-dark-primary font-mvmt-heading">The Sending Church</p>
          <p className="text-xs text-mvmt-accent mt-2">Free Preview</p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-mvmt-text-primary font-mvmt-heading mb-3">
          Preview: The Sending Church
        </h1>
        <p className="text-base text-mvmt-text-secondary mb-8">
          Get the first 3 chapters free. See what 10,000+ movement leaders are reading.
        </p>

        {/* Chapter list */}
        <div className="text-left max-w-md mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-4">What&rsquo;s inside</p>
          {chapters.map((ch, i) => (
            <div key={ch} className={cn("flex items-center gap-3 py-3 border-b border-b-mvmt-border-light", i < 3 ? "text-mvmt-text-primary" : "text-mvmt-text-muted")}>
              {i < 3 ? (
                <span className="w-5 h-5 rounded-full bg-mvmt-accent text-mvmt-cta-text flex items-center justify-center text-xs flex-shrink-0">✓</span>
              ) : (
                <span className="w-5 h-5 rounded-full border border-mvmt-border-medium flex items-center justify-center text-xs flex-shrink-0 text-mvmt-text-muted">🔒</span>
              )}
              <span className="text-sm">{ch}</span>
              {i < 3 && <span className="ml-auto text-xs text-mvmt-accent">Free</span>}
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="max-w-md mx-auto">
          <p className="text-sm font-medium text-mvmt-text-primary mb-3">Enter your email to get the free preview</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@church.org"
              className="flex-1 px-4 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary"
            />
            <button className="px-6 py-2.5 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
              Get preview
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

LeadMagnetEbookPreview.displayName = "LeadMagnetEbookPreview";
