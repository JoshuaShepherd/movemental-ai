"use client";

import Link from "next/link";
import { useState } from "react";

import { MV_ROUTES } from "../routes";

/**
 * First-theme preview of the Resolution. Selections stay in component state only:
 * nothing is saved or sent (fixture seam: the real exercise is S02-resolve-new).
 * Copy is verbatim from the canvas board.
 */
const STATEMENTS: readonly { text: string; sheet: string }[] = [
  {
    text: "We should name the work that is made of presence, and keep it human.",
    sheet: "name the work that is made of presence, and keep it human.",
  },
  {
    text: "We should never put what someone told us in confidence into an AI tool.",
    sheet: "never put what someone told us in confidence into an AI tool.",
  },
  {
    text: "We should keep the moments of care human.",
    sheet: "keep the moments of care human.",
  },
  {
    text: "No one we serve should believe a person attended to them when none did.",
    sheet: "make sure no one we serve believes a person attended to them when none did.",
  },
  {
    text: "If AI helps more people get a timely answer, that is care too.",
    sheet: "count a timely answer from AI as care, when it reaches people who would otherwise wait.",
  },
];

export function ResolvePreview() {
  const [marked, setMarked] = useState<boolean[]>(() => STATEMENTS.map(() => false));
  const sheet = STATEMENTS.filter((_, i) => marked[i]);

  return (
    <div className="mv-desk">
      <div className="mv-stack" style={{ gap: 24 }}>
        <p className="mv-small mv-muted">Presence, the first of nine themes</p>
        <h3 className="mv-h3">Where must a person always be present in our work?</h3>
        <div role="group" aria-label="Statements about presence" className="mv-stack" style={{ gap: 10 }}>
          {STATEMENTS.map((s, i) => (
            <button
              key={s.text}
              type="button"
              className="mv-stmt"
              aria-pressed={marked[i]}
              onClick={() => setMarked((m) => m.map((v, j) => (j === i ? !v : v)))}
            >
              <span aria-hidden="true" className="mv-stmt-box">
                {marked[i] ? "✓" : ""}
              </span>
              <span className="mv-reading">{s.text}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mv-stack" style={{ gap: 24, position: "sticky", top: 40 }}>
        <div className="mv-sheet">
          <p className="mv-reading mv-italic" style={{ fontSize: 22, lineHeight: 1.4 }}>
            Resolved, that our organization should…
          </p>
          {sheet.length === 0 ? (
            <p className="mv-small mv-muted">Mark a statement and it is written here.</p>
          ) : null}
          <ol className="mv-ruled-list" style={{ borderBottom: "none" }} aria-live="polite">
            {sheet.map((s) => (
              <li key={s.sheet} className="mv-settle mv-reading" style={{ padding: "14px 0" }}>
                {s.sheet}
              </li>
            ))}
          </ol>
        </div>
        <div className="mv-stack" style={{ gap: 12, alignItems: "flex-start" }}>
          <Link className="mv-pill" href={MV_ROUTES.resolve}>
            {sheet.length ? "Continue your Resolution" : "Write your Resolution"}
          </Link>
          <p className="mv-caption mv-muted">
            Eight more themes follow: voice, truth, thinking, learning, time, risk, people and
            leading.
          </p>
        </div>
      </div>
    </div>
  );
}
