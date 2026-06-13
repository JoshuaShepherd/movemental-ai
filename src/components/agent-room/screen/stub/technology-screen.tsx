"use client";

import Link from "next/link";

import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { TwoWaysForward } from "./two-ways-forward";

/** Stage 04 · Technology: scoped AI deployment after Safety, Sandbox, and Training. */
export function TechnologyScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Stage 04 · {PATH_STAGE_LABELS.tech}</p>
      <h1>Build only after the people and the rules are ready.</h1>
      <p className={styles.body}>
        {PATH_STAGE_LABELS.tech} is scoped AI deployment inside your organization. Built by formed
        people. Governed by a working charter. Aimed at use cases your {PATH_STAGE_LABELS.sandbox}{" "}
        already sorted green or yellow. Not a tech purchase to skip the first three stages.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Why this comes last</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Enterprise Copilot with good prompts may be enough. If your Sandbox Future Plan says so,
          start there. We will tell you when a lighter path fits. {PATH_STAGE_LABELS.tech} is for
          when the work needs custom workflows, shared content, or network-scale coordination that
          off-the-shelf tools cannot carry honestly.
        </p>
        <p className={styles.body}>
          Deploying AI into hands that cannot steward it, inside rules nobody has ratified, is how
          trust erodes while the dashboard looks impressive. The order is not upsell. It is the
          smallest honest sequence.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What we scope</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Engagements range from tuning tools you already pay for, to composed workflows for donor
          communications or curriculum, to full platform tenants and network deployments for
          institutions. Each engagement gets a signed brief before build begins. Price follows
          scope, not a menu of hype.
        </p>
        <p className={styles.body}>
          We do not build for organizations that skipped {PATH_STAGE_LABELS.safety},{" "}
          {PATH_STAGE_LABELS.sandbox}, or {PATH_STAGE_LABELS.training}. The deployment becomes a
          liability without that foundation.
        </p>
      </div>

      <TwoWaysForward
        reassurance={`Every ${PATH_STAGE_LABELS.tech} engagement is scoped. We will confirm the free entry point before publishing a claim here.`}
        freeWay={{
          title: "Free, and we guide you.",
          price: "[Free entry point to confirm]",
          description:
            "Technology is scoped per engagement. We will confirm the free entry point before publishing a claim here.",
          ctaLabel: "",
          ctaHref: "",
          placeholder: true,
        }}
        paidWay={{
          title: "We do it with you.",
          price: "From $30,000 · scoped",
          description:
            "Scoped AI deployment across six configurations, from tool optimization to network-scale work for institutions and denominations.",
          ctaLabel: "Talk to us about Technology",
          ctaHref: "/enroll",
          paid: true,
        }}
      />

      <p className={styles.body} style={{ marginTop: "1rem" }}>
        Questions about fit or scope?{" "}
        <Link className={styles.inlineLink} href="/agent">
          Get in touch
        </Link>
        . We would rather name a smaller first step than sell a build you are not ready to operate.
      </p>
    </div>
  );
}
