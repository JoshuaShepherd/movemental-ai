/* eslint-disable @next/next/no-img-element -- static leader portraits; same rationale as leader-band */
"use client";

import Link from "next/link";

import { LEADERS } from "@/lib/agent-room/data/leaders";

import styles from "./movement-voices.module.css";

/** Grid of Movement Voices — each tile opens the leader profile in `/agent`. */
export function VoicesGrid() {
  return (
    <div className={styles.voiceGrid} role="list">
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
  );
}
