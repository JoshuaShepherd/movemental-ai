"use client";

import { cn } from "@/lib/utils";

interface ContentDarkPersonalizedProps {
  className?: string;
}

/**
 * Dark Personalized — MasterClass personalized recommendations + CTA
 * Dark bg, welcome, continue learning row, recommendations, CTA banner
 */
export function ContentDarkPersonalized({ className }: ContentDarkPersonalizedProps) {
  const continueItems = [
    { title: "Missional Community Foundations", progress: 65, lessons: "Lesson 7 of 10", color: "#1E293B" },
    { title: "The Art of Coaching", progress: 30, lessons: "Lesson 3 of 12", color: "#1E1B2E" },
  ];

  const recommended = [
    { title: "Incarnational Leadership with Brad Brisco", tag: "New", lessons: "12 lessons", color: "#1B2E1E" },
    { title: "Multiplication Masterclass", tag: "Popular", lessons: "8 lessons", color: "#2E1B2A" },
    { title: "Neighborhood Exegesis Workshop", tag: "Trending", lessons: "6 lessons", color: "#1B2A2E" },
    { title: "Movement Metrics That Matter", tag: "New", lessons: "10 lessons", color: "#2E2B1B" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Welcome */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Welcome back, Leader
        </h1>
        <p className="text-base mb-12" style={{ color: "var(--mvmt-on-dark-muted)" }}>
          Pick up where you left off or explore something new.
        </p>

        {/* Continue Learning */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--mvmt-on-dark-primary)" }}>Continue Learning</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {continueItems.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-xl p-4 cursor-pointer" style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}>
              <div className="w-28 h-20 rounded-lg flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold mb-1 truncate" style={{ color: "var(--mvmt-on-dark-primary)" }}>{item.title}</h3>
                <p className="text-xs mb-3" style={{ color: "var(--mvmt-on-dark-muted)" }}>{item.lessons}</p>
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <div className="h-full rounded-full" style={{ width: `${item.progress}%`, backgroundColor: "var(--mvmt-accent)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--mvmt-on-dark-primary)" }}>Recommended For You</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {recommended.map((item) => (
            <div key={item.title} className="rounded-xl overflow-hidden cursor-pointer" style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}>
              <div className="h-36 w-full relative" style={{ backgroundColor: item.color }}>
                <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-bold rounded" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
                  {item.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1" style={{ color: "var(--mvmt-on-dark-primary)" }}>{item.title}</h3>
                <p className="text-xs" style={{ color: "var(--mvmt-on-dark-muted)" }}>{item.lessons}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Unlock the full movement library
          </h2>
          <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
            Get unlimited access to every class, resource, and coaching tool on the platform.
          </p>
          <button className="px-8 py-3 text-sm font-bold rounded-full" style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}>
            Get Full Access
          </button>
        </div>
      </div>
    </section>
  );
}

ContentDarkPersonalized.displayName = "ContentDarkPersonalized";
