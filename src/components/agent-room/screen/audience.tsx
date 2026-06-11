import styles from "../ink-band.module.css";
import { AudiencePicker } from "./audience-picker";

/** Churches / nonprofits / seminaries as a split-screen role picker (§3.5). */
export function AudienceScreen() {
  return (
    <div className={`${styles.stageIn} ${styles.audience}`}>
      <p className={styles.eyebrow}>Who this is for</p>
      <p className={styles.say}>If your work runs on trust, this is for you.</p>
      <AudiencePicker />
    </div>
  );
}
