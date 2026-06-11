"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../ink-band.module.css";

const CHURCHES_HREF = "/agent/churches";
const NONPROFITS_HREF = "/agent/nonprofits";
const INSTITUTIONS_HREF = "/agent/institutions";

/**
 * Clickable audience segments in the mast center. Each segment links to its
 * audience document; the active route gets the ink-band highlighter bleed.
 */
export function MastAudienceNav() {
  const pathname = usePathname();
  const nonprofitsActive = pathname?.startsWith(NONPROFITS_HREF) ?? false;
  const churchesActive = pathname?.startsWith(CHURCHES_HREF) ?? false;
  const institutionsActive = pathname?.startsWith(INSTITUTIONS_HREF) ?? false;

  return (
    <nav className={styles.mastAudienceNav} aria-label="Who we serve">
      <Link
        href={NONPROFITS_HREF}
        className={`${styles.mastAudienceSegment} ${styles.mastAudienceLink} ${
          nonprofitsActive ? styles.mastAudienceLinkActive : ""
        }`}
        aria-current={nonprofitsActive ? "page" : undefined}
      >
        Non-profits
      </Link>
      <span className={styles.mastAudienceSep} aria-hidden="true">
        ·
      </span>
      <Link
        href={CHURCHES_HREF}
        className={`${styles.mastAudienceSegment} ${styles.mastAudienceLink} ${
          churchesActive ? styles.mastAudienceLinkActive : ""
        }`}
        aria-current={churchesActive ? "page" : undefined}
      >
        Churches
      </Link>
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
