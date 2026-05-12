import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Cite } from "@/components/citations";
import { SectionHead } from "@/components/sections-mock/primitives";

import { SceniusNetworkHome } from "./scenius-network-home";

interface Founder {
  name: string;
  title: string;
  initials: string;
  portrait: string;
}

// TODO(founders): Brad Brisco and Joshua Shepherd portraits are from one shoot;
// Alan Hirsch's is from a different source with different lighting and crop
// conventions. Replace all three with a single unified shoot when scheduled.
const FOUNDERS: readonly Founder[] = [
  {
    name: "Dr. Brad Brisco",
    title: "CEO & Co-founder",
    initials: "BB",
    portrait: "/images/voices/brad-brisco.webp",
  },
  {
    name: "Alan Hirsch",
    title: "Chief Missiologist & Co-founder",
    initials: "AH",
    portrait: "/images/voices/alan-hirsch.webp",
  },
  {
    name: "Joshua Shepherd",
    title: "CTO & Founder",
    initials: "JS",
    portrait: "/images/voices/josh-shepherd.webp",
  },
];

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
              Built with and shaped by <em>movement leaders.</em>
            </>
          }
          displayId="credibility-heading"
          lede="Movemental was built by missional practitioners with decades of work that predates AI. The network around us is the credibility infrastructure for this category — leaders whose names carry weight in the world your organization works in."
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
            {FOUNDERS.map((founder) => (
              <li
                key={founder.name}
                className="flex items-start gap-4"
              >
                <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/60 sm:w-28">
                  <Image
                    src={founder.portrait}
                    alt={`Portrait of ${founder.name}`}
                    width={960}
                    height={1200}
                    className="h-full w-full object-cover"
                    sizes="112px"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-[10px] font-semibold tracking-tight text-foreground backdrop-blur-sm"
                  >
                    {founder.initials}
                  </span>
                </div>
                <div className="flex min-w-0 flex-col gap-1 pt-1">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {founder.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {founder.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 pt-4 md:mt-20 md:pt-6">
          <SceniusNetworkHome ariaLabel="Movement Voices — trusted leaders in a full mesh; hover or tap a portrait to see their audience credentials" />
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
