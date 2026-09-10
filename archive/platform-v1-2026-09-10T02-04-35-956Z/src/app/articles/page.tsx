import type { Metadata } from "next";

import { ArticleHubCard } from "@/components/articles/article-detail";
import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { DocumentGraphNav } from "@/components/linking/document-graph-nav";
import { listArticles } from "@/lib/articles";
import { buildOrganizationJsonLd } from "@/lib/site-schema";

import styles from "@/components/articles/article.module.css";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Long-form essays on AI, credibility, formation, and movement leadership — stable URLs for citation and discovery.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesHubPage() {
  const articles = listArticles();
  const jsonLd = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InkBandUtilityShell>
        <div className={styles.hubList}>
          <p className={styles.eyebrow}>Articles</p>
          <h1 className={styles.title}>Movemental essays</h1>
          <p className={styles.deck}>
            Durable, citable pieces on AI posture, scenius, and the work of mission-driven
            organizations.
          </p>
          <div className={styles.hubGrid}>
            {articles.map((article) => (
              <ArticleHubCard
                key={article.slug}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                eyebrow={article.eyebrow}
                readTime={article.readTime}
              />
            ))}
          </div>
          <DocumentGraphNav current="articles" />
        </div>
      </InkBandUtilityShell>
    </>
  );
}
