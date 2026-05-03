import { z } from "zod";

import { SSSS_INTEGRITY_ITEM_COUNT } from "./items";

export const AudienceContextSchema = z.enum([
  "movement_leader",
  "church_ministry",
  "nonprofit_mission",
  "institution_other",
]);

export const SsssIntegritySubmitSchema = z.object({
  scores: z
    .array(z.number().int().min(1).max(5))
    .length(SSSS_INTEGRITY_ITEM_COUNT),
  audience: AudienceContextSchema.optional(),
  email: z.string().email().max(320).optional().or(z.literal("")),
  clientSessionId: z.string().max(128).optional(),
});

export type SsssIntegritySubmit = z.infer<typeof SsssIntegritySubmitSchema>;
