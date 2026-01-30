"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ContentCategoryBlogProps {
  className?: string;
}

/**
 * Category Blog — NordVPN-style category pills + article grid with author
 * Light bg, large heading, category filter pills, article cards with author row
 */
export function ContentCategoryBlog({ className }: ContentCategoryBlogProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Formation", "Strategy", "Stories", "Tools"];

  const articles = [
    { category: "Formation", title: "Why Every Movement Needs a Rule of Life", excerpt: "Ancient monastic wisdom meets modern missional practice in this guide to communal spiritual formation.", author: "Brad Brisco", date: "Apr 18, 2024", color: "#E0E7FF" },
    { category: "Strategy", title: "Mapping Your Multiplication Pathway", excerpt: "A practical framework for setting 1-year, 3-year, and 10-year multiplication goals for your network.", author: "Dave Ferguson", date: "Apr 10, 2024", color: "#DBEAFE" },
    { category: "Stories", title: "From Garage to Global: One Community's Journey", excerpt: "How a small missional community in Denver became a network of 47 communities across three states.", author: "Kara Powell", date: "Mar 29, 2024", color: "#FCE7F3" },
    { category: "Tools", title: "5 Coaching Questions That Unlock Growth", excerpt: "The questions great movement coaches ask — and the ones they avoid — during one-on-one sessions.", author: "Alan Hirsch", date: "Mar 15, 2024", color: "#E0F2FE" },
    { category: "Formation", title: "Sabbath as Resistance for Activist Leaders", excerpt: "Why the most productive thing a movement leader can do is stop producing.", author: "Rich Villodas", date: "Mar 1, 2024", color: "#F0FDF4" },
    { category: "Strategy", title: "The Economics of Generosity-Funded Movements", excerpt: "How movements that reject the scarcity mindset end up with more resources, not fewer.", author: "Todd Wilson", date: "Feb 20, 2024", color: "#FFF7ED" },
  ];

  const filtered = activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-mvmt-text-primary font-mvmt-heading">
          Movement Blog
        </h1>
        <p className="text-lg mb-8 text-mvmt-text-secondary">
          Insights, stories, and strategies for leaders on mission.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
              style={{
                backgroundColor: activeCategory === cat ? "var(--mvmt-accent)" : "transparent",
                color: activeCategory === cat ? "var(--mvmt-cta-text)" : "var(--mvmt-text-secondary)",
                border: activeCategory === cat ? "none" : "1px solid var(--mvmt-border-light)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <div key={article.title} className="group cursor-pointer">
              <div className="h-48 w-full rounded-xl mb-4" style={{ backgroundColor: article.color }} />
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 text-mvmt-accent bg-mvmt-surface-light-muted">
                {article.category}
              </span>
              <h3 className="text-xl font-bold mb-2 leading-snug text-mvmt-text-primary">{article.title}</h3>
              <p className="text-sm leading-relaxed mb-4 text-mvmt-text-secondary">{article.excerpt}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: article.color }} />
                <div>
                  <p className="text-sm font-medium text-mvmt-text-primary">{article.author}</p>
                  <p className="text-xs text-mvmt-text-muted">{article.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentCategoryBlog.displayName = "ContentCategoryBlog";
