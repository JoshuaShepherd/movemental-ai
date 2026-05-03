import type { Metadata } from "next";

import {
  BookModeratePageContent,
  type BookModeratePageProps,
} from "@/components/sections/book-moderate/book-moderate-page-content";
import { BOOK_TITLE } from "@/lib/book-meta";

export const metadata: Metadata = {
  title: `Moderate — ${BOOK_TITLE}`,
  robots: { index: false, follow: false },
};

export default async function BookModeratePage(props: BookModeratePageProps) {
  return <BookModeratePageContent {...props} />;
}
