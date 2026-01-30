"use client";

import { cn } from "@/lib/utils";

interface AboutMissionValuesProps {
  className?: string;
}

const values = [
  { icon: "🌱", title: "Multiplication Over Addition", description: "We measure success not by the size of one community, but by how many new communities are born from it." },
  { icon: "🤝", title: "Incarnational Presence", description: "Real transformation happens through relationship. We equip leaders to be present in the places and cultures they serve." },
  { icon: "📖", title: "Rooted in Research", description: "Every framework we share is grounded in field research, practitioner data, and peer-reviewed scholarship." },
  { icon: "🔗", title: "Network Thinking", description: "Movements don't scale through hierarchy. We build decentralized networks where every node can become a hub." },
  { icon: "⚡", title: "Bias Toward Action", description: "Theory without practice is empty. We prototype, test, iterate, and share what we learn — in real time." },
  { icon: "🌍", title: "Global & Contextual", description: "What works in Portland may not work in Pretoria. We honor local context while sharing transferable principles." },
];

export function AboutMissionValues({ className }: AboutMissionValuesProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Mission Hero */}
      <div className="px-6 sm:px-12 lg:px-20 py-24 bg-[var(--mvmt-surface-light)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[var(--mvmt-accent)]">
            Our Mission
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[var(--mvmt-text-primary)] font-mvmt-heading">
            Equipping leaders who start movements that matter
          </h1>
          <p className="text-lg leading-relaxed text-[var(--mvmt-text-secondary)]">
            Movemental exists to resource, connect, and accelerate the work of movement leaders — practitioners who plant communities, catalyze culture, and multiply impact across the globe. We believe the best ideas deserve the best tools.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--mvmt-border-light)]" />

      {/* Values Grid */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 bg-[var(--mvmt-surface-light-muted)]">
        <h2 className="text-xl font-bold mb-12 text-center text-[var(--mvmt-text-primary)] font-mvmt-heading">
          What We Believe
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {values.map((v) => (
            <div key={v.title}>
              <span className="text-2xl mb-3 block">{v.icon}</span>
              <h3 className="text-base font-bold mb-2 text-[var(--mvmt-text-primary)]">{v.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--mvmt-text-secondary)]">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Quote */}
      <div className="px-6 sm:px-12 lg:px-20 py-16 text-center bg-[var(--mvmt-surface-light)]">
        <blockquote className="max-w-2xl mx-auto">
          <p className="text-xl italic leading-relaxed mb-4 text-[var(--mvmt-text-primary)]">
            &ldquo;The future belongs to movements — and movements belong to the people who start them.&rdquo;
          </p>
          <cite className="text-sm not-italic font-medium text-[var(--mvmt-text-muted)]">
            — Brad Brisco, Founder
          </cite>
        </blockquote>
      </div>
    </section>
  );
}

AboutMissionValues.displayName = "AboutMissionValues";
