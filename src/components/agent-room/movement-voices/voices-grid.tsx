/* eslint-disable @next/next/no-img-element -- static leader portraits; same rationale as leader-band */
"use client";

import Link from "next/link";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import { COMMITTED_VOICES, voicePath } from "@/lib/committed-voices";

import styles from "./movement-voices.module.css";

/** Grid of Movement Voices — founders open in `/agent`; committed voices link to profiles. */
export function VoicesGrid() {
  return (
    <>
      <div className={styles.voiceGrid} role="list" aria-label="Founders and advisors">
        {LEADERS.map((leader, i) => (
          <Link
            key={leader.name}
            href={`/agent?leader=${i}`}
            className={styles.voiceTile}
            role="listitem"
          >
            <span className={styles.voicePortrait}>
              <img src={leader.img} alt="" />
            </span>
            <p className={styles.voiceName}>{leader.name}</p>
            <p className={styles.voiceCred}>{leader.cred}</p>
          </Link>
        ))}
      </div>

      <div className={styles.voiceSectionLabel}>Committed voices — full profiles</div>
      <div className={styles.voiceGrid} role="list" aria-label="Committed voices">
        {COMMITTED_VOICES.map((voice) => (
          <Link
            key={voice.slug}
            href={voicePath(voice.slug)}
            className={styles.voiceTile}
            role="listitem"
          >
            <span className={styles.voicePortrait}>
              {voice.portraitSrc ? (
                <img src={voice.portraitSrc} alt="" />
              ) : (
                <span className={styles.voiceInitials}>{voice.initials}</span>
              )}
            </span>
            <p className={styles.voiceName}>{voice.displayName}</p>
            <p className={styles.voiceCred}>{voice.role}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
