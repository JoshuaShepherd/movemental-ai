"use client";

import { cn } from "@/lib/utils";

interface ArticlesGuideHeroProps {
  className?: string;
}

/**
 * Guide Hero Article — Monarch style (ref-03)
 * Social share column, colored hero banner with CTA, two-column article body with TOC sidebar
 */
export function ArticlesGuideHero({ className }: ArticlesGuideHeroProps) {
  const tocLinks = [
    "Define your mission focus",
    "Gather your core team",
    "Establish shared rhythms",
    "Launch and iterate",
  ];

  const socialIcons = ["share", "twitter", "linkedin", "link"];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[48px_1fr] gap-6">
          {/* Social Share Column */}
          <div className="hidden lg:flex flex-col items-center gap-3 pt-8">
            {socialIcons.map((icon) => (
              <div
                key={icon}
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer transition-colors bg-mvmt-surface-raised text-mvmt-text-tertiary"
                style={{ border: "1px solid var(--mvmt-border-default)" }}
              >
                {icon.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div>
            {/* Hero Banner */}
            <div
              className="rounded-2xl overflow-hidden mb-12 bg-mvmt-gradient-hero-brand"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                <div>
                  <h1
                    className="text-3xl sm:text-4xl font-bold leading-tight mb-4 text-mvmt-on-dark-primary font-mvmt-heading"
                  >
                    Gain Total Clarity on Your Mission
                  </h1>
                  <p className="text-base mb-6 text-mvmt-on-dark-secondary">
                    A step-by-step guide to launching and leading missional communities that
                    multiply healthy leaders and transform neighborhoods.
                  </p>
                  <a
                    href="#"
                    className="inline-block px-6 py-3 text-sm font-semibold rounded-lg transition-colors text-mvmt-on-dark-primary bg-mvmt-accent-primary"
                    
                  >
                    Sign up now
                  </a>
                </div>
                {/* App Screenshot Placeholder */}
                <div
                  className="rounded-xl h-56 md:h-64"
                  style={{
                    background: "linear-gradient(135deg, var(--mvmt-surface-raised), var(--mvmt-surface-light))",
                    border: "1px solid var(--mvmt-border-default)",
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>

            {/* Two-column Article Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
              {/* Left TOC Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-8">
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-4 text-mvmt-text-tertiary"
                    
                  >
                    Table of Contents
                  </h4>
                  <ul className="space-y-3">
                    {tocLinks.map((link, i) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm transition-colors hover:opacity-80 text-mvmt-text-secondary"
                        >
                          {i + 1}. {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Article Content */}
              <article className="space-y-6 text-base leading-relaxed text-mvmt-text-primary">
                <h2
                  className="text-2xl font-semibold text-mvmt-text-primary font-mvmt-heading"
                >
                  How to launch a missional community
                </h2>
                <p>
                  Launching a missional community begins with discerning who God has placed on your heart.
                  Whether it is a neighborhood, an affinity group, or a vocational network, your mission
                  focus will shape every decision that follows.
                </p>

                <h3
                  className="text-xl font-semibold pt-2 text-mvmt-text-primary font-mvmt-heading"
                >
                  1. Define your mission focus
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-mvmt-text-secondary">
                  <li>Identify the people group or place you feel called to</li>
                  <li>Research the existing needs and assets in that context</li>
                  <li>Write a one-sentence mission statement for your community</li>
                  <li>Share it with two trusted mentors for feedback</li>
                </ul>

                {/* Callout Box */}
                <div
                  className="rounded-lg p-5 my-6 bg-mvmt-surface-raised"
                  style={{ border: "1px solid var(--mvmt-border-default)" }}
                >
                  <p className="text-sm font-semibold mb-2 text-mvmt-accent-primary" >
                    Formula for Mission Clarity
                  </p>
                  <p className="text-sm text-mvmt-text-secondary">
                    Calling (who you are) + Context (where you are) + Community (who is with you) = Mission Focus
                  </p>
                </div>

                <h3
                  className="text-xl font-semibold pt-2 text-mvmt-text-primary font-mvmt-heading"
                >
                  2. Gather your core team
                </h3>
                <p>
                  No missional community thrives on a solo leader. Identify 3-5 people who share your
                  passion for the mission focus and invite them into a season of prayer, planning, and
                  shared meals before you launch publicly.
                </p>

                <h3
                  className="text-xl font-semibold pt-2 text-mvmt-text-primary font-mvmt-heading"
                >
                  3. Establish shared rhythms
                </h3>
                <p>
                  Design a weekly and monthly rhythm that balances UP (worship and prayer), IN (community
                  and discipleship), and OUT (mission and service). These rhythms become the DNA of your
                  community and the framework for reproducing it.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ArticlesGuideHero.displayName = "ArticlesGuideHero";
