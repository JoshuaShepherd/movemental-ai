import type { Metadata } from "next";

import { ArticlesArchiveClient } from "@/components/sections/articles/articles-archive-client";
import { listArticlesForArchive } from "@/lib/articles";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Article archive";
const description =
  "Browse every essay, strategy piece, playbook, and guide in the Movemental library — filter by shape, search, and sort.";
const ogTitle = "Article archive — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/articles/archive") },
  openGraph: {
    url: canonicalPageUrl("/articles/archive"),
    title: ogTitle,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
  },
};

export default function ArticlesArchivePage() {
  const entries = listArticlesForArchive();
  return <ArticlesArchiveClient entries={entries} />;
}
