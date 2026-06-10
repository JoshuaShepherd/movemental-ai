import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Cite } from "@/components/citations";
import { SectionHead } from "@/components/sections-mock/primitives";
import { SITE_FOUNDERS } from "@/lib/site-founders";

import { SceniusNetworkHome } from "./scenius-network-home";
import { MOVEMENT_VOICES } from "./voices-graph-data";

const FOUNDER_VOICE_IDS = new Set(["alan-hirsch", "brad-brisco", "josh-shepherd"]);

/**
 * Named voices surfaced above the dot-portrait visualization so the visualization
 * reinforces specifics already established by name, rather than gesturing at an
 * unnamed mass. Pulled from the same roster that powers the viz so the two blocks
 * stay in sync.
 */
const NAMED_VOICES = MOVEMENT_VOICES.filter(
  (v) => !FOUNDER_VOICE_IDS.has(v.id),
);

// TODO(founders): Brad Brisco and Joshua Shepherd portraits are from one shoot;
// Alan Hirsch's is from a different source with different lighting and crop
// conventions. Replace all three with a single unified shoot when scheduled.

export function CredibilityFold() {
  return (
    <section
      className="band-default"
      id="about"
      aria-labelledby="credibility-heading"
    >
      <div className="container">
        <SectionHead
          eyebrow="Credibility"
          display={
            <>
              Built with and shaped by <em>trusted voices.</em>
            </>
          }
          displayId="credibility-heading"
          lede="Movemental was built by missional practitioners with decades of work that predates AI. The network around us is the credibility infrastructure for this category — trusted movement voices whose names carry weight in the world your organization works in."
        />

        <p className="mt-6 max-w-(--prose-max) text-sm leading-relaxed text-muted-foreground md:text-base">
          Credibility in an AI-saturated world is increasingly relational
          <Cite claimId="pew-ai-detection-attribution-gap" />.
        </p>

        <div className="mt-14 md:mt-16">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Founders
          </p>
          <ul className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_FOUNDERS.map((founder) => (
              <li key={founder.slug}>
                <Link
                  href={`/about/founders/${founder.slug}`}
                  className="group flex items-start gap-4 rounded-md p-2 -m-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/60 transition-shadow group-hover:shadow-ambient sm:w-28">
                    <Image
                      src={founder.portrait}
                      alt={`Portrait of ${founder.name}`}
                      width={960}
                      height={1200}
                      className="h-full w-full object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1 pt-1">
                    <h3 className="text-base font-medium tracking-tight text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary/40">
                      {founder.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {founder.shortTitle}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 md:mt-16">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Named voices
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {NAMED_VOICES.map((voice) => (
              <li key={voice.id}>
                <Link
                  href="/voices"
                  className="group flex items-center gap-4 rounded-md p-2 -m-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div className="relative aspect-4/5 w-16 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/60 transition-shadow group-hover:shadow-ambient">
                    <Image
                      src={voice.imageSrc}
                      alt={`Portrait of ${voice.name}`}
                      width={640}
                      height={800}
                      className="h-full w-full object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
                    <h4 className="text-[0.95rem] font-medium tracking-tight text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary/40">
                      {voice.name}
                    </h4>
                    <p className="text-[13px] leading-snug text-muted-foreground">
                      {voice.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 pt-4 md:mt-20 md:pt-6">
          <SceniusNetworkHome ariaLabel="Trusted voices — relationship graph of movement leaders Movemental is built with; hover or tap a portrait to see audience credentials" />
        </div>

        <Link
          href="/voices"
          className="group mt-12 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-eyebrow text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mt-16"
        >
          See all voices
          <ArrowUpRight
            className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
