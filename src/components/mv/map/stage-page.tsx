import Link from "next/link";

import { MV_ROUTES, mapStageHref } from "../routes";
import {
  CHARTER_PARTS,
  CONTEXT_AREAS,
  DECISIONS,
  FORMATION_FINDINGS,
  MAP_STAGES,
  type MapStage,
  REVIEW_DUE,
  REVIEW_RECORD,
  TOOLS,
} from "./stages";

/**
 * One stage of the Map (/map/[stage]). Board: Map-Stage, whose stage switch becomes five routes.
 * Copy verbatim. Riverbend is the board's fictional sample, labeled "sample".
 */

function StageNav({ current }: { current: number }) {
  return (
    <nav aria-label="The five stages" className="mv-stagenav">
      <div className="mv-wrap mv-stagenav-inner">
        <Link className="mv-stagenav-home" href={MV_ROUTES.map} style={{ textDecoration: "underline" }}>
          The Map
        </Link>
        {MAP_STAGES.map((s) => (
          <Link key={s.slug} href={mapStageHref(s.slug)} aria-current={s.n === current ? "page" : undefined}>
            <span className="mv-stagenav-n">{s.n}</span>
            <span>{s.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Charter() {
  return (
    <article className="mv-artifact" style={{ padding: "56px 64px 48px" }}>
      <p className="mv-muted" style={{ fontSize: 13, marginBottom: 6 }}>
        Riverbend Youth &amp; Family
      </p>
      <h3 className="mv-doc-title" style={{ marginBottom: 28 }}>
        Our charter for AI
      </h3>
      {CHARTER_PARTS.map(([part, what, clause, origin]) => (
        <div key={part} className="mv-part">
          <span className="mv-stack" style={{ gap: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 500 }}>{part}</span>
            <span className="mv-muted" style={{ fontSize: 13 }}>
              {what}
            </span>
          </span>
          <span className="mv-stack" style={{ gap: 6 }}>
            <span className="mv-reading" style={{ fontSize: 18.5, lineHeight: 1.5 }}>
              {clause}
            </span>
            <span className="mv-muted" style={{ fontSize: 12.5 }}>
              {origin}
            </span>
          </span>
        </div>
      ))}
      <div
        className="mv-two"
        style={{ paddingTop: 36, borderTop: "1px solid var(--mv-rule)", maxWidth: 680 }}
      >
        {["James Okafor, Executive director", "Board chair"].map((r) => (
          <div key={r} className="mv-stack" style={{ gap: 6 }}>
            <div style={{ height: 32, borderBottom: "1px solid var(--mv-ink)" }} />
            <span className="mv-muted" style={{ fontSize: 13 }}>
              {r}
            </span>
          </div>
        ))}
      </div>
      <p className="mv-muted" style={{ fontSize: 13.5, paddingTop: 18 }}>
        Ratified by the board, November 12, 2026 · Next review March 2027
      </p>
    </article>
  );
}

function Context() {
  return (
    <div className="mv-three">
      {CONTEXT_AREAS.map((a) => (
        <div key={a.title} className="mv-artifact" style={{ padding: "24px 24px 12px" }}>
          <p style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.1 }}>{a.title}</p>
          <p className="mv-muted" style={{ fontSize: 13.5, margin: "4px 0 10px" }}>
            {a.sub}
          </p>
          {a.items.map(([t, status, kept]) => (
            <div key={t} className="mv-stack" style={{ gap: 2, padding: "12px 0", borderTop: "1px solid var(--mv-rule)" }}>
              <span
                style={{ fontSize: 15, lineHeight: 1.4, ...(kept ? { color: "var(--mv-graphite)", textDecoration: "line-through" } : {}) }}
              >
                {t}
              </span>
              <span style={{ fontSize: 13, ...(kept ? { fontWeight: 500 } : { color: "var(--mv-graphite)" }) }}>
                {status}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Formation() {
  return (
    <div className="mv-three" style={{ alignItems: "start" }}>
      <div className="mv-artifact mv-stack mv-span-2" style={{ padding: "28px 30px", gap: 14 }}>
        <p className="mv-muted" style={{ fontSize: 13 }}>
          AI for Nonprofit Teams · Riverbend’s cohort
        </p>
        <div role="img" aria-label="Week 3 of 8" style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
            <span
              key={k}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 3,
                boxSizing: "border-box",
                ...(k < 2
                  ? { background: "var(--mv-ink)" }
                  : k === 2
                    ? { background: "var(--mv-accent)" }
                    : { border: "1.5px solid var(--mv-rule)" }),
              }}
            />
          ))}
        </div>
        <p className="mv-reading" style={{ fontSize: 20, lineHeight: 1.45 }}>
          Week 3: draft one grant narrative with AI, then mark every sentence you would not sign.
        </p>
        <p className="mv-muted" style={{ fontSize: 14.5 }}>
          30 to 40 minutes alone, then 90 minutes together on Thursday. Led by Dana Reyes,
          Riverbend’s ambassador.
        </p>
        <div style={{ paddingTop: 10 }}>
          <p style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 6 }}>What formation has found so far</p>
          {FORMATION_FINDINGS.map(([f, where]) => (
            <div key={f} className="mv-fig-row" style={{ borderTop: "1px solid var(--mv-rule)", borderBottom: "none" }}>
              <span className="mv-reading" style={{ fontSize: 16.5, lineHeight: 1.5 }}>
                {f}
              </span>
              <span>{where}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mv-stack" style={{ gap: 20 }}>
        <div className="mv-artifact mv-stack" style={{ padding: "24px 24px", gap: 8 }}>
          <p className="mv-muted" style={{ fontSize: 13 }}>
            Team courses · eight weeks
          </p>
          {["AI for Church Teams", "AI for Nonprofit Teams", "AI for Institutional Teams"].map((c) => (
            <p key={c} style={{ fontFamily: "var(--mv-font-display)", fontSize: 22 }}>
              {c}
            </p>
          ))}
        </div>
        <div className="mv-artifact mv-stack" style={{ padding: "24px 24px", gap: 8 }}>
          <p className="mv-muted" style={{ fontSize: 13 }}>
            For your ambassador · twelve weeks and a practicum
          </p>
          <p style={{ fontFamily: "var(--mv-font-display)", fontSize: 22 }}>AI for Organizational Leadership</p>
          <p className="mv-small mv-soft">
            Context engineering, adaptive leadership and dissemination, in a cohort across
            organizations. It ends in a credential earned by leading the team course at home.
          </p>
        </div>
      </div>
    </div>
  );
}

function Build() {
  return (
    <>
      <div className="mv-artifact mv-table-wrap">
        <table className="mv-table" style={{ minWidth: 1080 }}>
          <caption>Every possible use, weighed and decided</caption>
          <thead>
            <tr>
              {["Possible use", "Mission value", "Human and trust cost", "Charter fit", "Ready?", "What it requires", "Decision"].map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DECISIONS.map(([use, value, cost, fit, ready, req, decision, why]) => (
              <tr key={use}>
                <th scope="row">{use}</th>
                <td>{value}</td>
                <td>{cost}</td>
                <td>{fit}</td>
                <td>{ready}</td>
                <td>{req}</td>
                <td>
                  <span style={{ display: "block", fontWeight: 500 }}>{decision}</span>
                  <span className="mv-muted" style={{ display: "block", fontSize: 13 }}>
                    {why}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mv-artifact mv-table-wrap" style={{ marginTop: 20 }}>
        <table className="mv-table" style={{ minWidth: 960 }}>
          <caption>What was built: the application directory</caption>
          <thead>
            <tr>
              {["Tool", "Draws on", "May do", "Answers for it", "Review"].map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOOLS.map(([name, src, scope, owner, review]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{src}</td>
                <td>{scope}</td>
                <td>{owner}</td>
                <td>{review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mv-caption mv-muted" style={{ marginTop: 12 }}>
        Only what was decided gets built. Each tool shows what it draws on, what it may do and who
        answers for it.
      </p>
    </>
  );
}

function Review() {
  return (
    <div className="mv-rev">
      <article className="mv-artifact" style={{ padding: "44px 48px 40px" }}>
        <p className="mv-muted" style={{ fontSize: 13, marginBottom: 6 }}>
          Riverbend Youth &amp; Family · review record
        </p>
        <h3 className="mv-h3" style={{ marginBottom: 24 }}>
          Winter review, 2027
        </h3>
        {REVIEW_RECORD.map(([k, v]) => (
          <div key={k} className="mv-part" style={{ padding: "14px 0" }}>
            <span className="mv-muted" style={{ fontSize: 14 }}>
              {k}
            </span>
            <span className="mv-reading" style={{ fontSize: 17, lineHeight: 1.5 }}>
              {v}
            </span>
          </div>
        ))}
      </article>
      <div className="mv-artifact" style={{ padding: "28px 28px 20px" }}>
        <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 12 }}>What comes up for review</p>
        {REVIEW_DUE.map(([kind, what, when]) => (
          <div key={what} className="mv-fig-row" style={{ borderTop: "1px solid var(--mv-rule)", borderBottom: "none", padding: "12px 0" }}>
            <span className="mv-stack" style={{ gap: 2 }}>
              <span className="mv-muted" style={{ fontSize: 12.5 }}>
                {kind}
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.4 }}>{what}</span>
            </span>
            <span style={{ whiteSpace: "nowrap", fontSize: 13.5 }}>{when}</span>
          </div>
        ))}
        <p className="mv-muted" style={{ fontSize: 13.5, marginTop: 8 }}>
          Everything in the Map has a review date. Nothing is shown as a percentage.
        </p>
      </div>
    </div>
  );
}

const ARTIFACTS: Record<MapStage["slug"], () => React.ReactNode> = {
  decide: Charter,
  gather: Context,
  practice: Formation,
  build: Build,
  review: Review,
};

export function StagePage({ stage }: { stage: MapStage }) {
  const i = stage.n - 1;
  const prev = MAP_STAGES[i - 1];
  const next = MAP_STAGES[i + 1];
  const Artifact = ARTIFACTS[stage.slug];

  return (
    <>
      <StageNav current={stage.n} />

      <section className="mv-wrap mv-stack" style={{ paddingTop: 72, paddingBottom: 64, gap: 20 }}>
        <p className="mv-small mv-muted">
          Stage {stage.n} of 5 · Produces {stage.produces}
        </p>
        <h1 className="mv-h1 mv-h1--xl">{stage.name}</h1>
        <p className="mv-reading-lg mv-soft" style={{ maxWidth: 700 }}>
          {stage.lead}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", paddingTop: 6 }}>
          <Link className="mv-pill" href={MV_ROUTES.respondBegin}>
            Begin your organization’s response
          </Link>
          <Link className="mv-more" style={{ fontSize: 15 }} href={MV_ROUTES.guidebook}>
            Read this stage in the guidebook
          </Link>
        </div>
      </section>

      <section className="mv-section--sheet" style={{ padding: "64px 0 72px" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <h2 className="mv-h3">What you’ll have</h2>
            <p className="mv-caption mv-muted">Riverbend Youth &amp; Family · sample</p>
          </div>
          <div>
            <Artifact />
          </div>
        </div>
      </section>

      <section className="mv-wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="mv-hero mv-hero--side" style={{ alignItems: "start" }}>
          <div className="mv-stack" style={{ gap: 16 }}>
            <h2 className="mv-h3">How it goes</h2>
            <ol className="mv-howlist">
              {stage.how.map((t, k) => (
                <li key={t}>
                  <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1 }}>{k + 1}</span>
                  <span className="mv-reading" style={{ lineHeight: 1.55 }}>
                    {t}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="mv-stack" style={{ gap: 28 }}>
            <div className="mv-aside-block">
              <h2 className="mv-side-h">Who is involved</h2>
              <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.55 }}>
                {stage.who}
              </p>
            </div>
            <div className="mv-aside-block">
              <h2 className="mv-side-h">What feeds it, and what it feeds</h2>
              <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.55 }}>
                From: {stage.inFrom}
              </p>
              <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.55 }}>
                Into: {stage.outTo}
              </p>
            </div>
            <div className="mv-stack" style={{ gap: 8, padding: "20px 22px", background: "var(--mv-sheet)", borderRadius: 4 }}>
              <h2 className="mv-side-h">If you want help</h2>
              <p className="mv-small mv-soft">{stage.help}</p>
              <p className="mv-caption mv-muted">
                Everything on this page can be done without us, from the guidebook and the Map.
              </p>
              <Link className="mv-more" style={{ fontSize: 15 }} href={MV_ROUTES.work}>
                Work with Movemental
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <nav aria-label="Previous and next stage" className="mv-prevnext">
        <div className="mv-wrap mv-prevnext-inner">
          <div>
            {prev ? (
              <Link href={mapStageHref(prev.slug)}>
                <span className="mv-muted" style={{ fontSize: 13.5 }}>
                  Previous · stage {prev.n}
                </span>
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.15 }}>{prev.name}</span>
              </Link>
            ) : (
              <Link href={`${MV_ROUTES.map}#trailhead`}>
                <span className="mv-muted" style={{ fontSize: 13.5 }}>
                  Before this · the trailhead
                </span>
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.15 }}>
                  What your people are saying
                </span>
              </Link>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            {next ? (
              <Link href={mapStageHref(next.slug)} style={{ alignItems: "flex-end" }}>
                <span className="mv-muted" style={{ fontSize: 13.5 }}>
                  Next · stage {next.n}
                </span>
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.15 }}>{next.name}</span>
              </Link>
            ) : (
              <Link href={mapStageHref("decide")} style={{ alignItems: "flex-end" }}>
                <span className="mv-muted" style={{ fontSize: 13.5 }}>
                  Then
                </span>
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26, lineHeight: 1.15 }}>
                  Back to the charter, with what you learned
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
