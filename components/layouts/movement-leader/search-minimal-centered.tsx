"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchMinimalCenteredProps {
  className?: string;
}

export function SearchMinimalCentered({ className }: SearchMinimalCenteredProps) {
  const footerColumns = [
    { title: "Read", links: ["Discover", "Get the app", "Featured", "Movemental Reader", "Top podcasts"] },
    { title: "Writers", links: ["Switch to Movemental", "Get started", "Go paid"] },
    { title: "Company", links: ["About", "Help", "Jobs", "Blog"] },
    { title: "Resources", links: ["Resource center", "Guide to going paid", "Help center", "Community"] },
  ];

  return (
    <section className={cn("relative w-full flex flex-col bg-mvmt-surface-light", className)} >
      {/* Nav */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-3 border-b border-b-mvmt-border-light">
        <div className="flex items-center gap-6">
          <span className="text-lg font-bold text-mvmt-accent">M</span>
          {["Resources", "Creators", "Explore"].map((item) => (
            <span key={item} className="text-sm hidden sm:inline text-mvmt-text-secondary">{item} ∨</span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-mvmt-text-muted bg-mvmt-surface-light-muted"
          >
            🔍 Search Movemental...
          </div>
          <Link
            href="/signup"
            className="text-xs font-semibold px-4 py-2 rounded-full text-mvmt-cta-text bg-mvmt-accent"
          >
            Start publishing
          </Link>
          <span className="text-sm text-mvmt-text-primary">Sign in</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-light text-center mb-4 text-mvmt-text-primary font-mvmt-heading"
        >
          Find great things to read
        </h1>
        <p className="text-sm text-center mb-8 max-w-lg text-mvmt-text-secondary">
          Browse top publications, find writers you follow, or search by topic.
        </p>
        <div
          className="w-full max-w-lg flex items-center gap-3 px-4 py-3 rounded-lg mb-6 border border-mvmt-border-medium"
        >
          <span className="text-mvmt-text-muted">🔍</span>
          <input
            type="text"
            placeholder="Search for a publication or topic..."
            className="flex-1 text-sm outline-none text-mvmt-text-primary"
            style={{ backgroundColor: "transparent" }}
            readOnly
          />
        </div>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-mvmt-cta-text bg-mvmt-cta-bg"
        >
          🐦 Find writers I follow
        </Link>
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-12 lg:px-16 py-12 bg-mvmt-surface-light-muted border-t border-t-mvmt-border-light">
        <div className="flex items-start gap-12 max-w-4xl mx-auto">
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-mvmt-accent">M</span>
            <p className="text-xs mt-2 max-w-[10rem] text-mvmt-text-muted">
              Movemental is the home for great culture
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold mb-3 text-mvmt-text-primary">{col.title}</p>
              <div className="space-y-1.5">
                {col.links.map((link) => (
                  <p key={link} className="text-xs text-mvmt-text-secondary">{link}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

SearchMinimalCentered.displayName = "SearchMinimalCentered";
