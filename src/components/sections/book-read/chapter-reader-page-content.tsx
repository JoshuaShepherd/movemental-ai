import { notFound } from "next/navigation";
import Link from "next/link";

import { Container, Eyebrow, Prose, Section } from "@/components/primitives";
import {
  ChapterNav,
  ChapterSubscribeCard,
  HighlightShare,
  MarginColumn,
  MarginNoteSubmission,
  MarginNotesMobile,
  ReadingToolbar,
  ShareToolbar,
} from "@/components/book";
import { ChapterBody } from "@/components/book/chapter-body";
import {
  getAllChapters,
  getChapterBySlug,
  getAdjacentChapters,
  chapterLabel,
  parseAudienceLens,
} from "@/lib/book";
import type { AudienceLens } from "@/lib/book";
import type { Endorsement } from "@/components/book/endorsement-card";
import type { MarginNoteData } from "@/components/book/margin-column";
import { getChapterEndorsements, getChapterMarginNotes } from "@/lib/book-data";
import { BOOK_TITLE } from "@/lib/book-meta";
import { canonicalPageUrl } from "@/lib/site-url";

/* ------------------------------------------------------------------ */
/*  Placeholder margin notes (when DB empty or unavailable)           */
/* ------------------------------------------------------------------ */

const placeholderNotes: MarginNoteData[] = [
  {
    id: "author-1",
    type: "author_note",
    body: "This chapter is under active revision. The argument is directionally stable but the prose is still being tightened.",
    anchorParagraphId: "p-0",
    date: "April 2026",
  },
];

async function loadMarginBundle(slug: string) {
  try {
    const [dbNotes, endorsements] = await Promise.all([
      getChapterMarginNotes(slug),
      getChapterEndorsements(slug),
    ]);
    const marginNotes = dbNotes.length > 0 ? dbNotes : placeholderNotes;
    return { marginNotes, endorsements };
  } catch {
    return { marginNotes: placeholderNotes, endorsements: [] as Endorsement[] };
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export type ChapterReaderPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lens?: string }>;
};

export async function ChapterReaderPageContent({ params, searchParams }: ChapterReaderPageProps) {
  const { slug } = await params;
  const { lens: lensParam } = await searchParams;
  const chapter = getChapterBySlug(slug);
  if (!chapter) notFound();

  const lens = parseAudienceLens(lensParam) as AudienceLens;
  const isComingSoon = chapter.publicationStatus === "coming_soon";

  const { marginNotes, endorsements } = isComingSoon
    ? { marginNotes: [] as MarginNoteData[], endorsements: [] as Endorsement[] }
    : await loadMarginBundle(slug);

  const allChapters = getAllChapters();
  const { prev, next } = getAdjacentChapters(slug);
  const chapterIndex = allChapters.findIndex((c) => c.slug === slug);

  const canonicalPath = `/book/read/${slug}`;
  const shareUrl =
    lens !== "movement-leaders"
      ? `${canonicalPageUrl(canonicalPath)}?lens=${encodeURIComponent(lens)}`
      : canonicalPageUrl(canonicalPath);
  const defaultAnchor = chapter.paragraphs[0]?.id ?? "p-0";

  const readMeta = isComingSoon
    ? "Coming soon"
    : `${chapter.readingTime} min read`;

  return (
    <>
      <ReadingToolbar
        chapterLabel={chapterLabel(chapter)}
        chapterTitle={chapter.title}
        chapterIndex={chapterIndex}
        totalChapters={allChapters.length}
        lens={lens}
      />

      <Section spacing="lg">
        <Container>
          <div className="mb-12 max-w-(--prose-max)">
            <Eyebrow className="mb-2">
              Part {chapter.partNumber}: {chapter.partTitle}
            </Eyebrow>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              {chapterLabel(chapter)} &middot; {readMeta}
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
              {chapter.title}
            </h1>

            <ShareToolbar
              title={`${chapter.title} — ${BOOK_TITLE}`}
              url={shareUrl}
              className="mt-6"
            />
          </div>

          {isComingSoon ? (
            <div className="max-w-(--prose-max) rounded-xl bg-section p-8">
              <Prose>
                <p className="text-lg text-foreground">
                  This {chapter.chapterKind === "preface" ? "preface" : chapter.chapterKind === "coda" ? "coda" : "chapter"} is{" "}
                  <strong>coming soon</strong>. The manuscript is publishing in sequence; when this
                  unit is ready, it will appear here with the same URL.
                </p>
                <p className="text-muted-foreground">
                  Browse released chapters from the{" "}
                  <Link href="/book#chapters" className="font-medium text-primary hover:underline">
                    table of contents
                  </Link>
                  .
                </p>
              </Prose>
            </div>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,var(--prose-max))_280px]">
                <ChapterBody paragraphs={chapter.paragraphs} />
                <MarginColumn notes={marginNotes} endorsements={endorsements} />
              </div>

              <MarginNotesMobile notes={marginNotes} endorsements={endorsements} />
            </>
          )}

          <div className="mt-16 max-w-(--prose-max) rounded-xl bg-section p-6">
            <ChapterSubscribeCard chapterSlug={slug} lens={lens} />
          </div>

          <div className="mt-12">
            <ChapterNav
              currentSlug={slug}
              chapters={allChapters.map((c) => ({
                number: c.number,
                slug: c.slug,
                title: c.title,
                partNumber: c.partNumber,
                chapterKind: c.chapterKind,
                publicationStatus: c.publicationStatus,
              }))}
              prev={
                prev
                  ? {
                      slug: prev.slug,
                      title: prev.title,
                      number: prev.number,
                      chapterKind: prev.chapterKind,
                    }
                  : null
              }
              next={
                next
                  ? {
                      slug: next.slug,
                      title: next.title,
                      number: next.number,
                      chapterKind: next.chapterKind,
                    }
                  : null
              }
            />
          </div>
        </Container>
      </Section>

      {!isComingSoon && (
        <>
          <MarginNoteSubmission chapterSlug={slug} defaultAnchorId={defaultAnchor} />
          <HighlightShare />
        </>
      )}
    </>
  );
}
