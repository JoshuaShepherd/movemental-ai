"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetToolkitProps {
  className?: string;
}

const resources = [
  { icon: "📕", title: "The Sending Church Field Guide", format: "PDF · 45 pages" },
  { icon: "📋", title: "Sending Readiness Checklist", format: "PDF · 2 pages" },
  { icon: "📊", title: "Multiplication Assessment Template", format: "Google Form" },
  { icon: "🗓️", title: "12-Month Sending Timeline", format: "PDF · Calendar" },
  { icon: "💬", title: "Coaching Conversation Starters", format: "PDF · 10 prompts" },
  { icon: "📈", title: "Network Health Dashboard", format: "Google Sheet" },
];

/**
 * Resource bundle/toolkit lead magnet — itemized list of contents
 * with icons and formats, plus email capture.
 */
export function LeadMagnetToolkit({ className }: LeadMagnetToolkitProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-3">Free toolkit</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-mvmt-text-primary font-mvmt-heading mb-4">
            The Complete Sending Church Toolkit
          </h1>
          <p className="text-base text-mvmt-text-secondary max-w-xl mx-auto">
            Everything you need to go from &ldquo;we should plant a church someday&rdquo; to &ldquo;we&rsquo;re sending our first team this year.&rdquo; 6 resources, one download.
          </p>
        </div>

        {/* Resource grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {resources.map((r) => (
            <div key={r.title} className="flex items-start gap-3 p-4 rounded-lg border border-mvmt-border-light bg-mvmt-surface-light">
              <span className="text-2xl flex-shrink-0">{r.icon}</span>
              <div>
                <p className="text-sm font-bold text-mvmt-text-primary">{r.title}</p>
                <p className="text-xs text-mvmt-text-muted">{r.format}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="max-w-lg mx-auto rounded-xl p-8 bg-mvmt-surface-light-muted border border-mvmt-border-light text-center">
          <h2 className="text-xl font-bold text-mvmt-text-primary mb-2">Get the full toolkit</h2>
          <p className="text-sm text-mvmt-text-muted mb-6">Enter your email and we&rsquo;ll send all 6 resources instantly.</p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary"
            />
            <input
              type="email"
              placeholder="you@church.org"
              className="w-full px-4 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary"
            />
            <button className="w-full py-3 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
              Send me the toolkit →
            </button>
          </div>
          <p className="text-xs text-mvmt-text-muted mt-3">Join 10,000+ leaders. No spam, ever.</p>
        </div>
      </div>
    </section>
  );
}

LeadMagnetToolkit.displayName = "LeadMagnetToolkit";
