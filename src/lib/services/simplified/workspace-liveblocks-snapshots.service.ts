import { workspaceLiveblocksSnapshots } from "@/lib/db/schema";
import {
  WorkspaceLiveblocksSnapshotsSelectSchema,
  WorkspaceLiveblocksSnapshotsInsertSchema,
  WorkspaceLiveblocksSnapshotsUpdateSchema,
  WorkspaceLiveblocksSnapshotsFiltersSchema,
  type WorkspaceLiveblocksSnapshots,
  type WorkspaceLiveblocksSnapshotsCreate,
  type WorkspaceLiveblocksSnapshotsUpdate,
  type WorkspaceLiveblocksSnapshotsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WorkspaceLiveblocksSnapshotsService extends SimplifiedService<
  typeof workspaceLiveblocksSnapshots,
  WorkspaceLiveblocksSnapshots,
  WorkspaceLiveblocksSnapshotsCreate,
  WorkspaceLiveblocksSnapshotsUpdate,
  WorkspaceLiveblocksSnapshotsFilters
> {
  constructor() {
    super(
      workspaceLiveblocksSnapshots,
      WorkspaceLiveblocksSnapshotsSelectSchema,
      WorkspaceLiveblocksSnapshotsInsertSchema,
      WorkspaceLiveblocksSnapshotsUpdateSchema,
      WorkspaceLiveblocksSnapshotsFiltersSchema,
    );
  }
}

export const workspaceLiveblocksSnapshotsService = new WorkspaceLiveblocksSnapshotsService();
