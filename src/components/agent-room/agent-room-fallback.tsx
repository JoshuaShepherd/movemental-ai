import styles from "./ink-band.module.css";

/**
 * The crawlable, no-JS spine. Server-rendered into the initial HTML; the live
 * room hides it once it boots. Copy matches the prototype home screen
 * (`movemental-agentic-front-end/pages/home.html`) — the agent re-orchestrates
 * this on the wall, it does not invent it.
 */
export function AgentRoomFallback() {
  return (
    <main className={styles.fallback}>
      <section>
        <p className={styles.eyebrow}>Non-profit · Church · Institution · Leader</p>
        <h1>Navigate AI without eroding the trust you spent decades earning.</h1>
        <p>
          We help mission-driven organizations respond to AI without losing{" "}
          <strong>the trust their work depends on</strong>, by walking with them
          through one ordered path: get safe, experiment, form your people, then
          build.
        </p>
        <p>
          Built with and backed by movement leaders including Alan Hirsch, Brad
          Brisco, JR Woodward, Dave Ferguson, Josh Shepherd, and others in the
          network.
        </p>
      </section>

      <section>
        <div className={styles.nb}>The path · four steps, in order</div>
        <h2>Safety, then Sandbox, then Skills, then Solutions.</h2>
        <p>
          <b>01 · Safety</b> — decide what&rsquo;s wise before the tools.{" "}
          <b>02 · Sandbox</b> — try AI against real work in a bounded place.{" "}
          <b>03 · Skills</b> — form the people who&rsquo;ll steward it well.{" "}
          <b>04 · Solutions</b> — build what your work needs, governed by policy
          your board can stand behind.
        </p>
      </section>

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
