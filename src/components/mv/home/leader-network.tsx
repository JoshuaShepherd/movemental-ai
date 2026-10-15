"use client";

/* eslint-disable @next/next/no-img-element -- remote leader headshots from the shared media library; same rationale as voices-grid */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  NETWORK_EDGE_PATHS,
  NETWORK_EDGES,
  NETWORK_LEADERS,
  NETWORK_PULSE_TIMING,
  NETWORK_STARS,
} from "../data/network";
import { MV_ROUTES } from "../routes";

/** Index of JR Woodward, the leader the figure opens on (per the revision spec). */
const START_INDEX = NETWORK_LEADERS.findIndex((l) => l.slug === "jr-woodward");
const ROTATE_MS = 3800;

/**
 * The dark leader network beside the hero. Rotates focus every few seconds until a person
 * picks a leader; the focused leader's ties light up. Ported from the canvas board.
 */
export function LeaderNetwork() {
  const [focus, setFocus] = useState(START_INDEX < 0 ? 0 : START_INDEX);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (pinned) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setFocus((f) => (f + 1) % NETWORK_LEADERS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [pinned]);

  const neighbors = useMemo(() => {
    const set = new Set<number>();
    for (const [a, b] of NETWORK_EDGES) {
      if (a === focus) set.add(b);
      if (b === focus) set.add(a);
    }
    return set;
  }, [focus]);

  const leader = NETWORK_LEADERS[focus];

  return (
    <figure className="mv-stack" style={{ gap: 16 }}>
      <div className="mv-network">
        <svg viewBox="0 0 600 600" aria-hidden="true">
          {NETWORK_STARS.map(([cx, cy], i) => (
            <circle key={`s${i}`} cx={cx} cy={cy} r={0.7} className="mv-network-star" />
          ))}
          <g>
            {NETWORK_EDGE_PATHS.map((d, i) => {
              const [a, b] = NETWORK_EDGES[i];
              return (
                <path
                  key={`e${i}`}
                  d={d}
                  className="mv-network-edge"
                  data-active={a === focus || b === focus}
                />
              );
            })}
          </g>
          <g>
            {NETWORK_EDGE_PATHS.map((d, i) => {
              const [a, b] = NETWORK_EDGES[i];
              const [duration, delay] = NETWORK_PULSE_TIMING[i];
              return (
                <path
                  key={`p${i}`}
                  d={d}
                  className="mv-network-pulse"
                  data-active={a === focus || b === focus}
                  style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
                />
              );
            })}
          </g>
        </svg>
        {NETWORK_LEADERS.map((l, i) => {
          const state = i === focus ? "focus" : neighbors.has(i) ? "near" : "far";
          return (
            <button
              key={l.slug}
              type="button"
              className="mv-node"
              data-state={state}
              aria-pressed={i === focus}
              aria-label={`${l.name}, ${l.credential}`}
              title={l.name}
              onClick={() => {
                setFocus(i);
                setPinned(true);
              }}
              style={{
                left: `${(l.x / 6).toFixed(2)}%`,
                top: `${(l.y / 6).toFixed(2)}%`,
                width: i === focus ? "8%" : "6.6%",
                zIndex: i === focus ? 3 : 1,
              }}
            >
              <img src={l.image} alt="" loading="lazy" />
            </button>
          );
        })}
        <div className="mv-network-label" aria-live="polite">
          <p className="mv-network-name">{leader.name}</p>
          <p className="mv-network-cred">{leader.credential}</p>
          {/* TODO(S05-leaders-new): link each leader to /leaders-new/[slug]. */}
          <Link className="mv-network-link" href={MV_ROUTES.leaders}>
            View profile →
          </Link>
        </div>
      </div>
      <figcaption className="mv-caption mv-muted" style={{ maxWidth: 540, fontSize: 14.5 }}>
        Movement leaders working through these questions in their own organizations.{" "}
        <Link href={MV_ROUTES.leaders} className="mv-muted">
          Explore the people and practices behind Movemental.
        </Link>
      </figcaption>
    </figure>
  );
}
