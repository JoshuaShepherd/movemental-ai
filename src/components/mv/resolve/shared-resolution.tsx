import Link from "next/link";

import { MV_ROUTES } from "../routes";
import { SAMPLE_SHARED as S } from "./fixtures";

/**
 * A shared Resolution, as the person it was shared with sees it. Board: R3-Shared.
 * Fixture seam: only the board's sample token exists until shared links are stored.
 */
export function SharedResolution() {
  return (
    <div className="mv-rz mv-rz--text" style={{ gap: 22 }}>
      <p className="mv-soft" style={{ fontSize: 16 }}>
        {S.author} wrote a Resolution for {S.org} on {S.date}.{" "}
        <span className="mv-muted" style={{ fontSize: 14 }}>
          Sample data.
        </span>
      </p>
      <article className="mv-doc">
        <h1 className="mv-doc-title">Resolved, that {S.org} should…</h1>
        <ol className="mv-doc-lines">
          {S.lines.map(([theme, text]) => (
            <li key={theme} className="mv-doc-line">
              <span>{theme}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
        <div className="mv-doc-block" style={{ paddingTop: 10 }}>
          <p>Hardest for us to adopt today</p>
          <p>{S.hardest}</p>
        </div>
        <div className="mv-doc-block">
          <p>What I’ll do</p>
          {S.acts.map((a) => (
            <p key={a}>{a}</p>
          ))}
        </div>
        <div className="mv-doc-sign">
          <div />
          <p className="mv-soft" style={{ fontSize: 14 }}>
            {S.author}, {S.role}
          </p>
        </div>
      </article>
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", paddingTop: 10 }}>
        <Link className="mv-pill" href={MV_ROUTES.resolve}>
          Write your own
        </Link>
        <Link className="mv-muted" style={{ fontSize: 15 }} href={MV_ROUTES.respondBegin}>
          Leading this for {S.short}? Start your organization’s response.
        </Link>
      </div>
    </div>
  );
}
