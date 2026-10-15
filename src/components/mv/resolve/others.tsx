"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { MV_ROUTES } from "../routes";
import { useDraft } from "./draft";
import { SAMPLE_TIME_SPLIT } from "./fixtures";
import { FlowLoading } from "./resolve-flow";
import { RESOLVE_THEMES } from "./themes";

const TIME = 5;

/**
 * How others have resolved (flow document 5.6). Board: R3-Others.
 * Shown only after the person finishes their own. The movement-leader row is hidden until
 * leaders publish (no placeholders). Counts are the board's sample data, labeled.
 */
export function OthersResolved() {
  const d = useDraft();
  const router = useRouter();
  const finished = !!d?.finishedAt;

  useEffect(() => {
    if (d === null || (d !== undefined && !d.finishedAt)) router.replace(MV_ROUTES.resolve);
  }, [d, router]);

  if (!finished) return <FlowLoading />;

  const myStar = d!.stars[TIME];
  const mine = myStar === undefined ? "" : RESOLVE_THEMES[TIME]!.statements[myStar];
  const max = SAMPLE_TIME_SPLIT.rows[0][1];

  return (
    <div className="mv-rz mv-rz--wide" style={{ gap: 44 }}>
      <div className="mv-stack" style={{ gap: 12, maxWidth: 760 }}>
        <h1 className="mv-rz-title">How others have resolved</h1>
        <p className="mv-muted" style={{ fontSize: 16, lineHeight: 1.6 }}>
          Only Resolutions people chose to make public appear here. Yours is finished, so nothing
          here can change what you chose.
        </p>
      </div>

      <section className="mv-stack" style={{ gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
          <h2 className="mv-h3--sm" style={{ fontSize: 34 }}>
            Time: what should happen to the time AI saves?
          </h2>
          <p className="mv-caption mv-muted">
            Stars across {SAMPLE_TIME_SPLIT.total} public Resolutions. Sample data.
          </p>
        </div>
        <div style={{ borderBottom: "1px solid var(--mv-rule)" }}>
          {SAMPLE_TIME_SPLIT.rows.map(([text, n]) => {
            const isMine = text === mine;
            return (
              <div key={text} className="mv-count-row">
                <span className="mv-reading" style={{ fontSize: 17, lineHeight: 1.4 }}>
                  {text}{" "}
                  {isMine ? (
                    <span style={{ fontFamily: "var(--mv-font-ui)", fontSize: 13, color: "var(--mv-accent)", whiteSpace: "nowrap" }}>
                      Your star
                    </span>
                  ) : null}
                </span>
                <span className="mv-bar" data-mine={isMine}>
                  <span style={{ width: `${Math.round((n / max) * 100)}%` }} />
                </span>
                <span className="mv-num">{n}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mv-stack" style={{ gap: 12, padding: "28px 30px", background: "var(--mv-sheet)", borderRadius: 4 }}>
        <h2 className="mv-rz-h2--sm">People who resolved what you did about time</h2>
        <p className="mv-soft" style={{ fontSize: 15.5, lineHeight: 1.6 }}>
          38 public Resolutions from other organizations starred the same line. 14 are churches, 19
          are nonprofits and 5 are seminaries. Sample data.
        </p>
        <Link href={MV_ROUTES.resolvePeople} style={{ fontSize: 15 }}>
          See them
        </Link>
      </section>
    </div>
  );
}
