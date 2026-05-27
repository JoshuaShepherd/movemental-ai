"use client";

import { cn } from "@/lib/utils";

interface ContentDarkBrowseProps {
  className?: string;
}

/**
 * Dark Browse — MasterClass category browse with carousel
 * Dark bg, large heading, horizontal category cards, content row
 */
export function ContentDarkBrowse({ className }: ContentDarkBrowseProps) {
  const categories = [
    { name: "Missional Living", count: 24, color: "#7C3AED" },
    { name: "Church Planting", count: 18, color: "#2563EB" },
    { name: "Leadership", count: 31, color: "#059669" },
    { name: "Discipleship", count: 27, color: "#D97706" },
    { name: "Multiplication", count: 15, color: "#DC2626" },
    { name: "Community Formation", count: 12, color: "#7C3AED" },
  ];

  const featured = [
    { title: "Alan Hirsch Teaches Missional Leadership", subtitle: "12 lessons • 4.5 hours", color: "#1E293B" },
    { title: "Dave Ferguson on Hero Making", subtitle: "8 lessons • 3 hours", color: "#1E1B2E" },
    { title: "Brad Brisco: The Missional Posture", subtitle: "10 lessons • 3.5 hours", color: "#1B2E1E" },
    { title: "Kara Powell: Faith Beyond Youth Group", subtitle: "9 lessons • 2.5 hours", color: "#2E1B1B" },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark", className)} >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-mvmt-on-dark-primary font-mvmt-heading">
          Browse by Category
        </h1>
        <p className="text-lg mb-10 text-mvmt-on-dark-secondary">
          Explore world-class training from movement leaders.
        </p>

        {/* Category cards - horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-12 scrollbar-hide">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex-shrink-0 w-48 h-28 rounded-xl flex flex-col justify-end p-4 cursor-pointer"
              style={{ backgroundColor: cat.color }}
            >
              <p className="text-sm font-bold text-mvmt-on-dark-primary">{cat.name}</p>
              <p className="text-xs text-mvmt-on-dark-muted">{cat.count} classes</p>
            </div>
          ))}
        </div>

        {/* Featured row */}
        <h2 className="text-xl font-bold mb-6 text-mvmt-on-dark-primary">Featured Classes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((item) => (
            <div key={item.title} className="rounded-xl overflow-hidden cursor-pointer bg-mvmt-surface-dark-elevated">
              <div className="h-40 w-full" style={{ backgroundColor: item.color }} />
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1 text-mvmt-on-dark-primary">{item.title}</h3>
                <p className="text-xs text-mvmt-on-dark-muted">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentDarkBrowse.displayName = "ContentDarkBrowse";
