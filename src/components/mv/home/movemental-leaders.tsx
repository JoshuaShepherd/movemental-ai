"use client";

/* eslint-disable @next/next/no-img-element -- remote leader headshots from the shared media library */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Rosette } from "../brand/mark";
import { LN_EDGES, LN_FIELD, LN_NODES, LN_PATHS, LN_PULSES, LN_STARS } from "../data/leaders-network";
import { LEADERS } from "../leaders/leaders";
import { leaderHref } from "../routes";

const ROTATE_MS = 4200;
const BY_SLUG = new Map(LEADERS.map((l) => [l.slug, l]));
const NODES = LN_NODES.flatMap((n) => {
  const leader = BY_SLUG.get(n.slug);
  return leader ? [{ ...n, leader }] : [];
});
const START = Math.max(0, NODES.findIndex((n) => n.slug === "alan-hirsch"));

/**
 * Movemental Leaders: every leader as a node in one network, under a branded title. The featured
 * leader is shown as the author of one Resolution statement; their name opens their profile.
 * Rotates until someone picks a face. Board: Home-Headline-C.
 */
export function MovementalLeaders() {
  const [focus, setFocus] = useState(START);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (pinned) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFocus((f) => (f + 1) % NODES.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [pinned]);

  const neighbors = useMemo(() => {
    const set = new Set<number>();
    for (const [a, b] of LN_EDGES) {
      if (a === focus) set.add(b);
      if (b === focus) set.add(a);
    }
    return set;
  }, [focus]);

  const featured = NODES[focus];

  return (
    <section className="mv-ml" aria-labelledby="mv-ml-title">
      <div className="mv-ml-head">
        <Rosette size={34} className="mv-ml-mark" />
        <h2 id="mv-ml-title" className="mv-ml-title">
          Movemental Leaders
        </h2>
      </div>

      <div className="mv-ml-field">
        <svg viewBox={`0 0 ${LN_FIELD.w} ${LN_FIELD.h}`} aria-hidden="true">
          {LN_STARS.map(([cx, cy], i) => (
            <circle key={`s${i}`} cx={cx} cy={cy} r={0.8} className="mv-network-star" />
          ))}
          {LN_PATHS.map((d, i) => {
            const [a, b] = LN_EDGES[i];
            return <path key={`e${i}`} d={d} className="mv-network-edge" data-active={a === focus || b === focus} vectorEffect="non-scaling-stroke" />;
          })}
          {LN_PATHS.map((d, i) => {
            const [a, b] = LN_EDGES[i];
            const [duration, delay] = LN_PULSES[i];
            return (
              <path
                key={`p${i}`}
                d={d}
                className="mv-network-pulse"
                data-active={a === focus || b === focus}
                vectorEffect="non-scaling-stroke"
                style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
              />
            );
          })}
        </svg>
        {NODES.map((n, i) => {
          const state = i === focus ? "focus" : neighbors.has(i) ? "near" : "far";
          return (
            <button
              key={n.slug}
              type="button"
              className="mv-node mv-ml-node"
              data-state={state}
              aria-pressed={i === focus}
              aria-label={n.leader.credential ? `${n.leader.name}, ${n.leader.credential}` : n.leader.name}
              title={n.leader.name}
              onClick={() => {
                setFocus(i);
                setPinned(true);
              }}
              style={{
                left: `${((n.x / LN_FIELD.w) * 100).toFixed(2)}%`,
                top: `${((n.y / LN_FIELD.h) * 100).toFixed(2)}%`,
                zIndex: i === focus ? 3 : 1,
              }}
            >
              <img src={n.leader.photo} alt="" loading="lazy" />
            </button>
          );
        })}
      </div>

      <figure className="mv-ml-quote" aria-live="polite">
        <blockquote>
          <p>“{featured.quote}”</p>
        </blockquote>
        <figcaption>
          <Link className="mv-ml-name" href={leaderHref(featured.slug)}>
            {featured.leader.name}
          </Link>
          {featured.leader.credential ? <span className="mv-ml-cred">{featured.leader.credential}</span> : null}
        </figcaption>
      </figure>
    </section>
  );
}
