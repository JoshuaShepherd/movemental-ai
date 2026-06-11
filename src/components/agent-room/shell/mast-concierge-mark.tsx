import styles from "../ink-band.module.css";

/**
 * Typographic Concierge mark in the mast — tokens only, no avatar.
 * The "face" of the concierge is the hand + this wordmark (CON-01).
 */
export function MastConciergeMark() {
  return (
    <span className={styles.mastConcierge} aria-hidden>
      Concierge
    </span>
  );
}
