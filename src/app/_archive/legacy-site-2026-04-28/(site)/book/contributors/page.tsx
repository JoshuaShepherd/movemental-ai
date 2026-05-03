import type { Metadata } from "next";

import { BookContributorsPageContent } from "@/components/sections/book-contributors/book-contributors-page-content";
import { BOOK_TITLE } from "@/lib/book-meta";

export const metadata: Metadata = {
  title: `Current contributors — ${BOOK_TITLE}`,
  description:
    "A visible layer of participation: movement leaders, writers, and practitioners contributing to Movemental's body of thought.",
};

export default async function ContributorsPage() {
  return <BookContributorsPageContent />;
}
