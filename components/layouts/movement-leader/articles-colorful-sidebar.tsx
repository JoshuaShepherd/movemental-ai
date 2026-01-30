"use client";

import { cn } from "@/lib/utils";

interface ArticlesColorfulSidebarProps {
  className?: string;
}

/**
 * Colorful Sidebar Article — Gamma Support-style layout (ref-colorful-sidebar)
 * Gradient hero, breadcrumbs, author row, card grid, right sidebar with related articles
 */
export function ArticlesColorfulSidebar({ className }: ArticlesColorfulSidebarProps) {
  const platformCards = [
    { title: "Browser extension", items: ["Chrome", "Firefox", "Edge", "Safari"] },
    { title: "Desktop app", items: ["macOS", "Windows", "Linux"] },
    { title: "Mobile app", items: ["iOS 16+", "Android 12+"] },
  ];

  const relatedArticles = [
    "How do I invite coaches to my network?",
    "Setting up missional community cohorts",
    "Configuring your multiplication dashboard",
    "Importing existing leader rosters",
    "Connecting Movemental to your church CRM",
    "Understanding the apprentice pathway",
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      {/* Gradient hero banner */}
      <div
        className="h-48 w-full rounded-b-xl bg-mvmt-gradient-hero-brand"
      />

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumbs */}
            <div className="mb-4">
              <p className="text-sm text-mvmt-text-secondary">
                <span>Movemental Support</span>
                <span className="mx-2">&gt;</span>
                <span>Knowledge Base</span>
                <span className="mx-2">&gt;</span>
                <span>Setup</span>
              </p>
            </div>

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading"
            >
              How do I set up my leader profile on Movemental?
            </h1>

            {/* Author row */}
            <div className="mt-5 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 bg-mvmt-gradient-hero-brand"
              />
              <div>
                <p className="text-sm font-medium text-mvmt-text-primary">Cassie</p>
                <p className="text-xs text-mvmt-text-secondary">Updated 21 days ago</p>
              </div>
            </div>

            {/* Article body */}
            <div className="mt-8 space-y-5 text-base leading-relaxed text-mvmt-text-secondary">
              <p>
                Your leader profile is the foundation of everything you do on Movemental.
                It tells your network who you are, what movement context you operate in,
                and how coaches and apprentices can connect with you. Whether you are
                planting a church with NewThing, running a Forge hub, or leading missional
                communities inspired by the work of Alan Hirsch, your profile helps the
                platform serve you better.
              </p>
              <p>
                To get started, navigate to your dashboard and select &ldquo;Profile
                Setup&rdquo; from the left menu. You will be guided through four steps:
                personal details, organization affiliation, coaching preferences, and
                content visibility. Brad Brisco recommends that leaders think of their
                profile not as a resume but as a missional posture statement — what is God
                doing in your neighborhood, and how are you joining in?
              </p>
              <p>
                Once your profile is complete, you can access Movemental from any device.
                Below are the platforms we currently support.
              </p>
            </div>

            {/* Platform cards */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {platformCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg border p-5 bg-mvmt-surface-light"
                  style={{ borderColor: "var(--mvmt-border-light)" }}
                >
                  <h3 className="text-sm font-bold mb-2 text-mvmt-text-primary">
                    {card.title}
                  </h3>
                  <ul className="space-y-1">
                    {card.items.map((item) => (
                      <li key={item} className="text-sm text-mvmt-text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Help badge */}
            <div className="mt-10 mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-mvmt-accent"
                style={{ backgroundColor: "var(--mvmt-accent-muted)" }}
              >
                Help
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="w-64 flex-shrink-0 pt-4 hidden lg:block">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: "var(--mvmt-text-tertiary)" }}
            >
              Articles in this section
            </p>
            <nav className="space-y-3">
              {relatedArticles.map((title) => (
                <a
                  key={title}
                  href="#"
                  className="flex items-start gap-2 text-sm leading-snug text-mvmt-text-secondary"
                >
                  <span className="flex-shrink-0">📄</span>
                  <span>{title}</span>
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </section>
  );
}

ArticlesColorfulSidebar.displayName = "ArticlesColorfulSidebar";
