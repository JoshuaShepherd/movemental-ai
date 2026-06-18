import { safetyRolloutArtifacts } from "@/lib/db/schema";
import {
  SafetyRolloutArtifactsSelectSchema,
  SafetyRolloutArtifactsInsertSchema,
  SafetyRolloutArtifactsUpdateSchema,
  SafetyRolloutArtifactsFiltersSchema,
  type SafetyRolloutArtifacts,
  type SafetyRolloutArtifactsCreate,
  type SafetyRolloutArtifactsUpdate,
  type SafetyRolloutArtifactsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyRolloutArtifactsService extends SimplifiedService<
  typeof safetyRolloutArtifacts,
  SafetyRolloutArtifacts,
  SafetyRolloutArtifactsCreate,
  SafetyRolloutArtifactsUpdate,
  SafetyRolloutArtifactsFilters
> {
  constructor() {
    super(
      safetyRolloutArtifacts,
      SafetyRolloutArtifactsSelectSchema,
      SafetyRolloutArtifactsInsertSchema,
      SafetyRolloutArtifactsUpdateSchema,
      SafetyRolloutArtifactsFiltersSchema,
    );
  }
}

export const safetyRolloutArtifactsService = new SafetyRolloutArtifactsService();
