"use client";

import { useState } from "react";

import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { ProcessAccordion } from "../process-accordion";

interface PathStage {
  num: 1 | 2 | 3 | 4;
  title: string;
  lead: string;
  detail: string;
}

/** The four ordered stages — titles from {@link PATH_STAGE_LABELS}. */
const STAGES: readonly PathStage[] = [
  {
    num: 1,
    title: PATH_STAGE_LABELS.safety,
    lead: "Get your arms around AI responsibly: your AI Handbook, ratified by your board, before anything else.",
    detail:
      "Acceptable use, data boundaries, theological red lines, written down and adopted before anyone builds on sand.",
  },
  {
    num: 2,
    title: PATH_STAGE_LABELS.sandbox,
    lead: "Try AI against real work, in a bounded place. Sort what helps from what doesn't.",
    detail:
      "Isolated environments where staff learn prompts and limits without risking public trust or constituent data — with results you can point to.",
  },
  {
    num: 3,
    title: PATH_STAGE_LABELS.training,
    lead: "Form your people to steward it. Judgment, not a one-off workshop.",
    detail:
      "Discernment, authorship, stewardship — built in the people who will carry AI inside your organization, not bolted on after the tools arrive.",
  },
  {
    num: 4,
    title: PATH_STAGE_LABELS.tech,
    lead: "Build the tools your work actually needs, on what you already have.",
    detail:
      "Scoped deployment — from optimizing what you use today to network-scale work — only after human oversight protocols are defined and tested.",
  },
];

/**
 * The path screen: four ordered stages with the talk's rationale for why the
 * sequence is fixed — Safety first, then Sandbox, Training, Tech.
 */
export function PathScreen({ onHome }: ScreenProps) {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>The path</p>
      <p className={styles.q} style={{ marginBottom: "0.65rem" }}>
        One ordered path. It starts with {PATH_STAGE_LABELS.safety}.
      </p>
      <p className={styles.body}>
        The order is not arbitrary. {PATH_STAGE_LABELS.safety} first — because AI is already
        in the room. {PATH_STAGE_LABELS.sandbox} before {PATH_STAGE_LABELS.training} before{" "}
        {PATH_STAGE_LABELS.tech} — because handing powerful tools to people who can&apos;t yet
        steward them is replacement, not progress.
      </p>

      <ProcessAccordion
        ariaLabel="The path — four stages"
        activeId={active ? `stage-${active}` : ""}
        onActiveChange={(id) => {
          const n = Number(id.replace("stage-", ""));
          setActive((cur) => (cur === n ? 0 : n));
        }}
        items={STAGES.map((stage) => ({
          id: `stage-${stage.num}`,
          step: `0${stage.num}`,
          title: stage.title,
          summary: stage.lead,
          children: <p className={styles.paDetail}>{stage.detail}</p>,
        }))}
      />

      <div className={`${styles.pathStackCard} ${styles.paOnlyNarrow}`}>
        <p className={styles.pathStackIntro}>
          Four stages, in order — {PATH_STAGE_LABELS.safety} · {PATH_STAGE_LABELS.sandbox} ·{" "}
          {PATH_STAGE_LABELS.training} · {PATH_STAGE_LABELS.tech}. Open any step to see what it
          means, and why the next one waits.
        </p>
        <div className={styles.pathStack} role="presentation">
          {STAGES.map((stage) => {
            const isActive = active === stage.num;
            return (
              <article
                key={stage.num}
                className={`${styles.pathDrawer} ${isActive ? styles.isActive : ""}`}
                data-stage={stage.num}
              >
                <button
                  type="button"
                  className={styles.pathDrawerTrigger}
                  aria-expanded={isActive}
                  onClick={() => setActive(isActive ? 0 : stage.num)}
                >
                  <span className={styles.pathDrawerTitle}>{stage.title}</span>
                  <span className={styles.pathDrawerNum} aria-hidden="true">
                    0{stage.num}
                  </span>
                </button>
                <div className={styles.pathDrawerPanel}>
                  <div className={styles.pathDrawerPanelInner}>
                    <p>{stage.lead}</p>
                    <p className={styles.pathDrawerDetail}>{stage.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <p className={styles.honest}>
        Each step earns the next. Skip one and the ones after it have nothing to stand on.
      </p>
    </div>
  );
}
