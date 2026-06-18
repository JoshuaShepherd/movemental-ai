/**
 * Agent Room — client-side prop schemas for the screen components.
 *
 * These MIRROR the engine's render-tool Zod schemas
 * (`movemental-ai-agents/src/lib/tools/render-tools.tool.ts`). The engine already
 * blocks invalid props before emitting a `ui_render`, but the room validates
 * again on receipt (defense in depth — a malformed frame never crashes the
 * surface; it falls back to the voice). Keep in sync by contract.
 */
import { z } from "zod";

export const realityCheckBeatProps = z.object({
  beatId: z.string().min(1),
  question: z.string().min(1), // may contain <em>…</em>
  options: z.array(z.string().min(1)).min(2),
  progress: z.object({
    step: z.number().int().min(1),
    total: z.number().int().min(1),
  }),
});
export type RealityCheckBeatProps = z.infer<typeof realityCheckBeatProps>;

export const readbackProps = z.object({
  verdict: z.enum(["pre", "past"]),
  hereStageIndex: z.number().int().min(0).max(3),
  prose: z.object({
    lead: z.string().min(1),
    body: z.array(z.string().min(1)).min(1),
  }),
  fork: z
    .array(
      z.object({
        label: z.string().min(1),
        sub: z.string().min(1),
        intent: z.enum(["pricing", "path", "handoff_human"]),
        paid: z.boolean().optional(),
      }),
    )
    .min(1),
  handoffNote: z.string().optional(),
});
export type ReadbackProps = z.infer<typeof readbackProps>;

export const handoffHumanProps = z.object({
  reason: z.string().optional(),
  email: z.literal("josh@movemental.ai"),
});
export type HandoffHumanProps = z.infer<typeof handoffHumanProps>;

/**
 * Lead-capture form-cell (INT-01 / Discuss). Mirrors the engine `CaptureProps`.
 * `discuss` is the long-form Discuss variant (form wired in INT-09).
 */
export const captureProps = z.object({
  kind: z.enum(["map", "paid", "free", "discuss"]),
});
export type CaptureProps = z.infer<typeof captureProps>;

export const safetyFlowProps = z.object({
  step: z.enum(["question", "fork", "charter", "diy", "signup", "ahead", "result"]),
  /** When `step` is `result`, selects start vs draft copy (engine-driven branching). */
  answer: z.enum(["start", "draft", "done"]).optional(),
});
export type SafetyFlowProps = z.infer<typeof safetyFlowProps>;

/** Optional host personalization for the pricing screen (amounts stay in `pricing.ts`). */
export const pricingProps = z.object({
  highlightStage: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  eyebrow: z.string().max(80).optional(),
});
export type PricingScreenProps = z.infer<typeof pricingProps>;

/** Optional intro line above the founders band. */
export const foundersProps = z.object({
  introLine: z.string().max(200).optional(),
});
export type FoundersScreenProps = z.infer<typeof foundersProps>;

/** Optional lede for the in-room About stub. */
export const aboutProps = z.object({
  lede: z.string().max(300).optional(),
});
export type AboutScreenProps = z.infer<typeof aboutProps>;

/** Static-repertoire components carry no props unless listed above. */
export const emptyProps = z.object({}).passthrough();

/** Per-component validator. Returns parsed props or null (→ voice fallback). */
export function validateComponentProps(
  component: string,
  props: unknown,
): Record<string, unknown> | null {
  const schema =
    component === "beat"
      ? realityCheckBeatProps
      : component === "readback"
        ? readbackProps
        : component === "handoff_human"
          ? handoffHumanProps
          : component === "capture"
            ? captureProps
            : component === "safetyFlow"
              ? safetyFlowProps
              : component === "pricing"
                ? pricingProps
                : component === "founders"
                  ? foundersProps
                  : component === "about"
                    ? aboutProps
                    : emptyProps;
  const parsed = schema.safeParse(props ?? {});
  return parsed.success ? (parsed.data as Record<string, unknown>) : null;
}
