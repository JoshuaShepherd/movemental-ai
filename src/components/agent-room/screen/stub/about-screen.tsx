"use client";

import Link from "next/link";

import { MOVEMENTAL_FOUNDING } from "@/lib/agent-room/naming";

import { AskAiPromptButton } from "../../ink/ask-ai-prompt-button";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { FoundersTeam } from "./founders-screen";

/** In-room About entry — points to the full `/agent/about` document. */
export function AboutScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <h1>About Movemental</h1>
      <p>
        We help churches, nonprofits, and schools use AI without losing the trust their work
        depends on.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Who we are</p>
        <p className={styles.body}>
          Alan Hirsch, Brad Brisco, and Joshua Shepherd, a missiologist, a missional strategist,
          and the builder carrying the founding calling. {MOVEMENTAL_FOUNDING.origin}
        </p>
        <FoundersTeam />
      </div>

      <p className={styles.body} style={{ marginTop: "1.25rem" }}>
        The full story, why we exist, the Babel vs. Pentecost ethic, what we refuse, and the
        formation stakes, lives on the About page.
      </p>
      <p className={styles.body} style={{ marginTop: "0.85rem" }}>
        <Link className={styles.inlineLink} href="/agent/about">
          Read About Movemental →
        </Link>
      </p>

      <AskAiPromptButton
        prompt={`I'm on Movemental's About page (movemental.ai/agent/about). Summarize who founded it, why it exists, and what makes its approach to AI different from typical church-tech vendors.`}
      />
    </div>
  );
}
