import type { Metadata } from "next";

import {
  ChapterReaderPageContent,
  type ChapterReaderPageProps,
} from "@/components/sections/book-read/chapter-reader-page-content";
import { chapterLabel, getChapterBySlug, getChapterSlugs } from "@/lib/book";
import {
  BOOK_TITLE,
  COMING_SOON_CHAPTER_DESCRIPTION,
} from "@/lib/book-meta";
import { canonicalPageUrl } from "@/lib/site-url";

export async function generateStaticParams() {
  return getChapterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return { title: "Chapter not found" };

  const description =
    chapter.publicationStatus === "coming_soon"
      ? COMING_SOON_CHAPTER_DESCRIPTION
      : (chapter.paragraphs[0]?.text.slice(0, 160) ?? "");

  const path = `/book/read/${slug}`;
  const pageUrl = canonicalPageUrl(path);
  const ogTitle = `${chapter.title} — ${BOOK_TITLE}`;

  return {
    title: `${chapterLabel(chapter)}: ${chapter.title} — ${BOOK_TITLE}`,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      url: pageUrl,
      title: ogTitle,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export default async function ChapterReaderPage(props: ChapterReaderPageProps) {
  return <ChapterReaderPageContent {...props} />;
}
