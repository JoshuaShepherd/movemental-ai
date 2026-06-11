import styles from "./institutions.module.css";

/** Simple connected-map visual for the gathered foundation (Section 5). */
export function FoundationDiagram() {
  return (
    <div className={styles.foundationVis} aria-hidden="true">
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Connected foundation diagram">
        <g fill="none" stroke="var(--color-ink-band-border)" strokeWidth="1.25">
          <line x1="160" y1="100" x2="80" y2="45" />
          <line x1="160" y1="100" x2="240" y2="45" />
          <line x1="160" y1="100" x2="55" y2="155" />
          <line x1="160" y1="100" x2="265" y2="155" />
          <line x1="160" y1="100" x2="160" y2="175" />
          <line x1="80" y1="45" x2="240" y2="45" />
          <line x1="55" y1="155" x2="265" y2="155" />
        </g>
        <circle cx="160" cy="100" r="22" fill="var(--color-ink-band-paper)" stroke="var(--color-ink-band-blue)" strokeWidth="2" />
        <text x="160" y="104" textAnchor="middle" fontFamily="var(--font-ink-mono)" fontSize="9" fill="var(--color-ink-band-blue)">
          CORE
        </text>
        <circle cx="80" cy="45" r="14" fill="var(--color-ink-band-paper)" stroke="var(--color-ink-band-ink)" strokeWidth="1" />
        <circle cx="240" cy="45" r="14" fill="var(--color-ink-band-paper)" stroke="var(--color-ink-band-ink)" strokeWidth="1" />
        <circle cx="55" cy="155" r="14" fill="var(--color-ink-band-paper)" stroke="var(--color-ink-band-ink)" strokeWidth="1" />
        <circle cx="265" cy="155" r="14" fill="var(--color-ink-band-paper)" stroke="var(--color-ink-band-ink)" strokeWidth="1" />
        <circle cx="160" cy="175" r="14" fill="var(--color-ink-band-paper)" stroke="var(--color-ink-band-ink)" strokeWidth="1" />
        <text x="80" y="48" textAnchor="middle" fontFamily="var(--font-ink-body)" fontSize="7" fill="var(--color-ink-band-ink-muted)">
          People
        </text>
        <text x="240" y="48" textAnchor="middle" fontFamily="var(--font-ink-body)" fontSize="7" fill="var(--color-ink-band-ink-muted)">
          Work
        </text>
        <text x="55" y="158" textAnchor="middle" fontFamily="var(--font-ink-body)" fontSize="7" fill="var(--color-ink-band-ink-muted)">
          Record
        </text>
        <text x="265" y="158" textAnchor="middle" fontFamily="var(--font-ink-body)" fontSize="7" fill="var(--color-ink-band-ink-muted)">
          Voice
        </text>
        <text x="160" y="178" textAnchor="middle" fontFamily="var(--font-ink-body)" fontSize="7" fill="var(--color-ink-band-ink-muted)">
          Degree
        </text>
      </svg>
    </div>
  );
}
