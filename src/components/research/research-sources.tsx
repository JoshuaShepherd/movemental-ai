import { cn } from "@/lib/utils";
import { MASTER_SOURCES } from "@/lib/research/data";

import { ResearchHeader } from "./research-header";
import { ResearchFooter } from "./research-footer";
import { SourcesList } from "./sources-list";
import styles from "./research.module.css";

/** `/research/sources` — every claim, sourced. The master citation registry. */
export function ResearchSources() {
  return (
    <>
      <ResearchHeader />

      <div className={styles.sourcesPage}>
        <div className={styles.sourcesCard}>
          <header className={styles.sourcesCardHeader}>
            <span className={cn(styles.eyebrow, styles.textMuted)}>Verifiable</span>
            <h1 className={styles.display}>Every claim, sourced.</h1>
            <p className={cn(styles.bodyLg, styles.textMuted)}>
              We&rsquo;re the company that argues for verifiability. So here&rsquo;s ours.
            </p>
            <p className={cn(styles.caption, styles.textMuted, styles.mt0)}>
              Three layers, kept separate: <strong>empirical</strong> claims (prevalence,
              adoption, survey shares) carry source, date, and sample size;{" "}
              <strong>ethical</strong> and pastoral conclusions draw on separate reasoning;{" "}
              <strong>advocacy</strong> framing (Movemental&rsquo;s thesis, formation-before-deployment)
              is labeled as argument, not as survey fact. Percentages from different studies are not
              interchangeable — see the findings page for paired comparisons only.
            </p>
            <p className={cn(styles.caption, styles.textMuted, styles.mt0)}>
              For Movemental&rsquo;s full source-quality rubric (evidence vs. formation language,
              question router, maintenance cadence), see{" "}
              <em>authoritative-sources-ai-nonprofits-faith-formation</em> in the graded-high
              research corpus (maintainer reference, not a public reader).
            </p>
          </header>

          <SourcesList sources={MASTER_SOURCES} />

          <p className={cn(styles.sourcesDisclaimer, styles.caption)}>
            Sources current as of mid-2026. Verify against each provider before relying on them.
          </p>
        </div>
      </div>

      <ResearchFooter variant="library" />
    </>
  );
}
