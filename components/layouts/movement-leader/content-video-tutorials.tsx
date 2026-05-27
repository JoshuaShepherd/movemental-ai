"use client";

import { cn } from "@/lib/utils";

interface ContentVideoTutorialsProps {
  className?: string;
}

/**
 * Video Tutorials — Framer-style video grid + doc list
 * Light bg, 3-col video cards with thumbnails, documentation links below
 */
export function ContentVideoTutorials({ className }: ContentVideoTutorialsProps) {
  const videos = [
    { title: "Getting Started with Movemental", duration: "4:32", color: "#F1F5F9" },
    { title: "Setting Up Your First Community", duration: "6:15", color: "#EEF2FF" },
    { title: "Creating a Discipleship Pathway", duration: "8:47", color: "#F0FDF4" },
    { title: "Coaching Dashboard Walkthrough", duration: "5:20", color: "#FFF7ED" },
    { title: "Tracking Multiplication Metrics", duration: "7:03", color: "#FDF2F8" },
    { title: "Managing Multi-Site Networks", duration: "9:11", color: "#F5F3FF" },
  ];

  const docs = [
    { title: "Platform Overview", description: "Learn the core concepts behind Movemental's architecture." },
    { title: "Leader Roles & Permissions", description: "Configure access levels for coaches, facilitators, and admins." },
    { title: "Content Authoring Guide", description: "Best practices for creating training materials." },
    { title: "API Reference", description: "Integrate Movemental with your existing tools." },
    { title: "Data & Analytics", description: "Understanding your movement health dashboard." },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-mvmt-text-primary font-mvmt-heading">
          Learn Movemental
        </h1>
        <p className="text-base mb-10 text-mvmt-text-secondary">
          Video tutorials and documentation to help you get the most from the platform.
        </p>

        {/* Video grid */}
        <h2 className="text-lg font-bold mb-4 text-mvmt-text-primary">Video Tutorials</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {videos.map((video) => (
            <div key={video.title} className="rounded-lg overflow-hidden cursor-pointer group border border-mvmt-border-light">
              <div className="h-36 w-full relative" style={{ backgroundColor: video.color }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-mvmt-accent">
                    <div className="w-0 h-0 ml-1 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px]" style={{ borderLeftColor: "var(--mvmt-cta-text)" }} />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-medium rounded bg-mvmt-surface-dark/70 text-mvmt-on-dark-primary">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-mvmt-text-primary">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation list */}
        <h2 className="text-lg font-bold mb-4 text-mvmt-text-primary">Documentation</h2>
        <div className="divide-y divide-mvmt-border-light">
          {docs.map((doc) => (
            <div key={doc.title} className="flex items-center justify-between py-4 cursor-pointer group">
              <div>
                <h3 className="text-sm font-semibold mb-0.5 text-mvmt-text-primary">{doc.title}</h3>
                <p className="text-xs text-mvmt-text-secondary">{doc.description}</p>
              </div>
              <span className="text-lg flex-shrink-0 ml-4 text-mvmt-text-muted">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentVideoTutorials.displayName = "ContentVideoTutorials";
