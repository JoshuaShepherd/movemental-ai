"use client";

import { cn } from "@/lib/utils";

interface AboutManifestoDarkProps {
  className?: string;
}

const beliefs = [
  "Movements are built by ordinary people with extraordinary conviction.",
  "Multiplication is the only metric that matters at scale.",
  "The best leaders plant themselves before they plant anything else.",
  "Technology should serve the mission, never replace it.",
  "Every community has the right to hear the message in their own language and culture.",
  "We are stewards, not owners, of the work we do.",
];

export function AboutManifestoDark({ className }: AboutManifestoDarkProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Full-dark Manifesto */}
      <div className="px-6 sm:px-12 lg:px-20 py-28 bg-[var(--mvmt-surface-dark)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-6 text-[var(--mvmt-accent)]">
            Our Manifesto
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8 text-[var(--mvmt-on-dark-primary)] font-mvmt-heading">
            We believe the world doesn&rsquo;t need more institutions. It needs more movements.
          </h1>
          <p className="text-base leading-relaxed mb-16 text-[var(--mvmt-on-dark-secondary)]">
            Institutions preserve. Movements transform. We&rsquo;re here to equip the people who choose transformation — who plant themselves in communities and stay long enough to see multiplication happen.
          </p>
        </div>
      </div>

      {/* Beliefs List */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 bg-[var(--mvmt-surface-dark-elevated)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-10 text-[var(--mvmt-accent)]">
            What We Hold True
          </h2>
          <ol className="space-y-6">
            {beliefs.map((belief, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-sm font-bold shrink-0 w-6 text-[var(--mvmt-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-relaxed text-[var(--mvmt-on-dark-primary)]">
                  {belief}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Signature */}
      <div className="px-6 sm:px-12 lg:px-20 py-16 border-t border-[var(--mvmt-border-dark)] bg-[var(--mvmt-surface-dark)]">
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0 text-[var(--mvmt-on-dark-primary)] bg-[var(--mvmt-surface-dark-elevated)]">
            BB
          </div>
          <div>
            <p className="font-bold text-[var(--mvmt-on-dark-primary)]">Brad Brisco</p>
            <p className="text-sm text-[var(--mvmt-on-dark-muted)]">Founder, Movemental</p>
          </div>
          <a
            href="/about"
            className="ml-auto px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-colors text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)] hover:bg-[var(--mvmt-accent-hover)]"
          >
            Meet the Team
          </a>
        </div>
      </div>
    </section>
  );
}

AboutManifestoDark.displayName = "AboutManifestoDark";
