import Link from "next/link";

import { MV_ROUTES, mapStageHref } from "../routes";

/**
 * The Map, public (/map). Board: Map (docs/handoff/map-new/source/Map.dc.html).
 * Copy verbatim. Riverbend is the board's fictional sample, labeled "sample".
 */

const READ = { lineHeight: 1.55 } as const;

function Hero() {
  return (
    <section className="mv-wrap" style={{ paddingTop: 88, paddingBottom: 72 }}>
      <div className="mv-hero mv-hero--side" style={{ alignItems: "end" }}>
        <div className="mv-stack" style={{ gap: 24 }}>
          <p className="mv-small mv-muted">Respond</p>
          <h1 className="mv-h1 mv-h1--xl">
            Help your organization live what it decides.
          </h1>
          <p className="mv-reading-lg mv-soft" style={{ maxWidth: 640 }}>
            Resolving takes minutes and belongs to each person. Responding takes months and belongs
            to the organization. It happens in the Map, where your organization does the work and
            keeps what the work produces.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", paddingTop: 8 }}>
            <Link className="mv-pill" href={MV_ROUTES.respondBegin}>
              Begin your organization’s response
            </Link>
            <Link className="mv-more" style={{ fontSize: 15 }} href={MV_ROUTES.assessment}>
              Or start with the Reality Assessment
            </Link>
          </div>
          <p className="mv-caption mv-muted">
            The Map is free. Beginning gives no one authority, and nothing is adopted until the
            people who decide adopt it.
          </p>
        </div>
        <figure className="mv-fig" style={{ padding: "28px 30px", gap: 14 }} aria-label="A Map in progress, sample">
          <p className="mv-muted" style={{ fontSize: 13 }}>
            Riverbend Youth &amp; Family · the Map · sample
          </p>
          <ol className="mv-progress">
            {(
              [
                ["done", "Trailhead", "9 Resolutions in"],
                ["done", "1 · The charter", "Ratified · review March"],
                ["now", "2 · The organization’s context", "In progress"],
                [undefined, "3 · Formation", "Starts in January"],
                [undefined, "4 · Build only what belongs", "2 decided early"],
                [undefined, "5 · Review what changes", "First review in March"],
              ] as const
            ).map(([state, label, status]) => (
              <li key={label}>
                <span aria-hidden="true" className="mv-progress-mark" data-state={state} />
                <span style={state === "now" ? { fontWeight: 500 } : undefined}>{label}</span>
                <span style={state === "now" ? { color: "var(--mv-accent)" } : undefined}>{status}</span>
              </li>
            ))}
          </ol>
          <figcaption className="mv-caption mv-soft" style={{ lineHeight: 1.5 }}>
            Progress is shown by what each stage has produced. There are no percentages.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Trailhead() {
  const items = [
    ["What your people are saying", "Strong agreement, real differences and questions to decide, from their Resolutions. Counts only, once five have written theirs."],
    ["Who carries this", "Three to five people, ideally someone with authority, someone who knows how the work happens and someone close to the people you serve."],
    ["Who decides", "Who can sign, who ratifies, who advises and who must be consulted. Work can start before these names are known. Nothing is adopted until they are."],
    ["What is actually happening", "The Reality Assessment. Your leaders predict, your people answer anonymously, and you see the gap."],
  ];
  return (
    <section id="trailhead" className="mv-section--sheet" style={{ padding: "72px 0" }}>
      <div className="mv-wrap mv-stack" style={{ gap: 28 }}>
        <div className="mv-stack" style={{ gap: 12, maxWidth: 760 }}>
          <h2 className="mv-h2">It begins at the trailhead</h2>
          <p className="mv-reading mv-soft" style={{ fontSize: 19, ...READ }}>
            Before anything is decided, the Map shows four things. One person can set it up alone in
            a few minutes. The rest fills in as your people arrive.
          </p>
        </div>
        <div className="mv-four">
          {items.map(([t, d]) => (
            <div key={t}>
              <p style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.1 }}>{t}</p>
              <p className="mv-small mv-soft">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({
  n,
  slug,
  title,
  body,
  produces,
  link,
  children,
  last,
}: {
  n: number;
  slug: string;
  title: string;
  body: string;
  produces: string;
  link: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <li className="mv-steprow" style={last ? { borderBottom: "1px solid var(--mv-rule)" } : undefined}>
      <span aria-hidden="true" className="mv-steprow-n">
        {n}
      </span>
      <div className="mv-stack" style={{ gap: 12 }}>
        <h3 className="mv-h3--sm" style={{ fontSize: 36 }}>
          <span className="mv-sr-only">Stage {n}. </span>
          {title}
        </h3>
        <p className="mv-reading mv-soft" style={READ}>
          {body}
        </p>
        <p className="mv-muted" style={{ fontSize: 14.5 }}>
          Produces: {produces}
        </p>
        <Link className="mv-more" style={{ fontSize: 15 }} href={mapStageHref(slug)}>
          {link}
        </Link>
      </div>
      <figure className="mv-fig">{children}</figure>
    </li>
  );
}

function Stages() {
  return (
    <>
      <section className="mv-wrap mv-stack" style={{ paddingTop: 88, paddingBottom: 40, gap: 14 }}>
        <h2 className="mv-h2">Five stages. Each leaves you with something you keep.</h2>
        <p className="mv-reading mv-soft" style={{ maxWidth: 760, fontSize: 19, ...READ }}>
          Any stage can be opened at any time. The order is the advice: what you stand for sets the
          limits on what you gather, both shape what your people practice and what you decide to
          build, and each review brings you back around.
        </p>
      </section>
      <section className="mv-wrap" style={{ paddingBottom: 72 }}>
        <ol style={{ listStyle: "none", padding: 0 }}>
          <Stage
            n={1}
            slug="decide"
            title="Decide what you will stand for"
            body="A charter in five parts: what you believe, what people may and may not do, what is true here now, how systems and people work together day to day, and what happens when something goes wrong. Your people’s Resolutions are its first draft. Your leaders sign it and your board ratifies it."
            produces="the charter"
            link="See a real charter"
          >
            <p className="mv-muted" style={{ fontSize: 12.5, marginBottom: 10 }}>
              Policy · clause 4
            </p>
            <p className="mv-reading" style={{ fontSize: 16.5, lineHeight: 1.5 }}>
              No one may enter a young person’s case notes, health information or anything told in
              confidence into any AI tool.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, paddingTop: 24 }}>
              {["Executive director", "Board chair"].map((r) => (
                <div key={r} className="mv-stack" style={{ gap: 4 }}>
                  <div style={{ height: 24, borderBottom: "1px solid var(--mv-ink)" }} />
                  <span className="mv-muted" style={{ fontSize: 12.5 }}>
                    {r}
                  </span>
                </div>
              ))}
            </div>
          </Stage>
          <Stage
            n={2}
            slug="gather"
            title="Gather what should ground the work"
            body="What your organization knows, how its work actually happens and who the work depends on, gathered mostly through interviews and kept within the limits your charter sets. This is where the method becomes architecture."
            produces="the organization’s context"
            link="See a real context list"
          >
            <div className="mv-fig-row">
              <span>Program curriculum, 2019 to now</span>
              <span>Gathered</span>
            </div>
            <div className="mv-fig-row">
              <span>Grant reporting, mapped from 3 interviews</span>
              <span>Gathered</span>
            </div>
            <div className="mv-fig-row">
              <span className="mv-muted" style={{ textDecoration: "line-through" }}>
                Case notes
              </span>
              <span style={{ color: "var(--mv-ink)" }}>Kept out by charter clause 4</span>
            </div>
          </Stage>
          <Stage
            n={3}
            slug="practice"
            title="Practice the judgment your people will need"
            body="Your people practice judgment together on real work, led by someone inside your organization who has been formed to keep it going. What they find goes back into the charter and the context."
            produces="formed people, and an ambassador who keeps it going"
            link="See the courses"
          >
            <p className="mv-muted" style={{ fontSize: 12.5, marginBottom: 8 }}>
              AI for Nonprofit Teams · week 3 of 8
            </p>
            <p className="mv-reading" style={{ fontSize: 16.5, lineHeight: 1.5, marginBottom: 8 }}>
              This week: draft one grant narrative with AI, then mark every sentence you would not
              sign.
            </p>
            <p className="mv-muted" style={{ fontSize: 13.5 }}>
              30 to 40 minutes alone · 90 minutes together · led by Dana, Riverbend’s ambassador
            </p>
          </Stage>
          <Stage
            n={4}
            slug="build"
            title="Build only what belongs"
            body="You weigh each possible use for mission value, trust and readiness, then pursue it, keep it simple, defer it or refuse it. Only what you decided to pursue gets built, with its sources, its limits and the person who answers for it written down. Refusal is a real decision, and it is written into the charter."
            produces="decisions, and the tools that follow"
            link="See real decisions"
          >
            {[
              ["Draft grant report narratives", "Pursue carefully"],
              ["Summarize program surveys", "Solve simply"],
              ["Draft donor thank-you notes", "Deferred"],
              ["Answer parents automatically after hours", "Refused"],
            ].map(([u, d]) => (
              <div key={u} className="mv-fig-row">
                <span>{u}</span>
                <span style={{ color: "var(--mv-ink)", fontWeight: 500 }}>{d}</span>
              </div>
            ))}
          </Stage>
          <Stage
            n={5}
            slug="review"
            title="Review what changes"
            body="Everything in the Map has a review date: the charter on a set rhythm, the context as it changes, formation each cohort, and each tool as it runs. A review records what you looked at, what changed and what you decided, so you can always see why a decision held or changed."
            produces="a review record"
            link="See a real review"
            last
          >
            <p className="mv-muted" style={{ fontSize: 12.5, marginBottom: 6 }}>
              Review record · winter 2027
            </p>
            <dl className="mv-ledger" style={{ gridTemplateColumns: "120px minmax(0, 1fr)" }}>
              <dt>Decision</dt>
              <dd>Draft grant report narratives</dd>
              <dt>Evidence</dt>
              <dd>Two reporting cycles, a staff check-in, one draft corrected before signing</dd>
              <dt>Outcome</dt>
              <dd style={{ fontWeight: 500 }}>Affirmed · Policy 4 revised</dd>
              <dt>Next review</dt>
              <dd>June 2027</dd>
            </dl>
          </Stage>
        </ol>
      </section>
    </>
  );
}

function Notes() {
  return (
    <section className="mv-wrap" style={{ paddingTop: 24, paddingBottom: 88 }}>
      <div className="mv-two">
        <div className="mv-stack" style={{ gap: 10 }}>
          <h2 className="mv-h3--sm">Choosing not to counts</h2>
          <p className="mv-reading mv-soft" style={{ fontSize: 17, ...READ }}>
            Any part of the method can be marked “chosen not to,” with your reason, and that is
            recorded as a decision. The Map can say once what a refusal may cost. Then it respects it.
          </p>
        </div>
        <div className="mv-stack" style={{ gap: 10 }}>
          <h2 className="mv-h3--sm">The guidebook is beside you</h2>
          <p className="mv-reading mv-soft" style={{ fontSize: 17, ...READ }}>
            The whole method is public, in editions for churches, nonprofits and institutions.
            Inside the Map the same text sits next to each stage. The guidebook explains how. The Map
            is where you do it.
          </p>
          <Link className="mv-more" style={{ fontSize: 15 }} href={MV_ROUTES.guidebook}>
            Read the guidebook
          </Link>
        </div>
      </div>
    </section>
  );
}

function Origins() {
  return (
    <section className="mv-section--sheet" style={{ padding: "80px 0" }}>
      <div className="mv-wrap mv-hero mv-hero--side" style={{ alignItems: "start" }}>
        <div className="mv-stack" style={{ gap: 14 }}>
          <h2 className="mv-h2">Every sentence shows where it came from</h2>
          <p className="mv-reading mv-soft" style={{ maxWidth: 620, fontSize: 19, ...READ }}>
            Each Map has an agent grounded in your own material. It drafts, explains and checks. It
            never adopts, signs or ratifies. Every line it drafts is marked by origin, so your leaders
            can see what came from your people, what came from the guidebook, and what is still
            theirs to decide.
          </p>
        </div>
        <figure
          className="mv-plate"
          style={{ margin: 0, padding: "26px 28px", gap: 16, borderRadius: 4 }}
          aria-label="A drafted charter statement with origin marks, sample"
        >
          <p className="mv-muted" style={{ fontSize: 12.5 }}>
            Charter · Statement · draft
          </p>
          {[
            ["We will keep the moments of care human.", "From your people’s Resolutions · 7 of 9"],
            ["Staff already use four AI tools at work, two of them personal accounts.", "Sourced fact · Reality Assessment, October"],
            ["Name one person who answers for each approved tool.", "Guidebook recommendation · Charter, section 3"],
          ].map(([line, origin]) => (
            <div key={line} className="mv-origin">
              <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.5 }}>
                {line}
              </p>
              <p>{origin}</p>
            </div>
          ))}
          <div className="mv-origin" style={{ padding: "12px 14px", background: "var(--mv-accent-tint)", borderRadius: 6, gap: 6 }}>
            <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.5 }}>
              Where should the time AI saves go?
            </p>
            <p style={{ color: "var(--mv-ink)", fontWeight: 500 }}>
              Needs a human decision · your people divide 4 to 5
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}

function FreeAndPaid() {
  return (
    <section className="mv-wrap" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="mv-three" style={{ alignItems: "start" }}>
        <div className="mv-stack mv-span-2" style={{ gap: 10 }}>
          <h2 className="mv-h2">The method is free. Help making it hold is paid.</h2>
          <p className="mv-reading mv-soft" style={{ maxWidth: 680, fontSize: 19, ...READ }}>
            The Map, its templates and the guidebook cost nothing, and a capable team can do the work
            on its own. Organizations pay us when they want help with the hard parts: facilitating
            the charter, gathering context at scale, formation, building what they decide to build,
            and stewarding it over time. Paid work only ever follows a decision your organization
            made.
          </p>
          <Link className="mv-more" style={{ fontSize: 15 }} href={MV_ROUTES.work}>
            Work with Movemental
          </Link>
        </div>
        <nav aria-label="By kind of organization" className="mv-stack" style={{ paddingTop: 8 }}>
          <p className="mv-muted" style={{ fontSize: 14.5, marginBottom: 6 }}>
            The same method, in your language
          </p>
          {(
            [
              ["For churches", MV_ROUTES.churches],
              ["For nonprofits", MV_ROUTES.nonprofits],
              ["For institutions", MV_ROUTES.institutions],
            ] as const
          ).map(([t, href], i) => (
            <Link
              key={t}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: 52,
                fontFamily: "var(--mv-font-display)",
                fontSize: 26,
                borderTop: "1px solid var(--mv-rule)",
                borderBottom: i === 2 ? "1px solid var(--mv-rule)" : undefined,
                textDecoration: "none",
              }}
            >
              {t}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section id="begin" style={{ borderTop: "1px solid var(--mv-rule)", padding: "88px 0 104px" }}>
      <div className="mv-wrap mv-stack" style={{ maxWidth: 900, gap: 20, alignItems: "flex-start" }}>
        <h2 className="mv-h2 mv-h2--lg">Turn conviction into shared work.</h2>
        <p className="mv-reading mv-soft" style={{ fontSize: 19, ...READ }}>
          Invite your people to resolve, name who carries the work and who decides, and see what is
          actually happening. That creates your organization’s Map.
        </p>
        <Link className="mv-pill" href={MV_ROUTES.respondBegin}>
          Begin your organization’s response
        </Link>
        <p className="mv-muted" style={{ fontSize: 14.5 }}>
          Haven’t written your own Resolution yet? <Link href={MV_ROUTES.resolve}>Start there</Link>.
          About four minutes.
        </p>
      </div>
    </section>
  );
}

export function MapPage() {
  return (
    <>
      <Hero />
      <Trailhead />
      <Stages />
      <Notes />
      <Origins />
      <FreeAndPaid />
      <Close />
    </>
  );
}
