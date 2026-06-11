"use client";

import { MOVEMENTAL_FOUNDING } from "@/lib/agent-room/naming";
import { AskAiPromptButton } from "../../ink/ask-ai-prompt-button";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { FoundersTeam } from "./founders-screen";

/** About Movemental — intro copy and who we are. */
export function AboutScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <h1>About Movemental</h1>
      <p>
        We help churches, nonprofits, and schools use AI without losing the trust
        their work depends on.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Who We Are</p>
        <p className={styles.body}>
          Three people started it. Alan Hirsch, a missiologist whose writing shaped
          how a generation understands movements. Brad Brisco, who has spent decades
          building missional infrastructure. And Joshua Shepherd, who builds the
          technology and carries the founding calling. {MOVEMENTAL_FOUNDING.origin}{" "}
          The conversation was about authorship, credibility, and what AI was about
          to do to both.
        </p>
        <FoundersTeam />
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What we build</p>
        <p className={styles.body}>
          We build trust networks of leaders and organizations with existing
          credibility. Our movement leader &ldquo;scenius&rdquo; is the backbone and
          prototypical example of our digital and organizational work, built in response
          to the ongoing threats to public credibility and publication posed by AI.
        </p>
        <p className={styles.body} style={{ marginTop: "0.85rem" }}>
          AI has flooded the world with content, and a single platform, however good, is
          lost in it. Credibility now travels the way it always has in person, through
          who vouches for whom. When trusted leaders link to and cite one another, the
          whole becomes visible and believable in a way no one of them could be alone.
        </p>
      </div>

      <AskAiPromptButton />
    </div>
  );
}
