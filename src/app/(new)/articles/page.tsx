import type { Metadata } from "next";

import { ArticlesLibrary } from "@/components/mv/legacy/articles-library";
import { MvPageHeader } from "@/components/mv/legacy/page-header";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
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
      <MvHeader />
      <div className="mv-wrap" style={{ paddingBottom: 96 }}>
        <MvPageHeader
          eyebrow="Articles"
          title="Movemental essays"
          deck="Durable, citable pieces on AI posture, scenius, and the work of mission-driven organizations."
        />
        <ArticlesLibrary
          items={articles.map((a) => ({ slug: a.slug, title: a.title, eyebrow: a.eyebrow, readTime: a.readTime, excerpt: a.excerpt }))}
        />
      </div>
      <MvFooter />
    </>
  );
}
