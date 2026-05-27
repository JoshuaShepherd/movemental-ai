"use client";

import { cn } from "@/lib/utils";

interface SearchResultsListProps {
  className?: string;
}

const results = [
  {
    url: "movemental.com › resources › church-planting",
    title: "The Complete Guide to Church Planting Movements",
    description:
      "Discover the principles behind rapidly multiplying church planting movements. Brad Brisco and Neil Cole outline a comprehensive framework for launching and sustaining organic movements that transform communities.",
  },
  {
    url: "movemental.com › leaders › dave-ferguson",
    title: "Dave Ferguson on Multiplication Networks",
    description:
      "NewThing Network founder Dave Ferguson shares insights on building exponential multiplication into the DNA of every new church plant. Learn the hero-making principles that fuel movement growth.",
  },
  {
    url: "movemental.com › training › forge-intensive",
    title: "Forge Missional Training — Alan Hirsch's Approach",
    description:
      "Alan Hirsch's Forge network offers immersive missional training designed to equip leaders for apostolic movement. Explore cohort-based learning paths and field-tested frameworks for missional communities.",
  },
  {
    url: "movemental.com › articles › multiplication-culture",
    title: "Building a Culture of Multiplication with Mike Breen",
    description:
      "Mike Breen explains how V3 and Missio networks cultivate multiplication culture through discipleship rhythms, leadership pipelines, and reproducible systems that scale across diverse contexts.",
  },
];

const tabs = ["All", "Articles", "Videos", "Leaders", "Networks"];

const suggestions = [
  "missional communities",
  "church planting assessment",
  "Exponential conference",
  "discipleship movements",
];

export function SearchResultsList({ className }: SearchResultsListProps) {
  return (
    <div className={cn("bg-mvmt-surface-light min-h-[80vh]", className)}>
      {/* Top bar */}
      <div className="bg-mvmt-surface-light border-b border-mvmt-border-light px-6 py-4">
        {/* Search bar */}
        <div className="max-w-2xl rounded-full border border-mvmt-border-light px-5 py-2.5 flex items-center gap-3">
          <span className="text-mvmt-text-muted">🔍</span>
          <span className="text-mvmt-text-primary text-sm flex-1">
            church planting movements
          </span>
          <button className="text-mvmt-text-muted">✕</button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-6 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={cn(
                "text-sm pb-2",
                tab === "All"
                  ? "text-mvmt-accent border-b-2 border-mvmt-accent font-medium"
                  : "text-mvmt-text-secondary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main results */}
      <div className="max-w-2xl px-6 py-6">
        <p className="text-mvmt-text-muted text-xs mb-6">About 2,400 results</p>

        {results.map((result, i) => (
          <div key={i} className="mb-8">
            <p className="text-mvmt-text-muted text-xs">{result.url}</p>
            <h3 className="text-mvmt-accent text-lg cursor-pointer">{result.title}</h3>
            <p className="text-mvmt-text-secondary text-sm mt-1 leading-relaxed">
              {result.description}
            </p>
          </div>
        ))}

        {/* People also search for */}
        <div className="bg-mvmt-surface-light-muted rounded-lg p-4 mt-6 max-w-2xl">
          <h4 className="text-mvmt-text-primary text-sm font-semibold">
            People also search for
          </h4>
          <div className="flex flex-wrap gap-2 mt-3">
            {suggestions.map((s) => (
              <span
                key={s}
                className="border border-mvmt-border-light rounded-full px-3 py-1 text-sm text-mvmt-text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

SearchResultsList.displayName = "SearchResultsList";
