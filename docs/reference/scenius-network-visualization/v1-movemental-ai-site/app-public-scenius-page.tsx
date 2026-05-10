import type { Metadata } from "next";
import { tenantConfig } from "@/lib/config/tenant.config";
import { SceniusVisualization } from "@/components/scenius-visualization/SceniusVisualization";

const meta = tenantConfig.platformPages?.scenius;

export const metadata: Metadata = {
  title: meta?.title ?? "Scenius",
  description:
    meta?.description ??
    "Explore collaborative networks of peers, practitioners, and early adopters as nodes in a living scenius graph.",
};

export default function SceniusPage() {
  const m = tenantConfig.platformPages?.scenius;

  return (
    <main className="flex flex-col">
      <section className="border-b border-border bg-background pb-12 pt-[calc(var(--space-5xl)+3.5rem)]">
        <div className="mx-auto max-w-content px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Network
          </p>
          <h1 className="mt-3 font-heading text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight text-foreground">
            {m?.title ?? "The Scenius Visualization"}
          </h1>
          {m?.tagline ? (
            <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
              {m.tagline}
            </p>
          ) : null}
          {m?.description ? (
            <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
              {m.description}
            </p>
          ) : null}
        </div>
      </section>

      <SceniusVisualization />
    </main>
  );
}
