import type { Metadata } from "next";
import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container } from "@/components/studio/Container";

export const metadata: Metadata = {
  title: "Case studies — in development",
  description:
    "Movemental's named customer case studies are in development. Here's how to read what we're learning in the meantime — without manufactured testimonials.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section
        className="band-default border-b border-border py-16 md:py-24"
        aria-labelledby="case-studies-h1"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Case studies — in development
          </p>
          <h1
            id="case-studies-h1"
            className="mt-3 font-serif italic text-4xl font-normal tracking-tight text-foreground md:text-5xl"
          >
            We&rsquo;re building these honestly.
          </h1>
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-foreground">
            <p>
              Movemental is a two-week-old company. The cohort engagements that will produce
              our first named case studies are mid-cycle. We refuse to publish manufactured
              testimonials or borrowed logo walls in their place.
            </p>
            <p>
              The first named customer case study will appear on this page within 180 days of
              launch &mdash; with written permission from the partner, full attribution, and
              the specifics of what the work actually produced. Until then, this page is
              honest about what doesn&rsquo;t yet exist.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="band-default border-b border-border py-16 md:py-24"
        aria-labelledby="alternative-paths-h2"
      >
        <Container className="max-w-(--prose-max)">
          <h2
            id="alternative-paths-h2"
            className="font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
          >
            Where to read the work in the meantime.
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Three reading paths give you the substance the case studies will eventually
            collect.
          </p>

          <ul className="mt-12 divide-y divide-border">
            <li className="py-6">
              <Link
                href="/field-guides"
                className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                  Field guides
                </p>
                <h3 className="mt-2 font-serif italic text-2xl font-normal text-foreground transition-colors group-hover:text-primary">
                  Read what we teach.
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                  The two published field guides are the most direct view of the methodology
                  that will produce the case studies &mdash; written before the case studies
                  exist, so the principles are not back-rationalized from outcomes.
                </p>
              </Link>
            </li>
            <li className="py-6">
              <Link
                href="/movement-leaders"
                className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                  Movement Leaders
                </p>
                <h3 className="mt-2 font-serif italic text-2xl font-normal text-foreground transition-colors group-hover:text-primary">
                  See who walks alongside this work.
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                  The Movement Leaders directory names the practitioners who are stress-testing
                  the work in their own organizations. Their standing is not a substitute for
                  case studies &mdash; it is the relational proof that anchors them.
                </p>
              </Link>
            </li>
            <li className="py-6">
              <Link
                href="/about"
                className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                  Founders
                </p>
                <h3 className="mt-2 font-serif italic text-2xl font-normal text-foreground transition-colors group-hover:text-primary">
                  Read the longer arc the founders have been writing.
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                  Brad Brisco, Alan Hirsch, and Joshua Shepherd have decades of published work
                  on the question Movemental exists to answer. The published record is the
                  longest-form evidence on offer.
                </p>
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <section
        className="band-default py-16 md:py-24"
        aria-labelledby="case-studies-newsletter-h2"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            When they ship
          </p>
          <h2
            id="case-studies-newsletter-h2"
            className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
          >
            Be notified when the first case study publishes.
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
            One email when the first named partner agrees to be published. No marketing
            cadence; no upsell sequence.
          </p>
          <div className="mt-8">
            <NewsletterForm source="case-studies" />
          </div>
        </Container>
      </section>
    </>
  );
}
