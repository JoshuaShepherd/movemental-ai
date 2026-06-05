import styles from "../agent-room.module.css";

const FACES: [string, string][] = [
  ["AH", "Alan Hirsch"],
  ["BB", "Brad Brisco"],
  ["DF", "Dave Ferguson"],
  ["MF", "Michael Frost"],
  ["DH", "Deb Hirsch"],
  ["JW", "JR Woodward"],
];

/**
 * The room's initial screen state — the host's opening. Not a `ComponentId`
 * (the agent cannot render it); it is the home state the surface boots into and
 * returns to on "start over". A `ui_render` replaces it.
 */
export function OpeningHero() {
  return (
    <div className={styles.stageIn}>
      <p className={styles.eyebrow}>Movemental</p>
      <h1 className={`${styles.opH} ${styles.opLine}`} style={{ animationDelay: "0ms" }}>
        AI is already inside your organization.{" "}
        <em>The work now is to get it right.</em>
      </h1>
      <p className={`${styles.opSay} ${styles.opLine}`} style={{ animationDelay: "120ms" }}>
        Your people are already using it — on emails, donor letters, sermons —
        usually with no policy and no one deciding what&rsquo;s wise. The thing
        most at risk isn&rsquo;t the technology. It&rsquo;s the{" "}
        <span className={styles.hl}>trust your work depends on.</span>
      </p>
      <div className={`${styles.faces} ${styles.opLine}`} style={{ animationDelay: "240ms" }}>
        <div className={styles.facesLabel}>Built with — and vouched for by</div>
        <div className={styles.facesRow}>
          {FACES.map(([init, name]) => (
            <div key={init} className={styles.face}>
              <span className={styles.faceAv}>{init}</span>
              <span className={styles.faceNm}>{name}</span>
            </div>
          ))}
        </div>
        <p className={styles.facesMore}>
          &hellip;and a growing network of leaders the field already trusts.
        </p>
      </div>
      <p className={`${styles.opInvite} ${styles.opLine}`} style={{ animationDelay: "360ms" }}>
        I&rsquo;m here for one thing: helping you see where your organization
        actually stands with AI — and what to do next. Want to find out? Tell me
        about your organization, or ask me anything.
      </p>
    </div>
  );
}
