"use client";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb, LayerRow } from "./chrome";

/**
 * The Safety confirmation (prototype `confirmHTML(mode)`), branching on the
 * `show` act's `mode` opt: `"paid"` (we draft it with you) vs `"free"` (the field
 * guide is on its way). Defaults to free, matching the prototype.
 */
export function ConfirmScreen({ opts, onHome }: ScreenProps) {
  const paid = opts.mode === "paid";

  // INT-09 — Discuss capture confirmation (the honest "a person will follow up"
  // state, same sheet-figure pattern as the paid/free confirms).
  if (opts.mode === "discuss") {
    return (
      <div>
        <Crumb onHome={onHome} />
        <p className={styles.eyebrow}>Pick this up properly</p>
        <h1>Got it — the team will be in touch.</h1>
        <p className={styles.body}>
          A real person will follow up about what you’re working through. Not a sequence,
          not a bot.
        </p>
        <p className={styles.honest}>
          The path we mapped stays right here whenever you want to come back to it.
        </p>
      </div>
    );
  }

  if (paid) {
    return (
      <div>
        <Crumb onHome={onHome} />
        <p className={styles.eyebrow}>Stage 01 · Safety · With us</p>
        <h1>You’re in. Here’s the next two weeks.</h1>
        <p className={styles.body}>
          Your private dashboard is being set up within 24 hours. Here is the shape of
          the engagement.
        </p>
        <div className={styles.sec}>
          <p className={styles.secLabel}>The two weeks</p>
          <div className={styles.layers}>
            <LayerRow n="01" title="Engagement" g="dashboard provisioned within 24 hours; roles confirmed." />
            <LayerRow n="02" title="Kickoff" g="a one-hour call within three business days, with your contributors and lead decider." />
            <LayerRow n="03" title="Drafting" g="week one: we draft all five layers, customized to you; you review in the dashboard." />
            <LayerRow n="04" title="Revision" g="week two: a one-hour call to resolve comments and lock revisions." />
            <LayerRow n="05" title="Ratification" g="end of week two: your deciding team ratifies, without us in the room." />
            <LayerRow n="06" title="Rollout" g="board packet, staff announcement, and constituent materials, ready to deploy." />
          </div>
        </div>
        <div className={styles.sec}>
          <p className={styles.secLabel}>Who to gather</p>
          <p className={styles.body} style={{ marginTop: "0.2rem" }}>
            Four to seven contributors across your functions, plus one lead decider.
            About 3–4 hours per contributor across the two weeks.
          </p>
        </div>
        <p className={styles.honest}>
          Your first move is the org-wide read: we send the reality check to your whole
          team, so the Handbook is built on what's actually true.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Stage 01 · Safety · Free, and we guide you</p>
      <h1>Your field guide is on its way.</h1>
      <p className={styles.body}>
        Check your inbox for <em>It Starts With Safety</em>. It walks your team through
        all five layers of your AI Handbook, with a checklist for each.
      </p>
      <div className={styles.sec}>
        <p className={styles.secLabel}>How to use it</p>
        <div className={styles.layers}>
          <LayerRow n="1" title="Gather your leadership" g="the people who can actually decide." />
          <LayerRow n="2" title="Work the five layers" g="in order, over a few weeks. Each builds on the one before." />
          <LayerRow n="3" title="Ratify it" g="your board adopts it. That is when the trust dividend arrives." />
        </div>
      </div>
      <div className={styles.sec}>
        <p className={styles.secLabel}>What doing it with us adds</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Two weeks instead of two months. We draft it; you review and ratify in a live
          dashboard. Print-quality PDF and rollout materials included. $1,000.
        </p>
      </div>
      <p className={styles.honest}>
        Whichever way you go, the first move is the same: get your whole team’s honest
        read.
      </p>
    </div>
  );
}
