import { voiceFidelityFeedback } from "@/lib/db/schema";
import {
  VoiceFidelityFeedbackSelectSchema,
  VoiceFidelityFeedbackInsertSchema,
  VoiceFidelityFeedbackUpdateSchema,
  VoiceFidelityFeedbackFiltersSchema,
  type VoiceFidelityFeedback,
  type VoiceFidelityFeedbackCreate,
  type VoiceFidelityFeedbackUpdate,
  type VoiceFidelityFeedbackFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VoiceFidelityFeedbackService extends SimplifiedService<
  typeof voiceFidelityFeedback,
  VoiceFidelityFeedback,
  VoiceFidelityFeedbackCreate,
  VoiceFidelityFeedbackUpdate,
  VoiceFidelityFeedbackFilters
> {
  constructor() {
    super(
      voiceFidelityFeedback,
      VoiceFidelityFeedbackSelectSchema,
      VoiceFidelityFeedbackInsertSchema,
      VoiceFidelityFeedbackUpdateSchema,
      VoiceFidelityFeedbackFiltersSchema,
    );
  }
}

export const voiceFidelityFeedbackService = new VoiceFidelityFeedbackService();
