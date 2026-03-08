"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetSplitFormProps {
  className?: string;
}

/**
 * Figma-style split layout — left copy with headline + description,
 * right form with multiple fields. Light lavender tint background.
 * Based on lead-magnet-split-form-figma-01.png reference.
 */
export function LeadMagnetSplitForm({ className }: LeadMagnetSplitFormProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light-muted py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Copy */}
        <div className="pt-8">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading mb-6">
            Multiplication: a team disruptor or a team driver?
          </h1>
          <p className="text-sm leading-relaxed text-mvmt-text-secondary mb-4">
            We all know the missional imagination can make individual leaders more effective, but what happens when this transformative framework is introduced into collaborative &ldquo;multiplayer&rdquo; ministry environments?
          </p>
          <p className="text-sm leading-relaxed text-mvmt-text-secondary mb-4">
            A new report from Movemental and Exponential aims to shed light on this question. Through this first-of-its-kind research, we discovered that multiplication can bring energy to team collaboration in hybrid and distributed ministry environments that is both exciting... and unwieldy.
          </p>
          <p className="text-sm leading-relaxed text-mvmt-text-secondary">
            The report offers a glimpse into what this new multiplication-enabled way of working might look like — and the steps teams might take to stay ahead.
          </p>
        </div>

        {/* Right: Form */}
        <div className="rounded-xl p-8 bg-mvmt-surface-light border border-mvmt-border-light shadow-sm">
          <h2 className="text-xl font-bold text-mvmt-text-primary mb-2">Get the full report</h2>
          <p className="text-sm text-mvmt-text-muted mb-6">Complete this form to download the report</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Work email *</label>
                <input type="email" className="w-full px-3 py-2 rounded-md text-sm border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Email address *</label>
                <input type="email" className="w-full px-3 py-2 rounded-md text-sm border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-mvmt-text-muted mb-1">First name *</label>
                <input type="text" className="w-full px-3 py-2 rounded-md text-sm border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Last name *</label>
                <input type="text" className="w-full px-3 py-2 rounded-md text-sm border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Organization *</label>
              <input type="text" className="w-full px-3 py-2 rounded-md text-sm border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Role *</label>
              <input type="text" className="w-full px-3 py-2 rounded-md text-sm border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Network size *</label>
              <input type="text" className="w-full px-3 py-2 rounded-md text-sm border border-mvmt-border-light bg-mvmt-surface-light text-mvmt-text-primary" />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span className="text-xs text-mvmt-text-muted">I would like to sign up to receive promotional emails about Movemental events, product updates, and news.</span>
            </div>
            <button className="w-full py-3 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
              Get the report
            </button>
            <p className="text-xs text-center text-mvmt-text-muted">
              By clicking &ldquo;Submit&rdquo; you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

LeadMagnetSplitForm.displayName = "LeadMagnetSplitForm";
