import { safetyArtifactComments } from "@/lib/db/schema";
import {
  SafetyArtifactCommentsSelectSchema,
  SafetyArtifactCommentsInsertSchema,
  SafetyArtifactCommentsUpdateSchema,
  SafetyArtifactCommentsFiltersSchema,
  type SafetyArtifactComments,
  type SafetyArtifactCommentsCreate,
  type SafetyArtifactCommentsUpdate,
  type SafetyArtifactCommentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyArtifactCommentsService extends SimplifiedService<
  typeof safetyArtifactComments,
  SafetyArtifactComments,
  SafetyArtifactCommentsCreate,
  SafetyArtifactCommentsUpdate,
  SafetyArtifactCommentsFilters
> {
  constructor() {
    super(
      safetyArtifactComments,
      SafetyArtifactCommentsSelectSchema,
      SafetyArtifactCommentsInsertSchema,
      SafetyArtifactCommentsUpdateSchema,
      SafetyArtifactCommentsFiltersSchema,
    );
  }
}

export const safetyArtifactCommentsService = new SafetyArtifactCommentsService();
