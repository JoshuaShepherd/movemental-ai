import { archiveTopics } from "@/lib/db/schema";
import {
  ArchiveTopicsSelectSchema,
  ArchiveTopicsInsertSchema,
  ArchiveTopicsUpdateSchema,
  ArchiveTopicsFiltersSchema,
  type ArchiveTopics,
  type ArchiveTopicsCreate,
  type ArchiveTopicsUpdate,
  type ArchiveTopicsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ArchiveTopicsService extends SimplifiedService<
  typeof archiveTopics,
  ArchiveTopics,
  ArchiveTopicsCreate,
  ArchiveTopicsUpdate,
  ArchiveTopicsFilters
> {
  constructor() {
    super(
      archiveTopics,
      ArchiveTopicsSelectSchema,
      ArchiveTopicsInsertSchema,
      ArchiveTopicsUpdateSchema,
      ArchiveTopicsFiltersSchema,
    );
  }
}

export const archiveTopicsService = new ArchiveTopicsService();
