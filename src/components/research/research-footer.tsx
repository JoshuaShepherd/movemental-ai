import Link from "next/link";

import { cn } from "@/lib/utils";

import styles from "./research.module.css";

type FooterVariant = "library" | "compact" | "band";

/** Footer chrome for the research flow. Three variants mirror the mockups. */
export function ResearchFooter({ variant = "library" }: { variant?: FooterVariant }) {
  if (variant === "compact") {
    return (
      <footer className={styles.siteFooter} role="contentinfo">
        <div className={cn(styles.footerInner, styles.footerInnerCompact)}>
          <p className={cn(styles.footerCopy, styles.footerCopyCaps)}>
            © 2026 Movemental Field Edition
          </p>
          <nav className={styles.footerNav} aria-label="Footer">
            <Link href="/research">Archive</Link>
            <Link href="/research/findings">Index</Link>
            <Link href="/research/sources">Resources</Link>
          </nav>
        </div>
      </footer>
    );
  }

  if (variant === "band") {
    return (
      <footer className={cn(styles.siteFooter, styles.siteFooterBand)} role="contentinfo">
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>movemental</span>
          <p className={cn(styles.footerCopy, styles.footerCopyCaps)}>
            © 2026 Movemental Research Archive
          </p>
          <nav className={styles.footerNav} aria-label="Footer">
            <Link href="/research/ai-credibility-crisis">Read the paper</Link>
            <Link href="/research/findings">Methodology</Link>
            <Link href="/research/sources">Sources</Link>
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.siteFooter} role="contentinfo">
      <div className={styles.footerInner}>
        <Link href="/research" className={styles.footerBrand}>
          movemental
        </Link>
        <nav className={styles.footerNav} aria-label="Footer">
          <Link href="/research">Archives</Link>
          <Link href="/research/findings">Methodology</Link>
          <Link href="/research/sources">Sources</Link>
        </nav>
        <p className={styles.footerCopy}>© 2026 Movemental Research Library</p>
      </div>
    </footer>
  );
}
