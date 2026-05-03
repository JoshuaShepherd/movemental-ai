import type { ReactNode } from "react";
import Link from "next/link";

import { BookCover, BookExportForm } from "@/components/book";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import {
  AudienceInvitationSection,
  AudienceLabel,
  AudienceSerifEm,
} from "@/components/sections/audience-concept";
import {
  bookParts,
  chapterLabel,
  getAllChapters,
  getLiveChapters,
  parseAudienceLens,
} from "@/lib/book";
import { SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";
import { cn } from "@/lib/utils";

const PART_ROWS: {
  num: string;
  title: string;
  body: string;
  chapters: string;
}[] = [
  {
    num: "Part 01",
    title: "The tax you are already paying",
    body: "The scatter field, the invisible tax, two intelligences, and the moment AI made the tax visible.",
    chapters: "Preface + Chapters 1–4",
  },
  {
    num: "Part 02",
    title: "The map",
    body: "The six stages at a glance — the arc the rest of the book traces, compressed into a single chapter.",
    chapters: "Chapter 5",
  },
  {
    num: "Part 03",
    title: "Integration (the load-bearing stage)",
    body: "What integration actually is, minting the schema, carry-forward, and why integration stalls — and how to start anyway.",
    chapters: "Chapters 6–9",
  },
  {
    num: "Part 04",
    title: "Activation and formation (the payback)",
    body: "The library answers: corpus, pathways, and voice. Formation as the moral stage — and why it always requires relationship.",
    chapters: "Chapters 10–13",
  },
  {
    num: "Part 05",
    title: "Multiplication and movement",
    body: "When the work stops depending on you. Orbits and infra channels. When platforms become a field.",
    chapters: "Chapters 14–16",
  },
  {
    num: "Part 06",
    title: "Playbooks",
    body: "Four chapters that localize the argument: the movement leader, the nonprofit, the church, the institution.",
    chapters: "Chapters 17–20",
  },
  {
    num: "Part 07",
    title: "The moral frame and the beginning",
    body: "Stewardship — the ethical weight of integrated intelligence. Starting where you are. Coda.",
    chapters: "Chapters 21–22 + Coda",
  },
  {
    num: "—",
    title: "A living manuscript",
    body: "New chapters ship as they're drafted. Subscribers get them first, with footnoted credit for margin feedback that shapes a revision.",
    chapters: "Ongoing",
  },
];

export type BookConceptModernPageProps = {
  searchParams: Promise<{ lens?: string }>;
};

/**
 * Books hub — Concept Modern (`docs/html/books-concept-modern/index.html`).
 */
export async function BookConceptModernPageContent({ searchParams }: BookConceptModernPageProps) {
  const { lens: lensParam } = await searchParams;
  const lens = parseAudienceLens(lensParam);
  const lensQs = lens !== "movement-leaders" ? `?lens=${lens}` : "";

  const chapters = getAllChapters();
  const liveChapters = getLiveChapters();
  const liveWords = liveChapters.reduce((sum, c) => sum + c.wordCount, 0);
  const liveTime = Math.max(1, Math.ceil(liveWords / 250));

  return (
    <div data-book="concept-modern" className="text-pretty">
      <Section variant="default" spacing="lg" className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10">
        <Container>
          <RevealOnScroll>
            <AudienceLabel>Book · Free · In progress</AudienceLabel>
          </RevealOnScroll>
          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:gap-[clamp(3rem,6vw,5.5rem)]">
            <div>
              <RevealOnScroll delaySec={0.06}>
                <h1 className="text-display max-w-[22ch] text-balance text-foreground">
                  From Fragmentation
                  <br />
                  to <AudienceSerifEm>Movement</AudienceSerifEm>.
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.12} className="mt-6 sm:mt-8">
                <p className="max-w-[50ch] text-pretty text-[clamp(1.15rem,1.7vw,1.3rem)] leading-normal tracking-tight text-muted-foreground">
                  A structural path from scatter field to field — for movement leaders, nonprofits, churches, and
                  institutions. Every organization carrying meaning through time pays a fragmentation tax on both sides
                  of the{" "}
                  <Link
                    href={`/book/read/two-intelligences${lensQs}`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    two intelligences
                  </Link>
                  . This book names the structural problem, maps the six-stage path, and shows why integration is the
                  load-bearing stage. For the operating sequence under AI &mdash; Safety through Solutions &mdash; use
                  the{" "}
                  <Link
                    href={SSSS_FIELD_GUIDE_PATH}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    AI Stewardship Sequence field guide
                  </Link>
                  .
                </p>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.18} className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/book/read/preface-the-scatter-field${lensQs}`}>
                    Start reading
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="#chapters">See the chapters</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href={SSSS_FIELD_GUIDE_PATH}>AI Stewardship Sequence field guide</Link>
                </Button>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.22}>
              <div className="flex flex-col gap-10">
                <BookCover className="max-w-[min(100%,280px)] lg:ml-auto" priority />
                <aside
                  className="max-w-[36ch] bg-card px-5 py-5 font-serif text-[1.1rem] font-normal italic leading-relaxed text-foreground shadow-ambient lg:ml-auto"
                  aria-label="From the preface"
                >
                  <p>
                    &ldquo;Every organization carrying meaning through time pays a fragmentation tax. Integration is the
                    load-bearing stage.&rdquo;
                  </p>
                  <p className="mt-3 font-sans text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft not-italic">
                    From the preface
                  </p>
                </aside>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" aria-label="Book length and shape">
        <Container>
          <div className="grid gap-0 border-y border-border sm:grid-cols-3">
            <RevealOnScroll className="border-b border-border px-4 py-8 sm:border-b-0 sm:border-r sm:py-10">
              <span className="block font-serif text-[clamp(2.2rem,4vw,3rem)] font-normal italic leading-none text-foreground">
                7
              </span>
              <span className="mt-3 block max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                Parts. Five stages, two playbook sections, one moral frame.
              </span>
            </RevealOnScroll>
            <RevealOnScroll
              delaySec={0.06}
              className="border-b border-border px-4 py-8 sm:border-b-0 sm:border-r sm:py-10"
            >
              <span className="block font-serif text-[clamp(2.2rem,4vw,3rem)] font-normal italic leading-none text-foreground">
                {chapters.length}
              </span>
              <span className="mt-3 block max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                Chapters, plus preface and coda — twenty-four units in total.
              </span>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.12} className="px-4 py-8 sm:py-10">
              <span className="block font-serif text-[clamp(2.2rem,4vw,3rem)] font-normal italic leading-none text-foreground">
                Free
              </span>
              <span className="mt-3 block max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                Published as it&apos;s written. ~{liveTime} min read in released material ({liveChapters.length} units
                live).
              </span>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <AudienceProseNarrow
        label="The claim"
        titleId="claim-title"
        title={
          <>
            Fragmentation is <AudienceSerifEm>structural</AudienceSerifEm>, not a content problem.
          </>
        }
      >
        <p>
          Every organization that carries meaning through time — a life&apos;s work, a congregation, an institution, a
          mission — pays a tax it usually can&apos;t see. Knowledge, relationships, decisions, and formation live in
          places that don&apos;t agree with each other, and the cost of that disagreement accumulates on both the{" "}
          <strong className="font-medium text-foreground">informational</strong> and{" "}
          <strong className="font-medium text-foreground">relational</strong> sides of the house — the same pair this
          book names as the{" "}
          <Link
            href={`/book/read/two-intelligences${lensQs}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            two intelligences
          </Link>
          .
        </p>
        <p>
          This book argues the fix isn&apos;t more content, more tools, or a different platform. The fix is{" "}
          <em className="font-serif text-[1.08em] not-italic">integration</em> — the load-bearing stage that turns a
          scatter field into a field. Activation, formation, multiplication, and movement only compound once that stage
          holds. For the full narrative spine on the site, read the{" "}
          <Link href="/fragmentation" className="font-medium text-primary underline-offset-4 hover:underline">
            fragmentation story
          </Link>
          . For the AI Stewardship Sequence — Safety, Sandbox, Skills, Solutions — used when adopting AI under
          constraint, read the{" "}
          <Link href={SSSS_FIELD_GUIDE_PATH} className="font-medium text-primary underline-offset-4 hover:underline">
            AI Stewardship Sequence field guide
          </Link>
          .
        </p>
      </AudienceProseNarrow>

      <Section id="parts" variant="default" spacing="lg" aria-labelledby="parts-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-12">
            <div>
              <RevealOnScroll>
                <AudienceLabel>The seven parts</AudienceLabel>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.06}>
                <h2 id="parts-title" className="mt-2 max-w-[24ch] text-balance text-h2 text-foreground">
                  The arc, <AudienceSerifEm>end to end</AudienceSerifEm>.
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.1} className="max-w-[54ch] text-[1.05rem] leading-relaxed text-muted-foreground">
              <p>
                <strong className="font-medium text-foreground">
                  The tax, the map, the load-bearing stage, the payback, the compounding, the playbooks, the moral
                  frame.
                </strong>{" "}
                Each part stands on the one before it — and sets up the one after.
              </p>
            </RevealOnScroll>
          </div>

          <ol className="mt-12 grid list-none grid-cols-1 border-t border-border p-0 md:grid-cols-2 lg:grid-cols-4">
            {PART_ROWS.map((row, i) => (
              <li
                key={row.num + row.title}
                className="flex flex-col gap-3 border-b border-border py-7 pr-5 md:border-r md:odd:border-r md:even:border-r-0 lg:border-r lg:odd:border-r lg:even:border-r lg:nth-[4n]:border-r-0"
              >
                <RevealOnScroll delaySec={0.04 + i * 0.04} className="flex h-full flex-col gap-3">
                  <span className="text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                    {row.num}
                  </span>
                  <h3 className="max-w-[26ch] font-serif text-[clamp(1.25rem,1.9vw,1.55rem)] font-normal italic leading-snug tracking-tight text-foreground">
                    {row.title}
                  </h3>
                  <p className="max-w-[36ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                    {row.body}
                  </p>
                  <span className="mt-auto pt-2 text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                    {row.chapters}
                  </span>
                </RevealOnScroll>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="chapters" variant="section" spacing="lg" aria-labelledby="chapters-title">
        <Container>
          <RevealOnScroll>
            <AudienceLabel>Chapter list</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2 id="chapters-title" className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground">
              All twenty-four <AudienceSerifEm>units</AudienceSerifEm>.
            </h2>
          </RevealOnScroll>

          <div className="mt-12 space-y-[clamp(2.25rem,4.5vw,3rem)]">
            {bookParts.map((part, pi) => {
              const partChapters = chapters.filter((c) => part.chapters.includes(c.number));
              return (
                <RevealOnScroll key={part.number} delaySec={0.05 * pi}>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-[0.9rem]">
                      <span className="text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                        Part {String(part.number).padStart(2, "0")}
                      </span>
                      <h3 className="flex-1 pl-4 font-serif text-[clamp(1.3rem,1.9vw,1.55rem)] font-normal italic leading-snug tracking-tight text-foreground">
                        {part.title}
                      </h3>
                    </div>
                    <ul className="list-none p-0">
                      {partChapters.map((c) => {
                        const isLive = c.publicationStatus === "live";
                        const label = chapterLabel(c);
                        const compactLabel = label
                          .replace(/^Chapter\s+(\d+)$/i, "Ch. $1")
                          .replace(/^Preface$/i, "Preface")
                          .replace(/^Coda$/i, "Coda");
                        const rowClass =
                          "grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-[0.95rem] text-foreground";
                        return (
                          <li
                            key={c.slug}
                            className={cn(
                              "border-b border-border",
                              isLive && "transition-[padding] duration-normal ease-out hover:pl-[0.6rem]"
                            )}
                          >
                            {isLive ? (
                              <Link href={`/book/read/${c.slug}${lensQs}`} className={rowClass}>
                                <span className="text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                                  {compactLabel}
                                </span>
                                <span className="min-w-0 text-base font-medium leading-snug tracking-tight text-foreground">
                                  {c.title}
                                </span>
                                <span className="flex shrink-0 items-center gap-2 text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-foreground before:size-1.5 before:rounded-full before:bg-foreground before:content-[''] whitespace-nowrap">
                                  Read
                                </span>
                              </Link>
                            ) : (
                              <div
                                className={cn(rowClass, "cursor-default opacity-60")}
                                aria-label={`${c.title} — coming soon`}
                              >
                                <span className="text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                                  {compactLabel}
                                </span>
                                <span className="min-w-0 text-base font-medium leading-snug tracking-tight text-foreground">
                                  {c.title}
                                </span>
                                <span className="shrink-0 text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow whitespace-nowrap text-ink-soft">
                                  Coming soon
                                </span>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </Section>

      <AudienceInvitationSection
        id="read"
        variant="section"
        label="Begin"
        titleId="book-invitation-title"
        title={
          <>
            Start with the preface — <AudienceSerifEm>it sets the whole arc</AudienceSerifEm>.
          </>
        }
        body={
          <>
            <p>
              The preface names the scatter field you&apos;re already standing in. From there, the six stages follow in
              order.
            </p>
          </>
        }
        bodySoft="Subscribers receive each new chapter as it’s published — with footnoted credit when margin feedback shapes a revision."
        primaryCta={{ label: "Start with the preface", href: `/book/read/preface-the-scatter-field${lensQs}` }}
        secondaryCta={{ label: "Fragmentation story", href: "/fragmentation" }}
        tertiaryCta={{ label: "AI Stewardship Sequence field guide", href: SSSS_FIELD_GUIDE_PATH }}
      />

      <Section id="download" variant="default" spacing="lg" aria-labelledby="download-title">
        <Container className="max-w-[640px] text-center">
          <RevealOnScroll>
            <AudienceLabel>Take it with you</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2 id="download-title" className="mt-2 text-balance text-h2 text-foreground">
              Download the latest build
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.1} className="mt-4 text-muted-foreground">
            <p className="text-base leading-relaxed">
              We&apos;ll email a PDF of your edition as chapters ship. Same lens preference as the reader when you
              choose one below.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.14} className="mt-8 text-left">
            <BookExportForm lens={lens} />
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}

function AudienceProseNarrow({
  label,
  titleId,
  title,
  children,
}: {
  label: string;
  titleId: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section variant="default" spacing="lg" aria-labelledby={titleId}>
      <Container width="narrow">
        <RevealOnScroll>
          <AudienceLabel>{label}</AudienceLabel>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.06}>
          <h2 id={titleId} className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground">
            {title}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.12} className="mt-6 max-w-[60ch] space-y-4 text-base leading-relaxed text-muted-foreground">
          {children}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
