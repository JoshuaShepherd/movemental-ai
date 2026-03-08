"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetGuideSimpleProps {
  className?: string;
}

/**
 * Calendly-style simple guide download — breadcrumb nav, left copy
 * with doc specs, right clean form. Minimal and professional.
 * Based on lead-magnet-guide-simple-calendly-03.png reference.
 */
export function LeadMagnetGuideSimple({ className }: LeadMagnetGuideSimpleProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-10 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-mvmt-text-muted mb-8">
          <span className="text-mvmt-accent">Learn</span>
          <span>/</span>
          <span className="text-mvmt-accent">Connect</span>
          <span>/</span>
          <span>Ebooks &amp; Guides</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Guide info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-mvmt-text-muted mb-2">Guide</p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading mb-4">
              How to help new leaders onboard successfully
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-medium text-mvmt-text-muted">Document Specifics</span>
            </div>
            <p className="text-sm font-medium text-mvmt-text-primary mb-4">PDF | 2 pages</p>
            <p className="text-sm leading-relaxed text-mvmt-text-secondary mb-4">
              Onboarding is critical for demonstrating your platform&rsquo;s value. It&rsquo;s your opportunity to drive adoption, increase retention, and <strong>double your organization&rsquo;s impact</strong>.
            </p>
            <p className="text-sm leading-relaxed text-mvmt-text-secondary mb-6">
              That&rsquo;s why it&rsquo;s important your leaders are prepared for onboarding conversations — especially newcomers. If you have new team members, these top tips will help them hit the ground running and onboard leaders more successfully.
            </p>
            <p className="text-sm font-medium text-mvmt-text-primary">This guide shares:</p>
            <ul className="mt-2 space-y-1">
              {[
                "5 proven strategies for leader onboarding",
                "Common mistakes to avoid in the first 30 days",
                "Templates for onboarding conversations",
                "Metrics to track onboarding success",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-mvmt-text-secondary">
                  <span className="text-mvmt-accent">●</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="rounded-xl p-8 bg-mvmt-surface-light border border-mvmt-border-light shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-mvmt-text-primary mb-1">First Name:</label>
                <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-mvmt-text-primary mb-1">Last Name:</label>
                <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-mvmt-text-primary mb-1">Email Address:</label>
                <input type="email" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-mvmt-text-primary mb-1">Organization Name:</label>
                <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-mvmt-text-primary mb-1">Role:</label>
                <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
              </div>
              <button className="w-full py-3 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

LeadMagnetGuideSimple.displayName = "LeadMagnetGuideSimple";
