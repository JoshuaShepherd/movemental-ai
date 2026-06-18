import { z } from "zod";

import { SAFETY_ENROLLMENT_AMOUNT_CENTS, SAFETY_ENROLLMENT_CURRENCY } from "@/lib/safety/constants";

const contributorSchema = z.object({
  name: z.string().min(1).max(200),
  role: z.string().max(200).optional(),
  email: z.string().email().max(320),
  function: z.string().max(200).optional(),
});

const artifactUploadSchema = z.object({
  name: z.string().min(1).max(500),
  storage_path: z.string().min(1).max(2000),
});

/** Enrollment step 1 — primary contact + org snapshot. */
export const enrollmentStep1Schema = z.object({
  contact_name: z.string().min(2).max(200),
  contact_role: z.string().max(200).optional(),
  contact_email: z.string().email().max(320),
  contact_phone: z.string().max(50).optional(),
  org_name: z.string().min(2).max(200),
  org_type: z.string().max(100).optional(),
  website: z.string().url().max(500).optional().or(z.literal("")),
  denomination: z.string().max(200).optional(),
  size_text: z.string().max(100).optional(),
  annual_budget: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
});

/** Enrollment step 2 — leadership + context. */
export const enrollmentStep2Schema = z.object({
  decider_name: z.string().min(2).max(200),
  decider_role: z.string().max(200).optional(),
  decider_email: z.string().email().max(320),
  current_ai_usage: z.string().max(5000).optional(),
  leadership_concerns: z.string().max(5000).optional(),
  ratification_process: z.string().max(5000).optional(),
  preferred_kickoff_window: z.string().max(500).optional(),
  contributors: z.array(contributorSchema).default([]),
});

/** Enrollment step 3 — uploads + confirm. */
export const enrollmentStep3Schema = z.object({
  artifact_uploads: z.array(artifactUploadSchema).default([]),
});

export const createEnrollmentSchema = enrollmentStep1Schema
  .merge(enrollmentStep2Schema)
  .merge(enrollmentStep3Schema);

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;

export const updateEnrollmentSchema = createEnrollmentSchema.partial().extend({
  enrollment_id: z.string().uuid(),
});

export const createCheckoutSessionSchema = z.object({
  enrollment_id: z.string().uuid(),
});

export const askGuidebookQuestionSchema = z.object({
  organization_id: z.string().uuid(),
  question: z.string().min(3).max(2000),
});

export const addCommentSchema = z.object({
  guidebook_id: z.string().uuid(),
  artifact_id: z.string().uuid(),
  body: z.string().min(1).max(10000),
  clause_ref: z.string().max(200).optional(),
  quoted_snippet: z.string().max(2000).optional(),
  parent_id: z.string().uuid().optional(),
});

export const resolveCommentSchema = z.object({
  comment_id: z.string().uuid(),
});

export const upsertLayerBodySchema = z.object({
  artifact_id: z.string().uuid(),
  body_md: z.string().max(500_000),
});

export const toggleChecklistItemSchema = z.object({
  item_id: z.string().uuid(),
  is_complete: z.boolean(),
});

export const requestSignatureSchema = z.object({
  guidebook_id: z.string().uuid(),
  signer_name: z.string().min(2).max(200),
  signer_role: z.string().max(200).optional(),
  signer_user_id: z.string().uuid().optional(),
  version_number: z.number().int().positive().optional(),
});

export const recordSignatureSchema = z.object({
  signature_id: z.string().uuid(),
  signature: z.string().min(1).max(500),
});

export const recordRatificationSchema = z.object({
  guidebook_id: z.string().uuid(),
  version_number: z.number().int().positive(),
  board_chair_name: z.string().min(2).max(200),
  board_chair_signature: z.string().min(1).max(500),
  facilitator_name: z.string().max(200).optional(),
  governance_process_note: z.string().max(5000).optional(),
  notes: z.string().max(10000).optional(),
});

export const markRolloutReadySchema = z.object({
  rollout_id: z.string().uuid(),
  storage_path: z.string().max(2000).optional(),
  file_url: z.string().url().max(2000).optional(),
});

/** Stripe Checkout Session completed — metadata must include enrollment_id. */
export const stripeCheckoutSessionCompletedSchema = z.object({
  id: z.string(),
  payment_intent: z.union([z.string(), z.object({ id: z.string() })]).nullable().optional(),
  metadata: z.object({
    enrollment_id: z.string().uuid(),
    safety_plan: z.literal("safestart").optional(),
  }),
  amount_total: z.number().int().nullable().optional(),
  currency: z.string().nullable().optional(),
});

export const stripeWebhookEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.record(z.string(), z.unknown()),
  }),
});

export function parseStripeCheckoutCompleted(raw: unknown) {
  return stripeCheckoutSessionCompletedSchema.safeParse(raw);
}

export function assertEnrollmentAmount(cents: number | null | undefined): boolean {
  return cents === SAFETY_ENROLLMENT_AMOUNT_CENTS;
}

export { SAFETY_ENROLLMENT_AMOUNT_CENTS, SAFETY_ENROLLMENT_CURRENCY };
