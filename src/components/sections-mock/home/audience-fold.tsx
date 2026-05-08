import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionHead } from "@/components/sections-mock/primitives";

interface SegmentCard {
  href: string;
  title: string;
  body: string;
  ctaLabel: string;
}

const SEGMENT_CARDS: readonly SegmentCard[] = [
  {
    href: "/for-churches",
    title: "Churches",
    body:
      "Guiding congregations through theological implications, staff efficiency, and ethical deployment in ministry contexts.",
    ctaLabel: "Find out more",
  },
  {
    href: "/for-nonprofits",
    title: "Nonprofits",
    body:
      "Helping mission-driven entities scale impact, automate back-office operations, and maintain donor trust.",
    ctaLabel: "Find out more",
  },
  {
    href: "/for-institutions",
    title: "Institutions",
    body:
      "Providing networks and large agencies with systematic frameworks, governance, and enterprise-level solutions.",
    ctaLabel: "Find out more",
  },
];

/**
 * Who Movemental serves — three segment entry points (aligned to Stitch home).
 */
export function AudienceFold() {
  return (
    <section
      className="band-default audience-section"
      id="audiences"
      aria-labelledby="audience-heading"
    >
      <div className="container audience-section__inner">
        <SectionHead
          eyebrow="Who Movemental serves"
          display={<>Tailored for mission-driven organizations.</>}
          displayId="audience-heading"
          lede="We guide different types of organizations through the AI transition, meeting them where they are with custom training and technology."
        />

        <div className="mt-12 grid gap-x-10 gap-y-12 md:mt-16 md:grid-cols-3">
          {SEGMENT_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col gap-5 rounded-md p-2 -m-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <h3 className="font-serif text-3xl italic leading-tight tracking-tight text-foreground md:text-4xl">
                {card.title}
              </h3>
              <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                {card.body}
              </p>
              <span className="mt-auto flex items-center justify-between gap-4 pt-4">
                <span className="text-xs font-medium uppercase tracking-eyebrow text-foreground">
                  {card.ctaLabel}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
