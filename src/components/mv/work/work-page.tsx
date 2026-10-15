import Link from "next/link";

import { MV_PROOF_SITES, MV_ROUTES } from "../routes";

/**
 * Work with Movemental (/work-with-us). Board: Work (docs/handoff/work-with-us-new/source/).
 * Copy verbatim. No prices.
 */

const CAPS = [
  {
    n: "01",
    title: "Organizational guidance",
    text: "Institutional AI strategy, governance, leadership facilitation and implementation planning.",
    have: "A ratified charter, a clear record of who decides what, and a plan for the first year.",
  },
  {
    n: "02",
    title: "Context reconstruction",
    text: "The structured gathering and organizing of fragmented documents, archives, institutional knowledge, policies and workflows.",
    have: "Your scattered material gathered, repaired and organized, maps of how your work actually happens, and everything the charter keeps out, kept out.",
  },
  {
    n: "03",
    title: "Custom platforms and agents",
    text: "Purpose-built applications and AI-enabled interfaces grounded in your organization’s sources, permissions and actual work.",
    have: "A workspace and assistants that draw only on approved sources, with permissions that follow your roles and a named person who answers for each tool.",
  },
  {
    n: "04",
    title: "Ongoing stewardship",
    text: "Continued management, evaluation, improvement and adaptation as technology and organizational needs change.",
    have: "Maintenance, changes when the technology or your work changes, and reviews on the same rhythm as your Map.",
  },
];

const STEPS = [
  ["A conversation", "About where your organization is, what your people are saying and what you are trying to decide."],
  ["Discovery", "We learn enough to prepare something useful, without asking you to do our work for us."],
  ["A written proposal", "Scope, deliverables, timeline, what each side provides, terms and stewardship, before any work begins."],
  ["The work, in your Map", "Everything we do is recorded where your organization keeps its decisions, so it stays yours."],
  ["Stewardship and review", "What we build is maintained and reviewed with you, for as long as it serves the work."],
];

const CONTROL = [
  "Your charter decides what any system may know and do.",
  "Nothing is adopted until the people who decide adopt it.",
  "Your workspace is kept separate from every other organization’s: documents, workflows, permissions and exports.",
  "Every tool shows its sources, its limits and the person who answers for it.",
  "You can export what is yours.",
];

const SITES = [
  [MV_PROOF_SITES.alanHirsch, "alanhirsch.com", "A body of work, gathered and answering for itself · Live"],
  [MV_PROOF_SITES.bradBrisco, "bradbrisco.org", "A movement leader’s platform · Live"],
  [MV_PROOF_SITES.michaelCooper, "drmichaelcooper.com", "A movement leader’s platform · Live"],
];

const FAQ: [string, string][] = [
  [
    "Do we have to work with you to use the Map?",
    "No. The Resolution, the Reality Assessment, the Map and the guidebook are free, and a capable team can do the whole method on its own. Organizations come to us when they want help carrying it into practice.",
  ],
  [
    "What does it cost?",
    "It depends on what your organization has decided to do. Every proposal is written for one organization, with its scope and terms stated before any work begins. We talk about cost in the first conversation.",
  ],
  [
    "We haven’t decided anything yet. Is it too early?",
    "No. Deciding is the first stage of the Map, and it is often where we start. We won’t build anything before your organization has decided it should exist.",
  ],
  [
    "Will you build agents for us?",
    "When your organization decides one belongs. What we offer is not the ability to make agents. It is a governed environment that works from your own sources, that your people can supervise, and that we help you keep.",
  ],
  // TODO(S06-work-with-us-new): "Who will we work with?" waits for Josh to confirm who leads conversations.
];

const READ = { lineHeight: 1.55 } as const;

export function WorkPage() {
  return (
    <>
      <section className="mv-wrap" style={{ paddingTop: 96, paddingBottom: 88 }}>
        <div className="mv-split mv-split--end">
          <div className="mv-stack" style={{ gap: 20 }}>
            <p className="mv-eyebrow">WORK WITH MOVEMENTAL</p>
            <h1 className="mv-h1 mv-h1--xl" style={{ lineHeight: 0.98 }}>
              From conviction to working systems.
            </h1>
          </div>
          <div className="mv-stack mv-reading" style={{ gap: 16, maxWidth: 640, fontSize: 21, ...READ }}>
            <p>
              An organization can decide what it believes about AI and still struggle to put those
              convictions into practice.
            </p>
            <p>Movemental helps bridge that distance.</p>
            <p>
              We work alongside your leaders to establish a responsible approach, prepare the
              knowledge your organization depends on, form your people, and build the tools that
              serve your mission.
            </p>
            <p>
              Where ongoing technology is needed, we develop and steward your organization’s own
              AI-enabled environment.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", paddingTop: 10 }}>
              <Link className="mv-pill" href={MV_ROUTES.discuss}>
                Discuss your organization’s response
              </Link>
              <a className="mv-more" style={{ fontSize: 15, fontFamily: "var(--mv-font-ui)" }} href="#practice">
                See the platform in practice
              </a>
            </div>
            <p className="mv-caption mv-muted" style={{ fontFamily: "var(--mv-font-ui)" }}>
              The Resolution, the Reality Assessment, the Map and the guidebook are free. A capable
              team can do the whole method without us.
            </p>
          </div>
        </div>
      </section>

      <section className="mv-wrap" style={{ paddingBottom: 104 }}>
        <div className="mv-caps">
          {CAPS.map((c, i) => (
            <div key={c.n} className={`mv-cap-row${i < 2 ? " mv-cap-row--lead" : ""}`}>
              <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1 }}>{c.n}</span>
              <div className="mv-stack" style={{ gap: 10 }}>
                <h2 className="mv-h3--sm" style={{ fontSize: 34 }}>
                  {c.title}
                </h2>
                <p className="mv-soft" style={{ fontSize: 16, lineHeight: 1.6 }}>
                  {c.text}
                </p>
                <p className="mv-muted" style={{ fontSize: 13, marginTop: 6 }}>
                  What you would have
                </p>
                <p className="mv-reading" style={{ fontSize: 16.5, lineHeight: 1.5 }}>
                  {c.have}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mv-caption mv-muted" style={{ marginTop: 18 }}>
          Illustrative. Every engagement is scoped to what your organization has decided.
        </p>
      </section>

      <section className="mv-section--sheet" style={{ padding: "96px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 40 }}>
          <div className="mv-stack" style={{ gap: 12, maxWidth: 760 }}>
            <h2 className="mv-h2">How working together goes</h2>
            <p className="mv-reading mv-soft" style={{ fontSize: 19, ...READ }}>
              Paid work only ever follows a decision your organization made. If you haven’t yet
              decided what AI should and shouldn’t do in your work, that is where we start.
            </p>
          </div>
          <ol className="mv-five">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 40, lineHeight: 1 }}>{i + 1}</span>
                <p style={{ fontSize: 17, fontWeight: 500 }}>{t}</p>
                <p className="mv-small mv-soft">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mv-wrap" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mv-two" style={{ gap: 56 }}>
          <div className="mv-stack" style={{ gap: 16 }}>
            <h2 className="mv-h2">Shared infrastructure. Your organization’s context, commitments and decisions.</h2>
            <p className="mv-reading mv-soft" style={{ fontSize: 19, ...READ }}>
              Movemental builds on a common technical foundation, but an institution’s knowledge,
              responsibilities and ways of working are never interchangeable.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>What stays under your control</p>
            <ul className="mv-ruled-lines" style={{ listStyle: "none", padding: 0 }}>
              {CONTROL.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--mv-rule)", padding: "96px 0" }}>
        <div className="mv-wrap mv-split">
          <h2 className="mv-h2">For denominations and networks</h2>
          <div className="mv-stack" style={{ gap: 14, maxWidth: 640 }}>
            <p className="mv-reading" style={{ fontSize: 19, ...READ }}>
              A network can offer the response to every church or organization in it at once. Each
              affiliate keeps its own authority, documents, permissions and private context. Shared
              infrastructure never becomes shared data, and the network sees only what its role
              permits.
            </p>
            <Link className="mv-more" style={{ fontSize: 15 }} href={MV_ROUTES.discuss}>
              Talk with us about a network
            </Link>
          </div>
        </div>
      </section>

      <section id="practice" className="mv-section--sheet" style={{ padding: "96px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 32 }}>
          <div className="mv-stack" style={{ gap: 12, maxWidth: 760 }}>
            <h2 className="mv-h2">Built with people already doing the work</h2>
            <p className="mv-reading mv-soft" style={{ fontSize: 19, ...READ }}>
              The same foundation already runs the platforms of movement leaders. Each case below
              says plainly how far along it is.
            </p>
          </div>
          <div className="mv-three" style={{ gap: 20 }}>
            {SITES.map(([href, host, note]) => (
              <a key={host} className="mv-preview-link" href={href} rel="noopener noreferrer" target="_blank">
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 24 }}>{host}</span>
                <span className="mv-caption mv-muted">{note}</span>
              </a>
            ))}
          </div>
          <div className="mv-stack" style={{ borderTop: "1px solid var(--mv-ink)" }}>
            <p style={{ fontSize: 15, fontWeight: 500, padding: "14px 0 6px" }}>Organizations</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: 16,
                alignItems: "baseline",
                padding: "14px 0",
                borderTop: "1px solid var(--mv-rule)",
              }}
            >
              <span className="mv-stack" style={{ gap: 2 }}>
                <span className="mv-reading">Youthfront</span>
                <span className="mv-caption mv-muted">
                  A youth-serving nonprofit doing the method in its own work, starting with its
                  charter
                </span>
              </span>
              <span className="mv-status">In development</span>
            </div>
            <p className="mv-muted" style={{ fontSize: 13.5, marginTop: 10 }}>
              A committed project is not a completed case study. Status changes here only when the
              work does.
            </p>
          </div>
        </div>
      </section>

      <section className="mv-wrap" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mv-split">
          <h2 className="mv-h2">Questions leaders ask</h2>
          <div className="mv-faq">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p className="mv-reading mv-soft" style={{ fontSize: 17.5, lineHeight: 1.6 }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mv-band-ink" style={{ padding: "112px 0" }}>
        <div className="mv-wrap mv-stack" style={{ maxWidth: 900, gap: 22, alignItems: "flex-start" }}>
          <h2 className="mv-h2 mv-h2--lg">
            Start with a conversation.
          </h2>
          <p className="mv-reading mv-on-ink-soft" style={{ fontSize: 20, ...READ }}>
            Tell us a little about your organization and what is in front of you. It takes about two
            minutes.
          </p>
          <Link className="mv-pill" href={MV_ROUTES.discuss}>
            Discuss your organization’s response
          </Link>
        </div>
      </section>
    </>
  );
}
