"use client";

import { useState } from "react";
import Link from "next/link";

const SIDEBAR_CATEGORIES = [
  { id: "featured", label: "Featured", icon: "★", count: 105, active: true },
  { id: "new", label: "New", icon: "🚀", count: 60 },
  { id: "free", label: "Free", icon: "❤", count: 186 },
  { id: "saas", label: "SaaS", icon: "▤", count: 194 },
  { id: "agency", label: "Agency", icon: "◆", count: 610 },
  { id: "blog", label: "Blog", icon: "◇", count: 312 },
  { id: "3d", label: "3D", icon: "◈", count: 88 },
  { id: "ai", label: "Artificial intelligence", icon: "◉", count: 42 },
  { id: "brand", label: "Brand Guidelines", icon: "◎", count: 156 },
  { id: "business", label: "Business", icon: "●", count: 420 },
  { id: "changelog", label: "Changelog", icon: "○", count: 28 },
  { id: "docs", label: "Documentation", icon: "▪", count: 95 },
  { id: "ecommerce", label: "Ecommerce", icon: "▴", count: 203 },
  { id: "entertainment", label: "Entertainment", icon: "▾", count: 67 },
  { id: "health", label: "Health", icon: "▸", count: 54 },
];

const TEMPLATES = [
  {
    id: "1",
    title: "Flux",
    creator: "Samar Jamil",
    price: "Free",
    free: true,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Jules Journey",
    creator: "Designed By Paul",
    price: "$69",
    free: false,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Rocketsales",
    creator: "Andrea Montini",
    price: "Free",
    free: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Pavyon",
    creator: "Ucas Templates",
    price: "$69",
    free: false,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "TrinityFinancial",
    creator: "Sohil Jain",
    price: "$20",
    free: false,
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "OSCAR",
    creator: "Template Co",
    price: "$49",
    free: false,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Business & Corporate",
    creator: "Studio Nine",
    price: "Free",
    free: true,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    title: "NOLAN / MITCHELL",
    creator: "Design Studio",
    price: "$69",
    free: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "9",
    title: "Nature Hub",
    creator: "Eco Templates",
    price: "$39",
    free: false,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
  },
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
            The best templates hand-picked by the team.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {/* Movement leader template — shareable, not in main nav */}
            <Link
              href="/templates/dave-ferguson"
              className="group block rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-white/10">
                <img
                  src="/dave-ferguson/logo.webp"
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
            {TEMPLATES.map((template) => (
              <article
                key={template.id}
                className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-white/10">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white">{template.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{template.creator}</p>
                  <p className="mt-2">
                    {template.free ? (
                      <span className="text-sm font-medium text-[#007AFF]">Free</span>
                    ) : (
                      <span className="text-sm font-medium text-white">{template.price}</span>
                    )}
                  </p>
                </div>
              </article>
            ))}
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
