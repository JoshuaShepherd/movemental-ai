import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { computeSafetyVerdict } from "../../src/lib/agent-room/data/safety-verdict";

const spec = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../fixtures/beat-verdict-spec.json"),
    "utf8",
  ),
) as {
  verdictCases: Array<{
    label: string;
    answers: { beatId: string; answer: string }[];
    expected: { verdict: string; hereStageIndex: number };
  }>;
};

describe("beat verdict contract (room)", () => {
  for (const c of spec.verdictCases) {
    it(c.label, () => {
      expect(computeSafetyVerdict(c.answers)).toEqual(c.expected);
    });
  }
});
