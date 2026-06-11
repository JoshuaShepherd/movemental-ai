import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { RESEARCH_ITEMS } from "@/lib/research/data";

import { LoadArchive } from "./load-archive";
import { ResearchHeader } from "./research-header";
import { ResearchFooter } from "./research-footer";
import { ResearchRow } from "./research-row";
import styles from "./research.module.css";

/** `/research` — the research library index. */
export function ResearchLibrary() {
  return (
    <>
      <ResearchHeader />

      <div className={cn(styles.page, styles.libraryPage)}>
        <div className={styles.libraryGridBg} aria-hidden />

        <header className={styles.libraryHero}>
          <span className={cn(styles.eyebrow, styles.textFaint)}>Field notes · Research</span>
          <h1 className={cn(styles.display, styles.mb8)}>The research behind the work.</h1>
          <p className={cn(styles.bodyLg, styles.textMuted, styles.maxWProse, styles.mt0)}>
            Original papers on AI, trust, and the organizations whose credibility is on the line.
            Read here and cite freely. Printable from any paper; PDF bundles ship later.
          </p>
          <div className={cn(styles.marginNote, styles.marginNoteRight, styles.marginNoteDesktopOnly)}>
            All sources verified &amp; peer-reviewed.
            <Check className={styles.iconSm} aria-hidden style={{ marginTop: "0.5rem", opacity: 0.5 }} />
          </div>
        </header>

        <div>
          <div className={cn(styles.researchTableHeader, styles.eyebrow)}>
            <div>Type</div>
            <div>Title &amp; abstract</div>
            <div className={styles.researchTableHeaderMeta}>Metadata</div>
          </div>

          {RESEARCH_ITEMS.map((item) => (
            <ResearchRow key={item.slug} item={item} />
          ))}

          <LoadArchive />
        </div>
      </div>

      <ResearchFooter variant="library" />
    </>
  );
}
