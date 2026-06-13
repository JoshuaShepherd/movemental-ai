"use client";

import Link from "next/link";

import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { TwoWaysForward } from "./two-ways-forward";

/** Stage 03 · Training: formation cohort for people who will steward AI inside the org. */
export function TrainingScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Stage 03 · {PATH_STAGE_LABELS.training}</p>
      <h1>Training transfers technique. Formation reshapes judgment.</h1>
      <p className={styles.body}>
        {PATH_STAGE_LABELS.training} is an eight-week cohort for the people who will carry AI
        decisions inside your organization. Not staff who learned a tool. Leaders who can name the
        line, defend authorship, and steward what you already decided in {PATH_STAGE_LABELS.safety}{" "}
        and tested in {PATH_STAGE_LABELS.sandbox}.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Why this comes third</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          {PATH_STAGE_LABELS.sandbox} gives you findings. {PATH_STAGE_LABELS.training} gives you
          people who can carry them. Handing powerful tools to a team that has not been formed is
          replacement, not progress. AI does not do the discernment, the relationships, or the
          care. Your people do. This stage forms them.
        </p>
        <p className={styles.body}>
          A one-day workshop can teach prompts. It cannot form judgment about when AI should not
          touch pastoral notes, donor letters, or student records. That work needs peers, time, and
          your organization&apos;s own material on the table.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What it builds</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Three capacities, practiced together over eight weeks. Discernment: reading AI output
          against your real work and naming when it is confidently wrong. Authorship: knowing when
          AI helped and when it crossed into writing under your name. Stewardship: holding the care
          boundaries from your charter when a vendor or a staff member pushes past them.
        </p>
        <p className={styles.body}>
          The curriculum anchors to your own ratified Statement and Policy from{" "}
          {PATH_STAGE_LABELS.safety}. Certification rests on demonstrated capacity, not attendance.
        </p>
      </div>

      <TwoWaysForward
        reassurance="The paid cohort is live today. We have not published a free self-paced path for this stage yet."
        freeWay={{
          title: "Free, and we guide you.",
          price: "[Free entry point to confirm]",
          description:
            "Training has run cohort-only to date. We will confirm the free entry point before publishing a claim here.",
          ctaLabel: "",
          ctaHref: "",
          placeholder: true,
        }}
        paidWay={{
          title: "We do it with you.",
          price: "$15,000 + $5,000 per year",
          description:
            "An eight-week formation cohort building three capacities: discernment, authorship, and stewardship, in the people who will steward AI inside your organization.",
          ctaLabel: "Talk to us about Training",
          ctaHref: "/enroll",
          paid: true,
        }}
      />

      <p className={styles.body} style={{ marginTop: "1rem" }}>
        If you have not finished {PATH_STAGE_LABELS.sandbox},{" "}
        <Link className={styles.inlineLink} href="/agent">
          start there
        </Link>
        . {PATH_STAGE_LABELS.training} needs findings from real trials, not theory alone.
      </p>
    </div>
  );
}
