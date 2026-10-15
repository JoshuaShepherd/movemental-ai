/* eslint-disable @next/next/no-img-element -- remote leader headshots from the shared media library; same rationale as voices-grid */
import Link from "next/link";

import { MV_ROUTES, leaderHref } from "../routes";
import { LEADERS, type Leader, siteLabel } from "./leaders";

/** /leaders and /leaders/[slug]. Boards: Leaders, Leader-Profile. Copy verbatim. */

export function LeadersIndex() {
  return (
    <>
      <section className="mv-wrap" style={{ paddingTop: 88, paddingBottom: 64 }}>
        <div className="mv-hero mv-hero--side" style={{ alignItems: "end" }}>
          <div className="mv-stack" style={{ gap: 22 }}>
            <p className="mv-small mv-muted">The network</p>
            <h1 className="mv-h1">Movement leaders doing this work in their own organizations</h1>
            <p className="mv-reading-lg mv-soft" style={{ maxWidth: 680, fontSize: 21 }}>
              Movemental is built from the practice of people who have spent their lives starting and
              leading churches, networks and organizations. They are going first: writing their own
              Resolutions and taking up the work in the places they lead.
            </p>
          </div>
          <p className="mv-small mv-muted" style={{ lineHeight: 1.6 }}>
            {LEADERS.length} leaders, listed by family name. Each links to their own site, where
            their work lives and where they keep 90 percent of what it earns.
          </p>
        </div>
      </section>
      <section className="mv-wrap" style={{ paddingBottom: 88 }}>
        <ul className="mv-leader-grid">
          {LEADERS.map((l) => (
            <li key={l.slug}>
              <Link className="mv-leader-card" href={leaderHref(l.slug)}>
                <img src={l.photo} alt="" loading="lazy" className="mv-headshot" />
                <span className="mv-stack" style={{ gap: 4 }}>
                  <span className="mv-leader-name">{l.name}</span>
                  {l.credential ? <span className="mv-caption mv-muted">{l.credential}</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mv-section--sheet" style={{ padding: "80px 0 96px" }}>
        <div className="mv-wrap mv-hero mv-hero--side" style={{ alignItems: "start" }}>
          <div className="mv-stack" style={{ gap: 16 }}>
            <h2 className="mv-h2">How the network grows</h2>
            <blockquote className="mv-reading" style={{ margin: 0, fontSize: 21, lineHeight: 1.55 }}>
              The network grows by invitation. Each person in it was asked by someone already here,
              who was willing to stake their own name on them. There is no application. If you’ve been
              invited, you’ll have a link.
            </blockquote>
            <p className="mv-soft" style={{ fontSize: 15.5, lineHeight: 1.6 }}>
              It is capped at about one hundred leaders, so that everyone in it can still be known by
              the others.
            </p>
          </div>
          <div className="mv-stack" style={{ gap: 12 }}>
            <h3 className="mv-side-h">What an invitation looks for</h3>
            <ul className="mv-ruled-lines" style={{ listStyle: "none", padding: 0 }}>
              {[
                "A real body of work",
                "Leadership that multiplies",
                "Movemental DNA, named or not",
                "Conduct the network can vouch for",
              ].map((t) => (
                <li key={t} style={{ fontSize: 17, padding: "12px 0" }}>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mv-caption mv-muted">Leaders nominate. Objections are written. Admission is by consent.</p>
            {/* TODO(S09-about-new): link to /story-new once it exists. */}
            <Link className="mv-link-target" href={MV_ROUTES.about}>
              How Movemental began with these leaders’ work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function LeaderProfile({ leader: l }: { leader: Leader }) {
  const p = l.profile;
  const siteUrl = `https://${l.host}`;
  return (
    <>
      <section className="mv-wrap mv-stack" style={{ paddingTop: 56, paddingBottom: 72, gap: 28 }}>
        <Link className="mv-link-target mv-muted" style={{ alignSelf: "flex-start", fontSize: 14.5 }} href={MV_ROUTES.leaders}>
          All movement leaders
        </Link>
        <div className="mv-profile-top">
          <img src={l.photo} alt={l.name} className="mv-headshot" />
          <div className="mv-stack" style={{ gap: 22, paddingTop: 8 }}>
            {l.credential ? (
              <p className="mv-small mv-muted">
                {l.credential}
                {p?.place ? ` · ${p.place}` : ""}
              </p>
            ) : null}
            <h1 className="mv-h1 mv-h1--xl" style={{ lineHeight: 0.95 }}>
              {l.name}
            </h1>
            {p ? (
              <div className="mv-stack mv-reading mv-soft" style={{ gap: 14, maxWidth: 680, fontSize: 19, lineHeight: 1.6 }}>
                {p.bio.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </div>
            ) : null}
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", paddingTop: 4 }}>
              <a className="mv-pill" href={siteUrl} rel="noopener noreferrer" target="_blank">
                {siteLabel(l)}
              </a>
              <span className="mv-caption mv-muted">{l.host}</span>
            </div>
          </div>
        </div>
      </section>

      {p?.quote ? (
        <section className="mv-section--sheet" style={{ padding: "64px 0" }}>
          <figure className="mv-wrap mv-stack" style={{ maxWidth: 900, margin: "0 auto", gap: 14 }}>
            <blockquote style={{ margin: 0, fontFamily: "var(--mv-font-display)", fontSize: 36, lineHeight: 1.2 }}>
              {p.quote}
            </blockquote>
            <figcaption className="mv-muted" style={{ fontSize: 14.5 }}>
              {l.name.split(" ")[0]}, in his own words
            </figcaption>
          </figure>
        </section>
      ) : null}

      <section className="mv-wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="mv-two" style={{ gap: 56 }}>
          <div className="mv-stack" style={{ gap: 14 }}>
            <h2 className="mv-h3">Their Resolution</h2>
            <p className="mv-reading mv-soft" style={{ fontSize: 18, lineHeight: 1.6 }}>
              {l.name} hasn’t published a Resolution yet. When one is published, it will appear here.
            </p>
            <Link className="mv-link-target" href={MV_ROUTES.resolve}>
              Write your own
            </Link>
          </div>
          {p?.works.length ? (
            <div className="mv-stack" style={{ gap: 14 }}>
              <h2 className="mv-h3">Their work</h2>
              <ul style={{ listStyle: "none", padding: 0, borderBottom: "1px solid var(--mv-rule)" }}>
                {p.works.map(([title, kind, italic]) => (
                  <li
                    key={title}
                    style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 16, padding: "14px 0", borderTop: "1px solid var(--mv-rule)" }}
                  >
                    <span className="mv-reading" style={{ fontSize: 19, fontStyle: italic ? "italic" : undefined }}>
                      {title}
                    </span>
                    <span className="mv-muted" style={{ fontSize: 13.5 }}>
                      {kind}
                    </span>
                  </li>
                ))}
              </ul>
              <a className="mv-link-target" href={siteUrl} rel="noopener noreferrer" target="_blank">
                Everything on their site
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
