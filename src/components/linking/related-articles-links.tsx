import Link from "next/link";

import { getArticle } from "@/lib/articles";
import { articleUrlPath } from "@/lib/article-page-helpers";

import styles from "./linking.module.css";

type RelatedArticlesLinksProps = {
  slugs: readonly string[];
  label?: string;
};

/** Contextual links to `/articles/[slug]` pieces. */
export function RelatedArticlesLinks({
  slugs,
  label = "Related articles",
}: RelatedArticlesLinksProps) {
  const items = slugs
    .map((slug) => getArticle(slug))
    .filter((item): item is NonNullable<typeof item> => item != null);

  if (!items.length) return null;

  return (
    <aside className={styles.linkingBlock} aria-label={label}>
      <p className={styles.linkingLabel}>{label}</p>
      <ul className={styles.linkingList}>
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={articleUrlPath(item.slug)} className={styles.linkingLink}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
