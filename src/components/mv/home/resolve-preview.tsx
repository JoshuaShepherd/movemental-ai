"use client";

import Link from "next/link";
import { useState } from "react";

import { QUESTIONS } from "../resolve/questions";
import { MV_ROUTES } from "../routes";

/**
 * A preview of one Resolve question on the home page: question 07, prohibited uses.
 * Selections stay in component state only; nothing is saved or sent.
 * Board: canvas "Resolve: Fourteen Questions", Home-Resolve.
 */
const Q = QUESTIONS.find((q) => q.id === "q07")!;
const ANSWERS = Q.answers.map((a) => ({ id: a.id, text: a.text, sheet: a.text.charAt(0).toLowerCase() + a.text.slice(1) }));

export function ResolvePreview() {
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const sheet = ANSWERS.filter((a) => marked[a.id]);

  return (
    <div className="mv-desk">
      <div className="mv-stack" style={{ gap: 24 }}>
        <p className="mv-small mv-muted">Question 07 of 14 · {Q.term}</p>
        <h3 className="mv-h3">{Q.title}</h3>
        <div role="group" aria-label={Q.title} className="mv-stack" style={{ gap: 10 }}>
          {ANSWERS.map((a) => (
            <button
              key={a.id}
              type="button"
              className="mv-stmt"
              aria-pressed={!!marked[a.id]}
              onClick={() => setMarked((m) => ({ ...m, [a.id]: !m[a.id] }))}
            >
              <span aria-hidden="true" className="mv-stmt-box">
                {marked[a.id] ? "✓" : ""}
              </span>
              <span className="mv-reading">{a.text}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mv-stack" style={{ gap: 24, position: "sticky", top: 40 }}>
        <div className="mv-sheet">
          <p className="mv-reading mv-italic" style={{ fontSize: 22, lineHeight: 1.4 }}>
            Resolved, that our organization should prohibit
          </p>
          {sheet.length === 0 ? <p className="mv-small mv-muted">Tick an answer and it is written here.</p> : null}
          <ol className="mv-ruled-list" style={{ borderBottom: "none" }} aria-live="polite">
            {sheet.map((a) => (
              <li key={a.id} className="mv-settle mv-reading" style={{ padding: "14px 0" }}>
                {a.sheet}
              </li>
            ))}
          </ol>
        </div>
        <div className="mv-stack" style={{ gap: 12, alignItems: "flex-start" }}>
          <Link className="mv-pill" href={MV_ROUTES.resolve}>
            {sheet.length ? "Continue your Resolution" : "Write your Resolution"}
          </Link>
          <p className="mv-caption mv-muted">
            Thirteen more questions follow. Each has a short explanation for anyone unsure how to
            answer.
          </p>
        </div>
      </div>
    </div>
  );
}
