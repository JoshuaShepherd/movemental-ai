/* eslint-disable @next/next/no-img-element -- static founder portrait */
import Link from "next/link";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import type { FounderProfile } from "@/lib/founders/content";

import styles from "./founder-profile.module.css";

type FounderProfilePageProps = {
  profile: FounderProfile;
};

/**
 * Full founder profile at `/about/[slug]` — medium bio opening, full bio body,
 * arc, selected work, skills strip, and optional trust line (Josh).
 */
export function FounderProfilePage({ profile }: FounderProfilePageProps) {
  return (
    <InkBandUtilityShell>
      <article className={styles.layout}>
        <Link className={styles.back} href="/agent/about#the-founders">
          ← About Movemental
        </Link>

        <p className={styles.eyebrow}>Founder profile</p>
        <h1 className={styles.title}>{profile.name}</h1>
        <p className={styles.role}>{profile.jobTitle}</p>
        <img className={styles.portrait} src={profile.portrait} alt={profile.name} loading="eager" />

        <p className={styles.medium}>{profile.mediumBio}</p>

        {profile.fullBio.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={styles.body}>
            {paragraph}
          </p>
        ))}

        {profile.trustLine ? (
          <div className={styles.trust}>
            <p>{profile.trustLine}</p>
          </div>
        ) : null}

        <section className={styles.section} aria-labelledby="founder-arc">
          <p className={styles.sectionLabel} id="founder-arc">
            The arc
          </p>
          <h2 className={styles.sectionTitle}>Career timeline</h2>
          <ol className={styles.timeline}>
            {profile.arc.map((entry) => (
              <li key={entry.period} className={styles.timelineItem}>
                <span className={styles.timelinePeriod}>{entry.period}</span>
                <p className={styles.timelineDetail}>{entry.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="founder-work">
          <p className={styles.sectionLabel} id="founder-work">
            Selected work
          </p>
          <h2 className={styles.sectionTitle}>Credibility list</h2>
          <ul className={styles.workList}>
            {profile.selectedWork.map((item) => (
              <li key={item.title} className={styles.workItem}>
                <span className={styles.workTitle}>{item.title}</span>
                <span className={styles.workDetail}>{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="founder-skills">
          <p className={styles.sectionLabel} id="founder-skills">
            Skills & formation
          </p>
          <h2 className={styles.sectionTitle}>Skills and formation</h2>
          <div className={styles.skills}>
            {profile.skills.map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      </article>
    </InkBandUtilityShell>
  );
}
