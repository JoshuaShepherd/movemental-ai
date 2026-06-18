"use client";

import Link from "next/link";

import { PATH_STAGE_LABELS, SANDBOX_HANDBOOK } from "@/lib/agent-room/naming";
import {
  PRICING_SANDBOX_DIGITAL,
  PRICING_SANDBOX_FREE,
  PRICING_SANDBOX_IN_PERSON,
} from "@/lib/agent-room/data/pricing";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { TwoWaysForward } from "./two-ways-forward";

/** Stage 02 · Sandbox: try AI against real work inside ratified rules. */
export function SandboxScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Stage 02 · {PATH_STAGE_LABELS.sandbox}</p>
      <h1>
        {PATH_STAGE_LABELS.safety} told you what&apos;s allowed. {PATH_STAGE_LABELS.sandbox} is
        where you find out what&apos;s valuable.
      </h1>
      <p className={styles.body}>
        Your team tries AI against real work, inside the rules your board already ratified. Each use
        case gets sorted green, yellow, or red. You leave with a Future Plan your leadership can
        actually sign.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Why this comes second</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          {PATH_STAGE_LABELS.safety} without {PATH_STAGE_LABELS.sandbox} is barriers built before
          anyone tested whether the tools had value. {PATH_STAGE_LABELS.sandbox} without{" "}
          {PATH_STAGE_LABELS.safety} is reckless. You need the charter first. Then you need honest
          trials against your own work, not a vendor demo.
        </p>
        <p className={styles.body}>
          A generic AI workshop can teach prompts. It cannot tell you which uses fit your mission,
          your data, or your people. That sorting happens here, against material your team already
          carries.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What it produces</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Three things your board can read. A Future Plan with green, yellow, and red use cases. A
          Discernment Memo naming what you learned and now believe is true. A Readiness Assessment
          recommending whether to move to {PATH_STAGE_LABELS.training}.
        </p>
        <p className={styles.body}>
          The free field guide walks eight phases, from boundaries through ethics review to the
          Future Plan. The facilitated path adds in-person teaching, a recipe library tuned to your
          work, and dashboard integration with your {PATH_STAGE_LABELS.safety} charter.
        </p>
      </div>

      <TwoWaysForward
        sectionLabel="Three ways forward"
        reassurance="All three routes produce the same Future Plan and a shared record of what you tried."
        freeWay={{
          title: PRICING_SANDBOX_FREE.title,
          price: PRICING_SANDBOX_FREE.price,
          description: (
            <>
              The field guide, <em>{SANDBOX_HANDBOOK.fullTitle}</em>. Your team runs the eight
              phases, and we guide you when you need it.
            </>
          ),
          ctaLabel: PRICING_SANDBOX_FREE.ctaLabel,
          ctaHref: PRICING_SANDBOX_FREE.ctaHref,
        }}
        paidWay={{
          title: PRICING_SANDBOX_DIGITAL.title,
          price: PRICING_SANDBOX_DIGITAL.price,
          description: PRICING_SANDBOX_DIGITAL.descriptionPlain ?? "",
          ctaLabel: PRICING_SANDBOX_DIGITAL.ctaLabel,
          ctaHref: PRICING_SANDBOX_DIGITAL.ctaHref,
          paid: true,
        }}
        extraWays={[
          {
            title: PRICING_SANDBOX_IN_PERSON.title,
            price: PRICING_SANDBOX_IN_PERSON.price,
            description: PRICING_SANDBOX_IN_PERSON.descriptionPlain ?? "",
            ctaLabel: PRICING_SANDBOX_IN_PERSON.ctaLabel,
            ctaHref: PRICING_SANDBOX_IN_PERSON.ctaHref,
            paid: true,
          },
        ]}
      />

      <p className={styles.body} style={{ marginTop: "1rem" }}>
        If you have not finished {PATH_STAGE_LABELS.safety},{" "}
        <Link className={styles.inlineLink} href="/agent">
          start there
        </Link>
        . {PATH_STAGE_LABELS.sandbox} depends on a ratified charter.
      </p>
    </div>
  );
}
