import styles from "../agent-room.module.css";

type Node = { init: string; name: string; inner: boolean };

const NAMES: Node[] = [
  { init: "AH", name: "Alan Hirsch", inner: true },
  { init: "BB", name: "Brad Brisco", inner: true },
  { init: "DF", name: "Dave Ferguson", inner: true },
  { init: "DH", name: "Deb Hirsch", inner: true },
  { init: "MF", name: "Michael Frost", inner: false },
  { init: "JW", name: "JR Woodward", inner: false },
  { init: "RS", name: "Rowland Smith", inner: false },
  { init: "LR", name: "Liz Rios", inner: false },
  { init: "JH", name: "Jon Huckins", inner: false },
  { init: "DW", name: "D. Strickland", inner: false },
  { init: "TC", name: "Tim Catchim", inner: false },
  { init: "BS", name: "Brian Sanders", inner: false },
];

const CX = 300;
const CY = 180;

type Pt = Node & { x: number; y: number };

function layout(): Pt[] {
  const pts: Pt[] = [];
  let innerIdx = 0;
  let outerIdx = 0;
  for (const n of NAMES) {
    const r = n.inner ? 72 : 140;
    const count = n.inner ? 4 : 8;
    const idx = n.inner ? innerIdx++ : outerIdx++;
    const a = ((-90 + idx * (360 / count)) * Math.PI) / 180;
    pts.push({ ...n, x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) * 0.74 });
  }
  return pts;
}

/** The connected-leaders constellation (static Phase-1 copy). */
export function NetworkScreen() {
  const pts = layout();
  const inner = pts.filter((p) => p.inner);
  const outer = pts.filter((p) => !p.inner);
  const ink = "var(--color-oat-ink)";

  return (
    <div className={styles.stageIn}>
      <p className={styles.eyebrow}>The network · leaders, connected</p>
      <div className={styles.conWrap}>
        <svg
          viewBox="0 0 600 360"
          role="img"
          aria-label="Movemental network — connected movement leaders linked to one another and to movemental.ai"
        >
          <g>
            {pts.map((p, i) => (
              <line
                key={`h${i}`}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke={ink}
                strokeOpacity={p.inner ? 0.38 : 0.14}
                strokeWidth={0.8}
              />
            ))}
            {inner.map((p, i) => {
              const q = inner[(i + 1) % inner.length];
              return (
                <line
                  key={`i${i}`}
                  x1={p.x}
                  y1={p.y}
                  x2={q.x}
                  y2={q.y}
                  stroke={ink}
                  strokeOpacity={0.28}
                  strokeWidth={0.8}
                />
              );
            })}
            {outer.map((p, i) => {
              const q = inner[i % inner.length];
              return (
                <line
                  key={`o${i}`}
                  x1={p.x}
                  y1={p.y}
                  x2={q.x}
                  y2={q.y}
                  stroke={ink}
                  strokeOpacity={0.12}
                  strokeWidth={0.7}
                />
              );
            })}
          </g>
          <g>
            <circle cx={CX} cy={CY} r={24} fill="var(--color-oat-hero-dark)" />
            <text
              x={CX}
              y={CY + 3}
              textAnchor="middle"
              style={{ fontFamily: "var(--font-oat-display)", fontSize: 12, fill: "var(--color-oat-ai-text)" }}
            >
              movemental
            </text>
          </g>
          <g>
            {pts.map((p, i) => {
              const rr = p.inner ? 8.5 : 6.5;
              return (
                <g key={`n${i}`}>
                  <circle cx={p.x} cy={p.y} r={rr} fill="var(--color-oat-bg)" stroke={ink} strokeWidth={1.2} />
                  <text
                    x={p.x}
                    y={p.y + 0.4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontFamily: "var(--font-oat-mono)", fontSize: 7.5, fill: ink, fontWeight: 500 }}
                  >
                    {p.init}
                  </text>
                  <text
                    x={p.x}
                    y={p.y + rr + 9}
                    textAnchor="middle"
                    style={{ fontFamily: "var(--font-oat-mono)", fontSize: 7.5, fill: "var(--color-oat-ink-muted)" }}
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <p className={styles.sub}>
        These aren&rsquo;t bought endorsements — they&rsquo;re leaders who&rsquo;ve
        done the work for decades, now connected to one another and to Movemental.
        They&rsquo;re also the first node of something larger: we build connected
        networks, not lone websites, because in an AI-shaped internet the isolated
        disappear and the connected compound.
      </p>
    </div>
  );
}
