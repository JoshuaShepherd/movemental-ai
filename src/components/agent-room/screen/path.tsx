import styles from "../agent-room.module.css";

const REST = [
  ["02", "Sandbox", "test AI against real work, without risk."],
  ["03", "Skills", "form the people who’ll steward it."],
  ["04", "Solutions", "build the tools your work needs."],
];

/** The Safety-dominant four-step path (static Phase-1 copy; the host narrates it). */
export function PathScreen() {
  return (
    <div className={styles.stageIn}>
      <p className={styles.eyebrow}>The path · four steps, in order</p>
      <div className={styles.path2}>
        <article className={styles.leadStage}>
          <div className={styles.rn}>01.</div>
          <h3>Safety</h3>
          <p>
            Get your arms around AI responsibly — a ratified charter your board
            can stand behind, before anything else.
          </p>
          <div className={styles.leadFork}>
            <span>
              <b>Lead it internally.</b> The method and field guide are free.
            </span>
            <span>
              <b>Have us guide it.</b> Two weeks, $1,000 — we draft, you ratify.
            </span>
          </div>
        </article>
        <aside>
          <p className={styles.restLabel}>Then, each in its turn —</p>
          {REST.map(([n, title, desc]) => (
            <div key={n} className={styles.restRow}>
              <span className={styles.rn}>{n}.</span>
              <div>
                <b>{title}</b> — {desc}
              </div>
            </div>
          ))}
        </aside>
      </div>
      <p className={styles.sub} style={{ marginTop: "1.5rem" }}>
        Each earns the next; skip a step and the rest have nothing to stand on.
        The honest way to know which step is actually yours is to look at your own
        situation.
      </p>
    </div>
  );
}
