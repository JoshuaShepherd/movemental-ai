import Link from "next/link";

import { MV_ROUTES } from "../routes";
import { AssessmentStart } from "./assessment-views";
import { SAMPLE_GAPS } from "./questions";

/** The explainer and the sample results. Board: Assessment. Copy verbatim. */

export function AssessmentIntro() {
  return (
    <>
      <section className="mv-wrap" style={{ paddingTop: 88, paddingBottom: 72 }}>
        <div className="mv-hero mv-hero--side" style={{ alignItems: "start" }}>
          <div className="mv-stack" style={{ gap: 22 }}>
            <p className="mv-small mv-muted">The Reality Assessment</p>
            <h1 className="mv-h1">Find out what is actually happening, before you decide what should.</h1>
            <p className="mv-reading-lg mv-soft" style={{ maxWidth: 660 }}>
              Your leaders predict how AI is being used across your organization. Your people answer
              the same questions anonymously. You see the two side by side. There is no score and no
              grade, only the gap.
            </p>
            <ul className="mv-ruled-lines" style={{ listStyle: "none", padding: 0, maxWidth: 660 }}>
              {[
                "Free, and you can run it again whenever you like.",
                "No one’s individual answers are ever shown, to anyone.",
                "Results appear only once at least five people have answered.",
              ].map((t) => (
                <li key={t} style={{ fontSize: 17, padding: "12px 0" }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <AssessmentStart />
        </div>
      </section>
      <section className="mv-wrap" style={{ paddingBottom: 96 }}>
        <div className="mv-steps3">
          {[
            ["Leaders predict", "How much your people use AI and for what, which personal tools are in play, whether sensitive information goes into them, how confident people feel, what gets disclosed, what rules exist, and how you use AI yourselves."],
            ["Your people answer", "Staff, and volunteers or board where it fits, answer the same questions about themselves. Anonymously, and without seeing what leaders predicted."],
            ["You see the gap", "What you thought, beside what your people reported. The results become part of your organization’s context in the Map, as a starting point for the charter."],
          ].map(([t, d], i) => (
            <div key={t}>
              <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 40, lineHeight: 1 }}>{i + 1}</span>
              <p style={{ fontSize: 17, fontWeight: 500 }}>{t}</p>
              <p className="mv-small mv-soft">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function AssessmentResults() {
  return (
    <>
      <section className="mv-wrap mv-stack" style={{ paddingTop: 72, paddingBottom: 40, gap: 16 }}>
        <p className="mv-small mv-muted">Riverbend Youth &amp; Family · Reality Assessment, October 2026 · sample</p>
        <h1 className="mv-h1" style={{ maxWidth: 1000 }}>
          What you thought, and what your people reported
        </h1>
        <p className="mv-reading mv-soft" style={{ maxWidth: 720, fontSize: 19, lineHeight: 1.55 }}>
          3 leaders predicted. 12 of 19 people answered anonymously. The widest gaps are first. None of
          this is a grade. It is where your organization actually is.
        </p>
      </section>
      <section className="mv-wrap" style={{ paddingBottom: 72 }}>
        <div className="mv-gaprow mv-gaprow--head">
          <span />
          <span>What you thought</span>
          <span>What your people reported</span>
        </div>
        {SAMPLE_GAPS.map(([area, q, thought, reported, tag, tW, rW]) => (
          <div key={area} className="mv-gaprow">
            <div className="mv-stack" style={{ gap: 3 }}>
              <span className="mv-caption mv-muted">{area}</span>
              <span className="mv-reading" style={{ fontSize: 18, lineHeight: 1.4 }}>
                {q}
              </span>
              <span className={tag === "Close" ? "mv-caption mv-muted" : "mv-caption"} style={{ fontWeight: 500 }}>
                {tag}
              </span>
            </div>
            <div>
              <span className="mv-small">{thought}</span>
              <div className="mv-gapbar" aria-hidden="true">
                <div style={{ width: `${tW}%` }} />
              </div>
            </div>
            <div>
              <span className="mv-small">{reported}</span>
              <div className="mv-gapbar mv-gapbar--reported" aria-hidden="true">
                <div style={{ width: `${rW}%` }} />
              </div>
            </div>
          </div>
        ))}
        <p className="mv-caption mv-muted" style={{ paddingTop: 16, borderTop: "1px solid var(--mv-rule)" }}>
          Answers by role appear only where at least five people share a role. Here: staff (8). Board
          and volunteers are counted in the totals only.
        </p>
      </section>
      <section className="mv-section--sheet" style={{ padding: "72px 0 88px" }}>
        <div className="mv-wrap mv-hero mv-hero--side" style={{ alignItems: "start" }}>
          <div className="mv-stack" style={{ gap: 14 }}>
            <h2 className="mv-h2">Where this goes next</h2>
            <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55 }}>
              These results are now part of Riverbend’s context in the Map. When your working group
              drafts the charter, the Context section starts from what your people reported here,
              marked as a sourced fact.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <Link className="mv-link-target" href={MV_ROUTES.map}>
                Bring this to your working group
              </Link>
            </div>
          </div>
          <div className="mv-artifact mv-stack" style={{ gap: 10, padding: "24px 26px" }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Run it again</p>
            <p className="mv-small mv-soft">
              Run it again after the charter is adopted, and again after formation, to see whether the
              gap is closing.
            </p>
            <p className="mv-caption mv-muted">
              With your permission, these totals join anonymous research across organizations. Nothing
              published can identify Riverbend or anyone in it.
            </p>
          </div>
        </div>
      </section>
      <section className="mv-wrap mv-stack" style={{ paddingTop: 64, paddingBottom: 88, gap: 14, alignItems: "flex-start" }}>
        <p className="mv-caption mv-muted">This is an example, with sample data.</p>
        <Link className="mv-pill" href={MV_ROUTES.assessment}>
          Start the Reality Assessment
        </Link>
      </section>
    </>
  );
}
