/* eslint-disable @next/next/no-img-element -- remote leader headshots from the shared media library; same rationale as voices-grid */
import Link from "next/link";

import { leaderBySlug } from "../leaders/leaders";
import { MV_ROUTES, leaderHref, mapStageHref } from "../routes";
import { AUDIENCES, type AudienceKey } from "./audiences";

/**
 * One audience page (/churches, /nonprofits, /institutions). Boards: Audience-Institutions,
 * Audience-Churches, Audience-Nonprofits — one section system, three voices. Copy verbatim.
 */

const STAGES = [
  ["decide", "Decide what you will stand for"],
  ["gather", "Gather what should ground the work"],
  ["practice", "Practice the judgment your people will need"],
  ["build", "Build only what belongs"],
  ["review", "Review what changes"],
] as const;

const DECISIONS = ["Pursue", "Pursue carefully", "Solve simply", "Defer", "Refuse"];

const EDITION_SLUG: Record<AudienceKey, string> = { institutions: "network", churches: "church", nonprofits: "nonprofit" };

const R = (t: string, size = 19, extra: React.CSSProperties = {}) => (
  <p className="mv-reading mv-soft" style={{ fontSize: size, lineHeight: 1.55, ...extra }}>
    {t}
  </p>
);

export function AudiencePage({ audience }: { audience: AudienceKey }) {
  const d = AUDIENCES[audience];
  const ed = EDITION_SLUG[audience];
  const cta2Href = audience === "institutions" ? MV_ROUTES.discuss : MV_ROUTES.resolve;
  const guidebookHref = ed === "nonprofit" ? MV_ROUTES.guidebook : `${MV_ROUTES.guidebook}?edition=${ed}`;
  const special = "special" in d ? d.special : undefined;
  const shared = "sharedLocal" in d ? d.sharedLocal : undefined;

  return (
    <>
      {/* Hero */}
      <section className="mv-wrap" style={{ paddingTop: 96, paddingBottom: 88 }}>
        <div className="mv-split mv-split--end">
          <div className="mv-stack" style={{ gap: 20 }}>
            <p className="mv-eyebrow">{d.eyebrow}</p>
            <h1 className="mv-h1 mv-h1--md">
              {d.h1}
            </h1>
          </div>
          <div className="mv-stack" style={{ gap: 16, maxWidth: 640 }}>
            {d.intro.map((t) => (
              <p key={t} className="mv-reading" style={{ fontSize: 21, lineHeight: 1.55 }}>
                {t}
              </p>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", paddingTop: 10 }}>
              <a className="mv-pill" href="#map">
                {d.cta1}
              </a>
              <Link className="mv-link-target" href={cta2Href}>
                {d.cta2}
              </Link>
            </div>
            <p className="mv-muted" style={{ fontSize: 14.5 }}>
              {d.cta3lead} <Link href={MV_ROUTES.assessment}>{d.cta3}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* The situation already unfolding */}
      <section className="mv-section--sheet" style={{ padding: "96px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 40 }}>
          <h2 className="mv-h2" style={{ maxWidth: 900 }}>
            {d.sitH}
          </h2>
          <div className="mv-two" style={{ gap: 56 }}>
            <ul className="mv-ruled-lines" style={{ listStyle: "none", padding: 0 }}>
              {d.examples.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="mv-stack" style={{ gap: 16 }}>
              {d.significance.map((t) => (
                <div key={t}>{R(t)}</div>
              ))}
              <Link className="mv-link-target" href={guidebookHref}>
                Read the {d.edition} edition of the guidebook
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The questions */}
      <section className="mv-wrap" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mv-split">
          <div className="mv-stack" style={{ gap: 14 }}>
            <h2 className="mv-h2">{d.qH}</h2>
            {R(d.qLead, 18, { color: "var(--mv-graphite)" })}
          </div>
          <ol style={{ listStyle: "none", padding: 0, borderBottom: "1px solid var(--mv-rule)" }}>
            {d.questions.map((q, i) => (
              <li key={q} className="mv-qrow">
                <span className="mv-muted" style={{ fontFamily: "var(--mv-font-display)", fontSize: 40, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mv-display-line" style={{ fontSize: 34, lineHeight: 1.15 }}>
                  {q}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two ways to begin */}
      <section style={{ borderTop: "1px solid var(--mv-rule)", padding: "96px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 36 }}>
          <h2 className="mv-h2">Two ways to begin</h2>
          <div className="mv-two" style={{ gap: 56 }}>
            {(
              [
                [d.beginA, "Write your Resolution", MV_ROUTES.resolve],
                [d.beginB, "Begin the Reality Assessment", MV_ROUTES.assessment],
              ] as const
            ).map(([b, cta, href]) => (
              <div key={b.h} className="mv-stack" style={{ gap: 14, paddingTop: 18, borderTop: "1px solid var(--mv-ink)" }}>
                <h3 className="mv-h3--sm" style={{ fontSize: 34 }}>
                  {b.h}
                </h3>
                {R(b.body, 18)}
                <div style={{ paddingTop: 6 }}>
                  <Link className="mv-pill" href={href}>
                    {cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mv-note" style={{ maxWidth: 820 }}>
            {d.beginNote}
          </p>
        </div>
      </section>

      {/* The Map, applied */}
      <section id="map" className="mv-section--sheet" style={{ padding: "96px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 28 }}>
          <div className="mv-stack" style={{ gap: 12, maxWidth: 820 }}>
            <h2 className="mv-h2">{d.mapH}</h2>
            {R(d.mapLead)}
          </div>
          <ol style={{ listStyle: "none", padding: 0, borderBottom: "1px solid var(--mv-rule)" }}>
            {STAGES.map(([slug, name], i) => (
              <li key={slug} className="mv-audstage">
                <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 44, lineHeight: 0.9 }}>{i + 1}</span>
                <Link
                  href={mapStageHref(slug)}
                  style={{ fontFamily: "var(--mv-font-display)", fontSize: 28, lineHeight: 1.15, textDecoration: "none" }}
                >
                  {name}
                </Link>
                <div>
                  {R(d.map[i]!, 18)}
                  {slug === "build" ? (
                    <>
                      <div className="mv-chips" style={{ paddingTop: 12, gap: 6 }}>
                        {DECISIONS.map((x) => (
                          <span key={x} className="mv-status" style={{ fontSize: 13 }}>
                            {x}
                          </span>
                        ))}
                      </div>
                      <div className="mv-artifact" style={{ marginTop: 14, padding: "14px 16px" }}>
                        <p className="mv-muted" style={{ fontSize: 12.5, marginBottom: 4 }}>
                          An example refusal, written into the charter
                        </p>
                        <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.55 }}>
                          {d.refusal}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          {shared ? (
            <div className="mv-stack" style={{ gap: 14, paddingTop: 24 }}>
              <div className="mv-two" style={{ gap: 24 }}>
                {shared.map((col) => (
                  <div key={col.h} className="mv-artifact mv-stack" style={{ padding: "22px 24px", gap: 4 }}>
                    <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{col.h}</p>
                    {col.items.map((x) => (
                      <p key={x} className="mv-reading" style={{ fontSize: 16.5, lineHeight: 1.45, padding: "10px 0", borderTop: "1px solid var(--mv-rule)" }}>
                        {x}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <p className="mv-muted" style={{ fontSize: 14.5 }}>
                {"sharedNote" in d ? d.sharedNote : ""}
              </p>
            </div>
          ) : null}
          <Link className="mv-link-target" href={MV_ROUTES.map}>
            See the whole Map
          </Link>
        </div>
      </section>

      {special?.kind === "choices" ? <Choices s={special} /> : null}
      {special?.kind === "network" ? <Network s={special} /> : null}

      {/* Possible applications */}
      <section style={{ borderTop: "1px solid var(--mv-rule)", padding: "96px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 36 }}>
          <div className="mv-stack" style={{ gap: 12, maxWidth: 820 }}>
            <h2 className="mv-h2">{d.appsH}</h2>
            {R(d.appsLead)}
          </div>
          <div className={d.apps.length === 4 ? "mv-four" : "mv-three"} style={{ gap: 32 }}>
            {d.apps.map((a) => (
              <div key={a.title} className="mv-stack" style={{ gap: 12, paddingTop: 0, borderTop: "none" }}>
                {/* TODO(S08-audience-new): real application views as they exist. */}
                <div className="mv-placeholder">Application view to come</div>
                <h3 className="mv-h3--sm" style={{ fontSize: 28 }}>
                  {a.title}
                </h3>
                {R(a.desc, 17)}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px minmax(0, 1fr)",
                    gap: 10,
                    paddingTop: 10,
                    borderTop: "1px solid var(--mv-rule)",
                    fontSize: 14,
                    lineHeight: 1.45,
                  }}
                >
                  <span className="mv-muted">Draws only on</span>
                  <span>{a.draws}</span>
                  <span className="mv-muted">Human role</span>
                  <span>A person {a.person}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mv-caption mv-muted">
            Possible applications, shown as concepts. Not features every organization receives, and
            only ever built after your organization decides they belong.
          </p>
        </div>
      </section>

      {/* Leaders */}
      <section className="mv-section--sheet" style={{ padding: "88px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, flexWrap: "wrap" }}>
            <h2 className="mv-h2" style={{ fontSize: 44 }}>
              {d.leadersH}
            </h2>
            <Link className="mv-link-target" href={MV_ROUTES.leaders}>
              All movement leaders
            </Link>
          </div>
          <ul className="mv-leader-grid">
            {d.leaders.map((slug) => {
              const l = leaderBySlug(slug)!;
              return (
                <li key={slug}>
                  <Link className="mv-leader-card" href={leaderHref(slug)}>
                    <img src={l.photo} alt="" loading="lazy" className="mv-headshot" />
                    <span className="mv-stack" style={{ gap: 4 }}>
                      <span className="mv-leader-name">{l.name}</span>
                      {l.credential ? <span className="mv-caption mv-muted">{l.credential}</span> : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Invitation */}
      <section className="mv-band-ink" style={{ padding: "112px 0" }}>
        <div className="mv-wrap mv-stack" style={{ maxWidth: 900, gap: 22, alignItems: "flex-start" }}>
          <h2 className="mv-h2 mv-h2--lg">{d.inviteH}</h2>
          <p className="mv-reading mv-on-ink-soft" style={{ fontSize: 20, lineHeight: 1.55 }}>
            {d.inviteBody}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
            <Link className="mv-pill" href={MV_ROUTES.discuss}>
              {d.inviteCta}
            </Link>
            <Link className="mv-link-target" href={MV_ROUTES.map} style={{ color: "var(--mv-ground)" }}>
              Read the Map
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

type Special = NonNullable<(typeof AUDIENCES)["nonprofits"]["special"]> | NonNullable<(typeof AUDIENCES)["institutions"]["special"]>;

function Choices({ s }: { s: Extract<Special, { kind: "choices" }> }) {
  return (
    <section className="mv-wrap" style={{ paddingTop: 104, paddingBottom: 104 }}>
      <div className="mv-split">
        <div className="mv-stack" style={{ gap: 14 }}>
          <h2 className="mv-h2">{s.h}</h2>
          {s.body.map((t) => (
            <div key={t}>{R(t)}</div>
          ))}
        </div>
        <div className="mv-stack" style={{ gap: 16 }}>
          <div className="mv-flow3">
            <div className="mv-artifact" style={{ padding: "18px 20px" }}>
              <p className="mv-muted" style={{ fontSize: 12.5, marginBottom: 4 }}>
                Before
              </p>
              <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.5 }}>
                {s.before}
              </p>
            </div>
            <span aria-hidden="true" style={{ textAlign: "center", fontFamily: "var(--mv-font-display)", fontSize: 28 }}>
              →
            </span>
            <div className="mv-artifact" style={{ padding: "18px 20px", borderColor: "var(--mv-ink)" }}>
              <p className="mv-muted" style={{ fontSize: 12.5, marginBottom: 4 }}>
                After
              </p>
              <p className="mv-reading" style={{ fontSize: 17, lineHeight: 1.5 }}>
                {s.after}
              </p>
            </div>
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, marginTop: 8 }}>The time that comes back could go to</p>
          <div className="mv-two" style={{ gap: 12 }}>
            {s.options.map((o) => (
              <div key={o} className="mv-artifact mv-reading" style={{ padding: "18px 20px", fontSize: 17, lineHeight: 1.45 }}>
                {o}
              </div>
            ))}
          </div>
          <p className="mv-muted" style={{ fontSize: 14.5 }}>
            {s.note}
          </p>
        </div>
      </div>
    </section>
  );
}

function Network({ s }: { s: Extract<Special, { kind: "network" }> }) {
  const n = s.affiliates.length;
  const nodes = s.affiliates.map((label, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { label, x: Math.round(260 + 190 * Math.cos(a)), y: Math.round(230 + 170 * Math.sin(a)), key: `${label}-${i}` };
  });
  return (
    <section className="mv-wrap" style={{ paddingTop: 104, paddingBottom: 104 }}>
      <div className="mv-net">
        <div className="mv-stack" style={{ gap: 16 }}>
          <p className="mv-eyebrow">THE NETWORK MODEL</p>
          <h2 className="mv-h2">{s.h}</h2>
          {R(s.lead)}
          <ul className="mv-ruled-lines" style={{ listStyle: "none", padding: 0 }}>
            {s.points.map((t) => (
              <li key={t} style={{ fontSize: 17.5 }}>
                {t}
              </li>
            ))}
          </ul>
          <p className="mv-caption mv-muted">{s.note}</p>
        </div>
        <figure className="mv-net-figure" aria-label="An anchor institution with five affiliated organizations, concept">
          <svg viewBox="0 0 520 480" role="img" aria-label="Network diagram">
            {nodes.map((p) => (
              <g key={p.key}>
                <line className="mv-net-line" x1={260} y1={230} x2={p.x} y2={p.y} />
                <circle className="mv-net-node" cx={p.x} cy={p.y} r={34} />
                <text className="mv-net-label" x={p.x} y={p.y + 52} textAnchor="middle">
                  {p.label}
                </text>
              </g>
            ))}
            <circle className="mv-net-anchor" cx={260} cy={230} r={58} />
            <text className="mv-net-label" x={260} y={226} textAnchor="middle" style={{ fontSize: 14 }}>
              {s.anchor}
            </text>
            <text className="mv-net-sub" x={260} y={244} textAnchor="middle">
              shared foundation
            </text>
          </svg>
          <figcaption className="mv-net-sub" style={{ padding: "10px 4px 0", fontSize: 13, color: "var(--mv-field-line)" }}>
            Concept. Each circle keeps its own charter, context and permissions.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

