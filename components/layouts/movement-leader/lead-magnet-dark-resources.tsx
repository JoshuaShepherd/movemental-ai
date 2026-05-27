"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetDarkResourcesProps {
  className?: string;
}

/**
 * MasterClass-style dark class resources page — book cover with
 * download button, plus enterprise CTA banner with photos.
 * Based on lead-magnet-dark-resources-masterclass-04.png reference.
 */
export function LeadMagnetDarkResources({ className }: LeadMagnetDarkResourcesProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark", className)}>
      {/* Top nav */}
      <div className="flex items-center gap-6 px-6 sm:px-12 py-4 border-b border-b-mvmt-border-on-dark">
        <span className="text-sm font-bold text-mvmt-on-dark-primary">Movemental</span>
        <div className="hidden sm:flex items-center gap-6 text-sm text-mvmt-on-dark-secondary">
          <span>Discover</span>
          <span>My Progress</span>
          <span>Library</span>
        </div>
      </div>

      {/* Resource section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
          {/* Book cover */}
          <div className="rounded-lg overflow-hidden bg-mvmt-surface-dark-elevated p-6 flex flex-col items-center">
            <div className="w-full aspect-[3/4] rounded bg-mvmt-border-on-dark flex items-center justify-center mb-4">
              <div className="text-center px-4">
                <p className="text-xs uppercase tracking-widest text-mvmt-on-dark-muted mb-1">Brad Brisco</p>
                <p className="text-lg font-bold text-mvmt-on-dark-primary font-mvmt-heading">The Sending Church</p>
                <p className="text-xs text-mvmt-on-dark-muted mt-1">A Field Guide</p>
              </div>
            </div>
            <span className="text-xs text-mvmt-on-dark-muted">Movemental</span>
          </div>

          {/* Description + download */}
          <div>
            <h2 className="text-2xl font-bold text-mvmt-on-dark-primary font-mvmt-heading mb-4">
              Class Resources
            </h2>
            <p className="text-sm leading-relaxed text-mvmt-on-dark-secondary mb-6">
              An overview of Brad Brisco&rsquo;s multiplication career and leadership approach — plus tips for setting agendas, building teams, and measuring success.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium border border-mvmt-border-on-dark-medium text-mvmt-on-dark-primary">
              ↓ Download Class Guide
            </button>
          </div>
        </div>
      </div>

      {/* Enterprise CTA banner */}
      <div className="border-t border-t-mvmt-border-on-dark">
        <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-mvmt-on-dark-primary font-mvmt-heading mb-4">
              Movemental at Work
            </h3>
            <p className="text-sm text-mvmt-on-dark-secondary mb-6">
              Group rates are available for volume based orders. Contact Sales to learn more.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
                Contact Sales
              </button>
              <button className="text-sm text-mvmt-on-dark-secondary">
                Learn more →
              </button>
            </div>
          </div>
          {/* Photo grid placeholder */}
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-lg bg-mvmt-surface-dark-elevated" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

LeadMagnetDarkResources.displayName = "LeadMagnetDarkResources";
