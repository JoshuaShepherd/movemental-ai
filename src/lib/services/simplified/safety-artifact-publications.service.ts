import { safetyArtifactPublications } from "@/lib/db/schema";
import {
  SafetyArtifactPublicationsSelectSchema,
  SafetyArtifactPublicationsInsertSchema,
  SafetyArtifactPublicationsUpdateSchema,
  SafetyArtifactPublicationsFiltersSchema,
  type SafetyArtifactPublications,
  type SafetyArtifactPublicationsCreate,
  type SafetyArtifactPublicationsUpdate,
  type SafetyArtifactPublicationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyArtifactPublicationsService extends SimplifiedService<
  typeof safetyArtifactPublications,
  SafetyArtifactPublications,
  SafetyArtifactPublicationsCreate,
  SafetyArtifactPublicationsUpdate,
  SafetyArtifactPublicationsFilters
> {
  constructor() {
    super(
      safetyArtifactPublications,
      SafetyArtifactPublicationsSelectSchema,
      SafetyArtifactPublicationsInsertSchema,
      SafetyArtifactPublicationsUpdateSchema,
      SafetyArtifactPublicationsFiltersSchema,
    );
  }
}

export const safetyArtifactPublicationsService = new SafetyArtifactPublicationsService();
