import { z } from "zod";

import {
  READINESS_INTAKE_VERSION,
  READINESS_SECTIONS,
  type ReadinessQuestion,
} from "./readiness-intake-sections";

/**
 * Per-question Zod validator. Built from the typed `ReadinessQuestion` so the
 * runtime contract stays aligned with the questionnaire spec. Values are
 * permissive (all-optional except `required` text fields on submit) because
 * staff should be able to skip optional questions; the section reducer in the
 * UI enforces "all required fields" before continuing.
 */
function questionValidator(q: ReadinessQuestion): z.ZodTypeAny {
  switch (q.type) {
    case "text":
    case "textarea": {
      const base = z.string().max(8000);
      return q.required ? base.min(1) : base.optional();
    }
    case "single": {
      const base = z.enum(q.options as unknown as [string, ...string[]]);
      return q.required ? base : base.optional();
    }
    case "multi": {
      const base = z.array(z.enum(q.options as unknown as [string, ...string[]])).max(q.options.length);
      return q.required ? base.min(1) : base.optional();
    }
    case "likert":
      // 1–5 strongly disagree → strongly agree
      return q.required
        ? z.number().int().min(1).max(5)
        : z.number().int().min(1).max(5).optional();
    case "slider":
      return q.required
        ? z.number().min(q.min).max(q.max)
        : z.number().min(q.min).max(q.max).optional();
  }
}

const answersShape: Record<string, z.ZodTypeAny> = {};
for (const section of READINESS_SECTIONS) {
  for (const q of section.questions) {
    answersShape[q.id] = questionValidator(q);
  }
}

/**
 * Validates the full answers object. Unknown keys are stripped (`.strict()`
 * would reject older clients submitting renamed ids; `.strip()` is the
 * forward-compatible choice for a long-lived survey).
 */
export const ReadinessAnswersSchema = z.object(answersShape).strip();

export type ReadinessAnswers = z.infer<typeof ReadinessAnswersSchema>;

/** Server payload — what the client sends to the submit action. */
export const ReadinessSubmitInputSchema = z.object({
  answers: ReadinessAnswersSchema,
  intakeVersion: z.literal(READINESS_INTAKE_VERSION).optional(),
});

export type ReadinessSubmitInput = z.infer<typeof ReadinessSubmitInputSchema>;
