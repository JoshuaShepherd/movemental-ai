"use client";

import Link from "next/link";
import { useState } from "react";

import { MV_ROUTES } from "../routes";
import { SAMPLE_COUNTS, SAMPLE_TEAM_SIZE } from "./fixtures";
import { APPROACH_QID, QUESTIONS, lineText, pad2 } from "./questions";

const ORG = "Riverbend Church";
const N = SAMPLE_TEAM_SIZE;
const c = (qid: string, aid: string) => SAMPLE_COUNTS[qid]?.[aid] ?? { t: 0, s: 0 };
const pct = (n: number) => `${Math.round((100 * n) / N)}%`;

/**
 * What an organization's people said, once five or more have written theirs and agreed to be
 * counted. Board: Team. Counts only: no names, no one's own words. This page shows the board's
 * sample of nine until the organization view is wired to real counts (resolution_versions
 * selections, keyed by answer id).
 */
export function TeamView() {
  const [sel, setSel] = useState("q12");
  const approach = QUESTIONS.find((q) => q.id === APPROACH_QID)!;
  const agree = QUESTIONS.filter((q) => q.mode !== "single")
    .flatMap((q) => q.answers.map((a) => ({ q, a, n: c(q.id, a.id).t })))
    .filter((r) => r.n >= 7)
    .sort((x, y) => y.n - x.n)
    .slice(0, 9);
  const differ = ["q04", "q12"].map((qid) => {
    const q = QUESTIONS.find((x) => x.id === qid)!;
    const rows = q.answers
      .map((a) => ({ a, s: c(qid, a.id).s }))
      .filter((r) => r.s > 0)
      .sort((x, y) => y.s - x.s)
      .slice(0, 3);
    return { q, rows, num: QUESTIONS.indexOf(q) + 1 };
  });
  const sq = QUESTIONS.find((q) => q.id === sel)!;

  return (
    <div className="mv-rz mv-rz--wide" style={{ gap: 52 }}>
      <div className="mv-stack" style={{ gap: 12, maxWidth: 760 }}>
        <h1 className="mv-rz-title">What {ORG}’s people said</h1>
        <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55 }}>
          Nine people from {ORG} have written their Resolutions and agreed to be counted. You see
          counts only, never names or anyone’s own words.
        </p>
        <p className="mv-muted" style={{ fontSize: 15, lineHeight: 1.55 }}>
          Agreement is a starting point. Nothing here is a decision until the people responsible
          for deciding have decided. Sample data.
        </p>
      </div>

      <section aria-labelledby="h-approach" className="mv-stack" style={{ gap: 12 }}>
        <h2 id="h-approach" className="mv-rz-h2">
          Overall approach
        </h2>
        <p className="mv-muted" style={{ fontSize: 15 }}>
          Question 05: {approach.title} Each person chose one.
        </p>
        <div style={{ borderBottom: "1px solid var(--mv-rule)" }}>
          {approach.answers.map((a) => {
            const n = c(approach.id, a.id).t;
            return (
              <div key={a.id} className="mv-count-row">
                <span className="mv-reading" style={{ fontSize: 17, lineHeight: 1.4 }}>
                  {lineText(approach.id, a.text)}
                </span>
                <span className="mv-bar">
                  <span style={{ width: pct(n) }} />
                </span>
                <span className="mv-num">{n}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="h-agree" className="mv-stack" style={{ gap: 12 }}>
        <h2 id="h-agree" className="mv-rz-h2">
          Where you agree
        </h2>
        <p className="mv-muted" style={{ fontSize: 15 }}>
          Answers at least seven of the nine people chose.
        </p>
        <ul className="mv-rq-review">
          {agree.map(({ q, a, n }) => (
            <li key={a.id}>
              <span className="mv-stack" style={{ gap: 4, minWidth: 0 }}>
                <span className="mv-caption mv-muted">{q.label}</span>
                <span className="mv-reading">{lineText(q.id, a.text)}</span>
              </span>
              <span className="mv-num">
                {n} of {N}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="h-differ" className="mv-stack" style={{ gap: 12 }}>
        <h2 id="h-differ" className="mv-rz-h2">
          Where you differ
        </h2>
        <p className="mv-muted" style={{ fontSize: 15, maxWidth: 680 }}>
          Questions where people starred different answers as most important. These are good places
          to start a conversation.
        </p>
        <div className="mv-rq-differ">
          {differ.map(({ q, rows, num }) => (
            <div key={q.id} className="mv-rz-sheet mv-stack" style={{ gap: 10 }}>
              <p className="mv-caption mv-muted">
                Question {pad2(num)} · {q.label}
              </p>
              <h3 className="mv-rz-h2--sm" style={{ fontSize: 24 }}>
                {q.title}
              </h3>
              {rows.map(({ a, s }) => (
                <div key={a.id} className="mv-rq-soline" style={{ flexDirection: "row", justifyContent: "space-between", gap: 16 }}>
                  <span className="mv-reading" style={{ fontSize: 16, color: "var(--mv-ink)" }}>
                    {lineText(q.id, a.text)}
                  </span>
                  <span className="mv-num" style={{ whiteSpace: "nowrap" }}>
                    {s} starred
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="h-each" className="mv-stack" style={{ gap: 16 }}>
        <h2 id="h-each" className="mv-rz-h2">
          Question by question
        </h2>
        <div role="tablist" aria-label="Question" className="mv-rq-nav">
          <div style={{ flexWrap: "wrap" }}>
            {QUESTIONS.map((q, i) => (
              <button
                key={q.id}
                type="button"
                role="tab"
                aria-selected={q.id === sel}
                aria-label={`Question ${i + 1}: ${q.title}`}
                title={q.title}
                className="mv-rq-num"
                data-state={q.id === sel ? "current" : undefined}
                onClick={() => setSel(q.id)}
              >
                {pad2(i + 1)}
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" className="mv-stack" style={{ gap: 8 }}>
          <h3 className="mv-rz-h2--sm" style={{ fontSize: 26 }}>
            {sq.title}
          </h3>
          <div className="mv-rq-table">
            <div className="mv-rq-table-head">
              <span>Answer</span>
              <span>Chose it</span>
              <span>{sq.mode === "single" ? "" : "Starred it"}</span>
            </div>
            {sq.answers.map((a) => {
              const k = c(sq.id, a.id);
              return (
                <div key={a.id} className="mv-rq-table-row">
                  <span className="mv-reading">{lineText(sq.id, a.text)}</span>
                  <span className="mv-num">{k.t}</span>
                  <span className="mv-num">{sq.mode === "single" ? "" : k.s}</span>
                  <span className="mv-bar" aria-hidden="true">
                    <span style={{ width: pct(k.t) }} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mv-stack mv-rz-sheet" style={{ gap: 12 }}>
        <h2 className="mv-rz-h2--sm">Bring this to the people who decide</h2>
        <p className="mv-reading mv-soft" style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 680 }}>
          The Map turns these answers into decisions. {ORG}’s working group starts with what you
          agree on, and the places you differ become its agenda.
        </p>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <Link className="mv-pill" href={MV_ROUTES.map}>
            Begin {ORG}’s response
          </Link>
          <Link href={MV_ROUTES.resolvePeople}>Invite more people</Link>
        </div>
      </section>
    </div>
  );
}
