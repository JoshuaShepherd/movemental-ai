import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionHead } from "@/components/sections-mock/primitives";

interface SegmentCard {
  href: string;
  title: string;
  body: string;
  ctaLabel: string;
  preview: string;
}

const SEGMENT_CARDS: readonly SegmentCard[] = [
  {
    href: "/churches",
    title: "Churches",
    body:
      "For executive pastors and elder teams navigating AI in pastoral work, communications, and ministry without losing what makes the church a church.",
    ctaLabel: "Read the church playbook",
    preview:
      "For executive pastors and elder teams — Sundays, staff, and pastoral correspondence.",
  },
  {
    href: "/nonprofits",
    title: "Nonprofits",
    body:
      "For executive directors and boards facing AI as a fiduciary responsibility — donor trust, beneficiary protection, regulatory exposure — not just an operational question.",
    ctaLabel: "Read the nonprofit playbook",
    preview:
      "For executive directors and boards — donor trust, beneficiary protection, regulatory exposure.",
  },
  {
    href: "/institutions",
    title: "Institutions",
    body:
      "For seminary presidents, denominational executives, and training networks managing AI across faculty, students, and accreditation simultaneously.",
    ctaLabel: "Read the institution playbook",
    preview:
      "For seminary presidents and training networks — faculty, students, and accreditation.",
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
          display={<>Is this for you?</>}
          displayId="audience-heading"
          lede={
            <>
              Churches, nonprofits, and theological institutions face different
              stakes — pastoral, fiduciary, accreditational. The underlying
              decisions are the same. Find your starting point.
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
              <div className="mt-auto flex flex-col gap-2 border-t border-rule pt-4">
                <span className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-eyebrow text-foreground">
                    {card.ctaLabel}
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <p className="font-serif text-[14px] italic leading-snug text-muted-foreground">
                  {card.preview}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-sm leading-relaxed text-muted-foreground md:mt-14 md:text-[15px]">
          Not sure which fits?{" "}
          <Link
            href="/field-guides/safety"
            className="group inline-flex items-center gap-1.5 border-b border-foreground/30 pb-0.5 text-foreground transition-colors hover:border-foreground"
          >
            Start with the Field Guide.
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </p>
      </div>
    </section>
  );
}
