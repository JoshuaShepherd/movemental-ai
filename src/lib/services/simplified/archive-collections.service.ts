import { archiveCollections } from "@/lib/db/schema";
import {
  ArchiveCollectionsSelectSchema,
  ArchiveCollectionsInsertSchema,
  ArchiveCollectionsUpdateSchema,
  ArchiveCollectionsFiltersSchema,
  type ArchiveCollections,
  type ArchiveCollectionsCreate,
  type ArchiveCollectionsUpdate,
  type ArchiveCollectionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ArchiveCollectionsService extends SimplifiedService<
  typeof archiveCollections,
  ArchiveCollections,
  ArchiveCollectionsCreate,
  ArchiveCollectionsUpdate,
  ArchiveCollectionsFilters
> {
  constructor() {
    super(
      archiveCollections,
      ArchiveCollectionsSelectSchema,
      ArchiveCollectionsInsertSchema,
      ArchiveCollectionsUpdateSchema,
      ArchiveCollectionsFiltersSchema,
    );
  }
}

export const archiveCollectionsService = new ArchiveCollectionsService();
