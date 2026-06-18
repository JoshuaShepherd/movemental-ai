/* eslint-disable @next/next/no-img-element -- small static portraits with a
   custom grayscale→color hover filter; see leader-band for rationale. */
"use client";

import type { FoundersScreenProps } from "@/lib/agent-room/component-props";
import { LEADERS } from "@/lib/agent-room/data/leaders";
import { ABOUT_FOUNDER_SLUGS, FOUNDER_PROFILES } from "@/lib/founders/content";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";

/** The three founders: Alan, Brad, Josh — titles from founders SSOT. */
const TEAM = ABOUT_FOUNDER_SLUGS.map((slug) => {
  const profile = FOUNDER_PROFILES[slug];
  return {
    i: profile.leaderIndex,
    role: profile.jobTitle,
    line: profile.oneLine,
  };
});

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

export function FoundersScreen({ onHome, stream }: ScreenProps) {
  const introLine = (stream?.props as FoundersScreenProps | undefined)?.introLine;
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Who’s behind Movemental</p>
      {introLine ? (
        <p className={styles.body} style={{ marginTop: "0.35rem", marginBottom: "0.85rem" }}>
          {introLine}
        </p>
      ) : (
        <p className={styles.q} style={{ marginBottom: "0.35rem" }}>
          A small team, connected to a wider network.
        </p>
      )}
      <p className={styles.body} style={{ marginTop: "0.35rem", marginBottom: "1.05rem" }}>
        Movemental is built by three founders. The path was built with the leaders you
        see on the home page.
      </p>

      <FoundersTeam />

      <p className={styles.honest}>Get in touch, we answer every message personally.</p>
    </div>
  );
}
