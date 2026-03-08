"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface LeadMagnetShareInviteProps {
  className?: string;
}

/**
 * MasterClass-style share/invite page — dark hero with bold headline,
 * email invite + shareable link, plus 3 guarantee cards.
 * Based on lead-magnet-share-invite-masterclass-05.png reference.
 */
export function LeadMagnetShareInvite({ className }: LeadMagnetShareInviteProps) {
  const [email, setEmail] = useState("");
  const shareLink = "https://movemental.com/invite/a1b2c3...";

  const guarantees = [
    { title: "Activation date", description: "14-day unlimited access period begins only when the recipient activates their Guest Pass." },
    { title: "No commitment", description: "Recipients may cancel anytime, and are charged only if they subscribe after the trial ends." },
    { title: "Satisfaction guarantee", description: "Enjoy this experience risk-free for recipients who change their mind with a 30-day money back guarantee." },
  ];

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark", className)}>
      {/* Hero */}
      <div className="relative px-6 py-16 text-center bg-mvmt-surface-dark-elevated">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-mvmt-on-dark-primary font-mvmt-heading mb-4">
            Send your friends a Movemental <span className="italic text-mvmt-accent">Guest Pass</span>
          </h1>
          <p className="text-sm text-mvmt-on-dark-secondary mb-3">
            Introduce your friends to Movemental. They will get free 14-day access to all 200+ courses.
          </p>
          <p className="text-xs text-mvmt-accent mb-2">
            You have 3 unclaimed Guest Passes that expire on Jan 14, 2027.
          </p>
          <button className="text-xs underline text-mvmt-on-dark-muted">See our offer terms.</button>
        </div>
      </div>

      {/* Invite forms */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="space-y-6">
          {/* Email invite */}
          <div>
            <label className="block text-sm font-medium text-mvmt-on-dark-primary mb-2">Invite Through Email</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="leader@church.org"
                className="flex-1 px-4 py-2.5 rounded-md text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted"
              />
              <button className="px-6 py-2.5 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
                Send
              </button>
            </div>
          </div>

          {/* Share link */}
          <div>
            <label className="block text-sm font-medium text-mvmt-on-dark-primary mb-2">Share Your Personal Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="flex-1 px-4 py-2.5 rounded-md text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-muted"
              />
              <button className="px-6 py-2.5 rounded-md text-sm font-medium border border-mvmt-border-on-dark-medium text-mvmt-on-dark-primary">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee cards */}
      <div className="max-w-4xl mx-auto px-6 py-10 border-t border-t-mvmt-border-on-dark">
        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-bold text-mvmt-on-dark-primary mb-2">{g.title}</h3>
              <p className="text-xs leading-relaxed text-mvmt-on-dark-muted">{g.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

LeadMagnetShareInvite.displayName = "LeadMagnetShareInvite";
