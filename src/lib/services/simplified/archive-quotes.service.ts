import { archiveQuotes } from "@/lib/db/schema";
import {
  ArchiveQuotesSelectSchema,
  ArchiveQuotesInsertSchema,
  ArchiveQuotesUpdateSchema,
  ArchiveQuotesFiltersSchema,
  type ArchiveQuotes,
  type ArchiveQuotesCreate,
  type ArchiveQuotesUpdate,
  type ArchiveQuotesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ArchiveQuotesService extends SimplifiedService<
  typeof archiveQuotes,
  ArchiveQuotes,
  ArchiveQuotesCreate,
  ArchiveQuotesUpdate,
  ArchiveQuotesFilters
> {
  constructor() {
    super(
      archiveQuotes,
      ArchiveQuotesSelectSchema,
      ArchiveQuotesInsertSchema,
      ArchiveQuotesUpdateSchema,
      ArchiveQuotesFiltersSchema,
    );
  }
}

export const archiveQuotesService = new ArchiveQuotesService();
