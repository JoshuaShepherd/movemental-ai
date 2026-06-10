"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

import { FOLDER_ROOTS } from "./corpus-data";
import styles from "./fragmentation-deck.module.css";
import { IntegrationBrowser } from "./integration-browser";

gsap.registerPlugin(ScrollTrigger);

const STAGE_NAMES = [
  "Fragmentation",
  "Integration",
  "Activation",
  "Formation",
  "Multiplication",
  "Movement",
] as const;

/* --------------------------------------------------------------------------
   Shared SVG icons — reused by the Integration folder grid.
-------------------------------------------------------------------------- */
function FolderIconSymbols() {
  return (
    <defs>
      <symbol id="fd-ico-folder" viewBox="0 0 24 24">
        <path
          d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinejoin="round"
        />
      </symbol>
    </defs>
  );
}

/* --------------------------------------------------------------------------
   Per-stage viz components. Kept close to the GSAP HTML originals for
   parity; only the Integration viz is new (interactive folder grid).
-------------------------------------------------------------------------- */

function FragmentationViz() {
  const images = [
    { src: "/images/fragmentation-story/book-fragments-of-form.webp", x: 70, y: 50, w: 42, h: 54, d: "0s", rot: -8 },
    { src: "/images/fragmentation-story/core-hub-to-fragment-nodes.webp", x: 160, y: 80, w: 40, h: 52, d: ".4s", rot: 12 },
    { src: "/images/fragmentation-story/cover-principles-design-fragmentation.webp", x: 250, y: 40, w: 38, h: 50, d: ".8s", rot: -5 },
    { src: "/images/fragmentation-story/cover-structural-fragments-investigation.webp", x: 340, y: 90, w: 42, h: 54, d: "1.2s", rot: 15 },
    { src: "/images/fragmentation-story/email-thread-multi-participant.webp", x: 430, y: 50, w: 40, h: 52, d: "1.6s", rot: -10 },
    { src: "/images/fragmentation-story/formal-design-systems-split-flow.webp", x: 520, y: 100, w: 38, h: 50, d: "2.0s", rot: 7 },
    { src: "/images/fragmentation-story/message-thread-staggered-fragments.webp", x: 80, y: 200, w: 42, h: 54, d: ".2s", rot: 8 },
    { src: "/images/fragmentation-story/mobile-chat-skeleton-bubbles.webp", x: 200, y: 230, w: 40, h: 52, d: ".6s", rot: -12 },
    { src: "/images/fragmentation-story/module-formal-systems-intro.webp", x: 300, y: 190, w: 38, h: 50, d: "1.0s", rot: 10 },
    { src: "/images/fragmentation-story/order-of-service-structured-units.webp", x: 395, y: 240, w: 42, h: 54, d: "1.4s", rot: -7 },
    { src: "/images/fragmentation-story/podcast-card-abstract-structures.webp", x: 490, y: 210, w: 40, h: 52, d: "1.8s", rot: 13 },
    { src: "/images/fragmentation-story/session-essential-structures-card.webp", x: 130, y: 350, w: 38, h: 50, d: ".3s", rot: -5 },
    { src: "/images/fragmentation-story/sketch-converge-diverge-flow.webp", x: 270, y: 380, w: 42, h: 54, d: ".7s", rot: 11 },
    { src: "/images/fragmentation-story/stage-presentation-three-shapes.webp", x: 430, y: 360, w: 40, h: 52, d: "1.1s", rot: -9 },
  ];

  return (
    <svg viewBox="0 0 640 480" className={`${styles.viz} ${styles.vizFragmentation}`}>
      <g transform="translate(320 240) scale(0.74) translate(-320 -240)">
        <defs>
          {images.map((_, i) => (
            <clipPath key={i} id={`frag-clip-${i}`}>
              <rect x={images[i].x} y={images[i].y} width={images[i].w} height={images[i].h} rx="4" />
            </clipPath>
          ))}
        </defs>
        <g fill="none">
          {images.map((img, i) => (
            <g
              key={i}
              className={styles.frag}
              style={{ ["--d" as string]: img.d }}
              transform={`rotate(${img.rot} ${img.x + img.w / 2} ${img.y + img.h / 2})`}
            >
              <image
                href={img.src}
                x={img.x}
                y={img.y}
                width={img.w}
                height={img.h}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#frag-clip-${i})`}
              />
              <rect
                className={styles.fragStroke}
                x={img.x}
                y={img.y}
                width={img.w}
                height={img.h}
                rx="4"
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Integration viz — grid of 12 folders. Clicking a folder opens the
 * navigable browser dialog pre-filled to that folder's root.
 */
function IntegrationViz({
  onOpen,
  disabled,
}: {
  onOpen: (id: string) => void;
  disabled: boolean;
}) {
  /* 4-column × 3-row grid. Positions are tuned to sit tidily inside the
     640×480 viewBox with room for the label under each folder. */
  const cols = 4;
  const rows = 3;
  const xStart = 90;
  const yStart = 110;
  const xStep = 140;
  const yStep = 120;

  return (
    <svg viewBox="0 0 640 480" className={`${styles.viz} ${styles.vizIntegration}`}>
      <FolderIconSymbols />
      <g>
        {FOLDER_ROOTS.slice(0, cols * rows).map((root, i) => {
          const cx = xStart + (i % cols) * xStep;
          const cy = yStart + Math.floor(i / cols) * yStep;
          const delay = `${i * 0.05}s`;
          return (
            <g
              key={root.id}
              className={styles.intFolder}
              style={{ ["--d" as string]: delay }}
              transform={`translate(${cx} ${cy})`}
            >
              {/* HTML <button> inside <svg> is invalid and is dropped or hoisted in
                  some engines — use an SVG-native interactive group instead. */}
              <g
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
                aria-label={`Open folder: ${root.label} — ${root.sublabel}`}
                className={styles.intFolderHit}
                onClick={() => {
                  if (!disabled) onOpen(root.id);
                }}
                onKeyDown={(e) => {
                  if (disabled) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(root.id);
                  }
                }}
              >
                <svg
                  width="110"
                  height="88"
                  viewBox="-55 -44 110 88"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    className={styles.intFolderFocus}
                    x={-42}
                    y={-36}
                    width={84}
                    height={78}
                    rx={10}
                  />
                  <use
                    href="#fd-ico-folder"
                    x={-20}
                    y={-30}
                    width={40}
                    height={40}
                  />
                  <text
                    className={styles.intFolderLabel}
                    x={0}
                    y={18}
                    textAnchor="middle"
                  >
                    {root.label}
                  </text>
                  <text
                    className={styles.intFolderSub}
                    x={0}
                    y={32}
                    textAnchor="middle"
                  >
                    {root.sublabel}
                  </text>
                </svg>
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function ActivationViz() {
  return (
    <svg viewBox="0 0 640 480" className={`${styles.viz} ${styles.vizActivation}`}>
      <defs>
        <clipPath id="act-img-book">
          <rect x="52" y="100" width="78" height="36" rx="5" />
        </clipPath>
        <clipPath id="act-img-session">
          <rect x="510" y="110" width="78" height="36" rx="5" />
        </clipPath>
        <clipPath id="act-img-thread">
          <rect x="281" y="378" width="78" height="36" rx="5" />
        </clipPath>
      </defs>

      <g className={styles.qBar} style={{ ["--d" as string]: "0s" }}>
        <rect className={styles.qBarBg} x="60" y="32" width="520" height="44" rx="22" />
        <circle className={styles.qBarCaret} cx="84" cy="54" r="3" fill="currentColor" />
        <text className={styles.qBarText} x="100" y="59">
          How do we teach APEST as culture, not roles?
        </text>
      </g>

      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <line className={styles.ray} style={{ ["--d" as string]: ".35s" }} x1="244" y1="222" x2="130" y2="140" pathLength="100" />
        <line className={styles.ray} style={{ ["--d" as string]: ".50s" }} x1="396" y1="222" x2="510" y2="140" pathLength="100" />
        <line className={styles.ray} style={{ ["--d" as string]: ".65s" }} x1="320" y1="278" x2="320" y2="378" pathLength="100" />
      </g>

      <text className={styles.rayTag} style={{ ["--d" as string]: ".70s" }} x="187" y="178" textAnchor="middle">Book</text>
      <text className={styles.rayTag} style={{ ["--d" as string]: ".85s" }} x="453" y="178" textAnchor="middle">Session</text>
      <text className={styles.rayTag} style={{ ["--d" as string]: "1.00s" }} x="338" y="332" textAnchor="start">Thread</text>

      <g className={styles.answer} style={{ ["--d" as string]: ".15s" }}>
        <rect className={styles.answerBg} x="240" y="202" width="160" height="76" rx="6" />
        <rect className={styles.answerBand} x="240" y="202" width="160" height="20" />
        <text className={styles.answerLabel} x="248" y="216">ANSWER · CITING 3</text>
        <text className={styles.answerLine} x="248" y="240">APEST is a culture—</text>
        <text className={styles.answerLine} x="248" y="254">not a role taxonomy.</text>
        <g className={styles.answerDots}>
          <circle cx="249" cy="268" r="1.7" fill="currentColor" />
          <circle cx="256" cy="268" r="1.7" fill="currentColor" />
          <circle cx="263" cy="268" r="1.7" fill="currentColor" />
        </g>
      </g>

      <g className={styles.cited} style={{ ["--d" as string]: ".55s" }}>
        <rect className={styles.citedBg} x="52" y="100" width="78" height="58" rx="5" />
        <image
          href="/images/fragmentation-story/book-fragments-of-form.webp"
          x="52"
          y="100"
          width="78"
          height="36"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#act-img-book)"
        />
        <rect className={styles.citedBand} x="52" y="136" width="78" height="22" />
        <text className={styles.citedFolder} x="58" y="146">BOOKS</text>
        <text className={styles.citedFile} x="58" y="155">fragments §4</text>
      </g>

      <g className={styles.cited} style={{ ["--d" as string]: ".70s" }}>
        <rect className={styles.citedBg} x="510" y="110" width="78" height="58" rx="5" />
        <image
          href="/images/fragmentation-story/session-essential-structures-card.webp"
          x="510"
          y="110"
          width="78"
          height="36"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#act-img-session)"
        />
        <rect className={styles.citedBand} x="510" y="146" width="78" height="22" />
        <text className={styles.citedFolder} x="516" y="156">COURSES</text>
        <text className={styles.citedFile} x="516" y="165">essential §2</text>
      </g>

      <g className={styles.cited} style={{ ["--d" as string]: ".85s" }}>
        <rect className={styles.citedBg} x="281" y="378" width="78" height="58" rx="5" />
        <image
          href="/images/fragmentation-story/message-thread-staggered-fragments.webp"
          x="281"
          y="378"
          width="78"
          height="36"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#act-img-thread)"
        />
        <rect className={styles.citedBand} x="281" y="414" width="78" height="22" />
        <text className={styles.citedFolder} x="287" y="424">THREADS</text>
        <text className={styles.citedFile} x="287" y="433">cohort §12</text>
      </g>
    </svg>
  );
}

function FormationViz() {
  return (
    <svg viewBox="0 0 640 480" className={`${styles.viz} ${styles.vizFormation}`}>
      <text className={styles.fLabel} style={{ ["--d" as string]: "0.45s" }} x="320" y="48" textAnchor="middle">DISSONANCE</text>
      <text className={styles.fSub} style={{ ["--d" as string]: "0.45s" }} x="320" y="64" textAnchor="middle">a rupture</text>
      <polyline
        className={`${styles.fForce} ${styles.fDissonance}`}
        style={{ ["--d" as string]: "0.2s" }}
        points="320,80 298,108 340,134 300,162 328,188 318,214"
        pathLength="100"
      />
      <path className={styles.fArrow} style={{ ["--d" as string]: "0.9s" }} d="M 312 209 L 318 220 L 324 209 Z" />

      <text className={styles.fLabel} style={{ ["--d" as string]: "0.75s" }} x="470" y="225" textAnchor="middle">ACTION</text>
      <text className={styles.fSub} style={{ ["--d" as string]: "0.75s" }} x="470" y="262" textAnchor="middle">a step</text>
      <line
        className={`${styles.fForce} ${styles.fAction}`}
        style={{ ["--d" as string]: "0.5s" }}
        x1="345"
        y1="240"
        x2="568"
        y2="240"
        pathLength="100"
      />
      <path className={styles.fArrow} style={{ ["--d" as string]: "1.2s" }} d="M 568 232 L 582 240 L 568 248 Z" />

      <text className={styles.fLabel} style={{ ["--d" as string]: "1.05s" }} x="320" y="406" textAnchor="middle">REFLECTION</text>
      <text className={styles.fSub} style={{ ["--d" as string]: "1.05s" }} x="320" y="422" textAnchor="middle">a return</text>
      <path
        className={`${styles.fForce} ${styles.fReflection}`}
        style={{ ["--d" as string]: "0.8s" }}
        d="M 335 258 C 420 300 420 380 320 395 C 220 380 220 300 305 258"
        pathLength="100"
      />
      <path className={styles.fArrow} style={{ ["--d" as string]: "1.5s" }} d="M 305 258 L 298 269 L 311 266 Z" />

      <text className={styles.fLabel} style={{ ["--d" as string]: "1.35s" }} x="105" y="186" textAnchor="middle">COMMUNITY</text>
      <text className={styles.fSub} style={{ ["--d" as string]: "1.35s" }} x="105" y="202" textAnchor="middle">a witness</text>
      <line className={styles.fCommEdge} style={{ ["--d" as string]: "1.0s" }} x1="75" y1="230" x2="135" y2="220" pathLength="100" />
      <line className={styles.fCommEdge} style={{ ["--d" as string]: "1.0s" }} x1="75" y1="230" x2="110" y2="270" pathLength="100" />
      <line className={styles.fCommEdge} style={{ ["--d" as string]: "1.0s" }} x1="135" y1="220" x2="110" y2="270" pathLength="100" />
      <circle className={styles.fCommUser} style={{ ["--d" as string]: "1.05s" }} cx="75" cy="230" r="7" />
      <circle className={styles.fCommUser} style={{ ["--d" as string]: "1.10s" }} cx="135" cy="220" r="7" />
      <circle className={styles.fCommUser} style={{ ["--d" as string]: "1.15s" }} cx="110" cy="270" r="7" />
      <line
        className={`${styles.fForce} ${styles.fCommunityLink}`}
        style={{ ["--d" as string]: "1.2s" }}
        x1="145"
        y1="234"
        x2="302"
        y2="240"
        pathLength="100"
      />

      <g className={styles.learner}>
        <circle className={styles.learnerHalo} cx="320" cy="240" r="30" />
        <circle className={styles.learnerDot} cx="320" cy="240" r="20" />
        <text className={styles.learnerInitial} x="320" y="240" textAnchor="middle">L</text>
        <circle className={styles.learnerCompanion} cx="352" cy="228" r="5" />
      </g>

      <text className={styles.fSummary} x="320" y="462" textAnchor="middle">
        Not one. Not three.{" "}
        <tspan className={styles.em}>Four — cycling together — form a person.</tspan>
      </text>
    </svg>
  );
}

function MultiplicationViz() {
  const bars = [
    { d: "0.05s", x: 35, y: 240, h: 20 },
    { d: "0.20s", x: 110, y: 225, h: 35 },
    { d: "0.35s", x: 185, y: 205, h: 55 },
    { d: "0.50s", x: 260, y: 180, h: 80 },
    { d: "0.65s", x: 335, y: 155, h: 105 },
    { d: "0.80s", x: 410, y: 125, h: 135 },
    { d: "0.95s", x: 485, y: 100, h: 160 },
    { d: "1.10s", x: 560, y: 80, h: 180 },
  ];

  const cards = [
    { d: "0.10s", x: 25, num: "01", kind: "KW", label: "Keywords", sub: "targeting" },
    { d: "0.25s", x: 100, num: "02", kind: "JSON‑LD", label: "Schema", sub: "structured data" },
    { d: "0.40s", x: 175, num: "03", kind: "GRAPH", label: "Linking", sub: "internal · backlinks" },
    { d: "0.55s", x: 250, num: "04", kind: "REACT", label: "Performance", sub: "Core Web Vitals" },
    { d: "0.70s", x: 325, num: "05", kind: "E", label: "Experience", sub: "first‑hand" },
    { d: "0.85s", x: 400, num: "06", kind: "E", label: "Expertise", sub: "domain depth" },
    { d: "1.00s", x: 475, num: "07", kind: "A", label: "Authority", sub: "recognition" },
    { d: "1.15s", x: 550, num: "08", kind: "T", label: "Trust", sub: "integrity" },
  ];

  return (
    <svg viewBox="0 0 640 480" className={`${styles.viz} ${styles.vizMultiplication}`}>
      <text className={styles.ampEyebrow} x="50" y="30">Amplification signal</text>
      <text className={`${styles.ampEyebrow} ${styles.ampEyebrowRight}`} x="590" y="30" textAnchor="end">
        Compounding · left →&nbsp;right
      </text>
      <line className={styles.ampBaseline} x1="32" y1="260" x2="608" y2="260" />

      <g>
        {bars.map((b, i) => (
          <rect
            key={i}
            className={styles.ampBar}
            style={{ ["--d" as string]: b.d }}
            x={b.x}
            y={b.y}
            width="30"
            height={b.h}
          />
        ))}
      </g>

      <polyline
        className={styles.ampSignalLine}
        points="50,240 125,225 200,205 275,180 350,155 425,125 500,100 575,80"
        pathLength="100"
      />
      <circle className={styles.ampSignalHead} cx="575" cy="80" r="3.5" />

      {cards.map((c, i) => (
        <g key={i}>
          <g className={styles.stackCard} style={{ ["--d" as string]: c.d }}>
            <rect className={styles.stackCardBg} x={c.x} y="292" width="50" height="50" rx="4" />
            <text className={styles.stackCardNum} x={c.x + 25} y="315" textAnchor="middle">
              {c.num}
            </text>
            <text className={styles.stackCardKind} x={c.x + 25} y="330" textAnchor="middle">
              {c.kind}
            </text>
          </g>
          <text className={styles.stackLabel} style={{ ["--d" as string]: c.d }} x={c.x + 25} y="360" textAnchor="middle">
            {c.label}
          </text>
          <text className={styles.stackSub} style={{ ["--d" as string]: c.d }} x={c.x + 25} y="374" textAnchor="middle">
            {c.sub}
          </text>
        </g>
      ))}

      <path className={styles.eeatBracket} d="M325 400 L325 410 L575 410 L575 400" pathLength="100" />
      <text className={styles.eeatLabel} style={{ ["--d" as string]: "1.35s" }} x="450" y="428" textAnchor="middle">
        The E‑E‑A‑T playbook
      </text>
      <text className={styles.ampThroughput} style={{ ["--d" as string]: "1.5s" }} x="320" y="460" textAnchor="middle">
        Each ingredient compounds the last — eight signals, one voice.
      </text>
    </svg>
  );
}

function MovementViz() {
  return (
    <svg viewBox="0 0 640 480" className={`${styles.viz} ${styles.vizMovement}`}>
      <defs>
        <radialGradient id="mov-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="75%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="640" height="480" fill="url(#mov-glow)" />

      <g fill="none">
        {/* inter-primary */}
        <line className={`${styles.netEdge} ${styles.netEdgeInter}`} x1="320" y1="240" x2="200" y2="170" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgeInter}`} x1="320" y1="240" x2="440" y2="170" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgeInter}`} x1="320" y1="240" x2="320" y2="380" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgeInter}`} x1="200" y1="170" x2="440" y2="170" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgeInter}`} x1="200" y1="170" x2="320" y2="380" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgeInter}`} x1="440" y1="170" x2="320" y2="380" pathLength="100" />
        {/* primary-member */}
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="200" y1="170" x2="100" y2="100" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="200" y1="170" x2="260" y2="80" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="200" y1="170" x2="150" y2="260" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="440" y1="170" x2="440" y2="80" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="440" y1="170" x2="570" y2="100" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="440" y1="170" x2="580" y2="250" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="320" y1="380" x2="200" y2="430" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="320" y1="380" x2="420" y2="440" pathLength="100" />
        <line className={`${styles.netEdge} ${styles.netEdgePrimary}`} x1="320" y1="380" x2="480" y2="300" pathLength="100" />
        {/* member-member */}
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="100" y1="100" x2="260" y2="80" />
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="440" y1="80" x2="570" y2="100" />
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="570" y1="100" x2="580" y2="250" />
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="150" y1="260" x2="80" y2="280" />
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="80" y1="280" x2="90" y2="400" />
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="90" y1="400" x2="200" y2="430" />
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="480" y1="300" x2="580" y2="400" />
        <line className={`${styles.netEdge} ${styles.netEdgeRegular}`} x1="580" y1="400" x2="420" y2="440" />
      </g>

      {[
        { d: "0s", cx: 320, cy: 240, initial: "S", name: "Sarah", role: "hub · cohort lead" },
        { d: ".08s", cx: 200, cy: 170, initial: "M", name: "Marcus", role: "editor · publisher" },
        { d: ".16s", cx: 440, cy: 170, initial: "P", name: "Priya", role: "network lead" },
        { d: ".24s", cx: 320, cy: 380, initial: "D", name: "David", role: "hub · practitioners" },
      ].map((u) => (
        <g
          key={u.initial}
          className={`${styles.netUser} ${styles.netUserPrimary}`}
          style={{ ["--d" as string]: u.d }}
        >
          <circle className={styles.userHalo} cx={u.cx} cy={u.cy} r="19" />
          <circle className={styles.userDot} cx={u.cx} cy={u.cy} r="14" />
          <text className={styles.userInitial} x={u.cx} y={u.cy} textAnchor="middle">
            {u.initial}
          </text>
          <text className={styles.userName} x={u.cx} y={u.cy + 36} textAnchor="middle">
            {u.name}
          </text>
          <text className={styles.userRole} x={u.cx} y={u.cy + 49} textAnchor="middle">
            {u.role}
          </text>
        </g>
      ))}

      {[
        { d: ".42s", cx: 100, cy: 100, i: "J" },
        { d: ".48s", cx: 260, cy: 80, i: "L" },
        { d: ".54s", cx: 440, cy: 80, i: "R" },
        { d: ".60s", cx: 570, cy: 100, i: "K" },
        { d: ".66s", cx: 580, cy: 250, i: "T" },
        { d: ".72s", cx: 580, cy: 400, i: "B" },
        { d: ".78s", cx: 420, cy: 440, i: "E" },
        { d: ".84s", cx: 200, cy: 430, i: "N" },
        { d: ".90s", cx: 90, cy: 400, i: "H" },
        { d: ".96s", cx: 80, cy: 280, i: "C" },
        { d: "1.02s", cx: 150, cy: 260, i: "O" },
        { d: "1.08s", cx: 480, cy: 300, i: "V" },
      ].map((u) => (
        <g key={u.i} className={styles.netUser} style={{ ["--d" as string]: u.d }}>
          <circle
            className={`${styles.userDot} ${styles.userDotRegular}`}
            cx={u.cx}
            cy={u.cy}
            r="10"
          />
          <text
            className={`${styles.userInitial} ${styles.userInitialRegular}`}
            x={u.cx}
            y={u.cy}
            textAnchor="middle"
          >
            {u.i}
          </text>
        </g>
      ))}

      <text className={styles.fieldCount} style={{ ["--d" as string]: "1.35s" }} x="40" y="464">
        Illustrative field · sample network
      </text>
      <text className={styles.fieldSub} style={{ ["--d" as string]: "1.50s" }} x="600" y="464" textAnchor="end">
        hubs and members, connected
      </text>
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Slide shell — text column + viz column.
-------------------------------------------------------------------------- */

type SlideProps = {
  index: number;
  stageName: string;
  ariaLabel: string;
  caption: React.ReactNode;
  modifier?: string;
  viz: React.ReactNode;
  hint?: React.ReactNode;
};

function Slide({ index, stageName, ariaLabel, caption, modifier, viz, hint }: SlideProps) {
  return (
    <article
      className={styles.slide}
      data-slide=""
      data-index={index}
      aria-roledescription="slide"
      aria-label={ariaLabel}
    >
      <div className={`${styles.slideInner}${modifier ? " " + modifier : ""}`}>
        <div className={styles.slideText}>
          <p className={styles.slideLabel}>
            <span className={styles.slideLabelDot} aria-hidden="true" />
            Stage {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className={styles.slideTitle}>{stageName}</h2>
          <p className={styles.slideCaption}>{caption}</p>
          {hint && <p className={styles.slideHint}>{hint}</p>}
        </div>
        <figure className={styles.slideViz} aria-hidden="true">
          {viz}
        </figure>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------------------
   The deck.
-------------------------------------------------------------------------- */

export function FragmentationDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const activeIndexRef = useRef(0);

  useGSAP(
    () => {
      if (!deckRef.current || !trackRef.current) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const slideEls = Array.from(
        trackRef.current.querySelectorAll<HTMLElement>("[data-slide]"),
      );
      /* Mark every slide active so their reveal animations run even without GSAP. */
      if (prefersReduced) {
        slideEls.forEach((el) => el.classList.add(styles.isActive as string));
        return;
      }

      const track = trackRef.current;
      const snapCount = slideEls.length;
      const snapStep = snapCount > 1 ? 1 / (snapCount - 1) : 1;
      const snapToProgress = (v: number) => {
        const clamped = gsap.utils.clamp(0, 1, v);
        return Math.round(clamped / snapStep) * snapStep;
      };

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: deckRef.current,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          snap: {
            snapTo: snapToProgress,
            duration: { min: 0.14, max: 0.38 },
            delay: 0,
            ease: "power3.out",
          },
        },
      });

      slideEls.forEach((slide, i) => {
        ScrollTrigger.create({
          trigger: slide,
          containerAnimation: tween,
          start: "left center",
          end: "right center",
          onToggle: (self) => {
            if (self.isActive) {
              slideEls.forEach((el, j) =>
                el.classList.toggle(styles.isActive as string, i === j),
              );
              setCurrentIndex(i);
              activeIndexRef.current = i;
            }
          },
        });
      });

      slideEls[0]?.classList.add(styles.isActive as string);

      return () => {
        tween.kill();
      };
    },
    { scope: deckRef },
  );

  const scrollToSlide = useCallback((index: number) => {
    const st = ScrollTrigger.getAll().find(
      (t) => t.vars.pin === true && t.trigger === deckRef.current,
    );
    if (!st) return;
    const clamped = Math.max(0, Math.min(STAGE_NAMES.length - 1, index));
    const target =
      st.start + ((st.end - st.start) * clamped) / (STAGE_NAMES.length - 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  /* Keyboard nav. */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA"].includes(e.target.tagName)
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        scrollToSlide(activeIndexRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        scrollToSlide(activeIndexRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSlide(STAGE_NAMES.length - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToSlide]);

  const onIntegrationFolder = (id: string) => {
    if (currentIndex !== 1) return;
    setOpenFolderId(id);
  };

  return (
    <div className={styles.main}>
      <a className={styles.skipLink} href="#after-deck">
        Skip past slides
      </a>

      <div className={styles.progressPill} role="group" aria-label="Stage progress">
        <p className={styles.stageIndicator} aria-live="polite">
          <span className={styles.stageIndicatorCount}>
            <span>{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className={styles.stageIndicatorSep}>/</span> 06
          </span>
          <span
            className={`${styles.stageIndicatorSep} ${styles.stageIndicatorSepDim}`}
          >
            ·
          </span>
          <span className={styles.stageIndicatorName}>
            {STAGE_NAMES[currentIndex]}
          </span>
        </p>

        <nav className={styles.stageDots} aria-label="Jump to stage">
          {STAGE_NAMES.map((name, i) => (
            <button
              key={name}
              type="button"
              aria-label={name}
              className={i === currentIndex ? styles.stageDotActive : ""}
              onClick={() => scrollToSlide(i)}
            />
          ))}
        </nav>
      </div>

      <section
        ref={deckRef}
        className={styles.deck}
        aria-roledescription="carousel"
        aria-label="The six stages"
      >
          <div ref={trackRef} className={styles.deckTrack}>
            <Slide
              index={0}
              stageName="Fragmentation"
              ariaLabel="Stage 1 of 6: Fragmentation"
              caption={
                <>
                  Your intelligence exists —{" "}
                  <em className={styles.em}>but in pieces</em>.
                </>
              }
              hint={
                <>
                  The common stall is the move from here into{" "}
                  <strong>Integration</strong> — when scattered informational and
                  relational intelligence still has to become one legible foundation.
                </>
              }
              viz={<FragmentationViz />}
            />

            <Slide
              index={1}
              stageName="Integration"
              ariaLabel="Stage 2 of 6: Integration"
              modifier={styles.slideInnerIntegration}
              caption={
                <>
                  <em className={styles.em}>Everything</em> is brought into one system.
                </>
              }
              hint={
                <>
                  This is where the foundation appears: an integrated{" "}
                  <strong>library</strong>, a legible relational <strong>graph</strong>, a
                  recoverable <strong>voice</strong>, and <strong>pathways</strong> that can
                  actually be walked. Click a folder to browse normalized{" "}
                  <code className={styles.inlineCode}>.json</code> and{" "}
                  <code className={styles.inlineCode}>.md</code> artifacts.
                </>
              }
              viz={
                <IntegrationViz
                  onOpen={onIntegrationFolder}
                  disabled={currentIndex !== 1}
                />
              }
            />

            <Slide
              index={2}
              stageName="Activation"
              ariaLabel="Stage 3 of 6: Activation"
              caption={
                <>
                  Your intelligence becomes{" "}
                  <em className={styles.em}>usable</em>.
                </>
              }
              hint={
                <>
                  <strong>Grounded</strong> retrieval over an integrated corpus reads as
                  faithful extension; ungrounded generation reads as fluent approximation on
                  top of scatter. The difference is what sits underneath.
                </>
              }
              viz={<ActivationViz />}
            />

            <Slide
              index={3}
              stageName="Formation"
              ariaLabel="Stage 4 of 6: Formation"
              caption={
                <>
                  People are <em className={styles.em}>shaped</em>, not just
                  informed.
                </>
              }
              viz={<FormationViz />}
            />

            <Slide
              index={4}
              stageName="Multiplication"
              ariaLabel="Stage 5 of 6: Multiplication"
              caption={
                <>
                  Your work begins to{" "}
                  <em className={styles.em}>scale through systems</em>.
                </>
              }
              viz={<MultiplicationViz />}
            />

            <Slide
              index={5}
              stageName="Movement"
              ariaLabel="Stage 6 of 6: Movement"
              caption={
                <>
                  Your work becomes part of a{" "}
                  <em className={styles.em}>connected field</em>.
                </>
              }
              viz={<MovementViz />}
            />
          </div>
        </section>

        <section className={styles.afterDeck} id="after-deck">
          <div className={styles.afterDeckInner}>
            <p className={styles.afterDeckKicker}>End of the arc</p>
            <h2 className={styles.afterDeckTitle}>
              From fragmented pieces to a{" "}
              <em className={styles.em}>connected field</em>.
            </h2>
            <p className={styles.afterDeckBody}>
              Six stages name one trajectory: Fragmentation, Integration, Activation,
              Formation, Multiplication, Movement. Almost every organization stalls longest
              at <strong>Integration</strong> — not from lack of effort, but because
              informational and relational intelligence have rarely been composed into one
              foundation.
            </p>
            <p className={styles.afterDeckBody}>
              Safety · Sandbox · Skills · Solutions is the on-ramp for entering AI faithfully;
              this arc is the road that follows. The book and field guide carry the longer
              argument — with inspectable language you can walk with a team.
            </p>
            <nav className={styles.afterDeckLinks} aria-label="Related reading">
              <span className={styles.afterDeckHairline}>
                <Link href="/articles/two-intelligences-integration">
                  Two intelligences, one integration thesis
                </Link>
              </span>
              <span className={styles.afterDeckHairline}>
                <Link href={SSSS_FIELD_GUIDE_PATH}>AI Stewardship Sequence field guide</Link>
              </span>
              <span className={styles.afterDeckHairline}>
                <Link href={BOOK_HUB_PATH}>Read the field guide (book)</Link>
              </span>
            </nav>
            <div className={styles.afterDeckCtas}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                Start with clarity
                <span aria-hidden="true" className={styles.btnArrow}>
                  →
                </span>
              </Link>
              <Link
                className={`${styles.btn} ${styles.btnGhost}`}
                href="/book/read/preface-the-scatter-field"
              >
                Read the book
              </Link>
              <Link className={`${styles.btn} ${styles.btnGhost}`} href="/articles">
                Article library
              </Link>
            </div>
            <div className={styles.afterDeckSubscribe}>
              <p className={styles.afterDeckSubscribeLead}>
                Or begin quieter — one note per month on formation, infrastructure, and what
                we&rsquo;re learning.
              </p>
              <div className={styles.afterDeckSubscribeForm}>
                <NewsletterForm source="fragmentation-after-deck" />
              </div>
            </div>
          </div>
        </section>

      <IntegrationBrowser
        openFolderId={openFolderId}
        onClose={() => setOpenFolderId(null)}
      />
    </div>
  );
}
