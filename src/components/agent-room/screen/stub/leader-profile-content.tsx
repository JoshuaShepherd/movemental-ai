import Link from "next/link";

import type { Profile } from "@/lib/agent-room/data/profiles";
import {
  authorshipReason,
  movementVoicesSceniusLine,
} from "@/lib/agent-room/profile-template";

import styles from "../../ink-band.module.css";

type LeaderProfileContentProps = {
  leaderName: string;
  profile: Profile;
};

/**
 * Phase 5 leader profile template — consistent depth for every Movement Voice.
 * Optional sections render only when profile data exists.
 */
export function LeaderProfileContent({ leaderName, profile }: LeaderProfileContentProps) {
  return (
    <>
      {profile.lede ? (
        <p className={`${styles.leadLede} ${styles.fade}`}>{profile.lede}</p>
      ) : null}

      {profile.bio.split(/\n\n+/).map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={`${styles.leadBio} ${styles.fade}`}>
          {paragraph}
        </p>
      ))}

      <p className={`${styles.authorshipNote} ${styles.fade}`}>{authorshipReason(leaderName)}</p>

      <div className={`${styles.sec} ${styles.fade}`}>
        <p className={styles.secLabel}>Their work</p>
        <div className={styles.layers}>
          {profile.work.map((w) => (
            <div key={w.t} className={styles.layer}>
              <span className={styles.ln}>·</span>
              <span>
                <b>{w.t}</b> <span className={styles.g}>{w.g}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.sec} ${styles.fade}`}>
        <p className={styles.secLabel}>How they connect</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          {profile.connection}
        </p>
        <p className={styles.body} style={{ marginTop: "0.85rem" }}>
          {movementVoicesSceniusLine(leaderName)}
        </p>
        <p className={styles.movementVoicesLinkWrap}>
          <Link href="/agent/movement-voices" className={styles.movementVoicesLink}>
            Movement Voices network →
          </Link>
        </p>
      </div>

      {profile.notableWorks?.length ? (
        <div className={`${styles.sec} ${styles.fade}`}>
          <p className={styles.secLabel}>In their words / notable work</p>
          <ul className={styles.notableWorks}>
            {profile.notableWorks.map((item) => (
              <li key={item.title} className={styles.notableWorkItem}>
                <strong>{item.title}</strong>
                <span>{item.line}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {profile.pullQuote ? (
        <div className={`${styles.sec} ${styles.fade}`}>
          <p className={styles.secLabel}>Signature idea</p>
          <blockquote className={styles.leaderPullQuote}>{profile.pullQuote}</blockquote>
        </div>
      ) : null}
    </>
  );
}
