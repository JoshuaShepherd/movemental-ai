"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ContentComponentGalleryProps {
  className?: string;
}

/**
 * Component Gallery — Framer-style sidebar nav + preview grid
 * Minimal bg, left sidebar categories, right preview card grid
 */
export function ContentComponentGallery({ className }: ContentComponentGalleryProps) {
  const [activeSection, setActiveSection] = useState("All");
  const sections = ["All", "Heroes", "Features", "Testimonials", "CTAs", "Footers"];

  const components = [
    { name: "Mission Hero", section: "Heroes", description: "Full-width hero with movement tagline and CTA", colorVar: "--mvmt-card-decorative-1" },
    { name: "Leader Spotlight", section: "Heroes", description: "Split layout with leader photo and bio", colorVar: "--mvmt-card-decorative-2" },
    { name: "Impact Metrics", section: "Features", description: "3-column stat cards with icons", colorVar: "--mvmt-card-decorative-4" },
    { name: "Pathway Steps", section: "Features", description: "Horizontal stepper for discipleship journey", colorVar: "--mvmt-card-decorative-5" },
    { name: "Community Voices", section: "Testimonials", description: "Carousel of testimonial cards", colorVar: "--mvmt-card-decorative-3" },
    { name: "Leader Quote", section: "Testimonials", description: "Large pull-quote with attribution", colorVar: "--mvmt-card-decorative-2" },
    { name: "Join the Movement", section: "CTAs", description: "Bold CTA banner with email capture", colorVar: "--mvmt-card-decorative-4" },
    { name: "Start Your Journey", section: "CTAs", description: "Two-column CTA with image", colorVar: "--mvmt-card-decorative-5" },
    { name: "Movement Footer", section: "Footers", description: "Multi-column footer with social links", colorVar: "--mvmt-card-decorative-1" },
  ];

  const filtered = activeSection === "All" ? components : components.filter((c) => c.section === activeSection);

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="max-w-7xl mx-auto px-6 py-16 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-mvmt-text-muted">
            Components
          </p>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn("block w-full text-left px-3 py-2 text-sm rounded-md transition-colors")}
                style={{
                  backgroundColor: activeSection === section ? "var(--mvmt-surface-light-muted)" : "transparent",
                  color: activeSection === section ? "var(--mvmt-text-primary)" : "var(--mvmt-text-secondary)",
                  fontWeight: activeSection === section ? 600 : 400,
                }}
              >
                {section}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-mvmt-text-primary font-mvmt-heading">
            Component Gallery
          </h1>
          <p className="text-base mb-8 text-mvmt-text-secondary">
            Pre-built sections for your movement site. Click to preview.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((comp) => (
              <div key={comp.name} className="rounded-lg overflow-hidden cursor-pointer group border border-mvmt-border-light">
                <div className="h-36 w-full" style={{ backgroundColor: `var(${comp.colorVar})` }} />
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1 text-mvmt-text-primary">{comp.name}</h3>
                  <p className="text-xs text-mvmt-text-secondary">{comp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

ContentComponentGallery.displayName = "ContentComponentGallery";
