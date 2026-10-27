import { describe, expect, it } from "vitest";

import {
  type ResolutionDraft,
  emptyDraft,
  hardestCandidates,
  leaderQuestion,
  questionLines,
  savePayload,
} from "@/components/mv/resolve/draft";
import {
  ANSWER_BY_ID,
  APPROACH_QID,
  QUESTIONS,
  SECTORS,
  answerText,
  lineText,
  loadExamples,
} from "@/components/mv/resolve/questions";

function draftWith(picks: ResolutionDraft["picks"]): ResolutionDraft {
  return { ...emptyDraft(), picks };
}

describe("Resolve v3 content", () => {
  it("has fourteen questions and 79 answers with unique ids", () => {
    expect(QUESTIONS).toHaveLength(14);
    const ids = QUESTIONS.flatMap((q) => q.answers.map((a) => a.id));
    expect(ids).toHaveLength(79);
    expect(new Set(ids).size).toBe(79);
    for (const id of ids) expect(id).toMatch(/^q\d{2}[a-z]$/);
  });

  it("makes only the overall approach single choice", () => {
    expect(QUESTIONS.filter((q) => q.mode === "single").map((q) => q.id)).toEqual([APPROACH_QID]);
  });

  it("gives every answer three examples in every sector", async () => {
    for (const s of SECTORS) {
      const ex = await loadExamples(s.id);
      for (const id of ANSWER_BY_ID.keys()) expect(ex[id], `${s.id} ${id}`).toHaveLength(3);
    }
  });

  it("uses curly apostrophes in the content", () => {
    for (const q of QUESTIONS) for (const a of q.answers) for (const s of SECTORS) expect(answerText(a, s.id)).not.toContain("'");
  });
});

describe("Resolve v3 draft", () => {
  it("strips 'We should' from organization lines but not from beliefs", () => {
    expect(lineText("q03", "We should set rules for sensitive information right away.")).toBe(
      "Set rules for sensitive information right away.",
    );
    expect(lineText("q01", "I believe AI can help people we could not otherwise reach.")).toMatch(/^I believe/);
  });

  it("leads with the starred answer, then other ticks", () => {
    const q = QUESTIONS.find((x) => x.id === "q03")!;
    const l = questionLines(
      draftWith({ q03: { ticks: { q03a: true, q03c: true }, star: "q03c", choice: null, none: false, own: "" } }),
      q,
    );
    expect(l.lead?.id).toBe("q03c");
    expect(l.others).toHaveLength(1);
  });

  it("offers the q03 question for leaders and keeps q05 out of 'hardest'", () => {
    const d = draftWith({
      q03: { ticks: { q03c: true }, star: "q03c", choice: null, none: false, own: "" },
      q05: { ticks: {}, star: null, choice: "q05c", none: false, own: "" },
    });
    expect(leaderQuestion(d)).not.toBe("");
    expect(hardestCandidates(d).map((c) => c.id)).toEqual(["q03c"]);
  });

  it("never sends own words to the server", () => {
    const d = draftWith({ q09: { ticks: {}, star: null, choice: null, none: true, own: "Private words" } });
    expect(JSON.stringify(savePayload(d))).not.toContain("Private words");
  });
});
