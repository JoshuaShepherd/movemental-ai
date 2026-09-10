import { ArticleHubCard } from "@/components/articles/article-detail";
import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { DocumentGraphNav } from "@/components/linking/document-graph-nav";
import type { ArticleSummary } from "@/lib/articles";
import styles from "@/components/articles/article.module.css";

interface ArticlesHubViewProps {
  articles: ArticleSummary[];
}

/**
 * Staging view for Movemental Articles Hub.
 * Matches design specification in Movemental Articles.dc.html.
 */
export function ArticlesHubView({ articles }: ArticlesHubViewProps) {
  return (
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
  );
}
