"use client";

import { cn } from "@/lib/utils";

interface SearchDiscoveryGridProps {
  className?: string;
}

const categories = [
  "Church Planting",
  "Discipleship",
  "Leadership Development",
  "Multiplication",
  "Missional Living",
  "Movement Strategy",
  "Team Building",
  "Network Growth",
];

const madeForYou = [
  { title: "Planting Essentials", subtitle: "Curated by Dave Ferguson · NewThing" },
  { title: "Missional DNA", subtitle: "Curated by Alan Hirsch · Forge" },
  { title: "Organic Growth", subtitle: "Curated by Neil Cole · Missio" },
  { title: "Leadership Pipeline", subtitle: "Curated by Mike Breen · V3" },
];

export function SearchDiscoveryGrid({ className }: SearchDiscoveryGridProps) {
  return (
    <section className={cn("bg-mvmt-surface-dark min-h-[80vh] px-6 py-12", className)}>
      {/* Search Bar */}
      <div className="max-w-lg mx-auto rounded-full bg-mvmt-surface-dark-elevated px-5 py-3 flex items-center gap-3">
        <span className="text-mvmt-on-dark-muted">🔍</span>
        <span className="text-mvmt-on-dark-muted text-sm">What do you want to explore?</span>
      </div>

      {/* Browse All */}
      <h2 className="text-mvmt-on-dark-primary text-2xl font-bold mt-10 mb-6">Browse All</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="rounded-lg p-5 min-h-[120px] relative overflow-hidden cursor-pointer bg-mvmt-surface-dark-elevated"
          >
            <span className="text-mvmt-on-dark-primary text-lg font-bold relative z-10">
              {cat}
            </span>
            <span className="absolute w-20 h-20 rounded-full bg-mvmt-accent opacity-20 -bottom-4 -right-4" />
          </div>
        ))}
      </div>

      {/* Made for You */}
      <h2 className="text-mvmt-on-dark-primary text-xl font-bold mt-10 mb-4">Made for You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {madeForYou.map((item) => (
          <div key={item.title} className="bg-mvmt-surface-dark-elevated rounded-lg p-4">
            <h3 className="text-mvmt-on-dark-primary text-sm font-medium">{item.title}</h3>
            <p className="text-mvmt-on-dark-secondary text-xs mt-1">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

SearchDiscoveryGrid.displayName = "SearchDiscoveryGrid";
