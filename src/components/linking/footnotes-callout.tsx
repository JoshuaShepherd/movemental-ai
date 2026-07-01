import Link from "next/link";

import styles from "./linking.module.css";

type FootnotesCalloutProps = {
  label?: string;
};

/** Points readers to the EEAT footnotes registry. */
export function FootnotesCallout({ label = "Sources & claims" }: FootnotesCalloutProps) {
  return (
    <aside className={styles.linkingBlock} aria-label={label}>
      <p className={styles.linkingLabel}>{label}</p>
      <p className={styles.linkingLink}>
        <Link href="/footnotes">Browse the footnotes registry →</Link>
      </p>
    </aside>
  );
}
