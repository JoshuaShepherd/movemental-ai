import styles from "./audience-page.module.css";

type FoundationDiagramProps = {
  centerLabel?: string;
};

const SCATTERED = [
  { cx: 42, cy: 38, label: "People" },
  { cx: 118, cy: 52, label: "Record" },
  { cx: 68, cy: 98, label: "Voice" },
  { cx: 148, cy: 88, label: "Program" },
  { cx: 28, cy: 72, label: "Grants" },
];

const GATHERED = [
  { cx: 248, cy: 48, label: "People" },
  { cx: 312, cy: 48, label: "Record" },
  { cx: 228, cy: 112, label: "Voice" },
  { cx: 332, cy: 112, label: "Program" },
  { cx: 280, cy: 148, label: "Grants" },
];

/** Before/after: scattered pieces resolve into one connected center. */
export function FoundationDiagram({ centerLabel = "ONE" }: FoundationDiagramProps) {
  const hubX = 280;
  const hubY = 88;

  return (
    <figure className={styles.foundationFigure} aria-label="Scattered pieces gathered into one foundation">
      <div className={styles.foundationPanels}>
        <div className={styles.foundationPanel}>
          <p className={styles.foundationPanelLabel}>Scattered</p>
          <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            {SCATTERED.map((node) => (
              <g key={node.label}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="12"
                  fill="var(--color-ink-band-paper)"
                  stroke="var(--color-ink-band-border)"
                  strokeWidth="1.25"
                />
                <text
                  x={node.cx}
                  y={node.cy + 24}
                  textAnchor="middle"
                  fontFamily="var(--font-ink-mono)"
                  fontSize="7"
                  fill="var(--color-ink-band-ink-muted)"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className={styles.foundationArrow} aria-hidden="true">
          →
        </div>

        <div className={styles.foundationPanel}>
          <p className={styles.foundationPanelLabel}>Gathered</p>
          <svg viewBox="0 0 380 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <g stroke="var(--color-ink-band-border)" strokeWidth="1.25">
              {GATHERED.map((node) => (
                <line key={`line-${node.label}`} x1={hubX} y1={hubY} x2={node.cx} y2={node.cy} />
              ))}
            </g>
            <circle
              cx={hubX}
              cy={hubY}
              r="20"
              fill="var(--color-ink-band-paper)"
              stroke="var(--color-ink-band-blue)"
              strokeWidth="2"
            />
            <text
              x={hubX}
              y={hubY + 4}
              textAnchor="middle"
              fontFamily="var(--font-ink-mono)"
              fontSize="9"
              fill="var(--color-ink-band-blue)"
            >
              {centerLabel.slice(0, 6).toUpperCase()}
            </text>
            {GATHERED.map((node) => (
              <g key={node.label}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="12"
                  fill="var(--color-ink-band-paper)"
                  stroke="var(--color-ink-band-ink)"
                  strokeWidth="1"
                />
                <text
                  x={node.cx}
                  y={node.cy + 24}
                  textAnchor="middle"
                  fontFamily="var(--font-ink-mono)"
                  fontSize="7"
                  fill="var(--color-ink-band-ink-muted)"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </figure>
  );
}
