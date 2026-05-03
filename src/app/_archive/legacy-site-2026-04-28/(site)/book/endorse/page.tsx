import type { Metadata } from "next";

import { BookEndorsePageContent } from "@/components/sections/book-endorse/book-endorse-page-content";
import { BOOK_DESCRIPTION, BOOK_TITLE } from "@/lib/book-meta";

export const metadata: Metadata = {
  title: `Endorse — ${BOOK_TITLE}`,
  description: BOOK_DESCRIPTION,
};

export default function EndorsePage() {
  return <BookEndorsePageContent />;
}
