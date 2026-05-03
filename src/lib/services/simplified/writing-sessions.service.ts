import { writingSessions } from "@/lib/db/schema";
import {
  WritingSessionsSelectSchema,
  WritingSessionsInsertSchema,
  WritingSessionsUpdateSchema,
  WritingSessionsFiltersSchema,
  type WritingSessions,
  type WritingSessionsCreate,
  type WritingSessionsUpdate,
  type WritingSessionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WritingSessionsService extends SimplifiedService<
  typeof writingSessions,
  WritingSessions,
  WritingSessionsCreate,
  WritingSessionsUpdate,
  WritingSessionsFilters
> {
  constructor() {
    super(
      writingSessions,
      WritingSessionsSelectSchema,
      WritingSessionsInsertSchema,
      WritingSessionsUpdateSchema,
      WritingSessionsFiltersSchema,
    );
  }
}

export const writingSessionsService = new WritingSessionsService();
