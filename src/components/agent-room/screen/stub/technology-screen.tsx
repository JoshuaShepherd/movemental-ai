"use client";

import Link from "next/link";

import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";
import { PRICING_TECH_MODULES } from "@/lib/agent-room/data/pricing";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";

/** Stage 04 · Tech: scoped AI deployment after Safety, Sandbox, and Training. */
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
        <p className={styles.secLabel}>Modular builds</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Tech is built in layers on top of your ratified foundation. Foundation is included in every
          platform. Add the modules your organization needs.
        </p>
        <div className={styles.techModules}>
          {PRICING_TECH_MODULES.map((mod) => (
            <div
              key={mod.name}
              className={`${styles.way} ${mod.price !== "Built in" ? styles.paid : ""}`}
            >
              <h4>{mod.name}</h4>
              <p className={styles.price}>{mod.price}</p>
              <p>{mod.description}</p>
            </div>
          ))}
        </div>
        <p className={styles.body} style={{ marginTop: "0.85rem" }}>
          Every stage has a free field guide. Tech&apos;s guide is in progress.
        </p>
      </div>

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
