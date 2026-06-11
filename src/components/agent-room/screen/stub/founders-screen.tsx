/* eslint-disable @next/next/no-img-element -- small static portraits with a
   custom grayscale→color hover filter; see leader-band for rationale. */
"use client";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";

/** The three founders (prototype `foundersHTML()`): Alan (0), Brad (1), Josh (8). */
const TEAM = [
  { i: 0, role: "Co-founder", line: "Missional theologian and author. Decades of work on how movements actually move." },
  { i: 1, role: "Co-founder", line: "Missional strategist. Helps organizations live their calling to be sent." },
  { i: 8, role: "Founder & CTO", line: "Builds the path, and the technology behind it." },
] as const;

export function FoundersTeam() {
  return (
    <div className={styles.team}>
      {TEAM.map((member) => {
        const leader = LEADERS[member.i];
        return (
          <div key={member.i} className={styles.tm}>
            <span className={styles.tph}>
              <img src={leader.img} alt={leader.name} />
            </span>
            <div>
              <b>{leader.name}</b>
              <span className={styles.role}>{member.role}</span>
              <span className={styles.tmLine}>{member.line}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FoundersScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Who’s behind Movemental</p>
      <p className={styles.q} style={{ marginBottom: "0.35rem" }}>
        A small team, connected to a wider network.
      </p>
      <p className={styles.body} style={{ marginTop: "0.35rem", marginBottom: "1.05rem" }}>
        Movemental is built by three founders. The path was built with the leaders you
        see on the home page.
      </p>

      <FoundersTeam />

      <p className={styles.honest}>Get in touch, we answer every message personally.</p>
    </div>
  );
}
