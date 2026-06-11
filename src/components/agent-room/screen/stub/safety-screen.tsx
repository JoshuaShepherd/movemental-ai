"use client";

import Link from "next/link";

import { SAFETY_CHARTER, SAFETY_HANDBOOK } from "@/lib/agent-room/naming";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb, LayerRow } from "./chrome";
import { TwoWaysForward } from "./two-ways-forward";

const STAT_CALLOUTS = [
  {
    id: "safety-church-ai-support-91",
    numeral: "91%",
    caption: "of church leaders support using AI in ministry. Most use it weekly.",
  },
  {
    id: "safety-church-policy-9",
    numeral: "9%",
    caption: "have written any policy for it.",
  },
  {
    id: "safety-cloned-voice-concern-60",
    numeral: "60%",
    caption:
      "are concerned about cloned-voice fraud, and 1 in 4 say AI scams have already reached their community.",
  },
] as const;

/** Stage 01 · Safety: stakes-first page with stat band and two ways forward. */
export function SafetyScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Stage 01 · Safety</p>
      <h1>Your team is already using AI. No one has said what&apos;s allowed.</h1>
      <p className={styles.body}>
        Safety is the first step on the Path, and the most urgent. Before you build
        anything, you decide, out loud and on the record, what AI may and may not do
        in your mission.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Why this comes first</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          For a business, an AI mistake costs efficiency. For a church, a nonprofit,
          or a seminary, it costs the one thing the whole work runs on, which is
          trust. A sermon quietly written by a machine. Donor records pasted into a
          consumer tool. A cloned voice asking your people for money. None of these
          are hypothetical, and none of them are efficiency problems. They are
          credibility problems, and credibility is your product. There is no second
          product to fall back on.
        </p>
      </div>

      <div className={styles.statBand} role="list">
        {STAT_CALLOUTS.map((stat) => (
          <Link
            key={stat.id}
            href={`/footnotes#${stat.id}`}
            className={styles.statCallout}
            role="listitem"
          >
            <span className={styles.statNumeral}>{stat.numeral}</span>
            <span className={styles.statCaption}>{stat.caption}</span>
          </Link>
        ))}
      </div>

      <p className={styles.gapLine}>
        The tools arrived. The decisions did not. Safety closes that gap before it
        costs you.
      </p>

      <div className={styles.turnBlock}>
        <p className={styles.secLabel}>What changes the day you ratify</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          The value arrives the moment your board says yes. From that point you have
          a clear answer for a journalist, an answer a major donor can trust,
          one shared frame for your whole staff, and a document you can point to when
          a vendor pitches something you have already decided against. You stop
          reacting to AI and start leading through it.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What it produces</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          One thing: your {SAFETY_CHARTER.fullTitle}. Five plain layers your board can ratify.
        </p>
        <div className={styles.layers}>
          <LayerRow n="01" title="Statement" g="what we believe about AI in our mission." />
          <LayerRow n="02" title="Policy" g="what we will do, and what we refuse." />
          <LayerRow n="03" title="Context" g="what is actually true in our environment right now." />
          <LayerRow n="04" title="Rules" g="what governs AI use in specific areas." />
          <LayerRow n="05" title="Response Plans" g="what we do when something goes wrong." />
        </div>
        <p className={styles.body} style={{ marginTop: "1rem" }}>
          Inside those five layers are seven short, practical documents, including
          your AI use charter, your data-handling standards, your disclosure
          standard, and your response plan for a cloned voice. Nothing bloated. The
          smallest set that actually protects you.
        </p>
      </div>

      <TwoWaysForward
        reassurance={`We are not trying to talk you out of the free route. Both produce the same ratified ${SAFETY_CHARTER.shortLabel}. The only difference is who holds the pen, and how fast you get there.`}
        freeWay={{
          title: "Free, and we guide you.",
          price: "Free · about 1 to 2 months",
          description: (
            <>
              Complete Safety yourself with the handbook, <em>It Starts With Safety</em>.
              Your team drafts all five layers, and we point the way when you need
              it. Best if you have the time, the alignment, and the discipline to
              finish.
            </>
          ),
          ctaLabel: "Start free, we'll guide you",
          ctaHref: "/field-guide",
        }}
        paidWay={{
          title: "We do it with you.",
          price: "$1,000 · two weeks",
          description:
            "We draft all five layers customized to your organization. Your team reviews and ratifies inside a private dashboard. You get the print-quality Charter, the board packet, and the rollout materials, done.",
          ctaLabel: "Have us do it · $1,000",
          ctaHref: "/enroll",
          paid: true,
        }}
      />
    </div>
  );
}
