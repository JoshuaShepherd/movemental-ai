import { voiceFidelityEvalSamples } from "@/lib/db/schema";
import {
  VoiceFidelityEvalSamplesSelectSchema,
  VoiceFidelityEvalSamplesInsertSchema,
  VoiceFidelityEvalSamplesUpdateSchema,
  VoiceFidelityEvalSamplesFiltersSchema,
  type VoiceFidelityEvalSamples,
  type VoiceFidelityEvalSamplesCreate,
  type VoiceFidelityEvalSamplesUpdate,
  type VoiceFidelityEvalSamplesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VoiceFidelityEvalSamplesService extends SimplifiedService<
  typeof voiceFidelityEvalSamples,
  VoiceFidelityEvalSamples,
  VoiceFidelityEvalSamplesCreate,
  VoiceFidelityEvalSamplesUpdate,
  VoiceFidelityEvalSamplesFilters
> {
  constructor() {
    super(
      voiceFidelityEvalSamples,
      VoiceFidelityEvalSamplesSelectSchema,
      VoiceFidelityEvalSamplesInsertSchema,
      VoiceFidelityEvalSamplesUpdateSchema,
      VoiceFidelityEvalSamplesFiltersSchema,
    );
  }
}

export const voiceFidelityEvalSamplesService = new VoiceFidelityEvalSamplesService();
