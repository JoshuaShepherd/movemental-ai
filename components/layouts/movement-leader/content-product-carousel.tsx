"use client";

import { cn } from "@/lib/utils";

interface ContentProductCarouselProps {
  className?: string;
}

/**
 * Product Carousel — Apple-style horizontal product cards with images
 * Light bg, heading, horizontal scrolling row of large feature cards
 */
export function ContentProductCarousel({ className }: ContentProductCarouselProps) {
  const products = [
    { title: "Movement Catalyst Kit", subtitle: "Everything a new leader needs", description: "Pre-built templates, coaching guides, and community formation playbooks to launch your movement.", color: "#F1F5F9" },
    { title: "Network Command Center", subtitle: "See the whole picture", description: "Real-time dashboards showing multiplication metrics, leader health, and community engagement across your network.", color: "#EEF2FF" },
    { title: "Formation Studio", subtitle: "Content that transforms", description: "Author and deliver multi-format discipleship content with built-in assessment and progress tracking.", color: "#F0FDF4" },
    { title: "Coaching Hub", subtitle: "Structured yet organic", description: "Schedule sessions, use hero-maker question frameworks, record notes, and track leader development milestones.", color: "#FFF7ED" },
    { title: "Sending Pipeline", subtitle: "Celebrate the release", description: "Track leaders from apprentice to sent. Built-in commissioning workflows and ongoing connection tools.", color: "#FDF2F8" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--mvmt-accent)" }}>
            Platform
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Tools for every stage of the journey
          </h1>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {products.map((product) => (
            <div
              key={product.title}
              className="flex-shrink-0 w-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}
            >
              <div className="h-52 w-full" style={{ backgroundColor: product.color }} />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--mvmt-accent)" }}>{product.subtitle}</p>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--mvmt-text-primary)" }}>{product.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentProductCarousel.displayName = "ContentProductCarousel";
