import styles from "../agent-room.module.css";

/** Free SafeGuide vs $1,000 SafeStart (static Phase-1 copy). */
export function PricingScreen() {
  return (
    <div className={styles.stageIn}>
      <p className={styles.eyebrow}>What it costs · plainly</p>
      <div className={styles.priceGrid}>
        <div className={styles.price}>
          <span className={styles.nm}>SafeGuide · self-directed</span>
          <div className={styles.amt}>Free</div>
          <p>
            The 33-page field guide. Your team builds the AI Charter itself.
            Genuinely sufficient on its own.
          </p>
          <p className={styles.meta}>PDF · you draft</p>
        </div>
        <div className={`${styles.price} ${styles.paid}`}>
          <span className={styles.nm}>SafeStart · facilitated</span>
          <div className={styles.amt}>$1,000</div>
          <p>
            We draft your five-layer Charter, customized to you. Your team
            revises and ratifies in a private dashboard.
          </p>
          <p className={styles.meta}>Two weeks, fixed · we draft, you ratify</p>
        </div>
      </div>
      <p className={styles.sub} style={{ marginTop: "1.5rem" }}>
        Sandbox, Skills, and Solutions come later, each in its turn. Most
        organizations should see where they stand before choosing.
      </p>
    </div>
  );
}
