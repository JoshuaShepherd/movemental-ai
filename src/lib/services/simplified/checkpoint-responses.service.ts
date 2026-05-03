import { checkpointResponses } from "@/lib/db/schema";
import {
  CheckpointResponsesSelectSchema,
  CheckpointResponsesInsertSchema,
  CheckpointResponsesUpdateSchema,
  CheckpointResponsesFiltersSchema,
  type CheckpointResponses,
  type CheckpointResponsesCreate,
  type CheckpointResponsesUpdate,
  type CheckpointResponsesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CheckpointResponsesService extends SimplifiedService<
  typeof checkpointResponses,
  CheckpointResponses,
  CheckpointResponsesCreate,
  CheckpointResponsesUpdate,
  CheckpointResponsesFilters
> {
  constructor() {
    super(
      checkpointResponses,
      CheckpointResponsesSelectSchema,
      CheckpointResponsesInsertSchema,
      CheckpointResponsesUpdateSchema,
      CheckpointResponsesFiltersSchema,
    );
  }
}

export const checkpointResponsesService = new CheckpointResponsesService();
