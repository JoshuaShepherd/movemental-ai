import { voiceIdentities } from "@/lib/db/schema";
import {
  VoiceIdentitiesSelectSchema,
  VoiceIdentitiesInsertSchema,
  VoiceIdentitiesUpdateSchema,
  VoiceIdentitiesFiltersSchema,
  type VoiceIdentities,
  type VoiceIdentitiesCreate,
  type VoiceIdentitiesUpdate,
  type VoiceIdentitiesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VoiceIdentitiesService extends SimplifiedService<
  typeof voiceIdentities,
  VoiceIdentities,
  VoiceIdentitiesCreate,
  VoiceIdentitiesUpdate,
  VoiceIdentitiesFilters
> {
  constructor() {
    super(
      voiceIdentities,
      VoiceIdentitiesSelectSchema,
      VoiceIdentitiesInsertSchema,
      VoiceIdentitiesUpdateSchema,
      VoiceIdentitiesFiltersSchema,
    );
  }
}

export const voiceIdentitiesService = new VoiceIdentitiesService();
