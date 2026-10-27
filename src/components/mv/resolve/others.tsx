"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MV_ROUTES } from "../routes";
import { pickOf, useDraft } from "./draft";
import { SAMPLE_COUNTS, SAMPLE_PUBLIC } from "./fixtures";
import { FlowLoading } from "./resolve-flow";
import { QUESTIONS, answerText, lineText, pad2, questionTitle } from "./questions";

/**
 * How others answered. Board: Others. Shown only after the person finishes their own, so
 * nothing here can change their answers. Counts are the board's sample data, labeled, until
 * enough public Resolutions exist.
 */
export function OthersResolved() {
  const d = useDraft();
  const router = useRouter();
  const [sel, setSel] = useState("q05");
  const finished = !!d?.finishedAt;

  useEffect(() => {
    if (d === null || (d !== undefined && !d.finishedAt)) router.replace(MV_ROUTES.resolve);
  }, [d, router]);

  if (!finished || !d) return <FlowLoading />;

  const q = QUESTIONS.find((x) => x.id === sel) ?? QUESTIONS[4]!;
  const single = q.mode === "single";
  const p = pickOf(d, q.id);
  const mine = single ? p.choice : p.star;
  // Scale the nine-person sample to the public total so the bars read as public counts.
  const raw = q.answers.map((a) => ({ a, n: (SAMPLE_COUNTS[q.id]?.[a.id]?.[single ? "t" : "s"] ?? 0) + 0.6 }));
  const total = raw.reduce((x, r) => x + r.n, 0);
  const rows = raw.map((r) => ({ a: r.a, n: Math.round((r.n * SAMPLE_PUBLIC) / total) }));
  const max = Math.max(...rows.map((r) => r.n));
  const mineRow = rows.find((r) => r.a.id === mine);

  return (
    <div className="mv-rz mv-rz--wide" style={{ gap: 44 }}>
      <div className="mv-stack" style={{ gap: 12, maxWidth: 760 }}>
        <h1 className="mv-rz-title">How others answered</h1>
        <p className="mv-muted" style={{ fontSize: 16, lineHeight: 1.6 }}>
          Only Resolutions people chose to make public appear here. Yours is finished, so nothing
          here can change your answers.
        </p>
      </div>

      <section className="mv-stack" style={{ gap: 18 }}>
        <div role="tablist" aria-label="Question" className="mv-rq-nav">
          <div style={{ flexWrap: "wrap" }}>
            {QUESTIONS.map((qq, i) => (
              <button
                key={qq.id}
                type="button"
                role="tab"
                aria-selected={qq.id === sel}
                aria-label={`Question ${i + 1}: ${questionTitle(qq, d.sector)}`}
                title={questionTitle(qq, d.sector)}
                className="mv-rq-num"
                data-state={qq.id === sel ? "current" : undefined}
                onClick={() => setSel(qq.id)}
              >
                {pad2(i + 1)}
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" className="mv-stack" style={{ gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <h2 className="mv-h3--sm" style={{ fontSize: 34, maxWidth: 760 }}>
              {questionTitle(q, d.sector)}
            </h2>
            <p className="mv-caption mv-muted">
              {single ? "Choices" : "Stars"} across {SAMPLE_PUBLIC.toLocaleString("en-US")} public
              Resolutions. Sample data.
            </p>
          </div>
          <div style={{ borderBottom: "1px solid var(--mv-rule)" }}>
            {rows.map(({ a, n }) => {
              const isMine = a.id === mine;
              return (
                <div key={a.id} className="mv-count-row">
                  <span className="mv-reading" style={{ fontSize: 17, lineHeight: 1.4 }}>
                    {lineText(q.id, answerText(a, d.sector))}{" "}
                    {isMine ? (
                      <span style={{ fontFamily: "var(--mv-font-ui)", fontSize: 13, color: "var(--mv-accent)", whiteSpace: "nowrap" }}>
                        Your answer
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
        </div>
      </section>

      {mineRow ? (
        <section className="mv-stack" style={{ gap: 12, padding: "28px 30px", background: "var(--mv-sheet)", borderRadius: 4 }}>
          <h2 className="mv-rz-h2--sm">People who answered as you did</h2>
          <p className="mv-soft" style={{ fontSize: 15.5, lineHeight: 1.6 }}>
            {mineRow.n} public Resolutions from other organizations gave the same{" "}
            {single ? "answer" : "starred answer"} to this question. Sample data.
          </p>
          <Link href={MV_ROUTES.resolvePeople} style={{ fontSize: 15 }}>
            See them
          </Link>
        </section>
      ) : null}
    </div>
  );
}
