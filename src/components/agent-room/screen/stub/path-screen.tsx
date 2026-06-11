"use client";

import { useState } from "react";

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

/** The four ordered stages (prototype `PATH_HTML` / `pathDrawer`), byte-identical. */
const STAGES: readonly PathStage[] = [
  {
    num: 1,
    title: "Safety",
    lead: "Get your arms around AI responsibly: your AI Handbook, ratified by your board, before anything else.",
    detail:
      "Acceptable use, data boundaries, theological red lines, written down and adopted before anyone builds on sand.",
  },
  {
    num: 2,
    title: "Sandbox",
    lead: "Try AI against real work, in a bounded place. Sort what helps from what doesn’t.",
    detail:
      "Isolated environments where staff learn prompts and limits without risking public trust or constituent data — with results you can point to.",
  },
  {
    num: 3,
    title: "Training",
    lead: "Form your people to steward it. Judgment, not a one-off workshop.",
    detail:
      "Discernment, authorship, stewardship — built in the people who will carry AI inside your organization, not bolted on after the tools arrive.",
  },
  {
    num: 4,
    title: "Tech",
    lead: "Build the tools your work actually needs, on what you already have.",
    detail:
      "Scoped deployment — from optimizing what you use today to network-scale work — only after human oversight protocols are defined and tested.",
  },
];

/**
 * The path screen (prototype `PATH_HTML` + `bindPathDrawers`): one ordered path
 * as a stack of expandable drawers, each with its stage color ramp. Safety
 * starts open; opening a drawer closes the others (the prototype accordion), and
 * clicking the open one collapses it.
 */
export function PathScreen({ onHome }: ScreenProps) {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>The path</p>
      <p className={styles.q} style={{ marginBottom: "0.65rem" }}>
        One ordered path. It starts with Safety.
      </p>

      {/* Horizontal process accordion (md+) — see proposal §3.1. Inactive
          columns show ghost number + title; the active column expands with an
          ink-blue rail and full copy. Mobile keeps the vertical drawer below. */}
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
          Four stages, in order, from governance to tools. Open any step to see what
          it means, and why the next one waits.
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
        Each step earns the next. Skip one and the ones after it have nothing to stand
        on.
      </p>
    </div>
  );
}
