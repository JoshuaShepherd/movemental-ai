import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  FINDINGS_HERO,
  FINDINGS_STAT_PANELS,
  FINDINGS_TRUST_CHARTS,
} from "@/lib/research/data";

import { HighlightText } from "./highlight-text";
import { ResearchHeader } from "./research-header";
import { ResearchFooter } from "./research-footer";
import styles from "./research.module.css";

/** `/research/findings` — what the research shows: stat panels + trust charts. */
export function ResearchFindings() {
  return (
    <>
      <ResearchHeader showSearch />

      <div className={styles.page}>
        <header className={styles.findingsHero}>
          <p className={cn(styles.eyebrow, styles.textMuted, styles.mb6)}>
            {FINDINGS_HERO.eyebrow}
          </p>
          <h1 className={cn(styles.display, styles.mb8)}>{FINDINGS_HERO.title}</h1>
          <p className={cn(styles.bodyLg, styles.textMuted, styles.maxWProse, styles.mt0)}>
            <HighlightText text={FINDINGS_HERO.lede} />
          </p>
        </header>

        <section className={styles.statPanels} aria-label="Adoption statistics">
          <aside
            className={cn(
              styles.marginNote,
              styles.marginNoteLeft,
              styles.marginNoteMuted,
              styles.marginNoteDesktopOnly,
            )}
          >
            {FINDINGS_HERO.marginNote}
          </aside>

          <div className={styles.hairlineY}>
            {FINDINGS_STAT_PANELS.map((panel) => (
              <article className={styles.statPanel} key={panel.copy}>
                <div>
                  <div className={styles.statPanelNumbers}>
                    <span className={styles.statPanelPrimary}>{panel.primary}</span>
                    <span className={styles.textMuted}>vs</span>
                    <span className={styles.statPanelSecondary}>{panel.secondary}</span>
                  </div>
                  <p className={styles.statPanelCopy}>{panel.copy}</p>
                </div>
                <p className={cn(styles.statPanelSource, styles.caption)}>{panel.source}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.trustSection} aria-labelledby="trust-title">
          <header className={styles.trustSectionHeader}>
            <h2 id="trust-title" className={styles.headlineMd}>
              The Trust Deficit
            </h2>
            <p className={cn(styles.textMuted, styles.trustSectionLede)}>
              While adoption accelerates quietly, constituents remain skeptical. Transparency is
              emerging as the primary differentiator for institutions.
            </p>
          </header>

          <div className={styles.trustGrid}>
            {FINDINGS_TRUST_CHARTS.map((chart) => (
              <div key={chart.label}>
                <div className={styles.trustChartHeader}>
                  <p className={styles.trustChartLabel}>{chart.label}</p>
                  <span className={styles.trustChartValue}>{chart.value}%</span>
                </div>
                <div
                  className={styles.trustChartBar}
                  role="img"
                  aria-label={`${chart.value} percent bar chart`}
                >
                  <div
                    className={cn(
                      styles.trustChartFill,
                      chart.tone === "blue"
                        ? styles.trustChartFillBlue
                        : styles.trustChartFillInk,
                    )}
                    style={{ width: `${chart.value}%` }}
                  />
                </div>
                <p className={cn(styles.trustChartSource, styles.caption)}>{chart.source}</p>
              </div>
            ))}
          </div>
        </section>

        <p className={styles.findingsCta}>
          <Link href="/research/ai-credibility-crisis" className={cn(styles.btnLink, styles.eyebrow)}>
            Read the full paper &rarr;
          </Link>
        </p>
      </div>

      <ResearchFooter variant="band" />
    </>
  );
}
