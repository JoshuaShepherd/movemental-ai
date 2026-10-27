import Link from "next/link";

import type { ResolutionLineData, SharedResolutionData } from "@/lib/services/resolutions/resolution.service";

import { MV_ROUTES } from "../routes";
import { SAMPLE_SHARED } from "./fixtures";

function Rows({ rows }: { rows: ResolutionLineData[] }) {
  return (
    <ol className="mv-doc-rows">
      {rows.map((l) => (
        <li key={l.label}>
          <span>{l.label}</span>
          <span>
            <span className="mv-doc-lead" data-empty={!l.text}>
              {l.text || "Not answered."}
            </span>
            {l.others.map((o) => (
              <span key={o} className="mv-doc-other">
                {o}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * A shared Resolution, as the person it was shared with sees it. Board: Shared.
 * Renders the live record when data is passed, or the board's sample. Nine-theme
 * Resolutions saved before October 2026 render as their saved lines.
 */
export function SharedResolution({ data }: { data?: SharedResolutionData }) {
  const isSample = !data;
  const S: SharedResolutionData = data ?? SAMPLE_SHARED;
  const v2 = S.beliefs.length > 0 || S.parts.length > 0;
  const signer = S.role ? `${S.author}, ${S.role}` : S.author;

  return (
    <div className="mv-rz mv-rz--text" style={{ gap: 22 }}>
      <p className="mv-soft" style={{ fontSize: 16 }}>
        {S.author} wrote a Resolution for {S.org} on {S.date}.{" "}
        {isSample ? (
          <span className="mv-muted" style={{ fontSize: 14 }}>
            Sample data.
          </span>
        ) : null}
      </p>
      <article className="mv-doc">
        {v2 ? (
          <>
            <h1 className="mv-doc-title">I believe</h1>
            <Rows rows={S.beliefs} />
            <h2 className="mv-doc-title mv-doc-h2">Resolved, that {S.org} should</h2>
            {S.parts.map((p) => (
              <div key={p.name}>
                <p className="mv-doc-part">{p.name}</p>
                <Rows rows={p.rows} />
              </div>
            ))}
          </>
        ) : (
          <>
            <h1 className="mv-doc-title">Resolved, that {S.org} should…</h1>
            <ol className="mv-doc-lines">
              {S.lines.map(([theme, text]) => (
                <li key={theme + text} className="mv-doc-line">
                  <span>{theme}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </>
        )}
        {S.hardest ? (
          <div className="mv-doc-block" style={{ paddingTop: 10 }}>
            <p>Hardest for us to do today</p>
            <p>{S.hardest}</p>
          </div>
        ) : null}
        {S.acts.length ? (
          <div className="mv-doc-block">
            <p>What I’ll do</p>
            {S.acts.map((a) => (
              <p key={a}>{a}</p>
            ))}
          </div>
        ) : null}
        {S.two.trim() ? (
          <div className="mv-doc-block">
            <p>If I had two minutes</p>
            <p>{S.two}</p>
          </div>
        ) : null}
        <div className="mv-doc-sign">
          <div />
          <p className="mv-soft" style={{ fontSize: 14 }}>
            {signer}
          </p>
          <p className="mv-muted" style={{ fontSize: 13.5 }}>
            {S.date}
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
