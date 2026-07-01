import Link from "next/link";

import { getResearchItem } from "@/lib/research/data";

import styles from "./linking.module.css";

type RelatedResearchLinksProps = {
  slugs: readonly string[];
  label?: string;
};

/** Contextual links to `/research/[slug]` papers. */
export function RelatedResearchLinks({
  slugs,
  label = "Related research",
}: RelatedResearchLinksProps) {
  const items = slugs
    .map((slug) => getResearchItem(slug))
    .filter((item): item is NonNullable<typeof item> => item != null);

  if (!items.length) return null;

  return (
    <aside className={styles.linkingBlock} aria-label={label}>
      <p className={styles.linkingLabel}>{label}</p>
      <ul className={styles.linkingList}>
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={`/research/${item.slug}`} className={styles.linkingLink}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
