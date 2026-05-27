"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LIBRARY_MANIFEST_URL = "/templates/library/templates-manifest.json";

type TemplatePage = { label: string; href: string };
type LibraryTemplate = {
  id: string;
  name: string;
  description: string;
  pages: TemplatePage[];
};
type LibraryManifest = {
  title?: string;
  subtitle?: string;
  templates: LibraryTemplate[];
};

const SIDEBAR_CATEGORIES = [
  { id: "featured", label: "Featured", icon: "★", count: 0, active: true },
  { id: "design-library", label: "Design prototypes", icon: "◆", count: 0, active: false },
];

const NAV_LINKS = [
  "Features",
  "Resources",
  "Support",
  "Updates",
  "Enterprise",
  "Pricing",
];

export function TemplatesDashboardClient() {
  const [activeCategory, setActiveCategory] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [libraryManifest, setLibraryManifest] = useState<LibraryManifest | null>(null);
  const [libraryError, setLibraryError] = useState<string | null>(null);

  useEffect(() => {
    fetch(LIBRARY_MANIFEST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: LibraryManifest) => setLibraryManifest(data))
      .catch((err) => setLibraryError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  const libraryTemplates = libraryManifest?.templates ?? [];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80">
        <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-white text-black text-sm font-bold">M</span>
            Movemental
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-1 text-sm text-white/90 transition hover:text-white"
              >
                {label}
                {["Features", "Resources", "Support"].includes(label) && (
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-sm text-white/90 hover:text-white">
              Contact Sales
            </Link>
            <Link href="/sign-in" className="text-sm text-white/90 hover:text-white">
              Login
            </Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-[#007AFF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0066CC]"
            >
              Start for free
            </Link>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1800px] mx-auto">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col border-r border-white/10 py-6 pl-6 pr-4 lg:flex">
          <div className="relative mb-6">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Q Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
            />
          </div>
          <nav className="flex flex-col gap-0.5">
            {SIDEBAR_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isActive
                      ? "bg-[#007AFF]/20 text-white"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base opacity-90">{cat.icon}</span>
                  <span className="flex-1 truncate">{cat.label}</span>
                  <span className={`text-xs tabular-nums ${isActive ? "text-white" : "text-white/50"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:pl-8">
          <p className="mb-2 text-xs text-white/50">
            Templates &gt; Featured
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Featured Website Templates
          </h1>
          <p className="mt-2 text-base text-white/60">
            {libraryManifest?.subtitle ?? "The best templates hand-picked by the team."}
          </p>
          {libraryError && (
            <p className="mt-4 text-sm text-amber-400">
              Template library not loaded ({libraryError}). Run <code className="rounded bg-white/10 px-1">npm run template:sync-library</code> to copy design prototypes.
            </p>
          )}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {/* Open full library (HTML launcher) */}
            <Link
              href="/templates/library"
              className="group block rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-[#007AFF]/20 to-[#5856D6]/20">
                <span className="text-4xl text-white/80">◇</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">Design library (all modes)</h3>
                <p className="mt-1 text-sm text-white/50">Open the full HTML launcher</p>
                <p className="mt-2">
                  <span className="text-sm font-medium text-[#007AFF]">Open library</span>
                </p>
              </div>
            </Link>
            {/* Dave Ferguson — standalone template */}
            <Link
              href="/templates/dave-ferguson"
              className="group block rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-white/10">
                <img
                  src="/media-library/images/headshots/dave-ferguson/logo.webp"
                  alt="Dave Ferguson template preview"
                  className="h-full w-full object-cover object-center transition group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">Dave Ferguson</h3>
                <p className="mt-1 text-sm text-white/50">Movemental</p>
                <p className="mt-2">
                  <span className="text-sm font-medium text-[#007AFF]">Template</span>
                </p>
              </div>
            </Link>
            {/* Design-mode prototypes from manifest */}
            {libraryTemplates.map((template) => {
              const href = `/templates/library/${template.id}/`;
              return (
                <Link
                  key={template.id}
                  href={href}
                  className="group block rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-t-xl bg-white/10">
                    <span className="text-3xl text-white/60">◆</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white">{template.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/50">{template.description}</p>
                    <p className="mt-2">
                      <span className="text-sm font-medium text-[#007AFF]">
                        {template.pages.length} pages
                      </span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] py-6">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-black text-xs font-bold">M</span>
            Movemental
          </Link>
          <p className="text-sm text-white/50">
            curated by <span className="font-medium text-white/70">Mobbin</span>
          </p>
        </div>
      </footer>
    </>
  );
}
