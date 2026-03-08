"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetBookPreviewProps {
  className?: string;
}

/**
 * Amplitude-style book preview — left form, right book cover image
 * with description and bullet points of what's inside.
 * Based on lead-magnet-book-preview-amplitude-02.png reference.
 */
export function LeadMagnetBookPreview({ className }: LeadMagnetBookPreviewProps) {
  const topics = [
    "The purpose, value, and elements of the Multiplication Framework.",
    "How to define and name a Multiplication Metric and inputs.",
    "Tips on how and when to change your Multiplication Metric.",
    "Best practices for making the Multiplication Framework \"stick\" to your culture and processes.",
  ];

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Form */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-3">Free playbook</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading mb-8">
            The Multiplication Framework Playbook
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Organization</label>
              <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Phone number</label>
              <input type="tel" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Role</label>
              <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Country</label>
              <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
            </div>
            <div className="flex items-start gap-2 text-xs text-mvmt-text-muted">
              <input type="checkbox" className="mt-0.5" />
              <span>I&rsquo;d like to receive emails about news &amp; updates from Movemental.</span>
            </div>
            <button className="w-full py-3 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
              Download Now
            </button>
          </div>
        </div>

        {/* Right: Book preview + description */}
        <div>
          {/* Book cover placeholder */}
          <div className="rounded-lg overflow-hidden mb-8 bg-mvmt-surface-dark p-8 flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-mvmt-on-dark-muted mb-2">The</p>
              <p className="text-2xl font-bold text-mvmt-on-dark-primary font-mvmt-heading">Multiplication<br />Framework</p>
              <p className="text-sm text-mvmt-accent mt-2">PLAYBOOK</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-mvmt-text-secondary mb-6">
            Movement leaders, coaches, and network builders work tirelessly to create reproducible disciples and great missional experiences, but most lack the clarity, alignment, and accountability needed to realize their goals.
          </p>
          <p className="text-sm leading-relaxed text-mvmt-text-secondary mb-6">
            Enter the Multiplication Framework. Brimming with expert insights and real-life examples, this new and improved playbook dives deep into:
          </p>
          <ul className="space-y-2 mb-6">
            {topics.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-mvmt-text-secondary">
                <span className="text-mvmt-accent mt-1 flex-shrink-0">●</span>
                {t}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-mvmt-text-secondary italic">
            Say goodbye to churning out programs and hello to clarity and coherence.
          </p>
        </div>
      </div>
    </section>
  );
}

LeadMagnetBookPreview.displayName = "LeadMagnetBookPreview";
