import { archiveItems } from "@/lib/db/schema";
import {
  ArchiveItemsSelectSchema,
  ArchiveItemsInsertSchema,
  ArchiveItemsUpdateSchema,
  ArchiveItemsFiltersSchema,
  type ArchiveItems,
  type ArchiveItemsCreate,
  type ArchiveItemsUpdate,
  type ArchiveItemsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ArchiveItemsService extends SimplifiedService<
  typeof archiveItems,
  ArchiveItems,
  ArchiveItemsCreate,
  ArchiveItemsUpdate,
  ArchiveItemsFilters
> {
  constructor() {
    super(
      archiveItems,
      ArchiveItemsSelectSchema,
      ArchiveItemsInsertSchema,
      ArchiveItemsUpdateSchema,
      ArchiveItemsFiltersSchema,
    );
  }
}

export const archiveItemsService = new ArchiveItemsService();
