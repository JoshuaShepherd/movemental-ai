"use client";

import { cn } from "@/lib/utils";

interface OrgsLogoGridProps {
  className?: string;
}

const logos = [
  "Exponential", "Forge", "NewThing", "V3 Movement",
  "Missio Alliance", "Saturate", "Send Network", "Redeemer City to City",
  "Lausanne", "Cru", "NAMB", "Acts 29",
];

/**
 * Partner/client logo grid — clean light background with
 * organized logo display and trust headline.
 */
export function OrgsLogoGrid({ className }: OrgsLogoGridProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light py-20 px-6", className)}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-3">
          Trusted partners
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-mvmt-text-primary font-mvmt-heading mb-4">
          Equipping networks worldwide
        </h2>
        <p className="text-base text-mvmt-text-secondary mb-12 max-w-lg mx-auto">
          Movement leaders and organizations on six continents use Movemental to train, assess, and deploy.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center h-20 rounded-lg border border-mvmt-border-light bg-mvmt-surface-light-muted"
            >
              <span className="text-sm font-bold text-mvmt-text-muted">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

OrgsLogoGrid.displayName = "OrgsLogoGrid";
