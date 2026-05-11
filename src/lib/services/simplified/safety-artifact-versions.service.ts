import { safetyArtifactVersions } from "@/lib/db/schema";
import {
  SafetyArtifactVersionsSelectSchema,
  SafetyArtifactVersionsInsertSchema,
  SafetyArtifactVersionsUpdateSchema,
  SafetyArtifactVersionsFiltersSchema,
  type SafetyArtifactVersions,
  type SafetyArtifactVersionsCreate,
  type SafetyArtifactVersionsUpdate,
  type SafetyArtifactVersionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyArtifactVersionsService extends SimplifiedService<
  typeof safetyArtifactVersions,
  SafetyArtifactVersions,
  SafetyArtifactVersionsCreate,
  SafetyArtifactVersionsUpdate,
  SafetyArtifactVersionsFilters
> {
  constructor() {
    super(
      safetyArtifactVersions,
      SafetyArtifactVersionsSelectSchema,
      SafetyArtifactVersionsInsertSchema,
      SafetyArtifactVersionsUpdateSchema,
      SafetyArtifactVersionsFiltersSchema,
    );
  }
}

export const safetyArtifactVersionsService = new SafetyArtifactVersionsService();
