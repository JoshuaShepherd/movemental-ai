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
    href: "/churches",
    title: "Churches",
    body:
      "For executive pastors and elder teams navigating AI in pastoral work, communications, and ministry without losing what makes the church a church.",
    ctaLabel: "Find out more",
  },
  {
    href: "/nonprofits",
    title: "Nonprofits",
    body:
      "For executive directors and boards facing AI as a fiduciary responsibility — donor trust, beneficiary protection, regulatory exposure — not just an operational question.",
    ctaLabel: "Find out more",
  },
  {
    href: "/institutions",
    title: "Institutions",
    body:
      "For seminary presidents, denominational executives, and training networks managing AI across faculty, students, and accreditation simultaneously.",
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
          display={<>Three audiences, one path.</>}
          displayId="audience-heading"
          lede={
            <>
              Churches, nonprofits, and theological institutions face different
              stakes — pastoral, fiduciary, accreditational — but the underlying
              decisions are the same. The path adapts to your situation.
            </>
          }
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
