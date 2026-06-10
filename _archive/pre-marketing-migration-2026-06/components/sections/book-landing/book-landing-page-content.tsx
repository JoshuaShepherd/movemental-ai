import Link from "next/link";
import { Suspense } from "react";
import { BookOpen, Clock, Download } from "lucide-react";

import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Section,
  SurfaceCard,
} from "@/components/primitives";
import {
  BookExportForm,
  BookHero,
  EndorsementWall,
  placeholderEndorsements,
} from "@/components/book";
import { getApprovedEndorsements } from "@/lib/book-data";
import {
  getAllChapters,
  getLiveChapters,
  bookParts,
  chapterLabel,
  parseAudienceLens,
} from "@/lib/book";
import type { AudienceLens } from "@/lib/book";

export type BookLandingPageProps = {
  searchParams: Promise<{ lens?: string }>;
};

export async function BookLandingPageContent({ searchParams }: BookLandingPageProps) {
  const { lens: lensParam } = await searchParams;
  const lens = parseAudienceLens(lensParam) as AudienceLens;

  let wallEndorsements = placeholderEndorsements;
  try {
    const fromDb = await getApprovedEndorsements();
    if (fromDb.length > 0) wallEndorsements = fromDb;
  } catch {
    /* tables may not exist until drizzle:push */
  }

  const chapters = getAllChapters();
  const liveChapters = getLiveChapters();
  const liveWords = liveChapters.reduce((sum, c) => sum + c.wordCount, 0);
  const liveTime = Math.max(1, Math.ceil(liveWords / 250));
  const lensQs = lens !== "movement-leaders" ? `?lens=${lens}` : "";

  return (
    <>
      <Suspense fallback={<div className="min-h-[40vh]" aria-hidden />}>
        <BookHero activeLens={lens} />
      </Suspense>

      <Section variant="section">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" aria-hidden />
              <span>
                <strong className="text-foreground">{liveChapters.length}</strong> of{" "}
                <strong className="text-foreground">{chapters.length}</strong> units published
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden />
              <span>
                ~<strong className="text-foreground">{liveTime}</strong> min read (released
                material)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Download className="h-4 w-4" aria-hidden />
              <span>Free &middot; no paywall</span>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow className="mb-4">What you will find inside</Eyebrow>
          <Display size="sm" as="h2">
            Three through-lines of the manuscript
          </Display>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "The tax you are already paying",
                text: "Fragmentation is not disorganization — it is structural. The book names the cost ledger (memory, continuity, credibility, formation, and more) before it offers a pathway.",
              },
              {
                num: "02",
                title: "The map, then the load-bearing work",
                text: "The six stages from fragmentation to movement — with honest time on integration: library, network, ontology, carry-forward, and why most teams stall between stages one and two.",
              },
              {
                num: "03",
                title: "Human intelligence that endures",
                text: "Information can be structured; formation still requires relationship. Stewardship of integrated intelligence closes the book — power, restraint, and starting where you are.",
              },
            ].map((item) => (
              <SurfaceCard key={item.num} tone="on-background">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-primary">
                  {item.num}
                </span>
                <h3 className="mt-2 text-lg font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </SurfaceCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="midnight" spacing="lg">
        <Container>
          <Prose className="max-w-(--prose-max)">
            <Display size="sm" as="h2">
              Integration is unglamorous — and load-bearing
            </Display>
            <p className="mt-4 text-inverse-foreground/80">
              This is a living manuscript: new chapters ship here as they are drafted. The preface
              names how the book was built and where human responsibility sits. Readers can still
              leave margin feedback on published chapters — with footnoted credit when it shapes a
              revision.
            </p>
          </Prose>
          <div className="mt-8">
            <ArrowLink
              href={`/book/read/preface-the-scatter-field${lensQs}`}
              size="md"
              tone="foreground"
              className="text-inverse-foreground"
            >
              Start at the preface
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <Section id="chapters">
        <Container>
          <Eyebrow className="mb-4">Table of contents</Eyebrow>
          <Display size="sm" as="h2">
            Seven parts, twenty-two chapters, preface and coda
          </Display>

          <div className="mt-8 space-y-8">
            {bookParts.map((part) => {
              const partChapters = chapters.filter((c) => part.chapters.includes(c.number));
              return (
                <div key={part.number}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.03em] text-muted-foreground">
                    Part {part.number}: {part.title}
                  </h3>
                  <ul className="mt-3 space-y-1">
                    {partChapters.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/book/read/${c.slug}${lensQs}`}
                          className="group flex flex-wrap items-baseline gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span className="w-20 shrink-0 text-sm text-muted-foreground/70">
                            {chapterLabel(c)}
                          </span>
                          <span className="min-w-0 flex-1 font-medium text-foreground group-hover:text-primary">
                            {c.title}
                          </span>
                          {c.publicationStatus === "coming_soon" ? (
                            <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Not yet published
                            </span>
                          ) : (
                            <span className="shrink-0 text-xs text-muted-foreground/65">
                              {c.readingTime} min
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <EndorsementWall endorsements={wallEndorsements} />

      <Section variant="section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="mb-4">A living book</Eyebrow>
            <Display size="sm" as="h2">
              This book improves because of its readers
            </Display>
            <Prose className="mx-auto mt-4">
              <p>
                Every published chapter has a margin — a space for questions, feedback, and
                constructive criticism. When your input shapes a revision, you&apos;re credited by
                name. Think of it as a quieter Wikipedia: the author holds the pen, but the
                conversation is real.
              </p>
            </Prose>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book/contributors"
                className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                View contributors
              </Link>
              <Link
                href={`/book/read/preface-the-scatter-field${lensQs}`}
                className="inline-flex items-center justify-center rounded-md bg-linear-to-br from-primary to-primary-dim px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Start reading
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="download">
        <Container className="text-center">
          <Display size="sm" as="h2">
            Take it with you
          </Display>
          <Prose className="mx-auto mt-4">
            <p>
              Download the latest build of your edition as PDF. We&apos;ll send it to your inbox
              along with updates as the book evolves.
            </p>
          </Prose>
          <BookExportForm lens={lens} />
        </Container>
      </Section>
    </>
  );
}
