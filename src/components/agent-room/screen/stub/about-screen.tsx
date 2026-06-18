"use client";

import Link from "next/link";

import type { AboutScreenProps } from "@/lib/agent-room/component-props";
import { MOVEMENTAL_FOUNDING } from "@/lib/agent-room/naming";

import { AskAiPromptButton } from "../../ink/ask-ai-prompt-button";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { FoundersTeam } from "./founders-screen";

/** In-room About entry — points to the full `/agent/about` document. */
export function AboutScreen({ onHome, stream }: ScreenProps) {
  const lede =
    (stream?.props as AboutScreenProps | undefined)?.lede ??
    "We help churches, nonprofits, and schools use AI without losing the trust their work depends on.";
  return (
    <div>
      <Crumb onHome={onHome} />
      <h1>About Movemental</h1>
      <p>{lede}</p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Who we are</p>
        <p className={styles.body}>
          Alan Hirsch, Brad Brisco, and Josh Shepherd. Alan is Co-Founder and Chief Movement
          Officer. Brad is Co-Founder and CEO. Josh is Founder and CTO. {MOVEMENTAL_FOUNDING.origin}
        </p>
        <FoundersTeam />
      </div>

      <p className={styles.body} style={{ marginTop: "1.25rem" }}>
        The full story lives on the About page. Why we exist, the Babel and Pentecost ethic, what we
        refuse, and the formation stakes.
      </p>
      <p className={styles.body} style={{ marginTop: "0.85rem" }}>
        <Link className={styles.inlineLink} href="/agent/about">
          Read About Movemental →
        </Link>
      </p>

      <AskAiPromptButton promptKey="aboutStub" />
    </div>
  );
}
