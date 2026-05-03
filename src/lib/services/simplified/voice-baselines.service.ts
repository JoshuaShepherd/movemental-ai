import { voiceBaselines } from "@/lib/db/schema";
import {
  VoiceBaselinesSelectSchema,
  VoiceBaselinesInsertSchema,
  VoiceBaselinesUpdateSchema,
  VoiceBaselinesFiltersSchema,
  type VoiceBaselines,
  type VoiceBaselinesCreate,
  type VoiceBaselinesUpdate,
  type VoiceBaselinesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VoiceBaselinesService extends SimplifiedService<
  typeof voiceBaselines,
  VoiceBaselines,
  VoiceBaselinesCreate,
  VoiceBaselinesUpdate,
  VoiceBaselinesFilters
> {
  constructor() {
    super(
      voiceBaselines,
      VoiceBaselinesSelectSchema,
      VoiceBaselinesInsertSchema,
      VoiceBaselinesUpdateSchema,
      VoiceBaselinesFiltersSchema,
    );
  }
}

export const voiceBaselinesService = new VoiceBaselinesService();
