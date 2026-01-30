"use client";

import { cn } from "@/lib/utils";

interface SearchFacetedFiltersProps {
  className?: string;
}

const categories = ["Church Planting", "Discipleship", "Leadership", "Multiplication", "Missional Living"];
const networks = ["Exponential", "Forge", "NewThing", "V3", "Missio"];
const contentTypes = ["Articles", "Videos", "Podcasts", "Books"];

const results = [
  {
    title: "5 Principles of Movement Leadership",
    breadcrumb: "exponential.org › articles › leadership",
    description: "Brad Brisco explores the core principles that define effective movement leadership and how to cultivate them within your network.",
    tags: ["Leadership", "Exponential"],
  },
  {
    title: "Discipleship Pathways for Church Planters",
    breadcrumb: "forgemissiontraining.com › resources › discipleship",
    description: "Alan Hirsch outlines a practical framework for integrating discipleship into every stage of the church planting journey.",
    tags: ["Discipleship", "Forge"],
  },
  {
    title: "Multiplication Movements in Practice",
    breadcrumb: "newthing.org › case-studies › multiplication",
    description: "Dave Ferguson shares real-world case studies of multiplication movements and the strategies that fueled their growth.",
    tags: ["Multiplication", "NewThing"],
  },
  {
    title: "Organic Church Planting Models",
    breadcrumb: "v3movement.org › guides › planting",
    description: "Neil Cole presents organic approaches to church planting that prioritize simplicity, reproducibility, and missional living.",
    tags: ["Church Planting", "V3"],
  },
];

export function SearchFacetedFilters({ className }: SearchFacetedFiltersProps) {
  return (
    <section className={cn("bg-mvmt-surface-light min-h-[80vh] px-6 py-10", className)}>
      {/* Search Bar */}
      <div className="w-full rounded-lg border border-mvmt-border-light bg-mvmt-surface-light px-4 py-3 flex items-center gap-3">
        <span>🔍</span>
        <span className="text-mvmt-text-muted text-sm">Search resources, leaders, topics...</span>
      </div>

      <p className="text-mvmt-text-secondary text-sm mt-4">128 results found</p>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 mt-6">
        {/* Sidebar */}
        <aside className="bg-mvmt-surface-light-muted rounded-lg p-5">
          {/* Category */}
          <h3 className="text-mvmt-text-primary text-sm font-semibold mb-3">Category</h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat, i) => (
              <label key={cat} className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-4 h-4 rounded border border-mvmt-border-light",
                    i < 2 && "bg-mvmt-accent"
                  )}
                />
                <span className="text-mvmt-text-primary text-sm">{cat}</span>
              </label>
            ))}
          </div>

          <div className="h-px bg-mvmt-border-light my-4" />

          {/* Network */}
          <h3 className="text-mvmt-text-primary text-sm font-semibold mb-3">Network</h3>
          <div className="flex flex-col gap-2">
            {networks.map((net) => (
              <label key={net} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-mvmt-border-light" />
                <span className="text-mvmt-text-primary text-sm">{net}</span>
              </label>
            ))}
          </div>

          <div className="h-px bg-mvmt-border-light my-4" />

          {/* Content Type */}
          <h3 className="text-mvmt-text-primary text-sm font-semibold mb-3">Content Type</h3>
          <div className="flex flex-col gap-2">
            {contentTypes.map((ct) => (
              <label key={ct} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-mvmt-border-light" />
                <span className="text-mvmt-text-primary text-sm">{ct}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {results.map((r) => (
            <div
              key={r.title}
              className="bg-mvmt-surface-light border border-mvmt-border-light rounded-lg p-4"
            >
              <h4 className="text-mvmt-accent text-base font-medium">{r.title}</h4>
              <span className="text-mvmt-text-muted text-xs">{r.breadcrumb}</span>
              <p className="text-mvmt-text-secondary text-sm mt-1">{r.description}</p>
              <div className="flex gap-2 mt-2">
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-mvmt-surface-light-muted text-mvmt-text-secondary text-xs rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

SearchFacetedFilters.displayName = "SearchFacetedFilters";
