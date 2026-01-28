"use client";

import { cn } from "@/lib/utils";

interface ContentDocsGridProps {
  className?: string;
}

/**
 * Docs Grid — WorkOS-style icon + title + description grid
 * Minimal bg, clean grid of doc items with icon, title, description
 */
export function ContentDocsGrid({ className }: ContentDocsGridProps) {
  const docs = [
    { icon: "📖", title: "Introduction", description: "Overview of Movemental's platform architecture and core concepts." },
    { icon: "🚀", title: "Quick Start", description: "Get your first community set up in under 10 minutes." },
    { icon: "👥", title: "User Management", description: "Roles, permissions, and multi-tenant organization structure." },
    { icon: "📝", title: "Content Authoring", description: "Create courses, articles, and training pathways." },
    { icon: "📊", title: "Analytics & Reporting", description: "Dashboard metrics, exports, and health indicators." },
    { icon: "🔗", title: "Integrations", description: "Connect Planning Center, Zoom, Slack, and more." },
    { icon: "🛡️", title: "Authentication", description: "SSO, OAuth, and session management configuration." },
    { icon: "⚙️", title: "API Reference", description: "REST endpoints, webhooks, and rate limiting." },
    { icon: "🎨", title: "Theming", description: "Customize colors, fonts, and branding for your network." },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Documentation
        </h1>
        <p className="text-base mb-12" style={{ color: "var(--mvmt-text-secondary)" }}>
          Guides and references for building on the Movemental platform.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <div
              key={doc.title}
              className="flex gap-4 p-5 rounded-xl cursor-pointer transition-colors"
              style={{ border: "1px solid var(--mvmt-border-light)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--mvmt-surface-light-muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span className="text-2xl flex-shrink-0">{doc.icon}</span>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: "var(--mvmt-text-primary)" }}>{doc.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>{doc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentDocsGrid.displayName = "ContentDocsGrid";
