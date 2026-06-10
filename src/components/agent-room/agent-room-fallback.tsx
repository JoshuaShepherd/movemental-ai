import styles from "./ink-band.module.css";

/**
 * The crawlable, no-JS spine. Server-rendered into the initial HTML; the live
 * room hides it once it boots. The real words live here — the agent
 * re-orchestrates this copy, it does not invent it.
 */
export function AgentRoomFallback() {
  return (
    <main className={styles.fallback}>
      <section>
        <h1>AI is already inside your organization. The work now is to get it right.</h1>
        <p>
          Your people are already using it — on emails, donor letters, lesson
          plans, sermons — usually with no policy, no training, and no one
          deciding what&rsquo;s wise. The thing most at risk isn&rsquo;t the
          technology. It&rsquo;s the trust your work depends on.
        </p>
        <p>
          Movemental is a focused guide for one thing: helping you see where your
          organization actually stands with AI, and what to do next. Built with —
          and vouched for by — Alan Hirsch, Brad Brisco, Dave Ferguson, Michael
          Frost, Deb Hirsch, JR Woodward, and a growing network of leaders the
          field already trusts.
        </p>
      </section>

      <section>
        <div className={styles.nb}>The path · four steps, in order</div>
        <h2>It all starts with Safety. The rest earns its turn.</h2>
        <p>
          <b>01 · Safety</b> — get your arms around AI responsibly: a real,
          ratified charter your board can stand behind, before anything else.
          Walk it yourself with the free field guide, or have us draft it with you
          in two weeks for $1,000.
        </p>
        <p>
          <b>02 · Sandbox</b> — a bounded place to test AI against real work,
          without risk. <b>03 · Training</b> — we form the people who&rsquo;ll
          steward it well. <b>04 · Tech</b> — we build the tools your work
          needs, connected to everything you have. Each earns the next; skip a
          step and the rest have nothing to stand on.
        </p>
      </section>

      <section>
        <div className={styles.nb}>The network · leaders, connected</div>
        <h2>The leaders we built this with — and they&rsquo;re connected.</h2>
        <p>
          Real leaders who&rsquo;ve done the work for decades, now linked to one
          another and to Movemental: Alan Hirsch, Brad Brisco, Dave Ferguson, Deb
          Hirsch, Michael Frost, JR Woodward, Rowland Smith, Liz Rios, Jon
          Huckins, Danielle Strickland, Tim Catchim, Brian Sanders, and more.
        </p>
        <p>
          They aren&rsquo;t endorsers. They&rsquo;re the first node of something
          we build on purpose — a connected network, not a lone website — because
          in an AI-shaped internet, isolated organizations vanish into the noise
          and connected ones compound.
        </p>
      </section>

      <section>
        <div className={styles.nb}>What it costs · plainly</div>
        <h2>The method is free. The help is honestly priced.</h2>
        <p>
          <b>SafeGuide — free.</b> The 33-page field guide; your team builds the
          AI Charter itself, at its own pace. Genuinely sufficient on its own.
        </p>
        <p>
          <b>SafeStart — $1,000.</b> Two weeks, fixed. We draft your five-layer
          Charter, customized to your organization; your team revises and ratifies
          it in a private dashboard. Sandbox, Training, and Tech come later,
          each in its turn.
        </p>
      </section>

      <section>
        <div className={styles.nb}>Who this is for</div>
        <h2>If your work runs on trust, this is for you.</h2>
        <p>
          <b>Churches</b> — the pastoral and disclosure questions: sermons, member
          data, the pulpit. <b>Nonprofits</b> — the fiduciary and donor-data
          questions your board owns. <b>Seminaries &amp; institutions</b> — the
          three-constituency picture across faculty, students, and administration.
        </p>
      </section>

      <section>
        <div className={styles.nb}>Who stands behind this</div>
        <p>
          &ldquo;Alan Hirsch, Brad Brisco, and the leaders in this network help
          shape what we build for churches, nonprofits, and seminaries — and they
          put their names on it.&rdquo;
        </p>
        <p>
          For anything a person should answer:{" "}
          <a href="mailto:josh@movemental.ai">josh@movemental.ai</a>.
        </p>
      </section>
    </main>
  );
}
