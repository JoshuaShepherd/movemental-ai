import { archiveItemRevisions } from "@/lib/db/schema";
import {
  ArchiveItemRevisionsSelectSchema,
  ArchiveItemRevisionsInsertSchema,
  ArchiveItemRevisionsUpdateSchema,
  ArchiveItemRevisionsFiltersSchema,
  type ArchiveItemRevisions,
  type ArchiveItemRevisionsCreate,
  type ArchiveItemRevisionsUpdate,
  type ArchiveItemRevisionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ArchiveItemRevisionsService extends SimplifiedService<
  typeof archiveItemRevisions,
  ArchiveItemRevisions,
  ArchiveItemRevisionsCreate,
  ArchiveItemRevisionsUpdate,
  ArchiveItemRevisionsFilters
> {
  constructor() {
    super(
      archiveItemRevisions,
      ArchiveItemRevisionsSelectSchema,
      ArchiveItemRevisionsInsertSchema,
      ArchiveItemRevisionsUpdateSchema,
      ArchiveItemRevisionsFiltersSchema,
    );
  }
}

export const archiveItemRevisionsService = new ArchiveItemRevisionsService();
