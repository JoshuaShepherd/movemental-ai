import type { Metadata } from "next";

import { ArticlesHubView } from "@/v2/components/articles/articles-hub-view";
import { listArticles } from "@/lib/articles";
import { buildOrganizationJsonLd } from "@/lib/site-schema";

export const metadata: Metadata = {
  title: "Articles | Movemental",
  description:
    "Long-form essays on AI, credibility, formation, and movement leadership — stable URLs for citation and discovery.",
  alternates: {
    canonical: "/articles",
  },
};

export default function V2ArticlesPage() {
  const articles = listArticles();
  const jsonLd = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlesHubView articles={articles} />
    </>
  );
}
