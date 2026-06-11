"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../ink-band.module.css";

const INSTITUTIONS_HREF = "/agent/institutions";

/**
 * Clickable audience segments in the mast center. Only Institutions is wired
 * today; Non-profits and Churches stay plain labels until their pages exist.
 * On `/agent/institutions`, Institutions gets the ink-band highlighter bleed.
 */
export function MastAudienceNav() {
  const pathname = usePathname();
  const institutionsActive = pathname?.startsWith(INSTITUTIONS_HREF) ?? false;

  return (
    <nav className={styles.mastAudienceNav} aria-label="Who we serve">
      <span className={styles.mastAudienceSegment}>Non-profits</span>
      <span className={styles.mastAudienceSep} aria-hidden="true">
        ·
      </span>
      <span className={styles.mastAudienceSegment}>Churches</span>
      <span className={styles.mastAudienceSep} aria-hidden="true">
        ·
      </span>
      <Link
        href={INSTITUTIONS_HREF}
        className={`${styles.mastAudienceSegment} ${styles.mastAudienceLink} ${
          institutionsActive ? styles.mastAudienceLinkActive : ""
        }`}
        aria-current={institutionsActive ? "page" : undefined}
      >
        Institutions
      </Link>
    </nav>
  );
}
