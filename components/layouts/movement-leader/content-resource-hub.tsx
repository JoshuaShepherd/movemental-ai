"use client";

import { cn } from "@/lib/utils";

interface ContentResourceHubProps {
  className?: string;
}

/**
 * Resource Hub — Teachable-style 3x2 icon cards with colored tops
 * Light bg, centered heading, 6 resource cards with colored strip, icon, title, description
 */
export function ContentResourceHub({ className }: ContentResourceHubProps) {
  const resources = [
    { title: "Getting Started Guide", description: "Everything you need to launch your first missional community on the platform.", color: "#3B82F6", bgLightVar: "--mvmt-card-decorative-1" },
    { title: "Video Library", description: "Hours of training content from Alan Hirsch, Dave Ferguson, Brad Brisco, and more.", color: "#8B5CF6", bgLightVar: "--mvmt-card-decorative-2" },
    { title: "Templates & Playbooks", description: "Ready-made frameworks for coaching sessions, community rhythms, and leader pipelines.", color: "#10B981", bgLightVar: "--mvmt-card-decorative-4" },
    { title: "Community Forum", description: "Connect with other movement leaders. Ask questions, share wins, and find collaborators.", color: "#F59E0B", bgLightVar: "--mvmt-card-decorative-5" },
    { title: "Webinar Archive", description: "Recordings of live events, Q&A sessions, and expert panels on multiplication topics.", color: "#EF4444", bgLightVar: "--mvmt-card-decorative-6" },
    { title: "API Documentation", description: "Technical reference for integrating Movemental with your existing ministry tools.", color: "#6366F1", bgLightVar: "--mvmt-card-decorative-2" },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-mvmt-text-primary font-mvmt-heading">
            Resource Hub
          </h1>
          <p className="text-lg max-w-xl mx-auto text-mvmt-text-secondary">
            Everything you need to build, lead, and multiply — all in one place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div key={res.title} className="rounded-xl overflow-hidden cursor-pointer bg-mvmt-surface-light border border-mvmt-border-light">
              <div className="h-2 w-full" style={{ backgroundColor: res.color }} />
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: `var(${res.bgLightVar})` }}>
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: res.color, opacity: 0.6 }} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-mvmt-text-primary">{res.title}</h3>
                <p className="text-sm leading-relaxed text-mvmt-text-secondary">{res.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentResourceHub.displayName = "ContentResourceHub";
