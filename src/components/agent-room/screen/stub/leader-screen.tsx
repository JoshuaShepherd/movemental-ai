/* eslint-disable @next/next/no-img-element -- the hero portrait uses the same
   grayscale→color filter as the band and is morphed imperatively by the FLIP;
   next/image adds no value here and complicates the transform. */
"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import {
  getProfile,
  getProfileAsync,
  type Profile,
  type ProfileNotableWork,
} from "@/lib/agent-room/data/profiles";
import styles from "../../ink-band.module.css";
import { Crumb, LayerRow } from "./chrome";
import { takePendingFlip } from "./leader-flip";
import type { ScreenProps } from "./stub-screen";

function NotableWorksSection({ works }: { works: ProfileNotableWork[] | undefined }) {
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

/**
 * Per-leader profile — one consistent scope for every leader in the network.
 */
export function LeaderScreen({ opts, onHome, stream }: ScreenProps) {
  const i = opts.id ?? 0;
  const leader = LEADERS[i] ?? { name: "", cred: "", img: "" };
  const [profile, setProfile] = useState<Profile | null>(() => getProfile(i));

  const isStream = !!stream;
  useEffect(() => {
    if (!isStream) return;
    let alive = true;
    void getProfileAsync(i).then((p) => {
      if (alive) setProfile(p);
    });
    return () => {
      alive = false;
    };
  }, [i, isStream]);

  useLayoutEffect(() => {
    const from = takePendingFlip();
    const hero = document.getElementById("leaderHero");
    if (!from || !hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const to = hero.getBoundingClientRect();
    const scale = from.width / to.width;
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const img = hero.querySelector("img");

    hero.style.transformOrigin = "top left";
    hero.style.transition = "none";
    hero.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    void hero.getBoundingClientRect();
    requestAnimationFrame(() => {
      hero.style.transition = "transform 0.52s cubic-bezier(0.2, 0.7, 0.2, 1)";
      hero.style.transform = "none";
      if (img instanceof HTMLElement) img.style.filter = "none";
    });
  }, [i]);

  return (
    <div>
      <Crumb onHome={onHome} />
      <div className={styles.leadHead}>
        <span className={styles.leadHero} id="leaderHero">
          <img src={leader.img} alt={leader.name} />
        </span>
        <div className={`${styles.leadMeta} ${styles.fade}`}>
          <h1>{leader.name}</h1>
          <p className={styles.leadRole}>{leader.cred}</p>
        </div>
      </div>

      {profile ? (
        <>
          <p className={`${styles.leadBio} ${styles.fade}`}>{profile.bio}</p>

          <div className={`${styles.sec} ${styles.fade}`}>
            <p className={styles.secLabel}>Their work</p>
            <div className={styles.layers}>
              {profile.work.map((w) => (
                <LayerRow key={w.t} n="—" title={w.t} g={w.g} />
              ))}
            </div>
          </div>

          <div className={`${styles.sec} ${styles.fade}`}>
            <p className={styles.secLabel}>How they connect</p>
            <p className={styles.body} style={{ marginTop: "0.2rem" }}>
              {profile.connection}
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
      ) : (
        <>
          <p className={`${styles.leadBio} ${styles.fade}`}>
            {leader.name} is one of the leaders Movemental built the path with. A fuller
            profile will live here.
          </p>
          <p className={`${styles.honest} ${styles.fade}`}>
            Connected to Movemental, and to the other leaders in the network.
          </p>
        </>
      )}
    </div>
  );
}
