"use client";

import { cn } from "@/lib/utils";

interface ContentIntegrationGuidesProps {
  className?: string;
}

/**
 * Integration Guides — Clearbit-style gradient-top cards with tags
 * Gradient header, 6 guide cards with gradient strip, icon, title, description, tags
 */
export function ContentIntegrationGuides({ className }: ContentIntegrationGuidesProps) {
  const guides = [
    { title: "Planning Center Integration", description: "Connect your Planning Center groups and attendance data to automatically track community health metrics.", tags: ["Setup", "Data Sync"], gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)" },
    { title: "Zoom Coaching Sessions", description: "Schedule and record coaching conversations directly within Movemental. Transcripts sync to leader profiles.", tags: ["Coaching", "Video"], gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)" },
    { title: "Subsplash Giving", description: "Pull generosity data into your movement dashboard to correlate giving patterns with community engagement.", tags: ["Finance", "Analytics"], gradient: "linear-gradient(135deg, #10B981, #34D399)" },
    { title: "Mailchimp Campaigns", description: "Segment your email lists by leader stage, community type, or engagement level. Automate nurture sequences.", tags: ["Email", "Automation"], gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)" },
    { title: "Slack Notifications", description: "Get real-time alerts when leaders complete training milestones, communities report, or coaching sessions are due.", tags: ["Alerts", "Messaging"], gradient: "linear-gradient(135deg, #EF4444, #F97316)" },
    { title: "Google Workspace", description: "Single sign-on, shared drives for curriculum, and Calendar integration for community rhythms and events.", tags: ["Auth", "Files"], gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
      {/* Gradient header */}
      <div className="py-16 px-6" style={{ background: "var(--mvmt-gradient-hero-brand)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
            Integrations
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#FFFFFF", fontFamily: "var(--mvmt-font-heading)" }}>
            Connect your movement tools
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.85)" }}>
            Movemental integrates with the platforms your teams already use, so data flows and nothing falls through the cracks.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div key={guide.title} className="rounded-xl overflow-hidden" style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}>
              <div className="h-2 w-full" style={{ background: guide.gradient }} />
              <div className="p-6">
                <div className="w-10 h-10 rounded-lg mb-4" style={{ background: guide.gradient, opacity: 0.2 }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--mvmt-text-primary)" }}>{guide.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--mvmt-text-secondary)" }}>{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-accent)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentIntegrationGuides.displayName = "ContentIntegrationGuides";
