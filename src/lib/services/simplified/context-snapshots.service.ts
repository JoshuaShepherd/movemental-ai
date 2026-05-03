import { contextSnapshots } from "@/lib/db/schema";
import {
  ContextSnapshotsSelectSchema,
  ContextSnapshotsInsertSchema,
  ContextSnapshotsUpdateSchema,
  ContextSnapshotsFiltersSchema,
  type ContextSnapshots,
  type ContextSnapshotsCreate,
  type ContextSnapshotsUpdate,
  type ContextSnapshotsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContextSnapshotsService extends SimplifiedService<
  typeof contextSnapshots,
  ContextSnapshots,
  ContextSnapshotsCreate,
  ContextSnapshotsUpdate,
  ContextSnapshotsFilters
> {
  constructor() {
    super(
      contextSnapshots,
      ContextSnapshotsSelectSchema,
      ContextSnapshotsInsertSchema,
      ContextSnapshotsUpdateSchema,
      ContextSnapshotsFiltersSchema,
    );
  }
}

export const contextSnapshotsService = new ContextSnapshotsService();
