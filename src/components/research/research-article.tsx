import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ResearchItem } from "@/lib/research/data";

import { ArticleActions } from "./article-actions";
import { ArticleToc } from "./article-toc";
import { getArticleBody } from "./article-bodies";
import { ResearchHeader } from "./research-header";
import { ResearchFooter } from "./research-footer";
import styles from "./research.module.css";

function kindLabel(item: ResearchItem): string {
  return item.year ? `${item.kind} · ${item.year}` : item.kind;
}

/** The right-hand sources rail. Always rendered so the 3-column grid holds. */
function ArticleSources({ item }: { item: ResearchItem }) {
  return (
    <aside className={styles.articleSources} aria-label="Sources">
      <p className={cn(styles.eyebrow, styles.textMuted, styles.mb6)}>Sources</p>
      {item.sources?.length ? (
        <ul className={styles.articleSourcesList}>
          {item.sources.map((source) => (
            <li key={source.index} className={source.dim ? styles.isDim : undefined}>
              <span className={cn(styles.eyebrow, source.dim ? styles.textMuted : styles.textInkBlue)}>
                [{source.index}]
              </span>
              <span className={cn(styles.caption, source.dim && styles.textMuted)}>
                {source.title}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={cn(styles.caption, styles.textMuted)}>
          The full source list for this piece is being compiled.
        </p>
      )}
      <p className={styles.sourcesLink}>
        <Link href="/research/sources" className={cn(styles.btnLink, styles.caption)}>
          View all sources &rarr;
        </Link>
      </p>
    </aside>
  );
}

/** `/research/[slug]` — the paper reader: contents rail · body · sources rail. */
export function ResearchArticle({ item }: { item: ResearchItem }) {
  return (
    <>
      <ResearchHeader />

      <div className={cn(styles.page, styles.pageWide)}>
        <div className={styles.articleLayout}>
          {item.sections?.length ? (
            <ArticleToc sections={item.sections} />
          ) : (
            <aside className={styles.articleToc} aria-hidden />
          )}

          <article className={styles.articleMain}>
            <header className={styles.articleHeader}>
              <p className={cn(styles.eyebrow, styles.textMuted)}>{kindLabel(item)}</p>
              <h1 className={cn(styles.display, styles.articleTitle)}>{item.title}</h1>
              {item.subtitle ? <p className={styles.articleSubtitle}>{item.subtitle}</p> : null}
              <div className={cn(styles.articleByline, styles.hairlineTop, styles.hairlineBottom)}>
                <span className={styles.eyebrow}>By Movemental</span>
                <span className={styles.bylineSep} aria-hidden>
                  •
                </span>
                <span className={cn(styles.caption, styles.textMuted)}>
                  {item.sourceCount} sources
                </span>
                <span className={styles.bylineSep} aria-hidden>
                  •
                </span>
                <span className={cn(styles.caption, styles.textMuted)}>
                  {item.readMin} min read
                </span>
              </div>
            </header>

            <div className={styles.articleBody}>{getArticleBody(item)}</div>

            <ArticleActions title={item.title} />
          </article>

          <ArticleSources item={item} />
        </div>
      </div>

      <ResearchFooter variant="compact" />
    </>
  );
}
