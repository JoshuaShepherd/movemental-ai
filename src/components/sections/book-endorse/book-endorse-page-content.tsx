import { getAllChapters } from "@/lib/book";

import { EndorseForm } from "@/components/sections/book-endorse/endorse-form";

export function BookEndorsePageContent() {
  const chapters = getAllChapters().map((c) => ({
    slug: c.slug,
    number: c.number,
    title: c.title,
    chapterKind: c.chapterKind,
  }));

  return <EndorseForm chapters={chapters} />;
}
