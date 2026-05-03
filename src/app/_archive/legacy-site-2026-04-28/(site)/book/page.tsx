import type { Metadata } from "next";

import { BookConceptModernPageContent } from "@/components/sections/book/book-concept-modern-page-content";
import { BOOK_TITLE } from "@/lib/book-meta";
import { canonicalPageUrl } from "@/lib/site-url";

const title = BOOK_TITLE;
const description =
  "Free book in progress for movement leaders, nonprofits, churches, and institutions — scatter field to field, two intelligences, six stages, with integration as the load-bearing stage.";
const ogDescription =
  "Free book: scatter field to field, two intelligences, six stages — integration is the load-bearing stage.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/book") },
  openGraph: {
    url: canonicalPageUrl("/book"),
    title,
    description: ogDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
  },
};

export default async function BookLandingPage(props: {
  searchParams: Promise<{ lens?: string }>;
}) {
  return <BookConceptModernPageContent searchParams={props.searchParams} />;
}
