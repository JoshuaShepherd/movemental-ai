import Link from "next/link";
import { Search, User } from "lucide-react";

import styles from "./research.module.css";

/** Research-library masthead — brand, audience nav, account (+ optional search). */
export function ResearchHeader({ showSearch = false }: { showSearch?: boolean }) {
  return (
    <header className={styles.siteHeader} role="banner">
      <div className={styles.siteHeaderInner}>
        <Link href="/research" className={styles.brand}>
          movemental
        </Link>
        <nav className={styles.nav} aria-label="Audience">
          <Link href="/nonprofits">Non-profits</Link>
          <Link href="/agent/churches">Churches</Link>
          <Link href="/institutions">Institutions</Link>
        </nav>
        <div className={styles.actions}>
          {showSearch ? (
            <Link href="/research" className={styles.iconBtn} aria-label="Search">
              <Search size={20} strokeWidth={1.75} aria-hidden />
            </Link>
          ) : null}
          <Link href="/login" className={styles.iconBtn} aria-label="Account">
            <User size={20} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
