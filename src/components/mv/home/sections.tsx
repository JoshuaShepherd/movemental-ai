import Link from "next/link";

import { MV_PROOF_SITES, MV_ROUTES } from "../routes";
import { ResolvePreview } from "./resolve-preview";

/*
 * Sections of /home-page-new, in page order. Copy is verbatim from the Claude Design board
 * docs/handoff/home-page-new/source/Home-v3.dc.html, which is the source of truth for words
 * and layout. Do not paraphrase; record questions in docs/handoff/home-page-new/README.md.
 */

/**
 * The first screen (board Home-Headline-C): the headline centered on two lines, broken after "AI,",
 * sized from the page width so each line always fits; one call; the network peeking at the fold.
 */
export function HomeHero() {
  return (
    <section id="top" className="mv-hl-stage">
      <div className="mv-hl-band">
        <h1
          className="mv-hl"
          aria-label="Movemental is an organizational response to AI, shaped by nonprofit, church, and seminary leaders."
        >
          <span aria-hidden="true">Movemental is an organizational response to AI,</span>
          <span aria-hidden="true">shaped by nonprofit, church, and seminary leaders.</span>
        </h1>
      </div>
      <p className="mv-hl-sub">Say what you believe about AI in your organization.</p>
      <Link className="mv-hl-go" href={MV_ROUTES.resolve}>
        Start with Resolve
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </Link>
      <p className="mv-hl-note">4 minutes. 9 statements. Optionally share with your organization.</p>
    </section>
  );
}

const STATS: readonly { n: string; text: string; source: string; href: string }[] = [
  {
    n: "81%",
    text: "of nonprofits using AI use it individually, outside any shared workflow. Only 7% report major gains.",
    source: "Virtuous and Fundraising.AI, 2026, 346 nonprofits",
    href: "https://www.nonprofitpro.com/article/nonprofit-ai-adoption-hits-92-but-only-7-see-major-impact/",
  },
  {
    n: "5%",
    text: "of church leaders have an AI policy. 64% say one is important.",
    source: "Barna and Pushpay, 2026, 1,306 church leaders",
    href: "https://www.barna.com/research/church-leaders-ai-usage-concerns/",
  },
  {
    n: "78%",
    text: "of people using AI at work bring their own tools.",
    source: "Microsoft and LinkedIn, 2024 Work Trend Index",
    href: "https://news.microsoft.com/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/",
  },
];

export function AlreadyResponding() {
  return (
    <section className="mv-section">
      <div className="mv-wrap mv-split">
        <h2 className="mv-h2">Your organization is already responding to AI.</h2>
        <div className="mv-stack" style={{ gap: 40 }}>
          <div className="mv-stack mv-reading-lg" style={{ gap: 18, maxWidth: 640 }}>
            <p>
              On a Tuesday night, a development officer pastes this year’s appeal into a chatbot and
              asks it to sound warmer. Across town, an executive pastor learns that the sermon he
              praised was partly drafted by a model. At a seminary, two professors teach under
              opposite rules, and their students have noticed.
            </p>
            <p>Added together, those decisions are already a response.</p>
            <p>No one chose it.</p>
          </div>
          <ul className="mv-ruled-list">
            {STATS.map((s) => (
              <li key={s.n} className="mv-stat">
                <span className="mv-stat-n">{s.n}</span>
                <span className="mv-stack" style={{ gap: 6 }}>
                  <span className="mv-body" style={{ lineHeight: 1.5 }}>
                    {s.text}
                  </span>
                  <a href={s.href} className="mv-caption mv-muted">
                    {s.source}
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <p className="mv-caption mv-muted">
            Every figure on this site links to its source.{" "}
            <Link href={MV_ROUTES.sources} className="mv-muted">
              See all sources
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

const QUESTIONS = [
  "What happens to presence?",
  "What does responsible care look like when machines can imitate attention?",
  "What happens to vocation?",
  "Which work should stay a person’s, even when a machine is faster?",
  "What becomes of the people with the least power?",
  "Who receives the time that AI gives back?",
] as const;

export function HumanQuestions() {
  return (
    <section className="mv-section mv-section--sheet">
      <div className="mv-wrap mv-stack" style={{ gap: 56 }}>
        <div className="mv-stack" style={{ gap: 20, maxWidth: 760 }}>
          <h2 className="mv-h2">Someone has to ask the human questions.</h2>
          <div className="mv-stack mv-body mv-muted" style={{ gap: 10, maxWidth: 580 }}>
            <p>
              Technology companies, businesses and governments are each answering part of the
              question of how we live with AI. They should.
            </p>
            <p>These questions belong to the rest of us, too.</p>
          </div>
        </div>
        <ul className="mv-ruled-list">
          {QUESTIONS.map((q) => (
            <li key={q} className="mv-litany" style={{ padding: "22px 0" }}>
              {q}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ResolveSection() {
  return (
    <section id="resolve" className="mv-section">
      <div className="mv-wrap mv-stack" style={{ gap: 56 }}>
        <div className="mv-split mv-split--end">
          <h2 className="mv-big">Resolve</h2>
          <div className="mv-stack mv-body-lg" style={{ gap: 14, maxWidth: 600 }}>
            <p>Say, in writing, what you believe your organization should do as AI changes its work.</p>
            <p>
              Across nine themes, mark the statements you agree with and identify the ones that
              matter most to you.
            </p>
            <p>Your Resolution belongs to you. It stays private unless you choose to share it.</p>
            <p className="mv-caption mv-muted">
              About four minutes. No account. It isn’t a policy, a score or a vote. It is what you
              believe.
            </p>
          </div>
        </div>
        <ResolvePreview />
      </div>
    </section>
  );
}

const AGREEMENT: readonly { text: string; count: string; width: string }[] = [
  { text: "say plainly how AI is used here, including by our leaders.", count: "8 of 9", width: "89%" },
  { text: "keep the moments of care human.", count: "7 of 9", width: "78%" },
  { text: "form our own views before we ask AI for one.", count: "6 of 9", width: "67%" },
];

export function Agreement() {
  return (
    <section className="mv-section mv-section--ruled">
      <div className="mv-wrap mv-desk">
        <div className="mv-stack" style={{ gap: 20, order: 2 }}>
          <h2 className="mv-h2">When several people resolve, you can see where you agree.</h2>
          <div className="mv-stack mv-body mv-muted" style={{ gap: 12, maxWidth: 440 }}>
            <p>Agreement becomes a starting point. Difference becomes an agenda.</p>
            <p>Neither becomes policy until the people responsible for deciding have decided.</p>
            <p className="mv-small">
              Each Resolution stays private unless its author shares it. An organization sees only
              counts, drawn from what participants have chosen to contribute.
            </p>
          </div>
        </div>
        <figure className="mv-stack" style={{ gap: 28 }}>
          <div>
            <p className="mv-small mv-muted" style={{ marginBottom: 6 }}>
              Most of the team resolved that we should
            </p>
            <ul className="mv-ruled-list" style={{ borderBottom: "none" }}>
              {AGREEMENT.map((a) => (
                <li
                  key={a.text}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr) 72px",
                    gap: "8px 24px",
                    padding: "18px 0",
                  }}
                >
                  <span className="mv-reading">{a.text}</span>
                  <span className="mv-small" style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {a.count}
                  </span>
                  <span style={{ gridColumn: "1 / -1" }} aria-hidden="true">
                    <span className="mv-bar">
                      <span style={{ width: a.width }} />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mv-small mv-muted" style={{ marginBottom: 6 }}>
              The team is divided on whether we should
            </p>
            <ul className="mv-ruled-list">
              <li className="mv-stack" style={{ gap: 14, padding: "18px 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 24 }}>
                  <span className="mv-reading">give the time AI saves back to people, to creation and to play.</span>
                  <span className="mv-reading" style={{ textAlign: "right" }}>
                    lower our costs first, so more reaches the mission.
                  </span>
                </div>
                <span aria-hidden="true" style={{ display: "flex", height: 6, gap: 3 }}>
                  <span style={{ width: "44%", background: "var(--mv-ink)" }} />
                  <span style={{ width: "56%", background: "var(--mv-graphite)", opacity: 0.55 }} />
                </span>
                <div
                  className="mv-small"
                  style={{ display: "flex", justifyContent: "space-between", fontVariantNumeric: "tabular-nums" }}
                >
                  <span>4 of 9</span>
                  <span>5 of 9</span>
                </div>
              </li>
            </ul>
          </div>
          <figcaption className="mv-caption mv-muted">An illustrative team of nine.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function StageTitle({ n, title }: { n: number; title: string }) {
  return (
    <h3 className="mv-h3">
      <span className="mv-sr-only">Stage {n}. </span>
      {title}
    </h3>
  );
}

export function RespondMap() {
  return (
    <section id="respond" className="mv-section mv-section--sheet">
      <div className="mv-wrap mv-stack" style={{ gap: 64 }}>
        <div className="mv-split mv-split--end">
          <h2 className="mv-big">Respond</h2>
          <div className="mv-stack mv-body-lg" style={{ gap: 14, maxWidth: 600 }}>
            <p>
              Resolving takes minutes and belongs to each person. Responding takes months and
              belongs to the organization.
            </p>
            <p>
              The Map helps leaders turn convictions into legitimate decisions, prepare their
              institutional knowledge, form their people, and build the systems that actually belong.
            </p>
            <p className="mv-muted">Each stage leaves the organization with something it can keep.</p>
          </div>
        </div>
        <ol className="mv-ruled-list" style={{ borderTop: "none" }}>
          <li className="mv-step">
            <span aria-hidden="true" className="mv-step-n">01</span>
            <div className="mv-stack" style={{ gap: 14 }}>
              <StageTitle n={1} title="Decide what you will stand for" />
              <p className="mv-body mv-muted" style={{ maxWidth: 460 }}>
                Establish the convictions, responsibilities and boundaries that will guide your
                organization’s use of AI.
              </p>
            </div>
            <div className="mv-plate">
              <p className="mv-caption mv-muted">From a church’s AI Charter</p>
              <p className="mv-reading" style={{ lineHeight: 1.5 }}>
                AI may carry the administrative weight of ministry. It may not stand in for a person
                where presence is the point.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, paddingTop: 14 }}>
                <span className="mv-caption mv-muted" style={{ borderTop: "1px solid var(--mv-ink)", paddingTop: 8 }}>
                  Signed by the lead pastor
                </span>
                <span className="mv-caption mv-muted" style={{ borderTop: "1px solid var(--mv-ink)", paddingTop: 8 }}>
                  Ratified by the board
                </span>
              </div>
            </div>
          </li>

          <li className="mv-step">
            <span aria-hidden="true" className="mv-step-n">02</span>
            <div className="mv-stack" style={{ gap: 14 }}>
              <StageTitle n={2} title="Gather what should ground the work" />
              <p className="mv-body mv-muted" style={{ maxWidth: 460 }}>
                Bring together the documents, knowledge, workflows and relationships that AI may
                responsibly work from, within the boundaries your organization has established.
              </p>
            </div>
            <div className="mv-plate">
              <p className="mv-caption mv-muted">What an AI system may know</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li className="mv-plate-row">
                  <span>Sermon and teaching archive</span>
                  <span className="mv-muted">Gathered</span>
                </li>
                <li className="mv-plate-row">
                  <span>Membership pathway</span>
                  <span className="mv-muted">Mapped</span>
                </li>
                <li className="mv-plate-row">
                  <span className="mv-muted" style={{ textDecoration: "line-through" }}>
                    Pastoral care and prayer requests
                  </span>
                  <span style={{ fontWeight: 500 }}>Excluded by the Charter</span>
                </li>
              </ul>
            </div>
          </li>

          <li className="mv-step">
            <span aria-hidden="true" className="mv-step-n">03</span>
            <div className="mv-stack" style={{ gap: 14 }}>
              <StageTitle n={3} title="Practice the judgment your people will need" />
              <p className="mv-body mv-muted" style={{ maxWidth: 460 }}>
                Help staff and leaders develop the habits, shared understanding and practical
                discernment required to use AI well.
              </p>
            </div>
            <div className="mv-plate">
              <p className="mv-caption mv-muted">AI for Church Teams · week 3 of 8</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  ["Guided learning", "A short lesson on drafting with AI, 30 minutes on your own"],
                  ["Practice", "Draft next Sunday’s announcements with the church’s assistant"],
                  ["Discussion", "Ninety minutes together: what felt like ours, and what didn’t"],
                  ["Human review", "A staff member signs off before anything is sent"],
                ].map(([label, text]) => (
                  <li key={label} className="mv-plate-grid">
                    <span className="mv-muted">{label}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="mv-step">
            <span aria-hidden="true" className="mv-step-n">04</span>
            <div className="mv-stack" style={{ gap: 14 }}>
              <StageTitle n={4} title="Build only what belongs" />
              <p className="mv-body mv-muted" style={{ maxWidth: 460 }}>
                Develop AI-enabled tools, interfaces and workflows where they serve a legitimate need
                and fit your organization’s commitments.
              </p>
            </div>
            <div className="mv-plate mv-plate--flush" aria-label="A conceptual organizational workspace" role="img">
              <div
                className="mv-caption mv-muted"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--mv-rule)",
                  fontSize: 13,
                }}
              >
                <span>Grace Street Church · workspace</span>
                <span>Concept</span>
              </div>
              <div className="mv-ws">
                <ul className="mv-ws-rail">
                  <li aria-current="true">Assistant</li>
                  <li>Research</li>
                  <li>Library</li>
                  <li>Workflows</li>
                </ul>
                <div className="mv-stack" style={{ padding: "16px 18px", gap: 12 }}>
                  <p className="mv-caption mv-muted">What have we taught about Sabbath in the last five years?</p>
                  <p className="mv-reading" style={{ fontSize: 15.5, lineHeight: 1.5 }}>
                    Three sermon series and one Lent guide return to Sabbath as resistance to hurry,
                    most fully in the 2023 series on rest.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <span className="mv-chip">Sermon, March 2023</span>
                    <span className="mv-chip">Lent guide, 2024</span>
                    <span className="mv-chip">+2 sources</span>
                  </div>
                  <p
                    className="mv-muted"
                    style={{ fontSize: 13, paddingTop: 10, borderTop: "1px solid var(--mv-rule)" }}
                  >
                    For: teaching team · Draws only on what the Charter allows
                  </p>
                </div>
              </div>
            </div>
          </li>

          <li className="mv-step">
            <span aria-hidden="true" className="mv-step-n">05</span>
            <div className="mv-stack" style={{ gap: 14 }}>
              <StageTitle n={5} title="Review what changes" />
              <p className="mv-body mv-muted" style={{ maxWidth: 460 }}>
                Evaluate whether your tools, practices and decisions remain appropriate as your
                organization and the technology evolve.
              </p>
            </div>
            <div className="mv-plate">
              <p className="mv-caption mv-muted">Review ledger</p>
              <dl className="mv-ledger">
                <dt>Decision</dt>
                <dd>Use the assistant to research sermon archives</dd>
                <dt>Owner</dt>
                <dd>Executive pastor</dd>
                <dt>Evidence reviewed</dt>
                <dd>Six months of use, a staff check-in, two drafts flagged and corrected</dd>
                <dt>Next review</dt>
                <dd>March 2027</dd>
              </dl>
            </div>
          </li>
        </ol>
        <Link className="mv-more" href={MV_ROUTES.map} style={{ alignSelf: "flex-start" }}>
          Explore the complete Map →
        </Link>
      </div>
    </section>
  );
}

const CAPABILITIES: readonly { n: string; title: string; text: string }[] = [
  {
    n: "01",
    title: "Organizational guidance",
    text: "Institutional AI strategy, governance, leadership facilitation and implementation planning.",
  },
  {
    n: "02",
    title: "Context reconstruction",
    text: "The structured gathering and organizing of fragmented documents, archives, institutional knowledge, policies and workflows.",
  },
  {
    n: "03",
    title: "Custom platforms and agents",
    text: "Purpose-built applications and AI-enabled interfaces grounded in your organization’s sources, permissions and actual work.",
  },
  {
    n: "04",
    title: "Ongoing stewardship",
    text: "Continued management, evaluation, improvement and adaptation as technology and organizational needs change.",
  },
];

export function WorkWithMovemental() {
  return (
    <section id="work" className="mv-section" style={{ paddingTop: 136, paddingBottom: 136 }}>
      <div className="mv-wrap mv-stack" style={{ gap: 64 }}>
        <div className="mv-split">
          <div className="mv-stack" style={{ gap: 18 }}>
            <p className="mv-eyebrow">WORK WITH MOVEMENTAL</p>
            <h2 className="mv-h2 mv-h2--lg">From conviction to working systems.</h2>
          </div>
          <div className="mv-stack mv-reading-lg" style={{ gap: 16, maxWidth: 640, fontSize: 21 }}>
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
          </div>
        </div>
        <div className="mv-caps">
          {CAPABILITIES.map((c, i) => (
            <div key={c.n} className={i < 2 ? "mv-cap mv-cap--first-row" : "mv-cap"}>
              <span className="mv-caption mv-muted" style={{ fontVariantNumeric: "tabular-nums" }}>
                {c.n}
              </span>
              <div className="mv-stack" style={{ gap: 10 }}>
                <h3 className="mv-h3--sm">{c.title}</h3>
                <p className="mv-body mv-muted" style={{ fontSize: 16.5 }}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mv-split" style={{ paddingTop: 40, borderTop: "1px solid var(--mv-rule)" }}>
          <p className="mv-display-line">
            Shared infrastructure. Your organization’s context, commitments and decisions.
          </p>
          <div className="mv-stack" style={{ gap: 28 }}>
            <p className="mv-body mv-muted" style={{ maxWidth: 560 }}>
              Movemental builds on a common technical foundation, but an institution’s knowledge,
              responsibilities and ways of working are never interchangeable.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 28px" }}>
              <Link className="mv-pill" href={MV_ROUTES.discuss}>
                Discuss your organization’s response
              </Link>
              <Link className="mv-more" href="#proof">
                See the platform in practice →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SitePreview({ host, ratio, label }: { host: string; ratio: string; label: string }) {
  return (
    <div className="mv-preview">
      <div className="mv-preview-bar">
        <span aria-hidden="true" className="mv-preview-dot" />
        <span>{host}</span>
      </div>
      {/* TODO(S01-home-page-new): replace with an approved screenshot of the live site. */}
      <div className="mv-preview-body" style={{ aspectRatio: ratio }}>
        {label}
      </div>
    </div>
  );
}

export function ProofInPractice() {
  return (
    <section id="proof" className="mv-section mv-section--sheet">
      <div className="mv-wrap mv-stack" style={{ gap: 56 }}>
        <div className="mv-split">
          <h2 className="mv-h2">Built with people already doing the work.</h2>
          <div className="mv-stack mv-body mv-soft" style={{ gap: 14, maxWidth: 620, lineHeight: 1.65 }}>
            <p>
              Movemental began alongside authors and movement leaders whose ideas have shaped
              churches, organizations and communities for decades.
            </p>
            <p>
              Their platforms are places to gather a life’s work, publish, learn, and develop
              practical tools grounded in that work.
            </p>
            <p>That same architecture informs what we build with institutions.</p>
          </div>
        </div>
        <div className="mv-proof">
          <a className="mv-preview-link" href={MV_PROOF_SITES.alanHirsch}>
            <SitePreview host="alanhirsch.com" ratio="16 / 10" label="Live platform preview" />
            <span className="mv-stack" style={{ gap: 6 }}>
              <span className="mv-h3--sm" style={{ fontFamily: "var(--mv-font-display)" }}>
                Alan Hirsch
              </span>
              <span className="mv-caption mv-muted">alanhirsch.com</span>
              <span className="mv-soft" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 560 }}>
                A scholarly publishing and research environment exploring decades of writing and work
                on movements, discipleship and organizational formation.
              </span>
            </span>
          </a>
          <div className="mv-stack" style={{ gap: 40, paddingTop: 64 }}>
            <a className="mv-preview-link" href={MV_PROOF_SITES.bradBrisco} style={{ gap: 14 }}>
              <SitePreview host="bradbrisco.org" ratio="16 / 9" label="Live platform preview" />
              <span className="mv-stack" style={{ gap: 5 }}>
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.1 }}>Brad Brisco</span>
                <span className="mv-caption mv-muted">bradbrisco.org</span>
                <span className="mv-soft" style={{ fontSize: 15.5, lineHeight: 1.55 }}>
                  A practical leadership environment bringing together writing, training, consulting
                  and neighborhood-focused tools.
                </span>
              </span>
            </a>
            <a className="mv-preview-link" href={MV_PROOF_SITES.michaelCooper} style={{ gap: 14 }}>
              <SitePreview host="drmichaelcooper.com" ratio="16 / 9" label="Representative preview" />
              <span className="mv-stack" style={{ gap: 5 }}>
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.1 }}>Michael Cooper</span>
                <span className="mv-caption mv-muted">drmichaelcooper.com</span>
                <span className="mv-soft" style={{ fontSize: 15.5, lineHeight: 1.55 }}>
                  A research and leadership environment connecting scholarship with assessments and
                  applied strategic tools.
                </span>
              </span>
            </a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 16,
            paddingTop: 28,
            borderTop: "1px solid var(--mv-rule)",
          }}
        >
          <p style={{ fontFamily: "var(--mv-font-display)", fontSize: 32, lineHeight: 1.15 }}>
            One shared architecture. Distinct people, organizations and purposes.
          </p>
          <Link className="mv-more" href={MV_ROUTES.leaders}>
            Explore the movement leaders →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LeadersBand() {
  return (
    <section id="network" className="mv-section">
      <div className="mv-wrap mv-stack" style={{ gap: 40 }}>
        <h2 className="mv-h2">No one has to work this out alone.</h2>
        <p className="mv-names">
          Alan Hirsch, Debra Hirsch, Brad Brisco, Danielle Strickland, Dhati Lewis, JR Woodward, Liz
          Rios, Neil Cole, Brian Sanders, Meghan Larissa Good, Hugh Halter, Dave Ferguson, Rob Wegner,
          Rowland Smith, Roy Moran, Peyton Jones, Michael Cooper, Lucas Pulley, and Jeremy and Monica
          Chambers.
        </p>
        <div className="mv-split">
          <p className="mv-small mv-muted">A growing community of people whose work is connected to Movemental.</p>
          <div className="mv-stack" style={{ gap: 18, maxWidth: 640 }}>
            <p className="mv-reading-lg" style={{ fontSize: 24, lineHeight: 1.45 }}>
              The most useful thing another organization can offer is its practice.
            </p>
            <p className="mv-body mv-soft" style={{ lineHeight: 1.65 }}>
              As people and organizations begin making their decisions and experience visible, others
              can learn what they resolved, what they tried, what worked, and what they refused to
              automate.
            </p>
            <p className="mv-body mv-soft" style={{ lineHeight: 1.65 }}>
              The goal isn’t a ranking of organizations or a marketplace of personalities. It’s a
              growing body of practical knowledge grounded in real communities.
            </p>
            <Link className="mv-more" href={MV_ROUTES.leaders}>
              Meet the leaders →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanySection() {
  return (
    <section id="about" className="mv-section mv-section--ruled">
      <div className="mv-wrap mv-split">
        <h2 className="mv-h2">Movemental is a company.</h2>
        <div className="mv-stack" style={{ gap: 20, maxWidth: 640 }}>
          <p className="mv-reading-lg">
            We say so plainly because the people we serve deserve to know what we are.
          </p>
          <p className="mv-reading-lg">
            We hold one line: the call to resolve and respond should be worth making even if no one
            ever pays us.
          </p>
          <p className="mv-body mv-soft" style={{ lineHeight: 1.65 }}>
            The Resolution, Reality Assessment, Map and public Guidebook are free. Organizations can
            use the method independently.
          </p>
          <p className="mv-body mv-soft" style={{ lineHeight: 1.65 }}>
            What organizations hire Movemental to provide is the capacity to carry that method into
            practice: guided implementation, formation, institutional context reconstruction,
            purpose-built technology and continuing stewardship.
          </p>
          <p className="mv-body mv-soft" style={{ lineHeight: 1.65 }}>
            Our work grows alongside movement leaders whose knowledge and practice helped make it
            possible.
          </p>
          <Link className="mv-more" href={MV_ROUTES.guidebook}>
            Read the Guidebook →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ClosingBand() {
  return (
    <section className="mv-section mv-section--sheet" style={{ paddingTop: 144 }}>
      <div className="mv-wrap mv-stack" style={{ gap: 56 }}>
        <div className="mv-stack" style={{ gap: 10 }}>
          <p className="mv-close">Resolve. Say what you believe.</p>
          <p className="mv-close">Respond. Help your organization live it.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 28px" }}>
          <Link className="mv-pill" href="#resolve">
            Write your Resolution
          </Link>
          <Link className="mv-more" href="#work">
            Explore how we work with organizations →
          </Link>
        </div>
      </div>
    </section>
  );
}
