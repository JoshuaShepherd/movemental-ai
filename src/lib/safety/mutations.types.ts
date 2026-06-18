import type { z } from "zod";

import type {
  addCommentSchema,
  recordRatificationSchema,
  recordSignatureSchema,
  requestSignatureSchema,
  resolveCommentSchema,
  toggleChecklistItemSchema,
  upsertLayerBodySchema,
} from "@/lib/safety/schemas";

export type UpsertLayerBodyInput = z.infer<typeof upsertLayerBodySchema>;
export type ToggleChecklistItemInput = z.infer<typeof toggleChecklistItemSchema>;
export type AddCommentInput = z.infer<typeof addCommentSchema>;
export type ResolveCommentInput = z.infer<typeof resolveCommentSchema>;
export type RequestSignatureInput = z.infer<typeof requestSignatureSchema>;
export type RecordSignatureInput = z.infer<typeof recordSignatureSchema>;
export type RecordRatificationInput = z.infer<typeof recordRatificationSchema>;
