import { writingStylePreferences } from "@/lib/db/schema";
import {
  WritingStylePreferencesSelectSchema,
  WritingStylePreferencesInsertSchema,
  WritingStylePreferencesUpdateSchema,
  WritingStylePreferencesFiltersSchema,
  type WritingStylePreferences,
  type WritingStylePreferencesCreate,
  type WritingStylePreferencesUpdate,
  type WritingStylePreferencesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WritingStylePreferencesService extends SimplifiedService<
  typeof writingStylePreferences,
  WritingStylePreferences,
  WritingStylePreferencesCreate,
  WritingStylePreferencesUpdate,
  WritingStylePreferencesFilters
> {
  constructor() {
    super(
      writingStylePreferences,
      WritingStylePreferencesSelectSchema,
      WritingStylePreferencesInsertSchema,
      WritingStylePreferencesUpdateSchema,
      WritingStylePreferencesFiltersSchema,
    );
  }
}

export const writingStylePreferencesService = new WritingStylePreferencesService();
