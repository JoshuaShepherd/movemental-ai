"use client";

/* eslint-disable @next/next/no-img-element -- remote leader headshots from the shared media library */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ARC_EXCLUDE, KNOWN_FOR } from "../leaders/known-for";
import { LEADERS } from "../leaders/leaders";
import { MV_ROUTES, leaderHref } from "../routes";

/**
 * The first screen: the headline inside an arc of the movement leaders who shape Movemental.
 * Board: canvas "Resolve: Fourteen Questions", Home-Resolve (the arc) and Home-Phone.
 *
 * One leader is active at a time; a name card under their face says who they are and what
 * they are known for. Hover or focus makes a leader active. Otherwise the card moves through
 * the leaders once, then stops (WCAG 2.2.2), and never moves for reduced motion.
 */

// Geometry is defined on a 1440 x 740 stage and expressed in percentages, so the arc scales
// with the page. Faces sit at equal distances along a 240-degree ellipse, open at the bottom.
const W = 1440;
const H = 740;
const CX = 720;
const CY = 470;
const RX = 630;
const RY = 420;
const ROTS = [-10, 8, -5, 12, -8, 5, -12, 10, -6, 11, -9, 4];
const ROTATE_MS = 3200;

function arcPoints(n: number): [number, number][] {
  const t0 = (210 * Math.PI) / 180;
  const sweep = (240 * Math.PI) / 180;
  const steps = 4000;
  const pts: [number, number][] = [];
  const len = [0];
  for (let i = 0; i <= steps; i++) {
    const t = t0 - (sweep * i) / steps;
    pts.push([CX + RX * Math.cos(t), CY - RY * Math.sin(t)]);
    if (i) len.push(len[i - 1]! + Math.hypot(pts[i]![0] - pts[i - 1]![0], pts[i]![1] - pts[i - 1]![1]));
  }
  const total = len[steps]!;
  const out: [number, number][] = [];
  let j = 0;
  for (let k = 0; k < n; k++) {
    const target = (k / (n - 1)) * total;
    while (j < steps && len[j]! < target) j++;
    out.push([Math.round(pts[j]![0]), Math.round(pts[j]![1])]);
  }
  return out;
}

const PEOPLE = LEADERS.filter((l) => !ARC_EXCLUDE.has(l.slug));
const POINTS = arcPoints(PEOPLE.length);
const TILES = PEOPLE.map((l, i) => {
  const [x, y] = POINTS[i]!;
  return {
    slug: l.slug,
    name: l.name.replace(" & ", " and "),
    known: KNOWN_FOR[l.slug] ?? "",
    photo: l.photo,
    x,
    y,
    r: ROTS[i % ROTS.length]!,
    delay: 0.1 + i * 0.03,
  };
});
const START = Math.max(0, TILES.findIndex((t) => t.slug === "alan-hirsch"));

export function LeadersArc() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(START);
  const [held, setHeld] = useState(false);
  const [stageW, setStageW] = useState(W);
  const steps = useRef(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStageW(e!.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (held || steps.current >= TILES.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      steps.current += 1;
      if (steps.current >= TILES.length) window.clearInterval(id);
      setActive((a) => (a + 1) % TILES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [held]);

  const cur = TILES[active]!;
  // Keep the card on the stage; the caret stays over the face.
  const scale = stageW / W;
  const half = 124;
  const faceX = cur.x * scale;
  const cardX = Math.min(stageW - half, Math.max(half, faceX));

  return (
    <section id="top" className="mv-arc" aria-labelledby="mv-arc-title">
      <div className="mv-arc-stage" ref={stageRef}>
        <ul className="mv-arc-ring" aria-label="The leaders who shape Movemental">
          {TILES.map((t, i) => {
            const on = i === active;
            return (
              <li
                key={t.slug}
                className="mv-arc-tile"
                style={
                  {
                    left: `${(t.x / W) * 100}%`,
                    top: `${(t.y / H) * 100}%`,
                    "--bx": `${(((CX - t.x) / W) * 100).toFixed(2)}cqi`,
                    "--by": `${(((CY - t.y) / W) * 100).toFixed(2)}cqi`,
                    animationDelay: `${t.delay.toFixed(2)}s`,
                    zIndex: on ? 5 : 1,
                  } as React.CSSProperties
                }
              >
                <Link
                  href={leaderHref(t.slug)}
                  className="mv-arc-face"
                  data-on={on}
                  aria-label={t.known ? `${t.name}, ${t.known}` : t.name}
                  style={{ "--r": `${on ? 0 : t.r}deg` } as React.CSSProperties}
                  onMouseEnter={() => {
                    setActive(i);
                    setHeld(true);
                  }}
                  onFocus={() => {
                    setActive(i);
                    setHeld(true);
                  }}
                  onMouseLeave={() => setHeld(false)}
                  onBlur={() => setHeld(false)}
                >
                  <img src={t.photo} alt="" loading={i < 8 ? "eager" : "lazy"} decoding="async" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="mv-arc-card"
          aria-hidden="true"
          style={{ left: cardX, top: `calc(${(cur.y / H) * 100}% + var(--mv-arc-tile) * 0.57 + 12px)` }}
        >
          <div className="mv-arc-card-in" key={cur.slug}>
            <span className="mv-arc-caret" style={{ left: `calc(50% + ${Math.round(faceX - cardX)}px)` }} />
            <p className="mv-arc-name">{cur.name}</p>
            {cur.known ? <p className="mv-arc-known">{cur.known}</p> : null}
          </div>
        </div>

        <div className="mv-arc-copy">
          <h1 id="mv-arc-title" className="mv-arc-h1">
            Movemental is an organizational response to AI, shaped by nonprofit, church, and
            seminary leaders.
          </h1>
          <p className="mv-hl-sub mv-arc-sub">Say what you believe about AI in your organization.</p>
          <Link className="mv-hl-go mv-arc-go" href={MV_ROUTES.resolve}>
            Start with Resolve
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
          <p className="mv-hl-note">Fourteen questions. About twelve minutes. No account.</p>
        </div>
      </div>

      <div className="mv-arc-strip-wrap">
        <h2 className="mv-arc-strip-h">The leaders who shape Movemental</h2>
        <ul className="mv-arc-strip">
          {TILES.map((t) => (
            <li key={t.slug}>
              <Link href={leaderHref(t.slug)}>
                <img src={t.photo} alt="" loading="lazy" decoding="async" />
                <span className="mv-arc-name">{t.name}</span>
                {t.known ? <span className="mv-arc-known">{t.known}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
