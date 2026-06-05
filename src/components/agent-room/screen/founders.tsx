import styles from "../agent-room.module.css";

/** Who stands behind this (static Phase-1 copy). */
export function FoundersScreen() {
  return (
    <div className={styles.stageIn}>
      <p className={styles.eyebrow}>Who stands behind this</p>
      <p className={styles.say}>
        Leaders who&rsquo;ve done the work for decades — and put their names on it.
      </p>
      <p className={styles.sub}>
        &ldquo;Alan Hirsch, Brad Brisco, and the leaders in this network help
        shape what we build for churches, nonprofits, and seminaries — and they
        put their names on it.&rdquo;
      </p>
      <p className={styles.sub} style={{ fontFamily: "var(--font-oat-mono)", fontSize: "0.75rem", letterSpacing: "0.04em" }}>
        © 2026 Movemental, LLC · Volume One · Field Edition · josh@movemental.ai
      </p>
    </div>
  );
}
