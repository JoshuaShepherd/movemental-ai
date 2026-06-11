import Link from "next/link";

import type { Profile } from "@/lib/agent-room/data/profiles";
import {
  authorshipReason,
  movementVoicesSceniusLine,
} from "@/lib/agent-room/profile-template";

import styles from "../../ink-band.module.css";

function NotableWorksSection({ works }: { works: Profile["notableWorks"] }) {
  if (works?.length) {
    return (
      <ul className={styles.notableWorks}>
        {works.map((item) => (
          <li key={item.title} className={styles.notableWorkItem}>
            <strong>{item.title}</strong>
            <span>{item.line}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className={styles.needsResearch}>Notable works — needs research.</p>;
}

type LeaderProfileContentProps = {
  leaderName: string;
  profile: Profile;
};

/**
 * Phase 5 leader profile template — consistent depth for every Movement Voice.
 * Missing research surfaces as visible placeholders, never collapsed sections.
 */
export function LeaderProfileContent({ leaderName, profile }: LeaderProfileContentProps) {
  return (
    <>
      {profile.lede ? (
        <p className={`${styles.leadLede} ${styles.fade}`}>{profile.lede}</p>
      ) : null}

      <p className={`${styles.leadBio} ${styles.fade}`}>{profile.bio}</p>

      <p className={`${styles.authorshipNote} ${styles.fade}`}>{authorshipReason(leaderName)}</p>

      <div className={`${styles.sec} ${styles.fade}`}>
        <p className={styles.secLabel}>Their work</p>
        <div className={styles.layers}>
          {profile.work.map((w) => (
            <div key={w.t} className={styles.layer}>
              <span className={styles.ln}>—</span>
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

      <div className={`${styles.sec} ${styles.fade}`}>
        <p className={styles.secLabel}>In their words / notable work</p>
        <NotableWorksSection works={profile.notableWorks} />
      </div>

      <div className={`${styles.sec} ${styles.fade}`}>
        <p className={styles.secLabel}>Signature idea</p>
        {profile.pullQuote ? (
          <blockquote className={styles.leaderPullQuote}>{profile.pullQuote}</blockquote>
        ) : (
          <p className={styles.needsResearch}>Pull quote — needs research.</p>
        )}
      </div>
    </>
  );
}
