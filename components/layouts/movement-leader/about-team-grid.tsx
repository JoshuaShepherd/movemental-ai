"use client";

import { cn } from "@/lib/utils";

interface AboutTeamGridProps {
  className?: string;
}

const teamMembers = [
  { initials: "BB", name: "Brad Brisco", role: "Founder & Lead Catalyst", bio: "Movement catalyst helping launch missional communities across six continents." },
  { initials: "JH", name: "Jessica Harper", role: "Director of Strategy", bio: "Strategist with 15 years experience scaling faith-based organizations globally." },
  { initials: "MK", name: "Marcus Kim", role: "Head of Content", bio: "Former journalist and editor shaping the narrative of modern church planting." },
  { initials: "SL", name: "Sarah Lawson", role: "Community Lead", bio: "Building bridges between movement leaders and the communities they serve." },
  { initials: "DN", name: "David Nguyen", role: "Technology Director", bio: "Engineer and architect building the platforms that power movement work." },
  { initials: "RP", name: "Rachel Patel", role: "Research Lead", bio: "PhD researcher studying the dynamics of multiplication movements worldwide." },
];

const values = [
  { title: "Multiplication", description: "We believe in movements that multiply — leaders raising leaders, communities birthing communities." },
  { title: "Incarnational", description: "Presence matters. We go to where people are rather than waiting for them to come to us." },
  { title: "Collaboration", description: "No lone rangers. We build networks of practitioners who learn from and support each other." },
  { title: "Integrity", description: "Transparent practices, honest metrics, and accountable leadership at every level." },
];

export function AboutTeamGrid({ className }: AboutTeamGridProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Hero */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 text-center bg-[var(--mvmt-surface-light)]">
        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[var(--mvmt-accent)]">
          About Us
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto text-[var(--mvmt-text-primary)] font-mvmt-heading">
          The people behind the movement
        </h1>
        <p className="text-base leading-relaxed max-w-2xl mx-auto text-[var(--mvmt-text-secondary)]">
          We&rsquo;re a team of practitioners, researchers, and builders dedicated to equipping the next generation of movement leaders.
        </p>
      </div>

      {/* Team Grid */}
      <div className="px-6 sm:px-12 lg:px-20 py-16 bg-[var(--mvmt-surface-light-muted)]">
        <h2 className="text-xl font-bold mb-10 text-center text-[var(--mvmt-text-primary)] font-mvmt-heading">
          Our Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.initials}
              className="rounded-lg p-6 border bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-[var(--mvmt-on-dark-primary)] bg-[var(--mvmt-surface-dark)]">
                  {member.initials}
                </div>
                <div>
                  <p className="font-semibold text-[var(--mvmt-text-primary)]">{member.name}</p>
                  <p className="text-xs text-[var(--mvmt-accent)]">{member.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--mvmt-text-secondary)]">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="px-6 sm:px-12 lg:px-20 py-16 bg-[var(--mvmt-surface-light)]">
        <h2 className="text-xl font-bold mb-10 text-center text-[var(--mvmt-text-primary)] font-mvmt-heading">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="text-lg font-bold mb-2 text-[var(--mvmt-text-primary)]">{v.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--mvmt-text-secondary)]">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

AboutTeamGrid.displayName = "AboutTeamGrid";
