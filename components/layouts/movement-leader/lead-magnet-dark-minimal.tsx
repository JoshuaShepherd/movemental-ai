"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetDarkMinimalProps {
  className?: string;
}

/**
 * Dark minimal lead magnet — full dark background, centered headline,
 * single email input, focused and high-conversion.
 */
export function LeadMagnetDarkMinimal({ className }: LeadMagnetDarkMinimalProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark flex items-center justify-center px-6", className)}>
      <div className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-full bg-mvmt-accent/20 flex items-center justify-center text-3xl mx-auto mb-8">
          📖
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-mvmt-on-dark-primary font-mvmt-heading mb-4">
          Get the playbook that&rsquo;s reshaping how churches send
        </h1>
        <p className="text-lg text-mvmt-on-dark-secondary mb-10">
          Join 10,000+ movement leaders. Free chapter + weekly field notes on multiplication, church planting, and missional leadership.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-sm bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted"
          />
          <button className="px-8 py-3 rounded-lg text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text whitespace-nowrap">
            Get free chapter
          </button>
        </div>
        <p className="text-xs text-mvmt-on-dark-muted">No credit card. No spam. Unsubscribe anytime.</p>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-6">
          {[
            { value: "10K+", label: "subscribers" },
            { value: "4.9★", label: "reader rating" },
            { value: "85+", label: "countries" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-lg font-bold text-mvmt-accent">{s.value}</p>
              <p className="text-xs text-mvmt-on-dark-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

LeadMagnetDarkMinimal.displayName = "LeadMagnetDarkMinimal";
