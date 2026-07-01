import {
  ABOUT_SCREEN_LEDE,
  AGENT_ROOM_NOSCRIPT,
  HOME_LEAD_CHIP_LABEL,
  HOME_SCREEN_COPY,
} from "@/lib/agent-room/data/home-copy";
import { CONCIERGE_VOICE } from "@/lib/agent-room/data/concierge-voice-lines";
import { PATH_STAGE_LABELS, PATH_STAGE_RAIL } from "@/lib/agent-room/naming";

import styles from "./ink-band.module.css";

/**
 * The crawlable, no-JS spine. Server-rendered into the initial HTML; the live
 * room hides it once it boots. Copy imports from shared SSOT modules — the agent
 * re-orchestrates this on the wall, it does not invent it.
 */
export function AgentRoomFallback() {
  const pathSummary = PATH_STAGE_RAIL.map(
    (stage) => `${stage.n} · ${stage.title}`,
  ).join(" · ");

  return (
    <main className={styles.fallback}>
      <noscript>
        <p className={styles.fallbackNoscript}>{AGENT_ROOM_NOSCRIPT}</p>
      </noscript>

      <header className={styles.fallbackMast}>
        <p className={styles.mastAudience} aria-label="Who we serve">
          Non-profits · Churches · Institutions
        </p>
        <a className={styles.fallbackSignIn} href="/login?next=/agent">
          Sign in
        </a>
      </header>

      <section>
        <h1>{HOME_SCREEN_COPY.headline}</h1>
        <p>
          {HOME_SCREEN_COPY.bodyBeforePhrase}{" "}
          <strong>{HOME_SCREEN_COPY.phrase}</strong>
          {HOME_SCREEN_COPY.bodyAfterPhrase}
        </p>
        <p>{HOME_SCREEN_COPY.networkLine}</p>
        <p className={styles.fallbackConcierge}>{CONCIERGE_VOICE.openingGreeting}</p>
        <p>
          <a href="/agent#safety-flow">{HOME_LEAD_CHIP_LABEL}</a>
          {" — "}
          interactive safety-flow wizard requires JavaScript.
        </p>
      </section>

      <section>
        <div className={styles.nb}>The path · four steps, in order</div>
        <h2>
          {PATH_STAGE_LABELS.safety}, then {PATH_STAGE_LABELS.sandbox}, then{" "}
          {PATH_STAGE_LABELS.training}, then {PATH_STAGE_LABELS.tech}.
        </h2>
        <p>{pathSummary}</p>
        <p>
          <b>01 · {PATH_STAGE_LABELS.safety}</b> decide what&rsquo;s wise before the tools.{" "}
          <b>02 · {PATH_STAGE_LABELS.sandbox}</b> try AI against real work in a bounded place.{" "}
          <b>03 · {PATH_STAGE_LABELS.training}</b> form the people who&rsquo;ll steward it well.{" "}
          <b>04 · {PATH_STAGE_LABELS.tech}</b> build what your work needs, governed by policy
          your board can stand behind.
        </p>
      </section>

      <section>
        <div className={styles.nb}>About Movemental</div>
        <p>{ABOUT_SCREEN_LEDE}</p>
        <p>
          <a href="/agent/about">Read the full About page →</a>
        </p>
      </section>

      <section>
        <div className={styles.nb}>Pricing</div>
        <p>
          Every price lives in the interactive room —{" "}
          <a href="/agent?scene=pricing">open Pricing</a> after JavaScript loads, or visit{" "}
          <a href="/enroll">Enroll</a> for commercial intent.
        </p>
      </section>

      <section>
        <div className={styles.nb}>Shareable entry points</div>
        <ul className={styles.fallbackNav}>
          <li>
            <a href="/agent?scene=faq">FAQ</a>
          </li>
          <li>
            <a href="/agent?scene=path">The path</a>
          </li>
          <li>
            <a href="/agent?scene=safety">Safety</a>
          </li>
          <li>
            <a href="/agent?scene=contact">Contact</a>
          </li>
        </ul>
      </section>

      <section>
        <div className={styles.nb}>Document library</div>
        <ul className={styles.fallbackNav}>
          <li>
            <a href="/research">Research</a>
          </li>
          <li>
            <a href="/articles">Articles</a>
          </li>
          <li>
            <a href="/voices">Trusted voices</a>
          </li>
          <li>
            <a href="/footnotes">Footnotes</a>
          </li>
        </ul>
      </section>

      <nav aria-label="Audience pages">
        <div className={styles.nb}>Who we serve</div>
        <ul className={styles.fallbackNav}>
          <li>
            <a href="/agent/nonprofits">Non-profits</a>
          </li>
          <li>
            <a href="/agent/churches">Churches</a>
          </li>
          <li>
            <a href="/agent/institutions">Institutions</a>
          </li>
        </ul>
      </nav>

      <section>
        <div className={styles.nb}>Contact</div>
        <p>
          For anything a person should answer:{" "}
          <a href="mailto:josh@movemental.ai">josh@movemental.ai</a>.
        </p>
      </section>
    </main>
  );
}
