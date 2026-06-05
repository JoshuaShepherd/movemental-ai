import styles from "../agent-room.module.css";

/** Churches / nonprofits / seminaries (static Phase-1 copy). */
export function AudienceScreen() {
  return (
    <div className={`${styles.stageIn} ${styles.audience}`}>
      <p className={styles.eyebrow}>Who this is for</p>
      <p className={styles.say}>If your work runs on trust, this is for you.</p>
      <p className={styles.sub}>
        <b>Churches</b> — the pastoral and disclosure questions: sermons, member
        data, the pulpit.
        <br />
        <b>Nonprofits</b> — the fiduciary and donor-data questions your board
        owns.
        <br />
        <b>Seminaries &amp; institutions</b> — the three-constituency picture
        across faculty, students, and administration.
      </p>
    </div>
  );
}
