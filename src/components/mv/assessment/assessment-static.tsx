import Link from "next/link";

import { MV_ROUTES } from "../routes";
import { AssessmentStart } from "./assessment-views";
import type { AssessmentResultsData } from "@/lib/services/assessment/reality-assessment.service";
import { QUESTIONS, SAMPLE_GAPS } from "./questions";

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

export function AssessmentResults({
  token,
  data,
  error,
}: {
  token?: string;
  data?: AssessmentResultsData | null;
  error?: string;
}) {
  // If data exists but below the 5-contributor threshold, render sealed notice
  if (data && !data.unlocked) {
    return (
      <div className="mv-wrap mv-stack mv-settle" style={{ maxWidth: 900, paddingTop: 72, paddingBottom: 96, gap: 28 }}>
        <p className="mv-small mv-muted">{data.organizationName} · Reality Assessment</p>
        <h1 className="mv-rz-title">Results are sealed until five people have answered.</h1>
        <div className="mv-stack" style={{ gap: 12, padding: "22px 24px", background: "var(--mv-sheet)", borderRadius: 4 }}>
          <div className="mv-tally" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} data-on={i < data.contributorCount} />
            ))}
          </div>
          <p className="mv-reading" style={{ lineHeight: 1.5 }}>
            {data.contributorCount} of {data.threshold} people have answered anonymously.
          </p>
          <p className="mv-caption mv-muted">
            Five keeps anyone’s answers from being guessed. Grouped views and reality gap calculations
            unlock automatically as soon as the fifth response is recorded.
          </p>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Link
            className="mv-pill"
            href={`${MV_ROUTES.assessmentAnswer}${token ? `?token=${encodeURIComponent(token)}` : ""}`}
          >
            Answer the assessment
          </Link>
          <Link className="mv-link-target" href={MV_ROUTES.assessment}>
            About the Reality Assessment
          </Link>
        </div>
      </div>
    );
  }

  // If live data is unlocked, calculate gaps
  const orgName = data?.organizationName || "Riverbend Youth & Family";
  const contributorCount = data ? data.contributorCount : 12;
  const isSample = !data;

  // Build rows: either computed from live database or fallback to sample
  const gapRows = data && data.unlocked
    ? QUESTIONS.map((q, idx) => {
        const leaderPred = data.leaderPredictions?.[idx] ?? 0;
        const leaderText = q.leaderOptions[leaderPred] || "Predicted";
        const tW = Math.max(15, Math.round(((leaderPred + 1) / q.leaderOptions.length) * 100));

        const avgScore = data.contributorAverages?.[idx] ?? 0;
        const staffIndex = Math.min(Math.round(avgScore), q.staffOptions.length - 1);
        const staffText = q.staffOptions[staffIndex] || "Reported";
        const rW = Math.max(15, Math.round(((avgScore + 1) / q.staffOptions.length) * 100));

        const gap = data.gaps?.[idx] ?? 0;
        const tag = gap >= 1.5 ? "Wide gap" : gap >= 0.8 ? "Noticeable gap" : "Close";

        return {
          area: q.area,
          question: q.staff,
          thought: leaderText,
          reported: staffText,
          tag,
          tW,
          rW,
          gap,
        };
      }).sort((a, b) => b.gap - a.gap)
    : SAMPLE_GAPS.map(([area, q, thought, reported, tag, tW, rW]) => ({
        area,
        question: q,
        thought,
        reported,
        tag,
        tW,
        rW,
        gap: 0,
      }));

  return (
    <>
      <section className="mv-wrap mv-stack" style={{ paddingTop: 72, paddingBottom: 40, gap: 16 }}>
        <p className="mv-small mv-muted">
          {orgName} · Reality Assessment{isSample ? " · sample" : ""}
        </p>
        <h1 className="mv-h1" style={{ maxWidth: 1000 }}>
          What you thought, and what your people reported
        </h1>
        <p className="mv-reading mv-soft" style={{ maxWidth: 720, fontSize: 19, lineHeight: 1.55 }}>
          {contributorCount} people answered anonymously. The widest gaps are first. None of
          this is a grade. It is where your organization actually is.
        </p>
      </section>
      <section className="mv-wrap" style={{ paddingBottom: 72 }}>
        <div className="mv-gaprow mv-gaprow--head">
          <span />
          <span>What you thought</span>
          <span>What your people reported</span>
        </div>
        {gapRows.map((row) => (
          <div key={row.area} className="mv-gaprow">
            <div className="mv-stack" style={{ gap: 3 }}>
              <span className="mv-caption mv-muted">{row.area}</span>
              <span className="mv-reading" style={{ fontSize: 18, lineHeight: 1.4 }}>
                {row.question}
              </span>
              <span className={row.tag === "Close" ? "mv-caption mv-muted" : "mv-caption"} style={{ fontWeight: 500 }}>
                {row.tag}
              </span>
            </div>
            <div>
              <span className="mv-small">{row.thought}</span>
              <div className="mv-gapbar" aria-hidden="true">
                <div style={{ width: `${row.tW}%` }} />
              </div>
            </div>
            <div>
              <span className="mv-small">{row.reported}</span>
              <div className="mv-gapbar mv-gapbar--reported" aria-hidden="true">
                <div style={{ width: `${row.rW}%` }} />
              </div>
            </div>
          </div>
        ))}
        <p className="mv-caption mv-muted" style={{ paddingTop: 16, borderTop: "1px solid var(--mv-rule)" }}>
          Answers by role appear only where at least five people share a role.
        </p>
      </section>
      <section className="mv-section--sheet" style={{ padding: "72px 0 88px" }}>
        <div className="mv-wrap mv-hero mv-hero--side" style={{ alignItems: "start" }}>
          <div className="mv-stack" style={{ gap: 14 }}>
            <h2 className="mv-h2">Where this goes next</h2>
            <p className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.55 }}>
              These results are now part of {orgName}’s context in the Map. When your working group
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
              published can identify {orgName} or anyone in it.
            </p>
          </div>
        </div>
      </section>
      {isSample ? (
        <section className="mv-wrap mv-stack" style={{ paddingTop: 64, paddingBottom: 88, gap: 14, alignItems: "flex-start" }}>
          <p className="mv-caption mv-muted">This is an example, with sample data.</p>
          <Link className="mv-pill" href={MV_ROUTES.assessment}>
            Start the Reality Assessment
          </Link>
        </section>
      ) : null}
    </>
  );
}
