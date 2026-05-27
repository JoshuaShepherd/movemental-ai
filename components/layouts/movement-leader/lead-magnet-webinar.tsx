"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface LeadMagnetWebinarProps {
  className?: string;
}

/**
 * Webinar/event registration — speaker photo, event details,
 * countdown urgency, and registration form.
 */
export function LeadMagnetWebinar({ className }: LeadMagnetWebinarProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Event details */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mvmt-accent/20 text-mvmt-accent text-xs font-bold mb-4">
            🔴 Live Event
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-mvmt-on-dark-primary font-mvmt-heading mb-4">
            From Addition to Multiplication: A Live Masterclass
          </h1>
          <p className="text-base text-mvmt-on-dark-secondary mb-6">
            Join Brad Brisco for a 60-minute deep dive into the practical steps every church can take to shift from an addition mindset to a multiplication culture.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-mvmt-accent">📅</span>
              <span className="text-sm text-mvmt-on-dark-primary">Thursday, February 20, 2026 at 2:00 PM EST</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-mvmt-accent">⏱</span>
              <span className="text-sm text-mvmt-on-dark-primary">60 minutes + Q&A</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-mvmt-accent">🎁</span>
              <span className="text-sm text-mvmt-on-dark-primary">Free sending church assessment for all attendees</span>
            </div>
          </div>

          {/* Speaker */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-mvmt-border-on-dark bg-mvmt-surface-dark-elevated">
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
              <p className="text-sm font-bold text-mvmt-on-dark-primary">Brad Brisco</p>
              <p className="text-xs text-mvmt-on-dark-muted">Author of The Sending Church · Exponential Speaker</p>
            </div>
          </div>
        </div>

        {/* Right: Registration form */}
        <div className="rounded-xl p-8 bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark">
          <h2 className="text-xl font-bold text-mvmt-on-dark-primary mb-2">Reserve your spot</h2>
          <p className="text-xs text-mvmt-accent mb-6">Only 247 seats remaining</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">First name</label>
                <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">Last name</label>
                <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2.5 rounded-md text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">Church / Organization</label>
              <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">What&rsquo;s your biggest challenge with multiplication?</label>
              <textarea rows={3} className="w-full px-3 py-2.5 rounded-md text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary resize-none" />
            </div>
            <button className="w-full py-3 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
              Register now — it&rsquo;s free
            </button>
            <p className="text-xs text-center text-mvmt-on-dark-muted">Can&rsquo;t attend live? Register anyway and we&rsquo;ll send the recording.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

LeadMagnetWebinar.displayName = "LeadMagnetWebinar";
