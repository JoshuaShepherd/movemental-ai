import { safetyArtifacts } from "@/lib/db/schema";
import {
  SafetyArtifactsSelectSchema,
  SafetyArtifactsInsertSchema,
  SafetyArtifactsUpdateSchema,
  SafetyArtifactsFiltersSchema,
  type SafetyArtifacts,
  type SafetyArtifactsCreate,
  type SafetyArtifactsUpdate,
  type SafetyArtifactsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyArtifactsService extends SimplifiedService<
  typeof safetyArtifacts,
  SafetyArtifacts,
  SafetyArtifactsCreate,
  SafetyArtifactsUpdate,
  SafetyArtifactsFilters
> {
  constructor() {
    super(
      safetyArtifacts,
      SafetyArtifactsSelectSchema,
      SafetyArtifactsInsertSchema,
      SafetyArtifactsUpdateSchema,
      SafetyArtifactsFiltersSchema,
    );
  }
}

export const safetyArtifactsService = new SafetyArtifactsService();
